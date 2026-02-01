
import PageContainer from './PageContainer';
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import { PLANET_INFLUENCES, ZODIAC_DETAILS, PLACE_VIBRATIONS, RESONANCE_DETAILS, HOUSE_MEANINGS } from '@/lib/numerology/interpretations-astro-geo';

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

export default function PartAstroV2({ userData, results, etymology }: { userData: UserData, results: NumerologyResult, etymology?: NameData | null }) {
  const birthPlace = userData.birthPlace || "Lieu Inconnu";
  const placeAnalysis = calculateWordValue(birthPlace);
  const vibration = results.astroResonance.birthPlaceVibration; // Should match placeAnalysis.reduced

  // Simple interpretation logic (placeholder for real Astrocartography)
  const resonance = (vibration + results.lifePath) % 9 || 9;
  const isHarmonious = [1, 3, 5, 6, 9].includes(resonance);

  // Advanced Profile Data
  const zodiacKey = results.advancedProfile?.zodiac?.toLowerCase();
  const planetKey = results.advancedProfile?.dominantPlanet?.toLowerCase();
  
  // Prefer Real Astro calculation if available
  const realZodiac = results.realAstro?.['Sun']?.signe;
  const realAscendant = results.realAstro?.['Ascendant']?.signe;
  const realHouse = results.realAstro?.['Sun']?.maison;
  const realMoon = results.realAstro?.['Moon']?.signe; // Signe Lunaire
  const realMercury = results.realAstro?.['Mercury']?.signe; // Mercure

  const zodiac = realZodiac || (zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "");
  const ascendant = realAscendant || "Inconnu";
  const moon = realMoon || "Inconnu";
  const mercury = realMercury || "Inconnu";

  const planet = planetKey ? planetKey.charAt(0).toUpperCase() + planetKey.slice(1) : "";
  
  const planetText = planetKey ? PLANET_INFLUENCES[planetKey] : "";
  // Use zodiac info based on real zodiac if available
  const zodiacInfoKey = realZodiac ? realZodiac.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : zodiacKey;
  const zodiacInfo = zodiacInfoKey ? ZODIAC_DETAILS[zodiacInfoKey] : null;
  const houseInfo = realHouse ? HOUSE_MEANINGS[realHouse as number] : null;
  
  // Ascendant Info
  const ascendantInfoKey = realAscendant ? realAscendant.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : null;
  const ascendantInfo = ascendantInfoKey ? ZODIAC_DETAILS[ascendantInfoKey] : null;
  
  // Helpers for Lunar and Ascendant info (could be moved to a dedicated data file)
  const getMoonInfo = (sign: string) => {
    const key = sign.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const info = ZODIAC_DETAILS[key];
    return info ? info.moonDesc : "Votre monde émotionnel, vos besoins intimes et votre instinct.";
  };

  return (
    <div className="space-y-32">
      {/* 1. ASTROLOGIE */}
      {results.advancedProfile && (
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Architecture Astrale</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light">L'alignement céleste au moment de votre premier souffle.</p>
          </div>

          <div className="space-y-12">
            {/* ZODIAC CARD (SUN) */}
            <div className="bg-white p-12 md:p-20 rounded-[60px] border border-[#C9A24D]/20 shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-[15rem] font-serif pointer-events-none text-[#2C2F4A]">♈</div>
               
               <div className="relative z-10 space-y-10">
                 <div className="flex flex-col md:flex-row items-center gap-8">
                   <div className="w-24 h-24 rounded-full bg-[#FAF9F7] border-2 border-[#C9A24D] flex items-center justify-center text-5xl shadow-lg">
                     <span>☀️</span>
                   </div>
                   <div className="text-center md:text-left">
                     <div className="text-xs uppercase tracking-[0.4em] text-[#8FA6A0] font-black mb-2">Signe Solaire</div>
                     <div className="text-4xl md:text-6xl font-serif text-[#1A1C2E] font-bold">{zodiac}</div>
                     <div className="text-sm text-[#C9A24D] font-bold mt-2 uppercase tracking-widest">L'Essence de ton Identité</div>
                   </div>
                 </div>

                 {zodiacInfo && (
                   <div className="flex justify-center md:justify-start gap-4">
                     <span className="px-6 py-2 bg-stone-100 text-stone-600 text-[10px] font-black rounded-full uppercase tracking-widest">{zodiacInfo.element}</span>
                     <span className="px-6 py-2 bg-stone-100 text-stone-600 text-[10px] font-black rounded-full uppercase tracking-widest">{zodiacInfo.quality}</span>
                   </div>
                 )}

                 {zodiacInfo && (
                   <p className="text-2xl text-[#1A1C2E] leading-relaxed font-light italic border-l-4 border-[#C9A24D]/30 pl-10">
                     "{zodiacInfo.description}"
                   </p>
                 )}
               </div>
            </div>

            {/* MOON CARD */}
            {results.realAstro && (
              <div className="bg-[#FAF9F7] p-12 md:p-20 rounded-[60px] border border-[#5B4B8A]/10 shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 text-[15rem] font-serif pointer-events-none text-[#5B4B8A]">☽</div>
                 
                 <div className="relative z-10 space-y-8">
                   <div className="flex flex-col md:flex-row items-center gap-8">
                     <div className="w-24 h-24 rounded-full bg-white border-2 border-[#5B4B8A] flex items-center justify-center text-5xl shadow-lg">
                       <span>🌙</span>
                     </div>
                     <div className="text-center md:text-left">
                       <div className="text-xs uppercase tracking-[0.4em] text-[#8FA6A0] font-black mb-2">Signe Lunaire</div>
                       <div className="text-4xl md:text-6xl font-serif text-[#1A1C2E] font-bold">{moon}</div>
                       <div className="text-sm text-[#5B4B8A] font-bold mt-2 uppercase tracking-widest">Tes Émotions Profondes</div>
                     </div>
                   </div>

                   <p className="text-2xl text-[#1A1C2E]/80 leading-relaxed font-light italic">
                     {getMoonInfo(moon)}
                   </p>
                 </div>
              </div>
            )}
            
            {/* ASCENDANT CARD */}
            {results.realAstro && (
              <div className="bg-[#1A1C2E] p-12 md:p-20 rounded-[60px] border border-[#C9A24D]/20 shadow-2xl relative overflow-hidden group text-white">
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A24D]/10 blur-[100px] rounded-full"></div>
                 <div className="relative z-10 space-y-10">
                   <div className="flex flex-col md:flex-row items-center gap-8">
                     <div className="w-24 h-24 rounded-full bg-white/10 border-2 border-[#C9A24D] flex items-center justify-center text-5xl shadow-lg">
                       <span>🏹</span>
                     </div>
                     <div className="text-center md:text-left">
                       <div className="text-xs uppercase tracking-[0.4em] text-white/40 font-black mb-2">Ascendant (AC)</div>
                       <div className="text-4xl md:text-6xl font-serif text-[#C9A24D] font-bold">{ascendant}</div>
                       <div className="text-sm text-white/40 font-bold mt-2 uppercase tracking-widest">Ton Image & Ta Destinée</div>
                     </div>
                   </div>

                   <p className="text-2xl text-white/80 leading-relaxed font-light italic border-l-4 border-[#C9A24D]/50 pl-10">
                     {ascendantInfo?.ascendantDesc || "L'Ascendant est la porte d'entrée de votre thème. Il décrit votre apparence, votre première impression sur les autres et la manière dont vous initiez les choses."}
                   </p>
                   
                   {houseInfo && (
                     <div className="pt-10 border-t border-white/10">
                        <div className="text-xs font-black text-[#C9A24D] uppercase tracking-[0.4em] mb-4">Position du Soleil</div>
                        <h4 className="text-3xl font-serif font-bold mb-4">{houseInfo.title}</h4>
                        <p className="text-xl text-white/60 font-light italic leading-relaxed">"{houseInfo.sunContext}"</p>
                     </div>
                   )}
                 </div>
              </div>
            )}

            {/* DOMINANTE CARD */}
            <div className="p-12 md:p-20 rounded-[60px] bg-white border border-stone-100 shadow-xl relative overflow-hidden group">
               <div className="relative z-10 space-y-10">
                 <div className="flex flex-col md:flex-row items-center gap-8">
                   <div className="w-24 h-24 rounded-full bg-[#FAF9F7] border-2 border-[#C9A24D] flex items-center justify-center text-5xl shadow-lg">
                     <span>🪐</span>
                   </div>
                   <div className="text-center md:text-left">
                     <div className="text-xs uppercase tracking-[0.4em] text-[#8FA6A0] font-black mb-2">Dominante Symbolique</div>
                     <div className="text-4xl md:text-6xl font-serif text-[#1A1C2E] font-bold">{planet}</div>
                   </div>
                 </div>

                 <div className="space-y-6">
                   <p className="text-2xl font-serif font-bold text-[#1A1C2E] italic">
                     Maître du Chemin de Vie {results.lifePath}
                   </p>
                   <p className="text-xl text-[#1A1C2E]/70 leading-relaxed font-light">
                     {planetText || `Votre Chemin de Vie ${results.lifePath} est gouverné par ${planet}. Cette influence colore votre destinée d'une énergie particulière.`}
                   </p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ETYMOLOGIE */}
      {etymology && (
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Échos Étymologiques</h2>
            <p className="text-[#1A1C2E]/60 text-xl font-light">La vibration secrète de votre nom.</p>
          </div>

          <div className="bg-[#FDFBF7] p-12 md:p-20 rounded-[80px] border border-[#C9A24D]/10 shadow-2xl relative overflow-hidden">
             <div className="absolute -top-10 -left-10 text-[20rem] font-serif text-[#C9A24D] opacity-5 select-none pointer-events-none">
               {userData.firstName.charAt(0)}
             </div>

             <div className="relative z-10 space-y-16">
               <div className="grid md:grid-cols-2 gap-12">
                 <div className="space-y-4">
                   <div className="text-xs font-black uppercase tracking-[0.4em] text-[#C9A24D]">Origine</div>
                   <div className="font-serif text-4xl md:text-5xl text-[#1A1C2E] font-bold">{etymology.origin}</div>
                   <div className="w-16 h-1 bg-[#C9A24D] mt-4"></div>
                 </div>
                 <div className="space-y-4">
                   <div className="text-xs font-black uppercase tracking-[0.4em] text-[#C9A24D]">Signification</div>
                   <p className="text-2xl md:text-3xl font-serif italic text-[#1A1C2E] leading-relaxed">"{etymology.meaning}"</p>
                 </div>
               </div>
               
               {etymology.spiritual && (
                 <div className="pt-12 border-t border-[#C9A24D]/10">
                   <div className="text-xs font-black uppercase tracking-[0.4em] text-[#8FA6A0] mb-6">Dimension Spirituelle</div>
                   <p className="text-2xl text-[#1A1C2E] leading-relaxed font-light italic border-l-4 border-[#C9A24D]/20 pl-10">
                     {etymology.spiritual}
                   </p>
                 </div>
               )}
             </div>
          </div>
        </div>
      )}

      {/* 3. ANCRAGE TERRESTRE */}
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-6">
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Ancrage Terrestre</h2>
          <p className="text-[#1A1C2E]/60 text-xl font-light">L'influence vibratoire de votre lieu de naissance.</p>
        </div>

        <div className="space-y-12">
          <div className="bg-white p-12 md:p-20 rounded-[60px] border border-stone-100 shadow-xl space-y-12">
            <div className="space-y-4 text-center">
              <div className="text-xs font-black text-[#C9A24D] uppercase tracking-[0.4em]">Analyse du Lieu</div>
              <h3 className="font-serif text-4xl md:text-6xl text-[#1A1C2E] font-bold">{birthPlace}</h3>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 bg-[#FAF9F7] p-8 rounded-[40px] border border-stone-100">
              {placeAnalysis.details.map((item, i) => (
                <div key={i} className="flex flex-col items-center w-12 h-16 bg-white rounded-2xl shadow-sm border border-stone-100 justify-center">
                  <span className="font-serif text-xl font-bold text-[#1A1C2E]">{item.char}</span>
                  <span className="text-[10px] text-[#C9A24D] font-black">{item.val}</span>
                </div>
              ))}
              <div className="flex items-center gap-4 ml-4">
                <span className="text-2xl text-[#C9A24D]">=</span>
                <span className="text-3xl font-serif font-bold text-[#1A1C2E]">{placeAnalysis.sum}</span>
                <span className="text-2xl text-[#C9A24D]">→</span>
                <div className="w-16 h-16 rounded-full bg-[#C9A24D] text-white flex items-center justify-center text-3xl font-serif font-bold shadow-xl shadow-[#C9A24D]/20">
                  {placeAnalysis.reduced}
                </div>
              </div>
            </div>

            <p className="text-2xl text-[#1A1C2E] leading-relaxed font-light italic text-center max-w-2xl mx-auto">
              "{PLACE_VIBRATIONS[placeAnalysis.reduced] || "Ce lieu possède une vibration unique qui influence votre structure énergétique de base."}"
            </p>
          </div>

          <div className="p-12 md:p-20 rounded-[60px] bg-[#1A1C2E] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A24D]/10 blur-[100px] rounded-full"></div>
            <div className="relative z-10 space-y-12">
              <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="space-y-4 text-center md:text-left">
                  <div className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Coordonnées Vibratoires</div>
                  <div className="text-7xl md:text-9xl font-serif font-bold text-[#C9A24D]">{vibration}</div>
                </div>
                <div className={`px-10 py-6 rounded-[40px] border-2 shadow-2xl ${isHarmonious ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-[#C9A24D]/30 bg-[#C9A24D]/10 text-[#C9A24D]'}`}>
                  <h4 className="text-2xl font-serif font-bold italic mb-2">
                    {isHarmonious ? "✨ Résonance Harmonieuse" : "⚡ Résonance Dynamique"}
                  </h4>
                  <p className="text-white/70 font-light">
                    {isHarmonious ? "Soutien & Stabilité" : "Défi & Stimulation"}
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
                <div className="space-y-4">
                  <div className="text-xs font-black text-[#C9A24D] uppercase tracking-widest">Analyse de la Résonance</div>
                  <p className="text-xl text-white/80 leading-relaxed font-light">
                    {isHarmonious ? RESONANCE_DETAILS["harmonie"] : RESONANCE_DETAILS["dynamique"]}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="text-xs font-black text-[#C9A24D] uppercase tracking-widest">Élément Dominant du Lieu</div>
                  <div className="text-3xl font-serif font-bold text-white">
                    {[1,5,9].includes(vibration) ? "Feu / Action" : 
                     [2,4,8].includes(vibration) ? "Terre / Structure" : 
                     [3,6,7].includes(vibration) ? "Air / Esprit" : "Eau / Émotion"}
                  </div>
                  <p className="text-white/50 italic leading-relaxed">
                    "Le lieu de naissance n'est pas un hasard, c'est le terreau de l'âme."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
