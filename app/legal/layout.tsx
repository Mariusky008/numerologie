import React from 'react';
import Link from 'next/link';
import { Star, ArrowLeft } from 'lucide-react';

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#fffbf0] text-[#57534e]">
      {/* Simple Header */}
      <nav className="p-6 border-b border-[#d97706]/10 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-serif text-[#78350f] font-bold flex items-center gap-2">
            <Star className="w-6 h-6 text-[#d97706] fill-[#d97706]" />
            Numérologie
          </Link>
          <Link 
            href="/"
            className="flex items-center gap-2 text-[#78350f] hover:text-[#d97706] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-[#d97706]/10">
          {children}
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="py-8 text-center text-sm text-[#a8a29e]">
        &copy; {new Date().getFullYear()} Numérologie. Tous droits réservés.
      </footer>
    </div>
  );
}
