
export type UserFocus = 'amour' | 'carriere' | 'mission' | 'spiritualite';

export interface UserData {
  firstName: string; // Prénoms (tous)
  lastName: string; // Nom de naissance
  birthDate: string; // YYYY-MM-DD
  birthTime?: string; // HH:MM
  birthPlace?: string; // Ville/Pays
  focus: UserFocus; // Priorité actuelle
}

export interface InclusionGrid {
  [key: number]: number; // 1-9: count
}

export interface NumerologyResult {
  lifePath: number;
  expression: number;
  soulUrge: number;
  personality: number;
  personalYear: number;
  professionalAxes: string[];
  
  // New Additions
  inclusionGrid: InclusionGrid;
  missingNumbers: number[]; // Dettes Karmiques
  excessNumbers: number[]; // Forces Acquises
  subconsciousSelf: number; // Moi Subconscient
  bridgeNumber: number; // Le Pont
  
  challenges: {
    minor1: number;
    minor2: number;
    major: number;
    major2: number; // Defi 2 in user terms often, or "Defi Majeur" logic variation
  };
  
  cycles: {
    cycle1: number;
    cycle2: number;
    cycle3: number;
    cycle4: number; // Added cycle 4
  };
  
  // Advanced Modules
  deepChallenges: number[]; // From Module 3
  astroResonance: {
    birthPlaceVibration: number;
    // We can add more here if we had map data
  };
  careerForecast: { year: number, personalYear: number }[]; // For 10 years
}
