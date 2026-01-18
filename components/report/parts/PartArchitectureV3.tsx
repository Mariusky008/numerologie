import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { getNumberArchetype, getDayOfBirthContent } from '@/lib/numerology/contentGenerator';
import { PLANET_INFLUENCES, ZODIAC_DETAILS } from '@/lib/numerology/interpretations-astro-geo';

// Colors from the design system
const COLORS = {
  blue: '#1B263B', // Structure / Numérologie
  sienna: '#E07A5F', // Action / Astrologie
  gold: '#D4A373', // Synthèse
  bg: '#FDFBF7'
};

interface PartArchitectureV3Props {
  userData: UserData;
  results: NumerologyResult;
}

export default function PartArchitectureV3({ userData, results }: PartArchitectureV3Props) {
  // --- DATA PREPARATION ---
  
  // 1. Pilier Central (Chemin de Vie + Signe)
  const lpArchetype = getNumberArchetype(results.lifePath);
  const zodiacKey = results.advancedProfile?.zodiac?.toLowerCase();
  const zodiacInfo = zodiacKey ? ZODIAC_DETAILS[zodiacKey] : null;
  const zodiacName = zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "Inconnu";

  // 2. Interface Sociale (Expression + Image Publique)
  const exprArchetype = getNumberArchetype(results.expression);
  // Fallback to zodiac element/quality if no specific Ascendant data
  
  // 3. Sanctuaire Intérieur (Élan Spirituel + Planète)
  const soulArchetype = getNumberArchetype(results.soulUrge);
  const planetKey = results.advancedProfile?.dominantPlanet?.toLowerCase();
  const planetName = planetKey ? planetKey.charAt(0).toUpperCase() + planetKey.slice(1) : "Inconnue";
  
  // 4. Puissance d'Action (Réalisation + Élément)
  // Realization number is often derived or similar to Day of Birth in some systems, 
  // but let's use the Day of Birth content or similar for "Action" if Realization isn't explicitly calculated in `results` types yet (it's often part of the advanced set).
  // Actually `results.inclusionGrid` gives forces. Let's use Day of Birth as a proxy for "Action/Skill" or stick to Expression if Realization is missing.
  // Wait, `results` doesn't have "Realization" explicitly named, usually it's derived. Let's use "Day of Birth" (Don de Naissance) for Action.
  // Or better, let's use the first "Force" (Excess) if available, or just the Day.
  // Let's use Day of Birth for now.
  const dayNum = parseInt(userData.birthDate.split('-')[2]);
  const actionContent = getDayOfBirthContent(dayNum);


  return (
    <>
      {/* PAGE DE GARDE V3 */}
      <PageContainer className="items-center justify-center p-8 bg-[#fffbf0] text-[#44403c] relative overflow-hidden">
        <div className="absolute inset-0 border-[20px] border-[#fffbf0] pointer-events-none z-10" />
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
           {/* Abstract Background Geometry */}
           <div className="w-[800px] h-[800px] border border-[#1B263B] rounded-full" />
           <div className="w-[600px] h-[600px] border border-[#E07A5F] rounded-full absolute" />
           <div className="w-[400px] h-[400px] border border-[#D4A373] rounded-full absolute" />
        </div>

        <div className="z-20 text-center space-y-6">
          <h2 className="text-xl tracking-[0.3em] uppercase text-[#E07A5F]">Analyse Fusionnée</h2>
          <h1 className="text-5xl md:text-7xl font-serif text-[#1B263B] leading-tight">
            L'ARCHITECTURE<br/> DE {userData.firstName.toUpperCase()}
          </h1>
          <div className="w-24 h-1 bg-[#D4A373] mx-auto my-8" />
          
          <div className="flex justify-center gap-8 text-sm font-medium tracking-widest text-[#1B263B]/80 uppercase">
            <span>Chemin {results.lifePath}</span>
            <span>•</span>
            <span>Signe {zodiacName}</span>
          </div>
        </div>
      </PageContainer>

      {/* INTRODUCTION: MANUEL D'UTILISATION */}
      <PageContainer className="p-8 md:p-16 justify-center">
        <h2 className="text-3xl font-serif text-[#1B263B] mb-8 border-l-4 border-[#E07A5F] pl-6">
          VOTRE MANUEL D'UTILISATION
        </h2>
        <div className="prose prose-lg text-[#57534e] leading-relaxed">
          <p>
            Bienvenue dans l'analyse de vos blocs énergétiques. Ce dossier n'est pas une simple lecture linéaire, 
            c'est une <strong>architecture</strong>. Nous allons construire, étage par étage, la compréhension de qui vous êtes.
          </p>
          <p>
            Chaque section fusionne deux langages sacrés :
          </p>
          <ul className="list-none space-y-4 mt-6">
            <li className="flex items-center gap-4">
              <span className="w-4 h-4 rounded-full bg-[#1B263B]" />
              <span className="font-bold text-[#1B263B]">La Structure (Numérologie)</span>
              <span className="text-sm text-gray-500">- Votre ossature, vos besoins fondamentaux.</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-4 h-4 rounded-full bg-[#E07A5F]" />
              <span className="font-bold text-[#E07A5F]">Le Mouvement (Astrologie)</span>
              <span className="text-sm text-gray-500">- Votre carburant, votre façon de réagir.</span>
            </li>
            <li className="flex items-center gap-4">
              <span className="w-4 h-4 rounded-full bg-[#D4A373]" />
              <span className="font-bold text-[#D4A373]">La Synthèse (L'Or)</span>
              <span className="text-sm text-gray-500">- La clé alchimique pour activer votre potentiel.</span>
            </li>
          </ul>
        </div>
      </PageContainer>

      {/* I. LE PILIER CENTRAL */}
      <PageContainer className="p-8 md:p-16">
        <div className="mb-12">
          <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-sm">Partie 1</span>
          <h2 className="text-4xl font-serif text-[#1B263B] mt-2">LE PILIER CENTRAL</h2>
          <p className="text-[#1B263B]/60 italic mt-2">Votre Essence : Chemin de Vie & Soleil</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Bloc Numéro */}
          <div className="bg-[#1B263B]/5 p-8 rounded-xl border-l-4 border-[#1B263B]">
            <h3 className="text-[#1B263B] font-bold uppercase tracking-wider mb-4 text-sm">L'Ingrédient Structure</h3>
            <div className="text-5xl font-serif text-[#1B263B] mb-4">{results.lifePath}</div>
            <h4 className="text-xl font-serif text-[#1B263B] mb-2">{lpArchetype.title}</h4>
            <p className="text-sm text-[#1B263B]/80 leading-relaxed">
              {lpArchetype.mission}
            </p>
          </div>

          {/* Bloc Astro */}
          <div className="bg-[#E07A5F]/5 p-8 rounded-xl border-l-4 border-[#E07A5F]">
            <h3 className="text-[#E07A5F] font-bold uppercase tracking-wider mb-4 text-sm">L'Ingrédient Mouvement</h3>
            <div className="text-5xl font-serif text-[#E07A5F] mb-4">☉</div>
            <h4 className="text-xl font-serif text-[#E07A5F] mb-2">{zodiacName}</h4>
            <p className="text-sm text-[#E07A5F]/80 leading-relaxed">
              {zodiacInfo ? zodiacInfo.description : "Une énergie solaire qui cherche à rayonner."}
            </p>
          </div>
        </div>

        {/* Synthèse Or */}
        <div className="bg-[#D4A373] text-white p-8 md:p-12 rounded-xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h3 className="text-white/90 font-bold uppercase tracking-wider mb-4 text-sm relative z-10">La Synthèse Alchimique</h3>
          <p className="text-xl md:text-2xl font-serif leading-relaxed relative z-10">
            "Votre réussite passe par l'alliance de la <strong>{lpArchetype.keywords[0]}</strong> (Chemin {results.lifePath}) 
            et de l'énergie <strong>{zodiacInfo?.quality || 'vitale'}</strong> du {zodiacName}. 
            {lpArchetype.keyAdvice[0]}"
          </p>
        </div>
      </PageContainer>

      {/* II. L'INTERFACE SOCIALE */}
      <PageContainer className="p-8 md:p-16">
        <div className="mb-12">
          <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-sm">Partie 2</span>
          <h2 className="text-4xl font-serif text-[#1B263B] mt-2">L'INTERFACE SOCIALE</h2>
          <p className="text-[#1B263B]/60 italic mt-2">Votre Personnalité : Expression & Image Publique</p>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8">
           <div className="flex flex-col md:flex-row gap-8">
              {/* Numéro */}
              <div className="flex-1 space-y-4">
                <div className="text-[#1B263B] font-bold border-b border-[#1B263B] pb-2">Vibration d'Expression {results.expression}</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {exprArchetype.desc}
                </p>
                <div className="bg-[#1B263B] text-white px-4 py-2 text-xs inline-block rounded-full">
                  Talent : {exprArchetype.keywords[1]}
                </div>
              </div>

              {/* Astro Proxy (Image Publique from MC Data if avail, or Element) */}
              <div className="flex-1 space-y-4">
                <div className="text-[#E07A5F] font-bold border-b border-[#E07A5F] pb-2">Rayonnement Naturel</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {results.advancedProfile?.mcData?.image_publique || 
                   `Votre signe ${zodiacName} colore votre expression d'une teinte ${zodiacInfo?.element || 'unique'}.`}
                </p>
                <div className="bg-[#E07A5F] text-white px-4 py-2 text-xs inline-block rounded-full">
                   Perçu comme : {results.advancedProfile?.mcData?.vocation || "Quelqu'un d'entier"}
                </div>
              </div>
           </div>
        </div>

        {/* Synthèse Fusion */}
        <div className="mt-8 border-t-2 border-[#D4A373] pt-8 text-center">
           <h3 className="text-[#D4A373] font-serif text-2xl mb-4">L'Archétype Fusionné</h3>
           <p className="text-gray-600 max-w-2xl mx-auto italic">
             "Vous êtes perçu comme un <strong>{exprArchetype.title}</strong> teinté de l'aura du {zodiacName}. 
             Votre défi est d'aligner cette image publique avec votre vérité intérieure."
           </p>
        </div>
      </PageContainer>

      {/* III. LE SANCTUAIRE INTÉRIEUR */}
      <PageContainer className="p-8 md:p-16 bg-[#1B263B] text-white">
        <div className="mb-12">
          <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-sm">Partie 3</span>
          <h2 className="text-4xl font-serif text-white mt-2">LE SANCTUAIRE INTÉRIEUR</h2>
          <p className="text-white/60 italic mt-2">Cœur & Émotions : Élan Spirituel & Planète Maîtresse</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <div className="space-y-6">
              <h3 className="text-[#D4A373] font-serif text-xl">Vos Besoins Profonds ({results.soulUrge})</h3>
              <p className="text-white/80 leading-relaxed">
                {soulArchetype.extendedDesc.split('\n')[0]}
              </p>
              <p className="text-white/80 leading-relaxed">
                {soulArchetype.love}
              </p>
           </div>
           
           <div className="space-y-6 border-l border-white/10 pl-8">
              <h3 className="text-[#E07A5F] font-serif text-xl">Influence Planétaire ({planetName})</h3>
              <p className="text-white/80 leading-relaxed">
                 La planète {planetName} gouverne votre chemin. {PLANET_INFLUENCES[planetKey as keyof typeof PLANET_INFLUENCES] || "Elle apporte une nuance particulière à votre sensibilité."}
              </p>
              <div className="bg-white/10 p-4 rounded-lg">
                <span className="text-[#D4A373] font-bold text-sm block mb-2">Conseil d'Alignement :</span>
                <p className="text-sm italic">
                  "{soulArchetype.keyAdvice[1]}"
                </p>
              </div>
           </div>
        </div>
      </PageContainer>

      {/* IV. PUISSANCE D'ACTION */}
      <PageContainer className="p-8 md:p-16">
        <div className="mb-12">
          <span className="text-[#E07A5F] font-bold tracking-widest uppercase text-sm">Partie 4</span>
          <h2 className="text-4xl font-serif text-[#1B263B] mt-2">LA PUISSANCE D'ACTION</h2>
          <p className="text-[#1B263B]/60 italic mt-2">Concrétisation & Talents</p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
           <div className="w-full md:w-1/3 text-center">
              <div className="w-48 h-48 rounded-full border-4 border-[#1B263B] flex items-center justify-center mx-auto mb-6">
                 <span className="text-6xl font-serif text-[#1B263B]">{dayNum}</span>
              </div>
              <h3 className="text-[#1B263B] font-bold uppercase">Le Don de Naissance</h3>
           </div>
           
           <div className="w-full md:w-2/3 space-y-6">
              <h3 className="text-2xl font-serif text-[#E07A5F]">{actionContent.title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {actionContent.desc}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                 <div className="bg-[#FDFBF7] p-4 rounded border border-[#D4A373]/30">
                    <span className="text-[#D4A373] font-bold block mb-1">Force</span>
                    <span className="text-sm text-gray-600">{actionContent.keywords[0]}</span>
                 </div>
                 <div className="bg-[#FDFBF7] p-4 rounded border border-[#D4A373]/30">
                    <span className="text-[#D4A373] font-bold block mb-1">Défi</span>
                    <span className="text-sm text-gray-600">{actionContent.challenge}</span>
                 </div>
              </div>
           </div>
        </div>
      </PageContainer>

      {/* V. NAVIGATION TEMPORELLE */}
      <PageContainer className="p-8 md:p-16 bg-[#fffbf0] relative">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1B263B] via-[#E07A5F] to-[#D4A373]" />
         
         <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-[#1B263B]">NAVIGATION TEMPORELLE</h2>
            <div className="inline-block bg-[#1B263B] text-white px-6 py-2 rounded-full mt-4 text-sm font-bold tracking-widest uppercase">
              Année Personnelle {results.personalYear}
            </div>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#1B263B]">
               <h3 className="text-[#1B263B] font-serif text-xl mb-4">L'Ambiance</h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 C'est une année de vibration {results.personalYear}. Elle demande de s'aligner avec l'énergie du {getNumberArchetype(results.personalYear).keywords[0]}.
               </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#E07A5F]">
               <h3 className="text-[#E07A5F] font-serif text-xl mb-4">Le Défi</h3>
               <p className="text-gray-600 text-sm leading-relaxed">
                 {getNumberArchetype(results.personalYear).challenge}
               </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm border-t-4 border-[#D4A373]">
               <h3 className="text-[#D4A373] font-serif text-xl mb-4">Le Conseil</h3>
               <p className="text-gray-600 text-sm leading-relaxed italic">
                 "{getNumberArchetype(results.personalYear).keyAdvice[0]}"
               </p>
            </div>
         </div>
      </PageContainer>

      {/* CONCLUSION: 3 CLÉS D'ACTIVATION */}
      <PageContainer className="p-8 md:p-16 justify-center bg-[#1B263B] text-white text-center">
         <h2 className="text-3xl md:text-5xl font-serif text-[#D4A373] mb-12">VOS 3 CLÉS D'ACTIVATION</h2>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6 border border-[#D4A373]/30 rounded-lg bg-white/5">
               <div className="text-[#E07A5F] text-sm uppercase tracking-widest mb-4">Mental</div>
               <p className="font-serif text-xl">"{lpArchetype.keyAdvice[0]}"</p>
            </div>
            <div className="p-6 border border-[#D4A373]/30 rounded-lg bg-white/5">
               <div className="text-[#E07A5F] text-sm uppercase tracking-widest mb-4">Émotionnel</div>
               <p className="font-serif text-xl">"Écoutez votre {soulArchetype.keywords[0]}"</p>
            </div>
            <div className="p-6 border border-[#D4A373]/30 rounded-lg bg-white/5">
               <div className="text-[#E07A5F] text-sm uppercase tracking-widest mb-4">Action</div>
               <p className="font-serif text-xl">"{actionContent.keywords[0]}"</p>
            </div>
         </div>

         <div className="mt-16 max-w-2xl mx-auto">
            <p className="text-[#D4A373] italic text-lg">
               "Je construis mon royaume avec la sagesse du {results.lifePath} et je rayonne comme un {zodiacName} pour éclairer les autres."
            </p>
         </div>
      </PageContainer>
    </>
  );
}