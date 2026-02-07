
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
// import TikTokPixel from "@/components/TikTokPixel";

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
  metadataBase: new URL('https://www.votrelegende.fr'),
  title: "Le Crash-Test de tes Décisions. Quand ton potentiel de naissance rencontre la psychologie",
  description: "Fais le Crash-Test de tes Décisions. Compare ton potentiel de naissance aux décisions et aux choix que tu fais.",
  openGraph: {
    title: "Le Crash-Test de tes Décisions. Quand ton potentiel de naissance rencontre la psychologie",
    description: "Fais le Crash-Test de tes Décisions. Compare ton potentiel de naissance aux décisions et aux choix que tu fais.",
    siteName: "Votre Légende",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Crash-Test de tes Décisions. Quand ton potentiel de naissance rencontre la psychologie",
    description: "Fais le Crash-Test de tes Décisions. Compare ton potentiel de naissance aux décisions et aux choix que tu fais.",
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
        {/* <TikTokPixel /> */}
        {children}
      </body>
    </html>
  );
}
