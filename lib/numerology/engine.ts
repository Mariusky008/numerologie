
// Gematria Mapping
const GEMATRIA: Record<string, number> = {
  a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
  j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
  s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
};

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y']);

/**
 * Normalizes a string: removes accents, converts to lowercase, removes non-alpha chars.
 */
export function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z]/g, "");
}

/**
 * Reduces a number to a single digit (1-9) or Master Number (11, 22, 33).
 */
export function reduceNumber(num: number): number {
  // Master numbers are not reduced
  if (num === 11 || num === 22 || num === 33) return num;
  
  if (num < 10) return num;

  const sum = num.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  return reduceNumber(sum);
}

/**
 * Calculates the Life Path Number (Chemin de Vie).
 * Formula: Sum(Day Digits) + Sum(Month Digits) + Sum(Year Digits), then reduce.
 */
export function calculateLifePath(birthDate: string): number {
  // format: YYYY-MM-DD
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  
  const sumDay = dayStr.split('').reduce((acc, c) => acc + parseInt(c), 0);
  const sumMonth = monthStr.split('').reduce((acc, c) => acc + parseInt(c), 0);
  const sumYear = yearStr.split('').reduce((acc, c) => acc + parseInt(c), 0);
  
  const total = sumDay + sumMonth + sumYear;
  return reduceNumber(total);
}

/**
 * Calculates Expression Number, Soul Urge, and Personality.
 */
export function calculateNameNumbers(fullName: string) {
  const cleanName = normalizeString(fullName);
  
  let expressionSum = 0;
  let soulUrgeSum = 0; // Vowels
  let personalitySum = 0; // Consonants
  
  for (const char of cleanName) {
    const val = GEMATRIA[char] || 0;
    expressionSum += val;
    
    if (VOWELS.has(char)) {
      soulUrgeSum += val;
    } else {
      personalitySum += val;
    }
  }
  
  return {
    expression: reduceNumber(expressionSum),
    soulUrge: reduceNumber(soulUrgeSum),
    personality: reduceNumber(personalitySum)
  };
}

/**
 * Calculates Personal Year.
 * Formula: Day of Birth + Month of Birth + Current Year.
 */
export function calculatePersonalYear(birthDate: string, currentYear: number = new Date().getFullYear()): number {
  const [_, monthStr, dayStr] = birthDate.split('-');
  const day = parseInt(dayStr);
  const month = parseInt(monthStr);
  
  const sum = day + month + currentYear;
  return reduceNumber(sum);
}

/**
 * Professional Mapping based on dominant numbers.
 */
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
  
  return Array.from(new Set(axes)); // Remove duplicates
}

/**
 * Calculates the Challenges (Défis).
 */
export function calculateChallenges(birthDate: string) {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  
  const rDay = reduceNumber(parseInt(dayStr));
  const rMonth = reduceNumber(parseInt(monthStr));
  const rYear = reduceNumber(parseInt(yearStr)); // Sum of year digits reduced

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

// --- NEW ADDITIONS FOR ADDENDUM ---

import { InclusionGrid } from '../types';

/**
 * Calculates the Inclusion Grid (Grille d'Inclusion).
 * Counts occurrences of digits 1-9 in the full name.
 */
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

/**
 * Analyzes the Inclusion Grid to find Missing and Excess numbers.
 * Norms:
 * 1: 2-3
 * 2: 1
 * 3: 1
 * 4: 1
 * 5: 1
 * 6: 1
 * 7: 0-1
 * 8: 0-1
 * 9: 1
 * (Simplified based on prompt. Prompt says:
 * 1 -> Norme 2-3
 * 7 -> Norme 0-1
 * 8 -> Norme 0-1
 * Others -> Norme 1 (implied or explicit in some systems, prompt lists specific ones)
 * Let's use the prompt's implied norms where available or standard otherwise.
 * Prompt: 
 * 1: ? (Prompt says "Si le chiffre 1 apparaît 5 fois... Karma de Leadership")
 * 7: "Si le chiffre 7 est absent... Dette Karmique"
 * )
 * Let's define standard norms for "Balanced":
 * 1: 3
 * 2: 1
 * 3: 1-2
 * 4: 1
 * 5: 3-4 (Actually usually 5 is common, but let's stick to prompt logic: "Norme" column in prompt is empty/broken in OCR but let's infer)
 * Prompt Table:
 * 1 -> Norme ? (OCR glitch: "Norme (Nb d'occurrences)1Affirmation... 2 à 3") -> 2-3
 * 2 -> ? ("2Sensibilité... 1") -> 1
 * 3 -> ? ("3Communication... 1") -> 1
 * 4 -> ? ("4Travail... 1") -> 1
 * 5 -> ? ("5Adaptabilité... 1") -> 1
 * 6 -> ? ("6Responsabilités... 1") -> 1
 * 7 -> ? ("7Vie intérieure... 0 à 1") -> 0-1
 * 8 -> ? ("8Réalisation... 0 à 1") -> 0-1
 * 9 -> ? ("9Humanisme... 1") -> 1
 */
const INCLUSION_NORMS: Record<number, { min: number, max: number }> = {
  1: { min: 2, max: 3 },
  2: { min: 1, max: 1 }, // implied 1+ is ok, 0 is missing
  3: { min: 1, max: 1 },
  4: { min: 1, max: 1 },
  5: { min: 1, max: 1 },
  6: { min: 1, max: 1 },
  7: { min: 0, max: 1 }, // 0 is OK for 7? Prompt says "Si le chiffre 7 est absent, générer un chapitre sur la Leçon Karmique". So 0 is Missing. But norm says 0-1? 
                          // Actually "Dettes Karmiques" usually means 0 occurrence. 
                          // However, for 7 and 8, sometimes 0 is considered normal in some systems, but prompt says explicitly: "Si le chiffre 7 est absent... Leçon Karmique". 
                          // So let's treat 0 as Missing for ALL numbers for the purpose of "Dettes Karmiques".
  8: { min: 0, max: 1 },
  9: { min: 1, max: 1 }
};

export function analyzeInclusion(grid: InclusionGrid) {
  const missing: number[] = [];
  const excess: number[] = [];

  for (let i = 1; i <= 9; i++) {
    const count = grid[i];
    // Missing (Karmic Debt)
    if (count === 0) {
      missing.push(i);
    }
    
    // Excess (Forces)
    // Prompt says "Si Valeur > Norme : Force Acquise"
    // Using the max of the norm
    if (count > INCLUSION_NORMS[i].max) {
      excess.push(i);
    }
  }

  return { missing, excess };
}

/**
 * Calculates Subconscious Self (Moi Subconscient).
 * Count how many grid numbers are present (have count > 0).
 */
export function calculateSubconsciousSelf(grid: InclusionGrid): number {
  let count = 0;
  for (let i = 1; i <= 9; i++) {
    if (grid[i] > 0) count++;
  }
  return count;
}

/**
 * Calculates The Bridge (Le Pont).
 * Difference between Life Path and Expression.
 */
export function calculateBridge(lifePath: number, expression: number): number {
  // Bridge is usually defined as |LifePath - Expression| reduced? Or just difference?
  // Prompt: "Calculer la différence entre le Chemin de Vie et le Nombre d'Expression."
  // Usually it is reduced to 1-9.
  let diff = Math.abs(lifePath - expression);
  if (diff === 0) return 0; // Or 9? Usually 0 means no bridge needed or bridge is 0. Let's keep 0.
  return reduceNumber(diff);
}

/**
 * Calculates Life Cycles (Réalisations de Vie / Apogées).
 * 4 Pinnacles (Sommets/Apogées) usually.
 * Prompt mentions "4 grands sommets (Apex)".
 * Cycle 1: Month + Day
 * Cycle 2: Day + Year
 * Cycle 3: Cycle 1 + Cycle 2
 * Cycle 4: Month + Year
 * Transitions ages depend on Life Path.
 */
export function calculateCycles(birthDate: string) {
  const [yearStr, monthStr, dayStr] = birthDate.split('-');
  
  // Use reduced digits for calculations of pinnacles usually
  const rDay = reduceNumber(parseInt(dayStr));
  const rMonth = reduceNumber(parseInt(monthStr));
  const rYear = reduceNumber(parseInt(yearStr));

  const cycle1 = reduceNumber(rMonth + rDay);
  const cycle2 = reduceNumber(rDay + rYear);
  const cycle3 = reduceNumber(cycle1 + cycle2);
  const cycle4 = reduceNumber(rMonth + rYear);

  return { cycle1, cycle2, cycle3, cycle4 };
}
