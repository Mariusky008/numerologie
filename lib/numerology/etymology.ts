
import { normalizeString } from './engine';

interface NameData {
  origin: string;
  meaning: string;
  vibration: string;
}

const NAME_DB: Record<string, NameData> = {
  "jean": {
    origin: "Hébreu (Yehohanan)",
    meaning: "Dieu fait grâce",
    vibration: "Porte une vibration de générosité et de réceptivité. C'est un prénom qui prédispose à l'écoute, à la fidélité et à une certaine quête d'idéal. Il y a une force tranquille chez Jean, une capacité à traverser les époques sans perdre son essence."
  },
  "philippe": {
    origin: "Grec (Philippos)",
    meaning: "Qui aime les chevaux",
    vibration: "Évoque le mouvement, la noblesse et la maîtrise de l'énergie vitale. C'est un prénom dynamique, tourné vers l'action, le voyage et la communication. Il confère une certaine élégance d'esprit et un besoin d'espaces."
  },
  "marie": {
    origin: "Hébreu (Miryam)",
    meaning: "Celle qui élève / Goutte de mer",
    vibration: "Vibration universelle de protection et de sagesse. Marie porte une énergie maternelle, résiliente et spirituelle, capable d'une grande profondeur émotionnelle."
  },
  "pierre": {
    origin: "Grec (Petros)",
    meaning: "Le roc, la pierre",
    vibration: "Symbole de solidité, de fondation et de construction. Pierre apporte une énergie structurante, fiable et concrète, idéale pour bâtir sur le long terme."
  },
  "sophie": {
    origin: "Grec (Sophia)",
    meaning: "Sagesse",
    vibration: "Rayonne une intelligence intuitive et philosophique. Sophie cherche le sens caché des choses, alliant douceur et lucidité."
  },
  "thomas": {
    origin: "Araméen (Te'oma)",
    meaning: "Jumeau",
    vibration: "Incarne la dualité réconciliée et la recherche de vérité par l'expérience. Thomas a besoin de voir pour croire, c'est un esprit pragmatique mais ouvert au mystère."
  },
  "nicolas": {
    origin: "Grec (Nikolaos)",
    meaning: "Victoire du peuple",
    vibration: "Énergie de communication et de succès collectif. Nicolas est un rassembleur, doté d'un charme naturel et d'une capacité à négocier la paix."
  },
  "isabelle": {
    origin: "Hébreu (Elisheba)",
    meaning: "Dieu est promesse",
    vibration: "Vibration de dévouement et de beauté intérieure. Isabelle porte une exigence de perfection et une grande sensibilité artistique."
  },
  "laurent": {
    origin: "Latin (Laurentius)",
    meaning: "Couronné de lauriers",
    vibration: "Évoque la réussite, la gloire solaire et l'accomplissement. Laurent a une nature chaleureuse, ambitieuse et protectrice."
  }
};

const GENERIC_VIBRATIONS: Record<number, string> = {
  1: "Ce prénom porte une énergie d'indépendance et de leadership. Il pousse à l'autonomie et à l'initiative.",
  2: "Ce prénom vibre sur la collaboration et l'harmonie. Il favorise l'écoute et la diplomatie.",
  3: "Ce prénom est une source de créativité et d'expression sociale. Il apporte joie et sociabilité.",
  4: "Ce prénom ancre la stabilité et la rigueur. Il prédispose à la construction solide et au travail.",
  5: "Ce prénom invite au changement et à l'aventure. Il insuffle un besoin de liberté et de mouvement.",
  6: "Ce prénom rayonne l'amour et la responsabilité. Il est tourné vers le foyer, l'harmonie et le soin.",
  7: "Ce prénom porte une vibration d'analyse et de sagesse. Il favorise la vie intérieure et la réflexion.",
  8: "Ce prénom est lié à la puissance et à la réalisation matérielle. Il donne de l'ambition et du courage.",
  9: "Ce prénom ouvre sur l'humanisme et l'universel. Il porte des valeurs de compassion et d'idéalisme."
};

/**
 * Calculates the 'Active Number' of a name (Sum of all letters).
 */
function calculateNameNumber(name: string): number {
  const clean = normalizeString(name);
  const gematria: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  
  let sum = 0;
  for (const char of clean) {
    sum += gematria[char] || 0;
  }
  
  let reduced = sum;
  while (reduced > 9 && reduced !== 11 && reduced !== 22 && reduced !== 33) {
    reduced = Array.from(String(reduced), Number).reduce((a, b) => a + b, 0);
  }
  return reduced;
}

export function getNameAnalysis(name: string): NameData {
  const key = normalizeString(name);
  
  // 1. Try DB lookup
  if (NAME_DB[key]) {
    return NAME_DB[key];
  }

  // 2. Fallback: Procedural Generation
  const activeNum = calculateNameNumber(name);
  // Simplify master numbers for generic text if needed, or keep them
  const baseNum = (activeNum === 11 || activeNum === 22 || activeNum === 33) ? (activeNum === 11 ? 2 : activeNum === 22 ? 4 : 6) : activeNum;
  
  return {
    origin: "Origine Universelle",
    meaning: `Vibration Numérologique ${activeNum}`,
    vibration: GENERIC_VIBRATIONS[baseNum] || GENERIC_VIBRATIONS[9]
  };
}
