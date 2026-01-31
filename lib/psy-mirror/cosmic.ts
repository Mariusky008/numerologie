/**
 * Numerology & Astrology Utilities
 */

export function calculateLifePathNumber(birthDate: string): number {
  const [year, month, day] = birthDate.split('-').map(Number);
  
  // Method: Sum of reduced components (Day + Month + Year)
  // This is the most accurate method for detecting Master Numbers
  const reduce = (n: number) => {
    let s = n;
    while (s > 9 && s !== 11 && s !== 22 && s !== 33) {
      s = s.toString().split('').map(Number).reduce((a, b) => a + b, 0);
    }
    return s;
  };

  const rDay = reduce(day);
  const rMonth = reduce(month);
  const rYear = reduce(year);
  
  return reduce(rDay + rMonth + rYear);
}

export function getLifePathData(num: number) {
  const data: Record<number, { title: string; potential: string; description: string; key_dimension: string }> = {
    1: { 
      title: "Le Leader Né", 
      potential: "Indépendance, innovation et force de décision.",
      description: "Votre vibration pousse à l'autonomie. Vous êtes ici pour ouvrir des voies, pas pour suivre celles des autres.",
      key_dimension: "D1" // Décision
    },
    2: { 
      title: "Le Médiateur", 
      potential: "Diplomatie, harmonie et sensibilité relationnelle.",
      description: "Votre force réside dans l'union et la collaboration. Vous percevez les nuances que les autres ignorent.",
      key_dimension: "D4" // Orientation sociale
    },
    3: { 
      title: "Le Communicateur", 
      potential: "Créativité, expression et optimisme social.",
      description: "L'expression est votre moteur. Vous transformez les idées en mots, en images ou en émotions partagées.",
      key_dimension: "D4" 
    },
    4: { 
      title: "Le Bâtisseur", 
      potential: "Structure, discipline et sens de l'organisation.",
      description: "Vous êtes l'ancrage. Votre capacité à construire sur le long terme est votre plus grand atout.",
      key_dimension: "D3" // Contrôle
    },
    5: { 
      title: "L'Aventurier", 
      potential: "Adaptabilité, liberté et soif de changement.",
      description: "Le mouvement est votre équilibre. Vous avez besoin de variété pour ne pas vous éteindre.",
      key_dimension: "D6" // Flexibilité
    },
    6: { 
      title: "Le Protecteur", 
      potential: "Responsabilité, soin des autres et équilibre.",
      description: "L'harmonie du foyer et de la communauté est votre priorité. Vous portez le sens du devoir avec grâce.",
      key_dimension: "D4"
    },
    7: { 
      title: "L'Analyste", 
      potential: "Sagesse, introspection et recherche de vérité.",
      description: "Vous cherchez le 'pourquoi'. Votre esprit est un laboratoire permanent de compréhension profonde.",
      key_dimension: "D2" // Incertitude
    },
    8: { 
      title: "Le Stratège", 
      potential: "Puissance, ambition et gestion des enjeux matériels.",
      description: "Vous comprenez les lois de la manifestation. Le pouvoir est pour vous un outil de réalisation concrète.",
      key_dimension: "D1"
    },
    9: { 
      title: "L'Idéaliste", 
      potential: "Compassion, humanisme et vision globale.",
      description: "Vous portez la sagesse universelle. Votre regard se porte naturellement vers ce qui sert l'humanité entière.",
      key_dimension: "D4"
    },
    11: { 
      title: "L'Illuminateur", 
      potential: "Intuition supérieure et inspiration.", 
      description: "Canal entre le visible et l'invisible, vous inspirez par votre simple présence.",
      key_dimension: "D2" 
    },
    22: { 
      title: "Le Maître Bâtisseur", 
      potential: "Réalisation de projets d'envergure mondiale.", 
      description: "Votre vision dépasse les limites ordinaires. Vous construisez pour les générations futures.",
      key_dimension: "D3" 
    },
    33: { 
      title: "Le Guide", 
      potential: "Éveil des consciences et altruisme pur.", 
      description: "Vibration de service inconditionnel, vous guidez par l'exemple du cœur.",
      key_dimension: "D4" 
    }
  };
  
  return data[num] || data[1];
}

export function getMoonSign(birthDate: string, birthTime?: string) {
  const date = new Date(birthDate);
  let hour = 12;
  let minute = 0;
  
  if (birthTime) {
    const [h, m] = birthTime.split(':').map(Number);
    if (!isNaN(h)) hour = h;
    if (!isNaN(m)) minute = m;
  }

  // Use UTC to ensure consistency across timezones and match the reference date
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0);
  
  const signs = [
    { name: "Bélier", element: "Feu", description: "Identité émotionnelle vive et instinctive. Vous réagissez avec passion." },
    { name: "Taureau", element: "Terre", description: "Besoins de stabilité et de confort. Vos émotions sont ancrées et durables." },
    { name: "Gémeaux", element: "Air", description: "Besoin de comprendre vos émotions par les mots. Curiosité affective." },
    { name: "Cancer", element: "Eau", description: "Sensibilité extrême et besoin de sécurité. Très attaché aux racines." },
    { name: "Lion", element: "Feu", description: "Besoin de reconnaissance et de chaleur. Émotions généreuses et théâtrales." },
    { name: "Vierge", element: "Terre", description: "Analyse des sentiments. Besoin d'ordre et de pureté émotionnelle." },
    { name: "Balance", element: "Air", description: "Recherche d'harmonie dans les relations. Émotions portées vers l'autre." },
    { name: "Scorpion", element: "Eau", description: "Intensité émotionnelle et passion secrète. Besoin de transformation." },
    { name: "Sagittaire", element: "Feu", description: "Besoin d'indépendance et d'aventure affective. Optimisme émotionnel." },
    { name: "Capricorne", element: "Terre", description: "Émotions contenues et sérieuses. Besoin de temps pour faire confiance." },
    { name: "Verseau", element: "Air", description: "Besoin de liberté et d'originalité émotionnelle. Amitié avant tout." },
    { name: "Poissons", element: "Eau", description: "Empathie totale et rêve. Vos émotions sont vastes comme l'océan." }
  ];
  
  // High-precision sidereal month calculation
  // Reference: Jan 1, 2000, 12:00 UTC - Moon was at approx 224.85° (14° Scorpio/Scorpion)
  // Scorpio is index 7. Position in signs: 7 + (14.85/30) = 7.495
  const refDate = Date.UTC(2000, 0, 1, 12, 0, 0);
  const refPosition = 7.495; 
  
  const diffTime = utcDate - refDate;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  // Sidereal month (time to return to same spot in zodiac): 27.321661 days
  const siderealMonth = 27.321661;
  
  let moonPosition = (refPosition + (diffDays / (siderealMonth / 12))) % 12;
  if (moonPosition < 0) moonPosition += 12;
  
  return signs[Math.floor(moonPosition)];
}

export function getSunSign(birthDate: string) {
  const date = new Date(birthDate);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const data: Record<string, { name: string; element: string; description: string }> = {
    "Bélier": { name: "Bélier", element: "Feu", description: "Énergie d'impulsion et de commencement. Vous foncez là où les autres hésitent." },
    "Taureau": { name: "Taureau", element: "Terre", description: "Force de persévérance et de jouissance. Vous construisez sur du solide." },
    "Gémeaux": { name: "Gémeaux", element: "Air", description: "Curiosité insatiable et agilité mentale. Le monde est votre terrain de jeu." },
    "Cancer": { name: "Cancer", element: "Eau", description: "Sensibilité profonde et protection. Votre intuition est votre boussole." },
    "Lion": { name: "Lion", element: "Feu", description: "Rayonnement et générosité. Vous portez en vous une noblesse de cœur naturelle." },
    "Vierge": { name: "Vierge", element: "Terre", description: "Discernement et sens du service. Vous voyez la perfection dans le détail." },
    "Balance": { name: "Balance", element: "Air", description: "Recherche d'harmonie et d'équité. Vous êtes l'artisan des relations justes." },
    "Scorpion": { name: "Scorpion", element: "Eau", description: "Intensité et transformation. Rien ne vous arrête dans votre quête de vérité." },
    "Sagittaire": { name: "Sagittaire", element: "Feu", description: "Optimisme et quête de sens. Vous visez toujours l'horizon lointain." },
    "Capricorne": { name: "Capricorne", element: "Terre", description: "Ambition et sagesse du temps. Vous grimpez les sommets avec patience." },
    "Verseau": { name: "Verseau", element: "Air", description: "Originalité et vision d'avenir. Vous refusez les cases pour inventer demain." },
    "Poissons": { name: "Poissons", element: "Eau", description: "Empathie universelle et rêve. Votre monde intérieur est sans frontières." }
  };

  let signName = "Poissons";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) signName = "Bélier";
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) signName = "Taureau";
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) signName = "Gémeaux";
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) signName = "Cancer";
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) signName = "Lion";
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) signName = "Vierge";
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) signName = "Balance";
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) signName = "Scorpion";
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) signName = "Sagittaire";
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) signName = "Capricorne";
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) signName = "Verseau";

  return data[signName];
}

export function getAscendant(birthDate: string, birthTime: string) {
  const [hour, minute] = birthTime.split(':').map(Number);
  const totalMinutes = hour * 60 + minute;
  
  // 1. Get Sun Sign index (Bélier=0, ..., Verseau=10, Poissons=11)
  const sunSign = getSunSign(birthDate);
  const signs = [
    "Bélier", "Taureau", "Gémeaux", "Cancer", "Lion", "Vierge", 
    "Balance", "Scorpion", "Sagittaire", "Capricorne", "Verseau", "Poissons"
  ];
  const sunSignIndex = signs.indexOf(sunSign.name);

  // 2. Approximation: Sunrise is around 7:00 AM (420 minutes)
  // At sunrise, the Ascendant is the Sun Sign.
  // The Ascendant moves ~1 degree every 4 minutes, or 1 sign (30 degrees) every 120 minutes.
  let minutesSinceSunrise = totalMinutes - 420;
  if (minutesSinceSunrise < 0) minutesSinceSunrise += 1440; // Handle pre-sunrise births

  const signOffset = Math.floor(minutesSinceSunrise / 120);
  const ascendantIndex = (sunSignIndex + signOffset) % 12;
  const ascendantName = signs[ascendantIndex];

  const data: Record<string, { name: string; description: string }> = {
    "Bélier": { name: "Bélier", description: "Une apparence dynamique et directe. Vous abordez la vie avec franchise." },
    "Taureau": { name: "Taureau", description: "Une présence calme et rassurante. Vous inspirez la stabilité immédiate." },
    "Gémeaux": { name: "Gémeaux", description: "Une allure vive et communicative. On vous remarque pour votre esprit." },
    "Cancer": { name: "Cancer", description: "Une aura douce et protectrice. Vous accueillez le monde avec empathie." },
    "Lion": { name: "Lion", description: "Un charisme solaire et assuré. Votre présence ne laisse personne indifférent." },
    "Vierge": { name: "Vierge", description: "Une allure soignée et discrète. Votre efficacité se voit au premier coup d'œil." },
    "Balance": { name: "Balance", description: "Un charme naturel et élégant. Vous cherchez l'équilibre dans chaque contact." },
    "Scorpion": { name: "Scorpion", description: "Une présence magnétique et mystérieuse. Vous dégagez une force cachée." },
    "Sagittaire": { name: "Sagittaire", description: "Une allure enthousiaste et libre. Vous semblez toujours prêt pour l'aventure." },
    "Capricorne": { name: "Capricorne", description: "Une apparence sérieuse et structurée. Vous dégagez une autorité naturelle." },
    "Verseau": { name: "Verseau", description: "Une allure originale et indépendante. Vous affirmez votre différence d'emblée." },
    "Poissons": { name: "Poissons", description: "Une aura rêveuse et inspirée. Vous semblez connecté à une autre dimension." }
  };

  return data[ascendantName];
}

export function getChartMaster(ascendant: string) {
  const masters: Record<string, { planet: string; house: string; description: string }> = {
    "Bélier": { planet: "Mars", house: "I", description: "Maître de l'Action. Votre énergie est centrée sur l'affirmation de soi et la conquête." },
    "Taureau": { planet: "Vénus", house: "II", description: "Maître de la Valeur. Vous rayonnez par votre capacité à stabiliser et savourer les ressources." },
    "Gémeaux": { planet: "Mercure", house: "III", description: "Maître de l'Échange. Votre destin passe par la transmission et la connexion mentale." },
    "Cancer": { planet: "Lune", house: "IV", description: "Maître des Racines. Votre force vient de votre base émotionnelle et de votre foyer intérieur." },
    "Lion": { planet: "Soleil", house: "V", description: "Maître de la Création. Vous êtes ici pour exprimer votre identité unique de manière éclatante." },
    "Vierge": { planet: "Mercure", house: "VI", description: "Maître de l'Utilité. Votre accomplissement passe par l'amélioration constante de votre quotidien." },
    "Balance": { planet: "Vénus", house: "VII", description: "Maître de l'Altérité. Votre équilibre se trouve dans le miroir des relations sacrées." },
    "Scorpion": { planet: "Pluton", house: "VIII", description: "Maître du Mystère. Vous êtes le gardien des secrets et des transformations profondes." },
    "Sagittaire": { planet: "Jupiter", house: "IX", description: "Maître de l'Expansion. Votre vie est une quête de sagesse et de dépassement des frontières." },
    "Capricorne": { planet: "Saturne", house: "X", description: "Maître de la Structure. Vous portez la responsabilité de bâtir une œuvre durable." },
    "Verseau": { planet: "Uranus", house: "XI", description: "Maître de l'Innovation. Votre mission est collective et tournée vers le progrès humain." },
    "Poissons": { planet: "Neptune", house: "XII", description: "Maître de l'Invisible. Vous naviguez dans les eaux de la spiritualité et du lâcher-prise." }
  };
  return masters[ascendant] || { planet: "Soleil", house: "I", description: "Maître de l'Identité." };
}
