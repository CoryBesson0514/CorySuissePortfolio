import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";

const sessionCookieName = "cory-admin-session";
const attemptCookieName = "cory-admin-login-attempts";

const sessionValue = "authenticated";

const MAX_ATTEMPTS_BEFORE_COOLDOWN = 5;
const SHORT_COOLDOWN_SECONDS = 30;

const MAX_ATTEMPTS_BEFORE_LONG_COOLDOWN = 10;
const LONG_COOLDOWN_SECONDS = 5 * 60;

/*
 * ============================================================
 * SECRET
 * ============================================================
 *
 * On utilise ADMIN_PASSWORD comme secret.
 *
 * Tu n'as donc PAS besoin de ADMIN_SESSION_SECRET.
 */

function getSecret() {
  return process.env.ADMIN_PASSWORD ?? null;
}

/*
 * ============================================================
 * SIGNATURE
 * ============================================================
 */

function sign(value: string) {
  const secret = getSecret();

  if (!secret) {
    return null;
  }

  return createHmac("sha256", secret).update(value).digest("hex");
}

/*
 * ============================================================
 * SESSION
 * ============================================================
 */

function createSessionSignature() {
  return sign(sessionValue);
}

/*
 * ============================================================
 * VÉRIFICATION IDENTIFIANTS
 * ============================================================
 */

function credentialsMatch(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  return (
    valueBuffer.length === expectedBuffer.length &&
    timingSafeEqual(valueBuffer, expectedBuffer)
  );
}

/*
 * ============================================================
 * COOKIE TENTATIVES
 * ============================================================
 *
 * Format :
 *
 * attempts.timestamp.signature
 *
 * Exemple :
 *
 * 3.1723819200000.abcdef...
 *
 * Le cookie est signé pour empêcher sa modification
 * sans connaître ADMIN_PASSWORD.
 */

function createAttemptCookie(attempts: number, blockedUntil: number) {
  const payload = `${attempts}.${blockedUntil}`;
  const signature = sign(payload);

  if (!signature) {
    return null;
  }

  return `${payload}.${signature}`;
}

function readAttemptCookie(value?: string | null) {
  if (!value) {
    return {
      attempts: 0,
      blockedUntil: 0,
    };
  }

  const parts = value.split(".");

  if (parts.length !== 3) {
    return {
      attempts: 0,
      blockedUntil: 0,
    };
  }

  const attempts = Number(parts[0]);
  const blockedUntil = Number(parts[1]);
  const signature = parts[2];

  if (
    !Number.isFinite(attempts) ||
    !Number.isFinite(blockedUntil) ||
    !signature
  ) {
    return {
      attempts: 0,
      blockedUntil: 0,
    };
  }

  const payload = `${attempts}.${blockedUntil}`;
  const expectedSignature = sign(payload);

  if (!expectedSignature) {
    return {
      attempts: 0,
      blockedUntil: 0,
    };
  }

  const signatureBuffer = Buffer.from(signature);

  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(signatureBuffer, expectedBuffer)
  ) {
    return {
      attempts: 0,
      blockedUntil: 0,
    };
  }

  return {
    attempts,
    blockedUntil,
  };
}

/*
 * ============================================================
 * POST LOGIN
 * ============================================================
 */

export async function POST(request: Request) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  /*
   * ----------------------------------------------------------
   * VÉRIFICATION CONFIGURATION
   * ----------------------------------------------------------
   */

  if (!username || !password) {
    return NextResponse.json(
      {
        error: "Les identifiants administrateur ne sont pas configurés.",
      },
      {
        status: 503,
      },
    );
  }

  /*
   * ----------------------------------------------------------
   * RÉCUPÉRATION DES TENTATIVES
   * ----------------------------------------------------------
   */

  const cookieHeader = request.headers.get("cookie") ?? "";

  const attemptCookie = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${attemptCookieName}=`));

  const attemptCookieValue =
    attemptCookie?.slice(attemptCookieName.length + 1) ?? null;

  const attemptState = readAttemptCookie(attemptCookieValue);

  const now = Date.now();

  /*
   * ----------------------------------------------------------
   * COOLDOWN ACTIF
   * ----------------------------------------------------------
   */

  if (attemptState.blockedUntil > now) {
    const remainingSeconds = Math.ceil(
      (attemptState.blockedUntil - now) / 1000,
    );

    return NextResponse.json(
      {
        error: "Trop de tentatives. Veuillez patienter avant de réessayer.",
        cooldown: true,
        remainingSeconds,
      },
      {
        status: 429,
        headers: {
          "Retry-After": remainingSeconds.toString(),
        },
      },
    );
  }

  /*
   * ----------------------------------------------------------
   * LECTURE DU BODY
   * ----------------------------------------------------------
   */

  const body = (await request.json().catch(() => null)) as {
    username?: unknown;
    password?: unknown;
  } | null;

  /*
   * ----------------------------------------------------------
   * IDENTIFIANTS INCORRECTS
   * ----------------------------------------------------------
   */

  const validCredentials =
    typeof body?.username === "string" &&
    typeof body?.password === "string" &&
    credentialsMatch(body.username, username) &&
    credentialsMatch(body.password, password);

  if (!validCredentials) {
    const nextAttempts = attemptState.attempts + 1;

    let blockedUntil = 0;

    /*
     * 10 tentatives → 5 minutes
     */

    if (nextAttempts >= MAX_ATTEMPTS_BEFORE_LONG_COOLDOWN) {
      blockedUntil = now + LONG_COOLDOWN_SECONDS * 1000;
    } else if (nextAttempts >= MAX_ATTEMPTS_BEFORE_COOLDOWN) {

    /*
     * 5 tentatives → 30 secondes
     */
      blockedUntil = now + SHORT_COOLDOWN_SECONDS * 1000;
    }

    const newCookie = createAttemptCookie(nextAttempts, blockedUntil);

    const response = NextResponse.json(
      {
        error:
          blockedUntil > now
            ? "Trop de tentatives. Veuillez patienter avant de réessayer."
            : "Identifiant ou mot de passe incorrect.",
        cooldown: blockedUntil > now,
        remainingSeconds:
          blockedUntil > now ? Math.ceil((blockedUntil - now) / 1000) : 0,
      },
      {
        status: blockedUntil > now ? 429 : 401,
      },
    );

    if (newCookie) {
      response.cookies.set(attemptCookieName, newCookie, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60,
      });
    }

    if (blockedUntil > now) {
      response.headers.set(
        "Retry-After",
        Math.ceil((blockedUntil - now) / 1000).toString(),
      );
    }

    return response;
  }

  /*
   * ----------------------------------------------------------
   * IDENTIFIANTS CORRECTS
   * ----------------------------------------------------------
   */

  const signature = createSessionSignature();

  if (!signature) {
    return NextResponse.json(
      {
        error: "La session administrateur ne peut pas être créée.",
      },
      {
        status: 503,
      },
    );
  }

  /*
   * ----------------------------------------------------------
   * SESSION
   * ----------------------------------------------------------
   */

  const response = NextResponse.json({
    ok: true,
  });

  response.cookies.set(sessionCookieName, signature, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  /*
   * ----------------------------------------------------------
   * RESET DES TENTATIVES
   * ----------------------------------------------------------
   */

  response.cookies.set(attemptCookieName, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
