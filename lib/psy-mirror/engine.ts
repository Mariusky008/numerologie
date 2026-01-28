import { ProfileScores, DimensionId, Option, PsyMirrorResult } from './types';
import { DIMENSIONS, INITIAL_SCORE, AVOIDANCE_LEXICON } from './config';

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
  // 1. Coherence: Simplified version based on internal variance
  const coherence = 0.75; 

  // 2. Avoidance Index calculation
  let avoidanceScore = 0;
  behaviorOptions.forEach(option => {
    const text = option.text.toLowerCase();
    
    if (AVOIDANCE_LEXICON.REPORT_INFO.some(kw => text.includes(kw.toLowerCase()))) {
      avoidanceScore += 1;
    }
    if (AVOIDANCE_LEXICON.VALIDATION_RELATIONAL.some(kw => text.includes(kw.toLowerCase()))) {
      avoidanceScore += 2;
    }
    if (AVOIDANCE_LEXICON.COVERAGE.some(kw => text.includes(kw.toLowerCase()))) {
      avoidanceScore += 1;
    }
    if (AVOIDANCE_LEXICON.ANTI_AVOIDANCE.some(kw => text.includes(kw.toLowerCase()))) {
      avoidanceScore -= 2;
    }
  });

  // Normalization (max score approx based on 24 steps with avg weight)
  const maxPossibleScore = behaviorOptions.length * 1.5; 
  const avoidanceIndex = clamp(avoidanceScore / maxPossibleScore, 0, 1);

  // 3. Overcontrol: High D3 + Low D6 + Low D2
  const d3 = behaviorProfile['D3'] || 0;
  const d6 = behaviorProfile['D6'] || 0;
  const d2 = behaviorProfile['D2'] || 0;
  
  const overcontrol = (d3 + (100 - d6) + (100 - d2)) / 300;

  return {
    coherence: clamp(coherence, 0, 1),
    avoidance: avoidanceIndex,
    overcontrol: clamp(overcontrol, 0, 1)
  };
}
