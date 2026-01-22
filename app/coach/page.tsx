'use client';

import CoachChat from '@/components/chat/CoachChat';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CoachContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name') || 'Cher Voyageur';

  if (!id) {
    return (
      <div className="text-center py-20">
        <p className="text-white/50">Lien invalide. Veuillez utiliser le lien reçu par email.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
       <CoachChat userId={id} userName={name} />
    </div>
  );
}

export default function CoachPage() {
  return (
    <main className="min-h-screen bg-[#1a1c2e] text-white selection:bg-[#C9A24D]/30">
      
      {/* Header */}
      <header className="p-6 border-b border-white/10 flex items-center justify-between">
         <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
         </Link>
         <div className="flex items-center gap-2 font-serif text-[#C9A24D]">
            <Sparkles className="w-5 h-5" />
            <span>Votre Guide Interactif</span>
         </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
        
        <div className="text-center max-w-2xl mb-12 space-y-4">
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#C9A24D]">
             L'Oracle Numérologique
           </h1>
           <p className="text-lg text-white/60">
             Votre guide connaît votre thème numérologique. Discutez avec lui par écrit ou de vive voix pour approfondir votre lecture.
           </p>
        </div>

        {/* The Chat Component */}
        <Suspense fallback={<div>Chargement du guide...</div>}>
          <CoachContent />
        </Suspense>

        <div className="mt-12 text-center text-xs text-white/30 max-w-md">
           <p>
             Technologie propulsée par OpenAI GPT-4. 
             Les réponses sont générées par une intelligence artificielle et doivent être prises comme des conseils de développement personnel, non comme des vérités absolues.
           </p>
        </div>

      </div>
    </main>
  );
}
