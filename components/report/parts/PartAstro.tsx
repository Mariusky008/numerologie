
import PageContainer from './PageContainer';
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import { PLANET_INFLUENCES, ZODIAC_DETAILS, PLACE_VIBRATIONS, RESONANCE_DETAILS } from '@/lib/numerology/interpretations-astro-geo';

// Helper to calculate word value
const calculateWordValue = (word: string) => {
  const normalize = (str: string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "");
  const cleanWord = normalize(word);
  const details = cleanWord.split('').map(char => {
    const val = (char.charCodeAt(0) - 64) % 9 || 9;
    return { char, val };
  });
  const sum = details.reduce((acc, curr) => acc + curr.val, 0);
  const reduced = sum % 9 || 9;
  return { details, sum, reduced };
};

export default function PartAstro({ userData, results, etymology }: { userData: UserData, results: NumerologyResult, etymology?: NameData | null }) {
  const birthPlace = userData.birthPlace || "Lieu Inconnu";
  const placeAnalysis = calculateWordValue(birthPlace);
  const vibration = results.astroResonance.birthPlaceVibration; // Should match placeAnalysis.reduced

  // Simple interpretation logic (placeholder for real Astrocartography)
  const resonance = (vibration + results.lifePath) % 9 || 9;
  const isHarmonious = [1, 3, 5, 6, 9].includes(resonance);

  // Advanced Profile Data
  const zodiacKey = results.advancedProfile?.zodiac?.toLowerCase();
  const planetKey = results.advancedProfile?.dominantPlanet?.toLowerCase();
  
  const zodiac = zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "";
  const planet = planetKey ? planetKey.charAt(0).toUpperCase() + planetKey.slice(1) : "";
  
  const planetText = planetKey ? PLANET_INFLUENCES[planetKey] : "";
  const zodiacInfo = zodiacKey ? ZODIAC_DETAILS[zodiacKey] : null;

  return (
    <PageContainer className="p-4 md:p-16">
      <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
        Architecture Astrale & Résonance
      </h2>

      {/* 1. ASTROLOGIE */}
      {results.advancedProfile && (
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-serif text-[#d97706] mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center text-sm font-bold">VII</span>
            Alignement Céleste
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ZODIAC CARD */}
            <div className="bg-white p-8 rounded-2xl border border-[#d97706]/20 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl font-serif pointer-events-none text-[#78350f]">♈</div>
               
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-full bg-[#fffbf0] border-2 border-[#d97706] flex items-center justify-center text-3xl shadow-sm">
                     {/* Placeholder icon, could be dynamic based on sign */}
                     <span>☀️</span>
                   </div>
                   <div>
                     <div className="text-xs uppercase tracking-widest text-[#a8a29e] font-bold">Signe Solaire</div>
                     <div className="text-3xl font-serif text-[#78350f] font-bold">{zodiac}</div>
                   </div>
                 </div>

                 {zodiacInfo && (
                   <div className="flex gap-2 mb-6">
                     <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full uppercase tracking-wider font-bold">{zodiacInfo.element}</span>
                     <span className="px-3 py-1 bg-stone-100 text-stone-600 text-xs rounded-full uppercase tracking-wider font-bold">{zodiacInfo.quality}</span>
                   </div>
                 )}

                 {results.advancedProfile.mcData && (
                   <div className="space-y-4 text-sm text-[#57534e] bg-[#fffbf0] p-4 rounded-xl border border-[#d97706]/10">
                     <div>
                       <strong className="text-[#d97706] block mb-1">Image Publique</strong>
                       <p>{results.advancedProfile.mcData.image_publique}</p>
                     </div>
                     <div>
                       <strong className="text-[#d97706] block mb-1">Vocation</strong>
                       <p>{results.advancedProfile.mcData.vocation}</p>
                     </div>
                   </div>
                 )}
                 
                 {zodiacInfo && (
                   <p className="mt-6 text-[#57534e] italic leading-relaxed border-l-2 border-[#d97706]/30 pl-4">
                     "{zodiacInfo.description}"
                   </p>
                 )}
               </div>
            </div>

            {/* PLANET CARD */}
            <div className="bg-white p-8 rounded-2xl border border-[#d97706]/20 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
               <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#d97706]/5 rounded-full blur-3xl"></div>
               
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-6">
                   <div className="w-16 h-16 rounded-full bg-[#fffbf0] border-2 border-[#d97706] flex items-center justify-center text-3xl shadow-sm">
                     <span>🪐</span>
                   </div>
                   <div>
                     <div className="text-xs uppercase tracking-widest text-[#a8a29e] font-bold">Planète Dominante</div>
                     <div className="text-3xl font-serif text-[#78350f] font-bold">{planet}</div>
                   </div>
                 </div>

                 <div className="prose prose-stone text-sm leading-relaxed">
                   <p className="font-medium text-[#78350f] text-lg mb-4">
                     Maître du Chemin de Vie {results.lifePath}
                   </p>
                   <p>
                     {planetText || `Votre Chemin de Vie ${results.lifePath} est gouverné par ${planet}. Cette influence colore votre destinée d'une énergie particulière.`}
                   </p>
                   <div className="mt-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                     <p className="text-blue-800 text-xs font-bold uppercase mb-1">Conseil d'Alignement</p>
                     <p className="text-blue-900 italic">
                       Intégrez l'énergie de {planet} pour fluidifier votre parcours. N'essayez pas de nager à contre-courant de cette vibration.
                     </p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ETYMOLOGIE */}
      {etymology && (
        <div className="mb-16">
          <h3 className="text-xl md:text-2xl font-serif text-[#d97706] mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center text-sm font-bold">VIII</span>
            Échos Étymologiques
          </h3>
          <div className="bg-[#fffbf0] p-8 md:p-10 rounded-2xl border border-[#d97706]/20 shadow-inner relative overflow-hidden">
             {/* Background decorative letter */}
             <div className="absolute -top-10 -left-10 text-[12rem] font-serif text-[#d97706] opacity-5 select-none">
               {userData.firstName.charAt(0)}
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
               <div className="space-y-3 border-r border-[#d97706]/10 md:pr-8">
                 <div className="text-xs uppercase tracking-widest text-[#a8a29e] font-bold">Origine</div>
                 <div className="font-serif text-2xl text-[#78350f]">{etymology.origin}</div>
                 <div className="w-12 h-1 bg-[#d97706] mt-2"></div>
               </div>
               
               <div className="space-y-3 md:col-span-2">
                 <div className="text-xs uppercase tracking-widest text-[#a8a29e] font-bold">Signification</div>
                 <p className="text-[#57534e] text-xl font-serif italic">"{etymology.meaning}"</p>
               </div>
               
               {etymology.spiritual && (
                 <div className="md:col-span-3 pt-6 border-t border-[#d97706]/10 mt-2">
                   <div className="text-xs uppercase tracking-widest text-[#a8a29e] mb-3 font-bold">Dimension Spirituelle</div>
                   <p className="text-[#57534e] leading-relaxed text-lg font-light">{etymology.spiritual}</p>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}

      {/* 3. ANCRAGE TERRESTRE (Refondu) */}
      <div>
        <h3 className="text-xl md:text-2xl font-serif text-[#d97706] mb-8 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center text-sm font-bold">IX</span>
            Ancrage Terrestre
        </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
        
        {/* VIBRATION CARD (Analysis) */}
        <div className="md:col-span-7 space-y-8">
          <div className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm">
            <h3 className="text-lg font-bold text-[#d97706] mb-4 uppercase tracking-widest text-xs">Analyse du Lieu de Naissance</h3>
            
            <div className="flex flex-wrap items-center gap-2 mb-6 font-mono text-lg text-[#57534e] justify-center md:justify-start bg-stone-50 p-4 rounded-lg border border-stone-100">
              {placeAnalysis.details.map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="font-bold">{item.char}</span>
                  <span className="text-xs text-[#a8a29e]">{item.val}</span>
                </div>
              ))}
              <span className="mx-2 text-[#d97706]">=</span>
              <span className="font-bold text-[#d97706]">{placeAnalysis.sum}</span>
              <span className="mx-2 text-[#d97706]">→</span>
              <span className="w-8 h-8 rounded-full bg-[#d97706] text-white flex items-center justify-center font-bold shadow-md">
                {placeAnalysis.reduced}
              </span>
            </div>

            <h4 className="font-serif text-3xl text-[#78350f] mb-4">{birthPlace}</h4>
            
            <p className="text-[#57534e] leading-relaxed">
              {PLACE_VIBRATIONS[placeAnalysis.reduced] || "Ce lieu possède une vibration unique qui influence votre structure énergétique de base."}
            </p>
          </div>

          <div className={`p-6 rounded-2xl border-l-4 shadow-sm ${isHarmonious ? 'border-green-500 bg-green-50/50' : 'border-orange-500 bg-orange-50/50'}`}>
            <h3 className={`text-lg font-bold mb-3 flex items-center gap-2 ${isHarmonious ? 'text-green-800' : 'text-orange-800'}`}>
              {isHarmonious ? "✨ Résonance Harmonieuse" : "⚡ Résonance Dynamique"}
            </h3>
            <p className="text-[#57534e] leading-relaxed">
              {isHarmonious 
                ? RESONANCE_DETAILS["harmonie"] 
                : RESONANCE_DETAILS["dynamique"]}
            </p>
          </div>
        </div>

        {/* VISUAL CARD (Replaces Map) */}
        <div className="md:col-span-5">
           <div className="h-full bg-[#292524] rounded-2xl p-8 text-[#fffbf0] flex flex-col justify-between relative overflow-hidden shadow-2xl">
              {/* Abstract decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d97706]/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-widest opacity-60 mb-2">Coordonnées Vibratoires</div>
                <div className="text-5xl font-serif mb-1">{vibration}</div>
                <div className="w-12 h-1 bg-[#d97706] mb-8"></div>
                
                <div className="space-y-6">
                   <div>
                     <div className="text-xs uppercase tracking-widest opacity-60 mb-1">Impact sur le Chemin de Vie</div>
                     <div className="text-xl font-medium">
                       {isHarmonious ? "Soutien & Stabilité" : "Défi & Stimulation"}
                     </div>
                   </div>
                   
                   <div>
                     <div className="text-xs uppercase tracking-widest opacity-60 mb-1">Élément Dominant</div>
                     <div className="text-xl font-medium">
                       {[1,5,9].includes(vibration) ? "Feu / Action" : 
                        [2,4,8].includes(vibration) ? "Terre / Structure" : 
                        [3,6,7].includes(vibration) ? "Air / Esprit" : "Eau / Émotion"}
                     </div>
                   </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs opacity-50 italic">
                "Le lieu de naissance n'est pas un hasard, c'est le terreau de l'âme."
              </div>
           </div>
        </div>
      </div>
      </div>
    </PageContainer>
  );
}
