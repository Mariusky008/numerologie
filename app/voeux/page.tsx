'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Activity, 
  Sparkles, 
  ShieldCheck,
  Target,
  Lock,
  Heart,
  Users,
  Compass,
  Star
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const ARCHETYPES = [
  {
    id: "amour",
    label: "Amour / relation",
    icon: Heart,
    subVoeux: [
      "Retrouver une relation saine et stable",
      "Sortir d’un schéma amoureux destructeur",
      "Mettre fin à une impasse relationnelle"
    ]
  },
  {
    id: "famille",
    label: "Famille / lien",
    icon: Users,
    subVoeux: [
      "Réparer un lien familial important",
      "Me libérer d’un poids émotionnel ancien"
    ]
  },
  {
    id: "decisions",
    label: "Décisions & direction",
    icon: Compass,
    subVoeux: [
      "Reprendre le contrôle de mes décisions",
      "Clarifier ce que je veux vraiment",
      "Créer un équilibre durable dans ma vie"
    ]
  },
  {
    id: "confiance",
    label: "Confiance & respect de soi",
    icon: Star,
    subVoeux: [
      "Me respecter enfin dans mes choix",
      "Retrouver confiance en moi et en mes ressentis",
      "Assumer qui je suis sans me trahir"
    ]
  },
  {
    id: "solitude",
    label: "Solitude / attachement",
    icon: Target,
    subVoeux: [
      "Sortir d’une solitude que je n’ai pas choisie",
      "Arrêter de vivre dans la peur de perdre"
    ]
  },
  {
    id: "vie",
    label: "Vie qui ne me ressemble pas",
    icon: Activity,
    subVoeux: [
      "Construire une vie qui me ressemble",
      "Ne plus saboter ce qui pourrait fonctionner"
    ]
  }
];

const FloatingVoeuBadge = ({ selectedVoeu, onClear }: { selectedVoeu: string | null, onClear: () => void }) => (
  <AnimatePresence>
    {selectedVoeu && selectedVoeu !== "Aucun ne me parle pour l’instant" && (
      <motion.div 
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: 100, scale: 0.8 }}
        className="fixed top-20 right-4 md:right-8 z-[100] group cursor-pointer"
        onClick={onClear}
      >
        {/* Glow Background */}
        <div className="absolute inset-0 bg-[#C9A24D] blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
        
        <div className="bg-[#C9A24D] border-2 border-white/30 p-4 rounded-[2rem] shadow-[0_15px_40px_-10px_rgba(201,162,77,0.6)] max-w-[220px] relative overflow-hidden transform group-hover:scale-105 transition-transform">
          {/* Inner Light Effect */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
          
          <div className="relative flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner">
              <Star className="w-4 h-4 text-[#08090F]" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[7px] font-black uppercase tracking-[0.2em] text-[#08090F]/60">Mon vœu actuel</span>
              <p className="text-[10px] md:text-xs font-black leading-tight text-[#08090F] italic">
                « {selectedVoeu} »
              </p>
            </div>
          </div>

          {/* Floating particle */}
          <motion.div 
            animate={{ y: [-2, 2, -2], x: [-1, 1, -1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-1 -right-1"
          >
            <Sparkles className="w-4 h-4 text-white/40" />
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const SectionCTA = ({ 
  text, 
  href = "/miroir/experience", 
  isActive = false, 
  onClick 
}: { 
  text: string, 
  href?: string, 
  isActive?: boolean,
  onClick?: () => void 
}) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="py-8 flex justify-center"
      >
        <Link 
          href={href}
          onClick={onClick}
          className="group relative inline-flex flex-col items-center gap-2 px-8 py-6 rounded-[30px] bg-[#C9A24D] text-[#08090F] shadow-[0_20px_40px_-10px_rgba(201,162,77,0.4)] hover:scale-105 active:scale-95 transition-all overflow-hidden"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          <span className="text-lg md:text-xl font-black tracking-tight">
            {text}
          </span>
          <div className="flex items-center gap-2 opacity-60">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Accéder au Crash Test</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function VoeuxPage() {
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [selectedVoeu, setSelectedVoeu] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    trackEvent('voeux_page_view');
  }, []);

  const handleArchetypeSelect = (id: string) => {
    setSelectedArchetype(id);
    setSelectedVoeu(null);
    trackEvent('archetype_selected', { id });
    
    setTimeout(() => {
      const refinementSection = document.getElementById('refinement-section');
      if (refinementSection) {
        refinementSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleVoeuSelect = (voeu: string) => {
    setSelectedVoeu(voeu);
    trackEvent('voeu_selected', { voeu });
    const nextSection = document.getElementById('fracture');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
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
      
      <FloatingVoeuBadge selectedVoeu={selectedVoeu} onClear={() => {
        setSelectedVoeu(null);
        setSelectedArchetype(null);
      }} />

      {/* 1. HERO — CHOIX DU VOEU (LEVEL 1 & 2) */}
      <section className="min-h-screen flex flex-col items-center justify-start px-6 relative pt-20 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[120px] rounded-full" />
          <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none">
            <source src="/acceuil.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-4xl w-full z-10 text-center space-y-12">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
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
              Choisis ce qui compte vraiment pour toi aujourd&apos;hui. <br />
              Ensuite, découvre pourquoi ça bloque.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {ARCHETYPES.map((arch) => (
              <motion.button
                key={arch.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleArchetypeSelect(arch.id)}
                className={`p-4 md:p-6 rounded-2xl border transition-all flex flex-col items-center gap-3 ${
                  selectedArchetype === arch.id 
                  ? "bg-[#C9A24D] text-[#08090F] border-[#C9A24D] shadow-lg" 
                  : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                }`}
              >
                <arch.icon className={`w-6 h-6 ${selectedArchetype === arch.id ? "text-[#08090F]" : "text-[#C9A24D]"}`} />
                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{arch.label}</span>
              </motion.button>
            ))}
            <button 
              onClick={() => {
                handleVoeuSelect("Aucun ne me parle pour l’instant");
              }}
              className="p-4 md:p-6 rounded-2xl border border-white/5 bg-white/2 shadow-inner text-[10px] md:text-xs font-bold text-white/30 hover:text-white/50 transition-colors"
            >
              Aucun ne me parle pour l’instant
            </button>
          </div>

          <AnimatePresence mode="wait">
            {selectedArchetype && (
              <motion.div 
                key={selectedArchetype}
                id="refinement-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 pt-8 border-t border-white/5"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A24D]/60">Affinage de ton vœu</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {ARCHETYPES.find(a => a.id === selectedArchetype)?.subVoeux.map((sub, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleVoeuSelect(sub)}
                      className={`px-6 py-4 rounded-2xl border-2 text-xs md:text-sm font-black transition-all backdrop-blur-xl ${
                        selectedVoeu === sub
                        ? "bg-white text-[#08090F] border-white shadow-[0_15px_30px_-10px_rgba(255,255,255,0.4)]"
                        : "bg-[#08090F]/80 border-white/20 text-white hover:border-[#C9A24D] hover:bg-[#08090F]/90"
                      }`}
                    >
                      {sub}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <SectionCTA 
            text="DÉCOUVRIR POURQUOI ÇA BLOQUE" 
            isActive={!!selectedVoeu}
            onClick={handleCtaClick}
          />
        </div>
      </section>

      {/* 2. LA FRACTURE & LE CONTRASTE (CHAT FLOW) */}
      <section id="fracture" className="py-24 px-6 relative bg-[#08090F]">
        <div className="max-w-2xl mx-auto space-y-12">
          
          <motion.div {...fadeIn} className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">La Fracture</h2>
            <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold italic">
              Analyse de l&apos;écart identitaire
            </p>
          </motion.div>

          <div className="space-y-10">
            {/* 1. Carla */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-end gap-2 ml-auto max-w-[85%]"
            >
              <span className="text-[10px] text-white/40 font-black mr-4 uppercase tracking-widest">Carla</span>
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tr-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Ça fait pas mal de temps que j&apos;essaye de <span className="text-[#C9A24D] font-bold italic">« {selectedVoeu || "mon projet"} »</span>. <br />
                  mais on ne peut pas dire qu&apos;il y ait beaucoup de changement 😔
                </p>
              </div>
            </motion.div>

            {/* 2. Oracle */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-start gap-2 max-w-[85%]"
            >
              <span className="text-[10px] text-[#C9A24D] font-black ml-4 uppercase tracking-widest">L’Oracle</span>
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-5 rounded-3xl rounded-tl-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed italic font-serif">
                  Ce n’est pas ton vœu le problème. <br /><br />
                  C’est le décalage entre qui tu es aujourd’hui et ce que ce vœu demande de toi.
                </p>
              </div>
            </motion.div>

            {/* 3. Carla */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-end gap-2 ml-auto max-w-[85%]"
            >
              <span className="text-[10px] text-white/40 font-black mr-4 uppercase tracking-widest">Carla</span>
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tr-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Pourtant je fais ce que je peux…
                </p>
              </div>
            </motion.div>

            {/* 4. Oracle */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.9 }}
              className="flex flex-col items-start gap-2 max-w-[85%]"
            >
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-5 rounded-3xl rounded-tl-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed font-serif">
                  Justement. <br /><br />
                  Quand tu veux <span className="text-[#C9A24D] font-bold">« {selectedVoeu || "ton projet"} »</span>, mais que tu décides depuis un fonctionnement en surcharge, en urgence ou par peur, tu attires des situations qui vont à l’opposé.
                </p>
              </div>
            </motion.div>

            {/* 5. Carla */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.2 }}
              className="flex flex-col items-end gap-2 ml-auto max-w-[85%]"
            >
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tr-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  C’est exactement ça… 😔
                </p>
              </div>
            </motion.div>

            {/* 6. Oracle */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.5 }}
              className="flex flex-col items-start gap-2 max-w-[85%]"
            >
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-5 rounded-3xl rounded-tl-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed italic font-serif">
                  Ce décalage est difficile à repérer. <br /><br />
                  Tu avances, mais jamais dans le bon sens. <br />
                  Et c’est pour ça que ton vœu reste bloqué.
                </p>
              </div>
            </motion.div>

            {/* 7. Carla */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.8 }}
              className="flex flex-col items-end gap-2 ml-auto max-w-[85%]"
            >
              <div className="bg-white/5 border border-white/10 p-5 rounded-3xl rounded-tr-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed">
                  Et je fais quoi alors ? 🤔
                </p>
              </div>
            </motion.div>

            {/* 8. Oracle */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 2.1 }}
              className="flex flex-col items-start gap-2 max-w-[85%]"
            >
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-5 rounded-3xl rounded-tl-none shadow-2xl">
                <p className="text-base md:text-lg text-white/90 leading-relaxed font-serif">
                  Le Crash Test va identifier précisément où ça décroche. <br /><br />
                  Ensuite, tu auras deux choix : <br />
                  – travailler dessus seul <br />
                  – ou avancer avec nous <br /><br />
                  Dans les deux cas, tu sauras enfin quoi ajuster pour que <span className="text-[#C9A24D] font-bold italic">« {selectedVoeu || "ton projet"} »</span> devienne possible. ✨
                </p>
              </div>
            </motion.div>

            {/* FRACTURE CTA */}
            <SectionCTA 
              text="IDENTIFIER MON DÉCALAGE" 
              isActive={!!selectedVoeu}
              onClick={handleCtaClick}
            />
          </div>
        </div>
      </section>

      {/* 4. LE CRASH TEST (OUTIL DE LUCIDITÉ) */}
      <section className="py-32 px-6 relative bg-[#0C0D15]">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="p-10 md:p-14 rounded-[50px] bg-white/5 border border-white/10 space-y-10 relative"
          >
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#C9A24D]">Le Crash Test</h2>
              <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-md mx-auto">
                Le Crash Test sert à identifier précisément <span className="text-[#C9A24D] font-bold">où l’écart s’est créé</span> entre ton potentiel réel et ton fonctionnement actuel.
              </p>
            </div>

            <div className="space-y-6">
              {[
                "Analyse symbolique",
                "Tests de réactions",
                "Mise en miroir comportementale",
                "Diagnostic de décision"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-lg bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D] text-[10px] font-black">
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-white/80 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/5 text-center">
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                👉 Un outil de lucidité, pas de jugement. <br />
                Comprendre pourquoi tu n’agis plus comme toi.
              </p>
            </div>

            {/* CRASH TEST CTA */}
            <SectionCTA 
              text="LANCER MON DIAGNOSTIC" 
              isActive={!!selectedVoeu}
              onClick={handleCtaClick}
            />
          </motion.div>
        </div>
      </section>

      {/* 5. LE CHOIX FINAL */}
      <section className="py-32 px-6 relative">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold">Deux chemins s&apos;ouvrent</h2>
            <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto">
              Une fois le Crash Test terminé, après la lecture de ton rapport et l’échange avec ton coach IA...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeIn} className="p-8 md:p-10 rounded-[40px] bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xl font-bold italic">Tu fais le travail seul</h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Avec ton rapport comme boussole, tu avances à ton rythme, en toute autonomie.
              </p>
            </motion.div>

            <motion.div {...fadeIn} className="p-8 md:p-10 rounded-[40px] bg-[#C9A24D]/5 border border-[#C9A24D]/20 space-y-4">
              <h3 className="text-xl font-bold italic">Tu décides de ne plus être seul</h3>
              <p className="text-sm text-white/70 leading-relaxed font-medium">
                Notre équipe s’engage à donner autant que toi pour mettre en place toutes les actions concrètes possibles afin de te rapprocher réellement de ton vœu.
              </p>
            </motion.div>
          </div>

          {/* CHOIX FINAL CTA */}
          <SectionCTA 
            text="HONORER MON VŒU MAINTENANT" 
            isActive={!!selectedVoeu}
            onClick={handleCtaClick}
          />
        </div>
      </section>

      {/* 6. CTA FINAL — ALIGNÉ AVEC LE VOEU */}
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
              {selectedVoeu && selectedVoeu !== "Aucun ne me parle pour l’instant" && (
                <motion.p key="selected" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-white/80 text-lg font-serif italic">
                  « {selectedVoeu} »
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <Link 
              href="/miroir/experience"
              onClick={handleCtaClick}
              className={`group w-full relative inline-flex flex-col items-center gap-2 px-8 py-10 rounded-[40px] shadow-[0_30px_60px_-10px_rgba(201,162,77,0.5)] hover:scale-105 active:scale-95 transition-all ${
                selectedVoeu ? "bg-[#C9A24D] text-[#08090F]" : "bg-white/10 text-white/40 cursor-not-allowed pointer-events-none"
              }`}
            >
              <span className="text-2xl md:text-3xl font-black">
                {isNavigating ? 'Lancement...' : "LANCER LE CRASH TEST"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
                {selectedVoeu ? `Pour ton vœu : ${selectedVoeu}` : "Sélectionne ton vœu pour commencer"}
              </span>
            </Link>
            
            <div className="flex items-center justify-center gap-6 opacity-30">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Sans engagement
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" /> Diagnostic personnel
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center opacity-20">
        <p className="text-[9px] font-black uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} VOTRE LÉGENDE · MÉTHODE ALIGNEMENT DÉCISION · v3.1
        </p>
      </footer>
    </div>
  );
}
