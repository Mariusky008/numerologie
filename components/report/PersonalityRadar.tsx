
'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface PersonalityRadarProps {
  data: {
    expression: number;
    soulUrge: number;
    personality: number;
    lifePath: number;
  };
}

export default function PersonalityRadar({ data }: PersonalityRadarProps) {
  const chartData = [
    { subject: 'Expression', A: data.expression, fullMark: 9 },
    { subject: 'Élan Spirituel', A: data.soulUrge, fullMark: 9 },
    { subject: 'Moi Intime', A: data.personality, fullMark: 9 },
    { subject: 'Chemin de Vie', A: data.lifePath, fullMark: 9 },
  ];

  return (
    <div className="w-full h-[400px] bg-stone-900/50 rounded-xl border border-amber-900/30 p-4">
      <h3 className="text-xl font-serif text-amber-100 text-center mb-4">Radar de Personnalité</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
          <PolarGrid stroke="#78350f" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#fcd34d', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} axisLine={false} />
          <Radar
            name="Profil"
            dataKey="A"
            stroke="#f59e0b"
            strokeWidth={2}
            fill="#f59e0b"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
