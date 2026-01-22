import InteractiveAvatar from '@/components/heygen/InteractiveAvatar';
import { Sparkles, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

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
           <h1 className="text-4xl md:text-5xl font-serif font-bold">
             Posez vos questions en direct
           </h1>
           <p className="text-lg text-white/60">
             Votre avatar connaît votre thème numérologique. Discutez avec lui (ou elle) de vive voix pour approfondir votre lecture.
           </p>
        </div>

        {/* The Avatar Component */}
        <div className="w-full">
           <InteractiveAvatar />
        </div>

        <div className="mt-12 text-center text-xs text-white/30 max-w-md">
           <p>
             Technologie propulsée par HeyGen Interactive Avatar. 
             Les réponses sont générées par une intelligence artificielle et doivent être prises comme des conseils de développement personnel, non comme des vérités absolues.
           </p>
        </div>

      </div>
    </main>
  );
}
