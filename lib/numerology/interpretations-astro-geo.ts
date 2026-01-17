// Interpretations for Astro-Numerology and Geo-Numerology

export const PLANET_INFLUENCES: Record<string, string> = {
  "soleil": "Le Soleil représente votre essence vitale, votre volonté et votre rayonnement. Il vous pousse à briller, à prendre votre place de leader et à exprimer votre individualité sans compromis. Votre défi est de rayonner sans brûler les autres.",
  "lune": "La Lune gouverne vos émotions, votre intuition et votre monde intérieur. Elle vous confère une grande sensibilité et une imagination fertile. Votre force réside dans votre capacité à ressentir les ambiances et à nourrir les autres.",
  "jupiter": "Jupiter est la planète de l'expansion, de la chance et de la sagesse. Elle amplifie tout ce qu'elle touche. Elle vous invite à voir grand, à explorer de nouveaux horizons (physiques ou intellectuels) et à enseigner ce que vous avez appris.",
  "uranus": "Uranus est l'éveilleur, la planète du changement soudain et de l'innovation. Elle vous pousse à briser les codes, à vous libérer des traditions obsolètes et à affirmer votre originalité, parfois de manière radicale.",
  "mercure": "Mercure est le messager, maître de la communication et de l'intellect. Il vous dote d'une vivacité d'esprit, d'une curiosité insatiable et d'une capacité d'adaptation rapide. Votre arme est votre parole.",
  "venus": "Vénus incarne l'amour, l'harmonie, les valeurs et l'esthétique. Elle vous oriente vers la recherche du beau, de l'équilibre relationnel et du plaisir. Votre talent est de créer du lien et de la diplomatie.",
  "neptune": "Neptune est la planète du rêve, de la spiritualité et de l'illusion. Elle dissout les frontières de l'ego pour vous connecter à quelque chose de plus vaste. Elle développe votre compassion et votre inspiration artistique.",
  "saturne": "Saturne est le grand architecte, maître du temps et de la structure. Il vous demande rigueur, patience et responsabilité. Son influence n'est pas restrictive mais constructrice : il vous aide à bâtir des œuvres durables.",
  "mars": "Mars est l'énergie de l'action, du désir et de la conquête. Il vous donne le carburant nécessaire pour initier des projets, défendre vos limites et surmonter les obstacles. C'est votre guerrier intérieur."
};

export const ZODIAC_DETAILS: Record<string, { element: string, quality: string, description: string }> = {
  "bélier": {
    element: "Feu",
    quality: "Cardinal",
    description: "Pionnier du zodiaque, vous possédez une énergie d'initiation brute. Vous êtes là pour ouvrir la voie, agir instinctivement et affirmer votre volonté d'être."
  },
  "taureau": {
    element: "Terre",
    quality: "Fixe",
    description: "Bâtisseur sensuel, vous recherchez la sécurité, le plaisir et la stabilité. Vous avez le don de faire fructifier les ressources et de créer de la beauté durable."
  },
  "gémeaux": {
    element: "Air",
    quality: "Mutable",
    description: "Communicant agile, vous êtes le trait d'union entre les idées et les gens. Votre curiosité et votre adaptabilité sont vos plus grands atouts pour naviguer dans la complexité."
  },
  "cancer": {
    element: "Eau",
    quality: "Cardinal",
    description: "Gardien du foyer et de la mémoire, vous protégez ce qui est vulnérable. Votre force émotionnelle est un socle sur lequel les autres peuvent se reposer."
  },
  "lion": {
    element: "Feu",
    quality: "Fixe",
    description: "Créateur rayonnant, vous avez besoin d'exprimer votre unicité. Votre générosité et votre charisme naturel inspirent les autres à trouver leur propre lumière."
  },
  "vierge": {
    element: "Terre",
    quality: "Mutable",
    description: "Analyste perfectionniste, vous cherchez à améliorer, soigner et optimiser. Votre sens du service et du détail fait de vous un pilier indispensable."
  },
  "balance": {
    element: "Air",
    quality: "Cardinal",
    description: "Diplomate esthète, vous recherchez l'harmonie et la justice. Vous révélez votre potentiel à travers la relation à l'autre et la création d'équilibre."
  },
  "scorpion": {
    element: "Eau",
    quality: "Fixe",
    description: "Alchimiste intense, vous plongez dans les profondeurs pour transformer. Vous possédez une puissance psychologique capable de renaître de ses cendres."
  },
  "sagittaire": {
    element: "Feu",
    quality: "Mutable",
    description: "Explorateur philosophe, vous cherchez le sens et la vérité. Votre optimisme et votre soif d'expansion vous poussent toujours plus loin."
  },
  "capricorne": {
    element: "Terre",
    quality: "Cardinal",
    description: "Stratège ambitieux, vous visez le sommet avec patience. Votre intégrité et votre persévérance vous permettent de réaliser des ambitions concrètes."
  },
  "verseau": {
    element: "Air",
    quality: "Fixe",
    description: "Visionnaire libre, vous pensez le futur et le collectif. Votre originalité et votre idéalisme sont là pour réformer ce qui doit l'être."
  },
  "poissons": {
    element: "Eau",
    quality: "Mutable",
    description: "Mystique empathique, vous ressentez l'unité de tout. Votre intuition et votre dévouement vous connectent aux plans subtils de l'existence."
  }
};

export const PLACE_VIBRATIONS: Record<number, string> = {
  1: "Ce lieu vibre d'une énergie de commencement, d'individualité et d'ambition. C'est un endroit idéal pour entreprendre, se lancer en solo ou prendre un nouveau départ. L'atmosphère y est dynamique, parfois rapide, favorisant l'autonomie.",
  2: "Ce lieu porte une vibration de collaboration, de calme et de diplomatie. C'est un endroit propice aux couples, aux partenariats et à l'écoute. L'énergie y est douce, favorisant la patience et les détails plutôt que la vitesse.",
  3: "Ce lieu rayonne de créativité, de communication et de vie sociale. C'est un endroit stimulant, joyeux, où les échanges sont favorisés. Idéal pour les artistes, les commerçants et ceux qui cherchent à s'exprimer.",
  4: "Ce lieu incarne la structure, la sécurité et le travail. C'est un endroit solide, organisé, parfois un peu rigide, mais extrêmement rassurant. Idéal pour construire, s'enraciner et travailler avec discipline.",
  5: "Ce lieu vibre de changement, de liberté et de mouvement. C'est un endroit où tout bouge vite, propice aux voyages, à l'aventure et à l'adaptabilité. Il peut être instable mais jamais ennuyeux.",
  6: "Ce lieu dégage une énergie de responsabilité, d'harmonie familiale et de soin. C'est le nid idéal, propice au foyer, à la communauté et au bien-être. L'esthétique et le confort y sont importants.",
  7: "Ce lieu invite à l'introspection, au calme et à l'étude. C'est un endroit spirituel ou intellectuel, parfois un peu isolé, qui favorise la réflexion profonde, la recherche et le repos de l'esprit.",
  8: "Ce lieu pulse d'une énergie de pouvoir, d'argent et de réussite matérielle. C'est un centre d'affaires, une ville ambitieuse où l'efficacité prime. Idéal pour les carrières ambitieuses et les projets financiers.",
  9: "Ce lieu porte une vibration universelle, humaniste et d'aboutissement. C'est un endroit ouvert sur le monde, favorisant la tolérance, les arts et l'altruisme. On y vient pour clore un chapitre ou s'ouvrir à l'universel."
};

export const RESONANCE_DETAILS: Record<string, string> = {
  "harmonie": "Cette vibration géographique est en phase naturelle avec votre Chemin de Vie. Le lieu agit comme un amplificateur de vos talents innés. Vous vous y sentirez 'chez vous' rapidement, et les opportunités sembleront venir avec plus de fluidité.",
  "dynamique": "Cette vibration géographique crée une friction stimulante avec votre Chemin de Vie. Ce n'est pas un lieu de repos, mais un lieu de croissance. Il vous mettra au défi de développer des qualités que vous ne possédez pas naturellement, accélérant ainsi votre évolution."
};
