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
          <div className="text-center mt-12">
             <button 
               onClick={handleUnlock}
               className="inline-flex items-center gap-2 px-8 py-3 bg-[#2C2F4A] text-white rounded-full font-bold shadow-lg hover:bg-[#1A1B2E] transition-all transform hover:scale-105"
             >
               <span>🔓</span>
               <span>Débloquer mon Dossier Numérologique / Astrologique</span>
             </button>
          </div>
        )}
      </div>
    </div>
  );
}