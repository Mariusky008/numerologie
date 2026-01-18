'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import FullReportV2 from '@/components/report/FullReportV2';
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
  calculateDeepChallenges,
  calculatePlaceVibration,
  generateCareerForecast,
  getAdvancedProfile,
  calculateLifePathDetailed,
  calculateNameNumbersDetailed,
  calculateTransits
} from '@/lib/numerology/engine';
import { fetchNameAnalysis, NameData } from '@/lib/numerology/db_etymology';
import { trackEvent } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

function PrintContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{userData: UserData, results: NumerologyResult, etymology?: NameData | null} | null>(null);

  useEffect(() => {
    const initData = async () => {
      let userData: UserData | null = null;
      const dataParam = searchParams.get('data');

      if (dataParam) {
        try {
          userData = JSON.parse(decodeURIComponent(dataParam));
        } catch (e) {
          console.error("Error parsing data param", e);
        }
      } else {
        const firstName = searchParams.get('fn');
        const lastName = searchParams.get('ln');
        const birthDate = searchParams.get('bd');
        
        if (firstName && lastName && birthDate) {
          userData = {
            firstName,
            lastName,
            birthDate,
            birthPlace: searchParams.get('bp') || '',
            focus: (searchParams.get('fo') as any) || 'mission'
          };
        }
      }

      if (userData) {
        try {
          // Fetch Etymology
          const etymology = await fetchNameAnalysis(userData.firstName.split(' ')[0]);

          const lifePath = calculateLifePath(userData.birthDate);
          const lifePathDetails = calculateLifePathDetailed(userData.birthDate);
          
          const nameNumbers = calculateNameNumbers(userData.firstName + userData.lastName);
          const nameNumbersDetails = calculateNameNumbersDetailed(userData.firstName + userData.lastName);
          
          const personalYear = calculatePersonalYear(userData.birthDate);
          const axes = getProfessionalAxes(lifePath, nameNumbers.expression);

          // Extended data
          const inclusionGrid = calculateInclusionGrid(userData.firstName + userData.lastName);
          const { missing, excess } = analyzeInclusion(inclusionGrid);
          const subconsciousSelf = calculateSubconsciousSelf(inclusionGrid);
          const bridgeNumber = calculateBridge(lifePath, nameNumbers.expression);
          const challenges = calculateChallenges(userData.birthDate);
          const deepChallenges = calculateDeepChallenges(userData.birthDate);
          const birthPlaceVibration = calculatePlaceVibration(userData.birthPlace || "");
          const careerForecast = generateCareerForecast(userData.birthDate, 2026);
          const cycles = calculateCycles(userData.birthDate);
          
          const advancedProfile = getAdvancedProfile(lifePath, userData.birthDate);
          
          const transits = calculateTransits(userData.firstName, userData.lastName, userData.birthDate);

          setData({
            userData,
            etymology,
            results: {
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
               advancedProfile,
               transits,
               planesOfExpression
            }
          });
        } catch (e) {
          console.error("Invalid data", e);
        }
      }
    };

    initData();
  }, [searchParams]);

  if (!data) return <div className="p-12 text-center text-stone-500">Chargement de l'étude...</div>;

  return <FullReportV2 userData={data.userData} results={data.results} etymology={data.etymology} />;
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrintContent />
    </Suspense>
  );
}
