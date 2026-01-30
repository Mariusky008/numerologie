import { UserData, NumerologyResult } from '../types';
import { 
  calculateLifePathDetailed, 
  calculateNameNumbersDetailed, 
  calculatePersonalYear, 
  getProfessionalAxes, 
  calculateInclusionGrid, 
  calculateChallenges, 
  calculateCycles, 
  calculateDeepChallenges, 
  calculatePlanesOfExpression, 
  getAdvancedProfile,
  calculateTransits
} from '../numerology/engine';
import { PsyMirrorResult } from './types';
import { fetchNameAnalysis, NameData } from '../numerology/db_etymology';

/**
 * Generates the full numerology result for the unified report
 */
export function generateNumerologyResult(userData: UserData): NumerologyResult {
  const { birthDate, firstName, lastName } = userData;
  const fullName = `${firstName} ${lastName}`;
  
  const lp = calculateLifePathDetailed(birthDate);
  const nameNums = calculateNameNumbersDetailed(fullName);
  const inclusion = calculateInclusionGrid(fullName);
  const challenges = calculateChallenges(birthDate);
  const cycles = calculateCycles(birthDate);
  
  return {
    lifePath: lp.value,
    expression: nameNums.expression.value,
    soulUrge: nameNums.soulUrge.value,
    personality: nameNums.personality.value,
    personalYear: calculatePersonalYear(birthDate),
    details: {
      lifePath: lp,
      expression: nameNums.expression,
      soulUrge: nameNums.soulUrge,
      personality: nameNums.personality
    },
    professionalAxes: getProfessionalAxes(lp.value, nameNums.expression.value),
    inclusionGrid: inclusion,
    missingNumbers: [], // Simplified for now
    excessNumbers: [],
    subconsciousSelf: 0,
    bridgeNumber: 0,
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
    deepChallenges: calculateDeepChallenges(birthDate),
    astroResonance: {
      birthPlaceVibration: 0
    },
    careerForecast: [], // Calculated in the component
    transits: calculateTransits(firstName, lastName, birthDate),
    planesOfExpression: calculatePlanesOfExpression(fullName),
    advancedProfile: getAdvancedProfile(lp.value, birthDate)
  };
}

/**
 * Orchestrates the full report generation by calling the API for the Psy part
 * and calculating the Numerology part locally.
 */
export async function generateFullUnifiedResult(
  sessionData: any, 
  userInfo: UserData
): Promise<{ psyResult: PsyMirrorResult; numResult: NumerologyResult; etymology: NameData | null }> {
  
  // 1. Calculate Numerology locally
  const numResult = generateNumerologyResult(userInfo);
  
  // 2. Fetch Name Etymology
  const etymology = await fetchNameAnalysis(userInfo.firstName);
  
  // 3. Call Psy Mirror API
  const response = await fetch('/api/psy-mirror', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      moduleA_answers: sessionData.moduleA_answers,
      moduleB_answers: sessionData.moduleB_answers,
      moduleC_results: sessionData.moduleC_results,
      cosmic_data: {
        ...sessionData.cosmic_data,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        birthDate: userInfo.birthDate,
        birthTime: userInfo.birthTime,
        birthPlace: userInfo.birthPlace
      },
      user_meta: { lang: 'fr', session_id: Date.now().toString() }
    })
  });
  
  if (!response.ok) {
    throw new Error("Erreur lors de la génération du rapport psychologique");
  }
  
  const psyResult = await response.json();
  
  return { psyResult, numResult, etymology };
}
