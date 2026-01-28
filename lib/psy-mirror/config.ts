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

export const INITIAL_SCORE = 50;
