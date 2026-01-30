'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Star, 
  Activity, 
  Check, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Video, 
  Compass,
  AlertCircle,
  Cpu,
  Fingerprint,
  Layers,
  Sparkles,
  Lock,
  ArrowDown
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CrashTestLanding() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  } as any;

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 overflow-x-hidden">
      
      {/* 1. HERO — MOBILE-FIRST CRASH-TEST */}
      <section className="min-h-screen flex flex-col items-center justify-start pt-8 pb-12 px-6 relative overflow-hidden bg-white">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60%] bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.03),_transparent_70%)]"></div>
        </div>

        <div className="w-full max-w-[390px] z-10 flex flex-col gap-6 text-center h-full">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-3xl font-serif font-bold tracking-tight leading-tight text-[#1A1C2E]">
              Le Crash-Test <br />
              <span className="text-[#C9A24D] italic">de ton Destin</span>
            </h1>
            <p className="text-sm text-[#1A1C2E]/60 leading-relaxed px-4">
              Compare ton potentiel de naissance (astro + numérologie) <br />
              à ce que tes choix révèlent aujourd’hui.
            </p>
          </motion.div>

          {/* CENTRAL VISUAL (SPLIT) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative flex flex-col items-center py-4"
          >
            {/* The SVG Visual */}
            <div className="relative w-full aspect-[4/3] bg-[#FDFBF7] rounded-[40px] border border-[#1A1C2E]/5 overflow-hidden shadow-sm">
              <svg viewBox="0 0 400 300" className="w-full h-full">
                {/* Left Side: Innate Potential (Bright/Structured) */}
                <defs>
                  <linearGradient id="leftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C9A24D" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#C9A24D" stopOpacity="0.05" />
                  </linearGradient>
                  <filter id="blurFilter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                  </filter>
                </defs>
                
                <rect x="0" y="0" width="200" height="300" fill="url(#leftGrad)" />
                {/* Structured geometry on left */}
                <circle cx="100" cy="150" r="60" stroke="#C9A24D" strokeWidth="0.5" fill="none" opacity="0.5" />
                <path d="M100 80 L100 220 M40 150 L160 150" stroke="#C9A24D" strokeWidth="0.5" opacity="0.3" />
                <circle cx="100" cy="150" r="40" stroke="#C9A24D" strokeWidth="1" fill="none" />
                <path d="M70 120 L130 180 M130 120 L70 180" stroke="#C9A24D" strokeWidth="0.5" opacity="0.3" />

                {/* Right Side: Today's Identity (Fragmented/Blurred) */}
                <rect x="200" y="0" width="200" height="300" fill="#1A1C2E" fillOpacity="0.02" />
                {/* Fragmented geometry on right */}
                <g filter="url(#blurFilter)">
                  <path d="M250 100 L350 130 L320 220 L240 180 Z" stroke="#1A1C2E" strokeWidth="1" fill="none" opacity="0.2" />
                  <circle cx="300" cy="150" r="50" stroke="#1A1C2E" strokeWidth="0.5" fill="none" opacity="0.1" />
                  <path d="M280 80 L340 250" stroke="#1A1C2E" strokeWidth="2" opacity="0.05" />
                  <path d="M220 180 L380 140" stroke="#1A1C2E" strokeWidth="1" opacity="0.05" />
                </g>
                <path d="M260 120 L310 190 M330 110 L280 210" stroke="#1A1C2E" strokeWidth="0.5" opacity="0.1" />

                {/* Center Crash Line */}
                <line x1="200" y1="0" x2="200" y2="300" stroke="#1A1C2E" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.1" />
                
                {/* Lightning Bolt */}
                <motion.path 
                  animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.98, 1.02, 0.98] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  d="M200 80 L195 140 L205 160 L200 220" 
                  stroke="#C9A24D" 
                  strokeWidth="1.5" 
                  fill="none" 
                  strokeLinecap="round"
                />

                {/* "L'écart" Label in center */}
                <rect x="175" y="135" width="50" height="30" rx="15" fill="white" stroke="#C9A24D" strokeWidth="0.5" />
                <text x="200" y="154" textAnchor="middle" fill="#C9A24D" fontSize="10" fontWeight="900" style={{ letterSpacing: '1px' }}>ÉCART</text>
              </svg>

              {/* Micro-labels (Chips) overlay */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 px-4">
                <span className="bg-white/90 backdrop-blur shadow-sm border border-[#C9A24D]/20 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-[#C9A24D]">À la naissance</span>
                <span className="bg-white/90 backdrop-blur shadow-sm border border-[#1A1C2E]/10 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-[#1A1C2E]/60">Aujourd’hui</span>
                <span className="bg-[#C9A24D] shadow-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest text-white">L’écart</span>
              </div>
            </div>
          </motion.div>

          {/* Value Phrase */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-base text-[#1A1C2E] font-medium leading-relaxed px-2"
          >
            Parfois, l’adaptation a pris le dessus. <br />
            <span className="text-[#C9A24D]">On te montre où — et quoi faire.</span>
          </motion.p>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 pt-2"
          >
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="w-full relative inline-flex flex-col items-center gap-1 px-8 py-5 bg-[#1A1C2E] text-white rounded-[24px] font-bold shadow-xl active:scale-[0.98] transition-all overflow-hidden"
            >
              <span className="text-xl font-black tracking-tight">Faire mon Crash-Test</span>
            </button>
            <p className="text-[10px] text-[#1A1C2E]/40 font-bold uppercase tracking-widest">
              20 min • Dossier + vidéo • Sans diagnostic ni prédiction
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SECTION — LE PRINCIPE (MODERN CARDS) */}
      <section className="py-40 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto space-y-32">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.5em] mb-4">La Méthodologie</div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#1A1C2E]">Deux lectures. <br /><span className="text-[#C9A24D] italic">Une confrontation.</span></h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { 
                num: "01", 
                title: "Ton Empreinte", 
                desc: "Une lecture symbolique basée sur ta date de naissance. Ce qu’on dit souvent de ton potentiel.",
                icon: Fingerprint,
                color: "text-[#C9A24D]"
              },
              { 
                num: "02", 
                title: "Tes Réflexes", 
                desc: "Des mini-tests interactifs de décision, où tu fais des choix concrets, sans “bonne réponse”.",
                icon: Activity,
                color: "text-[#5B4B8A]"
              },
              { 
                num: "03", 
                title: "Le Choc", 
                desc: "Là où ce que tu crois être ne correspond pas toujours à ce que tu fais.",
                icon: Zap,
                color: "text-[#1A1C2E]"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="group relative p-12 rounded-[60px] bg-[#FDFBF7] border border-[#1A1C2E]/5 hover:border-[#C9A24D]/20 transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
              >
                <div className="absolute top-10 right-10 text-6xl font-black text-[#1A1C2E]/[0.03] group-hover:text-[#C9A24D]/10 transition-colors">
                  {item.num}
                </div>
                <div className={`w-16 h-16 rounded-[24px] bg-white flex items-center justify-center mb-10 shadow-sm ${item.color}`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6">{item.title}</h3>
                <p className="text-[#1A1C2E]/60 text-xl leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeIn} className="relative py-20 text-center">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A24D]/20 to-transparent"></div>
            <span className="relative z-10 bg-white px-10 text-3xl md:text-5xl font-serif italic text-[#C9A24D]">
              C’est là que la prise de conscience commence.
            </span>
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION — POURQUOI C’EST DIFFÉRENT (HIGH CONTRAST) */}
      <section className="py-40 px-6 bg-[#1A1C2E] text-white rounded-[100px] mx-4 md:mx-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#C9A24D]/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-5xl mx-auto space-y-24 relative z-10">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-serif font-bold leading-tight">
              Ce n’est pas un <br />
              <span className="text-[#C9A24D] italic underline underline-offset-8 decoration-white/10">horoscope de plus.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6">
            {[
              { text: "Ce n’est pas une prédiction", positive: false },
              { text: "Ce n’est pas un test de personnalité figé", positive: false },
              { text: "Ce n’est pas du développement personnel flou", positive: false },
              { text: "C’est une comparaison directe entre une lecture symbolique et tes comportements réels sous contrainte.", positive: true }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className={`group flex items-center gap-8 p-10 rounded-[40px] border transition-all duration-500 ${item.positive ? 'bg-[#C9A24D] border-[#C9A24D] shadow-[0_30px_60px_-15px_rgba(201,162,77,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.positive ? 'bg-white text-[#C9A24D]' : 'bg-white/10 text-white/30 group-hover:text-white/60 transition-colors'}`}>
                  {item.positive ? <Check className="w-6 h-6 font-bold" /> : <X className="w-6 h-6" />}
                </div>
                <span className={`text-2xl md:text-4xl ${item.positive ? 'font-bold text-[#1A1C2E]' : 'text-white/40 group-hover:text-white/80 transition-colors'}`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECTION — CE QUE TU DÉCOUVRES (ELEGANT LIST) */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-24">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.5em]">L'Output</div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Ce que révèle ton Crash-Test</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { text: "Ton écart principal entre potentiel et fonctionnement réel", icon: Zap },
              { text: "Ton style de réaction dominant face aux décisions", icon: Activity },
              { text: "Ton frein invisible le plus fréquent", icon: Lock },
              { text: "Une clé concrète pour réaligner les deux", icon: Sparkles },
              { text: "Un plan simple sur 7 jours, sans jargon", icon: Compass }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-8 p-10 rounded-[40px] bg-[#FDFBF7] border border-[#1A1C2E]/5 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl text-[#1A1C2E]/80 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center space-y-4 pt-10">
            <div className="inline-block p-10 rounded-[60px] bg-[#FDFBF7] border border-[#1A1C2E]/5">
              <p className="text-3xl font-serif font-bold mb-2">Pas de jugement. Pas d’étiquette.</p>
              <p className="text-2xl text-[#C9A24D] italic font-medium">Juste une lecture claire et exploitable.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. SECTION — LE FORMAT (PREMIUM DELIVERABLES) */}
      <section className="py-40 px-6 relative overflow-hidden bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto space-y-24 relative z-10">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-serif font-bold">Ce que tu reçois</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Dossier Personnalisé", desc: "Clair, structuré et complet.", icon: BookOpen, tag: "PDF 20+ pages" },
              { title: "Vidéo Explicative", desc: "6–7 minutes d'analyse profonde.", icon: Video, tag: "Accès Privé" },
              { title: "Plan d’Ajustement", desc: "Simple, actionnable immédiatement.", icon: Compass, tag: "Protocole 7 Jours" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="p-12 rounded-[60px] bg-white border border-[#1A1C2E]/5 shadow-sm hover:shadow-2xl transition-all duration-700 space-y-8 group"
              >
                <div className="w-20 h-20 bg-[#FDFBF7] rounded-[28px] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C9A24D] group-hover:text-white transition-all duration-500">
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-widest">{item.tag}</div>
                  <h3 className="text-3xl font-serif font-bold">{item.title}</h3>
                  <p className="text-[#1A1C2E]/50 text-xl leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto pt-20">
            <p className="text-4xl md:text-5xl font-serif italic text-[#1A1C2E] leading-tight">
              Tu ne lis pas ton destin. <br />
              <span className="text-[#C9A24D] not-italic font-bold tracking-tight">Tu observes comment tu fonctionnes vraiment.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. SECTION — POUR QUI / POUR QUI PAS (MINIMALIST) */}
      <section className="py-40 px-6 bg-white border-y border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-32">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-serif font-bold text-[#C9A24D]">C’est pour toi si :</h3>
              <div className="h-1 w-12 bg-[#C9A24D]/20"></div>
            </div>
            <div className="space-y-8">
              {[
                "Tu es curieux(se) de te comprendre autrement",
                "Tu aimes confronter les idées à la réalité",
                "Tu veux arrêter de tourner en rond"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-8 h-8 rounded-full bg-[#C9A24D]/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-2xl text-[#1A1C2E] font-medium leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-serif font-bold text-[#1A1C2E]/30">Ce n’est pas pour toi si :</h3>
              <div className="h-1 w-12 bg-[#1A1C2E]/10"></div>
            </div>
            <div className="space-y-8">
              {[
                "Tu cherches une prédiction magique",
                "Tu veux qu’on te dise qui tu es",
                "Tu veux une réponse toute faite"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-6 text-[#1A1C2E]/30">
                  <div className="w-8 h-8 rounded-full bg-[#1A1C2E]/5 flex items-center justify-center shrink-0 mt-1">
                    <X className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-medium leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. SECTION — CADRE & TRANSPARENCE (TRUST) */}
      <section className="py-32 px-6 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto bg-white p-16 md:p-24 rounded-[80px] border border-[#1A1C2E]/5 shadow-2xl shadow-black/[0.02] space-y-16">
          <motion.div {...fadeIn} className="flex items-center gap-4 justify-center text-[#1A1C2E]/30">
            <ShieldCheck className="w-8 h-8" />
            <h3 className="text-sm font-black uppercase tracking-[0.4em]">Cadre & Transparence</h3>
          </motion.div>

          <div className="grid gap-8">
            {[
              "Lecture symbolique + interactive",
              "Aucun diagnostic médical",
              "Aucun traitement, aucune prédiction",
              "Résultats influencés par le contexte et l’attention"
            ].map((text, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="flex items-center gap-6 text-xl text-[#1A1C2E]/50 font-medium"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A24D]/30"></div>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="space-y-6 pt-10 text-center border-t border-[#1A1C2E]/5">
            <p className="text-2xl font-bold text-[#1A1C2E]">👉 Outil de compréhension personnelle, rien de plus.</p>
            <p className="text-xl text-[#C9A24D] font-black uppercase tracking-widest">Et c’est déjà beaucoup.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL (HIGH IMPACT) */}
      <section className="py-60 px-6 text-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.15),_transparent_70%)]"></div>
        </div>

        <motion.div {...fadeIn} className="max-w-5xl mx-auto space-y-16 relative z-10">
          <h2 className="text-6xl md:text-9xl font-serif font-bold text-[#1A1C2E] leading-[0.9]">
            Prêt à confronter ton potentiel <br />
            <span className="text-[#C9A24D] italic underline decoration-[#C9A24D]/20 underline-offset-[16px]">à la réalité ?</span>
          </h2>

          <div className="space-y-10 pt-10">
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="group relative inline-flex flex-col items-center gap-4 px-16 py-10 bg-[#1A1C2E] text-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(26,28,46,0.4)] hover:shadow-[#C9A24D]/40 transition-all duration-700 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-3xl md:text-5xl font-bold relative z-10">👉 Accéder à mon Crash-Test</span>
              <div className="flex items-center gap-4 relative z-10">
                <span className="text-4xl md:text-6xl font-serif italic text-[#C9A24D]">29 €</span>
                <div className="h-8 w-px bg-white/20"></div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-60 text-left">Paiement sécurisé <br /> Accès immédiat</span>
              </div>
            </button>
            <p className="text-[#1A1C2E]/40 text-sm font-bold uppercase tracking-[0.4em]">Expérience Unique · Révélation Immédiate</p>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-[#FDFBF7] border-t border-[#1A1C2E]/5 text-center space-y-8">
        <div className="flex items-center justify-center gap-4 text-[#C9A24D]">
          <Zap className="w-6 h-6" />
          <div className="h-4 w-px bg-[#1A1C2E]/10"></div>
          <Fingerprint className="w-6 h-6" />
          <div className="h-4 w-px bg-[#1A1C2E]/10"></div>
          <Activity className="w-6 h-6" />
        </div>
        <div className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1A1C2E]/20">
          © {new Date().getFullYear()} MIROIR PSYCHOLOGIQUE · LE CRASH-TEST DU DESTIN
        </div>
      </footer>

    </div>
  );
}
