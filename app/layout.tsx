import type { Metadata } from "next";
import "./globals.css";
import InstallPrompt from "./components/InstallPrompt";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Cory Besson — Portfolio",
  description: "Portfolio créer pour et par Cory Besson",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        {" "}
        {children}
        <InstallPrompt />
        <SpeedInsights />
      </body>
    </html>
  );
}
