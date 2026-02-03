'use client';

import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  Activity, 
  Check, 
  X, 
  Sparkles, 
  Brain,
  MessageSquare,
  ShieldCheck,
  Target,
  ChevronDown,
  Eye,
  Lock,
  Calendar,
  Layers,
  Fingerprint
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

// --- COMPONENTS ---

const FloatingOracle = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 pointer-events-none"
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
  <div className="fixed top-0 left-0 right-0 z-[110] h-1.5 bg-white/5">
    <motion.div 
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      className="h-full bg-gradient-to-r from-[#C9A24D] via-[#5B4B8A] to-[#C9A24D]"
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
    router.prefetch('/miroir/experience');
    
    // Animate chat steps
    const timers = [
      setTimeout(() => setChatStep(1), 800),
      setTimeout(() => setChatStep(2), 1800),
      setTimeout(() => setChatStep(3), 2800),
    ];
    
    const unsubscribe = progress.on("change", (latest) => {
      setCurrentProgress(Math.max(currentProgress, Math.round(latest)));
    });

    return () => {
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
  };

  return (
    <div className="min-h-screen bg-[#08090F] text-white font-sans selection:bg-[#C9A24D]/30 overflow-x-hidden">
      
      <ProgressBar progress={currentProgress} />
      <FloatingOracle />

      {/* 1. HERO — STYLE APP / CHAT */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
        {/* Mystic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[120px] rounded-full" />
          <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#5B4B8A]/10 blur-[100px] rounded-full" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay pointer-events-none"
          >
            <source src="/acceuil.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-xl w-full z-10 space-y-8">
          {/* Chat Interface */}
          <div className="space-y-4">
            <AnimatePresence>
              {chatStep >= 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none max-w-[85%]"
                >
                  <p className="text-lg md:text-xl font-medium leading-tight">
                    Salut ! Prêt à voir ce qui bloque tes décisions ? 🧠
                  </p>
                </motion.div>
              )}

              {chatStep >= 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none max-w-[80%]"
                >
                  <p className="text-lg md:text-xl font-medium leading-tight">
                    Le Crash-Test prend seulement 1 min.
                  </p>
                </motion.div>
              )}

              {chatStep >= 3 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-4 space-y-6"
                >
                  <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
                    Le Crash-Test <br />
                    <span className="text-[#C9A24D] italic">de tes Décisions</span>
                  </h1>
                  
                  <div className="flex flex-wrap gap-2">
                    <Tag text="Hésitation" />
                    <Tag text="Stress" />
                    <Tag text="Blocage" />
                    <Tag text="Répétition" />
                  </div>

                  <Link 
                    href="/miroir/experience"
                    onClick={handleCtaClick}
                    className="group w-full relative inline-flex items-center justify-center gap-4 px-8 py-6 bg-[#C9A24D] text-[#08090F] rounded-2xl font-black text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_-10px_rgba(201,162,77,0.4)]"
                  >
                    {isNavigating ? 'Démarrage...' : "C'EST PARTI 🚀"}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <p className="text-center text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                    Tu obtiens un premier aperçu dès la 1ʳᵉ minute.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* 2. RECONNAISSANCE — CE TEST EST POUR TOI SI... */}
      <section className="py-24 px-6 relative">
        <motion.div 
          {...fadeIn}
          className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-12 space-y-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 blur-3xl rounded-full" />
          
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#C9A24D]">Ce test est pour toi si…</h2>
          
          <div className="space-y-4">
            {[
              "tu hésites souvent trop longtemps avant de décider",
              "tu décides vite sous pression… puis tu regrettes",
              "tu as l’impression de répéter les mêmes erreurs",
              "tu te sens fatigué mentalement sans raison claire",
              "tu sais ce que tu “devrais” faire, mais tu n’y arrives pas"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="w-6 h-6 rounded-full bg-[#C9A24D]/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 text-[#C9A24D]" />
                </div>
                <p className="text-lg md:text-xl text-white/80 leading-tight group-hover:text-white transition-colors">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. EXEMPLE DE LECTURE — LE PONT ÉMOTIONNEL */}
      <section className="py-24 px-6 relative">
        <div className="max-w-2xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Exemple de lecture</h2>
            <p className="text-white/40 text-sm uppercase tracking-widest italic">
              (chaque analyse est personnelle)
            </p>
          </motion.div>

          <div className="grid gap-8">
            {/* Potentiel */}
            <motion.div 
              {...fadeIn}
              className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-6 relative"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-widest border border-[#C9A24D]/20">
                <Sparkles className="w-3 h-3" /> Potentiel de Naissance
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-1 h-1 bg-[#C9A24D] rounded-full" />
                  capacité naturelle de projection
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-1 h-1 bg-[#C9A24D] rounded-full" />
                  tendance à la stabilité intérieure
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-1 h-1 bg-[#C9A24D] rounded-full" />
                  rapport au temps posé et structuré
                </li>
              </ul>
              <p className="text-[#C9A24D] font-bold italic border-t border-white/5 pt-4">
                👉 Sur le papier, ce profil est fait pour décider avec clarté.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <Zap className="w-8 h-8 text-white/10" />
            </div>

            {/* Réalité */}
            <motion.div 
              {...fadeIn}
              className="p-8 rounded-[40px] bg-[#5B4B8A]/5 border border-[#5B4B8A]/20 space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 text-[#5B4B8A] text-[10px] font-black uppercase tracking-widest border border-[#5B4B8A]/20">
                <Activity className="w-3 h-3" /> Fonctionnement Réel
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-1 h-1 bg-[#5B4B8A] rounded-full" />
                  décisions prises dans l’urgence
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-1 h-1 bg-[#5B4B8A] rounded-full" />
                  surcharge mentale récurrente
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-1 h-1 bg-[#5B4B8A] rounded-full" />
                  difficulté à maintenir une direction
                </li>
              </ul>
              <p className="text-[#5B4B8A] font-bold italic border-t border-white/5 pt-4">
                👉 Dans la réalité, ce fonctionnement crée fatigue et stagnation.
              </p>
            </motion.div>

            {/* L'écart */}
            <motion.div 
              {...fadeIn}
              className="p-10 rounded-[50px] bg-gradient-to-tr from-[#1A1C2E] to-[#08090F] border border-white/10 text-center space-y-6 shadow-2xl"
            >
              <h3 className="text-2xl font-serif font-bold text-[#C9A24D]">Ce que révèle l’écart</h3>
              <p className="text-lg text-white/70 leading-relaxed italic">
                "Ce type d’écart n'est pas un problème, mais une perte de fluidité. Le Crash-Test identifie où cet écart se situe pour toi."
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-[#C9A24D] text-xs font-black uppercase tracking-[0.2em] border-b border-[#C9A24D]/30 pb-1"
              >
                👉 Voir mon propre écart (1 min)
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. COMMENT ÇA MARCHE — LOGIQUE */}
      <section className="py-24 px-6 bg-white/5">
        <div className="max-w-xl mx-auto space-y-16">
          <motion.h2 {...fadeIn} className="text-3xl md:text-5xl font-serif font-bold text-center">Comment ça marche ?</motion.h2>
          
          <div className="space-y-4">
            {[
              { id: "01", title: "Ton potentiel", icon: Fingerprint, desc: "Analyse symbolique de ta naissance." },
              { id: "02", title: "Tes décisions", icon: Activity, desc: "Tests de réactions sous pression." },
              { id: "03", title: "Le Miroir", icon: Layers, desc: "Comparaison directe et analyse de l'écart." }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="flex items-center gap-6 p-6 rounded-3xl bg-[#08090F] border border-white/5 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#C9A24D] shrink-0">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-white/40 text-sm">{item.desc}</p>
                </div>
                <div className="ml-auto text-3xl font-black text-white/5">{item.id}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA FINAL — ULTRA VISIBLE */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.1),_transparent_70%)]" />
        </div>

        <motion.div {...fadeIn} className="max-w-xl mx-auto space-y-12 relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
            Prêt à voir <br />
            <span className="text-[#C9A24D] italic">ton reflet réel ?</span>
          </h2>

          <div className="space-y-6">
            <Link 
              href="/miroir/experience"
              onClick={handleCtaClick}
              className="group w-full relative inline-flex flex-col items-center gap-2 px-8 py-10 bg-[#C9A24D] text-[#08090F] rounded-[40px] shadow-[0_30px_60px_-10px_rgba(201,162,77,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              <span className="text-2xl md:text-3xl font-black">
                {isNavigating ? 'Démarrage...' : "LANCER LE TEST (1 min)"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Gratuit • Résultat immédiat</span>
            </Link>
            
            <div className="flex items-center justify-center gap-6 opacity-30">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Anonyme
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" /> Sécurisé
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Eye className="w-3 h-3" /> Pas de diagnostic
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
