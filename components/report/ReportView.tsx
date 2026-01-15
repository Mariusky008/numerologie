
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
  calculatePlaceVibration
} from '@/lib/numerology/engine';
import PersonalityRadar from './PersonalityRadar';
import InclusionGridViz from './InclusionGridViz';
import interpretations from '@/lib/numerology/interpretations.json';
import { Download } from 'lucide-react';

interface ReportViewProps {
  userData: UserData;
}

export default function ReportView({ userData }: ReportViewProps) {
  const [results, setResults] = useState<NumerologyResult | null>(null);

  useEffect(() => {
    if (userData) {
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
        careerForecast
      });
    }
  }, [userData]);

  if (!results) return null;

  // Type assertion for interpretations
  const lifePathText = (interpretations.lifePath as any)[results.lifePath.toString()] || "Chemin unique.";
  const expressionText = (interpretations.expression as any)[results.expression.toString()] || "Expression unique.";

  return (
    <div className="min-h-screen bg-stone-900 text-cream-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header */}
        <header className="text-center space-y-4 pt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-serif text-amber-100"
          >
            {userData.firstName} {userData.lastName}
          </motion.h1>
          <p className="text-amber-200/60 uppercase tracking-widest text-sm">Étude Numérologique - Lecture d'Âme</p>
          <div className="inline-block px-4 py-1 rounded-full bg-amber-900/30 text-amber-200 text-xs border border-amber-500/20 uppercase tracking-widest">
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
            className="bg-stone-800/50 p-6 rounded-xl border border-amber-900/30"
          >
            <h2 className="text-2xl font-serif text-amber-100 mb-2">Chemin de Vie {results.lifePath}</h2>
            <p className="text-stone-300 italic mb-4">{lifePathText}</p>
            <div className="flex items-center gap-4">
              <div className="text-6xl font-bold text-amber-500/20">{results.lifePath}</div>
              <div className="text-sm text-stone-400">
                Calculé à partir du {userData.birthDate}
              </div>
            </div>
          </motion.div>

          {/* Expression Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-stone-800/50 p-6 rounded-xl border border-amber-900/30"
          >
            <h2 className="text-2xl font-serif text-amber-100 mb-2">Nombre d'Expression {results.expression}</h2>
            <p className="text-stone-300 italic mb-4">{expressionText}</p>
            <div className="flex items-center gap-4">
              <div className="text-6xl font-bold text-amber-500/20">{results.expression}</div>
              <div className="text-sm text-stone-400">
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
          >
            <PersonalityRadar data={results} />
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.5 }}
             className="space-y-6"
          >
            <div className="bg-stone-800/50 p-6 rounded-xl border border-amber-900/30">
              <h3 className="text-xl font-serif text-amber-100 mb-4">Axes Professionnels</h3>
              <div className="flex flex-wrap gap-2">
                {results.professionalAxes.map((axis, i) => (
                  <span key={i} className="px-3 py-1 bg-amber-900/30 text-amber-200 rounded-full text-sm border border-amber-500/20">
                    {axis}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-stone-800/50 p-6 rounded-xl border border-amber-900/30">
              <h3 className="text-xl font-serif text-amber-100 mb-4">Année Personnelle {results.personalYear}</h3>
              <p className="text-stone-300">
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
          className="bg-stone-800/30 p-8 rounded-2xl border border-stone-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-2xl font-serif text-amber-100 mb-4">Grille d'Inclusion</h3>
               <p className="text-stone-400 mb-6">
                 Cette matrice révèle la répartition de vos énergies. Les cases vides indiquent des dettes karmiques (leçons à apprendre), tandis que les cases chargées révèlent vos forces innées.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-900/20 border border-red-900/50 flex items-center justify-center text-red-400 font-bold">
                      {results.missingNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-amber-100 font-medium">Dettes Karmiques</div>
                      <div className="text-sm text-stone-500">Nombres manquants</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-900/20 border border-amber-500/50 flex items-center justify-center text-amber-400 font-bold">
                      {results.excessNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-amber-100 font-medium">Forces Acquises</div>
                      <div className="text-sm text-stone-500">Nombres en excès</div>
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

        {/* CTA */}
        <div className="flex justify-center pt-8 pb-12">
          <button 
            onClick={() => {
              const dataStr = encodeURIComponent(JSON.stringify(userData));
              window.open(`/report/print?data=${dataStr}`, '_blank');
            }}
            className="flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-full transition-colors shadow-lg shadow-amber-900/20"
          >
            <Download className="w-5 h-5" />
            <span>Générer l'Étude Complète (PDF)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
