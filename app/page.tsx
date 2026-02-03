'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  Activity, 
  Check, 
  X,
  Sparkles, 
  Brain,
  ShieldCheck,
  Target,
  ChevronDown,
  Eye,
  Lock,
  Layers,
  Fingerprint,
  Calendar
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

// --- COMPONENTS ---

const FloatingOracle = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none hidden md:flex"
  >
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-2xl text-[10px] font-bold text-[#C9A24D] uppercase tracking-widest shadow-2xl mb-2">
      L'Oracle t'accompagne
    </div>
    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#1A1C2E] via-[#5B4B8A] to-[#C9A24D] p-0.5 shadow-[0_0_30px_rgba(201,162,77,0.3)] animate-pulse">
      <div className="w-full h-full rounded-full bg-[#08090F] flex items-center justify-center overflow-hidden">
        <Brain className="w-8 h-8 text-[#C9A24D]" />
      </div>
    </div>
  </motion.div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="fixed top-0 left-0 right-0 z-[110] h-2 bg-white/5 backdrop-blur-md">
    <motion.div 
      initial={{ width: "1%" }}
      animate={{ width: `${Math.max(1, progress)}%` }}
      className="h-full bg-gradient-to-r from-[#C9A24D] via-[#5B4B8A] to-[#C9A24D] shadow-[0_0_15px_rgba(201,162,77,0.5)]"
    />
  </div>
);

const Tag = ({ text, color = "gold" }: { text: string, color?: "gold" | "purple" | "white" }) => {
  const colors = {
    gold: "bg-[#C9A24D]/10 text-[#C9A24D] border-[#C9A24D]/20",
    purple: "bg-[#5B4B8A]/10 text-[#5B4B8A] border-[#5B4B8A]/20",
    white: "bg-white/5 text-white/60 border-white/10"
  };
  return (
    <span className={`px-4 py-2 rounded-full border text-[10px] md:text-xs font-black uppercase tracking-widest ${colors[color]}`}>
      {text}
    </span>
  );
};

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    trackEvent('home_view');
    
    // Delay prefetch to save bandwidth on initial load
    const prefetchTimer = setTimeout(() => {
      router.prefetch('/miroir/experience');
    }, 4000);
    
    // Animate chat steps sequentially
    const timers = [
      setTimeout(() => setChatStep(1), 800),  // Message 1
      setTimeout(() => setChatStep(2), 2200), // Message 2
      setTimeout(() => setChatStep(3), 3600), // Hook
      setTimeout(() => setChatStep(4), 4800), // CTA
    ];
    
    const unsubscribe = progress.on("change", (latest) => {
      setCurrentProgress(Math.max(currentProgress, Math.round(latest)));
    });

    return () => {
      clearTimeout(prefetchTimer);
      timers.forEach(t => clearTimeout(t));
      unsubscribe();
    };
  }, []);

  const handleCtaClick = () => {
    trackEvent('cta_click');
    setIsNavigating(true);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.6, ease: "easeOut" }
  } as const;

  return (
    <div className="min-h-screen bg-[#08090F] text-white font-sans selection:bg-[#C9A24D]/30 overflow-x-hidden">
      
      <ProgressBar progress={currentProgress} />
      <FloatingOracle />

      {/* 1. HERO — ACTION AVANT TEXTE */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative bg-[#08090F] pb-20">
        {/* Mystic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[120px] rounded-full" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#5B4B8A]/10 blur-[100px] rounded-full" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none transition-opacity duration-1000"
          >
            <source src="/acceuil.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-xl w-full z-10 text-center flex flex-col items-center justify-center -mt-16 md:-mt-24">
          <motion.div 
            layout 
            className="w-full space-y-6 md:space-y-8 flex flex-col items-center"
          >
            {/* 1. Chat Interface — Message 1 & 2 */}
            <div className="space-y-3 text-left w-full max-w-sm mx-auto">
              <AnimatePresence mode="popLayout">
                {chatStep >= 1 && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none shadow-xl"
                  >
                    <p className="text-sm md:text-base font-medium leading-relaxed">
                      Salut 👋 <br />
                      Tu te sens bloqué, fatigué mentalement ou tu répètes les mêmes erreurs ? 🧠
                    </p>
                  </motion.div>
                )}

                {chatStep >= 2 && (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none shadow-xl"
                  >
                    <p className="text-sm md:text-base font-medium leading-relaxed">
                      Et si ce n’était pas un problème… <br />
                      mais un décalage avec qui tu es vraiment ?
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 2. Main Hook — Step 3 */}
            <AnimatePresence mode="popLayout">
              {chatStep >= 3 && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8 relative w-full pt-4"
                >
                  {/* Visual Signature — The Mirror Sphere */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 pointer-events-none opacity-50">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A24D] to-transparent rounded-full blur-xl animate-pulse" />
                    <div className="absolute inset-2 bg-[#08090F] rounded-full border border-white/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-[#C9A24D]" />
                    </div>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-tight leading-tight pt-8">
                    Prêt maintenant à découvrir ce qui influence <br />
                    <span className="text-[#C9A24D] italic">vraiment tes décisions ?</span>
                  </h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. XXL CTA — Step 4 */}
            <AnimatePresence mode="popLayout">
              {chatStep >= 4 && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4 pt-4 relative group w-full"
                >
                  {/* Progress Indicator Above CTA */}
                  <div className="flex flex-col items-center gap-1 mb-4">
                    <div className="flex justify-between w-48 text-[9px] font-black uppercase tracking-[0.2em] text-[#C9A24D]/60">
                      <span>Étape 1 / 3</span>
                      <span>0%</span>
                    </div>
                    <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: "2%" }}
                        animate={{ width: "5%" }}
                        className="h-full bg-[#C9A24D]"
                      />
                    </div>
                  </div>

                  <div className="text-[#C9A24D] text-xs font-black uppercase tracking-widest mb-2 animate-bounce">
                    Voir ton premier insight maintenant
                  </div>

                  <Link 
                    href="/miroir/experience"
                    onClick={handleCtaClick}
                    className="group w-full relative inline-flex flex-col items-center justify-center gap-1 px-8 py-10 bg-[#C9A24D] text-[#08090F] rounded-[32px] font-black hover:scale-[1.02] active:scale-95 transition-all shadow-[0_25px_60px_-15px_rgba(201,162,77,0.6)] border-4 border-white/20 overflow-hidden"
                  >
                    {/* Glow Effect inside button */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    
                    <div className="flex items-center gap-4 text-2xl md:text-3xl relative z-10">
                      {isNavigating ? 'Ouverture...' : "LANCER LE CRASH-TEST (1 MIN)"}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ArrowRight className="w-8 h-8" />
                      </motion.div>
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] opacity-80 relative z-10">
                      Ton premier insight en &lt; 1 minute
                    </span>
                  </Link>
                  <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <span>Rapide</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Gratuit</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Sans inscription</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* 2. RECONNAISSANCE — TAGS CLICQUABLES */}
      <section className="py-24 px-6 relative">
        <motion.div 
          {...fadeIn}
          className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 space-y-10 relative overflow-hidden text-center"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 blur-3xl rounded-full" />
          
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#C9A24D]">Ce test est pour toi si…</h2>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Scanne tes points de blocage</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Hésitation chronique",
              "Stress sous pression",
              "Répétition d'erreurs",
              "Fatigue mentale",
              "Décalage intérieur",
              "Perte de direction",
              "Choix impossibles"
            ].map((tag, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 text-sm font-bold text-white/80"
              >
                {tag}
              </motion.div>
            ))}
          </div>

          <div className="pt-4">
            <Link href="/miroir/experience" className="text-[#C9A24D] text-xs font-black uppercase tracking-[0.2em] border-b border-[#C9A24D]/30 pb-1">
              Commencer le diagnostic (1 min)
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 3. CARTE 2 — EXEMPLE DE LECTURE (CHAT STYLE) */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-12">
          <motion.div {...fadeIn} className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Ce que nous montrons vraiment</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold italic">
              (extrait simplifié — chaque analyse est personnelle)
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Bubble 1: Metaphor */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-start gap-2 max-w-[85%]"
            >
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed italic">
                  "Chaque matin, tu te regardes dans le miroir en pensant te voir tel que tu es. En réalité, tu vois souvent la personne que tu étais il y a des années."
                </p>
              </div>
              <span className="text-[10px] text-white/20 font-bold ml-4 uppercase tracking-widest">L'Oracle • À l'instant</span>
            </motion.div>

            {/* Bubble 2: Explanation */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-start gap-2 max-w-[85%]"
            >
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tl-none shadow-2xl">
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  La vie t’a façonné autrement : stress, contraintes, choix imposés. Ce décalage crée fatigue et confusion.
                </p>
              </div>
            </motion.div>

            {/* Rich Card 1: Potentiel */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.8 }}
              className="flex flex-col items-center py-8"
            >
              <div className="w-full bg-gradient-to-tr from-[#C9A24D]/20 to-transparent border border-[#C9A24D]/30 p-6 rounded-[40px] shadow-2xl space-y-4">
                <div className="flex items-center gap-3 text-[#C9A24D]">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Potentiel de départ</span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold text-white/80">
                  <li className="flex items-center gap-2">Vision & projection</li>
                  <li className="flex items-center gap-2">Stabilité intérieure</li>
                  <li className="flex items-center gap-2">Décisions long terme</li>
                </ul>
                <p className="text-[11px] text-[#C9A24D] font-bold italic border-t border-white/10 pt-3">
                  👉 Sur le papier, ce profil est fait pour décider avec clarté.
                </p>
              </div>
            </motion.div>

            {/* Transition Zap */}
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="flex justify-center -my-4 relative z-10"
            >
              <div className="w-10 h-10 rounded-full bg-[#08090F] border border-white/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#C9A24D] animate-pulse" />
              </div>
            </motion.div>

            {/* Rich Card 2: Réalité */}
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-center py-8"
            >
              <div className="w-full bg-gradient-to-tr from-[#5B4B8A]/20 to-transparent border border-[#5B4B8A]/30 p-6 rounded-[40px] shadow-2xl space-y-4">
                <div className="flex items-center gap-3 text-[#A78BFA]">
                  <Activity className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Fonctionnement observé aujourd'hui</span>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-bold text-white/80">
                  <li className="flex items-center gap-2">Décisions dans l'urgence</li>
                  <li className="flex items-center gap-2">Surcharge mentale</li>
                  <li className="flex items-center gap-2">Perte de direction</li>
                </ul>
                <p className="text-[11px] text-[#A78BFA] font-bold italic border-t border-white/10 pt-3">
                  👉 Dans la réalité, cela crée fatigue et hésitation.
                </p>
              </div>
            </motion.div>

            {/* Bubble 3: Bridge */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.6 }}
              className="flex flex-col items-start gap-2 max-w-[85%] pt-4"
            >
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-5 rounded-3xl rounded-tl-none shadow-2xl">
                <p className="text-base md:text-lg font-serif italic text-white/90">
                  "Ce type d’écart est fréquent. Il ne se ressent pas comme un problème, mais comme une perte de fluidité."
                </p>
              </div>
            </motion.div>

            {/* Final Section CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 2 }}
              className="flex justify-center pt-8"
            >
              <Link 
                href="/miroir/experience"
                className="inline-flex items-center gap-3 px-8 py-5 bg-[#C9A24D] text-[#08090F] rounded-2xl text-sm font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_15px_30px_-10px_rgba(201,162,77,0.4)]"
              >
                Voir ce type d'écart chez moi (1 min)
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CARTE 3 — COMMENT ÇA MARCHE ? */}
      <section className="py-24 px-6 relative">
        <div className="max-w-xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="p-10 md:p-14 rounded-[50px] bg-white/5 border border-white/10 space-y-12 relative"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">Comment fonctionne le Crash-Test ?</h2>
              <p className="text-[#C9A24D] text-xs font-black uppercase tracking-widest">Simple. Rapide. Sans engagement.</p>
            </div>

            <div className="space-y-10">
              {[
                { 
                  id: "01", 
                  title: "ANALYSE SYMBOLIQUE", 
                  icon: Fingerprint, 
                  desc: "Analyse de ton potentiel de départ (date et contexte de naissance).",
                  note: "Numérologie & astrologie — sans prédiction"
                },
                { 
                  id: "02", 
                  title: "TESTS DE RÉACTIONS", 
                  icon: Zap, 
                  desc: "Situations concrètes & réactions réelles (choix sous pression, automatismes)." 
                },
                { 
                  id: "03", 
                  title: "COMPARAISON (LE MIROIR)", 
                  icon: Layers, 
                  desc: "Comparaison entre potentiel et fonctionnement (là où l'écart influence tes décisions)." 
                }
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="text-2xl font-black text-white/10 group-hover:text-[#C9A24D]/30 transition-colors pt-1">
                    {step.id}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-[#C9A24D]">
                        <step.icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-black uppercase tracking-widest">{step.title}</h3>
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed">{step.desc}</p>
                    {step.note && <p className="text-[10px] text-[#C9A24D]/50 font-bold italic">{step.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Reassurance Block */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5">
              {[
                { icon: Clock, text: "15 minutes" },
                { icon: Lock, text: "Sans inscription" },
                { icon: X, text: "Aucune prédiction" },
                { icon: ShieldCheck, text: "Privé & Sécurisé" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <item.icon className="w-4 h-4 text-white/20" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Main CTA for this card */}
            <div className="text-center space-y-4">
              <Link 
                href="/miroir/experience"
                onClick={handleCtaClick}
                className="group w-full relative inline-flex flex-col items-center gap-1 px-8 py-8 bg-white text-[#08090F] rounded-[32px] font-black hover:scale-[1.02] active:scale-95 transition-all shadow-2xl"
              >
                <div className="flex items-center gap-3 text-lg md:text-xl">
                  {isNavigating ? 'Démarrage...' : "COMMENCER LE TEST (1 MIN)"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[9px] uppercase tracking-[0.2em] opacity-60">
                  Résultat partiel immédiat
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. CTA FINAL — IMPACT MAXIMAL */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.1),_transparent_70%)]" />
        </div>

        <motion.div {...fadeIn} className="max-w-xl mx-auto space-y-12 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Prêt à voir <br />
              <span className="text-[#C9A24D] italic">ton reflet réel ?</span>
            </h2>
            <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">Pas d'inscription, pas de jugement.</p>
          </div>

          <div className="space-y-6">
            <Link 
              href="/miroir/experience"
              onClick={handleCtaClick}
              className="group w-full relative inline-flex flex-col items-center gap-2 px-8 py-10 bg-[#C9A24D] text-[#08090F] rounded-[40px] shadow-[0_30px_60px_-10px_rgba(201,162,77,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              <span className="text-2xl md:text-3xl font-black">
                {isNavigating ? 'Lancement...' : "LANCER LE TEST (GRATUIT)"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Prendre la décision de se connaître</span>
            </Link>
            
            <div className="flex items-center justify-center gap-6 opacity-30">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Anonyme
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" /> Sécurisé
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Eye className="w-3 h-3" /> Sans diagnostic
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER MINIMAL */}
      <footer className="py-12 px-6 border-t border-white/5 text-center space-y-6 opacity-20">
        <div className="flex items-center justify-center gap-4 text-[#C9A24D]">
          <Target className="w-4 h-4" />
          <Fingerprint className="w-4 h-4" />
          <Activity className="w-4 h-4" />
        </div>
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} VOTRE LÉGENDE · MÉTHODE ALIGNEMENT DÉCISION
        </p>
      </footer>

    </div>
  );
}

// Support components (reused icons from lucide)
const Clock = ({ className }: { className?: string }) => <Activity className={className} />; // Fallback icon for simplicity in this example
