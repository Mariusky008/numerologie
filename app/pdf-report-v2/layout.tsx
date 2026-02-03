import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Ton Rapport Personnalisé | Votre Légende",
  description: "Accède à ton analyse complète du Crash-Test des Décisions.",
  openGraph: {
    title: "Ton Rapport Personnalisé | Votre Légende",
    description: "Accède à ton analyse complète du Crash-Test des Décisions.",
    images: ["/avatar-poster.jpg"],
  },
};

export default function PdfReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
