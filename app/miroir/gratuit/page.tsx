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

      {/* 3. CTA - LE DOSSIER COMPLET - REDESIGNED CONTENT */}
      <section className="py-20 px-6 max-w-5xl mx-auto space-y-16">
        <motion.div {...fadeIn} className="p-8 md:p-20 bg-[#1A1C2E] text-white rounded-[80px] text-center space-y-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/20 blur-[100px] rounded-full"></div>
          
          <div className="space-y-8 relative z-10">
            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight">
              Découvre le <br />
              <span className="text-[#C9A24D] italic">Miroir Intégral</span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-6 text-white/70 text-lg md:text-xl leading-relaxed font-light">
              <p>
                Le Crash-Test a mis en lumière un écart entre ton potentiel de naissance et la façon dont tu fonctionnes aujourd’hui.
              </p>
              <p>
                Le Miroir Intégral te permet de comprendre cet écart, d’en identifier les causes, et de repartir avec des clés concrètes pour retrouver plus de cohérence dans tes choix.
              </p>
            </div>
          </div>

          {/* Section: Ce que tu en retires */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[40px] p-8 md:p-12 space-y-10 relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-bold">Ce que tu en retires concrètement</h3>
              <p className="text-white/40 text-sm uppercase tracking-widest font-black">Après cette analyse, tu repars avec :</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {[
                "une lecture claire de tes mécanismes décisionnels actuels",
                "une meilleure compréhension de ce qui te désaligne aujourd’hui",
                "un cadre simple pour retrouver plus de clarté, d’élan et de stabilité intérieure"
              ].map((item, i) => (
                <div key={i} className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                    <Check className="w-6 h-6" />
                  </div>
                  <p className="text-white/80 leading-relaxed font-medium">{item}</p>
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] pt-4 border-t border-white/5 font-bold">
              (outil de compréhension personnelle — sans diagnostic ni prédiction)
            </p>
          </div>

          {/* Section: Contenu du Miroir */}
          <div className="space-y-12 relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif font-bold">Ce que contient le Miroir Intégral</h3>
            </div>

            <div className="grid md:grid-cols-1 gap-6 text-left max-w-4xl mx-auto">
              {[
                {
                  title: "🗣️ Conversation vocale privée avec l’IA ⭐",
                  desc: "Pose toutes tes questions et explore ton fonctionnement en profondeur, à ton rythme, de manière interactive et personnalisée.",
                  icon: MessageSquare,
                  color: "bg-gradient-to-br from-[#C9A24D]/20 to-[#C9A24D]/5"
                },
                {
                  title: "🧭 Plan d’Action “Réalignement” — 7 jours",
                  desc: "Des exercices simples pour observer, ajuster et commencer à réduire l’écart entre potentiel et fonctionnement réel.",
                  icon: ShieldCheck,
                  color: "bg-white/5"
                },
                {
                  title: "📘 Rapport Intégral personnalisé (≈ 40 pages — PDF)",
                  desc: "Numérologie, astrologie et analyse comportementale fusionnées dans une lecture structurée et cohérente.",
                  icon: BookOpen,
                  color: "bg-white/5"
                }
              ].map((item, i) => (
                <div key={i} className={`p-8 rounded-[40px] border border-white/10 ${item.color} flex flex-col md:flex-row gap-8 items-start hover:scale-[1.02] transition-transform group`}>
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#C9A24D] shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Pourquoi aller au bout */}
          <div className="max-w-2xl mx-auto space-y-6 relative z-10 pt-8">
            <h3 className="text-2xl font-serif font-bold italic text-[#C9A24D]">Pourquoi aller jusqu’au bout</h3>
            <div className="space-y-4 text-white/60 text-lg leading-relaxed font-light">
              <p>Tu n’achètes pas un rapport.</p>
              <p>
                Tu achètes une <span className="text-white font-bold">lecture claire de ton fonctionnement</span>, et un point de départ structuré pour retrouver plus de cohérence dans ta trajectoire.
              </p>
            </div>
          </div>

          <div className="pt-10 relative z-10 space-y-8">
            <button 
              onClick={() => router.push('/miroir/checkout')}
              className="group relative inline-flex flex-col items-center gap-2 px-12 md:px-20 py-8 md:py-10 bg-[#C9A24D] text-[#1A1C2E] rounded-full font-bold shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl md:text-4xl">Accéder à mon Miroir Intégral</span>
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            <div className="flex flex-col items-center gap-4">
              <div className="space-y-1">
                <p className="text-white font-bold text-xl tracking-tight">49 € — Paiement sécurisé</p>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Accès immédiat après paiement • Analyse personnelle • Expérience unique</p>
              </div>
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
