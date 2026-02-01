'use client';

import React from 'react';
import UnifiedMiroirReport from '@/components/report/UnifiedMiroirReport';

const MOCK_USER = {
  firstName: "Jean",
  lastName: "Dupont",
  birthDate: "1988-05-15",
  birthTime: "14:30",
  birthPlace: "Paris",
  focus: "Pro"
};

const MOCK_NUMEROLOGY = {
  lifePath: 1,
  expression: 5,
  soulUrge: 3,
  personality: 2,
  personalYear: 8,
  details: {
    lifePath: { value: 1, title: "Le Leader", description: "Un potentiel de création et d'indépendance massif." },
    expression: { value: 5, title: "Le Voyageur", description: "Un besoin de liberté et d'adaptabilité constant." },
    soulUrge: { value: 3, title: "L'Artiste", description: "Une soif d'expression et de communication profonde." },
    personality: { value: 2, title: "Le Médiateur", description: "Une apparence douce et diplomate." }
  },
  professionalAxes: ["Direction", "Innovation", "Communication"],
  inclusionGrid: [0, 1, 2, 1, 0, 3, 0, 1, 0, 1],
  missingNumbers: [1, 5, 7],
  excessNumbers: [6],
  subconsciousSelf: 5,
  bridgeNumber: 2,
  challenges: {
    minor1: 1,
    minor2: 2,
    major: 3,
    major2: 1
  },
  cycles: {
    cycle1: 5,
    cycle2: 1,
    cycle3: 8,
    cycle4: 9
  },
  deepChallenges: [
    { title: "Défi d'Individualité", desc: "Apprendre à s'affirmer sans écraser." }
  ],
  astroResonance: { birthPlaceVibration: 6 },
  careerForecast: [],
  transits: [],
  planesOfExpression: { physical: 5, mental: 8, emotional: 4, intuitive: 2 },
  advancedProfile: { core: "Leader Visionnaire" }
};

const MOCK_PSY_RESULT = {
  user_meta: { lang: 'fr', session_id: 'demo-123' },
  behavior_profile: { D1: 85, D2: 34, D3: 62, D4: 45, D5: 78, D6: 51 },
  self_profile: { D1: 90, D2: 20, D3: 70, D4: 30, D5: 85, D6: 40 },
  gaps: { D1: 5, D2: 14, D3: 8, D4: 15, D5: 7, D6: 11 },
  primary_gap: 'D2',
  secondary_gap: 'D4',
  indices: { coherence: 72, avoidance: 15, overcontrol: 45 },
  insights: {
    mirror_sentence: "Tu es un volcan sous une couche de glace, Jean.",
    mirror_full: "Ton potentiel de naissance (1) est celui d'un pionnier, d'un leader capable de tracer sa propre route. Cependant, tes réflexes biologiques montrent une hyper-vigilance constante qui bride cette énergie.\n\nTes réponses psychologiques confirment que tu privilégies la sécurité (D2) alors que ton âme appelle l'expansion. Cet écart de 34% entre ton 'Code Source' et ta réalité actuelle est la raison pour laquelle tu ressens cette fatigue mentale.",
    blind_spot: "Tu penses être flexible, mais ton corps refuse le risque imprévu.",
    blind_spot_label: "L'Hyper-Contrôle Invisible",
    lever: "Déléguer les détails pour libérer ta vision stratégique.",
    dimension_insights: [
      { id: 'D1', name: "Force d'Initiative", text: "Ton score de 85/100 montre une capacité naturelle à lancer des projets, mais une difficulté à les stabiliser sous pression." },
      { id: 'D2', name: "Gestion de l'Inconnu", text: "Avec 34/100, l'imprévu est ton plus grand consommateur d'énergie. Tu t'épuises à vouloir tout anticiper." }
    ],
    plan_7_days: [
      { day: 1, action: "Déléguer une décision mineure sans vérifier le résultat." },
      { day: 2, action: "Pratiquer 5 min de respiration cohérente avant ton premier mail." },
      { day: 3, action: "Identifier ton 'bloqueur de flux' de la journée." },
      { day: 4, action: "Agir sur une impulsion sans analyse préalable." },
      { day: 5, action: "Noter trois moments où ton corps s'est tendu inutilement." },
      { day: 6, action: "Réviser ton objectif de la semaine sous l'angle du plaisir." },
      { day: 7, action: "Bilan : Observe l'énergie gagnée en lâchant le contrôle." }
    ],
    reflex_insights: [
      { title: "Filtre Attentionnel", observation: "Surcharge mentale détectée", exercise: "Pratique du focus unique 10 min/jour" },
      { title: "Point de Rupture", observation: "Réaction instinctive de retrait", exercise: "Exposition graduelle aux micro-stress" }
    ],
    cosmic_alignment: {
      title: "Le Leader en Cage",
      text: "Ton potentiel de naissance est un Feu créateur, mais ton fonctionnement biologique actuel est une Terre pétrifiée par l'anticipation.",
      score: 34,
      astroElement: "Feu",
      bioElement: "Terre",
      origin: "Une accumulation de responsabilités mal alignées avec tes valeurs de liberté (Expression 5).",
      remedy: "Réintroduire 20% d'imprévu volontaire dans ton agenda hebdomadaire."
    }
  },
  report_sections: [],
  video_script: "",
  final_phrase: "Reprends les rênes de ton feu intérieur."
};

export default function DemoRapportPage() {
  return (
    <div className="bg-[#FDFBF7]">
      <div className="max-w-4xl mx-auto py-10 px-6">
        <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-800 text-sm mb-10">
          <strong>Mode Démo :</strong> Voici un exemple fictif complet du rapport final "Miroir Intégral" tel qu'il apparaît après le paiement.
        </div>
      </div>
      
      <UnifiedMiroirReport 
        psyResult={MOCK_PSY_RESULT as any} 
        userData={MOCK_USER as any} 
        numerologyResult={MOCK_NUMEROLOGY as any}
        etymology={null}
      />
    </div>
  );
}
