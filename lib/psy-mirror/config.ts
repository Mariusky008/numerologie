import { Dimension } from './types';

export const DIMENSIONS: Dimension[] = [
  { id: 'D1', name: 'Décision', min: 0, max: 100 },
  { id: 'D2', name: 'Incertitude', min: 0, max: 100 },
  { id: 'D3', name: 'Contrôle', min: 0, max: 100 },
  { id: 'D4', name: 'Orientation sociale', min: 0, max: 100 },
  { id: 'D5', name: 'Stress émotionnel', min: 0, max: 100 },
  { id: 'D6', name: 'Flexibilité', min: 0, max: 100 }
];

export const GAP_THRESHOLDS = {
  ALIGNED: 7,
  SLIGHT: 14,
  SIGNIFICANT: 24,
  MAJOR: 25
};

export const AVOIDANCE_LEXICON = {
  REPORT_INFO: [
    'reporter', 'attendre', 'plus tard', 'remettre', 'différer', 'revenir plus tard', 
    'laisser décanter', 'temporiser', 'repousser', 'ralentir',
    'besoin de plus d’infos', 'manque d’informations', 'vérifier encore', 're-check', 
    'clarifier avant', 'préciser', 'données supplémentaires'
  ],
  VALIDATION_RELATIONAL: [
    'valider', 'avis extérieur', 'demander l’accord', 'arbitrage', 'consensus', 
    'que dit le groupe', 'convaincre avant', 'être rassuré',
    'éviter le conflit', 'ne pas m’exposer', 'laisser passer', 'se taire', 
    'ne pas répondre', 'je préfère éviter', 'ça se tassera'
  ],
  COVERAGE: [
    'cadre', 'process', 'règles', 'formaliser', 'par écrit', 'documenter avant', 'sécuriser'
  ],
  ANTI_AVOIDANCE: [
    'trancher', 'décider', 'assumer', 'avancer', 'agir maintenant', 'prendre position', 
    'clarifier rapidement', 'dire non', 'annoncer'
  ]
};

export const INITIAL_SCORE = 50;
