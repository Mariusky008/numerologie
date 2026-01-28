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
  Layout
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
    <div className="min-h-screen bg-[#08090F] text-[#FDFBF7] font-sans selection:bg-[#C9A24D]/30 pb-20 overflow-x-hidden">
      
      {/* 1. HERO REVEAL SECTION */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 relative border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5B4B8A]/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C9A24D]/10 blur-[120px] rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl z-10 text-center space-y-12"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <Eye className="w-4 h-4" />
            Analyse de Restitution V2
          </div>
          
          <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight leading-tight">
            Voici ton <span className="italic text-[#C9A24D]">vrai</span> reflet.
          </h1>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-8 md:p-12 rounded-[50px] shadow-2xl relative group max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#C9A24D] text-[#08090F] px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
              L'Écart Central
            </div>
            
            <p className="text-2xl md:text-4xl font-serif font-medium leading-relaxed italic text-white/90 mb-8">
              "{result.insights?.mirror_sentence}"
            </p>
            
            <div className="prose prose-invert max-w-none text-white/60 leading-relaxed text-lg font-light text-left">
              {result.insights?.mirror_full?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="mb-6 last:mb-0">{para.replace('### ', '')}</p>
              ))}
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-12 text-white/20"
          >
            <ChevronDown className="w-10 h-10 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE LABORATORY (DATA PROOF) */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-[#08090F] to-[#0F111A]">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Le Laboratoire des Réflexes</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">Preuves factuelles issues de vos épreuves de stress en temps réel.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {result.insights?.reflex_insights?.map((ri, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[45px] bg-white/5 border border-white/10 hover:border-[#C9A24D]/30 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  {ri.title.includes('Attention') && <Brain className="w-24 h-24" />}
                  {ri.title.includes('Rupture') && <Activity className="w-24 h-24" />}
                  {ri.title.includes('Risque') && <TrendingUp className="w-24 h-24" />}
                  {ri.title.includes('Agilité') && <Repeat className="w-24 h-24" />}
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">{ri.title}</div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight">{ri.observation}</h3>
                  
                  <div className="pt-8 border-t border-white/5">
                    <div className="flex items-center gap-2 text-white/30 mb-4">
                      <Target className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Entraînement Recommandé</span>
                    </div>
                    <p className="text-lg text-[#C9A24D] italic font-medium leading-relaxed">
                      "{ri.exercise}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE BLIND SPOT & LEVER (ACTION CENTER) */}
      <section className="py-32 px-6 bg-[#161925]/50 border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="space-y-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-widest">
              Point Critique
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Ton Angle Mort : <br />
              <span className="text-[#C9A24D] italic">{result.insights?.blind_spot_label}</span>
            </h2>
            <div className="prose prose-invert max-w-none text-white/50 leading-relaxed text-xl font-light">
              {result.insights?.blind_spot?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className={para.startsWith('**') ? "font-bold text-white/90" : "mb-6 last:mb-0"}>
                  {para.replace('### ', '')}
                </p>
              ))}
            </div>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-10 md:p-14 rounded-[50px] bg-[#C9A24D] text-[#08090F] shadow-[0_40px_80px_rgba(201,162,77,0.2)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
              <Zap className="w-48 h-48" />
            </div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.3em] opacity-60">
                <Target className="w-5 h-5" />
                Levier Prioritaire
              </div>
              <p className="text-2xl md:text-4xl font-serif font-bold leading-tight">
                {result.insights?.lever}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. THE 6 DIMENSIONS (DEEP DIVE) */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold italic">Analyse Dimensionnelle</h2>
            <p className="text-white/40 text-lg">Décomposition chirurgicale de votre mode opératoire.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {result.insights?.dimension_insights?.map((di) => (
              <div key={di.id} className="p-10 rounded-[45px] bg-white/5 border border-white/10 space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-2xl font-bold tracking-tight">{di.name}</h3>
                  <div className="px-4 py-1.5 bg-white/5 rounded-full text-[#C9A24D] font-bold text-xs tracking-widest border border-white/10">
                    {result.behavior_profile[di.id]}/100
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${result.behavior_profile[di.id]}%` }}
                      className="h-full bg-gradient-to-r from-[#C9A24D]/50 to-[#C9A24D]"
                    />
                  </div>
                  <p className="text-white/50 leading-relaxed font-light">
                    {di.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. THE 7-DAY ROADMAP */}
      <section className="py-32 px-6 bg-gradient-to-br from-[#1A1C2E] to-[#08090F] border-y border-white/5">
        <div className="max-w-4xl mx-auto space-y-20">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Protocole 7 Jours</h2>
            <p className="text-white/40 text-lg">7 micro-actions pour ancrer votre transformation.</p>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 hidden md:block"></div>
            <div className="grid gap-6">
              {result.insights?.plan_7_days?.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-8 p-8 rounded-[35px] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all relative z-10 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#C9A24D] text-[#08090F] flex items-center justify-center text-xl font-black shrink-0 shadow-[0_10px_20px_rgba(201,162,77,0.3)] group-hover:scale-110 transition-transform">
                    {step.day}
                  </div>
                  <div className="pt-2">
                    <span className="text-xl font-medium text-white/90 leading-tight block">{step.action}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE ORACLE (INTERACTIVE CHAT) */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto space-y-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.3em]">
              <Sparkles className="w-4 h-4" />
              Soutien Illimité
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Converser avec l'Oracle</h2>
            <p className="text-white/40 text-xl font-light max-w-2xl mx-auto">
              L'IA qui a analysé votre dossier est prête à répondre à vos questions et lever vos derniers blocages.
            </p>
          </div>

          <div className="p-4 bg-white/[0.02] border border-white/10 rounded-[60px] shadow-3xl">
            <PsyCoachChat psyResult={result} />
          </div>
        </div>
      </section>

      {/* FOOTER ACTIONS */}
      <section className="py-20 px-6 border-t border-white/5 bg-[#08090F] text-center space-y-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-2xl font-serif italic text-white/40 leading-relaxed">
            "{result.final_phrase}"
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="flex items-center gap-3 px-10 py-5 bg-white text-[#08090F] rounded-full font-bold hover:bg-[#FDFBF7] transition-all">
              <Download className="w-5 h-5" />
              Télécharger mon Dossier PDF
            </button>
            <button 
              onClick={() => router.push('/miroir')}
              className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 hover:text-[#C9A24D] transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
