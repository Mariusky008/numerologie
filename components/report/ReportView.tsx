'use client';

import { useEffect, useState } from 'react';
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
import { fetchNameAnalysis } from '@/lib/numerology/db_etymology';
import { calculerThemeAstral, calculerTransits as calculerTransitsAstro } from '@/lib/astro/engine';
import DemoRevealView from './DemoRevealView';

interface ReportViewProps {
  userData: UserData;
}

export default function ReportView({ userData }: ReportViewProps) {
  const [results, setResults] = useState<NumerologyResult | null>(null);

  useEffect(() => {
    if (userData) {
      // Async fetch for etymology (kept for background data if needed later)
      fetchNameAnalysis(userData.firstName.split(' ')[0]);

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
      const cycles = calculateCycles(userData.birthDate); 
      const deepChallenges = calculateDeepChallenges(userData.birthDate);
      const birthPlaceVibration = calculatePlaceVibration(userData.birthPlace || "");
      const careerForecast = generateCareerForecast(userData.birthDate, 2026);
      
      const transits = calculateTransits(userData.firstName, userData.lastName, userData.birthDate);
      const advancedProfile = getAdvancedProfile(lifePath, userData.birthDate);

      // --- TEMPORAL SYNTHESIS ---
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentDay = now.getDate();
      const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
      const personalDay = calculatePersonalDay(personalMonth, currentDay);
      const astroTransits = calculerTransitsAstro(now);

      // --- REAL ASTROLOGY CALCULATION ---
      if (userData.birthPlace) {
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
        advancedProfile,
        planesOfExpression: calculatePlanesOfExpression(userData.firstName + userData.lastName),
        previsions: {
            personalMonth,
            personalDay,
            astroTransits
        }
      });
    }
  }, [userData]);

  if (!results) return <div className="min-h-screen bg-[#1a1c2e] flex items-center justify-center text-white/50">Chargement de votre destinée...</div>;

  return <DemoRevealView userData={userData} results={results} />;
}
