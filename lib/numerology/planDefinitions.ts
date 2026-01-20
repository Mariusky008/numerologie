
// Definitions specific to each Numerological Plan to avoid duplication
// Based on the "Matrice Universelle des Plans d'Expression"

export interface PlanDefinition {
  desc: string; // The main description for this plan
  keywords: string[]; // Specific keywords for this plan
}

export const LIFE_PATH_DEFINITIONS: Record<number, PlanDefinition> = {
  1: {
    desc: "Votre destin est tracé sous le signe de l'autonomie. La vie vous proposera constamment des situations où vous devrez décider seul, trancher et ouvrir la voie. Votre parcours est une montée en puissance vers l'indépendance totale.",
    keywords: ["Autonomie", "Initiative", "Destin Solitaire", "Pionnier"]
  },
  2: {
    desc: "Votre chemin est celui de la relation. La vie vous mettra sans cesse face à l'autre pour apprendre la collaboration, la patience et l'écoute. Votre réussite ne se fera jamais seul, mais en duo ou en équipe.",
    keywords: ["Alliance", "Patience", "Médiation", "Duo"]
  },
  3: {
    desc: "Votre trajectoire est celle de l'expression personnelle. Le destin vous poussera sur le devant de la scène, vous demandant de communiquer, de créer et de socialiser. Les épreuves concerneront souvent votre image ou votre voix.",
    keywords: ["Expression", "Créativité", "Social", "Image"]
  },
  4: {
    desc: "Votre route est celle de la construction lente et solide. La vie ne vous fera pas de cadeaux en termes de chance rapide ; tout devra être mérité par l'effort et la méthode. C'est un chemin de bâtisseur.",
    keywords: ["Effort", "Construction", "Stabilité", "Temps"]
  },
  5: {
    desc: "Votre destin est marqué par l'imprévu et le mouvement. La vie vous proposera des virages soudains, des déménagements et des changements de cap pour tester votre adaptabilité. C'est une route sans routine.",
    keywords: ["Changement", "Aventure", "Liberté", "Adaptation"]
  },
  6: {
    desc: "Votre chemin est celui des responsabilités affectives. Le destin vous placera souvent en position de pilier familial ou communautaire. Vous aurez à gérer des charges pour les autres, apprenant ainsi l'amour responsable.",
    keywords: ["Responsabilité", "Famille", "Service", "Harmonie"]
  },
  7: {
    desc: "Votre parcours est une quête de compréhension. La vie vous isolera parfois pour vous forcer à l'introspection et à l'analyse. C'est un chemin intellectuel et spirituel qui demande de se détacher des apparences.",
    keywords: ["Sagesse", "Solitude", "Analyse", "Esprit"]
  },
  8: {
    desc: "Votre destin est celui de la confrontation à la matière. La vie vous proposera des défis liés à l'argent, au pouvoir et à la justice. C'est une trajectoire de combat et de réalisation concrète d'ambitions élevées.",
    keywords: ["Pouvoir", "Réalisation", "Justice", "Matière"]
  },
  9: {
    desc: "Votre chemin est celui du dévouement et de l'achèvement. Le destin vous invite à clore les cycles, à voyager (physiquement ou spirituellement) et à développer une conscience universelle. C'est une route de lâcher-prise pour atteindre une sagesse globale.",
    keywords: ["Aboutissement", "Voyage", "Sagesse", "Bilan"]
  },
  11: {
    desc: "Votre trajectoire est celle de l'inspiration. La vie vous placera dans des situations de tension nerveuse intense pour vous forcer à canaliser des idéaux élevés. C'est un chemin d'éveilleur de conscience, hors normes.",
    keywords: ["Inspiration", "Tension", "Guide", "Idéal"]
  },
  22: {
    desc: "Votre destin est celui des grandes réalisations. La vie vous donnera les moyens de construire des œuvres qui dépassent l'échelle individuelle. C'est un chemin de puissance constructive qui demande une éthique irréprochable.",
    keywords: ["Génie", "Construction", "Impact", "Puissance"]
  },
  33: {
    desc: "Votre chemin est celui du guide bienveillant. Le destin vous demandera souvent de vous oublier pour une cause ou pour les autres. C'est une trajectoire de haute responsabilité spirituelle et de guérison.",
    keywords: ["Guide", "Sacrifice", "Amour", "Guérison"]
  }
};

export const EXPRESSION_DEFINITIONS: Record<number, PlanDefinition> = {
  1: {
    desc: "Socialement, vous vous imposez comme un leader naturel. Vous parlez avec autorité, agissez avec rapidité et on vous confie spontanément les rênes. Votre marque de fabrique est l'originalité et la direction.",
    keywords: ["Direction", "Autorité", "Innovation", "Action"]
  },
  2: {
    desc: "Dans le monde, vous agissez comme un diplomate. Votre approche est douce, tactique et enveloppante. On vous recherche pour votre capacité à écouter, à conseiller et à apaiser les tensions. Vous êtes le liant du groupe.",
    keywords: ["Diplomatie", "Écoute", "Conseil", "Douceur"]
  },
  3: {
    desc: "Vous vous présentez au monde comme un animateur. Votre parole est fluide, votre sourire facile. Vous agissez par la communication, le charme et la créativité. Votre rôle social est de divertir, convaincre ou embellir.",
    keywords: ["Communication", "Charme", "Animation", "Parole"]
  },
  4: {
    desc: "Socialement, vous êtes le roc sur lequel on s'appuie. Vous agissez avec méthode, ponctualité et sérieux. Votre contribution au groupe est l'organisation, la structure et la fiabilité sans faille.",
    keywords: ["Fiabilité", "Méthode", "Ordre", "Sérieux"]
  },
  5: {
    desc: "Vous agissez comme un catalyseur de mouvement. Dans un groupe, vous êtes celui qui apporte la nouveauté, qui ose prendre des risques et qui vend les idées. Votre posture est dynamique, adaptable et parfois provocatrice.",
    keywords: ["Dynamisme", "Vente", "Promotion", "Risque"]
  },
  6: {
    desc: "Votre rôle social est celui du protecteur ou de l'esthète. Vous agissez pour améliorer le confort, soigner ou harmoniser l'environnement. On vous perçoit comme quelqu'un de responsable, de bienveillant et de bon goût.",
    keywords: ["Protection", "Soin", "Esthétique", "Conseil"]
  },
  7: {
    desc: "Dans le monde, vous vous posez en expert ou en analyste. Vous parlez peu mais bien, avec une certaine distance. Votre contribution est intellectuelle, technique ou stratégique. Vous êtes celui qui a 'compris' le système.",
    keywords: ["Expertise", "Analyse", "Distance", "Technique"]
  },
  8: {
    desc: "Socialement, vous dégagez une aura de puissance et d'efficacité. Vous agissez pour organiser, rentabiliser et décider. Votre posture est celle du manager ou du décideur qui ne craint pas le conflit pour obtenir des résultats.",
    keywords: ["Management", "Efficacité", "Décision", "Contrôle"]
  },
  9: {
    desc: "Vous vous présentez comme un mentor ou un visionnaire. Votre action sociale vise à transmettre, éduquer ou défendre des valeurs. Vous êtes le porte-parole, l'enseignant ou le communicant qui s'adresse au plus grand nombre.",
    keywords: ["Transmission", "Enseignement", "Vision", "Public"]
  },
  11: {
    desc: "Vous agissez comme un inspirateur. Votre présence électrise ou intrigue. Vous apportez des idées avant-gardistes et une vision qui sort du cadre. Votre rôle est de secouer les consciences ou d'innover radicalement.",
    keywords: ["Vision", "Avant-garde", "Charisme", "Réveil"]
  },
  22: {
    desc: "Socialement, vous êtes un bâtisseur d'empire. Vous agissez avec une force de frappe considérable, capable de gérer des projets complexes. On vous voit comme quelqu'un de puissant, pragmatique et capable de tout réaliser.",
    keywords: ["Stratégie", "Empire", "Réalisation", "Impact"]
  },
  33: {
    desc: "Vous agissez comme un conseiller bienveillant. Votre aura est apaisante et magnétique. Dans le monde, vous prenez naturellement soin des âmes, jouant le rôle de confident, de thérapeute ou de guide moral.",
    keywords: ["Bienveillance", "Thérapie", "Guide", "Conseil"]
  }
};

export const SOUL_URGE_DEFINITIONS: Record<number, PlanDefinition> = {
  1: {
    desc: "Au fond de vous, votre âme réclame la distinction. Vous ne supportez pas d'être un numéro. Votre désir profond est d'être reconnu comme unique, premier et indépendant. C'est une soif d'identité forte.",
    keywords: ["Distinction", "Unicité", "Fierté", "Indépendance"]
  },
  2: {
    desc: "Votre moteur intérieur est la fusion. Votre âme a besoin d'aimer et d'être aimée, de se sentir connectée, comprise. La solitude est votre pire souffrance ; l'union est votre quête sacrée.",
    keywords: ["Fusion", "Amour", "Connexion", "Tendresse"]
  },
  3: {
    desc: "Votre âme a soif d'expression et de reconnaissance. Vous avez un besoin viscéral d'être vu, entendu et admiré pour vos talents. Votre désir profond est de briller et de partager votre joie.",
    keywords: ["Reconnaissance", "Brillance", "Joie", "Public"]
  },
  4: {
    desc: "Intérieurement, vous cherchez la sécurité et l'ordre. Votre âme a besoin de repères stables, de certitudes et de tangible. Le chaos vous angoisse ; construire du solide vous apaise profondément.",
    keywords: ["Sécurité", "Ordre", "Certitude", "Racines"]
  },
  5: {
    desc: "Votre désir profond est l'intensité. Votre âme étouffe dans la routine et réclame des sensations fortes, de la liberté et de l'espace. Vous avez besoin de sentir que tout est possible, tout le temps.",
    keywords: ["Intensité", "Liberté", "Espace", "Frisson"]
  },
  6: {
    desc: "Votre âme aspire à l'harmonie parfaite. Vous avez un besoin viscéral de paix, de beauté et d'équilibre autour de vous. Votre désir est de créer un cocon d'amour où tout le monde se sent bien.",
    keywords: ["Harmonie", "Paix", "Cocon", "Beauté"]
  },
  7: {
    desc: "Au fond, vous avez soif de vérité et de silence. Votre âme cherche à comprendre les mystères de la vie. Vous avez besoin de moments de retrait pour nourrir votre esprit. La superficialité vous affame.",
    keywords: ["Vérité", "Silence", "Sens", "Compréhension"]
  },
  8: {
    desc: "Votre moteur intérieur est la réussite et la maîtrise. Votre âme veut se prouver qu'elle est capable de transformer la matière. Vous avez besoin de sentir votre propre puissance et de laisser une trace tangible.",
    keywords: ["Maîtrise", "Réussite", "Preuve", "Puissance"]
  },
  9: {
    desc: "Votre âme aspire à l'universel. Vous avez besoin de vous sentir utile à une cause plus grande que vous. Votre désir profond est de contribuer au monde, de donner et de ressentir une connexion avec l'humanité.",
    keywords: ["Contribution", "Idéal", "Humanité", "Don"]
  },
  11: {
    desc: "Votre âme est en quête d'élévation. Vous avez un besoin impérieux de spiritualité, d'inspiration et de dépassement. La banalité vous tue ; vous cherchez le sacré et le sens caché derrière chaque chose.",
    keywords: ["Élévation", "Sacré", "Inspiration", "Sens"]
  },
  22: {
    desc: "Votre désir profond est de bâtir pour la postérité. Votre âme veut créer quelque chose de grand, d'utile et de durable qui changera la société. C'est une soif d'accomplissement monumental.",
    keywords: ["Postérité", "Monument", "Grandeur", "Accomplissement"]
  },
  33: {
    desc: "Votre âme aspire à l'amour inconditionnel. Vous avez besoin de guérir, d'aider et de servir avec une compassion totale. Votre désir est d'être un canal de pure bonté.",
    keywords: ["Compassion", "Service", "Amour Pur", "Bonté"]
  }
};

export const PERSONALITY_DEFINITIONS: Record<number, PlanDefinition> = {
  1: {
    desc: "On vous perçoit instinctivement comme quelqu'un de fort et de décidé. Vous dégagez une aura de confiance en soi qui impose le respect, mais qui peut parfois passer pour de la distance ou de l'arrogance.",
    keywords: ["Assurance", "Force", "Distance", "Respect"]
  },
  2: {
    desc: "Vous dégagez une impression de douceur et d'accessibilité. Les gens se sentent tout de suite à l'aise pour se confier à vous. Vous apparaissez comme quelqu'un de calme, discret et accueillant.",
    keywords: ["Douceur", "Accueil", "Discrétion", "Calme"]
  },
  3: {
    desc: "Votre première impression est solaire. Vous apparaissez comme quelqu'un de sympathique, d'ouvert et de soigné. On remarque votre style, votre sourire et votre facilité à entrer en contact.",
    keywords: ["Sympathie", "Style", "Sourire", "Ouverture"]
  },
  4: {
    desc: "Vous renvoyez l'image de quelqu'un de sérieux, sur qui on peut compter. Vous semblez posé, ordonné et terre-à-terre. On vous fait confiance pour les choses importantes, moins pour la fête.",
    keywords: ["Sérieux", "Confiance", "Ordre", "Solide"]
  },
  5: {
    desc: "Vous dégagez une énergie pétillante et magnétique. On vous perçoit comme quelqu'un de dynamique, un peu insaisissable, avec un charme sensuel ou aventurier. Vous intriguez par votre côté libre.",
    keywords: ["Magnétisme", "Dynamisme", "Mystère", "Charme"]
  },
  6: {
    desc: "Vous apparaissez comme une figure rassurante et maternelle/paternelle. Vous dégagez de la bienveillance et un sens de l'esthétique. On vous voit comme quelqu'un de responsable et d'élégant.",
    keywords: ["Bienveillance", "Élégance", "Rassurance", "Responsable"]
  },
  7: {
    desc: "Vous dégagez une aura de mystère et d'intelligence. On vous perçoit comme quelqu'un de distingué, d'observateur et d'un peu secret. Vous intimidez parfois par votre silence ou votre regard pénétrant.",
    keywords: ["Mystère", "Distinction", "Observation", "Secret"]
  },
  8: {
    desc: "Vous en imposez. Vous dégagez une impression de puissance, de réussite et d'autorité naturelle. On sent tout de suite qu'il ne faut pas vous marcher sur les pieds. Votre style est souvent soigné et statutaire.",
    keywords: ["Autorité", "Statut", "Puissance", "Classe"]
  },
  9: {
    desc: "Vous apparaissez comme quelqu'un de généreux et d'ouvert d'esprit. Vous dégagez une chaleur humaine et une tolérance qui attirent naturellement les autres. On vous perçoit comme une personne accessible, bienveillante et digne de confiance.",
    keywords: ["Bienveillance", "Tolérance", "Humanisme", "Douceur"]
  },
  11: {
    desc: "Vous avez une présence électrique. On remarque votre regard habité, votre nervosité ou votre charisme particulier. Vous semblez 'ailleurs' ou connecté à autre chose, ce qui vous rend fascinant.",
    keywords: ["Électrique", "Fascination", "Charisme", "Présence"]
  },
  22: {
    desc: "Vous dégagez une force tranquille impressionnante. On sent chez vous une capacité de travail et de réalisation hors normes. Vous apparaissez comme un pilier inébranlable et compétent.",
    keywords: ["Compétence", "Force Tranquille", "Solidité", "Pilier"]
  },
  33: {
    desc: "Vous rayonnez d'une douceur lumineuse. Votre présence apaise instantanément. On vous perçoit comme quelqu'un de profondément gentil, presque saint, vers qui on a envie d'aller pour être consolé.",
    keywords: ["Lumière", "Douceur", "Sainteté", "Apaisement"]
  }
};
