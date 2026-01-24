import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { getNumberArchetype, getDayOfBirthContent } from '@/lib/numerology/contentGenerator';
import { ZODIAC_DETAILS } from '@/lib/numerology/interpretations-astro-geo';

export default function Part7ConclusionKeys({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const lpArchetype = getNumberArchetype(results.lifePath);
  const soulArchetype = getNumberArchetype(results.soulUrge);
  
  // Calculate Action/Day content
  const dayNum = parseInt(userData.birthDate.split('-')[2]);
  const actionContent = getDayOfBirthContent(dayNum);

  // Zodiac for the quote
  const zodiacKey = results.advancedProfile?.zodiac?.toLowerCase();
  const zodiacName = zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "Inconnu";

  return (
    <>
    <PageContainer className="p-8 md:p-16 justify-center bg-[#FAF9F7] text-[#1B263B] text-center print:break-before-page">
      <h2 className="text-3xl md:text-5xl font-serif text-[#D4A373] mb-12 border-b-2 border-[#D4A373] pb-4 inline-block">
        VOS 3 CLÉS D'ACTIVATION
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        {/* Clé Mentale */}
        <div className="p-6 border border-[#D4A373]/30 rounded-lg bg-white shadow-sm flex flex-col items-center">
          <div className="text-[#E07A5F] text-sm uppercase tracking-widest mb-4 font-bold">Mental</div>
          <div className="w-12 h-12 rounded-full bg-[#1B263B] text-white flex items-center justify-center font-serif text-xl mb-4">
            {results.lifePath}
          </div>
          <p className="font-serif text-xl text-[#1B263B] italic">"{lpArchetype.keyAdvice[0]}"</p>
        </div>

        {/* Clé Émotionnelle */}
        <div className="p-6 border border-[#D4A373]/30 rounded-lg bg-white shadow-sm flex flex-col items-center">
          <div className="text-[#E07A5F] text-sm uppercase tracking-widest mb-4 font-bold">Émotionnel</div>
          <div className="w-12 h-12 rounded-full bg-[#E07A5F] text-white flex items-center justify-center font-serif text-xl mb-4">
            {results.soulUrge}
          </div>
          <p className="font-serif text-xl text-[#1B263B] italic">"Écoutez votre petite voix intérieure (Élan Spirituel {results.soulUrge})"</p>
        </div>

        {/* Clé Action */}
        <div className="p-6 border border-[#D4A373]/30 rounded-lg bg-white shadow-sm flex flex-col items-center">
          <div className="text-[#E07A5F] text-sm uppercase tracking-widest mb-4 font-bold">Action</div>
          <div className="w-12 h-12 rounded-full bg-[#D4A373] text-white flex items-center justify-center font-serif text-xl mb-4">
            {dayNum}
          </div>
          <p className="font-serif text-xl text-[#1B263B] italic">"{actionContent.keywords[0]}"</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto p-8 border-t border-[#D4A373]/30">
        <p className="text-[#D4A373] italic text-xl md:text-2xl font-serif leading-relaxed">
          "Je construis mon royaume avec la sagesse du {results.lifePath} et je rayonne comme un {zodiacName} pour éclairer les autres."
        </p>
      </div>
    </PageContainer>

    {/* CLOSING STATEMENT */}
    <PageContainer className="p-4 md:p-16 justify-center text-center bg-[#2C2F4A] text-[#FDFBF7]">
      <h2 className="text-3xl md:text-5xl font-serif mb-8 text-[#C9A24D]">Votre Légende Commence Ici</h2>
      <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-12">
        "Les nombres ne sont pas un destin, mais un itinéraire. Vous avez maintenant la carte. À vous de marcher."
      </p>
      <div className="w-24 h-1 bg-[#C9A24D] mx-auto mb-8"></div>
      <p className="text-sm opacity-60 uppercase tracking-widest">
        Fin du Rapport • {new Date().getFullYear()}
      </p>

      {/* UPSELL EXPERT DANS LE PDF */}
      <div className="mt-16 bg-white/5 border border-white/10 rounded-xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
        <h3 className="text-xl font-serif text-[#C9A24D] mb-4">Besoin d'aller plus loin ?</h3>
        <p className="text-white/80 mb-6">
          Parfois, une lecture humaine est nécessaire pour débloquer une situation complexe que l'algorithme ne peut pas percevoir.
        </p>
        <a href="https://votrelegende.fr/expert-booking" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-[#C9A24D] text-[#2C2F4A] font-bold rounded-lg hover:bg-white transition-colors">
          Parler à un Expert Humain
        </a>
      </div>
    </PageContainer>
    </>
  );
}