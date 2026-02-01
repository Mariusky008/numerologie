'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  PlayCircle, 
  PenLine, 
  ChevronRight,
  Sparkles,
  CalendarDays
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PROGRAM_DATA } from '@/lib/programme/data';

export default function PlanningPage() {
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  
  useEffect(() => {
    const saved = localStorage.getItem('completed_days');
    if (saved) setCompletedDays(JSON.parse(saved));
  }, []);

  const currentMonth = PROGRAM_DATA[0];
  const currentWeek = currentMonth.weeks[0]; // For now, focus on Week 1

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-32">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.4em]">
            <CalendarDays className="w-4 h-4" />
            PROGRAMME HEBDOMADAIRE
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">
            Semaine {currentWeek.weekNumber} : <br />
            <span className="text-[#C9A24D]">{currentWeek.title}</span>
          </h1>
          <p className="text-xl text-[#1A1C2E]/50 max-w-2xl font-light">
            {currentWeek.description}
          </p>
        </div>

        <div className="p-8 bg-[#1A1C2E] text-white rounded-[40px] space-y-4 min-w-[240px]">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Progression</span>
            <span className="text-2xl font-serif font-bold text-[#C9A24D]">
              {Math.round((completedDays.length / currentWeek.days.length) * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#C9A24D] transition-all duration-1000" 
              style={{ width: `${(completedDays.length / currentWeek.days.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentWeek.days.map((day, index) => {
          const isCompleted = completedDays.includes(day.id);
          const isLocked = index > completedDays.length; // Only next day is unlocked
          
          return (
            <motion.div
              key={day.id}
              whileHover={isLocked ? {} : { y: -5 }}
              onClick={() => !isLocked && router.push(`/programme/jour/${day.id}`)}
              className={`relative group p-8 rounded-[50px] border transition-all duration-500 cursor-pointer ${
                isCompleted 
                  ? 'bg-white border-[#C9A24D]/30 shadow-xl shadow-[#C9A24D]/5' 
                  : isLocked 
                    ? 'bg-white/50 border-[#1A1C2E]/5 grayscale opacity-40 cursor-not-allowed' 
                    : 'bg-white border-[#1A1C2E]/10 shadow-sm hover:shadow-2xl hover:border-[#C9A24D]/50'
              }`}
            >
              {isLocked && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/20 backdrop-blur-[2px] rounded-[50px]">
                  <Lock className="w-8 h-8 text-[#1A1C2E]/20" />
                </div>
              )}

              <div className="space-y-8 relative z-0">
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${isCompleted ? 'bg-[#C9A24D] text-white' : 'bg-[#F8F9FA] text-[#1A1C2E]/30'}`}>
                    {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/20">JOUR {day.dayNumber}</span>
                </div>

                <div className="space-y-3">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">{day.theme}</p>
                  <h3 className="text-xl font-serif font-bold leading-tight group-hover:text-[#C9A24D] transition-colors">{day.title}</h3>
                </div>

                <div className="pt-6 border-t border-[#1A1C2E]/5 flex items-center justify-between">
                  <div className="flex gap-2">
                    <PlayCircle className="w-4 h-4 text-[#1A1C2E]/20" />
                    <PenLine className="w-4 h-4 text-[#1A1C2E]/20" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#C9A24D] opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                </div>
              </div>
            </motion.div>
          );
        })}

        {/* Locked Next Weeks Placeholder */}
        {[2, 3, 4].map((w) => (
          <div 
            key={w}
            className="p-8 rounded-[50px] border border-dashed border-[#1A1C2E]/10 flex flex-col items-center justify-center gap-4 bg-transparent opacity-20"
          >
            <Lock className="w-6 h-6" />
            <span className="text-[10px] font-black uppercase tracking-widest">Semaine {w}</span>
          </div>
        ))}
      </div>

      {/* Social Proof / Motivation */}
      <div className="p-12 rounded-[60px] bg-[#FDFBF7] border border-[#C9A24D]/20 text-center space-y-6">
        <Sparkles className="w-8 h-8 text-[#C9A24D] mx-auto" />
        <p className="text-2xl font-serif italic text-[#1A1C2E]/60">
          « Chaque petite observation est une brique de plus vers ta propre clarté. »
        </p>
      </div>

    </div>
  );
}
