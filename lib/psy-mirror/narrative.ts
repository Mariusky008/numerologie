import { ProfileScores, DimensionId, PsyMirrorResult } from './types';
import { DIMENSIONS, GAP_THRESHOLDS } from './config';
import { BLIND_SPOT_LIBRARY } from './blind-spots';

const PREMIUM_TEMPLATES: Record<string, Record<string, any>> = {
  D1: {
    "0-33": {
      label: "Décision prudente et sécurisée",
      manifestation: "Vous faites partie de ceux qui considèrent la décision comme un acte de responsabilité lourde. Dans les scénarios où l'information manquait, vous avez systématiquement cherché à stabiliser le cadre avant de vous engager.",
      advantage: "Cette approche vous permet de construire des projets d'une solidité rare, où chaque risque a été identifié et neutralisé avant le lancement.",
      cost: "Le coût caché est une perte d'élan. À force de vouloir tout sécuriser, vous pouvez laisser passer des fenêtres de tir critiques ou épuiser vos collaborateurs qui attendent votre feu vert.",
      adjustment: "Définissez un 'seuil de confiance' à 70%. Dès que vous avez 70% des infos, décidez et gérez les 30% restants en mode agile."
    },
    "34-66": {
      label: "Décision équilibrée et contextuelle",
      manifestation: "Votre mode décisionnel est hybride. Vous savez trancher vite quand l'urgence est réelle, mais vous reprenez un mode analytique dès que la pression retombe.",
      advantage: "Votre grande force est l'adaptabilité : vous ne vous enfermez ni dans la précipitation ni dans l'analyse sans fin.",
      cost: "Le risque est un manque de lisibilité pour votre entourage. On peut parfois ne pas comprendre pourquoi vous allez vite un jour et lentement le lendemain.",
      adjustment: "Explicitez votre mode du jour : 'Aujourd'hui, je suis en mode vitesse' ou 'Aujourd'hui, je suis en mode analyse'."
    },
    "67-100": {
      label: "Décision rapide et moteur",
      manifestation: "Pour vous, décider est un sport de mouvement. Dans les scénarios de crise, vous avez choisi l'action immédiate, préférant corriger en chemin plutôt que de rester immobile.",
      advantage: "Vous êtes un moteur exceptionnel. Vous débloquez les situations là où les autres hésitent et vous créez un élan permanent.",
      cost: "Le coût est l'épuisement par le réajustement. Vous passez parfois plus de temps à réparer les conséquences d'une décision hâtive qu'il n'en aurait fallu pour la préparer.",
      adjustment: "Imposez-vous une seule question 'filtre' : 'Quelle est la conséquence irréversible si je me trompe ?' Si c'est grave, attendez 10 minutes."
    }
  },
  D2: {
    "0-33": {
      label: "Besoin élevé de clarté",
      manifestation: "L'ambiguïté agit sur vous comme un bruit parasite qui vous empêche de réfléchir. Face au flou, vous avez tendance à vous arrêter pour demander des précisions.",
      advantage: "Vous êtes le garant de la clarté. Grâce à vous, les malentendus sont levés tôt et les objectifs sont toujours bien définis.",
      cost: "Le risque est l'immobilisation face à des projets complexes par nature, où la clarté n'arrive qu'à la fin de l'action.",
      adjustment: "Apprenez à travailler avec des 'hypothèses de travail'. Dites-vous : 'Je pars du principe que A est vrai' et avancez."
    },
    "34-66": {
      label: "Tolérance sélective à l'incertain",
      manifestation: "Vous supportez l'incertitude si vous avez confiance dans le cadre ou dans les personnes impliquées.",
      advantage: "Vous avez une approche pragmatique : vous n'attendez pas la perfection mais vous ne sautez pas non plus dans le vide sans filet.",
      cost: "Vous pouvez parfois rester 'entre deux eaux', ce qui crée une fatigue mentale car vous gérez l'incertain tout en le craignant.",
      adjustment: "Formalisez des essais courts de 48 heures. Si l'incertitude ne se lève pas après 48h, changez de méthode."
    },
    "67-100": {
      label: "Confort élevé avec l'ambiguïté",
      manifestation: "Vous naviguez dans le brouillard avec une aisance naturelle. Là où les autres voient du chaos, vous voyez des patterns et des opportunités.",
      advantage: "Vous êtes capable de lancer des projets innovants là où personne n'ose aller car rien n'est encore écrit.",
      cost: "Le risque est de laisser votre entourage derrière vous. Ils peuvent se sentir perdus ou insécurisés par votre manque de besoin de repères.",
      adjustment: "Créez des 'îlots de certitude' pour vos collaborateurs. Même si tout est flou, donnez-leur 3 points fixes auxquels se raccrocher."
    }
  },
  D3: {
    "0-33": {
      label: "Structure souple et intuitive",
      manifestation: "Vous voyez les plans comme des intentions, pas comme des lois. Vous préférez l'ajustement en temps réel à la planification rigide.",
      advantage: "Votre réactivité est totale. Vous ne perdez pas de temps à essayer de faire rentrer la réalité dans un tableau Excel.",
      cost: "Le coût est un manque de structure qui peut générer des oublis ou une sensation de désordre pour ceux qui travaillent avec vous.",
      adjustment: "Utilisez un système de 'Checklist minimale' (3 points) pour chaque projet pour ne pas perdre l'essentiel."
    },
    "34-66": {
      label: "Structure adaptable",
      manifestation: "Vous planifiez l'essentiel mais gardez toujours une réserve de temps et d'énergie pour l'imprévu.",
      advantage: "Vous êtes résilient. Vos plans ne s'effondrent pas au premier obstacle car vous avez intégré la flexibilité dès le départ.",
      cost: "Vous pouvez parfois hésiter entre tenir le plan et pivoter, ce qui crée une tension interne inutile.",
      adjustment: "Définissez un 'Pivot Signal' : quel événement précis vous autorise à abandonner le plan initial ?"
    },
    "67-100": {
      label: "Contrôle et organisation élevés",
      manifestation: "Pour vous, la structure est la condition de la liberté. Vous sécurisez vos projets par une planification méticuleuse et un contrôle précis.",
      advantage: "Vous êtes d'une fiabilité absolue. Avec vous, les délais sont tenus et la qualité est constante car rien n'est laissé au hasard.",
      cost: "Le risque est le sur-contrôle (micro-management) qui peut étouffer l'initiative des autres et vous transformer en goulot d'étranglement.",
      adjustment: "Pratiquez la délégation par 'Résultats Attendus'. Ne contrôlez pas comment c'est fait, mais ce qui est livré."
    }
  },
  D4: {
    "0-33": {
      label: "Priorité à l'harmonie et l'accord",
      manifestation: "Vous considérez que la réussite est collective. Dans les scénarios sociaux, vous avez cherché l'adhésion avant de marquer votre position.",
      advantage: "Vous êtes un fédérateur né. Vous créez des environnements de travail sains où chacun se sent écouté et respecté.",
      cost: "Le coût caché est la dilution de votre propre vision et un ralentissement des décisions pour ne froisser personne.",
      adjustment: "Décidez seul sur les sujets techniques, et concertez sur les sujets humains. Ne mélangez pas les deux."
    },
    "34-66": {
      label: "Équilibre position et relation",
      manifestation: "Vous savez alterner entre l'affirmation de vos idées et l'écoute des besoins du groupe selon l'enjeu.",
      advantage: "Vous êtes un négociateur efficace. Vous savez où lâcher du lest et où rester ferme pour atteindre l'objectif.",
      cost: "Vous pouvez parfois donner une impression d'ambivalence, les autres ne sachant pas si vous êtes en mode 'écoute' ou 'décision'.",
      adjustment: "Annoncez la couleur : 'Sur ce point, je cherche votre avis' vs 'Sur ce point, j'ai pris ma décision'."
    },
    "67-100": {
      label: "Autonomie et affirmation forte",
      manifestation: "Vous avancez avec vos propres convictions. Face à l'opposition, vous maintenez votre cap si vous jugez qu'il est le bon.",
      advantage: "Vous avez une capacité de leadership naturelle. Vous rassurez par votre détermination et vous faites avancer les choses contre vents et marées.",
      cost: "Le risque est l'isolement. À force d'avoir raison seul, vous pouvez vous couper de feedbacks précieux ou démotiver votre entourage.",
      adjustment: "Pratiquez l'écoute active 'à blanc'. Demandez des avis même si votre décision est prise, juste pour comprendre d'autres angles."
    }
  },
  D5: {
    "0-33": {
      label: "Régulation émotionnelle calme",
      manifestation: "Sous pression, vous semblez imperturbable. Vous avez tendance à mettre vos émotions de côté pour rester factuel.",
      advantage: "Vous êtes le roc sur lequel les autres s'appuient en temps de crise. Votre calme est contagieux et permet de dé-escalader les tensions.",
      cost: "Le coût est un risque d'accumulation interne. À force de tout réguler, vous pouvez finir par exploser ou vous épuiser sans prévenir.",
      adjustment: "Identifiez vos signaux physiques de stress (mains, nuque, coeur) et traitez-les avant qu'ils ne montent au cerveau."
    },
    "34-66": {
      label: "Réactivité contextuelle",
      manifestation: "Votre niveau de stress dépend de l'enjeu et de votre état de fatigue. Vous êtes généralement stable mais avez des points de rupture précis.",
      advantage: "Votre stress est un signal utile : il vous indique quand une situation mérite une attention particulière ou un changement de cap.",
      cost: "Le risque est une variabilité qui peut surprendre vos collaborateurs ou vos proches.",
      adjustment: "Nommez votre état : 'Je suis sous tension là, j'ai besoin de 5 minutes'. Cela désamorce 90% des conflits."
    },
    "67-100": {
      label: "Réactivité émotionnelle vive",
      manifestation: "Vous vivez vos décisions avec intensité. Sous pression, votre réaction est immédiate et se voit sur votre visage ou dans vos paroles.",
      advantage: "Vous êtes authentique et passionné. Votre énergie est un moteur puissant pour vos projets et vous ne laissez personne indifférent.",
      cost: "Le risque est de prendre des décisions 'à chaud' que vous regrettez 24 heures plus tard une fois l'émotion retombée.",
      adjustment: "Appliquez la règle des '10 respirations' ou du délai de 10 minutes avant toute réponse sensible."
    }
  },
  D6: {
    "0-33": {
      label: "Stabilité et persévérance fortes",
      manifestation: "Une fois que vous avez choisi un cap, vous vous y tenez. Vous voyez les imprévus comme des obstacles à contourner, pas comme des raisons de changer.",
      advantage: "Vous êtes d'une constance remarquable. Vous finissez ce que vous commencez et vous ne vous laissez pas distraire par les modes ou les bruits de couloir.",
      cost: "Le risque est la rigidité. Vous pouvez vous acharner sur une voie sans issue simplement par refus de pivoter.",
      adjustment: "Demandez-vous chaque semaine : 'Si je devais recommencer ce projet à zéro aujourd'hui, ferais-je la même chose ?'"
    },
    "34-66": {
      label: "Adaptation mesurée",
      manifestation: "Vous savez pivoter quand la réalité vous prouve que votre plan ne fonctionne plus, mais vous ne le faites pas par plaisir.",
      advantage: "Vous avez un bon équilibre entre ténacité et agilité. Vous ne changez pas pour rien, mais vous ne restez pas non plus dans une impasse.",
      cost: "Le changement peut vous coûter beaucoup d'énergie mentale car il demande de renoncer à votre structure initiale.",
      adjustment: "Prévoyez des 'Scénarios de Repli' dès le début. Le changement sera plus facile s'il est déjà anticipé."
    },
    "67-100": {
      label: "Flexibilité et pivot rapides",
      manifestation: "Pour vous, le changement est la seule constante. Dès qu'un paramètre bouge, vous ajustez votre stratégie avec une rapidité déconcertante.",
      advantage: "Vous êtes ultra-agile. Vous survivez dans des environnements instables là où les autres s'effondrent et vous saisissez toutes les opportunités.",
      cost: "Le risque est la dispersion et un manque de profondeur. À force de pivoter, vous pouvez ne jamais creuser assez profond pour obtenir des résultats durables.",
      adjustment: "Fixez-vous un 'Cap Invariant' : un objectif qui ne doit pas changer pendant au moins 3 mois, peu importe les pivots tactiques."
    }
  }
};

/**
 * Generates the V2 premium narrative
 */
export function generateNarrative(
  selfProfile: ProfileScores,
  behaviorProfile: ProfileScores,
  gaps: Record<string, number>,
  primaryGap: DimensionId,
  indices: { coherence: number; avoidance: number; overcontrol: number },
  reflexResults?: any
) {
  // 1. Generate Mirror Section (150-200 words)
  const mirrorData = generateMirrorSection(primaryGap, selfProfile[primaryGap], behaviorProfile[primaryGap]);

  // 2. Select Blind Spot (120-180 words)
  const blindSpotData = selectBlindSpotV2(gaps, primaryGap);

  // 3. Generate Dimension Insights (80-120 words each)
  const dimensionInsights = DIMENSIONS.map(dim => {
    const score = behaviorProfile[dim.id];
    const range = score < 34 ? "0-33" : score < 67 ? "34-66" : "67-100";
    const template = PREMIUM_TEMPLATES[dim.id][range];
    return {
      id: dim.id,
      name: dim.name,
      text: `${template.manifestation} ${template.advantage} ${template.cost} ${template.adjustment}`
    };
  });

  // 4. Generate Priority Lever (80-100 words)
  const priorityLeverText = generatePriorityLeverV2(blindSpotData);

  // 5. Generate 7-Day Plan (7 distinct actions)
  const plan7Days = generate7DayPlan(blindSpotData, primaryGap);

  // 6. Generate Reflex Laboratory Section
  const reflexInsights = generateReflexInsights(reflexResults, behaviorProfile);

  // 7. Generate Video Script (6-7 minutes)
  const videoScript = generateVideoScriptV2(selfProfile, behaviorProfile, primaryGap, blindSpotData, plan7Days, indices);

  return {
    insights: {
      mirror_sentence: mirrorData.sentence,
      mirror_full: mirrorData.fullText,
      blind_spot: blindSpotData.fullText,
      blind_spot_label: blindSpotData.label,
      lever: priorityLeverText,
      dimension_insights: dimensionInsights,
      plan_7_days: plan7Days,
      reflex_insights: reflexInsights
    },
    report_sections: [
      {
        id: 'mirror',
        title: 'L\'Écart Central (Le Miroir)',
        html: `<div class="space-y-4 text-lg leading-relaxed">${mirrorData.fullText}</div>`
      },
      {
        id: 'reflex_lab',
        title: 'Le Laboratoire des Réflexes',
        html: `<div class="space-y-8">${reflexInsights.map(ri => `
          <div class="p-8 border rounded-[40px] bg-white shadow-sm space-y-4">
            <div class="flex items-center gap-3 text-[#C9A24D]">
              <span class="font-bold uppercase tracking-widest text-xs">${ri.title}</span>
            </div>
            <p class="text-xl font-bold leading-tight">${ri.observation}</p>
            <div class="p-6 bg-[#F8F9FA] rounded-3xl border border-[#1A1C2E]/5">
              <p class="text-sm font-bold text-[#1A1C2E]/40 uppercase mb-2">Exercice correctif</p>
              <p class="text-lg text-[#1A1C2E] font-medium italic">"${ri.exercise}"</p>
            </div>
          </div>
        `).join('')}</div>`
      },
      {
        id: 'blind_spot',
        title: 'L\'Angle Mort',
        html: `<div class="space-y-4 text-lg leading-relaxed">${blindSpotData.fullText}</div>`
      },
      {
        id: 'dimensions',
        title: 'Vos 6 Dimensions Comportementales',
        html: `<div class="grid gap-6">${dimensionInsights.map(di => `<div class="p-6 border rounded-3xl bg-white shadow-sm"><h4 class="font-bold text-xl mb-3">${di.name}</h4><p class="text-base text-gray-700 leading-relaxed">${di.text}</p></div>`).join('')}</div>`
      },
      {
        id: 'lever',
        title: 'Levier Prioritaire',
        html: `<div class="p-8 bg-emerald-50 rounded-3xl border border-emerald-100"><p class="text-lg text-emerald-900 leading-relaxed font-medium">${priorityLeverText}</p></div>`
      }
    ],
    video_script: videoScript,
    final_phrase: "Ce miroir ne te dit pas qui tu es. Il te montre comment tu fonctionnes quand ça compte vraiment."
  };
}

/**
 * Generates insights for reflex tests
 */
function generateReflexInsights(results: any, behavior: ProfileScores) {
  if (!results) return [];

  const insights = [];

  // 1. Attention Filter (Concentration / Stress)
  const att = results.attention;
  if (att) {
    let obs = "";
    let ex = "";
    if (att.degradation > 1.8 || att.accuracy < 70) {
      obs = "Votre concentration s'effondre sous la pression. Le bruit visuel et sonore sature votre capacité de traitement, vous faisant perdre le fil de vos priorités.";
      ex = "Pratiquez le 'Single-Tasking' strict : coupez toutes les notifications pendant 25 minutes pour réhabituer votre cerveau au focus profond.";
    } else if (att.degradation > 1.3) {
      obs = "Votre focus est sensible à l'environnement. Vous parvenez à rester efficace, mais au prix d'un effort mental intense qui vous épuise rapidement.";
      ex = "Utilisez des outils de réduction de bruit (casque, bureau isolé) pour protéger votre énergie lors des tâches complexes.";
    } else {
      obs = "Vous possédez une résilience cognitive impressionnante. Le stress et les distractions extérieures ne dégradent pas la qualité de votre travail.";
      ex = "Utilisez cette force pour agir comme 'tampon' dans les situations de crise pour votre équipe.";
    }
    insights.push({ title: "Filtre Attentionnel", observation: obs, exercise: ex });
  }

  // 2. Breaking Point (Impulsivity / Control)
  const bp = results.breaking_point;
  if (bp) {
    let obs = "";
    let ex = "";
    if (bp.inhibitionError > 30) {
      obs = "Sous pression de vitesse, votre cerveau reptilien prend le contrôle total. Vous agissez par réflexe impulsif, sacrifiant la précision pour la rapidité.";
      ex = "Appliquez la règle des '3 secondes' : devant chaque sollicitation urgente, comptez jusqu'à 3 avant de toucher votre clavier ou de parler.";
    } else if (bp.inhibitionError > 15) {
      obs = "Votre self-contrôle est fragile dans l'urgence. Vous parvenez à rester maître de vous, mais vos réflexes impulsifs tentent souvent de prendre le dessus.";
      ex = "Pratiquez des exercices de 'Stop-Action' : interrompez volontairement une tâche en cours pendant 10 secondes pour muscler votre inhibition.";
    } else {
      obs = "Même dans l'urgence extrême, vous gardez une capacité d'inhibition forte. Votre self-contrôle est votre ancrage naturel.";
      ex = "Travaillez votre vitesse de décision, car votre excès de contrôle pourrait vous faire perdre en agilité tactique.";
    }
    insights.push({ title: "Point de Rupture", observation: obs, exercise: ex });
  }

  // 3. Risk Balloon (Risk / Uncertainty)
  const rb = results.risk_balloon;
  if (rb) {
    let obs = "";
    let ex = "";
    if (rb.riskScore > 70) {
      obs = "Vous avez une soif de risque élevée. Vous flirtez souvent avec le point de rupture par appât du gain, quitte à tout perdre sur un coup de tête.";
      ex = "Fixez-vous un 'Seuil de Sortie' non négociable avant de lancer un projet risqué. Ne changez pas ce seuil en cours de route.";
    } else if (rb.riskScore < 30) {
      obs = "Votre prudence est votre armure, mais elle peut devenir votre prison. Vous sécurisez vos acquis au point de passer à côté d'opportunités majeures.";
      ex = "Forcez-vous une fois par semaine à prendre un risque calculé sans filet (une décision mineure mais audacieuse) pour muscler votre audace.";
    } else {
      obs = "Votre gestion du risque est pragmatique. Vous savez quand accélérer et quand sécuriser vos gains sans vous laisser aveugler par l'adrénaline.";
      ex = "Continuez à utiliser des critères factuels pour vos prises de risque plutôt que de vous fier uniquement à votre intuition.";
    }
    insights.push({ title: "Ballon de Risque", observation: obs, exercise: ex });
  }

  // 4. Mental Agility (Cognitive Flexibility)
  const ma = results.mental_agility;
  if (ma) {
    let obs = "";
    let ex = "";
    if (ma.switchCost > 500 || ma.accuracy < 75) {
      obs = "Votre cerveau a un 'coût de commutation' important. Passer d'une règle à une autre demande un effort d'adaptation qui vous ralentit et génère des erreurs.";
      ex = "Entraînez votre flexibilité en changeant vos habitudes quotidiennes (trajet différent, nouvel ordre dans vos tâches) pour 'défiger' vos automatismes.";
    } else if (ma.switchCost > 250) {
      obs = "Votre agilité mentale est en cours de développement. Vous parvenez à pivoter, mais ce changement de contexte crée une friction mentale notable.";
      ex = "Pratiquez le passage rapide entre deux types de tâches (ex: 10 min de mail, 10 min de création) pour fluidifier vos transitions cérébrales.";
    } else {
      obs = "Votre agilité mentale est remarquable. Vous passez d'un contexte à un autre avec une fluidité qui vous permet de rester efficace même dans le chaos.";
      ex = "Misez sur des rôles de coordination ou de pivot où la capacité à changer de perspective rapidement est un avantage stratégique.";
    }
    insights.push({ title: "Agilité Mentale", observation: obs, exercise: ex });
  }

  return insights;
}

/**
 * Section 1: Mirror Generation
 */
function generateMirrorSection(dimId: DimensionId, selfScore: number, behaviorScore: number) {
  const name = DIMENSIONS.find(d => d.id === dimId)?.name || dimId;
  const selfLabel = getDimensionLabel(dimId, selfScore);
  const behaviorLabel = getDimensionLabel(dimId, behaviorScore);
  const gapValue = behaviorScore - selfScore;
  const absGap = Math.abs(gapValue);

  let fullText = `### Votre perception vs Votre réalité\n\n`;
  fullText += `Vous vous décrivez consciemment comme quelqu'un de **${selfLabel}** sur la dimension ${name}. Dans votre esprit, c'est votre mode de fonctionnement par défaut, celui que vous essayez d'appliquer pour maintenir le contrôle et la cohérence de votre image. C'est votre intention de départ.\n\n`;
  
  fullText += `Pourtant, dès que la pression monte ou que le temps se contracte — comme nous l'avons vu dans les scénarios de décision — vos choix révèlent une tendance **${behaviorLabel}**. Ce n'est pas une contradiction, c'est une adaptation instinctive. Vos mécanismes de survie opérationnelle prennent le dessus sur votre intention consciente.\n\n`;

  if (absGap >= 20) {
    fullText += `Ce décalage de **${absGap} points** est ce que nous appelons votre "Miroir Central". Il apparaît généralement quand l'enjeu devient trop fort pour que votre self-contrôle puisse maintenir votre image idéale. Ce décalage est invisible pour vous car vous jugez vos intentions, alors que le monde subit vos actions. C'est ici que se dissipe votre énergie et que naissent vos frustrations.\n\n`;
  } else {
    fullText += `Bien que l'écart soit modéré, il montre une tension entre ce que vous voulez être et ce que vous faites réellement en situation de stress. Cette tension est le point de départ de votre optimisation comportementale.\n\n`;
  }

  const sentence = `Tu te décris comme ${selfLabel}, mais dans tes choix sous contrainte, tu montres une tendance ${behaviorLabel}.`;

  return { sentence, fullText };
}

/**
 * Section 2: Blind Spot Selection V2
 */
function selectBlindSpotV2(gaps: Record<string, number>, primaryGap: DimensionId) {
  const gapValue = gaps[primaryGap];
  const suffix = gapValue > 0 ? '_positive' : '_negative';
  const key = `${primaryGap}${suffix}`;
  const spot = BLIND_SPOT_LIBRARY[key];

  if (!spot || Math.abs(gapValue) < 15) {
    return {
      label: "Profil en alignement relatif",
      fullText: "Votre comportement est globalement aligné avec votre perception. Votre principal défi n'est pas un écart de perception, mais l'optimisation de vos forces déjà identifiées. Votre fonctionnement est lisible pour les autres, ce qui est un atout de confiance majeur.",
      lever: "Continuez à documenter vos décisions pour identifier vos patterns de réussite.",
      consequences: ["Alignement interne fort", "Lisibilité pour l'entourage"],
      impact_on_others: "On vous trouve cohérent et fiable.",
      situational_example: "Vous faites ce que vous dites, ce qui rassure vos partenaires."
    };
  }

  let fullText = `### ${spot.label}\n\n`;
  fullText += `${spot.template.replace('{{scenario_ref}}', 'nos simulations de crise')}\n\n`;
  fullText += `**Impact concret :** ${spot.situational_example}\n\n`;
  fullText += `**Ce que les autres perçoivent :** ${spot.impact_on_others}\n\n`;
  fullText += `**Conséquences :** ${spot.consequences.join(' ')}\n\n`;
  fullText += `Ce fonctionnement n'est ni un défaut ni une faute. C'est un automatisme de protection qui a eu son utilité, mais qui aujourd'hui crée un coût caché en termes de temps, d'énergie ou de qualité relationnelle.`;

  return { ...spot, fullText };
}

/**
 * Section 3: Priority Lever V2
 */
function generatePriorityLeverV2(blindSpot: any) {
  return `Pour transformer cet angle mort en force dès demain, voici votre levier d'action prioritaire : **${blindSpot.lever}**. Contrairement à une résolution vague, ce levier est testable et mesurable. Il vise à créer une rupture dans votre automatisme habituel pour vous redonner le choix là où vous n'aviez que de la réaction. Appliquez-le pendant 7 jours sans chercher à être parfait, l'objectif est simplement d'observer le changement de dynamique que cela crée dans vos résultats.`;
}

/**
 * Section 5: 7-Day Plan
 */
function generate7DayPlan(blindSpot: any, dimId: DimensionId) {
  return [
    { day: 1, action: "Observation passive : Ne changez rien, mais notez chaque fois que vous sentez l'automatisme de votre angle mort s'activer." },
    { day: 2, action: `Application du levier : Testez '${blindSpot.lever}' sur une seule petite tâche sans enjeu.` },
    { day: 3, action: "Analyse d'impact : Notez comment votre entourage a réagi à votre changement de posture d'hier." },
    { day: 4, action: "Double dose : Appliquez le levier sur deux situations distinctes, une le matin et une l'après-midi." },
    { day: 5, action: "Le Pivot : Si vous sentez une résistance interne, nommez-la par écrit avant d'appliquer le levier." },
    { day: 6, action: "Engagement social : Appliquez le levier lors d'une interaction avec un collaborateur ou un proche." },
    { day: 7, action: "Bilan : Évaluez votre niveau d'énergie. Est-il plus haut ou plus bas que d'habitude après avoir utilisé ce levier ?" }
  ];
}

/**
 * Section 6: Video Script V2
 */
function generateVideoScriptV2(self: ProfileScores, behavior: ProfileScores, primaryGap: DimensionId, blindSpot: any, plan: any[], indices: any) {
  const name = DIMENSIONS.find(d => d.id === primaryGap)?.name || primaryGap;
  return `
[Introduction - 45s]
Bienvenue dans la restitution de votre Miroir Psychologique Actif™. Avant de commencer, un point essentiel : ce que vous allez voir n'est pas un test de personnalité classique. Nous ne cherchons pas à vous mettre dans une case. Nous cherchons à mettre en lumière vos mécanismes de décision quand ça compte vraiment, c'est-à-dire quand la pression monte et que votre conscient ne peut plus tout filtrer.

[Auto-perception - 1m]
À travers vos réponses initiales, vous avez dessiné un profil où vous vous percevez comme quelqu'un de ${getDimensionLabel(primaryGap, self[primaryGap])}. C'est votre "intention de confort". C'est ainsi que vous aimeriez fonctionner en permanence car cela correspond à vos valeurs et à l'image que vous avez de vous-même.

[Comportement Réel - 1m30]
Cependant, nos scénarios de crise ont révélé une autre facette. Sous contrainte de temps, d'ambiguïté ou d'enjeu social, vos choix réels montrent une tendance ${getDimensionLabel(primaryGap, behavior[primaryGap])}. Ce n'est pas une erreur, c'est votre "mode de survie opérationnel". C'est ce que vous faites réellement quand vous n'avez plus le temps de réfléchir à l'image que vous projetez.

[Le Miroir Central - 1m30]
Le coeur de votre analyse se situe sur la dimension ${name}. Il existe un écart de ${Math.abs(behavior[primaryGap] - self[primaryGap])} points entre ce que vous croyez faire et ce que vous faites réellement. Cet écart est votre Miroir. C'est ici que se situe votre plus grande marge de progression, mais aussi votre plus grande source de fatigue inutile.

[L'Angle Mort - 1m]
Ce décalage crée un angle mort : ${blindSpot.label}. En pratique, cela signifie que ${blindSpot.impact_on_others} Vous risquez de ${indices.overcontrol > 0.6 ? "trop verrouiller vos processus par peur de l'imprévu" : "perdre en clarté par besoin de validation"}.

[Le Levier de Transformation - 45s]
Pour reprendre le contrôle, votre levier pour les 7 prochains jours est simple : ${blindSpot.lever}. C'est une action concrète qui va forcer votre cerveau à sortir de son automatisme.

[Clôture - 30s]
Rappelez-vous : ce miroir ne te dit pas qui tu es. Il te montre comment tu fonctionnes quand ça compte vraiment. Utilisez les 7 prochains jours pour tester ce levier et observer les résultats. Bonne transformation.
  `.trim();
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
