import { Scenario, QuizItem } from './types';

export const AUTO_PERCEPTION_ITEMS: QuizItem[] = [
  { 
    "item_id": "A01", 
    "prompt": "De manière générale, je me considère comme quelqu’un qui prend ses décisions…", 
    "options": [ 
      { "key": "A", "text": "Plutôt rapidement, pour avancer.", "weights": { "D1": 5 } }, 
      { "key": "B", "text": "Après réflexion, quand je suis suffisamment sûr(e).", "weights": { "D1": -4 } }, 
      { "key": "C", "text": "En fonction du contexte, parfois vite, parfois lentement.", "weights": { "D1": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A02", 
    "prompt": "Face à l’incertitude, je dirais que je suis quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "A besoin d’éléments clairs pour être à l’aise.", "weights": { "D2": -5 } }, 
      { "key": "B", "text": "Peut avancer même sans tout maîtriser.", "weights": { "D2": 5 } }, 
      { "key": "C", "text": "Tolère l’incertitude si l’enjeu en vaut la peine.", "weights": { "D2": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A03", 
    "prompt": "Je me perçois plutôt comme quelqu’un de…", 
    "options": [ 
      { "key": "A", "text": "Très organisé(e), avec besoin de structure.", "weights": { "D3": 5 } }, 
      { "key": "B", "text": "Assez souple, je m’adapte facilement.", "weights": { "D3": -4 } }, 
      { "key": "C", "text": "Structuré(e) quand c’est nécessaire, sinon flexible.", "weights": { "D3": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A04", 
    "prompt": "Quand il faut prendre position face aux autres, je me vois plutôt comme quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "Affirme son point de vue sans trop hésiter.", "weights": { "D4": 5 } }, 
      { "key": "B", "text": "Cherche l’accord et l’harmonie.", "weights": { "D4": -5 } }, 
      { "key": "C", "text": "S’adapte selon la relation et le contexte.", "weights": { "D4": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A05", 
    "prompt": "Sous pression ou stress, je me considère comme quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "Reste globalement calme et posé(e).", "weights": { "D5": -5 } }, 
      { "key": "B", "text": "Réagit vite, parfois de façon impulsive.", "weights": { "D5": 5 } }, 
      { "key": "C", "text": "Varie beaucoup selon les situations.", "weights": { "D5": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A06", 
    "prompt": "Dans ma façon de penser, je me décrirais comme plutôt…", 
    "options": [ 
      { "key": "A", "text": "Ouvert(e) au changement et aux nouvelles idées.", "weights": { "D6": 5 } }, 
      { "key": "B", "text": "Attaché(e) à ce qui a déjà fait ses preuves.", "weights": { "D6": -5 } }, 
      { "key": "C", "text": "Stable, mais capable d’évoluer si besoin.", "weights": { "D6": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A07", 
    "prompt": "Quand une situation devient floue ou complexe, j’ai tendance à me dire que je suis quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "Préfère attendre d’y voir plus clair.", "weights": { "D2": -3, "D1": -2 } }, 
      { "key": "B", "text": "Avance quand même pour débloquer la situation.", "weights": { "D2": 3, "D1": 2 } }, 
      { "key": "C", "text": "Analyse un peu puis décide.", "weights": { "D2": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A08", 
    "prompt": "Je me reconnais plutôt dans l’idée que je suis quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "Aime garder le contrôle des choses.", "weights": { "D3": 4 } }, 
      { "key": "B", "text": "Lâche prise assez facilement.", "weights": { "D3": -4 } }, 
      { "key": "C", "text": "Contrôle ce qui est important, pas le reste.", "weights": { "D3": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A09", 
    "prompt": "Dans mes relations, je me vois plutôt comme quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "Dit les choses franchement.", "weights": { "D4": 4 } }, 
      { "key": "B", "text": "Fait attention à ne pas froisser.", "weights": { "D4": -4 } }, 
      { "key": "C", "text": "Dose selon la situation.", "weights": { "D4": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A10", 
    "prompt": "Quand je dois faire un choix imparfait, je me considère comme quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "Préfère choisir et avancer.", "weights": { "D1": 4 } }, 
      { "key": "B", "text": "A du mal à choisir sans option satisfaisante.", "weights": { "D1": -4 } }, 
      { "key": "C", "text": "Cherche un compromis acceptable.", "weights": { "D1": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A11", 
    "prompt": "Face à un désaccord, je me perçois comme quelqu’un qui…", 
    "options": [ 
      { "key": "A", "text": "Affronte le sujet directement.", "weights": { "D1": 2, "D4": 2 } }, 
      { "key": "B", "text": "Évite tant que l’émotion est trop forte.", "weights": { "D5": 3, "D4": -2 } }, 
      { "key": "C", "text": "Attend le bon moment pour en parler.", "weights": { "D5": 1 } } 
    ] 
  }, 
  { 
    "item_id": "A12", 
    "prompt": "Globalement, je dirais que ma façon de fonctionner est…", 
    "options": [ 
      { "key": "A", "text": "Plutôt stable et cohérente.", "weights": { "D6": -3 } }, 
      { "key": "B", "text": "Plutôt adaptable et changeante.", "weights": { "D6": 3 } }, 
      { "key": "C", "text": "Stable sur le fond, adaptable sur la forme.", "weights": { "D6": 1 } } 
    ] 
  }
];

export const BEHAVIOR_SCENARIOS: Scenario[] = [
  {
    "scenario_id": "S01",
    "title": "Décision rapide avec infos incomplètes",
    "constraint": "Temps limité + informations manquantes",
    "steps": [
      {
        "step_id": "S01-1",
        "context": "On te demande une réponse en 60 secondes, mais tu n’as pas toutes les données.",
        "options": [
          { "key": "A", "text": "Je tranche avec ce que j’ai, puis je corrige après.", "weights": { "D1": 5, "D2": 3, "D6": 2 } },
          { "key": "B", "text": "Je demande 2 infos clés avant de répondre.", "weights": { "D1": -2, "D2": -3, "D3": 2 } },
          { "key": "C", "text": "Je dis que je reviens vers eux quand j’ai tout.", "weights": { "D1": -4, "D2": -4, "D3": 1 } }
        ]
      },
      {
        "step_id": "S01-2",
        "context": "Une personne insiste : 'Donne juste une direction'.",
        "options": [
          { "key": "A", "text": "Je propose une direction claire avec une marge d’ajustement.", "weights": { "D1": 4, "D2": 2, "D6": 2 } },
          { "key": "B", "text": "Je reformule les risques et je demande un arbitrage collectif.", "weights": { "D4": -3, "D2": -2 } },
          { "key": "C", "text": "Je refuse sans données et je reporte la décision.", "weights": { "D1": -3, "D2": -4, "D3": 2 } }
        ]
      },
      {
        "step_id": "S01-3",
        "context": "Après ton choix, tu apprends qu’un paramètre important était faux.",
        "options": [
          { "key": "A", "text": "Je corrige rapidement et j’explique factuellement.", "weights": { "D6": 4, "D5": -2, "D1": 1 } },
          { "key": "B", "text": "Je cherche la cause, puis je change le process pour éviter ça.", "weights": { "D3": 4, "D6": 1 } },
          { "key": "C", "text": "Je me tends et je crains le jugement des autres.", "weights": { "D4": -3, "D5": 3 } }
        ]
      },
      {
        "step_id": "S01-4",
        "context": "On te propose d’assumer publiquement la correction.",
        "options": [
          { "key": "A", "text": "Oui : je le fais, c’est plus clair pour tout le monde.", "weights": { "D4": 3, "D5": -2 } },
          { "key": "B", "text": "Je préfère que quelqu’un d’autre l’annonce.", "weights": { "D4": -4, "D5": 1 } },
          { "key": "C", "text": "Je l’annonce mais en insistant sur les limites d’info initiales.", "weights": { "D3": 2, "D2": -1, "D5": -1 } }
        ]
      }
    ]
  },
  {
    "scenario_id": "S02",
    "title": "Priorisation sous surcharge",
    "constraint": "Surcharge + interruptions",
    "steps": [
      {
        "step_id": "S02-1",
        "context": "Tu as 6 tâches urgentes et tu es interrompu(e) toutes les 5 minutes.",
        "options": [
          { "key": "A", "text": "Je fais une mini-priorisation et je protège 30 minutes.", "weights": { "D3": 4, "D1": 1, "D5": -1 } },
          { "key": "B", "text": "Je traite au fil de l’eau, une par une.", "weights": { "D6": 3, "D2": 2 } },
          { "key": "C", "text": "Je repousse et j’attends un meilleur moment.", "weights": { "D1": -3, "D5": 3, "D2": -2 } }
        ]
      },
      {
        "step_id": "S02-2",
        "context": "Une personne te demande 'juste 2 minutes'.",
        "options": [
          { "key": "A", "text": "J’accepte, pour maintenir la relation.", "weights": { "D4": -2, "D6": 1 } },
          { "key": "B", "text": "Je dis no et je reviens à l’heure prévue.", "weights": { "D4": 3, "D3": 2 } },
          { "key": "C", "text": "Je demande par écrit pour décider ensuite.", "weights": { "D3": 2, "D2": -1 } }
        ]
      },
      {
        "step_id": "S02-3",
        "context": "Tu te rends compte que tu ne finiras pas tout aujourd’hui.",
        "options": [
          { "key": "A", "text": "Je clarifie l’essentiel et j’assume le reste demain.", "weights": { "D2": 3, "D5": -2, "D1": 1 } },
          { "key": "B", "text": "Je rallonge la journée pour tout finir.", "weights": { "D3": 3, "D5": 2 } },
          { "key": "C", "text": "Je demande à quelqu’un de me dire ce qui compte le plus.", "weights": { "D4": -3, "D1": -1 } }
        ]
      },
      {
        "step_id": "S02-4",
        "context": "On te propose de déléguer une partie.",
        "options": [
          { "key": "A", "text": "Oui, je délègue et j’accepte que ce soit fait différemment.", "weights": { "D6": 4, "D3": -1 } },
          { "key": "B", "text": "Je délègue mais je contrôle chaque étape.", "weights": { "D3": 5, "D6": -2 } },
          { "key": "C", "text": "Je préfère garder la main, ça ira plus vite.", "weights": { "D3": 3, "D4": 1, "D6": -1 } }
        ]
      }
    ]
  },
  {
    "scenario_id": "S03",
    "title": "Feedback ambigu et interprétations",
    "constraint": "Ambiguïté + enjeu d’image",
    "steps": [
      {
        "step_id": "S03-1",
        "context": "Ton responsable te dit : 'C’est intéressant…' et passe à autre chose.",
        "options": [
          { "key": "A", "text": "Je demande : 'Qu’est-ce qui manque pour que ce soit validé ?'", "weights": { "D2": -3, "D3": 2, "D1": 1 } },
          { "key": "B", "text": "Je laisse passer et j’observe au prochain échange.", "weights": { "D2": 4, "D5": -1 } },
          { "key": "C", "text": "Je cogite et je me remets beaucoup en question.", "weights": { "D5": 3, "D4": -2, "D2": -1 } }
        ]
      },
      {
        "step_id": "S03-2",
        "context": "Le lendemain, tu vois qu’un collègue présente une idée proche.",
        "options": [
          { "key": "A", "text": "Je m’adapte : je repositionne mon idée pour la rendre unique.", "weights": { "D6": 4, "D2": 2 } },
          { "key": "B", "text": "Je veux clarifier tout de suite pour éviter une confusion.", "weights": { "D1": 2, "D3": 2, "D5": 1 } },
          { "key": "C", "text": "Je préfère éviter le conflit et je laisse faire.", "weights": { "D4": -2, "D5": 2, "D1": -2 } }
        ]
      },
      {
        "step_id": "S03-3",
        "context": "On te demande ton avis en public sur la proposition du collègue.",
        "options": [
          { "key": "A", "text": "Je donne un avis factuel et constructif.", "weights": { "D5": -2, "D3": 1, "D4": 1 } },
          { "key": "B", "text": "Je suis plutôt neutre pour ne pas m’exposer.", "weights": { "D4": -2, "D5": 1 } },
          { "key": "C", "text": "Je recadre et je rappelle ce que j’avais proposé.", "weights": { "D4": 3, "D1": 1, "D5": 1 } }
        ]
      },
      {
        "step_id": "S03-4",
        "context": "Après, on te propose un 1:1 pour 'en parler'.",
        "options": [
          { "key": "A", "text": "Oui, je clarifie calmement ce que je veux pour la suite.", "weights": { "D1": 2, "D5": -2, "D3": 1 } },
          { "key": "B", "text": "Je demande d’abord l’objectif du 1:1 par écrit.", "weights": { "D3": 2, "D2": -1 } },
          { "key": "C", "text": "Je repousse : je préfère attendre que ça se tasse.", "weights": { "D1": -2, "D5": 2, "D2": -2 } }
        ]
      }
    ]
  },
  {
    "scenario_id": "S04",
    "title": "Conflit relationnel (proche / équipe)",
    "constraint": "Charge émotionnelle + risque de tension",
    "steps": [
      {
        "step_id": "S04-1",
        "context": "Quelqu’un te fait une remarque injuste (selon toi) devant d’autres personnes.",
        "options": [
          { "key": "A", "text": "Je réponds tout de suite, sans attaquer, mais fermement.", "weights": { "D1": 3, "D4": 2, "D5": 1 } },
          { "key": "B", "text": "Je me tais et je reviens plus tard en privé.", "weights": { "D5": -1, "D1": -1, "D3": 1 } },
          { "key": "C", "text": "Je me sens touché(e) et je réagis plus vivement que prévu.", "weights": { "D5": 5, "D6": -1 } }
        ]
      },
      {
        "step_id": "S04-2",
        "context": "En privé, la personne te dit : 'Tu l’as mal pris'.",
        "options": [
          { "key": "A", "text": "Je reformule et je clarifie ce que j’ai compris.", "weights": { "D6": 3, "D5": -2 } },
          { "key": "B", "text": "Je demande qu’elle reconnaisse sa part, sinon ça n’avance pas.", "weights": { "D4": 2, "D3": 2, "D5": 1 } },
          { "key": "C", "text": "Je m’excuse vite pour éviter l’escalade.", "weights": { "D4": -4, "D5": 1 } }
        ]
      },
      {
        "step_id": "S04-3",
        "context": "Tu dois décider si tu continues la discussion maintenant ou plus tard.",
        "options": [
          { "key": "A", "text": "Maintenant : je veux régler pendant que c’est chaud.", "weights": { "D1": 3, "D5": 1 } },
          { "key": "B", "text": "Plus tard : je préfère revenir quand l’émotion est retombée.", "weights": { "D5": -3, "D2": 2 } },
          { "key": "C", "text": "Je propose un cadre : 10 minutes, puis pause.", "weights": { "D3": 3, "D5": -1 } }
        ]
      },
      {
        "step_id": "S04-4",
        "context": "Après l’échange, tu dois envoyer un message de clôture.",
        "options": [
          { "key": "A", "text": "Je résume les accords et les prochaines étapes.", "weights": { "D3": 3, "D1": 1 } },
          { "key": "B", "text": "Je laisse retomber, pas besoin d’en rajouter.", "weights": { "D2": 2, "D6": 1 } },
          { "key": "C", "text": "Je cherche à être rassuré(e) sur ce que l’autre pense de moi.", "weights": { "D4": -4, "D5": 2 } }
        ]
      }
    ]
  },
  {
    "scenario_id": "S05",
    "title": "Projet flou : démarrer sans certitude",
    "constraint": "Objectifs vagues + besoin de structuration",
    "steps": [
      {
        "step_id": "S05-1",
        "context": "On te confie un projet avec un objectif flou : 'Améliorer l’expérience client'.",
        "options": [
          { "key": "A", "text": "Je demande des critères précis de réussite avant de bouger.", "weights": { "D2": -3, "D3": 3, "D1": -1 } },
          { "key": "B", "text": "Je lance une petite action test pour apprendre vite.", "weights": { "D6": 4, "D2": 3, "D1": 1 } },
          { "key": "C", "text": "Je crée un plan complet et je le fais valider.", "weights": { "D3": 5, "D4": -1, "D6": -1 } }
        ]
      },
      {
        "step_id": "S05-2",
        "context": "Au bout de 2 jours, les retours sont contradictoires.",
        "options": [
          { "key": "A", "text": "Je tolère l’ambiguïté et je cherche un pattern.", "weights": { "D2": 4, "D6": 2 } },
          { "key": "B", "text": "Je veux un arbitrage : 'On choisit une direction'.", "weights": { "D1": 2, "D3": 2, "D2": -1 } },
          { "key": "C", "text": "Je doute et je ralentis pour éviter l’erreur.", "weights": { "D1": -2, "D2": -3, "D5": 2 } }
        ]
      },
      {
        "step_id": "S05-3",
        "context": "On te propose une idée 'pas parfaite' mais réalisable vite.",
        "options": [
          { "key": "A", "text": "Je la prends : vitesse > perfection.", "weights": { "D1": 4, "D2": 2 } },
          { "key": "B", "text": "Je l’améliore un peu avant de lancer.", "weights": { "D3": 2, "D6": 2 } },
          { "key": "C", "text": "Je refuse : si ce n’est pas solide, ça nuira.", "weights": { "D3": 2, "D2": -3, "D1": -1 } }
        ]
      },
      {
        "step_id": "S05-4",
        "context": "Une fois lancé, un imprévu remet en cause une partie du plan.",
        "options": [
          { "key": "A", "text": "Je pivote vite et j’assume le changement.", "weights": { "D6": 5, "D2": 2, "D5": -1 } },
          { "key": "B", "text": "Je stabilise d’abord, puis je change avec prudence.", "weights": { "D3": 3, "D1": -1, "D2": -1 } },
          { "key": "C", "text": "Je me crispe : j’ai besoin de reprendre le contrôle.", "weights": { "D3": 4, "D6": -2, "D5": 2 } }
        ]
      }
    ]
  },
  {
    "scenario_id": "S06",
    "title": "Décision sociale : validation vs autonomie",
    "constraint": "Enjeu d’image + pression sociale",
    "steps": [
      {
        "step_id": "S06-1",
        "context": "On te propose une opportunité. Tu as envie, mais ton entourage est sceptique.",
        "options": [
          { "key": "A", "text": "Je le fais si ça me semble cohérent, même sans validation.", "weights": { "D4": 5, "D2": 2 } },
          { "key": "B", "text": "Je cherche à convaincre l’entourage avant de décider.", "weights": { "D4": -4, "D3": 1 } },
          { "key": "C", "text": "Je reporte : je n’aime pas décider avec une tension relationnelle.", "weights": { "D4": -2, "D1": -2, "D5": 2 } }
        ]
      },
      {
        "step_id": "S06-2",
        "context": "La personne en face te met la pression : 'J’ai besoin d’une réponse ce soir'.",
        "options": [
          { "key": "A", "text": "Je tranche ce soir, je préfère décider que subir.", "weights": { "D1": 4, "D2": 2 } },
          { "key": "B", "text": "Je négocie 24h pour vérifier 2 points.", "weights": { "D3": 2, "D2": -2, "D1": -1 } },
          { "key": "C", "text": "Je dis non : la pression me fait douter.", "weights": { "D5": 2, "D2": -2, "D1": -1 } }
        ]
      },
      {
        "step_id": "S06-3",
        "context": "Un proche te dit : 'Tu vas te planter'.",
        "options": [
          { "key": "A", "text": "Je reste calme et je garde ma décision.", "weights": { "D5": -3, "D4": 3 } },
          { "key": "B", "text": "Je doute et je re-check tout.", "weights": { "D2": -3, "D3": 2, "D5": 2 } },
          { "key": "C", "text": "Je me ferme : je n’ai pas envie d’en parler.", "weights": { "D4": 2, "D5": 1 } }
        ]
      },
      {
        "step_id": "S06-4",
        "context": "Tu dois annoncer ta décision.",
        "options": [
          { "key": "A", "text": "Je l’annonce clairement, sans me justifier longuement.", "weights": { "D4": 4, "D1": 1, "D5": -1 } },
          { "key": "B", "text": "Je l’annonce en cherchant l’accord et l’apaisement.", "weights": { "D4": -3, "D5": 1 } },
          { "key": "C", "text": "Je donne beaucoup d’explications pour éviter d’être jugé(e).", "weights": { "D3": 2, "D4": -2, "D5": 2 } }
        ]
      }
    ]
  }
];
