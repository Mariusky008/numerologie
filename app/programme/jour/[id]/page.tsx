'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  BookOpen, 
  PenLine, 
  CheckCircle2, 
  ChevronLeft,
  Info,
  Save,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { PROGRAM_DATA, DayContent } from '@/lib/programme/data';

export default function DayDetailPage() {
  const router = useRouter();
  const params = useParams();
  const dayId = params.id as string;

  const [day, setDay] = useState<DayContent | null>(null);
  const [journalText, setJournalText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'action' | 'journal'>('video');

  useEffect(() => {
    // Find day in PROGRAM_DATA
    for (const month of PROGRAM_DATA) {
      for (const week of month.weeks) {
        const found = week.days.find(d => d.id === dayId);
        if (found) {
          setDay(found);
          // Load saved journal and validation state
          const savedJournal = localStorage.getItem(`journal_${dayId}`);
          if (savedJournal) setJournalText(savedJournal);
          
          const completed = JSON.parse(localStorage.getItem('completed_days') || '[]');
          if (completed.includes(dayId)) setIsValidated(true);
          
          return;
        }
      }
    }
  }, [dayId]);

  const handleSaveJournal = () => {
    setIsSaving(true);
    localStorage.setItem(`journal_${dayId}`, journalText);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleValidate = () => {
    const completed = JSON.parse(localStorage.getItem('completed_days') || '[]');
    if (!completed.includes(dayId)) {
      const updated = [...completed, dayId];
      localStorage.setItem('completed_days', JSON.stringify(updated));
      setIsValidated(true);
      // Trigger confetti or special animation here
    }
  };

  if (!day) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-32">
      
      {/* Navigation & Header */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1A1C2E]/40 hover:text-[#1A1C2E] transition-colors font-bold text-xs uppercase tracking-[0.2em]"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour au planning
        </button>
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
          Jour {day.dayNumber} — {day.theme}
        </div>
      </div>

      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">{day.title}</h1>
      </div>

      {/* Tabs / Navigation inside the page */}
      <div className="flex border-b border-[#1A1C2E]/5 overflow-x-auto no-scrollbar">
        {[
          { id: 'video', label: '1. Vidéo', icon: Play },
          { id: 'action', label: '2. L\'Action', icon: BookOpen },
          { id: 'journal', label: '3. Mon Journal', icon: PenLine }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-8 py-6 border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-[#C9A24D] text-[#1A1C2E] bg-white' : 'border-transparent text-[#1A1C2E]/30 hover:text-[#1A1C2E]/60'}`}
          >
            <tab.icon className="w-5 h-5" />
            <span className="text-sm font-black uppercase tracking-widest">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Main Interaction Area */}
      <div className="bg-white rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 min-h-[500px] overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'video' && (
            <motion.div 
              key="video"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-16 space-y-10 flex-1 flex flex-col"
            >
              <div className="aspect-video bg-[#1A1C2E] rounded-[40px] flex items-center justify-center relative group overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <button className="w-24 h-24 rounded-full bg-[#C9A24D] text-[#1A1C2E] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl relative z-10">
                  <Play className="w-10 h-10 fill-current" />
                </button>
                <div className="absolute bottom-8 left-8 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-sm font-bold uppercase tracking-widest">{day.videoDuration} MIN</p>
                </div>
              </div>
              <div className="space-y-6 max-w-3xl">
                <div className="flex items-start gap-4 p-6 bg-[#F8F9FA] rounded-3xl border border-[#1A1C2E]/5">
                  <Info className="w-6 h-6 text-[#C9A24D] shrink-0 mt-1" />
                  <p className="text-lg text-[#1A1C2E]/60 leading-relaxed italic">
                    Cette vidéo pose les bases de ta réflexion aujourd'hui. Regarde-la attentivement avant de passer à l'action concrète.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('action')}
                  className="inline-flex items-center gap-4 text-[#C9A24D] font-bold text-sm uppercase tracking-widest hover:translate-x-2 transition-all"
                >
                  Passer à l'action <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'action' && (
            <motion.div 
              key="action"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-16 space-y-12 flex-1 flex flex-col"
            >
              <div className="space-y-8 max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 text-[#5B4B8A] text-[10px] font-black uppercase tracking-[0.3em]">
                  L'expérience concrète
                </div>
                <h2 className="text-4xl font-serif font-bold italic">{day.actionTitle}</h2>
                <div className="p-10 bg-[#FDFBF7] border border-[#C9A24D]/20 rounded-[40px] shadow-sm">
                  <p className="text-2xl text-[#1A1C2E]/80 leading-relaxed font-light">
                    {day.actionDescription}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#F8F9FA] rounded-3xl border border-[#1A1C2E]/5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Objectif</p>
                    <p className="text-sm font-medium">Identifier les répétitions automatiques de ton mental.</p>
                  </div>
                  <div className="p-6 bg-[#F8F9FA] rounded-3xl border border-[#1A1C2E]/5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Attention</p>
                    <p className="text-sm font-medium">Observe sans juger. Il n'y a pas de mauvaise observation.</p>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-10">
                <button 
                  onClick={() => setActiveTab('journal')}
                  className="w-full md:w-auto px-12 py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#C9A24D] transition-colors shadow-xl"
                >
                  Ouvrir mon journal d'observation
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'journal' && (
            <motion.div 
              key="journal"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-8 md:p-16 space-y-10 flex-1 flex flex-col"
            >
              <div className="space-y-8 max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
                  Ancrage personnel
                </div>
                <h2 className="text-2xl font-serif font-bold italic leading-relaxed text-[#1A1C2E]/60">
                  {day.journalQuestion}
                </h2>
                
                <div className="relative">
                  <textarea 
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    placeholder="Écris tes observations ici..."
                    className="w-full h-64 p-10 bg-[#FDFBF7] border border-[#1A1C2E]/10 rounded-[40px] text-xl font-light focus:outline-none focus:border-[#C9A24D] transition-colors resize-none placeholder:opacity-20"
                  />
                  <button 
                    onClick={handleSaveJournal}
                    disabled={isSaving}
                    className="absolute bottom-6 right-6 p-4 bg-white shadow-xl border border-[#1A1C2E]/5 rounded-2xl hover:scale-110 active:scale-95 transition-all text-[#C9A24D]"
                  >
                    {isSaving ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                        <Save className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <Save className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-auto pt-10 flex flex-col md:flex-row items-center gap-8">
                <button 
                  onClick={handleValidate}
                  disabled={isValidated || journalText.length < 10}
                  className={`w-full md:w-auto px-12 py-8 rounded-full font-bold text-lg uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-4 ${isValidated ? 'bg-[#C9A24D] text-[#1A1C2E]' : journalText.length < 10 ? 'bg-[#F8F9FA] text-[#1A1C2E]/20 cursor-not-allowed' : 'bg-[#1A1C2E] text-white hover:bg-[#C9A24D] active:scale-95'}`}
                >
                  {isValidated ? (
                    <>
                      <CheckCircle2 className="w-6 h-6" />
                      <span>Journée validée</span>
                    </>
                  ) : (
                    <span>J'ai terminé ma journée</span>
                  )}
                </button>
                {!isValidated && journalText.length < 10 && (
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">
                    Écris au moins 10 caractères pour valider
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Coach Quick Access */}
      <div className="p-10 rounded-[50px] bg-[#1A1C2E] text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-3xl bg-[#C9A24D] flex items-center justify-center text-[#1A1C2E] shadow-2xl">
            <MessageCircle className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold">Besoin d'une précision ?</h3>
            <p className="text-white/40 text-sm italic">Pose ta question au coach sur l'exercice d'aujourd'hui.</p>
          </div>
        </div>
        <button 
          onClick={() => router.push('/programme/coach')}
          className="px-10 py-5 border border-white/20 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all"
        >
          Ouvrir le chat
        </button>
      </div>

    </div>
  );
}
