'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  ArrowRight, 
  Activity, 
  Sparkles, 
  Brain,
  ShieldCheck,
  Target,
  ChevronDown,
  Eye,
  Lock,
  Layers,
  Fingerprint,
  Heart,
  Users,
  Compass,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

const VOEUX = [
  "Retrouver une relation saine et stable",
  "Sortir d’un schéma amoureux destructeur",
  "Reprendre le contrôle de mes décisions",
  "Me respecter enfin dans mes choix",
  "Réparer un lien familial important",
  "Ne plus saboter ce qui pourrait fonctionner",
  "Construire une vie qui me ressemble",
  "Sortir d’une solitude que je n’ai pas choisie",
  "Retrouver confiance en moi et en mes ressentis",
  "Mettre fin à une impasse relationnelle",
  "Arrêter de vivre dans la peur de perdre",
  "Me libérer d’un poids émotionnel ancien",
  "Clarifier ce que je veux vraiment",
  "Assumer qui je suis sans me trahir",
  "Créer un équilibre durable dans ma vie",
  "Aucun de ces vœux ne me parle aujourd’hui"
];

const FloatingVoeuBadge = ({ selectedVoeu, onClear }: { selectedVoeu: string | null, onClear: () => void }) => (
  <AnimatePresence>
    {selectedVoeu && selectedVoeu !== "Aucun de ces vœux ne me parle aujourd’hui" && (
      <motion.div 
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        className="fixed top-20 right-4 md:right-8 z-[100] group cursor-pointer"
        onClick={onClear}
      >
        <div className="bg-[#C9A24D]/10 backdrop-blur-xl border border-[#C9A24D]/30 p-4 rounded-3xl shadow-[0_10px_40px_rgba(201,162,77,0.2)] max-w-[200px] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A24D]/5 to-transparent" />
          <div className="relative space-y-1">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#C9A24D]">Mon vœu actuel</span>
            <p className="text-[10px] md:text-xs font-bold leading-tight text-white/90 italic">
              « {selectedVoeu} »
            </p>
          </div>
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/10 p-1 rounded-full">
              <Star className="w-2 h-2 text-[#C9A24D]" />
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function VoeuxPage() {
  const router = useRouter();
  const [selectedVoeu, setSelectedVoeu] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    trackEvent('voeux_page_view');
  }, []);

  const handleVoeuSelect = (voeu: string) => {
    setSelectedVoeu(voeu);
    trackEvent('voeu_selected', { voeu });
    // Scroll slightly to show persistence
    window.scrollTo({ top: window.innerHeight * 0.4, behavior: 'smooth' });
  };

  const handleCtaClick = () => {
    trackEvent('voeux_cta_click', { voeu: selectedVoeu });
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
      
      <FloatingVoeuBadge selectedVoeu={selectedVoeu} onClear={() => setSelectedVoeu(null)} />

      {/* 1. HERO — CHOIX DU VOEU */}
      <section className="min-h-screen flex flex-col items-center justify-start px-6 relative pt-20 pb-20">
        {/* Mystic Background */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[120px] rounded-full" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          >
            <source src="/acceuil.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-4xl w-full z-10 text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                <Sparkles className="w-8 h-8 text-[#C9A24D]" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight leading-tight">
              Tout commence <br />
              <span className="text-[#C9A24D] italic">par un vœu.</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm md:text-base text-white/60 leading-relaxed">
              Choisis ce qui compte vraiment pour toi aujourd’hui. <br />
              Ensuite, découvre pourquoi ça bloque — et décide si tu veux avancer seul ou accompagné.
            </p>
          </motion.div>

          {/* VOEUX GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {VOEUX.map((voeu, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleVoeuSelect(voeu)}
                className={`group relative p-5 rounded-2xl border text-xs md:text-sm font-bold transition-all text-left flex items-center gap-4 ${
                  selectedVoeu === voeu 
                  ? "bg-[#C9A24D] text-[#08090F] border-[#C9A24D] shadow-[0_10px_30px_rgba(201,162,77,0.3)] scale-105" 
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  selectedVoeu === voeu ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                }`}>
                  {voeu.includes("relation") || voeu.includes("amoureux") ? <Heart className="w-4 h-4" /> :
                   voeu.includes("contrôle") || voeu.includes("choix") ? <Compass className="w-4 h-4" /> :
                   voeu.includes("vie") || voeu.includes("équilibre") ? <Star className="w-4 h-4" /> :
                   <Target className="w-4 h-4" />}
                </div>
                {voeu}
                {selectedVoeu === voeu && (
                  <motion.div layoutId="check" className="absolute right-4">
                    <Zap className="w-4 h-4 fill-current" />
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* 2. LE CRASH TEST (RECONTEXTUALISÉ) */}
      <section className="py-32 px-6 relative">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="p-10 md:p-14 rounded-[50px] bg-white/5 border border-white/10 space-y-10 relative text-center"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#C9A24D]">Le Crash Test</h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed">
                Le Crash Test analyse l’écart entre ton potentiel réel et les décisions que tu prends aujourd’hui — 
                <span className="text-white font-bold italic"> celles qui t’éloignent de ton vœu.</span>
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y border-white/5">
              {[
                { icon: Brain, text: "Analyse Symbolique" },
                { icon: Activity, text: "Tests de Réactions" },
                { icon: Layers, text: "Mise en Miroir" },
                { icon: Target, text: "Diagnostic Précis" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <item.icon className="w-5 h-5 text-[#C9A24D]/60" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em]">
                Un outil au service de ta réalisation
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. LE CHOIX (RESPONSABILISATION) */}
      <section className="py-32 px-6 relative bg-[#0C0D15]">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Après le Crash Test, deux chemins</h2>
            <div className="h-1 w-24 bg-[#C9A24D]/30 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Option 1 */}
            <motion.div 
              {...fadeIn}
              className="p-8 md:p-10 rounded-[40px] bg-white/5 border border-white/10 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/40">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold italic">Option 1 : Seul</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Tu fais le travail seul, avec ton rapport détaillé. Tu as les clés, à toi d'ouvrir les portes.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]/40 italic">Liberté totale</span>
              </div>
            </motion.div>

            {/* Option 2 */}
            <motion.div 
              {...fadeIn}
              className="p-8 md:p-10 rounded-[40px] bg-[#C9A24D]/5 border border-[#C9A24D]/20 space-y-6 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <Sparkles className="w-6 h-6 text-[#C9A24D]/20" />
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold italic">Option 2 : Accompagné</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  Tu choisis de ne plus être seul. Nous nous engageons à tes côtés.
                </p>
                <p className="text-[13px] text-white/60 leading-relaxed font-medium">
                  Si tu t’engages dans le parcours complet et que tu vas au bout, notre équipe s’engage à donner autant que toi pour mettre en place toutes les actions concrètes possibles afin de te rapprocher réellement de ton vœu.
                </p>
              </div>
              <div className="pt-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D] italic">Engagement mutuel</span>
              </div>
            </motion.div>
          </div>

          <motion.p {...fadeIn} className="text-center text-[10px] text-white/20 uppercase tracking-widest">
            ⚠️ Aucune promesse de résultat garanti. Seul ton engagement définit ta réussite.
          </motion.p>
        </div>
      </section>

      {/* 4. CTA FINAL — ALIGNÉ AVEC LE VOEU */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.1),_transparent_70%)]" />
        </div>

        <motion.div {...fadeIn} className="max-w-xl mx-auto space-y-12 relative z-10">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Prêt à honorer <br />
              <span className="text-[#C9A24D] italic">ton vœu ?</span>
            </h2>
            <AnimatePresence mode="wait">
              {selectedVoeu ? (
                <motion.p 
                  key="selected"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/80 text-lg font-serif italic"
                >
                  « {selectedVoeu} »
                </motion.p>
              ) : (
                <motion.p 
                  key="none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]"
                >
                  Fais le premier pas vers ton changement
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <Link 
              href="/miroir/experience"
              onClick={handleCtaClick}
              className={`group w-full relative inline-flex flex-col items-center gap-2 px-8 py-10 rounded-[40px] shadow-[0_30px_60px_-10px_rgba(201,162,77,0.5)] hover:scale-105 active:scale-95 transition-all ${
                selectedVoeu ? "bg-[#C9A24D] text-[#08090F]" : "bg-white/10 text-white/40 cursor-not-allowed"
              }`}
            >
              <span className="text-2xl md:text-3xl font-black">
                {isNavigating ? 'Lancement...' : "COMMENCER LE CRASH TEST"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                {selectedVoeu ? "Pour ce vœu spécifique" : "Sélectionne un vœu pour commencer"}
              </span>
            </Link>
            
            <div className="flex items-center justify-center gap-6 opacity-30">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Sans engagement
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" /> Diagnostic personnel
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Eye className="w-3 h-3" /> 100% Privé
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER MINIMAL */}
      <footer className="py-12 px-6 border-t border-white/5 text-center space-y-6 opacity-20">
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} VOTRE LÉGENDE · MÉTHODE ALIGNEMENT DÉCISION
        </p>
      </footer>

    </div>
  );
}
