'use client';

import CoachChat from '@/components/chat/CoachChat';
import { Sparkles, ArrowLeft, Beaker } from 'lucide-react';
import Link from 'next/link';

export default function TestOraclePage() {
  // On utilise l'ID de démo configuré dans l'API (/app/api/chat/route.ts)
  const demoId = 'demo-123';
  const demoName = 'Testeur';

  return (
    <main className="min-h-screen bg-[#1a1c2e] text-white selection:bg-[#C9A24D]/30">
      
      {/* Header */}
      <header className="p-6 border-b border-white/10 flex items-center justify-between bg-[#08090F]/50 backdrop-blur-md sticky top-0 z-50">
         <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Retour
         </Link>
         <div className="flex items-center gap-2 font-serif text-[#C9A24D]">
            <Beaker className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-bold">Mode Test Lab</span>
         </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col items-center">
        
        <div className="text-center max-w-2xl mb-8 space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
             <Sparkles className="w-3 h-3" /> Environnement de Test
           </div>
           <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#C9A24D]">
             Test de l'Oracle
           </h1>
           <p className="text-sm text-white/60">
             Cette page utilise un profil fictif (**Jean-Test, né le 15/05/1985**) pour vous permettre de tester les réponses et la voix de l'IA sans compte réel.
           </p>
        </div>

        {/* Le Chat Component injecté avec l'ID de démo */}
        <div className="w-full">
          <CoachChat userId={demoId} userName={demoName} />
        </div>

        <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-xl text-center text-xs text-white/40 max-w-md">
           <p>
             Note : Dans la version réelle, l'Oracle connaît précisément les résultats du rapport PDF de l'utilisateur (Chemin de vie, année personnelle, etc.).
           </p>
        </div>

      </div>
    </main>
  );
}
