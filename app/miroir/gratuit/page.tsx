'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Check, 
  Star, 
  Moon, 
  Sun,
  ShieldCheck,
  BookOpen,
  MessageSquare,
  Video as VideoIcon,
  Compass,
  Zap,
  Target,
  Brain
} from 'lucide-react';
import { calculateLifePathNumber, getLifePathData, getSunSign, getMoonSign, getAscendant, getChartMaster } from '@/lib/psy-mirror/cosmic';

export default function GratuitPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const finalData = localStorage.getItem('psy_mirror_final_data');
    if (finalData) {
      try {
        const parsed = JSON.parse(finalData);
        const userInfo = parsed.user_info;
        
        const pathNum = calculateLifePathNumber(userInfo.birthDate);
        const pathData = getLifePathData(pathNum);
        const sunSignData = getSunSign(userInfo.birthDate);
        const moonSignData = getMoonSign(userInfo.birthDate, userInfo.birthTime);
        const ascendantData = getAscendant(userInfo.birthDate, userInfo.birthTime);
        const masterData = getChartMaster(ascendantData.name);

        setData({
          firstName: userInfo.firstName,
          pathNum,
          pathTitle: pathData.title,
          pathDesc: pathData.description,
          sunSign: sunSignData.name,
          sunElement: sunSignData.element,
          sunDesc: sunSignData.description,
          moonSign: moonSignData.name,
          moonElement: moonSignData.element,
          moonDesc: moonSignData.description,
          ascendant: ascendantData.name,
          ascendantDesc: ascendantData.description,
          masterPlanet: masterData.planet,
          masterHouse: masterData.house,
          masterDesc: masterData.description
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  if (!data) return null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  } as any;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans pb-20">
      
      {/* 1. HERO - GRATUITÉ IMMÉDIATE */}
      <section className="pt-20 pb-12 px-6 text-center space-y-8 bg-white rounded-b-[60px] shadow-sm">
        <motion.div {...fadeIn} className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.3em]">
            <Sparkles className="w-4 h-4" />
            Analyse Gratuite Partielle
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight">
            Bonjour {data.firstName}, <br />
            <span className="text-[#C9A24D] italic">voici tes premières clés.</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto pt-12">
          {[
            { 
              label: "Chemin de Vie", 
              value: data.pathNum, 
              title: data.pathTitle, 
              desc: data.pathDesc, 
              icon: Star, 
              color: "text-[#C9A24D] bg-[#C9A24D]/5" 
            },
            { 
              label: "Signe Solaire", 
              value: data.sunSign, 
              title: data.sunElement, 
              desc: data.sunDesc, 
              icon: Sun, 
              color: "text-[#1A1C2E] bg-[#1A1C2E]/5" 
            },
            { 
              label: "Ascendant", 
              value: data.ascendant, 
              title: "Personnalité", 
              desc: data.ascendantDesc, 
              icon: Moon, 
              color: "text-[#5B4B8A] bg-[#5B4B8A]/5" 
            },
            { 
              label: "Maison Maître", 
              value: data.masterPlanet, 
              title: `Maison ${data.masterHouse}`, 
              desc: data.masterDesc, 
              icon: Compass, 
              color: "text-[#A78BFA] bg-[#A78BFA]/5" 
            }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/30">{item.label}</p>
              </div>
              
              <div className="space-y-2">
                <p className="text-3xl font-serif font-bold tracking-tight">{item.value}</p>
                <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest">{item.title}</p>
              </div>

              <p className="text-sm leading-relaxed text-[#1A1C2E]/60 italic">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 1.5 DISSONANCE TEASER - REDESIGNED */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-[#1A1C2E] rounded-[60px] p-8 md:p-20 relative overflow-hidden text-white shadow-2xl">
          {/* Background effects */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#C9A24D]/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 space-y-16">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.4em] border border-red-500/30"
              >
                <Zap className="w-4 h-4" />
                ALERTE — ÉCART DE FONCTIONNEMENT OBSERVÉ
              </motion.div>
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight italic">
                Ton potentiel est <span className="text-red-400">en décalage</span> avec ta réalité.
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-light">
                Les tests que tu viens de passer révèlent une tension entre ton identité profonde et tes mécanismes d'adaptation actuels.
              </p>
            </div>

            {/* The Two Pillars */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Pillar 1: Reflexes */}
              <motion.div 
                {...fadeIn}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 space-y-8 group hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                    <Zap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest">Labo des Réflexes</h3>
                    <p className="text-white/40 text-xs font-black">ANALYSE BIOLOGIQUE</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed italic">
                    "Tes temps de réaction et tes choix sous pression montrent une hyper-vigilance qui sature ton système nerveux."
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Saturation décisionnelle détectée",
                      "Réaction instinctive vs Réflexion",
                      "Fatigue nerveuse accumulée"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Pillar 2: Psychology */}
              <motion.div 
                {...fadeIn}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 space-y-8 group hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D] shadow-[0_0_30px_rgba(201,162,77,0.2)]">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-widest">Profil Psy</h3>
                    <p className="text-white/40 text-xs font-black">ANALYSE COMPORTEMENTALE</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed italic">
                    "Tes réponses aux scénarios confirment un sentiment de stagnation malgré un potentiel de création élevé."
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Conflit de valeurs identifié",
                      "Schémas d'auto-sabotage",
                      "Écart entre vision et action"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Synthesis / Verdict */}
            <div className="bg-white rounded-[40px] p-10 md:p-12 text-[#1A1C2E] space-y-10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Verdict de l'analyse</p>
                  <h4 className="text-3xl font-serif font-bold italic">Convergence de la dissonance</h4>
                </div>
                <div className="flex items-center gap-4 bg-[#1A1C2E]/5 px-8 py-4 rounded-3xl border border-[#1A1C2E]/10">
                  <Target className="w-8 h-8 text-red-500" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Tension décisionnelle</p>
                    <p className="text-2xl font-bold text-red-500 italic">ÉLEVÉE</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-[0.2em] opacity-60">
                  <span>Alignement actuel estimé</span>
                  <span className="text-red-500">FAIBLE À MODÉRÉ (34%)</span>
                </div>
                <div className="h-4 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden p-1 border border-[#1A1C2E]/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "34%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                  />
                </div>
                <p className="text-sm text-[#1A1C2E]/60 leading-relaxed max-w-4xl italic">
                  * Ce décalage massif entre ton potentiel (numérologie/astro) et ton fonctionnement réel (labo/psy) est la source directe de ton sentiment de fatigue mentale et de stagnation actuelle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CTA - LE DOSSIER COMPLET */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="p-12 md:p-20 bg-[#1A1C2E] text-white rounded-[80px] text-center space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/20 blur-[100px] rounded-full"></div>
          
          <div className="space-y-6 relative z-10">
            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight">
              Découvre le miroir <br />
              <span className="text-[#C9A24D] italic">complet de ton âme.</span>
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Le Crash-Test a révélé l'écart. <span className="text-[#C9A24D] font-bold">Ne reste pas dans le flou.</span> Accède maintenant à ton dossier complet de 40 pages et à ta conversation vocale avec l'IA pour lever tes blocages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 relative z-10 text-left">
            {[
              { 
                text: "Rapport Intégral de 40 pages (PDF)", 
                icon: BookOpen, 
                desc: "Numérologie, Astro & Analyse Labo fusionnés.",
                preview: (
                  <div className="absolute right-4 bottom-4 w-24 h-32 bg-white/10 rounded-lg border border-white/20 overflow-hidden rotate-6 group-hover:rotate-12 transition-transform origin-bottom-right hidden sm:block">
                    <div className="w-full h-4 bg-white/20 mb-2"></div>
                    <div className="space-y-1 p-2">
                      <div className="w-full h-1 bg-white/10"></div>
                      <div className="w-4/5 h-1 bg-white/10"></div>
                      <div className="w-full h-1 bg-white/10"></div>
                      <div className="w-2/3 h-1 bg-white/10"></div>
                    </div>
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-[#C9A24D]/40 flex items-center justify-center">
                      <BookOpen className="w-3 h-3 text-white" />
                    </div>
                  </div>
                )
              },
              { 
                text: "Coaching Vocal Privé avec l'IA", 
                icon: MessageSquare, 
                desc: "Pose toutes tes questions à ton miroir.",
                preview: (
                  <div className="absolute right-6 bottom-6 flex items-end gap-1 h-12 hidden sm:flex">
                    {[0.4, 0.7, 0.3, 0.9, 0.5, 0.8, 0.4].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [h * 40, (1-h) * 40, h * 40] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-[#C9A24D]/40 rounded-full"
                      />
                    ))}
                  </div>
                )
              },
              { 
                text: "Vidéo d'Analyse Comportementale", 
                icon: VideoIcon, 
                desc: "7 minutes pour comprendre tes réflexes.",
                preview: (
                  <div className="absolute right-4 bottom-4 w-32 h-20 bg-black/40 rounded-xl border border-white/20 flex items-center justify-center hidden sm:flex overflow-hidden group-hover:scale-110 transition-transform">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="w-4 h-4 text-white fill-current" />
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 h-1 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        className="w-1/3 h-full bg-[#C9A24D]"
                      />
                    </div>
                  </div>
                )
              },
              { 
                text: "Plan d'Action 'Réalignement'", 
                icon: ShieldCheck, 
                desc: "7 jours pour retrouver ta trajectoire.",
                preview: (
                  <div className="absolute right-4 bottom-4 w-28 h-24 bg-white/5 rounded-xl border border-white/10 p-3 space-y-2 hidden sm:block group-hover:-translate-y-2 transition-transform">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm border border-[#C9A24D]/40 flex items-center justify-center">
                          {i < 3 && <Check className="w-2 h-2 text-[#C9A24D]" />}
                        </div>
                        <div className={`h-1 bg-white/10 rounded-full ${i === 1 ? 'w-full' : i === 2 ? 'w-4/5' : 'w-2/3'}`}></div>
                      </div>
                    ))}
                  </div>
                )
              }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col gap-2 bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-all group relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-2xl bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold">{benefit.text}</span>
                </div>
                <p className="text-white/40 text-sm ml-14 relative z-10 max-w-[200px]">{benefit.desc}</p>
                {benefit.preview}
              </div>
            ))}
          </div>

          <div className="pt-10 relative z-10 space-y-8">
            <button 
              onClick={() => router.push('/miroir/checkout')}
              className="group relative inline-flex flex-col items-center gap-2 px-12 md:px-20 py-8 md:py-10 bg-[#C9A24D] text-white rounded-full font-bold shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-4xl">Accéder à mon Miroir Intégral</span>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </div>
              <span className="text-sm md:text-lg opacity-90 tracking-widest">49 € — PAIEMENT SÉCURISÉ</span>
            </button>
            <div className="flex flex-col items-center gap-4">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Accès immédiat après paiement • Rapport unique au monde</p>
              <div className="flex gap-4 opacity-40">
                <div className="h-8 bg-white/10 rounded-lg px-3 flex items-center border border-white/10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 w-auto brightness-0 invert" alt="Visa" />
                </div>
                <div className="h-8 bg-white/10 rounded-lg px-3 flex items-center border border-white/10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-5 w-auto brightness-0 invert" alt="Mastercard" />
                </div>
                <div className="h-8 bg-white/10 rounded-lg px-3 flex items-center border border-white/10">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 w-auto brightness-0 invert" alt="PayPal" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
