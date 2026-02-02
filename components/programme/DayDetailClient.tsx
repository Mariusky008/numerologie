'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  PenLine, 
  CheckCircle2, 
  ChevronLeft,
  Info,
  Save, 
  MessageCircle, 
  AlertTriangle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DayContent } from '@/lib/programme/data';
import COPModule from '@/components/programme/COPModule';
import CAAModule from '@/components/programme/CAAModule';
import { ProgrammeService } from '@/lib/programme/service';
import { supabase } from '@/lib/supabase';

interface DayDetailClientProps {
  day: DayContent;
  monthNumber: number;
  weekNumber: number;
}

export default function DayDetailClient({ day, monthNumber, weekNumber }: DayDetailClientProps) {
  const router = useRouter();
  const dayId = day.id;

  const [journalText, setJournalText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [copOrientation, setCopOrientation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [coachFeedback, setCoachFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Load saved journal and validation state
    const savedJournal = localStorage.getItem(`journal_${dayId}`);
    if (savedJournal) setJournalText(savedJournal);
    
    const savedCoachFeedback = localStorage.getItem(`coach_feedback_${dayId}`);
    if (savedCoachFeedback) setCoachFeedback(savedCoachFeedback);
    
    const completed = JSON.parse(localStorage.getItem('completed_days') || '[]');
    if (completed.includes(dayId)) setIsValidated(true);
  }, [dayId]);

  const handleSaveJournal = async () => {
    if (!journalText.trim()) return;
    
    setIsSaving(true);
    setIsAnalyzing(true);
    
    try {
      // 1. Save locally
      localStorage.setItem(`journal_${dayId}`, journalText);

      // 2. Save to Supabase (if logged in)
      const { data: { session } } = await supabase.auth.getSession();
      
      // 3. Get Coach Feedback
      const response = await fetch('/api/programme/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            { role: 'user', content: `Voici ma réponse à l'exercice du jour (${day.journalQuestion}) : "${journalText}"` }
          ],
          context: {
            dayId,
            dayTitle: day.title,
            dayTheme: day.theme,
            weekNumber,
            monthNumber
          },
          userId: session?.user.id
        })
      });

      const data = await response.json();
      if (data.message) {
        setCoachFeedback(data.message);
        localStorage.setItem(`coach_feedback_${dayId}`, data.message);
        
        // 4. Update Supabase with both text and feedback
        if (session) {
          await ProgrammeService.saveJournalEntry(session.user.id, dayId, journalText, data.message);
        }
      } else if (session) {
        // Just save text if no feedback (fallback)
        await ProgrammeService.saveJournalEntry(session.user.id, dayId, journalText);
      }
    } catch (err) {
      console.error("Journal Save/Analysis Error:", err);
    } finally {
      setIsSaving(false);
      setIsAnalyzing(false);
    }
  };

  const handleValidate = () => {
    const completed = JSON.parse(localStorage.getItem('completed_days') || '[]');
    if (!completed.includes(dayId)) {
      const updated = [...completed, dayId];
      localStorage.setItem('completed_days', JSON.stringify(updated));
      setIsValidated(true);
    }
  };

  const getVimeoId = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const vimeoId = getVimeoId(day.videoUrl);

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
        <p className="text-[#C9A24D] font-bold text-sm uppercase tracking-[0.3em]">
          Ton Parcours — Semaine {weekNumber} / Mois {monthNumber}
        </p>
        <h1 className="text-4xl md:text-7xl font-serif font-bold italic leading-tight">{day.title}</h1>
        <p className="text-xl text-[#1A1C2E]/40 italic">Thème : {day.theme}</p>
      </div>

      {/* BLOC 1 — Programme du jour (classique) */}
      <section className="space-y-12">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#1A1C2E] text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
          Bloc 1 — Programme Quotidien
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12">
          {/* Vidéo */}
          <div className="bg-white rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 p-8 md:p-12 space-y-8">
            <div className="aspect-video bg-[#1A1C2E] rounded-[40px] flex items-center justify-center relative group overflow-hidden shadow-2xl">
              {isPlaying && vimeoId ? (
                <iframe
                  src={`https://player.vimeo.com/video/${vimeoId}?autoplay=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button 
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 rounded-full bg-[#C9A24D] text-[#1A1C2E] flex items-center justify-center hover:scale-110 transition-transform shadow-2xl relative z-10"
                  >
                    <Play className="w-8 h-8 fill-current" />
                  </button>
                  <div className="absolute bottom-8 left-8 text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-sm font-bold uppercase tracking-widest">{day.videoDuration} MIN</p>
                  </div>
                </>
              )}
            </div>
            <div className="space-y-4">
              {day.frictionNote && (
                <div className="p-6 bg-red-400/5 border border-red-400/20 rounded-3xl flex items-start gap-4">
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                  <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-400">Point de Friction Détecté</p>
                    <p className="text-sm text-[#1A1C2E]/60 italic leading-relaxed">
                      {day.frictionNote}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4 p-6 bg-[#F8F9FA] rounded-3xl border border-[#1A1C2E]/5">
                <Info className="w-6 h-6 text-[#C9A24D] shrink-0 mt-1" />
                <p className="text-lg text-[#1A1C2E]/60 leading-relaxed italic">
                  Cette vidéo pose les bases de ta réflexion aujourd'hui. Regarde-la attentivement avant de consigner tes observations.
                </p>
              </div>
            </div>
          </div>

          {/* Journal */}
          <div className="bg-white rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 p-8 md:p-12 space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
                Ancrage personnel
              </div>
              
              <h2 className="text-xl font-serif font-bold italic leading-relaxed text-[#1A1C2E]/60">
                {day.journalQuestion}
              </h2>
              
              <div className="relative">
                <textarea 
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Écris tes observations ici..."
                  className="w-full h-64 p-8 bg-[#FDFBF7] border border-[#1A1C2E]/10 rounded-[40px] text-lg font-light focus:outline-none focus:border-[#C9A24D] transition-colors resize-none placeholder:opacity-20"
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

              {/* Coach Intervention UI */}
              <AnimatePresence>
                {(isAnalyzing || coachFeedback) && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="p-8 rounded-[40px] bg-[#1A1C2E] text-white space-y-6 relative overflow-hidden shadow-2xl"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 blur-3xl rounded-full"></div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#C9A24D] flex items-center justify-center text-[#1A1C2E]">
                        <MessageCircle className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Intervention du Coach</p>
                        <h4 className="text-lg font-serif font-bold italic text-[#C9A24D]">Analyse de ton observation</h4>
                      </div>
                    </div>

                    <div className="relative min-h-[60px]">
                      {isAnalyzing ? (
                        <div className="flex flex-col gap-4">
                          <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse" />
                          <div className="h-4 bg-white/5 rounded-full w-1/2 animate-pulse" />
                          <div className="h-4 bg-white/5 rounded-full w-2/3 animate-pulse" />
                        </div>
                      ) : (
                        <p className="text-lg leading-relaxed font-light italic text-white/80">
                          {coachFeedback}
                        </p>
                      )}
                    </div>

                    {!isAnalyzing && (
                      <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#C9A24D]" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                          Continue vers le module COP pour orienter ton action.
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* BLOC 2 — COP */}
      <section className="space-y-8">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#1A1C2E] text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
          Bloc 2 — Cadre d’Orientation Personnelle (COP)
        </div>
        <COPModule 
          tensionLevel={day.tensionLevel} 
          dayTheme={day.theme} 
          onOrientationChange={setCopOrientation}
        />
      </section>

      {/* BLOC 3 — CAA */}
      <AnimatePresence>
        {copOrientation === 'Décider maintenant' && (
          <motion.section 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-8 overflow-hidden"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#1A1C2E] text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
              Bloc 3 — Cadre d’Action Ajustée (CAA)
            </div>
            <CAAModule tensionLevel={day.tensionLevel} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* BLOC 4 — Validation */}
      <section className="space-y-8 pt-12 border-t border-[#1A1C2E]/5">
        <div className="inline-flex items-center gap-3 px-6 py-2 bg-[#1A1C2E] text-white rounded-full text-[10px] font-black uppercase tracking-[0.4em]">
          Bloc 4 — Validation de la journée
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <button 
            onClick={handleValidate}
            disabled={isValidated || journalText.length < 10}
            className={`w-full md:w-auto px-16 py-8 rounded-full font-bold text-xl uppercase tracking-[0.2em] shadow-2xl transition-all flex items-center justify-center gap-4 ${isValidated ? 'bg-green-500 text-white' : journalText.length < 10 ? 'bg-[#F8F9FA] text-[#1A1C2E]/20 cursor-not-allowed' : 'bg-[#1A1C2E] text-white hover:bg-[#C9A24D] active:scale-95'}`}
          >
            {isValidated ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                <span>Journée terminée et validée</span>
              </>
            ) : (
              <>
                <span>J'ai terminé ma journée</span>
                <ArrowRight className="w-6 h-6" />
              </>
            )}
          </button>
          
          {!isValidated && journalText.length < 10 && (
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest animate-pulse">
              Complète ton journal (min. 10 car.) pour valider
            </p>
          )}
        </div>
      </section>

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
