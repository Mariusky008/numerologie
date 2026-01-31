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
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const fullText = data ? `Bonjour ${data.firstName}. À partir de tes réponses et de tes réflexes lors du test, on observe un décalage entre certains traits associés à ton potentiel (ce que la numérologie et l’astrologie mettent en lumière) et la manière dont tu réagis lorsque tu es sous pression. Il ne s’agit pas d’un problème, mais d’une tension fréquente entre ce que l’on porte profondément et ce que l’on met en place dans le quotidien. La suite de l’analyse permet de mieux comprendre comment ce décalage s’installe et comment le lire avec plus de clarté.` : '';

  useEffect(() => {
    if (isPlaying && !isFinished) {
      let i = 0;
      const timer = setInterval(() => {
        setDisplayedText(fullText.slice(0, i));
        i++;
        if (i > fullText.length) {
          clearInterval(timer);
          setIsFinished(true);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [isPlaying, fullText, isFinished]);

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

      {/* 1.5 DISSONANCE TEASER */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-[#1A1C2E] rounded-[60px] p-10 md:p-16 relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-[0.3em] border border-red-500/30">
                <Zap className="w-4 h-4" />
                Alerte Dissonance Détectée
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight italic">
                Ton potentiel cosmique est en <span className="text-red-400">conflit</span> avec tes réflexes.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Les tests de réflexes que tu viens de passer révèlent un décalage majeur entre ton <strong>{data.pathTitle}</strong> et la réalité de ton système nerveux aujourd'hui.
              </p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-4 border-b border-white/10 pb-4">
                <div className="w-12 h-12 bg-[#C9A24D]/20 rounded-xl flex items-center justify-center text-[#C9A24D]">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-40">Niveau de Stress Décisionnel</p>
                  <p className="text-xl font-bold text-red-400 italic">Anormalement Élevé</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs uppercase tracking-widest opacity-40 font-bold">
                  <span>Alignement Potentiel</span>
                  <span>34%</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "34%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-red-500"
                  />
                </div>
              </div>
              <p className="text-xs text-white/40 italic">
                * Ce décalage explique probablement votre sentiment de stagnation ou de fatigue mentale actuelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VIDEO - PREVIEW PERSONNALISÉE */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12 text-center">
        <motion.div {...fadeIn} className="space-y-4">
          <h2 className="text-3xl md:text-5xl font-serif font-bold">Aperçu de ton analyse profonde</h2>
          <p className="text-[#1A1C2E]/60 text-lg">Ton avatar a commencé à décoder tes mécanismes. Regarde ces quelques secondes pour comprendre l'enjeu.</p>
        </motion.div>

        <motion.div 
          {...fadeIn}
          className="relative min-h-[400px] md:min-h-[500px] bg-[#08090F] rounded-[40px] overflow-hidden shadow-2xl group cursor-pointer border-4 border-white flex items-center justify-center"
          onClick={() => setIsPlaying(true)}
        >
          {/* BACKGROUND AMBIENCE */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(201,162,77,0.1),_transparent_70%)]"></div>
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-24 -left-24 w-96 h-96 bg-[#5B4B8A] rounded-full blur-[100px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.05, 0.15, 0.05]
              }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#C9A24D] rounded-full blur-[120px]"
            />
          </div>

          {/* CONTENT */}
          {!isPlaying ? (
            <div className="relative z-10 flex flex-col items-center gap-8">
              <div className="relative">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-28 h-28 bg-[#C9A24D] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(201,162,77,0.4)]"
                >
                  <Play className="w-12 h-12 text-white fill-current" />
                </motion.div>
                <div className="absolute -inset-4 border border-[#C9A24D]/30 rounded-full animate-ping"></div>
              </div>
              <div className="space-y-3">
                <p className="text-[#C9A24D] font-black uppercase tracking-[0.4em] text-xs">Analyse comportementale IA</p>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">Durée de l'extrait : 30 secondes</p>
              </div>
            </div>
          ) : (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 md:p-16 text-center space-y-10">
              {/* VIDEO INTERFACE ELEMENTS */}
              <div className="absolute top-8 left-8 flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Live decoding...</span>
              </div>
              <div className="absolute top-8 right-8">
                <Brain className="w-6 h-6 text-white/20" />
              </div>

              <div className="flex-1 flex items-center justify-center max-w-3xl mx-auto">
                <motion.p 
                  className="text-white font-serif italic text-xl md:text-3xl leading-relaxed"
                >
                  {displayedText}
                  <motion.span 
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-1 h-8 md:h-10 bg-[#C9A24D] ml-2 align-middle"
                  />
                </motion.p>
              </div>

              <AnimatePresence>
                {isFinished && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 pt-4"
                  >
                    <div className="flex justify-center gap-3">
                      <div className="w-2 h-2 bg-[#C9A24D] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#C9A24D] rounded-full"></div>
                      <div className="w-2 h-2 bg-[#C9A24D] rounded-full"></div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push('/miroir/checkout');
                      }}
                      className="group flex items-center gap-4 px-10 py-5 bg-[#C9A24D] text-white rounded-full text-lg font-bold transition-all shadow-2xl hover:scale-105 active:scale-95"
                    >
                      Débloquer l'analyse complète
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>

        <p className="text-[#1A1C2E]/40 text-sm italic">
          * Cet extrait est généré en temps réel par notre moteur d'analyse comportementale.
        </p>
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

          <div className="grid md:grid-cols-2 gap-6 relative z-10 text-left">
            {[
              { text: "Rapport Intégral de 40 pages (PDF)", icon: BookOpen, desc: "Numérologie, Astro & Analyse Labo fusionnés." },
              { text: "Coaching Vocal Privé avec l'IA", icon: MessageSquare, desc: "Pose toutes tes questions à ton miroir." },
              { text: "Vidéo d'Analyse Comportementale", icon: VideoIcon, desc: "7 minutes pour comprendre tes réflexes." },
              { text: "Plan d'Action 'Réalignement'", icon: ShieldCheck, desc: "7 jours pour retrouver ta trajectoire." }
            ].map((benefit, i) => (
              <div key={i} className="flex flex-col gap-2 bg-white/5 p-8 rounded-[40px] border border-white/10 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                    <benefit.icon className="w-5 h-5" />
                  </div>
                  <span className="text-lg font-bold">{benefit.text}</span>
                </div>
                <p className="text-white/40 text-sm ml-14">{benefit.desc}</p>
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
            <div className="flex flex-col items-center gap-2">
              <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">Accès immédiat après paiement • Rapport unique au monde</p>
              <div className="flex gap-4 opacity-20">
                {/* Simplified payment icons */}
                <div className="h-6 w-10 bg-white rounded-md"></div>
                <div className="h-6 w-10 bg-white rounded-md"></div>
                <div className="h-6 w-10 bg-white rounded-md"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
