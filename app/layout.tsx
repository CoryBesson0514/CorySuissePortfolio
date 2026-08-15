import type { Metadata } from "next";
import "./globals.css";
import InstallPrompt from "./components/InstallPrompt";
import IntroScreen from "./components/IntroScreen";

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
        <IntroScreen />
        {children}
        <InstallPrompt />
      </body>
    </html>
  );
}
