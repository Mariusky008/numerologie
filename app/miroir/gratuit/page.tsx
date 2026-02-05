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
import { calculateProfile, calculateGaps } from '@/lib/psy-mirror/engine';
import PersonalizedAnalysisOracle from '@/components/experience/PersonalizedAnalysisOracle';

export default function GratuitPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [scores, setScores] = useState<{ alignment: number, tension: string, color: string }>({ alignment: 34, tension: "MODÉRÉE", color: "text-orange-500" });

  useEffect(() => {
    const finalData = localStorage.getItem('psy_mirror_final_data');
    if (finalData) {
      try {
        const parsed = JSON.parse(finalData);
        const userInfo = parsed.user_info;
        
        // Cosmic Calculations
        const pathNum = calculateLifePathNumber(userInfo.birthDate);
        const pathData = getLifePathData(pathNum);
        const sunSignData = getSunSign(userInfo.birthDate);
        const moonSignData = getMoonSign(userInfo.birthDate, userInfo.birthTime);
        const ascendantData = getAscendant(userInfo.birthDate, userInfo.birthTime);
        const masterData = getChartMaster(ascendantData.name);

        // Score Calculations
        let calculatedAlignment = 34; // fallback
        if (parsed.moduleA_answers && parsed.moduleB_answers) {
          const selfProfile = calculateProfile(parsed.moduleA_answers);
          const behaviorProfile = calculateProfile(parsed.moduleB_answers);
          const { gaps } = calculateGaps(selfProfile, behaviorProfile);
          
          // Calculate max gap (dissonance)
          const maxGap = Math.max(...Object.values(gaps).map(g => Math.abs(g)));
          // Alignment is inverse of gap (clamped)
          calculatedAlignment = Math.max(0, Math.min(100, 100 - maxGap));
        }

        // Determine tension level based on alignment
        let tensionLevel = "MODÉRÉE";
        let tensionColor = "text-orange-500";
        if (calculatedAlignment < 40) {
          tensionLevel = "ÉLEVÉE";
          tensionColor = "text-red-500";
        } else if (calculatedAlignment > 70) {
          tensionLevel = "FAIBLE";
          tensionColor = "text-green-500";
        }

        setScores({
          alignment: Math.round(calculatedAlignment),
          tension: tensionLevel,
          color: tensionColor
        });

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
              <div className="text-white/60 text-lg md:text-xl font-light space-y-4">
                <p>
                  Les tests que tu viens de passer mettent en lumière une tension entre ton potentiel de départ et la manière dont tu t’adaptes aujourd’hui dans tes choix et tes réactions.
                </p>
                <p>
                  Cela ne signifie pas un problème, mais un écart fréquent entre potentiel et adaptation.
                </p>
              </div>
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
                    <h3 className="text-xl font-bold uppercase tracking-widest">Laboratoire des Réflexes</h3>
                    <p className="text-white/40 text-xs font-black">OBSERVATION DES RÉACTIONS SOUS PRESSION</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed italic">
                    "Tes temps de réaction et tes choix face à l’urgence montrent une hyper-vigilance qui génère une surcharge mentale dans la durée."
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Accumulation de tension décisionnelle",
                      "Réaction instinctive dominante sous pression",
                      "Fatigue mentale progressive"
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
                    <h3 className="text-xl font-bold uppercase tracking-widest">Analyse Comportementale</h3>
                    <p className="text-white/40 text-xs font-black">PROFIL PSY</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-white/70 leading-relaxed italic">
                    "Tes réponses aux scénarios indiquent une tension entre ton potentiel de création et ta mise en action actuelle."
                  </p>
                  <ul className="space-y-3">
                    {[
                      "Conflit de valeurs internes",
                      "Mécanismes de protection limitants",
                      "Écart entre vision et passage à l’action"
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
                  <Target className={`w-8 h-8 ${scores.color}`} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Tension décisionnelle</p>
                    <p className={`text-2xl font-bold italic ${scores.color}`}>{scores.tension}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black uppercase tracking-[0.2em] opacity-60">
                  <span>Alignement actuel estimé</span>
                  <span className={`text-right ${scores.color}`}>
                    {scores.alignment < 40 ? "FAIBLE" : scores.alignment < 70 ? "MODÉRÉ" : "BON"} ({scores.alignment}%)<br />
                    <span className="text-[10px] opacity-60">
                      {scores.alignment < 40 ? "(écart significatif)" : scores.alignment < 70 ? "(écart moyen)" : "(bon alignement)"}
                    </span>
                  </span>
                </div>
                <div className="h-4 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden p-1 border border-[#1A1C2E]/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${scores.alignment}%` }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${
                      scores.alignment < 40 ? "from-red-500 to-orange-400" : 
                      scores.alignment < 70 ? "from-orange-400 to-yellow-400" : 
                      "from-green-400 to-emerald-500"
                    }`}
                  />
                </div>
                <p className="text-sm text-[#1A1C2E]/60 leading-relaxed max-w-4xl italic">
                  * Ce type d’écart est fréquemment associé à une sensation de surcharge mentale, de perte de clarté ou de ralentissement intérieur.
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

          <p className="text-white/80 text-xl font-medium italic relative z-10 max-w-2xl mx-auto">
            C’est précisément cet écart — souvent invisible de l’intérieur — que le Miroir Intégral te permet de lire clairement.
          </p>

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
          <div className="space-y-16 relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl md:text-4xl font-serif font-bold italic">Ce que contient le Miroir Intégral</h3>
            </div>

            <div className="space-y-12 max-w-4xl mx-auto">
              {/* Voice Conversation Feature - HIGHLIGHTED */}
              <div className="space-y-8">
                <div className="p-8 md:p-12 rounded-[50px] border border-[#C9A24D]/30 bg-gradient-to-br from-[#C9A24D]/10 to-transparent text-left space-y-10">
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="w-20 h-20 rounded-3xl bg-[#C9A24D] flex items-center justify-center text-[#1A1C2E] shrink-0 shadow-[0_20px_40px_rgba(201,162,77,0.3)]">
                      <MessageSquare className="w-10 h-10" />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-2xl md:text-3xl font-bold">🗣️ Ton miroir te parle <span className="text-[#C9A24D]">(voix privée & interactive)</span> ⭐</h4>
                        <p className="text-white/80 text-lg leading-relaxed font-medium italic">
                          Échange vocalement avec ton miroir personnel. Il te parle de tes écarts, de tes tensions, et t’aide à mettre des mots clairs sur ce que tu ressens sans toujours savoir l’expliquer.
                        </p>
                      </div>
                      
                      <div className="pt-6 border-t border-white/10 space-y-4">
                        <p className="text-[#C9A24D] text-xs font-black uppercase tracking-widest">Tu peux lui poser des questions comme :</p>
                        <div className="grid sm:grid-cols-1 gap-3">
                          {[
                            "Pourquoi je me sens souvent freiné alors que je sais ce que je veux ?",
                            "Pourquoi je fatigue à force de m’adapter ?",
                            "Qu’est-ce qui bloque vraiment chez moi aujourd’hui ?"
                          ].map((q, i) => (
                            <div key={i} className="flex items-center gap-3 text-white/60 text-sm italic">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]" />
                              {q}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* The Personalized Analysis Oracle Component */}
                  <PersonalizedAnalysisOracle firstName={data.firstName} />
                </div>
              </div>

              {/* Other features */}
              <div className="grid md:grid-cols-2 gap-6 text-left">
                {[
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
                  <div key={i} className={`p-8 rounded-[40px] border border-white/10 ${item.color} flex flex-col gap-6 items-start hover:scale-[1.02] transition-transform group`}>
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-[#C9A24D] shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="text-white/60 leading-relaxed text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                <p className="text-white font-bold text-xl tracking-tight">49 € — Paiement sécurisé • Accès immédiat</p>
                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Analyse personnelle • Expérience unique</p>
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
