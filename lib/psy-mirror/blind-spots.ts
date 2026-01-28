import { DimensionId } from './types';

export interface BlindSpot {
  trigger: string;
  label: string;
  consequences: string[];
  template: string;
  lever: string;
  impact_on_others: string;
  situational_example: string;
}

export const BLIND_SPOT_LIBRARY: Record<string, BlindSpot> = {
  D1_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "L'Impulsion sous-estimée",
    consequences: [
      "Décisions prises sans alignement interne réel, créant un stress résiduel.",
      "Sentiment d’avoir agi trop vite après coup, menant à des remords inutiles.",
      "Corrections fréquentes de trajectoire qui épuisent vos ressources."
    ],
    impact_on_others: "Votre entourage peut vous percevoir comme imprévisible ou impatient, ce qui les pousse à ne plus vous solliciter pour des décisions stratégiques de peur d'une réaction trop hâtive.",
    situational_example: "Lorsqu'on vous demande une direction claire sans données complètes, vous tranchez immédiatement pour 'libérer' le dossier, au risque de devoir tout recommencer le lendemain.",
    template: "Tu te perçois comme mesuré et analytique, mais tes choix sous contrainte montrent une rapidité qui confine à l'impulsivité. Cet écart crée des décisions efficaces sur l'instant, mais extrêmement coûteuses en réajustements mentaux et opérationnels.",
    lever: "Avant de valider toute décision rapide, formulez une hypothèse écrite en une seule phrase : 'Si je fais X, alors Y arrivera'. Si vous ne pouvez pas l'écrire, ne décidez pas."
  },
  D1_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "L'Hésitation invisible",
    consequences: [
      "Occasions manquées par excès de prudence face à l'incertitude.",
      "Frustration interne intense car vous saviez quoi faire mais n'avez pas osé.",
      "Dépendance aux conditions idéales qui se présentent rarement."
    ],
    impact_on_others: "Les autres peuvent ressentir un manque de leadership ou de direction claire de votre part, ce qui les force à prendre des décisions à votre place pour ne pas bloquer les projets.",
    situational_example: "Face à une demande de réponse en 60 secondes, vous préférez dire que vous reviendrez plus tard, perdant ainsi l'élan et l'opportunité de marquer votre influence.",
    template: "Tu te définis comme quelqu'un de décisif et moteur, mais face à la réalité du terrain, tu temporises massivement. Cela donne l’impression d’un potentiel bridé par une attente de certitude qui n'arrive jamais.",
    lever: "Fixez un délai maximum non négociable de 24 heures pour toute décision en attente. Une fois le délai passé, le choix par défaut est 'Action'."
  },
  D2_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "L'Inconfort d'action",
    consequences: [
      "Un inconfort interne permanent car vous agissez contre votre besoin de sécurité.",
      "Fatigue décisionnelle rapide due au coût cognitif de l'incertitude.",
      "Doute a posteriori qui paralyse vos prochaines initiatives."
    ],
    impact_on_others: "Votre entourage voit vos résultats mais ressent votre tension nerveuse, ce qui peut créer un climat de travail stressant sans qu'ils en comprennent la source.",
    situational_example: "Vous lancez une action test pour apprendre vite, mais vous passez ensuite des heures à cogiter sur les risques potentiels que vous aviez pourtant acceptés.",
    template: "Tu te décris comme quelqu'un ayant besoin de certitude absolue, mais tu avances pourtant sans toutes les informations. L’écart se joue dans l’après-coup : vous payez votre audace par un stress interne invisible pour les autres.",
    lever: "Nommez explicitement les trois incertitudes majeures avant d'agir. Une fois nommées, elles deviennent des paramètres techniques et non plus des angoisses."
  },
  D2_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "L'Incertitude sous-estimée",
    consequences: [
      "Retards répétés dans l'exécution des projets par besoin de validation.",
      "Recherche excessive de données supplémentaires qui n'apportent plus de valeur.",
      "Sensation de stagnation alors que les opportunités défilent."
    ],
    impact_on_others: "On peut vous trouver trop scolaire ou trop prudent, manquant de 'flair' ou de capacité à improviser quand les plans changent.",
    situational_example: "Face à des retours contradictoires sur un projet flou, vous ralentissez au lieu de pivoter, espérant que le brouillard se lèvera tout seul.",
    template: "Tu te penses tolérant à l’incertitude, mais tes choix révèlent un besoin élevé de sécurité qui te paralyse au moment critique. L’angle mort est le coût caché de votre attente.",
    lever: "Décidez avec seulement deux critères minimum. Si ces deux critères sont remplis, lancez-vous, peu importe les zones d'ombre restantes."
  },
  D3_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "Le Sur-contrôle inconscient",
    consequences: [
      "Tendance au micro-management qui dégrade l'autonomie des autres.",
      "Lenteur collective car tout doit passer par votre filtre de validation.",
      "Tension relationnelle avec les profils autonomes qui se sentent bridés."
    ],
    impact_on_others: "Votre équipe finit par ne plus prendre d'initiative, attendant systématiquement vos instructions précises, ce qui finit par vous épuiser car vous portez tout sur vos épaules.",
    situational_example: "Vous déléguez une tâche sous pression mais vous contrôlez chaque étape du processus au lieu de simplement vérifier le résultat final.",
    template: "Tu te perçois comme quelqu'un d'adaptable et souple, mais tes choix montrent un contrôle renforcé dès que l'enjeu monte. Ce décalage étouffe la créativité autour de vous.",
    lever: "Déléguez l'objectif final et interdisez-vous de demander 'comment' le travail est fait pendant 48 heures. Focalisez-vous uniquement sur le 'quoi'."
  },
  D3_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "L'Improvisation subie",
    consequences: [
      "Décisions incohérentes entre le matin et le soir.",
      "Fatigue mentale due à la reconstruction permanente de votre cadre.",
      "Manque de lisibilité pour vos collaborateurs qui ne savent plus sur quel pied danser."
    ],
    impact_on_others: "On peut vous trouver brouillon ou peu fiable sur le long terme, même si vous êtes brillant dans l'instant.",
    situational_example: "Vous aviez un plan complet mais vous l'abandonnez totalement à la première interruption pour traiter une urgence mineure.",
    template: "Tu te définis comme quelqu'un d'organisé et structuré, mais la pression révèle une improvisation constante. Vous naviguez à vue en pensant tenir un cap.",
    lever: "Définissez un seul jalon non négociable par projet. Peu importe ce qui arrive, ce jalon doit rester fixe et structurer tout le reste."
  },
  D4_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "L'Affirmation surprise",
    consequences: [
      "Surprises relationnelles fréquentes de la part de vos proches ou collègues.",
      "Incompréhensions sur vos intentions réelles.",
      "Image perçue beaucoup plus dure ou autoritaire que ce que vous ressentez intérieurement."
    ],
    impact_on_others: "Les autres peuvent se sentir brusqués par vos prises de position nettes alors qu'ils vous pensaient dans le consensus.",
    situational_example: "Vous répondez fermement à une remarque injuste en public, là où vous pensiez d'habitude être celui qui arrondit les angles.",
    template: "Tu te décris comme quelqu'un de conciliant et attentif aux autres, mais tes choix montrent une affirmation nette et parfois tranchante. Votre impact relationnel est plus fort que vous ne l'imaginez.",
    lever: "Annoncez systématiquement votre intention positive avant de donner votre position. Exemple : 'Pour que le projet avance, voici ma décision...'"
  },
  D4_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "L'Autonomie diluée",
    consequences: [
      "Décisions ralenties par besoin d'obtenir l'accord de tout le monde.",
      "Dilution de votre propre responsabilité dans celle du groupe.",
      "Fatigue émotionnelle à force de vouloir maintenir l'harmonie à tout prix."
    ],
    impact_on_others: "On peut avoir l'impression que vous n'assumez pas vos idées ou que vous cherchez toujours à vous couvrir derrière l'avis des autres.",
    situational_example: "Vous avez une opportunité qui vous tente mais vous cherchez à convaincre tout votre entourage avant de dire oui.",
    template: "Tu te penses indépendant et autonome, mais tes choix montrent une recherche permanente d'adhésion. Le coût principal de ce fonctionnement est votre propre vitesse de croissance.",
    lever: "Prenez une décision seul, sans en parler à personne, et appliquez-la. Expliquez votre choix seulement une fois qu'il est devenu une réalité."
  },
  D5_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "La Réactivité à chaud",
    consequences: [
      "Paroles ou décisions regrettées quelques heures après l'émotion.",
      "Tensions inutiles créées par une réponse trop directe sous pression.",
      "Baisse de votre crédibilité face à des interlocuteurs plus froids."
    ],
    impact_on_others: "Les autres peuvent avoir 'peur' de vos réactions sous stress et préfèrent vous cacher certaines informations pour éviter une explosion.",
    situational_example: "Face à un paramètre faux découvert après coup, vous vous tendez et craignez le jugement au lieu de simplement corriger.",
    template: "Tu te perçois comme quelqu'un de posé et régulé, mais la réalité montre une réactivité émotionnelle vive. Votre calme apparent cache une cocotte-minute prête à s'activer.",
    lever: "Imposez-vous un délai de 10 minutes avant toute réponse à un message ou une situation qui vous fait réagir physiquement (coeur qui bat, tension)."
  },
  D5_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "L'Encaissement silencieux",
    consequences: [
      "Accumulation de frustrations qui finissent par exploser tardivement.",
      "Fatigue émotionnelle due à l'effort constant de masquer votre ressenti.",
      "Réactions tardives qui arrivent quand le sujet est déjà clos pour les autres."
    ],
    impact_on_others: "On peut vous trouver froid, distant ou indifférent, alors que vous êtes en train de gérer une tempête intérieure pour ne pas déranger.",
    situational_example: "Vous vous taisez face à une remarque injuste et attendez des heures, voire des jours, pour oser revenir sur le sujet en privé.",
    template: "Tu te définis comme quelqu'un de direct et franc, mais tes choix montrent une mise à distance émotionnelle massive. Vous encaissez en silence en pensant que cela vous protège.",
    lever: "Exprimez l'impact émotionnel immédiat en une phrase courte, sans chercher de solution. Exemple : 'Cette remarque me dérange, parlons-en dans 5 minutes'."
  },
  D6_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "La Dispersion adaptative",
    consequences: [
      "Dispersion de votre énergie sur trop de pistes à la fois.",
      "Perte de cap sur vos objectifs à long terme par envie de tout tester.",
      "Incohérences perçues par vos partenaires qui ne comprennent plus votre stratégie."
    ],
    impact_on_others: "On peut avoir du mal à vous suivre ou à vous faire confiance sur un projet long car vous changez d'avis dès qu'une nouvelle idée apparaît.",
    situational_example: "Un imprévu remet en cause votre plan et vous pivotez si vite que vous abandonnez des acquis qui étaient pourtant solides.",
    template: "Tu te vois comme quelqu'un de constant et stable, mais tes choix montrent une adaptation ultra-rapide qui confine à la dispersion. Votre agilité est votre piège.",
    lever: "Fixez une seule règle immuable par projet ou par semaine. Tout peut changer sauf cette règle. Cela forcera votre flexibilité à s'exercer dans un cadre stable."
  },
  D6_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "La Rigidité protectrice",
    consequences: [
      "Rigidité face au changement même quand celui-ci est nécessaire.",
      "Opportunités manquées par attachement excessif à votre plan initial.",
      "Frustration croissante quand les choses ne se passent pas comme prévu."
    ],
    impact_on_others: "Les autres peuvent vous trouver têtu ou déconnecté des réalités changeantes du terrain, ce qui les pousse à vous contourner pour avancer.",
    situational_example: "Le lendemain d'un feedback, un collègue présente une idée proche de la vôtre, et vous restez figé au lieu de repositionner votre offre.",
    template: "Tu te penses flexible et ouvert au changement, mais la réalité révèle une stabilité forte, presque rigide, sous pression. Vous vous accrochez à vos certitudes par peur de perdre le contrôle.",
    lever: "Forcez-vous à tester une alternative 'absurde' ou à faible coût dès que vous sentez que vous vous accrochez trop à votre idée. Juste pour voir."
  }
};
