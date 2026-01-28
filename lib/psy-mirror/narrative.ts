import { ProfileScores, DimensionId, PsyMirrorResult } from './types';
import { DIMENSIONS, GAP_THRESHOLDS } from './config';

/**
 * Generates the personalized report and video script
 */
export function generateNarrative(
  selfProfile: ProfileScores,
  behaviorProfile: ProfileScores,
  gaps: Record<string, number>,
  primaryGap: DimensionId,
  indices: { coherence: number; avoidance: number; overcontrol: number }
) {
  // 1. Generate Mirror Sentence
  const mirrorSentence = generateMirrorSentence(primaryGap, gaps[primaryGap]);

  // 2. Generate Blind Spot
  const blindSpot = generateBlindSpot(behaviorProfile, gaps, indices);

  // 3. Generate Lever
  const lever = generateLever(primaryGap, behaviorProfile[primaryGap]);

  // 4. Generate Report Sections
  const report_sections = [
    {
      id: 'summary',
      html: `<h3>Synthèse 60 secondes</h3><ul><li>Votre fonctionnement dominant est basé sur une ${getDimensionLabel(primaryGap, behaviorProfile[primaryGap])}.</li><li>L'écart majeur se situe sur la dimension ${getDimensionName(primaryGap)}.</li></ul>`
    },
    {
      id: 'mirror',
      html: `<h3>Le Miroir</h3><p>${mirrorSentence}</p>`
    }
  ];

  // 5. Generate Video Script
  const video_script = `Ouverture: Bienvenue dans votre analyse. Ce que vous allez voir aujourd'hui...
  Auto-perception: Vous vous voyez comme quelqu'un de ${getDimensionLabel(primaryGap, selfProfile[primaryGap])}.
  Comportement: Pourtant, face aux scénarios, vous agissez de manière ${getDimensionLabel(primaryGap, behaviorProfile[primaryGap])}.
  L'écart: C'est votre miroir central sur la ${getDimensionName(primaryGap)}.
  Angle mort: Cela crée un angle mort : ${blindSpot}.
  Action: Je vous propose un levier : ${lever}.`;

  return {
    insights: {
      mirror_sentence: mirrorSentence,
      blind_spot: blindSpot,
      lever: lever
    },
    report_sections,
    video_script
  };
}

/**
 * Helpers for localized labels and names
 */
function getDimensionName(id: DimensionId): string {
  return DIMENSIONS.find(d => d.id === id)?.name || id;
}

function getDimensionLabel(id: DimensionId, score: number): string {
  if (score < 34) return "prudente / réservée";
  if (score < 67) return "équilibrée / adaptable";
  return "rapide / affirmée";
}

function generateMirrorSentence(dimId: DimensionId, gap: number): string {
  const name = getDimensionName(dimId);
  const intensity = Math.abs(gap) > GAP_THRESHOLDS.SIGNIFICANT ? "marqué" : "léger";
  return `Il existe un écart ${intensity} sur votre dimension ${name} entre votre perception et vos choix réels.`;
}

function generateBlindSpot(behavior: ProfileScores, gaps: Record<string, number>, indices: any): string {
  return "Votre tendance à privilégier la sécurité immédiate peut masquer des opportunités de croissance à long terme.";
}

function generateLever(dimId: DimensionId, score: number): string {
  return "Prenez 5 secondes de pause avant de valider toute décision importante cette semaine.";
}
