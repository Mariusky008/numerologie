'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Lock,
  MessageSquare,
  Sparkles,
  ArrowDown,
  Quote
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import CrashTestAnimation from '@/components/experience/CrashTestAnimation';

export default function CrashTestLanding() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  } as any;

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 overflow-x-hidden">
      
      {/* 1. HERO — COMPRÉHENSION IMMÉDIATE */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-white">
        <div className="max-w-[390px] md:max-w-3xl w-full z-10 text-center space-y-8 py-12">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E] text-white text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <Zap className="w-4 h-4 text-[#C9A24D]" />
            Le Crash-Test de ton Destin
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]"
          >
            Le Crash-Test <br />
            <span className="text-[#C9A24D] italic">de ton Destin</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-[#1A1C2E]/60 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            Compare ton potentiel de naissance (astrologie & numérologie) <br />
            à ce que tes choix révèlent aujourd’hui.
          </motion.p>

          {/* VISUEL ANIMÉ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative py-4"
          >
            <CrashTestAnimation />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4 pt-4"
          >
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="w-full md:w-auto group relative inline-flex items-center justify-center gap-4 px-10 py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-xl hover:bg-[#2A2D45] transition-all shadow-2xl active:scale-95"
            >
              Faire mon Crash-Test
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] md:text-xs text-[#1A1C2E]/40 font-bold uppercase tracking-widest">
              20 min • Dossier + vidéo • Sans diagnostic ni prédiction
            </p>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#1A1C2E]/10"
        >
          <ArrowDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* 2. COMMENT ÇA MARCHE (SIMPLIFIÉ) */}
      <section className="py-24 px-6 bg-[#FDFBF7] border-y border-[#1A1C2E]/5">
        <div className="max-w-5xl mx-auto space-y-16">
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl font-serif font-bold text-center">
            Deux lectures. Une confrontation.
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                num: "1", 
                title: "Ton Empreinte", 
                desc: "Lecture symbolique basée sur ta date, heure et lieu de naissance.",
                icon: Star,
                color: "bg-[#C9A24D]/10 text-[#C9A24D]"
              },
              { 
                num: "2", 
                title: "Tes Réflexes", 
                desc: "Mini-tests interactifs où tu fais des choix concrets.",
                icon: Activity,
                color: "bg-[#1A1C2E]/5 text-[#1A1C2E]"
              },
              { 
                num: "3", 
                title: "Le Choc", 
                desc: "On met en lumière l’écart entre potentiel et fonctionnement réel.",
                icon: Zap,
                color: "bg-[#5B4B8A]/10 text-[#5B4B8A]"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[40px] bg-white border border-[#1A1C2E]/5 space-y-6 shadow-sm"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold">{item.num}. {item.title}</h3>
                <p className="text-[#1A1C2E]/70 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREUVE SOCIALE (NOUVEAU) */}
      <section className="py-24 px-6 bg-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
          <motion.div {...fadeIn} className="space-y-4">
            <div className="flex justify-center gap-1 text-[#C9A24D]">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-6 h-6 fill-current" />)}
            </div>
            <p className="text-xl font-black text-[#1A1C2E]">4,6 / 5</p>
          </motion.div>

          <motion.div {...fadeIn} className="relative p-10 md:p-16 bg-[#FDFBF7] rounded-[50px] border border-[#1A1C2E]/5 italic shadow-2xl shadow-black/[0.02]">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-[#C9A24D]/10 rotate-180" />
            <p className="text-xl md:text-3xl text-[#1A1C2E] leading-relaxed relative z-10">
              « J’étais très sceptique au départ. <br className="hidden md:block" />
              Le crash-test m’a surtout montré un décalage <br className="hidden md:block" />
              que je n’avais jamais vu chez moi. »
            </p>
            <p className="mt-8 not-italic text-sm font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40">
              — Thomas, 34 ans
            </p>
          </motion.div>

          <motion.p {...fadeIn} className="text-sm font-bold uppercase tracking-[0.3em] text-[#C9A24D]">
            + de 1 200 personnes ont déjà fait l’expérience
          </motion.p>
        </div>
      </section>

      {/* 4. CE QUE TU DÉCOUVRES VRAIMENT (NOUVEAU) */}
      <section className="py-24 px-6 bg-[#1A1C2E] text-white rounded-[60px] mx-4 md:mx-12 my-12">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl font-serif font-bold text-center">
            Ce que révèle ton Crash-Test
          </motion.h2>

          <div className="grid gap-6">
            {[
              "Comprendre pourquoi certaines situations reviennent toujours",
              "Identifier les schémas que tu reproduis sans t’en rendre compte",
              "Voir où ton adaptation a pris le dessus sur ton potentiel",
              "Découvrir une clé concrète pour te réaligner"
            ].map((text, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-[#C9A24D] flex items-center justify-center shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-medium leading-tight">
                  {text}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeIn} className="text-center text-xl text-[#C9A24D] font-bold italic">
            👉 Transformer un “test” en “solution”.
          </motion.p>
        </div>
      </section>

      {/* 5. DÉTAIL DE L’OFFRE — VERSION BOOSTÉE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Ce que tu reçois</h2>
            <p className="text-xl text-[#1A1C2E]/50">Une expérience complète de compréhension profonde.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { 
                title: "Dossier personnalisé (~40 pages)", 
                desc: "Lecture croisée : astro, numérologie et psychologie décisionnelle.",
                icon: BookOpen,
                tag: "Indispensable"
              },
              { 
                title: "Vidéo explicative personnalisée", 
                desc: "Pour comprendre tes résultats sans effort de lecture (5–7 minutes).",
                icon: Video,
                tag: "Inclus"
              },
              { 
                title: "Accès à un Coach IA vocal", 
                desc: "Conversation interactive pour approfondir ta compréhension.",
                icon: MessageSquare,
                tag: "Exclusif"
              },
              { 
                title: "Une clé d’ajustement concrète", 
                desc: "Pour commencer à réaligner ton fonctionnement dès aujourd'hui.",
                icon: Compass,
                tag: "Action"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[40px] bg-[#FDFBF7] border border-[#1A1C2E]/5 space-y-6 group hover:shadow-xl transition-all"
              >
                <div className="flex justify-between items-start">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-[#C9A24D]">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30 bg-[#1A1C2E]/5 px-3 py-1 rounded-full">{item.tag}</span>
                </div>
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-[#1A1C2E]/60 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center pt-8">
            <p className="text-2xl font-serif italic text-[#1A1C2E]/80">
              Tu ne lis pas ton destin. <br className="md:hidden" />
              <span className="text-[#C9A24D] not-italic font-bold tracking-tight">Tu observes comment tu fonctionnes vraiment.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. CADRE DE CONFIANCE & ÉTHIQUE (NOUVEAU) */}
      <section className="py-24 px-6 bg-[#FDFBF7] border-y border-[#1A1C2E]/5">
        <div className="max-w-3xl mx-auto space-y-12">
          <motion.div {...fadeIn} className="flex items-center gap-4 justify-center text-[#1A1C2E]/30">
            <ShieldCheck className="w-8 h-8" />
            <h3 className="text-sm font-black uppercase tracking-[0.4em]">Cadre & Transparence</h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Lecture symbolique & interactive",
              "Aucun diagnostic médical",
              "Aucune prédiction",
              "Outil de compréhension personnelle"
            ].map((text, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="flex items-center gap-4 text-lg text-[#1A1C2E]/60 font-medium bg-white p-6 rounded-3xl border border-[#1A1C2E]/5"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-12 pt-8 opacity-40">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-[10px] font-black uppercase tracking-widest">Données protégées (RGPD)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL (UNIQUE) */}
      <section className="py-40 px-6 text-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.1),_transparent_70%)]"></div>
        </div>

        <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-bold">
            Prêt à confronter ton potentiel à la réalité ?
          </h2>

          <div className="space-y-8">
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="group relative inline-flex flex-col items-center gap-2 px-12 py-8 bg-[#C9A24D] text-white rounded-full font-bold shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95"
            >
              <span className="text-2xl md:text-3xl">Accéder à mon Crash-Test – 29 €</span>
              <span className="text-xs uppercase tracking-[0.2em] opacity-80">Accès immédiat • Expérience personnelle • Sans engagement</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* 8. DIMENSION PREMIUM (TRÈS DISCRÈTE) */}
      <footer className="py-20 px-6 bg-white text-center">
        <motion.p {...fadeIn} className="max-w-2xl mx-auto text-[11px] md:text-xs font-medium text-[#1A1C2E]/30 leading-relaxed uppercase tracking-[0.2em]">
          Pour certains, cette analyse devient le point de départ <br className="hidden md:block" />
          d’un travail plus approfondi, parfois jusqu’à un récit personnalisé.
        </motion.p>
        <div className="mt-16 text-[9px] font-black uppercase tracking-[0.5em] text-[#1A1C2E]/10">
          © {new Date().getFullYear()} MIROIR PSYCHOLOGIQUE · LE CRASH-TEST DU DESTIN
        </div>
      </footer>

    </div>
  );
}
