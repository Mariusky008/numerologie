
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Le Crash-Test de ton Destin. Quand ton potentiel de naissance rencontre la psychologie",
  description: "Fais le Crash-Test de ton Destin. Compare ton potentiel de naissance aux décisions et aux choix que tu fais.",
  openGraph: {
    title: "Le Crash-Test de ton Destin. Quand ton potentiel de naissance rencontre la psychologie",
    description: "Fais le Crash-Test de ton Destin. Compare ton potentiel de naissance aux décisions et aux choix que tu fais.",
    siteName: "Roman de Vie",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Image à ajouter dans le dossier public
        width: 1200,
        height: 630,
        alt: "Le Crash-Test de ton Destin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Crash-Test de ton Destin. Quand ton potentiel de naissance rencontre la psychologie",
    description: "Fais le Crash-Test de ton Destin. Compare ton potentiel de naissance aux décisions et aux choix que tu fais.",
    images: ["/og-image.jpg"],
  },
};

export const revalidate = 0; // Disable static caching globally

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${lato.variable} antialiased font-sans`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
