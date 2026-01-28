import { ProfileScores, DimensionId, PsyMirrorResult } from './types';
import { DIMENSIONS, GAP_THRESHOLDS } from './config';
import { BLIND_SPOT_LIBRARY } from './blind-spots';

const PREMIUM_TEMPLATES: Record<string, Record<string, string>> = {
  D1: {
    "0-33": "Tu as tendance à sécuriser avant d’agir. Cela réduit les erreurs, mais peut ralentir l’élan. À surveiller : l’accumulation d’options non tranchées. Ajustement clé : définir un seuil minimal d’info avant décision.",
    "34-66": "Tu alternes analyse et action selon le contexte. Forces : adaptabilité. Ajustement clé : expliciter le “point de non-retour”.",
    "67-100": "Tu avances vite et ajustes en chemin. À surveiller : les coûts de correction. Ajustement clé : une vérification courte (1 question clé) avant d’agir."
  },
  D2: {
    "0-33": "L’ambiguïté te coûte de l’énergie. Risque : immobilisation. Ajustement : décider avec des hypothèses explicites.",
    "34-66": "Tu supportes l’incertain si le cadre est clair. Ajustement : formaliser l’essai (objectif court + critère).",
    "67-100": "Tu avances même sans visibilité complète. Ajustement : baliser des points de contrôle."
  },
  D3: {
    "0-33": "Tu laisses de la place à l’imprévu. Ajustement : clarifier un minimum de structure.",
    "34-66": "Planifier sans rigidité. Ajustement : prioriser 1–2 jalons clés.",
    "67-100": "Tu sécurises par la structure. Risque : sur-contrôle. Ajustement : déléguer avec critères, pas méthodes."
  },
  D4: {
    "0-33": "L’harmonie compte. Risque : décisions retardées. Ajustement : décider d’abord, expliquer ensuite.",
    "34-66": "Équilibre relation/position. Ajustement : annoncer la décision + écouter les retours.",
    "67-100": "Tu assumes ta position. Ajustement : vérifier l’impact relationnel clé."
  },
  D5: {
    "0-33": "Tu temporises sous pression. Ajustement : conserver des pauses actives.",
    "34-66": "Réactivité contextuelle. Ajustement : nommer l’émotion avant d’agir.",
    "67-100": "Réactivité élevée. Risque : décisions à chaud. Ajustement : délai court + reformulation."
  },
  D6: {
    "0-33": "Stabilité forte. Risque : difficulté à pivoter. Ajustement : tester une alternative à faible coût.",
    "34-66": "Adaptation mesurée. Ajustement : décider un pivot-signal.",
    "67-100": "Pivot rapide. Risque : dispersion. Ajustement : fixer un cap invariant."
  }
};

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
  const mirrorSentence = generateMirrorSentence(primaryGap, selfProfile[primaryGap], behaviorProfile[primaryGap]);

  // 2. Select Blind Spot
  const blindSpotData = selectBlindSpot(gaps, primaryGap);
  const formattedBlindSpot = blindSpotData.template.replace('{{scenario_ref}}', 'vos choix réels');

  // 3. Generate Dimension Insights
  const dimensionInsights = DIMENSIONS.map(dim => {
    const score = behaviorProfile[dim.id];
    const range = score < 34 ? "0-33" : score < 67 ? "34-66" : "67-100";
    return {
      id: dim.id,
      name: dim.name,
      text: PREMIUM_TEMPLATES[dim.id][range]
    };
  });

  // 3. Generate Avoidance Label
  const avoidanceLabel = indices.avoidance <= 0.3 ? "faible évitement" : indices.avoidance <= 0.6 ? "évitement contextuel" : "évitement marqué";

  // 4. Generate Report Sections
  const report_sections = [
    {
      id: 'summary',
      html: `<h3>Synthèse 60 secondes</h3>
             <ul>
               <li><strong>Fonctionnement dominant :</strong> ${dimensionInsights.find(i => i.id === primaryGap)?.text.split('.')[0]}.</li>
               <li><strong>Index d'évitement :</strong> ${avoidanceLabel} (${Math.round(indices.avoidance * 100)}%).</li>
               <li><strong>Miroir central :</strong> ${mirrorSentence}</li>
             </ul>`
    },
    {
      id: 'dimensions',
      html: `<h3>Vos 6 dimensions comportementales</h3>
             <div class="grid gap-4">
               ${dimensionInsights.map(di => `
                 <div class="p-4 border rounded">
                   <h4 class="font-bold">${di.name}</h4>
                   <p class="text-sm">${di.text}</p>
                 </div>
               `).join('')}
             </div>`
    }
  ];

  // 5. Generate Video Script
  const video_script = `
Ouverture (15s): Bienvenue dans votre miroir psychologique. Ce que vous allez voir aujourd'hui n'est pas un test, mais le reflet de vos décisions.
Perception: Vous vous percevez comme quelqu'un de ${getDimensionLabel(primaryGap, selfProfile[primaryGap])}.
Réalité: Pourtant, face aux situations concrètes, vos choix révèlent une tendance ${getDimensionLabel(primaryGap, behaviorProfile[primaryGap])}.
L'écart: C'est ici que se trouve votre miroir central sur la dimension ${getDimensionName(primaryGap)}.
Angle mort: Cela crée un angle mort : vous risquez de ${indices.overcontrol > 0.6 ? 'trop verrouiller vos processus' : 'perdre en clarté par besoin de validation'}.
Action: Votre levier prioritaire cette semaine : ${generateLever(primaryGap, behaviorProfile[primaryGap])}.
  `.trim();

  return {
    insights: {
      mirror_sentence: mirrorSentence,
      blind_spot: formattedBlindSpot,
      lever: blindSpotData.lever
    },
    report_sections,
    video_script
  };
}

/**
 * Selects the best blind spot from the library based on gaps
 */
function selectBlindSpot(gaps: Record<string, number>, primaryGap: DimensionId) {
  const gapValue = gaps[primaryGap];
  const suffix = gapValue > 0 ? '_positive' : '_negative';
  const key = `${primaryGap}${suffix}`;
  
  const spot = BLIND_SPOT_LIBRARY[key];
  if (spot && Math.abs(gapValue) >= 15) {
    return spot;
  }

  // Fallback if no significant gap on primary
  return {
    label: "Profil aligné",
    template: "Votre comportement est globalement aligné avec votre perception sur cette dimension.",
    lever: "Continuez à observer vos réactions pour affiner votre conscience situationnelle.",
    consequences: []
  };
}

/**
 * Helpers
 */
function getDimensionName(id: DimensionId): string {
  return DIMENSIONS.find(d => d.id === id)?.name || id;
}

function getDimensionLabel(id: DimensionId, score: number): string {
  if (score < 34) return "prudent(e) et réservé(e)";
  if (score < 67) return "équilibré(e) et adaptable";
  return "rapide et affirmé(e)";
}

function generateMirrorSentence(dimId: DimensionId, selfScore: number, behaviorScore: number): string {
  const name = getDimensionName(dimId);
  const selfTrait = getDimensionLabel(dimId, selfScore);
  const behaviorTrait = getDimensionLabel(dimId, behaviorScore);
  
  if (Math.abs(behaviorScore - selfScore) < GAP_THRESHOLDS.ALIGNED) {
    return `Votre perception de votre dimension ${name} est parfaitement alignée avec vos choix réels.`;
  }
  
  return `Tu te décris comme ${selfTrait}, mais dans tes choix sous contrainte, tu montres une tendance ${behaviorTrait}.`;
}

function generateLever(dimId: DimensionId, score: number): string {
  const levers: Record<DimensionId, string> = {
    D1: "Définissez un temps limite de 2 minutes pour vos 3 prochaines décisions mineures.",
    D2: "Agissez sur une tâche dès que vous avez 70% des informations nécessaires.",
    D3: "Déléguez une tâche cette semaine en fixant le résultat attendu, pas la méthode.",
    D4: "Prenez une décision sans demander d'avis extérieur et observez votre ressenti.",
    D5: "Prenez 3 respirations profondes avant de répondre à un message qui vous tend.",
    D6: "Changez volontairement une habitude mineure de votre routine demain."
  };
  return levers[dimId];
}
