
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
  getAdvancedProfile // New import
} from '@/lib/numerology/engine';
import { fetchNameAnalysis, NameData } from '@/lib/numerology/db_etymology';
import { PLANET_INFLUENCES, ZODIAC_DETAILS } from '@/lib/numerology/interpretations-astro-geo';
import PersonalityRadar from './PersonalityRadar';
import InclusionGridViz from './InclusionGridViz';
import interpretations from '@/lib/numerology/interpretations.json';
import { Download, BookOpen } from 'lucide-react';
import BookCreationModal from './BookCreationModal';
import BookBackCover from './BookBackCover';

interface ReportViewProps {
  userData: UserData;
}

export default function ReportView({ userData }: ReportViewProps) {
  const [results, setResults] = useState<NumerologyResult | null>(null);
  const [etymology, setEtymology] = useState<NameData | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  useEffect(() => {
    if (userData) {
      // Async fetch for etymology
      fetchNameAnalysis(userData.firstName.split(' ')[0]).then(data => {
        if (data) setEtymology(data);
      });

      const lifePath = calculateLifePath(userData.birthDate);
      const nameNumbers = calculateNameNumbers(userData.firstName + userData.lastName);
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
      
      // Advanced Profile
      const advancedProfile = getAdvancedProfile(lifePath, userData.birthDate);
      console.log("Calculated Advanced Profile:", advancedProfile); // Debug Log

      setResults({
        lifePath,
        ...nameNumbers,
        personalYear,
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
  
  const zodiac = zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "";
  const planet = planetKey ? planetKey.charAt(0).toUpperCase() + planetKey.slice(1) : "";
  
  const planetText = planetKey ? PLANET_INFLUENCES[planetKey] : "";
  const zodiacInfo = zodiacKey ? ZODIAC_DETAILS[zodiacKey] : null;

  const pathTitle = results.advancedProfile?.pathData?.titre || `Chemin de Vie ${results.lifePath}`;

  return (
    <div className="min-h-screen bg-[#fffbf0] text-[#57534e] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4 pt-8">
          
          {/* TEMPORARY DEBUG: Check if advanced data is present */}
          {/* <div className="bg-red-100 p-2 text-xs text-red-800 text-left overflow-auto max-h-32 mb-4 rounded border border-red-300">
            <strong>DEBUG ADVANCED PROFILE:</strong>
            <pre>{JSON.stringify(results.advancedProfile, null, 2)}</pre>
          </div> */}

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif text-[#78350f]"
          >
            {userData.firstName} {userData.lastName}
          </motion.h1>
          <div className="flex items-center justify-center gap-4 text-[#d97706]/80 text-sm tracking-widest uppercase">
            <span>Chemin {results.lifePath}</span>
            <span>•</span>
            <span>{zodiac}</span>
            <span>•</span>
            <span>{planet}</span>
          </div>
          <div className="inline-block px-4 py-1 rounded-full bg-[#fef3c7] text-[#d97706] text-xs border border-[#d97706]/20 uppercase tracking-widest">
            Focus : {userData.focus}
          </div>
        </header>

        {/* Main Numbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Life Path Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm"
          >
            <h2 className="text-xl font-serif text-[#78350f] mb-2">{pathTitle}</h2>
            <p className="text-[#57534e] italic mb-4 text-sm leading-relaxed">{lifePathText}</p>
            
            {results.advancedProfile?.pathData && (
               <div className="space-y-3 mt-4 pt-4 border-t border-stone-100">
                 <div>
                   <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider block mb-1">Forces Majeures</span>
                   <p className="text-xs text-stone-600">{results.advancedProfile.pathData.forces_majeures}</p>
                 </div>
                 <div>
                   <span className="text-xs font-bold text-[#d97706] uppercase tracking-wider block mb-1">Clé d'Alignement</span>
                   <p className="text-xs text-stone-600 italic">"{results.advancedProfile.pathData.cle_alignement}"</p>
                 </div>
               </div>
            )}

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-stone-100">
              <div className="text-5xl font-bold text-[#d97706]/10">{results.lifePath}</div>
              <div className="text-xs text-[#a8a29e]">
                Calculé à partir du {userData.birthDate}
              </div>
            </div>
          </motion.div>

          {/* Expression Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm"
          >
            <h2 className="text-2xl font-serif text-[#78350f] mb-2">Nombre d'Expression {results.expression}</h2>
            <p className="text-[#57534e] italic mb-4">{expressionText}</p>
            <div className="flex items-center gap-4">
              <div className="text-6xl font-bold text-[#d97706]/10">{results.expression}</div>
              <div className="text-sm text-[#a8a29e]">
                Basé sur votre nom complet
              </div>
            </div>
          </motion.div>
        </div>

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
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h3 className="text-xl font-serif text-[#78350f] mb-4">Axes Professionnels</h3>
              <div className="flex flex-wrap gap-2">
                {results.professionalAxes.map((axis, i) => (
                  <span key={i} className="px-3 py-1 bg-[#fffbf0] text-[#d97706] rounded-full text-sm border border-[#d97706]/20">
                    {axis}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h3 className="text-xl font-serif text-[#78350f] mb-4">Année Personnelle {results.personalYear}</h3>
              <p className="text-[#57534e]">
                Votre vibration pour l'année en cours. Une période propice à l'alignement avec vos objectifs profonds.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Visualization Section 2: Inclusion Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-2xl font-serif text-[#78350f] mb-4">Grille d'Inclusion</h3>
               <p className="text-[#57534e] mb-6">
                 Cette matrice révèle la répartition de vos énergies. Les cases vides indiquent des dettes karmiques (leçons à apprendre), tandis que les cases chargées révèlent vos forces innées.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold">
                      {results.missingNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-[#78350f] font-medium">Dettes Karmiques</div>
                      <div className="text-sm text-[#a8a29e]">Nombres manquants</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                      {results.excessNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-[#78350f] font-medium">Forces Acquises</div>
                      <div className="text-sm text-[#a8a29e]">Nombres en excès</div>
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
             className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm"
           >
             <h3 className="text-2xl font-serif text-[#78350f] mb-6 flex items-center gap-3">
               <span className="text-[#d97706]">VII.</span> Architecture Astrale
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Zodiac */}
                <div className="bg-[#fffbf0] p-6 rounded-xl border border-[#d97706]/10">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="text-4xl">♈</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#a8a29e]">Signe Solaire</div>
                       <div className="text-xl font-serif text-[#78350f] font-bold">{zodiac}</div>
                     </div>
                   </div>

                   {zodiacInfo && (
                     <div className="flex gap-2 mb-4">
                       <span className="px-3 py-1 bg-white text-stone-600 text-xs rounded-full uppercase tracking-wider font-bold border border-[#d97706]/10">{zodiacInfo.element}</span>
                       <span className="px-3 py-1 bg-white text-stone-600 text-xs rounded-full uppercase tracking-wider font-bold border border-[#d97706]/10">{zodiacInfo.quality}</span>
                     </div>
                   )}

                   {results.advancedProfile.mcData && (
                     <div className="space-y-3 text-sm text-[#57534e]">
                       <p><strong>Image Publique :</strong> {results.advancedProfile.mcData.image_publique}</p>
                       <p><strong>Vocation :</strong> {results.advancedProfile.mcData.vocation}</p>
                       <p className="italic text-[#d97706]">"{results.advancedProfile.mcData.cle_reussite}"</p>
                     </div>
                   )}

                   {zodiacInfo && (
                     <p className="mt-4 text-[#57534e] italic text-xs leading-relaxed border-t border-[#d97706]/10 pt-3">
                       "{zodiacInfo.description}"
                     </p>
                   )}
                </div>

                {/* Planet */}
                <div className="bg-[#fffbf0] p-6 rounded-xl border border-[#d97706]/10">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="text-4xl">🪐</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#a8a29e]">Planète Dominante</div>
                       <div className="text-xl font-serif text-[#78350f] font-bold">{planet}</div>
                     </div>
                   </div>
                   
                   <div className="text-sm text-[#57534e] leading-relaxed space-y-3">
                     <p className="font-medium text-[#78350f]">Maître du Chemin de Vie {results.lifePath}</p>
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
             className="bg-white p-8 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden"
           >
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#d97706]/5 rounded-full blur-3xl -z-10"></div>
             
             <h3 className="text-2xl font-serif text-[#78350f] mb-6 flex items-center gap-3">
               <span className="text-[#d97706]">VIII.</span> Échos Étymologiques
             </h3>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-2">
                 <div className="text-xs uppercase tracking-widest text-[#a8a29e]">Origine</div>
                 <div className="font-serif text-lg text-[#78350f]">{etymology.origin}</div>
               </div>
               
               <div className="space-y-2 md:col-span-2">
                 <div className="text-xs uppercase tracking-widest text-[#a8a29e]">Signification</div>
                 <p className="text-[#57534e] italic">"{etymology.meaning}"</p>
               </div>
               
               {etymology.spiritual && (
                 <div className="md:col-span-3 pt-4 border-t border-[#d97706]/10">
                   <div className="text-xs uppercase tracking-widest text-[#a8a29e] mb-2">Dimension Spirituelle</div>
                   <p className="text-[#57534e] leading-relaxed">{etymology.spiritual}</p>
                 </div>
               )}
             </div>
           </motion.div>
        )}

        {/* CTA */}
        <div className="flex flex-col items-center gap-12 pt-8 pb-12">
          
          {/* Step 1: PDF */}
          <div className="text-center space-y-4">
            <h3 className="text-xl font-serif text-[#78350f]">1. Conservez votre analyse</h3>
            <button 
              onClick={() => {
                const dataStr = encodeURIComponent(JSON.stringify(userData));
                // Add timestamp to force fresh load (bypass cache)
                window.open(`/report/pdf?data=${dataStr}&t=${Date.now()}`, '_blank');
              }}
              className="flex items-center gap-3 px-8 py-4 bg-white text-[#78350f] border-2 border-[#78350f] rounded-full hover:bg-[#fffbf0] transition-colors shadow-sm"
            >
              <Download className="w-5 h-5" />
              Télécharger le PDF complet
            </button>

            <button 
              onClick={() => {
                const dataStr = encodeURIComponent(JSON.stringify(userData));
                window.open(`/report/debug?data=${dataStr}&t=${Date.now()}`, '_blank');
              }}
              className="flex items-center gap-3 px-4 py-4 bg-red-100 text-red-800 border-2 border-red-800 rounded-full hover:bg-red-200 transition-colors shadow-sm text-sm"
            >
              Test V2 (Debug)
            </button>
          </div>
        </div>

          {/* Separator */}
          <div className="w-full flex items-center gap-4 max-w-md opacity-50">
            <div className="h-px bg-[#78350f] flex-1"></div>
            <span className="text-[#78350f] font-serif italic">Pour aller plus loin</span>
            <div className="h-px bg-[#78350f] flex-1"></div>
          </div>

          {/* Step 2: Book */}
          <div className="w-full max-w-4xl bg-gradient-to-br from-[#78350f] to-[#573c28] rounded-2xl shadow-xl overflow-hidden relative group">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
             
             <div className="flex flex-col md:flex-row items-center relative z-10">
                {/* Left: Text Content */}
                <div className="p-8 md:p-12 md:w-1/2 text-left space-y-6">
                  <div className="inline-block px-4 py-1 rounded-full bg-[#d97706] text-white text-xs font-bold tracking-widest uppercase mb-2">
                    Nouveau & Exclusif
                  </div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-[#fffbf0]">
                    Vivez votre numérologie <br/> comme un roman.
                  </h3>
                  <p className="text-[#d6d3d1] text-lg leading-relaxed">
                    Ne vous contentez pas de lire votre avenir, incarnez-le. <br/>
                    Notre IA écrit pour vous un livre de 100 pages où vous êtes le héros d'une aventure basée sur vos véritables cycles de vie.
                  </p>
                  
                  <div className="pt-4">
                    <button
                      onClick={() => setShowBookModal(true)}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#fffbf0] text-[#78350f] rounded-full font-bold text-lg hover:bg-[#fef3c7] transition-all transform hover:scale-105 shadow-2xl shadow-black/20"
                    >
                      <BookOpen className="w-6 h-6" />
                      <span>Commencer l'écriture</span>
                    </button>
                    <p className="text-xs text-[#d6d3d1]/60 mt-4 text-center md:text-left">
                      Basé sur vos 7 nombres clés et vos souvenirs personnels.
                    </p>
                  </div>
                </div>

                {/* Right: Back Cover Preview */}
                <div className="p-8 md:p-12 md:w-1/2 bg-black/20 flex items-center justify-center w-full">
                   <div className="transform rotate-1 hover:rotate-0 transition-transform duration-500">
                      <BookBackCover userData={userData} results={results} />
                      <p className="text-center text-[#d6d3d1]/50 text-xs mt-4 italic">
                        * Aperçu généré dynamiquement selon votre profil
                      </p>
                   </div>
                </div>
             </div>
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
