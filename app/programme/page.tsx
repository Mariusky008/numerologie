'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  TrendingUp, 
  Target,
  Sparkles,
  PlayCircle,
  BookOpen,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PROGRAM_DATA } from '@/lib/programme/data';

export default function DashboardPage() {
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('completed_days');
    if (saved) setCompletedDays(JSON.parse(saved));
  }, []);
  
  // In a real app, these would come from the user's state/DB
  const currentMonthIndex = 0;
  const currentWeekIndex = 0;
  const month = PROGRAM_DATA[currentMonthIndex];
  const week = month.weeks[currentWeekIndex];
  
  // Find current day (first not completed)
  const currentDay = week.days.find(d => !completedDays.includes(d.id)) || week.days[0];
  
  const stats = [
    { label: 'Jours validés', value: `${completedDays.length} / 84`, icon: Calendar },
    { label: 'Semaines complétées', value: `${Math.floor(completedDays.length / 7)} / 12`, icon: TrendingUp },
    { label: 'Badges obtenus', value: '0', icon: Target },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* BRANDING HEADER */}
      <div className="text-center space-y-4">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[#C9A24D]">SYSTÈME D'ALIGNEMENT DÉCISION-ACTION</h2>
        <p className="text-2xl font-serif italic text-[#1A1C2E]/40">Décider et agir de manière cohérente avec sa structure personnelle.</p>
      </div>

      {/* 1. HERO / CURRENT STATUS */}
      <section className="relative p-10 md:p-16 rounded-[60px] bg-[#1A1C2E] text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A24D]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.4em]">
                <Sparkles className="w-4 h-4" />
                Cycle en cours
              </div>
              {currentDay.tensionLevel >= 4 && (
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-red-400/20 border border-red-400/30 text-red-400 text-[10px] font-black uppercase tracking-[0.4em]">
                  <Activity className="w-4 h-4" />
                  Haute Tension
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight">
                Mois {month.monthNumber} : <br />
                <span className="text-[#C9A24D]">{month.title}</span>
              </h1>
              <p className="text-xl text-white/60 font-light leading-relaxed">
                Semaine {week.weekNumber} : {week.title}
              </p>
            </div>

            <button 
              onClick={() => router.push(`/programme/planning`)}
              className="group inline-flex items-center gap-4 px-10 py-6 bg-[#C9A24D] text-[#1A1C2E] rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-[#C9A24D]/40"
            >
              <span>Accéder à ma semaine</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <div className="hidden lg:block relative aspect-square">
            <div className="absolute inset-0 bg-[#C9A24D]/5 rounded-full animate-pulse"></div>
            <div className="absolute inset-10 border border-white/5 rounded-full"></div>
            <div className="absolute inset-20 border border-[#C9A24D]/20 rounded-full"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-2">
                <span className="block text-6xl font-serif font-bold text-[#C9A24D]">
                  {Math.round((completedDays.length / 84) * 100)}%
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Progression Totale</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="p-8 rounded-[40px] bg-white border border-[#1A1C2E]/5 shadow-sm space-y-4 hover:shadow-xl transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#C9A24D] group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30 mb-1">{stat.label}</p>
              <p className="text-2xl font-serif font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 3. UP NEXT / TODAY'S TASK */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-serif font-bold italic">À faire aujourd'hui</h2>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Jour {currentDay.dayNumber}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Daily Video */}
          <div 
            onClick={() => router.push(`/programme/jour/${currentDay.id}`)}
            className="p-10 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-sm space-y-8 group hover:border-[#C9A24D]/30 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#C9A24D]">
                <PlayCircle className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/20">{currentDay.videoDuration} MIN</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold">{currentDay.title}</h3>
              <p className="text-[#1A1C2E]/60 leading-relaxed">
                Comprendre comment les automatismes structurent ton quotidien avant même ta première décision.
              </p>
            </div>
            <button className="w-full py-5 bg-[#1A1C2E] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#C9A24D] transition-colors">
              Regarder la vidéo
            </button>
          </div>

          {/* Daily Action & Friction */}
          <div className="space-y-6">
            <div 
              onClick={() => router.push(`/programme/jour/${currentDay.id}`)}
              className="p-10 rounded-[50px] bg-[#FDFBF7] border border-[#C9A24D]/20 shadow-sm space-y-8 group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#C9A24D] shadow-sm">
                  <BookOpen className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">Action du jour</span>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-serif font-bold">{currentDay.actionTitle}</h3>
                <p className="text-[#1A1C2E]/60 leading-relaxed line-clamp-2">
                  {currentDay.actionDescription}
                </p>
              </div>
              <button className="w-full py-5 border-2 border-[#1A1C2E] text-[#1A1C2E] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#1A1C2E] hover:text-white transition-all">
                Ouvrir mon journal
              </button>
            </div>

            {currentDay.frictionNote && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 rounded-[40px] bg-red-400/5 border border-red-400/20 flex gap-5"
              >
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-1" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Point de Friction Détecté</p>
                  <p className="text-sm text-[#1A1C2E]/60 italic">
                    {currentDay.frictionNote}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
