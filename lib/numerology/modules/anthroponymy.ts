import NAMES_DB from '../data/prenoms.json';

// Type pour notre base de données JSON
type NamesDatabase = Record<string, {
  names: string[];
  origin: string;
  meaning: string;
  spiritual: string;
}>;

const db = NAMES_DB as NamesDatabase;

export function analyzeNameSignature(fullName: string) {
  const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
  const firstName = fullName.split(' ')[0].toLowerCase().trim();
  
  // Recherche dans la base de données (avec gestion des variantes basique)
  const nameInfo = db[firstName] || null;

  const vowels = cleanName.match(/[aeiouy]/g) || [];
  const consonants = cleanName.match(/[bcdfghjklmnpqrstvwxz]/g) || [];
  
  const firstLetter = fullName.trim().charAt(0).toUpperCase();
  const length = cleanName.length;

  let signatureType = "Équilibrée";
  if (vowels.length > consonants.length) signatureType = "Intuitive & Créative";
  if (consonants.length > vowels.length * 1.5) signatureType = "Concrète & Active";

  return {
    firstLetter,
    length,
    vowelsCount: vowels.length,
    consonantsCount: consonants.length,
    signatureType,
    initialMeaning: getInitialMeaning(firstLetter),
    etymology: nameInfo ? {
      origin: nameInfo.origin,
      meaning: nameInfo.meaning,
      spiritual: nameInfo.spiritual
    } : null
  };
}

function getInitialMeaning(letter: string): string {
  const meanings: Record<string, string> = {
    "A": "Volonté, cérébralité, direction.",
    "B": "Sensibilité, réserve, émotivité.",
    "C": "Expression, communication, sociabilité.",
    "D": "Structure, travail, droiture.",
    "E": "Mouvement, curiosité, adaptation.",
    "F": "Responsabilité, famille, choix.",
    "G": "Solitude, réflexion, secret.",
    "H": "Ambition, réussite, équilibre.",
    "I": "Émotivité, tension, idéalisme.",
    "J": "Intelligence, direction, innovation.",
    // ... suite simplifiée
    "M": "Travail, construction, mère.",
    "P": "Discrétion, philosophie, retrait.",
    "S": "Nervosité, émotivité, réussite.",
    "V": "Maîtrise, inspiration, construction."
  };
  return meanings[letter] || "Potentiel unique à développer.";
}