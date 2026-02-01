export interface DayContent {
  id: string;
  dayNumber: number;
  title: string;
  theme: 'Comprendre' | 'Observer' | 'Mettre en lien' | 'Expérimenter' | 'Synthèse' | 'Rattrapage' | 'Repos';
  videoUrl: string;
  videoDuration: string;
  actionTitle: string;
  actionDescription: string;
  journalQuestion: string;
}

export interface WeekContent {
  id: string;
  weekNumber: number;
  title: string;
  description: string;
  days: DayContent[];
}

export interface MonthContent {
  id: string;
  monthNumber: number;
  title: string;
  weeks: WeekContent[];
}

export const PROGRAM_DATA: MonthContent[] = [
  {
    id: 'month-1',
    monthNumber: 1,
    title: 'Observer ses automatismes',
    weeks: [
      {
        id: 'm1-w1',
        weekNumber: 1,
        title: 'L\'Empreinte du Moment',
        description: 'Prendre conscience des schémas qui dirigent tes premières réactions de la journée.',
        days: [
          {
            id: 'm1-w1-d1',
            dayNumber: 1,
            title: 'Le Poids de l\'Habitude',
            theme: 'Comprendre',
            videoUrl: 'https://vimeo.com/example1',
            videoDuration: '08:45',
            actionTitle: 'Noter la première pensée',
            actionDescription: 'Dès le réveil, sans juger, note la toute première pensée ou préoccupation qui traverse ton esprit.',
            journalQuestion: 'Quelle est la tonalité dominante de tes premières pensées ce matin (inquiétude, excitation, neutralité) ?'
          },
          {
            id: 'm1-w1-d2',
            dayNumber: 2,
            title: 'Le Radar Matinal',
            theme: 'Observer',
            videoUrl: 'https://vimeo.com/example2',
            videoDuration: '06:12',
            actionTitle: 'Observer les rituels',
            actionDescription: 'Observe tes gestes entre le lever et le départ de chez toi. Lesquels fais-tu de manière totalement automatique ?',
            journalQuestion: 'Combien de tes actions matinales sont réellement choisies et non subies par l\'habitude ?'
          },
          {
            id: 'm1-w1-d3',
            dayNumber: 3,
            title: 'Connexion Corps-Esprit',
            theme: 'Mettre en lien',
            videoUrl: 'https://vimeo.com/example3',
            videoDuration: '10:20',
            actionTitle: 'Identifier une tension',
            actionDescription: 'À 14h, fais un scan rapide de ton corps. Où se loge la tension principale ?',
            journalQuestion: 'À quel événement de la matinée peux-tu relier cette tension physique ?'
          },
          {
            id: 'm1-w1-d4',
            dayNumber: 4,
            title: 'Le Micro-Changement',
            theme: 'Expérimenter',
            videoUrl: 'https://vimeo.com/example4',
            videoDuration: '07:30',
            actionTitle: 'Inverser un geste',
            actionDescription: 'Change un petit détail dans ta routine (ex: brossage de dents de la main opposée, changer de chemin).',
            journalQuestion: 'Qu\'as-tu ressenti au moment où l\'automatisme a été rompu ?'
          },
          {
            id: 'm1-w1-d5',
            dayNumber: 5,
            title: 'Bilan de Veille',
            theme: 'Synthèse',
            videoUrl: 'https://vimeo.com/example5',
            videoDuration: '12:00',
            actionTitle: 'Relire ses notes',
            actionDescription: 'Relis tes observations des 4 derniers jours et entoure les mots qui reviennent le plus.',
            journalQuestion: 'Quel est le "fil rouge" de tes automatismes cette semaine ?'
          },
          {
            id: 'm1-w1-d6',
            dayNumber: 6,
            title: 'Espace Libre',
            theme: 'Rattrapage',
            videoUrl: 'https://vimeo.com/example6',
            videoDuration: '05:00',
            actionTitle: 'Compléter le journal',
            actionDescription: 'Prends le temps de terminer une action que tu n\'as pas pu faire cette semaine.',
            journalQuestion: 'Quelle a été la journée la plus révélatrice pour toi ?'
          },
          {
            id: 'm1-w1-d7',
            dayNumber: 7,
            title: 'Repos & Intégration',
            theme: 'Repos',
            videoUrl: '',
            videoDuration: '00:00',
            actionTitle: 'Silence',
            actionDescription: 'Pas d\'exercice aujourd\'hui. Laisse simplement les informations décanter.',
            journalQuestion: 'Comment te sens-tu à l\'idée d\'entamer la deuxième semaine ?'
          }
        ]
      },
      {
        id: 'm1-w2',
        weekNumber: 2,
        title: 'Comprendre ses rythmes personnels',
        description: 'Identifier les fluctuations de ton énergie au cours de la journée.',
        days: [] // To be filled later
      }
    ]
  },
  {
    id: 'month-2',
    monthNumber: 2,
    title: 'Rapport à la décision',
    weeks: []
  },
  {
    id: 'month-3',
    monthNumber: 3,
    title: 'Vision & Stabilisation',
    weeks: []
  }
];
