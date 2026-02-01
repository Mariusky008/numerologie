'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Circle, 
  Lock, 
  PlayCircle, 
  PenLine, 
  ChevronRight,
  Sparkles,
  CalendarDays,
  Zap,
  Activity,
  AlertTriangle
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
  const currentWeek = currentMonth.weeks[0];

  // Point de Friction de la semaine (Simulé)
  const frictionPoint = {
    title: "Le Point de Friction Dominant",
    desc: "Cette semaine, ta tendance à l'analyse immédiate va être mise à l'épreuve par les exercices d'observation brute. Ton mental cherchera à expliquer avant de voir.",
    impact: "Impact : Élevé sur le Jour 4"
  };

  // Génération de l'onde de choc (background)
  const wavePath = useMemo(() => {
    const points = currentWeek.days.map((day, i) => {
      const x = (i * 100) / (currentWeek.days.length - 1);
      const y = 50 + (day.tensionLevel - 3) * 15; // Centré sur 50, varie de 20 à 80
      return `${x},${y}`;
    });
    return `M ${points.join(' L ')}`;
  }, [currentWeek]);

  return (
    <div className="max-w-7xl mx-auto space-y-16 pb-32 relative">
      
      {/* BACKGROUND WAVE (Echogramme) */}
      <div className="absolute top-1/2 left-0 w-full h-64 -translate-y-1/2 pointer-events-none opacity-[0.03] overflow-hidden hidden lg:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <motion.path
            d={wavePath}
            fill="none"
            stroke="#1A1C2E"
            strokeWidth="0.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          {currentWeek.days.map((day, i) => (
            <circle 
              key={i} 
              cx={(i * 100) / (currentWeek.days.length - 1)} 
              cy={50 + (day.tensionLevel - 3) * 15} 
              r="0.5" 
              fill="#C9A24D" 
            />
          ))}
        </svg>
      </div>

      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 relative z-10">
        <div className="space-y-6 flex-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.4em]">
            <Activity className="w-4 h-4" />
            ÉCHOGRAMME DE LA SEMAINE
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">
            Semaine {currentWeek.weekNumber} : <br />
            <span className="text-[#C9A24D]">{currentWeek.title}</span>
          </h1>
        </div>

        {/* POINT DE FRICTION */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:max-w-md p-8 bg-white border border-[#C9A24D]/20 rounded-[40px] shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/5 blur-3xl rounded-full"></div>
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-[#C9A24D]">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">{frictionPoint.title}</span>
            </div>
            <p className="text-[#1A1C2E]/60 text-sm leading-relaxed italic">
              « {frictionPoint.desc} »
            </p>
            <div className="pt-4 border-t border-[#1A1C2E]/5">
              <span className="text-[10px] font-black uppercase tracking-widest text-red-400">{frictionPoint.impact}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid of Days */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {currentWeek.days.map((day, index) => {
          const isCompleted = completedDays.includes(day.id);
          const isLocked = index > completedDays.length;
          
          return (
            <motion.div
              key={day.id}
              whileHover={isLocked ? {} : { y: -10 }}
              onClick={() => !isLocked && router.push(`/programme/jour/${day.id}`)}
              className={`relative group p-10 rounded-[60px] border transition-all duration-700 cursor-pointer overflow-hidden ${
                isCompleted 
                  ? 'bg-white border-[#C9A24D]/30 shadow-xl' 
                  : isLocked 
                    ? 'bg-transparent border-[#1A1C2E]/5' 
                    : 'bg-white border-[#1A1C2E]/10 shadow-sm hover:shadow-2xl hover:border-[#C9A24D]/50'
              }`}
            >
              {/* MORPHIC BLUR FOR LOCKED DAYS */}
              {isLocked && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="w-24 h-24 rounded-full bg-[#C9A24D]/10 blur-2xl absolute"
                  />
                  <Lock className="w-8 h-8 text-[#1A1C2E]/20 relative z-10" />
                  <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/20 relative z-10">FUTUR PROBABLE</span>
                </div>
              )}

              <div className="space-y-10 relative z-0">
                <div className="flex justify-between items-start">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${isCompleted ? 'bg-[#C9A24D] text-white' : 'bg-[#F8F9FA] text-[#1A1C2E]/30'}`}>
                    {isCompleted ? <CheckCircle2 className="w-7 h-7" /> : <Circle className="w-7 h-7" />}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/20">JOUR {day.dayNumber}</p>
                    <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${day.tensionLevel >= 4 ? 'text-red-400' : 'text-[#C9A24D]'}`}>
                      {day.tensionLevel >= 4 ? 'CRASH-TEST' : 'FLUX'}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-serif font-bold leading-tight group-hover:text-[#C9A24D] transition-colors">{day.title}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40">{day.theme}</p>
                </div>

                {/* TENSION INDICATOR (L'Indicateur de Tension) */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Tension d'observation</span>
                    <span className="text-[10px] font-serif font-bold text-[#1A1C2E]/60">{day.tensionLevel}/5</span>
                  </div>
                  <div className="h-1 w-full bg-[#F8F9FA] rounded-full overflow-hidden flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div 
                        key={level}
                        className={`h-full flex-1 rounded-full transition-all duration-1000 ${
                          level <= day.tensionLevel 
                            ? day.tensionLevel >= 4 ? 'bg-red-400' : 'bg-[#C9A24D]' 
                            : 'bg-[#1A1C2E]/5'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-[#1A1C2E]/5 flex items-center justify-between">
                  <div className="flex gap-3">
                    <PlayCircle className="w-5 h-5 text-[#1A1C2E]/20" />
                    <PenLine className="w-5 h-5 text-[#1A1C2E]/20" />
                  </div>
                  <div className="flex items-center gap-2 text-[#C9A24D] font-bold text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                    Explorer
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Motivational Footer */}
      <div className="p-16 rounded-[80px] bg-[#1A1C2E] text-white text-center space-y-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C9A24D]/10 blur-[100px] rounded-full"></div>
        <Sparkles className="w-10 h-10 text-[#C9A24D] mx-auto" />
        <h2 className="text-3xl md:text-5xl font-serif font-bold italic max-w-3xl mx-auto leading-tight">
          « Ton système de défense est ton meilleur informateur. »
        </h2>
        <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">
          Navigue dans la tension, ne cherche pas à l'éviter.
        </p>
      </div>

    </div>
  );
}

