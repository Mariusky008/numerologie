'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  TrendingUp, 
  Target,
  Sparkles,
  PlayCircle,
  BookOpen
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { PROGRAM_DATA } from '@/lib/programme/data';

export default function DashboardPage() {
  const router = useRouter();
  
  // In a real app, these would come from the user's state/DB
  const currentMonthIndex = 0;
  const currentWeekIndex = 0;
  const month = PROGRAM_DATA[currentMonthIndex];
  const week = month.weeks[currentWeekIndex];
  
  const stats = [
    { label: 'Jours validés', value: '0 / 84', icon: Calendar },
    { label: 'Semaines complétées', value: '0 / 12', icon: TrendingUp },
    { label: 'Badges obtenus', value: '0', icon: Target },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      
      {/* 1. HERO / CURRENT STATUS */}
      <section className="relative p-10 md:p-16 rounded-[60px] bg-[#1A1C2E] text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A24D]/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.4em]">
              <Sparkles className="w-4 h-4" />
              Cycle en cours
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
              onClick={() => router.push(`/programme/planning?week=${week.id}`)}
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
                <span className="block text-6xl font-serif font-bold text-[#C9A24D]">0%</span>
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
          <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Lundi — Jour 1</span>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Daily Video */}
          <div className="p-10 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-sm space-y-8 group hover:border-[#C9A24D]/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[#F8F9FA] flex items-center justify-center text-[#C9A24D]">
                <PlayCircle className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/20">08:45 MIN</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold">Le Poids de l'Habitude</h3>
              <p className="text-[#1A1C2E]/60 leading-relaxed">
                Comprendre comment les automatismes structurent ton quotidien avant même ta première décision.
              </p>
            </div>
            <button className="w-full py-5 bg-[#1A1C2E] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#C9A24D] transition-colors">
              Regarder la vidéo
            </button>
          </div>

          {/* Daily Action */}
          <div className="p-10 rounded-[50px] bg-[#FDFBF7] border border-[#C9A24D]/20 shadow-sm space-y-8 group">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#C9A24D] shadow-sm">
                <BookOpen className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">Action du jour</span>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-serif font-bold">Noter la première pensée</h3>
              <p className="text-[#1A1C2E]/60 leading-relaxed">
                Dès le réveil, sans juger, note la toute première pensée ou préoccupation qui traverse ton esprit.
              </p>
            </div>
            <button className="w-full py-5 border-2 border-[#1A1C2E] text-[#1A1C2E] rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#1A1C2E] hover:text-white transition-all">
              Ouvrir mon journal
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
