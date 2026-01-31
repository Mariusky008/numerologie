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
  const date = new Date(birthDate);
  const month = date.getMonth() + 1;
  
  const signs = [
    { name: "Capricorne", element: "Terre" }, { name: "Verseau", element: "Air" },
    { name: "Poissons", element: "Eau" }, { name: "Bélier", element: "Feu" },
    { name: "Taureau", element: "Terre" }, { name: "Gémeaux", element: "Air" },
    { name: "Cancer", element: "Eau" }, { name: "Lion", element: "Feu" },
    { name: "Vierge", element: "Terre" }, { name: "Balance", element: "Air" },
    { name: "Scorpion", element: "Eau" }, { name: "Sagittaire", element: "Feu" }
  ];
  
  return signs[month - 1];
}

export function getSunSign(birthDate: string) {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: "Bélier", element: "Feu" };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: "Taureau", element: "Terre" };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: "Gémeaux", element: "Air" };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: "Cancer", element: "Eau" };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: "Lion", element: "Feu" };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: "Vierge", element: "Terre" };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: "Balance", element: "Air" };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: "Scorpion", element: "Eau" };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: "Sagittaire", element: "Feu" };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: "Capricorne", element: "Terre" };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: "Verseau", element: "Air" };
  return { name: "Poissons", element: "Eau" };
}

export function getAscendant(birthTime: string) {
  // Simplified ascendant calculation based on birth time
  const [hour] = birthTime.split(':').map(Number);
  
  const signs = [
    "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", 
    "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"
  ];
  
  // Rule of thumb: Ascendant changes roughly every 2 hours
  const index = Math.floor(hour / 2);
  return signs[index % 12];
}

export function getChartMaster(ascendant: string) {
  const masters: Record<string, { planet: string; house: string }> = {
    "Bélier": { planet: "Mars", house: "I" },
    "Taureau": { planet: "Vénus", house: "II" },
    "Gémeaux": { planet: "Mercure", house: "III" },
    "Cancer": { planet: "Lune", house: "IV" },
    "Lion": { planet: "Soleil", house: "V" },
    "Vierge": { planet: "Mercure", house: "VI" },
    "Balance": { planet: "Vénus", house: "VII" },
    "Scorpion": { planet: "Pluton", house: "VIII" },
    "Sagittaire": { planet: "Jupiter", house: "IX" },
    "Capricorne": { planet: "Saturne", house: "X" },
    "Verseau": { planet: "Uranus", house: "XI" },
    "Poissons": { planet: "Neptune", house: "XII" }
  };
  return masters[ascendant] || { planet: "Soleil", house: "I" };
}
