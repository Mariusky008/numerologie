'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Target,
  Sparkles,
  Activity,
  Brain,
  TrendingUp,
  Repeat,
  ChevronDown,
  Eye,
  ShieldCheck,
  Layout,
  MessageCircle,
  Clock
} from 'lucide-react';
import { PsyMirrorResult } from '@/lib/psy-mirror/types';
import { useRouter } from 'next/navigation';
import PsyCoachChat from '@/components/chat/PsyCoachChat';

export default function ResultPsyMirror() {
  const router = useRouter();
  const [result, setResult] = useState<PsyMirrorResult | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('psy_mirror_result');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (!parsed.insights?.dimension_insights) {
        localStorage.removeItem('psy_mirror_result');
        router.push('/miroir/experience');
        return;
      }
      setResult(parsed);
    } else {
      router.push('/miroir/experience');
    }
  }, [router]);

  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 pb-20 overflow-x-hidden">
      
      {/* 1. HERO REVEAL SECTION - LIGHTER & SOFTER */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center px-6 relative border-b border-[#1A1C2E]/5 overflow-hidden bg-gradient-to-b from-white to-[#FDFBF7]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5B4B8A]/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#C9A24D]/5 blur-[120px] rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl z-10 text-center space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 backdrop-blur-sm text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <Eye className="w-4 h-4" />
            Révélation du Miroir Psychologique
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] text-[#1A1C2E]">
            Voici ton <span className="italic text-[#C9A24D]">vrai</span> reflet.
          </h1>

          <div className="bg-white border border-[#1A1C2E]/5 p-8 md:p-14 rounded-[60px] shadow-[0_40px_100px_-20px_rgba(26,28,46,0.08)] relative group max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#C9A24D] text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              L'Analyse Centrale
            </div>
            
            <p className="text-2xl md:text-4xl font-serif font-medium leading-relaxed italic text-[#1A1C2E] mb-10">
              "{result.insights?.mirror_sentence}"
            </p>
            
            <div className="max-w-none text-[#1A1C2E] leading-relaxed text-lg md:text-xl font-normal text-left space-y-6">
              {result.insights?.mirror_full?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="last:mb-0">{para.replace('### ', '')}</p>
              ))}
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-12 text-[#1A1C2E]/30"
          >
            <ChevronDown className="w-12 h-12 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE LABORATORY - SOFT BLUE/GREY GRADIENT */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-[#FDFBF7] via-[#F0F2F5] to-[#FDFBF7]">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Le Laboratoire des Réflexes</h2>
            <p className="text-[#1A1C2E]/80 text-xl max-w-2xl mx-auto">Preuves factuelles issues de vos épreuves de stress en temps réel.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {result.insights?.reflex_insights?.map((ri, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 hover:shadow-2xl hover:shadow-[#1A1C2E]/5 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-[#1A1C2E]">
                  {ri.title.includes('Attention') && <Brain className="w-28 h-28" />}
                  {ri.title.includes('Rupture') && <Activity className="w-28 h-28" />}
                  {ri.title.includes('Risque') && <TrendingUp className="w-28 h-28" />}
                  {ri.title.includes('Agilité') && <Repeat className="w-28 h-28" />}
                </div>

                <div className="space-y-8 relative z-10">
                  <div className="text-[#C9A24D] text-xs font-bold uppercase tracking-[0.4em]">{ri.title}</div>
                  <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-[#1A1C2E]">{ri.observation}</h3>
                  
                  <div className="pt-10 border-t border-[#1A1C2E]/5">
                    <div className="flex items-center gap-3 text-[#1A1C2E]/40 mb-5">
                      <Target className="w-5 h-5" />
                      <span className="text-xs font-bold uppercase tracking-widest text-[#1A1C2E]/80">Protocole d'Entraînement</span>
                    </div>
                    <p className="text-xl text-[#5B4B8A] italic font-medium leading-relaxed">
                      "{ri.exercise}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE BLIND SPOT & LEVER - WARMER ACCENTS */}
      <section className="py-32 px-6 bg-[#1A1C2E]/[0.02] border-y border-[#1A1C2E]/5">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-red-600 text-[10px] font-bold uppercase tracking-widest border border-red-100">
              Point de Transformation
            </div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight text-[#1A1C2E]">
              Ton Angle Mort : <br />
              <span className="text-[#C9A24D] italic">{result.insights?.blind_spot_label}</span>
            </h2>
            <div className="text-[#1A1C2E] leading-relaxed text-xl md:text-2xl font-normal space-y-8">
              {result.insights?.blind_spot?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className={para.startsWith('**') ? "font-bold text-[#1A1C2E]" : ""}>
                  {para.replace('### ', '')}
                </p>
              ))}
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="p-12 md:p-16 rounded-[60px] bg-[#C9A24D] text-white shadow-[0_50px_100px_-20px_rgba(201,162,77,0.3)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
              <Zap className="w-56 h-56" />
            </div>
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.4em] opacity-80">
                <Target className="w-6 h-6" />
                Levier Prioritaire
              </div>
              <p className="text-3xl md:text-5xl font-serif font-bold leading-tight">
                {result.insights?.lever}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. THE 6 DIMENSIONS - CLEAN & SOPHISTICATED */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Analyse Dimensionnelle</h2>
            <p className="text-[#1A1C2E]/80 text-xl">Décomposition précise de votre mode opératoire.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {result.insights?.dimension_insights?.map((di) => (
              <div key={di.id} className="p-12 rounded-[50px] bg-white border border-[#1A1C2E]/10 shadow-sm space-y-8 hover:shadow-xl hover:shadow-[#1A1C2E]/5 transition-all">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-3xl font-bold tracking-tight text-[#1A1C2E]">{di.name}</h3>
                  <div className="px-5 py-2 bg-[#FDFBF7] rounded-full text-[#C9A24D] font-bold text-sm tracking-widest border border-[#C9A24D]/20">
                    {result.behavior_profile[di.id]}/100
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div className="h-2 w-full bg-[#1A1C2E]/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${result.behavior_profile[di.id]}%` }}
                      className="h-full bg-gradient-to-r from-[#C9A24D] to-[#D4B46B]"
                    />
                  </div>
                  <p className="text-[#1A1C2E] leading-relaxed font-normal text-lg">
                    {di.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE 7-DAY ROADMAP - SOFT PURPLE THEME */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#FDFBF7] to-[#F0F2F5] border-y border-[#1A1C2E]/5">
        <div className="max-w-4xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Protocole 7 Jours</h2>
            <p className="text-[#1A1C2E]/80 text-xl">Une action par jour pour ancrer le changement.</p>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[#1A1C2E]/10 hidden md:block"></div>
            <div className="grid gap-8">
              {result.insights?.plan_7_days?.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-10 p-10 rounded-[40px] bg-white border border-[#1A1C2E]/5 hover:shadow-xl transition-all relative z-10 group"
                >
                  <div className="w-16 h-16 rounded-[22px] bg-[#1A1C2E] text-white flex items-center justify-center text-2xl font-black shrink-0 shadow-xl group-hover:bg-[#C9A24D] transition-colors">
                    {step.day}
                  </div>
                  <div className="pt-3">
                    <span className="text-2xl font-medium text-[#1A1C2E] leading-tight block">{step.action}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE ORACLE - BRIGHT & INSPIRING */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Sparkles className="w-5 h-5" />
              Soutien Illimité
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#1A1C2E]">L'Oracle du Miroir</h2>
            <p className="text-[#1A1C2E]/80 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Discutez avec l'intelligence qui a analysé vos réflexes pour lever vos derniers blocages.
            </p>
          </div>

          <div className="p-2 bg-[#FDFBF7] border border-[#1A1C2E]/5 rounded-[70px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.05)]">
            <PsyCoachChat psyResult={result} />
          </div>
        </div>
      </section>

      {/* FINAL ACTIONS */}
      <section className="py-24 px-6 border-t border-[#1A1C2E]/5 bg-[#FDFBF7] text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <p className="text-3xl md:text-4xl font-serif italic text-[#1A1C2E]/30 leading-relaxed px-6">
            "{result.final_phrase}"
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <button className="w-full md:w-auto flex items-center justify-center gap-3 px-12 py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-lg hover:bg-[#2A2D45] transition-all shadow-xl">
              <Download className="w-6 h-6" />
              Télécharger mon Dossier PDF
            </button>
            <button 
              onClick={() => router.push('/miroir')}
              className="text-xs font-black uppercase tracking-[0.5em] text-[#1A1C2E]/30 hover:text-[#C9A24D] transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
