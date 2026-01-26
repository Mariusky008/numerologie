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

export const ZODIAC_DETAILS: Record<string, { element: string, quality: string, description: string, moonDesc: string, ascendantDesc: string }> = {
  "bélier": {
    element: "Feu",
    quality: "Cardinal",
    description: "Pionnier du zodiaque, vous possédez une énergie d'initiation brute. Vous êtes là pour ouvrir la voie, agir instinctivement et affirmer votre volonté d'être. Votre Soleil en Bélier vous demande d'oser être le premier, de prendre des risques calculés et de ne jamais laisser votre flamme s'éteindre sous le poids de la routine.",
    moonDesc: "Avec la Lune en Bélier, vos émotions sont vives, instantanées et ardentes. Vous réagissez au quart de tour. Vous avez un besoin viscéral d'action pour vous sentir en sécurité. L'attente vous est insupportable; vous guérissez vos blessures en bougeant et en entreprenant.",
    ascendantDesc: "L'Ascendant Bélier vous donne une approche de la vie directe, courageuse et énergique. Les autres vous perçoivent comme quelqu'un de dynamique, parfois impulsif, qui n'a pas peur de prendre des initiatives. Votre première réaction face à une situation est l'action."
  },
  "taureau": {
    element: "Terre",
    quality: "Fixe",
    description: "Bâtisseur sensuel, vous recherchez la sécurité, le plaisir et la stabilité. Vous avez le don de faire fructifier les ressources et de créer de la beauté durable. Votre Soleil en Taureau vous invite à ralentir pour savourer la vie, à vous ancrer dans la matière et à construire pierre après pierre.",
    moonDesc: "Avec la Lune en Taureau, votre monde intérieur est un jardin paisible. Vous avez un besoin fondamental de stabilité matérielle et de confort sensoriel pour vous sentir bien. Le changement brusque vous angoisse; vous trouvez votre paix dans la nature, les plaisirs simples et la fidélité.",
    ascendantDesc: "L'Ascendant Taureau vous confère une présence calme, rassurante et solide. Vous abordez le monde avec prudence et pragmatisme, prenant le temps de savourer les choses. On vous perçoit comme quelqu'un de fiable, de patient et de sensuel."
  },
  "gémeaux": {
    element: "Air",
    quality: "Mutable",
    description: "Communicant agile, vous êtes le trait d'union entre les idées et les gens. Votre curiosité et votre adaptabilité sont vos plus grands atouts pour naviguer dans la complexité. Votre Soleil en Gémeaux vous pousse à apprendre, à échanger et à ne jamais cesser de vous émerveiller de la diversité du monde.",
    moonDesc: "Avec la Lune en Gémeaux, vos émotions passent par le filtre de l'intellect. Vous avez besoin de comprendre ce que vous ressentez, d'en parler, de le verbaliser. Votre sécurité émotionnelle passe par la communication et le mouvement; l'ennui est votre pire ennemi.",
    ascendantDesc: "L'Ascendant Gémeaux vous donne une allure juvénile, vive et sociable. Vous entrez en contact avec le monde par la curiosité et la parole. On vous perçoit comme quelqu'un d'intelligent, de mobile et d'adaptable, toujours prêt à échanger."
  },
  "cancer": {
    element: "Eau",
    quality: "Cardinal",
    description: "Gardien du foyer et de la mémoire, vous protégez ce qui est vulnérable. Votre force émotionnelle est un socle sur lequel les autres peuvent se reposer. Votre Soleil en Cancer vous demande de créer un clan, de nourrir vos racines et d'accepter votre grande sensibilité comme une boussole, non une faiblesse.",
    moonDesc: "Avec la Lune en Cancer (son domicile), votre sensibilité est immense. Vous êtes une éponge émotionnelle, absorbant les ambiances environnantes. Votre besoin de sécurité, de foyer et de protection est absolu. Vous prenez soin des autres comme une mère universelle.",
    ascendantDesc: "L'Ascendant Cancer vous dote d'une approche douce, réceptive et protectrice. Vous abordez les nouvelles situations avec prudence et intuition. On vous perçoit comme quelqu'un d'empathique, de bienveillant, parfois un peu réservé au premier abord."
  },
  "lion": {
    element: "Feu",
    quality: "Fixe",
    description: "Créateur rayonnant, vous avez besoin d'exprimer votre unicité. Votre générosité et votre charisme naturel inspirent les autres à trouver leur propre lumière. Votre Soleil en Lion est une invitation à la souveraineté : osez briller, osez être vu et osez aimer avec noblesse et panache.",
    moonDesc: "Avec la Lune en Lion, vous avez besoin de reconnaissance et d'admiration pour vous sentir aimé. Votre cœur est noble, généreux et théâtral. Vous exprimez vos émotions avec chaleur et dignité, ne supportant pas la médiocrité ou la mesquinerie.",
    ascendantDesc: "L'Ascendant Lion vous confère une présence solaire, digne et charismatique. Vous abordez la vie avec confiance et créativité. On vous remarque naturellement ; vous dégagez une aura de chaleur et d'autorité bienveillante."
  },
  "vierge": {
    element: "Terre",
    quality: "Mutable",
    description: "Analyste perfectionniste, vous cherchez à améliorer, soigner et optimiser. Votre sens du service et du détail fait de vous un pilier indispensable. Votre Soleil en Vierge vous guide vers l'excellence, l'humilité et la maîtrise technique. Vous trouvez votre sens en étant utile au monde.",
    moonDesc: "Avec la Lune en Vierge, vous analysez vos émotions pour les maîtriser. Vous avez besoin d'ordre, de propreté et de routines saines pour vous sentir en sécurité. Vous exprimez votre affection par des gestes concrets de service et d'aide pratique.",
    ascendantDesc: "L'Ascendant Vierge vous donne une approche méthodique, discrète et observatrice. Vous analysez les situations avant d'agir. On vous perçoit comme quelqu'un de soigné, de serviable et de précis, avec un grand sens du détail."
  },
  "balance": {
    element: "Air",
    quality: "Cardinal",
    description: "Diplomate esthète, vous recherchez l'harmonie et la justice. Vous révélez votre potentiel à travers la relation à l'autre et la création d'équilibre. Votre Soleil en Balance vous demande de pacifier, de négocier et de créer de la beauté, tout en apprenant à ne pas vous perdre dans le désir de plaire.",
    moonDesc: "Avec la Lune en Balance, votre équilibre émotionnel dépend de l'harmonie de vos relations. Le conflit vous est viscéralement insupportable. Vous avez besoin de paix, de beauté et de partage pour vous sentir bien. La solitude peut être une épreuve.",
    ascendantDesc: "L'Ascendant Balance vous confère charme, élégance et sociabilité. Vous abordez le monde avec le désir de plaire et d'harmoniser. On vous perçoit comme quelqu'un de courtois, de raffiné et de diplomate, toujours à la recherche du compromis."
  },
  "scorpion": {
    element: "Eau",
    quality: "Fixe",
    description: "Alchimiste intense, vous plongez dans les profondeurs pour transformer. Vous possédez une puissance psychologique capable de renaître de ses cendres. Votre Soleil en Scorpion vous invite à embrasser votre vérité, même sombre, et à utiliser votre magnétisme pour guérir et révéler les secrets cachés.",
    moonDesc: "Avec la Lune en Scorpion, vos émotions sont océaniques, secrètes et absolues. Vous ressentez tout avec une intensité extrême. Vous avez besoin de fusion, d'intimité profonde et de vérité. Vous ne tolérez pas la superficialité et possédez un instinct infaillible.",
    ascendantDesc: "L'Ascendant Scorpion vous donne une présence magnétique, mystérieuse et intense. Vous scannez votre environnement avec perspicacité. On vous perçoit comme quelqu'un de profond, de secret et de puissant, qui ne se dévoile pas facilement."
  },
  "sagittaire": {
    element: "Feu",
    quality: "Mutable",
    description: "Explorateur philosophe, vous cherchez le sens et la vérité. Votre optimisme et votre soif d'expansion vous poussent toujours plus loin. Votre Soleil en Sagittaire vous appelle à l'aventure, physique ou spirituelle, et à enseigner avec enthousiasme la sagesse que vous avez glanée sur votre chemin.",
    moonDesc: "Avec la Lune en Sagittaire, vous avez besoin de liberté et d'espace pour respirer. L'optimisme est votre mécanisme de défense naturel. Vous vous sentez en sécurité lorsque vous pouvez bouger, apprendre et croire en un avenir meilleur. La routine vous étouffe.",
    ascendantDesc: "L'Ascendant Sagittaire vous dote d'une énergie enthousiaste, bienveillante et aventureuse. Vous abordez la vie comme une quête ou un voyage. On vous perçoit comme quelqu'un d'ouvert, d'optimiste et d'inspirant, toujours prêt à explorer."
  },
  "capricorne": {
    element: "Terre",
    quality: "Cardinal",
    description: "Stratège ambitieux, vous visez le sommet avec patience. Votre intégrité et votre persévérance vous permettent de réaliser des ambitions concrètes. Votre Soleil en Capricorne vous demande de structurer, de prendre des responsabilités et de bâtir une œuvre qui résistera à l'épreuve du temps.",
    moonDesc: "Avec la Lune en Capricorne, vous contrôlez vos émotions avec pudeur et réserve. Vous avez besoin de structure, d'ambition et de respect pour vous sentir en sécurité. Vous ne vous plaignez jamais, préférant assumer vos responsabilités et avancer seul si nécessaire.",
    ascendantDesc: "L'Ascendant Capricorne vous confère une allure sérieuse, mature et responsable. Vous abordez le monde avec prudence et ambition. On vous perçoit comme quelqu'un de compétent, de structuré et de fiable, qui inspire le respect."
  },
  "verseau": {
    element: "Air",
    quality: "Fixe",
    description: "Visionnaire libre, vous pensez le futur et le collectif. Votre originalité et votre idéalisme sont là pour réformer ce qui doit l'être. Votre Soleil en Verseau vous pousse à vous libérer des conditionnements, à innover et à défendre des valeurs humaines et fraternelles.",
    moonDesc: "Avec la Lune en Verseau, vous avez besoin d'indépendance émotionnelle. Vous rationalisez vos sentiments et avez horreur des drames passionnels. Vous vous sentez bien au sein d'un groupe, d'une communauté, tout en préservant farouchement votre liberté individuelle.",
    ascendantDesc: "L'Ascendant Verseau vous donne une apparence originale, amicale et indépendante. Vous abordez la vie avec curiosité et anticonformisme. On vous perçoit comme quelqu'un d'unique, de libre d'esprit et de fraternel."
  },
  "poissons": {
    element: "Eau",
    quality: "Mutable",
    description: "Mystique empathique, vous ressentez l'unité de tout. Votre intuition et votre dévouement vous connectent aux plans subtils de l'existence. Votre Soleil en Poissons vous invite à lâcher prise, à faire confiance à l'invisible et à utiliser votre immense compassion pour soulager le monde.",
    moonDesc: "Avec la Lune en Poissons, votre sensibilité est sans limite. Vous absorbez les émotions du monde comme une éponge. Vous avez besoin de moments de retrait, de rêve et de musique pour recharger vos batteries. Votre intuition est votre guide le plus fiable.",
    ascendantDesc: "L'Ascendant Poissons vous confère une présence insaisissable, douce et poétique. Vous abordez le monde avec intuition et fluidité. On vous perçoit comme quelqu'un d'empathique, de rêveur et de mystérieux, difficile à cerner."
  }
};

export const HOUSE_MEANINGS: Record<number, { title: string, keywords: string, description: string, sunContext: string }> = {
  1: { 
    title: "Maison 1", 
    keywords: "Identité, Apparence, Élan", 
    description: "Le domaine de l'affirmation de soi, de l'image que vous projetez et de votre manière d'initier les choses.",
    sunContext: "Le Soleil en Maison 1 place votre identité au centre de tout. Vous êtes ici pour vous découvrir vous-même et vous affirmer."
  },
  2: { 
    title: "Maison 2", 
    keywords: "Ressources, Valeurs, Sécurité", 
    description: "Le domaine de vos acquis, de votre argent, de vos talents innés et de ce qui vous donne un sentiment de sécurité.",
    sunContext: "Le Soleil en Maison 2 met l'accent sur la construction de votre sécurité matérielle et la valorisation de vos talents personnels."
  },
  3: { 
    title: "Maison 3", 
    keywords: "Communication, Apprentissage, Entourage", 
    description: "Le domaine des échanges, des études courtes, des frères et sœurs et de votre environnement immédiat.",
    sunContext: "Le Soleil en Maison 3 illumine votre besoin de communiquer, d'apprendre et de connecter les gens autour de vous."
  },
  4: { 
    title: "Maison 4", 
    keywords: "Racines, Foyer, Intimité", 
    description: "Le domaine de la famille, des origines, de votre habitat et de votre monde intérieur privé.",
    sunContext: "Le Soleil en Maison 4 indique que votre réalisation passe par vos racines, votre foyer et la sécurité émotionnelle de votre clan."
  },
  5: { 
    title: "Maison 5", 
    keywords: "Créativité, Amour, Plaisir", 
    description: "Le domaine de l'expression personnelle, des enfants, des amours, des loisirs et de la joie de vivre.",
    sunContext: "Le Soleil en Maison 5 vous pousse à briller par votre créativité, à exprimer votre amour et à célébrer la vie."
  },
  6: { 
    title: "Maison 6", 
    keywords: "Quotidien, Santé, Service", 
    description: "Le domaine du travail quotidien, des habitudes, de l'hygiène de vie et de l'utilité concrète.",
    sunContext: "Le Soleil en Maison 6 trouve son sens dans le service, le perfectionnement de soi et l'organisation du quotidien."
  },
  7: { 
    title: "Maison 7", 
    keywords: "Relationnel, Contrats, Couple", 
    description: "Le domaine de l'autre, du mariage, des associations et de la manière dont vous interagissez en duo.",
    sunContext: "Le Soleil en Maison 7 indique que vous vous réalisez pleinement à travers vos relations, partenariats et le miroir de l'autre."
  },
  8: { 
    title: "Maison 8", 
    keywords: "Transformation, Mystère, Crises", 
    description: "Le domaine des métamorphoses, de la sexualité, de l'argent des autres, de l'occulte et des renaissances.",
    sunContext: "Le Soleil en Maison 8 vous invite à explorer les profondeurs de l'existence, à transformer ce qui doit l'être et à renaître."
  },
  9: { 
    title: "Maison 9", 
    keywords: "Expansion, Philosophie, Voyage", 
    description: "Le domaine de la quête de sens, des études supérieures, de la spiritualité et des horizons lointains.",
    sunContext: "Le Soleil en Maison 9 vous pousse vers l'aventure, la sagesse et l'élargissement constant de votre conscience."
  },
  10: { 
    title: "Maison 10", 
    keywords: "Vocation, Carrière, Statut", 
    description: "Le domaine de la réussite sociale, de la mission de vie publique, de la reconnaissance et de l'autorité.",
    sunContext: "Le Soleil en Maison 10 met l'accent sur la vocation, l'élévation, la reconnaissance, la mission publique et le besoin de construire une trajectoire visible et cohérente."
  },
  11: { 
    title: "Maison 11", 
    keywords: "Projets, Amis, Futur", 
    description: "Le domaine des espoirs, des groupes, des réseaux, des amitiés et de votre vision pour l'avenir.",
    sunContext: "Le Soleil en Maison 11 indique que votre réalisation passe par le collectif, les projets d'avenir et l'innovation sociale."
  },
  12: { 
    title: "Maison 12", 
    keywords: "Inconscient, Retrait, Spiritualité", 
    description: "Le domaine de l'âme, des épreuves secrètes, de la guérison, de la solitude et de la dissolution de l'ego.",
    sunContext: "Le Soleil en Maison 12 vous invite à vous tourner vers l'intérieur, à servir une cause plus grande et à explorer la spiritualité."
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