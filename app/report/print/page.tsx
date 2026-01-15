
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import FullReport from '@/components/report/FullReport';
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
  calculateCycles
} from '@/lib/numerology/engine';

function PrintContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{userData: UserData, results: NumerologyResult} | null>(null);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const userData: UserData = JSON.parse(decodeURIComponent(dataParam));
        
        const lifePath = calculateLifePath(userData.birthDate);
        const nameNumbers = calculateNameNumbers(userData.firstName + userData.lastName);
        const personalYear = calculatePersonalYear(userData.birthDate);
        const axes = getProfessionalAxes(lifePath, nameNumbers.expression);

        // Calculate all extended data for print view
        const inclusionGrid = calculateInclusionGrid(userData.firstName + userData.lastName);
        const { missing, excess } = analyzeInclusion(inclusionGrid);
        const subconsciousSelf = calculateSubconsciousSelf(inclusionGrid);
        const bridgeNumber = calculateBridge(lifePath, nameNumbers.expression);
        const challenges = calculateChallenges(userData.birthDate);
        const cycles = calculateCycles(userData.birthDate);

        setData({
          userData,
          results: {
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
               cycle3: cycles.cycle3
             }
          }
        });
        
      } catch (e) {
        console.error("Invalid data", e);
      }
    }
  }, [searchParams]);

  if (!data) return <div className="p-12 text-center text-stone-500">Chargement de l'étude...</div>;

  return <FullReport userData={data.userData} results={data.results} />;
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrintContent />
    </Suspense>
  );
}
