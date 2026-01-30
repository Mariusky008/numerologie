/**
 * Numerology & Astrology Utilities
 */

export function calculateLifePathNumber(birthDate: string): number {
  // birthDate format: YYYY-MM-DD
  const digits = birthDate.replace(/-/g, '').split('').map(Number);
  let sum = digits.reduce((a, b) => a + b, 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
  }
  
  return sum;
}

export function getLifePathData(num: number) {
  const data: Record<number, { title: string; potential: string; key_dimension: string }> = {
    1: { 
      title: "Le Leader Né", 
      potential: "Indépendance, innovation et force de décision.",
      key_dimension: "D1" // Décision
    },
    2: { 
      title: "Le Médiateur", 
      potential: "Diplomatie, harmonie et sensibilité relationnelle.",
      key_dimension: "D4" // Orientation sociale
    },
    3: { 
      title: "Le Communicateur", 
      potential: "Créativité, expression et optimisme social.",
      key_dimension: "D4" 
    },
    4: { 
      title: "Le Bâtisseur", 
      potential: "Structure, discipline et sens de l'organisation.",
      key_dimension: "D3" // Contrôle
    },
    5: { 
      title: "L'Aventurier", 
      potential: "Adaptabilité, liberté et soif de changement.",
      key_dimension: "D6" // Flexibilité
    },
    6: { 
      title: "Le Protecteur", 
      potential: "Responsabilité, soin des autres et équilibre.",
      key_dimension: "D4"
    },
    7: { 
      title: "L'Analyste", 
      potential: "Sagesse, introspection et recherche de vérité.",
      key_dimension: "D2" // Incertitude
    },
    8: { 
      title: "Le Stratège", 
      potential: "Puissance, ambition et gestion des enjeux matériels.",
      key_dimension: "D1"
    },
    9: { 
      title: "L'Idéaliste", 
      potential: "Compassion, humanisme et vision globale.",
      key_dimension: "D4"
    },
    11: { title: "L'Illuminateur", potential: "Intuition supérieure et inspiration.", key_dimension: "D2" },
    22: { title: "Le Maître Bâtisseur", potential: "Réalisation de projets d'envergure mondiale.", key_dimension: "D3" },
    33: { title: "Le Guide", potential: "Éveil des consciences et altruisme pur.", key_dimension: "D4" }
  };
  
  return data[num] || data[1];
}

export function getMoonSign(birthDate: string) {
  // Simplified calculation for demonstration (requires ephemeral data for precision)
  // For now, we'll return a data structure based on the month to keep it light
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  const signs = [
    "Capricorne", "Verseau", "Poissons", "Bélier", "Taureau", "Gémeaux", 
    "Cancer", "Lion", "Vierge", "Balance", "Scorpion", "Sagittaire"
  ];
  return signs[month - 1];
}
