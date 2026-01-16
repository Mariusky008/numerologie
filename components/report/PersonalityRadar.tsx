
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
  // Shorten labels for mobile
  const chartData = [
    { subject: 'Exp.', fullSubject: 'Expression', A: data.expression, fullMark: 9 },
    { subject: 'Âme', fullSubject: 'Élan Spirituel', A: data.soulUrge, fullMark: 9 },
    { subject: 'Moi', fullSubject: 'Moi Intime', A: data.personality, fullMark: 9 },
    { subject: 'Chemin', fullSubject: 'Chemin de Vie', A: data.lifePath, fullMark: 9 },
  ];

  return (
    <div className="w-full h-[350px] md:h-[400px] bg-white rounded-xl border border-stone-200 shadow-sm p-2 md:p-4 flex flex-col overflow-hidden">
      <h3 className="text-lg md:text-xl font-serif text-[#78350f] text-center mb-2 md:mb-4 shrink-0">Radar de Personnalité</h3>
      <div className="flex-1 min-h-0 relative w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <RadarChart cx="50%" cy="50%" outerRadius="60%" data={chartData}>
            <PolarGrid stroke="#e7e5e4" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#78350f', fontSize: 12, dy: 4 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} axisLine={false} />
            <Radar
              name="Profil"
              dataKey="A"
              stroke="#d97706"
              strokeWidth={2}
              fill="#d97706"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
