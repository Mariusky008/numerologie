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
  Sparkles,
  AlertTriangle,
  Compass,
  Hammer
} from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { PROGRAM_DATA, DayContent } from '@/lib/programme/data';
import COPModule from '@/components/programme/COPModule';
import CAAModule from '@/components/programme/CAAModule';

export default function DayDetailPage() {
  const router = useRouter();
  const params = useParams();
  const dayId = params.id as string;

  const [day, setDay] = useState<DayContent | null>(null);
  const [journalText, setJournalText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [activeTab, setActiveTab] = useState<'video' | 'action' | 'journal' | 'cop' | 'caa'>('video');

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
      
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#1A1C2E]/40 hover:text-[#1A1C2E] transition-colors font-bold text-xs uppercase tracking-[0.2em]"
        >
          <ChevronLeft className="w-4 h-4" />
          Retour au planning
        </button>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/20">Tension :</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((l) => (
                <div 
                  key={l} 
                  className={`w-3 h-1 rounded-full ${l <= (day?.tensionLevel || 0) ? (day?.tensionLevel || 0) >= 4 ? 'bg-red-400' : 'bg-[#C9A24D]' : 'bg-[#1A1C2E]/5'}`} 
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
            Jour {day.dayNumber} — {day.theme}
          </div>
        </div>
      </div>

      <div className="space-y-4 text-center md:text-left">
        <h1 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">{day.title}</h1>
      </div>

      {/* Tabs / Navigation inside the page */}
      <div className="flex border-b border-[#1A1C2E]/5 overflow-x-auto no-scrollbar">
        {[
          { id: 'video', label: '1. Vidéo', icon: Play },
          { id: 'journal', label: '2. Mon Journal', icon: PenLine },
          { id: 'cop', label: '3. Décider (COP)', icon: Compass },
          { id: 'caa', label: '4. Agir (CAA)', icon: Hammer }
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
      <div className="space-y-12">
        <AnimatePresence mode="wait">
          {activeTab === 'video' && (
            <motion.div 
              key="video"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 p-8 md:p-16 space-y-10"
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
                    Cette vidéo pose les bases de ta réflexion aujourd'hui. Regarde-la attentivement avant de passer à ton journal.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveTab('journal')}
                  className="inline-flex items-center gap-4 text-[#C9A24D] font-bold text-sm uppercase tracking-widest hover:translate-x-2 transition-all"
                >
                  Ouvrir mon journal <ChevronLeft className="w-4 h-4 rotate-180" />
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
              className="bg-white rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 p-8 md:p-16 space-y-10"
            >
              <div className="space-y-8 max-w-3xl">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
                  Ancrage personnel
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-2xl font-serif font-bold italic leading-relaxed text-[#1A1C2E]/60">
                    {day.journalQuestion}
                  </h2>
                  <p className="text-sm text-[#1A1C2E]/40 italic">
                    Action recommandée : {day.actionDescription}
                  </p>
                </div>
                
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
              <div className="pt-10">
                <button 
                  onClick={() => setActiveTab('cop')}
                  className="inline-flex items-center gap-4 text-[#C9A24D] font-bold text-sm uppercase tracking-widest hover:translate-x-2 transition-all"
                >
                  Passer au Cadre d'Orientation <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'cop' && (
            <motion.div 
              key="cop"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <COPModule tensionLevel={day.tensionLevel} dayTheme={day.theme} />
              <div className="mt-10">
                <button 
                  onClick={() => setActiveTab('caa')}
                  className="inline-flex items-center gap-4 text-[#C9A24D] font-bold text-sm uppercase tracking-widest hover:translate-x-2 transition-all"
                >
                  Passer au Cadre d'Action <ChevronLeft className="w-4 h-4 rotate-180" />
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'caa' && (
            <motion.div 
              key="caa"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-12"
            >
              <CAAModule tensionLevel={day.tensionLevel} />
              
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-12 border-t border-[#1A1C2E]/5">
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
