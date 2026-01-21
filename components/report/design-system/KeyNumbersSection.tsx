import NumberCard from './NumberCard';
import { NumerologyResult } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { getLifePathContent, getExpressionContent, getSoulUrgeContent, getPersonalityContent } from '@/lib/numerology/contentGenerator';

interface KeyNumbersSectionProps {
  results: NumerologyResult;
  userData: any; // On passe userData pour le lien de paiement
  areCardsLocked?: boolean; // Nouvelle prop pour contrôler le verrouillage global
}

export default function KeyNumbersSection({ results, userData, areCardsLocked = true }: KeyNumbersSectionProps) {
  const router = useRouter();

  const handleUnlock = () => {
     const params = new URLSearchParams({
        fn: userData.firstName,
        ln: userData.lastName,
        bd: userData.birthDate,
        bp: userData.birthPlace || '',
        fo: userData.focus,
        origin: 'cards_unlock'
      });
      router.push(`/checkout?${params.toString()}`);
  };

  // Récupération des contenus dynamiques
  const lpContent = getLifePathContent(results.lifePath);
  const expContent = getExpressionContent(results.expression);
  const soulContent = getSoulUrgeContent(results.soulUrge);
  const persContent = getPersonalityContent(results.personality);

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-serif text-center text-[#2C2F4A] mb-12">
          Vos Piliers Vibratoires
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <NumberCard 
            title="Chemin de Vie"
            number={results.lifePath}
            description={lpContent.desc}
            keywords={lpContent.keywords.slice(0, 3)}
            color="#C9A24D"
            delay={0.1}
            isLocked={false} // Le Chemin de Vie reste toujours visible
          />
          
          <NumberCard 
            title="Expression"
            number={results.expression}
            description={expContent.desc}
            keywords={expContent.keywords.slice(0, 3)}
            color="#5B4B8A"
            delay={0.2}
            isLocked={areCardsLocked}
            onUnlock={handleUnlock}
          />
          
          <NumberCard 
            title="Élan Spirituel"
            number={results.soulUrge}
            description={soulContent.desc}
            keywords={soulContent.keywords.slice(0, 3)}
            color="#9966CC"
            delay={0.3}
            isLocked={areCardsLocked}
            onUnlock={handleUnlock}
          />
          
          <NumberCard 
            title="Image Sociale"
            number={results.personality}
            description={persContent.desc}
            keywords={persContent.keywords.slice(0, 3)}
            color="#B87333"
            delay={0.4}
            isLocked={areCardsLocked}
            onUnlock={handleUnlock}
          />
        </div>
        
        {areCardsLocked && (
          <div className="flex justify-center mt-12">
             <button 
               onClick={handleUnlock}
               className="group relative w-full max-w-md bg-[#2C2F4A] rounded-2xl p-4 shadow-2xl hover:scale-[1.02] transition-transform duration-300 border-2 border-[#C9A24D]/30 overflow-hidden text-left"
             >
               {/* Background Effect */}
               <div className="absolute inset-0 bg-gradient-to-r from-[#2C2F4A] to-[#5B4B8A] opacity-90"></div>
               
               <div className="relative z-10 flex items-center gap-6">
                 {/* Fake Video Thumbnail */}
                 <div className="w-24 h-24 rounded-full border-2 border-[#C9A24D] bg-black/50 flex-shrink-0 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50">
                        <svg className="w-5 h-5 text-white fill-current ml-1" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    {/* Placeholder for Avatar Image/Video */}
                    <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-80" style={{ backgroundImage: "url('/avatar-preview.jpg')" }}>
                      {/* Fallback gradient if no image */}
                      <div className="w-full h-full bg-gradient-to-br from-[#C9A24D] to-[#2C2F4A]"></div>
                    </div>
                 </div>

                 {/* Text Content */}
                 <div className="flex-1">
                   <div className="text-[#C9A24D] text-xs font-bold uppercase tracking-widest mb-1">Révélation</div>
                   <h3 className="text-xl font-serif text-white leading-tight mb-2">Votre destin révélé par votre avatar</h3>
                   <div className="flex items-center gap-2 text-white/60 text-xs">
                     <span className="bg-white/10 px-2 py-0.5 rounded">Vidéo 5 min</span>
                     <span>•</span>
                     <span>Format Audio & Visuel</span>
                   </div>
                 </div>
                 
                 {/* Arrow Icon */}
                 <div className="text-[#C9A24D]">
                   <svg className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                   </svg>
                 </div>
               </div>
             </button>
          </div>
        )}
      </div>
    </div>
  );
}