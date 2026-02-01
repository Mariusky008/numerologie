import { 
  Zap, 
  ShieldCheck, 
  Activity, 
  Target, 
  Compass, 
  TrendingUp, 
  Layout 
} from 'lucide-react';
import { PsyMirrorResult } from './types';

export interface TargetedLecture {
  id: string;
  title: string;
  subtitle: string;
  questions: string[];
  functionalReading: string;
  perspective: string;
  exercise: {
    title: string;
    duration: string;
    steps: string[];
    objective: string;
  };
  icon: any;
}

export const getPersonalizedLectures = (psyResult: PsyMirrorResult): TargetedLecture[] => {
  const scores = psyResult.behavior_profile;
  const coherence = psyResult.indices.coherence;

  return [
    {
      id: 'L1',
      title: 'Décision & Incertitude',
      subtitle: '(Agir vite vs sécuriser)',
      questions: ['A01', 'A02', 'A07', 'A10', 'S01', 'S05'],
      functionalReading: scores.D1 > 50 
        ? "Plusieurs de tes réponses indiquent une tendance à privilégier l’action pour débloquer une situation, même lorsque toutes les informations ne sont pas disponibles. Ce fonctionnement permet souvent d’avancer rapidement, mais peut générer une tension interne lorsque l’incertitude s’installe ou que le choix n’est pas pleinement satisfaisant."
        : "Tes réponses montrent une prudence marquée face au manque de données. Tu préfères souvent sécuriser tes bases avant de trancher, ce qui garantit la fiabilité de tes choix mais peut ralentir ton élan dans des contextes de changement rapide.",
      perspective: "Ton potentiel de naissance met en lumière une capacité naturelle à donner du sens dans la durée, à stabiliser et à structurer tes décisions. L’écart observé ne reflète pas un manque, mais une adaptation au contexte qui peut t’amener à agir avant d’avoir clarifié ce qui compte vraiment pour toi.",
      exercise: {
        title: scores.D1 > 50 ? '“Décision à deux temps”' : '“Saut contrôlé”',
        duration: '7 jours',
        steps: scores.D1 > 50 
          ? [
              'Note ce qui te pousse à agir rapidement',
              'Note ce qui gagnerait à être clarifié (enjeu réel, conséquence, priorité)'
            ]
          : [
              'Prends 3 petites décisions quotidiennes sans chercher d\'avis extérieur',
              'Note la sensation de liberté après l\'action'
            ],
        objective: scores.D1 > 50 
          ? 'Réintroduire une phase de régulation sans freiner ton élan naturel.'
          : 'Réhabiliter ta capacité d\'action spontanée.'
      },
      icon: Zap
    },
    {
      id: 'L2',
      title: 'Structure & Contrôle',
      subtitle: '(Maîtriser vs lâcher prise)',
      questions: ['A03', 'A08', 'A12', 'S02'],
      functionalReading: scores.D3 > 50
        ? "Tes réponses montrent une recherche d’équilibre entre contrôle et souplesse, avec une vigilance particulière sur ce qui est jugé important. Sous surcharge, ce fonctionnement peut se transformer en tension décisionnelle, lorsque trop d’éléments semblent dépendre de toi."
        : "Tu navigues avec une certaine fluidité, mais tes réponses suggèrent que le manque de structure peut parfois diluer tes priorités. L'absence de cadres clairs peut générer une dispersion de ton énergie vitale.",
      perspective: "Ton potentiel suggère une aptitude à poser des cadres stables, à condition qu’ils restent ajustables. L’adaptation observée peut t’amener à porter trop de responsabilités seul, au détriment de ta clarté mentale.",
      exercise: {
        title: scores.D3 > 50 ? '“Contrôle utile”' : '“Ancrage structurel”',
        duration: '7 jours',
        steps: scores.D3 > 50
          ? [
              '1 élément à garder sous contrôle',
              '1 élément volontairement laissé en suspens ou délégué'
            ]
          : [
              'Définis 1 cadre non négociable pour ta journée',
              'Respecte-le même si l\'envie de changer surgit'
            ],
        objective: scores.D3 > 50
          ? 'Rééquilibrer effort et lâcher-prise sans perte de cohérence.'
          : 'Retrouver la force d\'un cadre protecteur.'
      },
      icon: ShieldCheck
    },
    {
      id: 'L3',
      title: 'Stress & Réaction',
      subtitle: '(Calme affiché vs tension interne)',
      questions: ['A05', 'S01', 'S02', 'S04'],
      functionalReading: scores.D5 > 50
        ? "Tes réponses indiquent une capacité à fonctionner sous pression, parfois au prix d’une accumulation interne. La réaction rapide peut masquer une fatigue progressive, surtout lorsque les situations se répètent."
        : "Tu sembles absorber les chocs avec un calme apparent, mais tes réponses suggèrent une forme de 'contenance' qui peut t'isoler de tes propres ressentis sous pression.",
      perspective: "Ton potentiel met en avant une sensibilité fine aux rythmes et aux cycles. L’écart observé traduit souvent une suradaptation au contexte plutôt qu’un déséquilibre profond.",
      exercise: {
        title: '“Décompression consciente”',
        duration: '5 minutes / jour',
        steps: [
          'note une situation qui t’a demandé un effort invisible',
          'note comment tu as compensé (action, évitement, accélération)'
        ],
        objective: 'Rendre visible ce qui s’accumule.'
      },
      icon: Activity
    },
    {
      id: 'L4',
      title: 'Affirmation & Harmonie',
      subtitle: '(Dire vs préserver la relation)',
      questions: ['A04', 'A09', 'A11', 'S03', 'S04'],
      functionalReading: scores.D4 < 50
        ? "Tes réponses montrent une attention particulière à l’équilibre relationnel, parfois au détriment de l’expression directe. Ce fonctionnement favorise l’harmonie, mais peut générer une frustration différée."
        : "Tu affirmes tes positions avec clarté, mais tes réponses indiquent que cela peut parfois créer des zones de friction inutiles par manque de nuances relationnelles.",
      perspective: "Ton potentiel indique une capacité naturelle à poser des limites claires sans rompre le lien. L’adaptation observée peut te conduire à différer certaines expressions importantes.",
      exercise: {
        title: scores.D4 < 50 ? '“Expression ajustée”' : '“Nuance relationnelle”',
        duration: '7 jours',
        steps: scores.D4 < 50
          ? [
              'choisis une situation par jour où tu exprimes ton point de vue en une phrase simple',
              'sans justification excessive'
            ]
          : [
              'Avant de trancher, demande l\'avis d\'un collaborateur',
              'Valide son point de vue avant d\'exprimer le tien'
            ],
        objective: scores.D4 < 50
          ? 'Réaligner affirmation et relation.'
          : 'Développer une affirmation plus inclusive.'
      },
      icon: Target
    },
    {
      id: 'L5',
      title: 'Vision & Passage à l’action',
      subtitle: '(Comprendre vs incarner)',
      questions: ['A06', 'A12', 'S05', 'S06'],
      functionalReading: scores.D6 > 50
        ? "Tes réponses suggèrent une vision claire de ce que tu souhaites, avec une mise en action parfois freinée par l’environnement ou les retours extérieurs."
        : "Tu es très focalisé sur l'exécution immédiate, mais tes réponses indiquent que la vision à long terme peut parfois s'effacer derrière l'urgence du moment.",
      perspective: "Ton potentiel met en lumière une capacité à initier et porter une trajectoire personnelle. L’écart observé reflète souvent une attente de validation plutôt qu’un manque de direction.",
      exercise: {
        title: scores.D6 > 50 ? '“Acte autonome”' : '“Prendre de la hauteur”',
        duration: '1 par semaine',
        steps: scores.D6 > 50
          ? [
              'pose un acte aligné avec ta vision',
              'sans en demander l’avis préalable'
            ]
          : [
              'Bloque 30 minutes pour relire tes objectifs long terme',
              'Identifie 1 action qui ne sert QUE la vision'
            ],
        objective: scores.D6 > 50
          ? 'Réactiver l’élan autonome.'
          : 'Réaligner l\'action sur la vision.'
      },
      icon: Compass
    },
    {
      id: 'L6',
      title: 'Priorisation & Limites',
      subtitle: '(Urgence vs importance)',
      questions: ['S02', 'S06', 'A08'],
      functionalReading: scores.D2 < 50 || scores.D3 > 60
        ? "Les choix observés indiquent une difficulté ponctuelle à hiérarchiser sous pression, notamment lorsque des demandes externes s’accumulent."
        : "Tu hiérarchises avec efficacité, mais tes réponses suggèrent que tu peux devenir trop rigide sur tes priorités, au risque de manquer des opportunités imprévues.",
      perspective: "Ton potentiel favorise une vision hiérarchisée des priorités. L’adaptation actuelle peut brouiller cette hiérarchie dans les moments chargés.",
      exercise: {
        title: '“Top 3 réel”',
        duration: '7 jours',
        steps: [
          'note 3 priorités réelles chaque matin',
          'refuse consciemment le reste'
        ],
        objective: 'Restaurer une cohérence décisionnelle.'
      },
      icon: TrendingUp
    },
    {
      id: 'L7',
      title: 'Cohérence globale',
      subtitle: '(Stabilité intérieure vs adaptation permanente)',
      questions: ['A12'],
      functionalReading: coherence < 70
        ? "L’ensemble de tes réponses dessine un fonctionnement adaptatif et intelligent, parfois au prix d’une perte de repères internes."
        : "Ton fonctionnement global montre une belle cohérence entre tes intentions et tes actes, ce qui constitue un socle solide pour ton épanouissement.",
      perspective: "Ton potentiel de naissance suggère une stabilité de fond, sur laquelle l’adaptation devrait venir se greffer — et non l’inverse.",
      exercise: {
        title: '“Point d’ancrage”',
        duration: '12 jours',
        steps: [
          'Identifie 1 valeur non négociable',
          'Identifie 1 décision récente qui s’en éloigne'
        ],
        objective: 'Recréer un axe interne stable.'
      },
      icon: Layout
    }
  ];
};
