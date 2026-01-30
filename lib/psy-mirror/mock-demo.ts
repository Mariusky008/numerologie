import { PsyMirrorResult } from './types';

export const mockDemoResult: PsyMirrorResult = {
  user_meta: {
    lang: 'fr',
    session_id: 'demo-session-123',
  },
  cosmic_data: {
    pathNum: 7,
    title: 'Le Chercheur de Vérité',
    potential: 'Analyse profonde, intuition spirituelle et quête de sens.',
    moon: 'Scorpion',
    firstName: 'Alexandre',
  },
  self_profile: {
    D1: 70, D2: 40, D3: 80, D4: 30, D5: 60, D6: 50
  },
  behavior_profile: {
    D1: 45, D2: 85, D3: 35, D4: 90, D5: 25, D6: 75
  },
  gaps: {
    D1: -25, D2: 45, D3: -45, D4: 60, D5: -35, D6: 25
  },
  primary_gap: 'D4',
  secondary_gap: 'D2',
  indices: {
    coherence: 42,
    avoidance: 68,
    overcontrol: 75,
  },
  reflex_results: {
    attention: { accuracy: 94, avgSpeed: 340, degradation: 12 },
    breaking_point: { inhibitionError: 15, omissionRate: 5, peakSpeed: 210 },
    risk_balloon: { avgPumps: 14, pops: 2, riskScore: 78 },
    mental_agility: { switchCost: 450, accuracy: 88, agilityScore: 62 },
  },
  insights: {
    mirror_sentence: "Ton esprit cherche la structure là où tes réflexes hurlent à l'évasion.",
    mirror_full: "Tu te présentes au monde comme quelqu'un de méthodique et posé (Chemin de Vie 7). Pourtant, sous la surface, tes tests de réflexes révèlent une réactivité volcanique.\n\nCette dissonance entre ta 'façade' analytique et ta 'biologie' impulsive crée une tension invisible qui te fatigue plus que nécessaire. Tu n'es pas lent, tu te freines par peur de perdre le contrôle.",
    blind_spot: "Tu penses être quelqu'un qui prend des risques calculés. En réalité, tes réflexes montrent une inhibition massive dès que l'incertitude grimpe. Ton 'Angle Mort' est cette peur viscérale de l'erreur qui paralyse ton intuition naturelle.",
    blind_spot_label: "L'Hyper-Contrôle Inhibiteur",
    lever: "Lâche la bride sur les décisions de moins de 5 secondes.",
    dimension_insights: [
      { id: 'D1', name: 'Stabilité Émotionnelle', text: 'Tes réflexes montrent une grande sensibilité aux stimuli négatifs, contrastant avec ton calme apparent.' },
      { id: 'D2', name: 'Ouverture', text: 'Une curiosité intellectuelle immense bridée par une exécution biologique prudente.' },
      { id: 'D4', name: 'Conscienciosité', text: 'Ton score de 90 montre un perfectionnisme qui frôle l\'auto-sabotage dans l\'action rapide.' }
    ],
    plan_7_days: [
      { day: 1, action: "Prends 3 décisions impulsives sans réfléchir (choix du repas, trajet, musique)." },
      { day: 2, action: "Éteins toutes les notifications et travaille par blocs de 25min sans vérifier ton travail." },
      { day: 3, action: "Fais une erreur volontaire mineure et observe que le monde ne s'écroule pas." }
    ],
    reflex_insights: [
      { title: 'Attention & Focus', observation: 'Une précision chirurgicale (94%) mais un coût énergétique immense.', exercise: 'Pratique le scan visuel rapide sans chercher la perfection.' },
      { title: 'Point de Rupture', observation: 'Tu tentes de tout contrôler jusqu\'à l\'explosion de tes capacités.', exercise: 'Apprends à déléguer la micro-décision à ton instinct.' },
      { title: 'Prise de Risque', observation: 'Tes réflexes sont ceux d\'un explorateur contrarié par une prudence apprise.', exercise: 'Augmente ton seuil de tolérance à l\'incertitude.' }
    ],
    cosmic_alignment: {
      title: "Choc Élémentaire : Air vs Terre",
      text: "Ta nature de Air (Gémeaux/CV7) est littéralement étouffée par tes réflexes de Terre (Inhibition/Lenteur).",
      score: 42,
      astroElement: 'Air',
      bioElement: 'Terre',
      intentElement: 'Feu',
      origin: "Cette dissonance provient d'une adaptation forcée durant ton parcours : pour réussir dans un environnement exigeant une fiabilité absolue, tu as 'alourdi' ton agilité naturelle par des mécanismes de contrôle Terre. Ton corps a appris à privilégier la sécurité sur l'exploration.",
      remedy: "Pour retrouver ton souffle, pratique des exercices de 'micro-pivots' : change une habitude sans réfléchir 5 fois par jour. Cela va fluidifier tes connexions nerveuses et redonner de la place à ton élément Air.",
      details: "**Dissonance Détectée**\n\nTes astres te poussent vers la fluidité et l'échange (Air), mais ton corps réagit avec la lourdeur et la méfiance de la Terre.\n\n**Note de Dissonance :** Tes réponses au questionnaire montrent que tu te vois comme quelqu'un de Feu (Action), mais ton corps agit avec la lenteur de la Terre."
    }
  },
  report_sections: [],
  video_script: "",
  final_phrase: "Le miroir ne ment jamais, il ne fait que révéler ce que tu n'oses pas encore voir."
};
