
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
  title: "Numérologie & Avatar : Votre Lecture de Vie en 5 Minutes",
  description: "Découvrez votre avatar personnel et votre lecture de vie en 5 minutes. Une analyse numérologique unique basée sur votre date de naissance. 100% personnalisé.",
  openGraph: {
    title: "Numérologie & Avatar : Votre Lecture de Vie en 5 Minutes",
    description: "Découvrez votre avatar personnel et votre lecture de vie en 5 minutes. Une analyse numérologique unique basée sur votre date de naissance.",
    siteName: "Roman de Vie",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // Image à ajouter dans le dossier public
        width: 1200,
        height: 630,
        alt: "Aperçu de l'expérience Avatar Numérologique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numérologie & Avatar : Votre Lecture de Vie en 5 Minutes",
    description: "Découvrez votre avatar personnel et votre lecture de vie en 5 minutes.",
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
