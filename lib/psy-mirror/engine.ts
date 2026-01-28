import { ProfileScores, DimensionId, Option, PsyMirrorResult } from './types';
import { DIMENSIONS, INITIAL_SCORE } from './config';

/**
 * Clamps a number between min and max
 */
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

/**
 * Calculates a profile score based on a set of chosen options
 */
export function calculateProfile(options: Option[]): ProfileScores {
  const scores: ProfileScores = {};
  
  // Initialize each dimension to 50
  DIMENSIONS.forEach(dim => {
    scores[dim.id] = INITIAL_SCORE;
  });

  // Apply weights from each chosen option
  options.forEach(option => {
    Object.entries(option.weights).forEach(([dimId, weight]) => {
      if (scores[dimId] !== undefined) {
        scores[dimId] += weight;
      }
    });
  });

  // Clamp results between 0 and 100
  Object.keys(scores).forEach(dimId => {
    scores[dimId] = clamp(scores[dimId], 0, 100);
  });

  return scores;
}

/**
 * Calculates gaps between self-perception and behavior
 */
export function calculateGaps(selfProfile: ProfileScores, behaviorProfile: ProfileScores) {
  const gaps: Record<string, number> = {};
  let primaryGap: DimensionId = 'D1';
  let secondaryGap: DimensionId = 'D1';
  let maxAbsGap = -1;
  let secondMaxAbsGap = -1;

  DIMENSIONS.forEach(dim => {
    const gap = behaviorProfile[dim.id] - selfProfile[dim.id];
    const absGap = Math.abs(gap);
    gaps[dim.id] = gap;

    if (absGap > maxAbsGap) {
      secondMaxAbsGap = maxAbsGap;
      secondaryGap = primaryGap;
      maxAbsGap = absGap;
      primaryGap = dim.id as DimensionId;
    } else if (absGap > secondMaxAbsGap) {
      secondMaxAbsGap = absGap;
      secondaryGap = dim.id as DimensionId;
    }
  });

  return { gaps, primaryGap, secondaryGap };
}

/**
 * Calculates derived indices for the report
 */
export function calculateIndices(behaviorOptions: Option[], behaviorProfile: ProfileScores) {
  // 1. Coherence: Simplified version based on internal variance of weights 
  // In a real impl, we'd check if choices in similar scenarios are consistent
  const coherence = 0.75; // Placeholder for now

  // 2. Avoidance: Frequency of "delay/validate/wait" options
  // This would need specific marking on the Option type or keyword matching
  const avoidance = 0.20; // Placeholder

  // 3. Overcontrol: High D3 + Low D6 + Low D2 (meaning high need for certainty)
  const d3 = behaviorProfile['D3'] || 0;
  const d6 = behaviorProfile['D6'] || 0;
  const d2 = behaviorProfile['D2'] || 0;
  
  const overcontrol = (d3 + (100 - d6) + (100 - d2)) / 300;

  return {
    coherence: clamp(coherence, 0, 1),
    avoidance: clamp(avoidance, 0, 1),
    overcontrol: clamp(overcontrol, 0, 1)
  };
}
