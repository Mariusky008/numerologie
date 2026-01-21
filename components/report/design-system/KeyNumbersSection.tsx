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
          <div className="flex justify-center mt-16">
             <div className="w-full max-w-4xl bg-[#2C2F4A] rounded-2xl shadow-2xl overflow-hidden border border-[#C9A24D]/30 relative group">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
                
                <div className="flex flex-col md:flex-row">
                   {/* Left: Video Preview Area (Large) */}
                   <div className="md:w-5/12 relative min-h-[300px] bg-black">
                      <video 
                        src="/Ton Parcours de Vie.mp4" 
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                        muted loop autoPlay playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#2C2F4A] md:to-transparent md:bg-gradient-to-l opacity-50"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(201,162,77,0.3)]">
                           <svg className="w-6 h-6 text-white fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-xs text-white font-bold flex items-center gap-2 border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        VIDÉO PRIVÉE
                      </div>
                   </div>

                   {/* Right: Content & CTA */}
                   <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center text-left relative z-10">
                      <div className="inline-block px-3 py-1 rounded bg-[#C9A24D]/10 text-[#C9A24D] text-xs font-bold tracking-widest uppercase mb-4 w-fit border border-[#C9A24D]/20">
                        Révélation
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-serif text-white leading-tight mb-4">
                        Votre destin révélé <br/> par votre avatar
                      </h3>
                      
                      <p className="text-[#8FA6A0] text-lg mb-8 leading-relaxed">
                        Une analyse vidéo de 5 minutes, 100% personnalisée. <br className="hidden md:block" />
                        Découvrez vos blocages inconscients et vos plus grandes opportunités de vie.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-stretch">
                        <button 
                          onClick={handleUnlock}
                          className="w-full sm:w-auto px-8 py-4 bg-[#C9A24D] text-[#2C2F4A] rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_10px_20px_-5px_rgba(201,162,77,0.4)] flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                          Débloquer ma vidéo
                        </button>
                        <div className="flex items-center gap-2 text-white/40 text-sm px-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></span>
                           Format Audio & Visuel
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}