import { PROGRAM_DATA } from '@/lib/programme/data';
import DayDetailClient from '@/components/programme/DayDetailClient';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const params = [];
  for (const month of PROGRAM_DATA) {
    for (const week of month.weeks) {
      for (const day of week.days) {
        params.push({ id: day.id });
      }
    }
  }
  return params;
}

export default async function DayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find day in PROGRAM_DATA
  let foundDay = null;
  let monthNumber = 0;
  let weekNumber = 0;

  for (const month of PROGRAM_DATA) {
    for (const week of month.weeks) {
      const day = week.days.find(d => d.id === id);
      if (day) {
        foundDay = day;
        monthNumber = month.monthNumber;
        weekNumber = week.weekNumber;
        break;
      }
    }
    if (foundDay) break;
  }

  if (!foundDay) {
    notFound();
  }

  return (
    <DayDetailClient 
      day={foundDay} 
      monthNumber={monthNumber} 
      weekNumber={weekNumber} 
    />
  );
}
