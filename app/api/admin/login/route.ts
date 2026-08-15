import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const sessionCookieName = "cory-admin-session";
const sessionValue = "authenticated";

function createSessionSignature() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD;

  if (!secret) {
    return null;
  }

  return createHmac("sha256", secret).update(sessionValue).digest("hex");
}

function credentialsMatch(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

export async function POST(request: Request) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Les identifiants administrateur ne sont pas configurés." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { username?: unknown; password?: unknown }
    | null;

  if (
    typeof body?.username !== "string" ||
    typeof body?.password !== "string" ||
    !credentialsMatch(body.username, username) ||
    !credentialsMatch(body.password, password)
  ) {
    return NextResponse.json(
      { error: "Identifiant ou mot de passe incorrect." },
      { status: 401 },
    );
  }

  const signature = createSessionSignature();

  if (!signature) {
    return NextResponse.json(
      { error: "La session administrateur ne peut pas être créée." },
      { status: 503 },
    );
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(sessionCookieName, signature, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
