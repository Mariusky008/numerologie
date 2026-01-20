import { calculatePersonalYear } from '../engine';

interface YearForecast {
  year: number;
  personalYear: number;
  theme: string;
  mantra: string;
  focus: string;
}

const YEAR_THEMES: Record<number, { theme: string, focus: string, mantra: string }> = {
  1: {
    theme: "Nouveau Départ & Semences",
    focus: "Oser, initier, planter des graines pour les 9 ans à venir.",
    mantra: "Je suis le créateur de ma nouvelle réalité."
  },
  2: {
    theme: "Patience & Collaboration",
    focus: "Arroser les graines, nouer des alliances, écouter.",
    mantra: "Je cultive la patience et l'harmonie."
  },
  3: {
    theme: "Expression & Créativité",
    focus: "Communiquer, sortir, créer, s'amuser.",
    mantra: "J'exprime ma vérité avec joie."
  },
  4: {
    theme: "Construction & Travail",
    focus: "Structurer, consolider, travailler dur, organiser.",
    mantra: "Je bâtis des fondations solides pour l'avenir."
  },
  5: {
    theme: "Changement & Liberté",
    focus: "Voyager, changer, oser l'imprévu, s'adapter.",
    mantra: "J'accueille le changement comme une opportunité."
  },
  6: {
    theme: "Responsabilité & Harmonie",
    focus: "Foyer, famille, engagements, beauté, soin.",
    mantra: "Je prends soin de moi et des miens avec amour."
  },
  7: {
    theme: "Introspection & Sagesse",
    focus: "Réfléchir, étudier, méditer, se reposer.",
    mantra: "Je cherche les réponses à l'intérieur de moi."
  },
  8: {
    theme: "Puissance & Récolte",
    focus: "Réussir, gérer l'argent, assumer son pouvoir.",
    mantra: "J'assume ma puissance et ma réussite."
  },
  9: {
    theme: "Bilan & Aboutissement",
    focus: "Finir, nettoyer, pardonner, préparer le nouveau cycle.",
    mantra: "Je laisse partir l'ancien pour faire place au nouveau."
  }
};

export function generateDecadeForecast(birthDate: string, startYear: number = new Date().getFullYear()): YearForecast[] {
  const forecast: YearForecast[] = [];
  
  for (let i = 0; i < 10; i++) {
    const currentYear = startYear + i;
    // On utilise une version modifiée de calculatePersonalYear qui accepte l'année cible
    // Pour simplifier ici, on réimplémente la logique de base : (Jour + Mois + AnnéeCible) réduit
    
    const [year, month, day] = birthDate.split('-').map(Number);
    const py = reduceNumber(day + month + reduceNumber(currentYear)); // Logique simplifiée Année Personnelle
    
    forecast.push({
      year: currentYear,
      personalYear: py,
      theme: YEAR_THEMES[py]?.theme || "Cycle de transition",
      focus: YEAR_THEMES[py]?.focus || "S'adapter au flux.",
      mantra: YEAR_THEMES[py]?.mantra || "J'avance avec confiance."
    });
  }
  
  return forecast;
}

function reduceNumber(n: number): number {
  if (n <= 9) return n;
  // Cas spéciaux Maîtres Nombres souvent réduits en AP sauf exception, ici on réduit tout pour simplifier la projection 1-9
  return reduceNumber(n.toString().split('').reduce((a, b) => a + parseInt(b), 0));
}