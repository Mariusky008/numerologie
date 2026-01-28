import { DimensionId } from './types';

export interface BlindSpot {
  trigger: string;
  label: string;
  consequences: string[];
  template: string;
  lever: string;
}

export const BLIND_SPOT_LIBRARY: Record<string, BlindSpot> = {
  D1_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "Impulsion sous-estimée",
    consequences: ["Décisions prises sans alignement interne", "Sentiment d’avoir agi trop vite après coup", "Corrections fréquentes"],
    template: "Tu te perçois comme mesuré, mais dans {{scenario_ref}}, tu as tranché rapidement. Cet écart peut créer des décisions efficaces sur le moment, mais coûteuses en réajustements.",
    lever: "Avant de décider vite, formuler une hypothèse écrite en 1 phrase."
  },
  D1_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "Hésitation invisible",
    consequences: ["Occasions manquées", "Frustration interne", "Dépendance aux conditions idéales"],
    template: "Tu te définis comme décisif, mais face à {{scenario_ref}}, tu as reporté. Cela peut donner l’impression d’un potentiel bridé par l’attente.",
    lever: "Fixer un délai maximum non négociable (ex : 24h)."
  },
  D2_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "Inconfort d'action",
    consequences: ["Inconfort interne", "Fatigue décisionnelle", "Doute a posteriori"],
    template: "Tu te décris comme en recherche de certitude, mais dans {{scenario_ref}}, tu as avancé sans toutes les infos. L’écart se joue surtout dans l’après-coup.",
    lever: "Nommer explicitement ce qui est incertain avant d’agir."
  },
  D2_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "Incertitude sous-estimée",
    consequences: ["Retards répétés", "Besoin excessif de validation", "Sensation de stagnation"],
    template: "Tu te penses à l’aise avec l’incertitude, mais {{scenario_ref}} montre un besoin élevé de sécurité. L’angle mort est le coût caché de l’attente.",
    lever: "Décider avec 2 critères minimum, pas plus."
  },
  D3_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "Sur-contrôle inconscient",
    consequences: ["Micro-management", "Lenteur collective", "Tension relationnelle"],
    template: "Tu te perçois adaptable, mais {{scenario_ref}} montre un contrôle renforcé. Ce décalage peut limiter la vitesse et l’autonomie autour de toi.",
    lever: "Déléguer l’objectif, pas la méthode."
  },
  D3_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "Improvisation subie",
    consequences: ["Décisions incohérentes", "Fatigue mentale", "Manque de lisibilité"],
    template: "Tu te définis comme organisé, mais {{scenario_ref}} révèle une improvisation sous pression.",
    lever: "Définir 1 jalon non négociable par projet."
  },
  D4_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "Affirmation surprise",
    consequences: ["Surprises relationnelles", "Incompréhensions", "Image perçue dure"],
    template: "Tu te décris attentif aux autres, mais {{scenario_ref}} montre une affirmation nette. L’angle mort est surtout relationnel.",
    lever: "Annoncer l’intention avant la position."
  },
  D4_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "Autonomie diluée",
    consequences: ["Décisions ralenties", "Dilution de responsabilité", "Fatigue émotionnelle"],
    template: "Tu te penses indépendant, mais {{scenario_ref}} montre une recherche d’adhésion. Le coût principal est le temps décisionnel.",
    lever: "Décider seul, expliquer ensuite."
  },
  D5_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "Réactivité à chaud",
    consequences: ["Paroles regrettées", "Tensions inutiles", "Baisse de crédibilité"],
    template: "Tu te perçois comme posé, mais {{scenario_ref}} révèle une réactivité sous pression.",
    lever: "Délai de 10 minutes avant toute réponse sensible."
  },
  D5_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "Encaissement silencieux",
    consequences: ["Accumulation", "Fatigue émotionnelle", "Réactions tardives"],
    template: "Tu te définis comme direct, mais {{scenario_ref}} montre une mise à distance émotionnelle.",
    lever: "Exprimer l’impact avant la solution."
  },
  D6_positive: {
    trigger: "abs_gap >= 15 && gap > 0",
    label: "Dispersion adaptative",
    consequences: ["Dispersion", "Perte de cap", "Incohérences perçues"],
    template: "Tu te vois constant, mais {{scenario_ref}} montre une adaptation rapide. Le risque est la dilution du cap.",
    lever: "Fixer 1 règle immuable par projet."
  },
  D6_negative: {
    trigger: "abs_gap >= 15 && gap < 0",
    label: "Rigidité protectrice",
    consequences: ["Rigidité", "Opportunités manquées", "Frustration"],
    template: "Tu te penses flexible, mais {{scenario_ref}} révèle une stabilité forte sous pression.",
    lever: "Tester une alternative à faible coût."
  }
};
