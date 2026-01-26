/**
 * Core Numerology Engine
 * Handles all calculations for Life Path, Expression, Cycles, etc.
 * Updated with Karmic Debt Logic (13, 14, 16, 19)
 */
import { InclusionGrid, NumberDetail } from '../types';
import { ADVANCED_DATA } from './advanced-data';

// Gematria Mapping
const GEMATRIA: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

export function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

function reduceFinal(n: number): number {
  return String(n).split('').reduce((a, b) => Number(a) + Number(b), 0);
}

/**
 * Expert Reduction Logic
 * Detects Karmic Debts (13, 14, 16, 19) during the process.
 */
export function reduceNumberExpert(num: number): NumberDetail {
  const dettesKarmiques = new Set([13, 14, 16, 19]);
  const maitresNombres = new Set([11, 22, 33]);

  // 1. Check direct input
  if (dettesKarmiques.has(num)) {
     return { 
       value: reduceFinal(num), 
       subNumber: num, 
       isMaster: false, 
       karmicDebt: num 
     };
  }
  if (maitresNombres.has(num)) {
    return { 
      value: num, 
      subNumber: num, 
      isMaster: true 
    };
  }

  let somme = num;
  let lastSum = num;

  // 2. Loop reduction
  while (somme > 9 && !maitresNombres.has(somme)) {
    // Check Karmic Debt "en route"
    if (dettesKarmiques.has(somme)) {
      return {
        value: reduceFinal(somme),
        subNumber: somme,
        isMaster: false,
        karmicDebt: somme
      };
    }
    
    lastSum = somme;
    somme = String(somme).split('').reduce((a, b) => Number(a) + Number(b), 0);
  }

  return {
    value: somme,
    subNumber: lastSum === somme ? num : lastSum,
    isMaster: maitresNombres.has(somme)
  };
}

// Alias for compatibility (replacing old reduceNumberDetailed)
export const reduceNumberDetailed = reduceNumberExpert;

// Simple reduction for basic needs
export function reduceNumber(num: number): number {
  return reduceNumberExpert(num).value;
}

export function calculateLifePathDetailed(birthDate: string): NumberDetail {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  
  const sumDay = parseInt(dayStr);
  const sumMonth = parseInt(monthStr);
  const sumYear = parseInt(yearStr);
  
  const total = sumDay + sumMonth + sumYear;
  return reduceNumberDetailed(total);
}

export function calculateLifePath(birthDate: string): number {
  return calculateLifePathDetailed(birthDate).value;
}

export function calculateNameNumbersDetailed(fullName: string) {
  const cleanName = normalizeString(fullName);
  
  let expressionSum = 0;
  let soulUrgeSum = 0;
  let personalitySum = 0;
  
  for (const char of cleanName) {
    const val = GEMATRIA[char] || 0;
    expressionSum += val;
    if (VOWELS.has(char)) soulUrgeSum += val;
    else personalitySum += val;
  }
  
  return {
    expression: reduceNumberDetailed(expressionSum),
    soulUrge: reduceNumberDetailed(soulUrgeSum),
    personality: reduceNumberDetailed(personalitySum)
  };
}

export function calculateNameNumbers(fullName: string) {
  const details = calculateNameNumbersDetailed(fullName);
  return {
    expression: details.expression.value,
    soulUrge: details.soulUrge.value,
    personality: details.personality.value
  };
}

export function calculatePersonalYear(birthDate: string, currentYear: number = new Date().getFullYear()): number {
  const [_, monthStr, dayStr] = birthDate.split('-');
  const day = parseInt(dayStr);
  const month = parseInt(monthStr);
  
  const sum = day + month + currentYear;
  return reduceNumber(sum);
}

/**
 * Calculates Personal Month.
 * Personal Month = Personal Year + Calendar Month
 */
export function calculatePersonalMonth(personalYear: number, month: number): number {
  return reduceNumber(personalYear + month);
}

/**
 * Calculates Personal Day.
 * Personal Day = Personal Month + Calendar Day
 */
export function calculatePersonalDay(personalMonth: number, day: number): number {
  return reduceNumber(personalMonth + day);
}

export function getProfessionalAxes(lifePath: number, expression: number): string[] {
  const axes: string[] = [];
  const numbers = new Set([lifePath, expression]);
  
  if (numbers.has(1)) axes.push("Leadership", "Entrepreneuriat", "Innovation");
  if (numbers.has(2)) axes.push("Conseil", "Médiation", "Diplomatie");
  if (numbers.has(3)) axes.push("Communication", "Créativité", "Expression");
  if (numbers.has(4)) axes.push("Organisation", "Construction", "Rigueur");
  if (numbers.has(5)) axes.push("Voyage", "Liberté", "Commerce");
  if (numbers.has(6)) axes.push("Soin", "Harmonie", "Responsabilité");
  if (numbers.has(7)) axes.push("Analyse", "Recherche", "Spiritualité", "Tech");
  if (numbers.has(8)) axes.push("Pouvoir", "Finance", "Stratégie");
  if (numbers.has(9)) axes.push("Humanitaire", "Enseignement", "Universel");
  if (numbers.has(11)) axes.push("Inspiration", "Visionnaire", "Guide");
  if (numbers.has(22)) axes.push("Bâtisseur", "Grands Projets", "International");
  if (numbers.has(33)) axes.push("Guide Spirituel", "Service", "Amour Universel");
  
  return Array.from(new Set(axes));
}

export function calculateChallenges(birthDate: string) {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  
  const rDay = reduceNumber(parseInt(dayStr));
  const rMonth = reduceNumber(parseInt(monthStr));
  const rYear = reduceNumber(parseInt(yearStr));

  const challenge1 = Math.abs(rMonth - rDay);
  const challenge2 = Math.abs(rDay - rYear);
  const challengeMajor = Math.abs(challenge1 - challenge2);
  const challenge4 = Math.abs(rMonth - rYear);

  return {
    challenge1,
    challenge2,
    challengeMajor,
    challenge4
  };
}

export function getZodiacSign(day: number, month: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "belier";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taureau";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemeaux";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "lion";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "vierge";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "balance";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpion";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittaire";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorne";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "verseau";
  return "poissons";
}

export function getDominantPlanet(lifePath: number): string {
  const mapping: Record<number, string> = {
    1: "soleil",
    2: "lune",
    3: "jupiter",
    4: "saturne",
    5: "mercure",
    6: "venus",
    7: "neptune",
    8: "saturne",
    9: "mars",
    11: "uranus",
    22: "pluton",
    33: "neptune"
  };
  return mapping[lifePath] || "soleil";
}

export function getAdvancedProfile(lifePath: number, birthDate: string) {
  let day: number, month: number;

  try {
    if (birthDate.includes('-')) {
      const parts = birthDate.split('-');
      if (parts.length === 3) {
        month = parseInt(parts[1]);
        day = parseInt(parts[2]);
      } else {
         throw new Error("Invalid format");
      }
    } else {
       const dateObj = new Date(birthDate);
       if (isNaN(dateObj.getTime())) throw new Error("Invalid Date");
       day = dateObj.getDate();
       month = dateObj.getMonth() + 1;
    }

    const zodiac = getZodiacSign(day, month);
    const planet = getDominantPlanet(lifePath);
    
    const pathData = (ADVANCED_DATA.chemins_vie as any)[lifePath] || (ADVANCED_DATA.chemins_vie as any)[lifePath.toString()] || null;
    const mcData = (ADVANCED_DATA.milieu_du_ciel as any)[zodiac] || null;
    
    return {
      zodiac,
      dominantPlanet: planet,
      pathData,
      mcData
    };
  } catch (e) {
    console.error("Error calculating advanced profile:", e);
    return {
      zodiac: "inconnu",
      dominantPlanet: "inconnue",
      pathData: null,
      mcData: null
    };
  }
}

export function calculateInclusionGrid(fullName: string): InclusionGrid {
  const cleanName = normalizeString(fullName);
  const grid: InclusionGrid = {
    1: 0, 2: 0, 3: 0,
    4: 0, 5: 0, 6: 0,
    7: 0, 8: 0, 9: 0
  };

  for (const char of cleanName) {
    const val = GEMATRIA[char];
    if (val && val >= 1 && val <= 9) {
      grid[val]++;
    }
  }

  return grid;
}

const INCLUSION_NORMS: Record<number, { min: number, max: number }> = {
  1: { min: 2, max: 3 },
  2: { min: 1, max: 1 },
  3: { min: 1, max: 1 },
  4: { min: 1, max: 1 },
  5: { min: 1, max: 1 },
  6: { min: 1, max: 1 },
  7: { min: 0, max: 1 },
  8: { min: 0, max: 1 },
  9: { min: 1, max: 1 }
};

export function analyzeInclusion(grid: InclusionGrid) {
  const missing: number[] = [];
  const excess: number[] = [];

  for (let i = 1; i <= 9; i++) {
    const count = grid[i];
    if (count === 0) {
      missing.push(i);
    }
    if (count > INCLUSION_NORMS[i].max) {
      excess.push(i);
    }
  }

  return { missing, excess };
}

export function calculateSubconsciousSelf(grid: InclusionGrid): number {
  let count = 0;
  for (let i = 1; i <= 9; i++) {
    if (grid[i] > 0) count++;
  }
  return count;
}

export function calculateBridge(lifePath: number, expression: number): number {
  let diff = Math.abs(lifePath - expression);
  if (diff === 0) return 0;
  return reduceNumber(diff);
}

export function calculateCycles(birthDate: string) {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  
  const rDay = reduceNumber(parseInt(dayStr));
  const rMonth = reduceNumber(parseInt(monthStr));
  const rYear = reduceNumber(parseInt(yearStr));

  const cycle1 = reduceNumber(rMonth + rDay);
  const cycle2 = reduceNumber(rDay + rYear);
  const cycle3 = reduceNumber(cycle1 + cycle2);
  const cycle4 = reduceNumber(rMonth + rYear);

  return { cycle1, cycle2, cycle3, cycle4 };
}

export function calculateDeepChallenges(birthDate: string): number[] {
  const { challenge1, challenge2, challengeMajor, challenge4 } = calculateChallenges(birthDate);
  return [challenge1, challenge2, challengeMajor, challenge4];
}

export function calculatePlaceVibration(placeName: string): number {
  if (!placeName) return 0;
  const clean = normalizeString(placeName);
  let sum = 0;
  for (const char of clean) {
    sum += GEMATRIA[char] || 0;
  }
  return reduceNumber(sum);
}

export function generateCareerForecast(birthDate: string, startYear: number = 2026): { year: number, personalYear: number }[] {
  const forecast = [];
  for (let i = 0; i < 10; i++) {
    const year = startYear + i;
    const py = calculatePersonalYear(birthDate, year);
    forecast.push({ year, personalYear: py });
  }
  return forecast;
}

export function calculateTransits(firstName: string, lastName: string, birthDate: string, targetYear: number = new Date().getFullYear()) {
  const birthYear = parseInt(birthDate.split('-')[0]);
  const age = targetYear - birthYear;
  
  const findActiveLetter = (sourceStr: string, targetAge: number): string => {
    const clean = normalizeString(sourceStr);
    if (!clean) return '?';
    
    let currentAge = 0;
    let index = 0;
    
    for(let k=0; k<1000; k++) {
      const char = clean[index % clean.length];
      const duration = GEMATRIA[char] || 1;
      
      if (currentAge <= targetAge && (currentAge + duration) > targetAge) {
        return char.toUpperCase();
      }
      
      currentAge += duration;
      index++;
    }
    return clean[clean.length-1].toUpperCase();
  };

  return {
    physical: findActiveLetter(firstName, age),
    mental: findActiveLetter(lastName, age),
    spiritual: findActiveLetter(firstName + lastName, age)
  };
}

/**
 * Calculates Planes of Expression (Mental, Physical, Emotional, Intuitive).
 * Returns percentage distribution.
 */
export function calculatePlanesOfExpression(fullName: string) {
  const cleanName = normalizeString(fullName);
  let mental = 0;
  let physical = 0;
  let emotional = 0;
  let intuitive = 0;
  
  const totalLetters = cleanName.length || 1;

  for (const char of cleanName) {
    const val = GEMATRIA[char] || 0;
    
    // Mental: 1, 8, 9
    if ([1, 8, 9].includes(val)) mental++;
    // Physique: 4, 5
    else if ([4, 5].includes(val)) physical++;
    // Émotionnel: 2, 3, 6
    else if ([2, 3, 6].includes(val)) emotional++;
    // Intuitif: 7 (et 11, 22 réduits)
    else if (val === 7) intuitive++;
  }

  return {
    mental: Math.round((mental / totalLetters) * 100),
    physical: Math.round((physical / totalLetters) * 100),
    emotional: Math.round((emotional / totalLetters) * 100),
    intuitive: Math.round((intuitive / totalLetters) * 100)
  };
}
