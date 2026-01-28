export type DimensionId = 'D1' | 'D2' | 'D3' | 'D4' | 'D5' | 'D6';

export interface Dimension {
  id: DimensionId;
  name: string;
  min: number;
  max: number;
}

export interface OptionWeights {
  [key: string]: number; // e.g., "D1": -6
}

export interface Option {
  key: string;
  text: string;
  weights: OptionWeights;
}

export interface QuizItem {
  item_id: string;
  prompt: string;
  options: Option[];
}

export interface ScenarioStep {
  step_id: string;
  context: string;
  options: Option[];
}

export interface Scenario {
  scenario_id: string;
  title: string;
  constraint: string;
  steps: ScenarioStep[];
}

export interface ProfileScores {
  [key: string]: number; // DimensionId: score (0-100)
}

export interface PsyMirrorResult {
  user_meta: {
    lang: string;
    session_id: string;
  };
  self_profile: ProfileScores;
  behavior_profile: ProfileScores;
  gaps: {
    [key: string]: number; // DimensionId: gap value
  };
  primary_gap: DimensionId;
  secondary_gap: DimensionId;
  indices: {
    coherence: number;
    avoidance: number;
    overcontrol: number;
  };
  reflex_results?: {
    attention: { accuracy: number; avgSpeed: number; degradation: number };
    breaking_point: { inhibitionError: number; omissionRate: number; peakSpeed: number };
    risk_balloon: { avgPumps: number; pops: number; riskScore: number };
  };
  insights: {
    mirror_sentence: string;
    mirror_full: string;
    blind_spot: string;
    blind_spot_label: string;
    lever: string;
    dimension_insights: {
      id: DimensionId;
      name: string;
      text: string;
    }[];
    plan_7_days: {
      day: number;
      action: string;
    }[];
    reflex_insights: {
      title: string;
      observation: string;
      exercise: string;
    }[];
  };
  report_sections: {
    id: string;
    title: string;
    html: string;
  }[];
  video_script: string;
  final_phrase: string;
}
