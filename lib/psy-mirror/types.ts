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
  insights: {
    mirror_sentence: string;
    blind_spot: string;
    lever: string;
  };
  report_sections: {
    id: string;
    html: string;
  }[];
  video_script: string;
}
