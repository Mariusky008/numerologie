
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
    { subject: 'Image', fullSubject: 'Image Sociale', A: data.personality, fullMark: 9 },
    { subject: 'Chemin', fullSubject: 'Chemin de Vie', A: data.lifePath, fullMark: 9 },
  ];

  return (
    <div className="w-full h-[350px] md:h-[400px] bg-white rounded-xl border border-[#C9A24D]/20 shadow-sm p-2 md:p-4 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-[250px] relative w-full">
        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
            <PolarGrid stroke="#FAF9F7" />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: '#2C2F4A', fontSize: 12, dy: 4 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 9]} tick={false} axisLine={false} />
            <Radar
              name="Profil"
              dataKey="A"
              stroke="#C9A24D"
              strokeWidth={2}
              fill="#C9A24D"
              fillOpacity={0.3}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
