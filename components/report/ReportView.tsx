'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { UserData, NumerologyResult } from '@/lib/types';
import { 
  calculateLifePath, 
  calculateNameNumbers, 
  calculatePersonalYear, 
  getProfessionalAxes,
  calculateInclusionGrid,
  analyzeInclusion,
  calculateSubconsciousSelf,
  calculateBridge,
  calculateChallenges,
  calculateCycles,
  generateCareerForecast,
  calculateDeepChallenges,
  calculatePlaceVibration,
  getAdvancedProfile,
  calculateLifePathDetailed,
  calculateNameNumbersDetailed,
  calculateTransits,
  calculatePlanesOfExpression,
  calculatePersonalMonth,
  calculatePersonalDay
} from '@/lib/numerology/engine';
import { fetchNameAnalysis, NameData } from '@/lib/numerology/db_etymology';
import { calculerThemeAstral, calculerTransits as calculerTransitsAstro } from '@/lib/astro/engine';
import { PLANET_INFLUENCES, ZODIAC_DETAILS, HOUSE_MEANINGS } from '@/lib/numerology/interpretations-astro-geo';
import PersonalityRadar from './PersonalityRadar';
import InclusionGridViz from './InclusionGridViz';
import interpretations from '@/lib/numerology/interpretations.json';
import { Download, BookOpen, Check } from 'lucide-react';
import BookCreationModal from './BookCreationModal';
import BookBackCover from './BookBackCover';
import WahooRevelation from './WahooRevelation';
import { trackEvent } from '@/lib/analytics';
import { PEDAGOGY_CONTENT } from '@/lib/numerology/modules/pedagogy';
import { TRAINING_30D } from '@/lib/numerology/modules/training30d';
import { analyzeNameSignature } from '@/lib/numerology/modules/anthroponymy';
import { generateDecadeForecast } from '@/lib/numerology/modules/decade';
import CosmicHeader from '@/components/report/design-system/CosmicHeader';
import KeyNumbersSection from '@/components/report/design-system/KeyNumbersSection';

import { useRouter } from 'next/navigation';

interface ReportViewProps {
  userData: UserData;
}

export default function ReportView({ userData }: ReportViewProps) {
  const router = useRouter();
  const [results, setResults] = useState<NumerologyResult | null>(null);
  const [etymology, setEtymology] = useState<NameData | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  // New: Decade Forecast Calculation
  const decadeForecast = userData ? generateDecadeForecast(userData.birthDate) : [];
  const nameSignature = userData ? analyzeNameSignature(userData.firstName + " " + userData.lastName) : null;

  useEffect(() => {
    // Check for payment success parameter to auto-open modal
    // REMOVED: Logic moved to success page to prevent showing modal for non-book purchases
    // const params = new URLSearchParams(window.location.search);
    // if (params.get('payment_success') === 'true') {
    //   setShowBookModal(true);
    // }

    if (userData) {
      // Async fetch for etymology
      fetchNameAnalysis(userData.firstName.split(' ')[0]).then(data => {
        if (data) setEtymology(data);
      });

      const lifePath = calculateLifePath(userData.birthDate);
      const lifePathDetails = calculateLifePathDetailed(userData.birthDate);
      
      const nameNumbers = calculateNameNumbers(userData.firstName + userData.lastName);
      const nameNumbersDetails = calculateNameNumbersDetailed(userData.firstName + userData.lastName);
      
      const personalYear = calculatePersonalYear(userData.birthDate);
      const axes = getProfessionalAxes(lifePath, nameNumbers.expression);
      
      // New Calculations
      const inclusionGrid = calculateInclusionGrid(userData.firstName + userData.lastName);
      const { missing, excess } = analyzeInclusion(inclusionGrid);
      const subconsciousSelf = calculateSubconsciousSelf(inclusionGrid);
      const bridgeNumber = calculateBridge(lifePath, nameNumbers.expression);
      const challenges = calculateChallenges(userData.birthDate);
      const cycles = calculateCycles(userData.birthDate); // returns {cycle1, cycle2, cycle3, cycle4}
      const deepChallenges = calculateDeepChallenges(userData.birthDate);
      const birthPlaceVibration = calculatePlaceVibration(userData.birthPlace || "");
      const careerForecast = generateCareerForecast(userData.birthDate, 2026);
      
      // Calculate Transits
      const transits = calculateTransits(userData.firstName, userData.lastName, userData.birthDate);

      // Advanced Profile
      const advancedProfile = getAdvancedProfile(lifePath, userData.birthDate);

      // --- TEMPORAL SYNTHESIS (Weather of the Day) ---
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentDay = now.getDate();
      const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
      const personalDay = calculatePersonalDay(personalMonth, currentDay);
      const astroTransits = calculerTransitsAstro(now);

      // --- REAL ASTROLOGY CALCULATION ---
      if (userData.birthPlace) {
        // We trigger this asynchronously to not block initial render
        fetch(`/api/geocode?city=${encodeURIComponent(userData.birthPlace)}`)
          .then(res => res.json())
          .then(geoData => {
            if (geoData.lat && geoData.lng) {
              const astroData = calculerThemeAstral(userData.birthDate, undefined, geoData.lat, geoData.lng);
              setResults(prev => prev ? ({ ...prev, realAstro: astroData }) : null);
            }
          })
          .catch(err => console.error("Geocoding failed:", err));
      }

      setResults({
        lifePath,
        ...nameNumbers,
        personalYear,
        details: {
          lifePath: lifePathDetails,
          expression: nameNumbersDetails.expression,
          soulUrge: nameNumbersDetails.soulUrge,
          personality: nameNumbersDetails.personality
        },
        professionalAxes: axes,
        inclusionGrid,
        missingNumbers: missing,
        excessNumbers: excess,
        subconsciousSelf,
        bridgeNumber,
        challenges: {
          minor1: challenges.challenge1,
          minor2: challenges.challenge2,
          major: challenges.challengeMajor,
          major2: challenges.challenge4
        },
        cycles: {
            cycle1: cycles.cycle1,
            cycle2: cycles.cycle2,
            cycle3: cycles.cycle3,
            cycle4: cycles.cycle4
        },
        deepChallenges,
        astroResonance: {
            birthPlaceVibration
        },
        careerForecast,
        transits,
        advancedProfile
      });
    }
  }, [userData]);

  if (!results) return null;

  // Type assertion for interpretations
  const lifePathText = results.advancedProfile?.pathData?.essence || (interpretations.lifePath as any)[results.lifePath.toString()] || "Chemin unique.";
  const expressionText = (interpretations.expression as any)[results.expression.toString()] || "Expression unique.";

  // Advanced data display helpers
  const zodiacKey = results.advancedProfile?.zodiac?.toLowerCase();
  const planetKey = results.advancedProfile?.dominantPlanet?.toLowerCase();
  
  // Prefer Real Astro calculation if available
  const realZodiac = results.realAstro?.['Sun']?.signe;
  const realAscendant = results.realAstro?.['Ascendant']?.signe;
  const realHouse = results.realAstro?.['Sun']?.maison;
  
  const zodiac = realZodiac || (zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "");
  const ascendant = realAscendant || "Inconnu (Heure nécessaire)";
  
  const planet = planetKey ? planetKey.charAt(0).toUpperCase() + planetKey.slice(1) : "";
  
  const planetText = planetKey ? PLANET_INFLUENCES[planetKey] : "";
  // Use zodiac info based on real zodiac if available
  const zodiacInfoKey = realZodiac ? realZodiac.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : zodiacKey;
  const zodiacInfo = zodiacInfoKey ? ZODIAC_DETAILS[zodiacInfoKey] : null;
  const houseInfo = realHouse ? HOUSE_MEANINGS[realHouse as number] : null;

  const pathTitle = results.advancedProfile?.pathData?.titre || `Chemin de Vie ${results.lifePath}`;

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] font-sans overflow-x-hidden">
      
      {/* NOUVEAU HEADER COSMIQUE - Remplace l'ancien header */}
      <CosmicHeader 
        firstName={userData.firstName}
        lastName={userData.lastName}
        lifePath={results.lifePath}
      />

      <div className="p-4 md:p-8">
        
        {/* SECTION ANTHROPONYMIE */}
      {nameSignature && (
        <motion.div className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm mb-12">
           <h3 className="text-xl font-serif text-[#2C2F4A] mb-4">Signature Vibratoire du Nom</h3>
           
           {/* Si on a trouvé l'étymologie, on l'affiche en grand */}
           {nameSignature.etymology && (
             <div className="mb-8 p-6 bg-[#2C2F4A] rounded-xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="text-xs uppercase tracking-widest text-[#C9A24D] mb-2">Origine & Sens Caché</div>
                  <h4 className="text-2xl font-serif mb-2">{userData.firstName}</h4>
                  <div className="flex flex-wrap gap-4 text-sm mb-4 opacity-80">
                    <span className="bg-white/10 px-3 py-1 rounded-full">{nameSignature.etymology.origin}</span>
                    <span className="italic">"{nameSignature.etymology.meaning}"</span>
                  </div>
                  {nameSignature.etymology.spiritual && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-sm leading-relaxed italic text-[#C9A24D]">
                        ✨ Dimension Spirituelle : {nameSignature.etymology.spiritual}
                      </p>
                    </div>
                  )}
                </div>
             </div>
           )}

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-[#FAF9F7] p-4 rounded-lg text-center">
               <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-1">Initiale</div>
               <div className="text-4xl font-serif text-[#C9A24D]">{nameSignature.firstLetter}</div>
               <p className="text-xs text-[#2C2F4A]/60 mt-2">{nameSignature.initialMeaning}</p>
             </div>
             <div className="bg-[#FAF9F7] p-4 rounded-lg text-center">
               <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-1">Type de Signature</div>
               <div className="text-xl font-bold text-[#2C2F4A] mt-2">{nameSignature.signatureType}</div>
               <p className="text-xs text-[#2C2F4A]/60 mt-2">
                 {nameSignature.vowelsCount} voyelles / {nameSignature.consonantsCount} consonnes
               </p>
             </div>
             <div className="bg-[#FAF9F7] p-4 rounded-lg text-center">
               <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-1">Longueur</div>
               <div className="text-xl font-bold text-[#2C2F4A] mt-2">{nameSignature.length} Lettres</div>
               <p className="text-xs text-[#2C2F4A]/60 mt-2">Vibration de l'amplitude</p>
             </div>
           </div>
        </motion.div>
      )}

        {/* WAHOO REVELATION SECTION - Added for high impact */}
        <WahooRevelation userData={userData} results={results} />



        {/* Visualization Section 1: Radar & Axes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <PersonalityRadar data={results} />
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
             className="space-y-6"
          >
            <div className="bg-white p-6 rounded-xl border border-[#EFEDE9] shadow-sm">
              <h3 className="text-xl font-serif text-[#2C2F4A] mb-4">Axes Professionnels</h3>
              <div className="flex flex-wrap gap-2">
                {results.professionalAxes.map((axis, i) => (
                  <span key={i} className="px-3 py-1 bg-[#FAF9F7] text-[#5B4B8A] rounded-full text-sm border border-[#5B4B8A]/20 font-medium">
                    {axis}
                  </span>
                ))}
              </div>
            </div>

            {results.planesOfExpression && (
              <div className="bg-white p-6 rounded-xl border border-[#EFEDE9] shadow-sm">
                <h3 className="text-xl font-serif text-[#2C2F4A] mb-4">Plans d'Expression</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Mental */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Mental</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.mental}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${results.planesOfExpression.mental}%` }} className="h-full bg-blue-400" />
                      </div>
                    </div>
                    {/* Physique */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Physique</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.physical}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${results.planesOfExpression.physical}%` }} className="h-full bg-red-400" />
                      </div>
                    </div>
                    {/* Émotionnel */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Émotionnel</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.emotional}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${results.planesOfExpression.emotional}%` }} className="h-full bg-green-400" />
                      </div>
                    </div>
                    {/* Intuitif */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Intuitif</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.intuitive}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${results.planesOfExpression.intuitive}%` }} className="h-full bg-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-xl border border-[#EFEDE9] shadow-sm">
              <h3 className="text-xl font-serif text-[#2C2F4A] mb-4">Année Personnelle {results.personalYear}</h3>
              <p className="text-[#2C2F4A]/80">
                Votre vibration pour l'année en cours. Une période propice à l'alignement avec vos objectifs profonds.
              </p>

              {results.transits && (
                <div className="mt-6 pt-4 border-t border-[#EFEDE9]">
                  <h4 className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider mb-3">Météo Vibratoire (Transits)</h4>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-[#FAF9F7] p-2 rounded text-center">
                       <span className="text-[10px] text-[#8FA6A0] block">Physique</span>
                       <span className="text-xl font-bold text-[#2C2F4A]">{results.transits.physical}</span>
                    </div>
                    <div className="bg-[#FAF9F7] p-2 rounded text-center">
                       <span className="text-[10px] text-[#8FA6A0] block">Mental</span>
                       <span className="text-xl font-bold text-[#2C2F4A]">{results.transits.mental}</span>
                    </div>
                    <div className="bg-[#FAF9F7] p-2 rounded text-center">
                       <span className="text-[10px] text-[#8FA6A0] block">Spirituel</span>
                       <span className="text-xl font-bold text-[#2C2F4A]">{results.transits.spiritual}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Visualization Section 2: Inclusion Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-2xl font-serif text-[#2C2F4A] mb-4">Grille d'Inclusion</h3>
               <p className="text-[#2C2F4A]/80 mb-6">
                 Cette matrice révèle la répartition de vos énergies. Les cases vides indiquent des dettes karmiques (leçons à apprendre), tandis que les cases chargées révèlent vos forces innées.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold">
                      {results.missingNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-[#2C2F4A] font-medium">Dettes Karmiques</div>
                      <div className="text-sm text-[#8FA6A0]">Nombres manquants</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                      {results.excessNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-[#2C2F4A] font-medium">Forces Acquises</div>
                      <div className="text-sm text-[#8FA6A0]">Nombres en excès</div>
                    </div>
                  </div>
               </div>
             </div>
             <div>
               <InclusionGridViz 
                 grid={results.inclusionGrid} 
                 missing={results.missingNumbers} 
                 excess={results.excessNumbers} 
               />
             </div>
          </div>
        </motion.div>

        {/* SECTION VII: Architecture Astrale */}
        {results.advancedProfile && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.7 }}
             className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm"
           >
             <h3 className="text-2xl font-serif text-[#2C2F4A] mb-6 flex items-center gap-3">
               <span className="text-[#C9A24D]">VII.</span> Architecture Astrale
             </h3>

             {/* Pedagogie Maisons */}
             <div className="mb-8 bg-[#FAF9F7] p-6 rounded-xl border border-[#C9A24D]/20">
               <h4 className="font-serif text-[#2C2F4A] text-lg mb-2">Comprendre les Maisons Astrologiques</h4>
               <p className="text-[#2C2F4A]/80 text-sm mb-4 leading-relaxed">
                 Les signes et planètes décrivent <strong>comment</strong> vous fonctionnez. Les maisons indiquent <strong>où</strong> cette énergie s’exprime concrètement. C'est la carte de vos domaines de vie.
               </p>
               <details className="group">
                 <summary className="cursor-pointer text-[#C9A24D] text-sm font-bold flex items-center gap-2">
                   <span>Voir les 12 domaines de vie</span>
                   <span className="group-open:rotate-180 transition-transform">▼</span>
                 </summary>
                 <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-[#2C2F4A]/70">
                   {Object.entries(HOUSE_MEANINGS).map(([num, h]) => (
                     <div key={num}><span className="font-bold text-[#5B4B8A]">{h.title} :</span> {h.keywords}</div>
                   ))}
                 </div>
               </details>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Zodiac */}
                <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#C9A24D]/10">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="text-4xl">♈</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Signe Solaire</div>
                       <div className="text-xl font-serif text-[#2C2F4A] font-bold">{zodiac}</div>
                       {results.realAstro && (
                         <div className="text-xs text-[#C9A24D] mt-1 space-y-1">
                           <div>Ascendant : <span className="font-bold">{ascendant}</span></div>
                           {houseInfo && (
                             <div className="mt-2 border-t border-[#C9A24D]/20 pt-2">
                               <div className="font-bold text-[#2C2F4A] mb-1">Soleil en {houseInfo.title}</div>
                               <div className="text-[#2C2F4A]/70 italic leading-snug">
                                 "{houseInfo.sunContext}"
                               </div>
                             </div>
                           )}
                         </div>
                       )}
                     </div>
                   </div>

                   {zodiacInfo && (
                     <div className="flex gap-2 mb-4">
                       <span className="px-3 py-1 bg-white text-[#5B4B8A] text-xs rounded-full uppercase tracking-wider font-bold border border-[#5B4B8A]/10">{zodiacInfo.element}</span>
                       <span className="px-3 py-1 bg-white text-[#5B4B8A] text-xs rounded-full uppercase tracking-wider font-bold border border-[#5B4B8A]/10">{zodiacInfo.quality}</span>
                     </div>
                   )}

                   {results.advancedProfile.mcData && (
                     <div className="space-y-3 text-sm text-[#2C2F4A]/80">
                       <p><strong>Image Publique :</strong> {results.advancedProfile.mcData.image_publique}</p>
                       <p><strong>Vocation :</strong> {results.advancedProfile.mcData.vocation}</p>
                       <p className="italic text-[#C9A24D]">"{results.advancedProfile.mcData.cle_reussite}"</p>
                     </div>
                   )}

                   {zodiacInfo && (
                     <p className="mt-4 text-[#2C2F4A]/70 italic text-xs leading-relaxed border-t border-[#C9A24D]/10 pt-3">
                       "{zodiacInfo.description}"
                     </p>
                   )}
                </div>

                {/* Planet */}
                <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#C9A24D]/10">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="text-4xl">🪐</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Planète Dominante</div>
                       <div className="text-xl font-serif text-[#2C2F4A] font-bold">{planet}</div>
                     </div>
                   </div>
                   
                   <div className="text-sm text-[#2C2F4A]/80 leading-relaxed space-y-3">
                     <p className="font-medium text-[#5B4B8A]">Maître du Chemin de Vie {results.lifePath}</p>
                     <p>
                       {planetText || `Votre Chemin de Vie ${results.lifePath} est gouverné par ${planet}. Cette influence colore votre destinée d'une énergie particulière.`}
                     </p>
                   </div>
                </div>
             </div>
           </motion.div>
        )}

        {/* SECTION VIII: Échos Étymologiques */}
        {etymology && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.8 }}
             className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/5 rounded-full blur-3xl -z-10"></div>
             
             <h3 className="text-2xl font-serif text-[#2C2F4A] mb-6 flex items-center gap-3">
               <span className="text-[#C9A24D]">VIII.</span> Échos Étymologiques
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-2">
                 <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Origine</div>
                 <div className="font-serif text-lg text-[#2C2F4A]">{etymology.origin}</div>
               </div>
               
               <div className="space-y-2 md:col-span-2">
                 <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Signification</div>
                 <p className="text-[#2C2F4A]/80 italic">"{etymology.meaning}"</p>
               </div>
               
               {etymology.spiritual && (
                 <div className="md:col-span-3 pt-4 border-t border-[#C9A24D]/10">
                   <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-2">Dimension Spirituelle</div>
                   <p className="text-[#2C2F4A]/80 leading-relaxed">{etymology.spiritual}</p>
                 </div>
               )}
             </div>
           </motion.div>
        )}

        {/* SECTION IX: Météo Temporelle (Prévisions) */}
        {results.previsions && (
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.9 }}
             className="bg-gradient-to-br from-[#2C2F4A] to-[#1a1c2e] text-white p-8 rounded-2xl border border-[#2C2F4A] shadow-lg mb-12"
           >
             <h3 className="text-2xl font-serif text-[#FAF9F7] mb-6 flex items-center gap-3">
               <span className="text-[#C9A24D]">IX.</span> Météo Astrale & Numérologique
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Numerology Forecast */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                     <div className="text-4xl text-[#C9A24D]">📅</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Cycles Temporels</div>
                       <div className="text-xl font-serif font-bold">Vibrations du Moment</div>
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold text-[#C9A24D] mb-1">{results.previsions.personalMonth}</div>
                        <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Mois Personnel</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold text-[#C9A24D] mb-1">{results.previsions.personalDay}</div>
                        <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Jour Personnel</div>
                      </div>
                   </div>
                   <p className="text-sm text-[#FAF9F7]/70 italic">
                     "Votre Jour Personnel {results.previsions.personalDay} vous invite à l'action immédiate, porté par l'énergie de fond de votre Mois {results.previsions.personalMonth}."
                   </p>
                </div>

                {/* Astro Transits */}
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                     <div className="text-4xl text-[#C9A24D]">🌌</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Ciel Actuel</div>
                       <div className="text-xl font-serif font-bold">Transits Planétaires</div>
                     </div>
                   </div>

                   <div className="grid grid-cols-2 gap-3 text-sm">
                      {['Sun', 'Moon', 'Saturn', 'Jupiter'].map((planet) => {
                        const p = results.previsions?.astroTransits[planet];
                        if (!p) return null;
                        const planetName = planet === 'Sun' ? 'Soleil' : planet === 'Moon' ? 'Lune' : planet === 'Saturn' ? 'Saturne' : 'Jupiter';
                        return (
                          <div key={planet} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded border border-white/10">
                            <span>{planetName}</span>
                            <span className="font-bold text-[#C9A24D]">{p.signe}</span>
                          </div>
                        );
                      })}
                   </div>
                   <p className="text-xs text-[#8FA6A0] mt-2">
                     * Position actuelle des astres influençant votre thème.
                   </p>
                </div>
             </div>
           </motion.div>
        )}

        {/* NOUVELLE SECTION CARTES DE TAROT NUMÉRIQUES (Teaser Fin) */}
        <KeyNumbersSection results={results} userData={userData} />

        {/* CTA */}
        <div className="flex flex-col items-center gap-12 pt-8 pb-12">
          
          {/* Step 1: PDF */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  trackEvent('download_click');
                  const params = new URLSearchParams({
                    fn: userData.firstName,
                    ln: userData.lastName,
                    bd: userData.birthDate,
                    bp: userData.birthPlace || '',
                    fo: userData.focus,
                    origin: 'download'
                  });
                  router.push(`/checkout?${params.toString()}`);
                }}
                className="flex items-center gap-3 px-8 py-4 bg-[#5B4B8A] text-white rounded-full hover:bg-[#6A5FA8] transition-all shadow-lg shadow-[#5B4B8A]/30 transform hover:scale-105"
              >
                <span>🔓</span>
                <span>Débloquer mon Dossier Numérologique / Astrologique</span>
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="w-full flex items-center gap-4 max-w-md opacity-50">
            <div className="h-px bg-[#2C2F4A] flex-1"></div>
            <span className="text-[#2C2F4A] font-serif italic">Pour aller plus loin</span>
            <div className="h-px bg-[#2C2F4A] flex-1"></div>
          </div>

          {/* Step 2: Book */}
          <div className="w-full max-w-4xl bg-gradient-to-br from-[#2C2F4A] to-[#1a1c2e] rounded-2xl shadow-xl overflow-hidden relative group border border-[#5B4B8A]/20">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             <div className="flex flex-col md:flex-row items-center relative z-10">
                {/* Left: Text Content */}
                <div className="p-8 md:p-12 md:w-1/2 text-left space-y-6">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#C9A24D] text-white text-xs font-bold tracking-widest uppercase mb-2">
                    Nouveau & Exclusif
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-[#FAF9F7]">
                    Vivez votre numérologie <br/> comme un roman.
                  </h3>
                  <p className="text-[#8FA6A0] text-lg leading-relaxed">
                    Ne vous contentez pas de lire votre avenir, incarnez-le. <br/>
                    Notre IA écrit pour vous un livre de 100 pages où vous êtes le héros d'une aventure basée sur vos véritables cycles de vie.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        console.log("Write Button Clicked");
                        trackEvent('write_click');
                        const params = new URLSearchParams({
                            fn: userData.firstName,
                            ln: userData.lastName,
                            bd: userData.birthDate,
                            bp: userData.birthPlace || '',
                            fo: userData.focus,
                            origin: 'book'
                          });
                        router.push(`/checkout?${params.toString()}`);
                      }}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FAF9F7] text-[#2C2F4A] rounded-full font-bold text-lg hover:bg-white transition-all transform hover:scale-105 shadow-2xl shadow-black/20"
                    >
                      <BookOpen className="w-6 h-6" />
                      <span>Commencer l'écriture</span>
                    </button>
                    <p className="text-xs text-[#8FA6A0] mt-4 text-center md:text-left">
                      Basé sur vos 7 nombres clés et vos souvenirs personnels.
                    </p>
                  </div>
                </div>

                {/* Right: Back Cover Preview */}
                <div className="p-8 md:p-12 md:w-1/2 bg-black/20 flex items-center justify-center w-full">
                   <div className="transform rotate-1 hover:rotate-0 transition-transform duration-500">
                      <BookBackCover userData={userData} results={results} />
                      <p className="text-center text-[#8FA6A0] text-xs mt-4 italic">
                        * Aperçu généré dynamiquement selon votre profil
                      </p>
                   </div>
                </div>
             </div>
          </div>

          {/* DEV ONLY: Floating Action Button */}
          <div className="fixed bottom-8 left-8 z-[100] p-4 bg-white/90 backdrop-blur-md border-2 border-red-500 rounded-xl shadow-2xl animate-bounce hover:animate-none transition-all">
            <h4 className="text-red-600 font-bold text-xs uppercase tracking-widest mb-2 text-center">Mode Débug</h4>
            <button
              onClick={() => {
                const params = new URLSearchParams({
                  fn: userData.firstName,
                  ln: userData.lastName,
                  bd: userData.birthDate,
                  bp: userData.birthPlace || '',
                  fo: userData.focus,
                  payment_success: 'true'
                });
                window.open(`/pdf-report-v2?${params.toString()}`, '_blank');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 shadow-lg hover:shadow-red-500/30 transition-all"
            >
              <span>🔓</span>
              <span>Ouvrir Rapport Complet</span>
            </button>
          </div>

        </div>

        <BookCreationModal 
          isOpen={showBookModal} 
          onClose={() => setShowBookModal(false)}
          userData={userData}
          reportResults={results}
        />

      </div>
    </div>
  );
}
