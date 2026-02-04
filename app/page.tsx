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

const VOEU_INSIGHTS: Record<string, { demand: string; current: string }> = {
  "Retrouver une relation saine et stable": { demand: "Vulnérabilité et limites claires", current: "Sur-adaptation et peur du rejet" },
  "Sortir d’un schéma amoureux destructeur": { demand: "Estime de soi radicale", current: "Besoin de sauver ou d'être sauvé" },
  "Mettre fin à une impasse relationnelle": { demand: "Courage de trancher", current: "Espoir que l'autre change" },
  "Réparer un lien familial important": { demand: "Acceptation de l'autre tel qu'il est", current: "Attente de reconnaissance" },
  "Me libérer d’un poids émotionnel ancien": { demand: "Lâcher-prise et pardon", current: "Identification à la blessure" },
  "Reprendre le contrôle de mes décisions": { demand: "Responsabilité totale", current: "Attente de validation extérieure" },
  "Clarifier ce que je veux vraiment": { demand: "Écoute du corps et de l'intuition", current: "Analyse mentale et doute permanent" },
  "Créer un équilibre durable dans ma vie": { demand: "Renoncement et priorisation", current: "Vouloir tout faire par peur de manquer" },
  "Me respecter enfin dans mes choix": { demand: "Savoir dire non sans culpabilité", current: "Compromis excessifs pour plaire" },
  "Retrouver confiance en moi et en mes ressentis": { demand: "Action malgré la peur", current: "Attente de certitude avant d'agir" },
  "Assumer qui je suis sans me trahir": { demand: "Authenticité brute", current: "Port du masque social" },
  "Sortir d’une solitude que je n’ai pas choisie": { demand: "Ouverture et risque émotionnel", current: "Protection et retrait préventif" },
  "Arrêter de vivre dans la peur de perdre": { demand: "Confiance en la vie", current: "Contrôle et hypervigilance" },
  "Construire une vie qui me ressemble": { demand: "Créativité et audace", current: "Conformisme et sécurité illusoire" },
  "Ne plus saboter ce qui pourrait fonctionner": { demand: "Acceptation du bonheur", current: "Culpabilité et sentiment d'imposture" },
};

const FloatingVoeuBadge = ({ selectedVoeu, onClear }: { selectedVoeu: string | null, onClear: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedVoeu) setIsOpen(false);
  }, [selectedVoeu]);

  return (
    <AnimatePresence>
      {selectedVoeu && selectedVoeu !== "Aucun ne me parle pour l’instant" && (
        <>
          {/* Badge Flottant */}
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            className="fixed top-24 right-4 md:right-10 z-[90] group cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/* Glow Background */}
            <div className="absolute inset-0 bg-[#C9A24D] blur-[30px] opacity-30 group-hover:opacity-60 transition-opacity duration-500 animate-pulse" />
            
            <div className="bg-[#C9A24D] border-2 border-white/40 p-5 md:p-6 rounded-[2.5rem] shadow-[0_20px_60px_-10px_rgba(201,162,77,0.7)] max-w-[260px] md:max-w-[320px] relative overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
              {/* Inner Light Effect */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent" />
              
              <div className="relative flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 shadow-inner backdrop-blur-sm border border-white/20">
                  <Star className="w-5 h-5 md:w-6 md:h-6 text-[#08090F]" />
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-[#08090F]/70 block">Mon vœu actuel</span>
                  <p className="text-xs md:text-sm font-black leading-tight text-[#08090F] italic line-clamp-2">
                    « {selectedVoeu} »
                  </p>
                </div>
              </div>

              {/* Floating particle */}
              <motion.div 
                animate={{ y: [-3, 3, -3], x: [-2, 2, -2], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 right-3"
              >
                <Sparkles className="w-5 h-5 text-white/60" />
              </motion.div>
            </div>
          </motion.div>

          {/* Modal Overlay */}
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#08090F]/90 backdrop-blur-md"
                  onClick={() => setIsOpen(false)}
                />
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-2xl bg-[#12121A] border border-[#C9A24D]/30 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-[0_0_100px_-20px_rgba(201,162,77,0.3)]"
                >
                  {/* Decorative Elements */}
                  <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#C9A24D]/10 rounded-full blur-[60px]" />
                  <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#C9A24D]/10 rounded-full blur-[60px]" />

                  <div className="relative z-10 flex flex-col items-center text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] mb-4">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-black uppercase tracking-widest">Ton choix</span>
                    </div>

                    <h3 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
                      « {selectedVoeu} »
                    </h3>

                    <div className="space-y-6 max-w-lg">
                      <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed italic">
                        Est-ce vraiment ce que tu désires le plus profondément aujourd'hui ?
                      </p>
                      <p className="text-sm text-white/40 leading-relaxed">
                        Prends un instant pour ressentir si ce vœu vient de ton cœur (envie) ou de ta tête (peur).
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-8 py-4 bg-[#C9A24D] text-[#08090F] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_10px_30px_-5px_rgba(201,162,77,0.4)]"
                      >
                        Oui, je le garde
                      </button>
                      <button
                        onClick={() => {
                          onClear();
                          setIsOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-white/5 text-white/60 border border-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                      >
                        Changer de vœu
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

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
        className="py-8 flex flex-col items-center gap-4"
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
        
        <div className="text-center space-y-1">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
            Crash Test gratuit → Diagnostic clair
          </p>
          <p className="text-[9px] text-white/30">
            Modules d’analyse avancés accessibles ensuite.
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Home() {
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [selectedVoeu, setSelectedVoeu] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const [userResponse, setUserResponse] = useState<string | null>(null);

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
    const nextSection = document.getElementById('decalage');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    trackEvent('cta_click', { voeu: selectedVoeu });
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
      <section className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 relative pt-20 pb-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[120px] rounded-full" />
          <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none">
            <source src="/nuage.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="w-full max-w-[1600px] z-10 text-center space-y-12 md:space-y-20">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-col items-center gap-8 mb-6">
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#C9A24D] text-[#08090F] shadow-[0_0_30px_-5px_rgba(201,162,77,0.4)]">
                <Star className="w-4 h-4 fill-[#08090F]" />
                <span className="text-xs font-black uppercase tracking-widest">Déjà + de 1200 crash-tests réalisés</span>
              </div>

              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center animate-pulse">
                <Sparkles className="w-10 h-10 text-[#C9A24D]" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-tight">
              Tout commence <br />
              <span className="text-[#C9A24D] italic">par un vœu.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/60 leading-relaxed font-medium">
              Choisis ce qui compte vraiment pour toi aujourd&apos;hui. <br />
              Ensuite, découvre pourquoi ça bloque.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
            {ARCHETYPES.map((arch) => (
              <motion.button
                key={arch.id}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleArchetypeSelect(arch.id)}
                className={`p-3 md:p-12 lg:p-16 rounded-[2.5rem] border transition-all flex flex-col items-center justify-center gap-3 md:gap-8 group ${
                  selectedArchetype === arch.id 
                  ? "bg-[#C9A24D] text-[#08090F] border-[#C9A24D] shadow-[0_20px_40px_-10px_rgba(201,162,77,0.3)]" 
                  : "bg-white/5 border-white/10 text-white/70 hover:border-white/20"
                }`}
              >
                <arch.icon className={`w-8 h-8 md:w-16 md:h-16 transition-transform group-hover:scale-110 ${selectedArchetype === arch.id ? "text-[#08090F]" : "text-[#C9A24D]"}`} />
                <span className="text-xs md:text-2xl font-black uppercase tracking-widest leading-relaxed">{arch.label}</span>
              </motion.button>
            ))}
            <button 
              onClick={() => {
                handleVoeuSelect("Aucun ne me parle pour l’instant");
              }}
              className="p-3 md:p-12 lg:p-16 rounded-[2.5rem] border border-white/5 bg-white/2 shadow-inner text-xs md:text-xl font-bold text-white/30 hover:text-white/50 hover:bg-white/5 transition-all flex flex-col items-center justify-center text-center"
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
                <p className="text-sm font-black uppercase tracking-[0.3em] text-[#C9A24D]/60">Affinage de ton vœu</p>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
                  {ARCHETYPES.find(a => a.id === selectedArchetype)?.subVoeux.map((sub, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleVoeuSelect(sub)}
                      className={`w-full sm:w-auto px-6 py-5 md:px-10 md:py-8 rounded-2xl border-2 text-base md:text-2xl font-black transition-all backdrop-blur-xl ${
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

      {/* 2. LE DÉCALAGE (CHAT FLOW) */}
      <section id="decalage" className="py-24 px-4 md:px-6 relative bg-[#08090F]">
        <div className="max-w-2xl mx-auto space-y-12">
          
          <motion.div {...fadeIn} className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-6xl font-serif font-bold">Pourquoi ton vœu reste bloqué</h2>
            <p className="text-white/40 text-base md:text-lg font-bold uppercase tracking-widest italic">
              Ce n&apos;est pas ta faute, c&apos;est juste un décalage.
            </p>
          </motion.div>

          <div className="space-y-12">
            {/* 1. Carla */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col items-end gap-3 ml-auto w-[95%] md:w-full"
            >
              <span className="text-sm md:text-base text-white/40 font-black mr-6 uppercase tracking-widest">Carla</span>
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] rounded-tr-none shadow-2xl">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed">
                  Salut 👋 <br /><br />
                  Ça fait pas mal de temps que j&apos;essaye de <span className="text-[#C9A24D] font-bold italic">« {selectedVoeu || "mon projet"} »</span>. <br />
                  Mais on ne peut pas dire qu&apos;il y ait beaucoup de changement 😔
                </p>
              </div>
            </motion.div>

            {/* 2. Oracle */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-start gap-3 w-[95%] md:w-full"
            >
              <span className="text-sm md:text-base text-[#C9A24D] font-black ml-6 uppercase tracking-widest">L’Oracle</span>
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-6 md:p-8 rounded-[2rem] rounded-tl-none shadow-2xl">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed italic font-serif">
                  Bonjour <br /><br />
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
              className="flex flex-col items-end gap-3 ml-auto w-[95%] md:w-full"
            >
              <span className="text-sm md:text-base text-white/40 font-black mr-6 uppercase tracking-widest">Carla</span>
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] rounded-tr-none shadow-2xl">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed">
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
              className="flex flex-col items-start gap-3 w-[95%] md:w-full"
            >
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-6 md:p-8 rounded-[2rem] rounded-tl-none shadow-2xl">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-serif">
                  Justement. <br /><br />
                  Quand tu veux <span className="text-[#C9A24D] font-bold">« {selectedVoeu || "ton projet"} »</span>, mais que tu décides depuis un fonctionnement en surcharge, en urgence ou par peur, tu attires des situations qui vont à l’opposé.
                </p>
              </div>
            </motion.div>

            {/* BREAK - THE CUTTING QUESTION */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: 1.1 }}
              className="py-12 flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="bg-black border border-[#C9A24D] px-8 py-10 md:px-12 md:py-14 rounded-[2rem] max-w-3xl relative overflow-hidden group shadow-[0_0_50px_-10px_rgba(201,162,77,0.2)]">
                
                <p className="text-sm font-black text-[#C9A24D] mb-8 uppercase tracking-[0.2em]">
                  — Question de vérité —
                </p>
                <p className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight mb-10">
                  Quand tu échoues... <br />
                  <span className="text-[#C9A24D] italic relative inline-block mt-2">
                    comment réagis-tu ?
                  </span>
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                  {['Je force', 'Je fuis', 'Je doute'].map((response) => (
                    <button
                      key={response}
                      onClick={() => setUserResponse(response)}
                      className={`px-6 py-4 rounded-xl border-2 font-bold transition-all duration-300 ${
                        userResponse === response
                        ? "bg-[#C9A24D] text-[#08090F] border-[#C9A24D] scale-105 shadow-[0_0_20px_rgba(201,162,77,0.4)]"
                        : "bg-transparent text-white/60 border-white/20 hover:border-[#C9A24D]/50 hover:text-white"
                      } ${userResponse && userResponse !== response ? "opacity-50" : "opacity-100"}`}
                    >
                      {response}
                    </button>
                  ))}
                </div>

                {userResponse && (
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-[#C9A24D] mt-8 font-black uppercase tracking-widest"
                  >
                    C'est noté. La suite va t'éclairer.
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* 5. Carla */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.4 }}
              className="flex flex-col items-end gap-3 ml-auto w-[95%] md:w-full"
            >
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] rounded-tr-none shadow-2xl">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed">
                  C’est exactement ça… 😔
                </p>
              </div>
            </motion.div>

            {/* 6. Oracle */}
            <motion.div 
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 1.7 }}
              className="flex flex-col items-start gap-3 w-[95%] md:w-full"
            >
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-6 md:p-8 rounded-[2rem] rounded-tl-none shadow-2xl space-y-8">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed italic font-serif">
                  Ce décalage est difficile à repérer. <br />
                  Tu avances, mais jamais dans le bon sens.
                </p>
                
                {/* REAL-TIME MIRROR */}
                {selectedVoeu && VOEU_INSIGHTS[selectedVoeu] && (
                  <div className="mt-6 bg-[#08090F]/40 rounded-2xl p-6 border border-[#C9A24D]/10">
                    <p className="text-base text-white/80 mb-6 font-medium">
                      Ce que ton vœu demande de toi, ce n’est pas plus d’efforts. <br />
                      C’est un fonctionnement différent :
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <span className="text-xs font-black text-[#C9A24D] uppercase tracking-widest">Ce que ton vœu demande</span>
                        <p className="text-xl font-serif font-bold text-white">{VOEU_INSIGHTS[selectedVoeu].demand}</p>
                      </div>
                      <div className="space-y-2 md:border-l md:border-white/10 md:pl-6">
                        <span className="text-xs font-black text-white/40 uppercase tracking-widest">Ton fonctionnement actuel</span>
                        <p className="text-xl font-serif font-bold text-white/60">{VOEU_INSIGHTS[selectedVoeu].current}</p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-lg md:text-2xl text-white/90 leading-relaxed italic font-serif">
                  Et c’est pour ça que ton vœu reste bloqué.
                </p>
              </div>
            </motion.div>

            {/* 7. Carla */}
            <motion.div 
              initial={{ opacity: 0, x: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 2.0 }}
              className="flex flex-col items-end gap-3 ml-auto w-[95%] md:w-full"
            >
              <span className="text-sm md:text-base text-white/40 font-black mr-6 uppercase tracking-widest">Carla</span>
              <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] rounded-tr-none shadow-2xl">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed">
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
              className="flex flex-col items-start gap-3 w-[95%] md:w-full"
            >
              <span className="text-sm md:text-base text-[#C9A24D] font-black ml-6 uppercase tracking-widest">L’Oracle</span>
              <div className="bg-[#C9A24D]/10 border border-[#C9A24D]/20 p-6 md:p-8 rounded-[2rem] rounded-tl-none shadow-2xl">
                <p className="text-lg md:text-2xl text-white/90 leading-relaxed font-serif">
                  Fais le Crash Test, il va identifier précisément où ça décroche. <br /><br />
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
      <section className="py-32 px-4 md:px-6 relative bg-[#0C0D15]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            {...fadeIn}
            className="p-8 md:p-16 rounded-[3rem] bg-white/5 border border-white/10 space-y-12 relative"
          >
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#C9A24D]">Le Crash Test</h2>
              <p className="text-lg md:text-2xl text-white/70 leading-relaxed max-w-2xl mx-auto">
                Le Crash Test sert à identifier précisément <span className="text-[#C9A24D] font-bold">où l’écart s’est créé</span> entre ton potentiel réel et ton fonctionnement actuel.
              </p>
            </div>

            <div className="space-y-8">
              {[
                "Analyse symbolique",
                "Tests de réactions",
                "Mise en miroir comportementale",
                "Diagnostic de décision"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D] text-lg font-black">
                    {i + 1}
                  </div>
                  <span className="text-lg md:text-xl font-bold text-white/80 uppercase tracking-widest">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-10 border-t border-white/5 space-y-8">
              <div className="text-center space-y-4">
                <p className="text-sm font-black text-[#C9A24D] uppercase tracking-widest">Concrètement, tu obtiens :</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  {[
                    "Un diagnostic lisible",
                    "Des points de blocage précis",
                    "Une compréhension claire"
                  ].map((benefit, i) => (
                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                      <p className="text-sm font-bold text-white/80">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-base md:text-lg font-bold text-white/30 uppercase tracking-[0.2em] leading-relaxed text-center">
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

            {/* Transparency Section */}
            <div className="mt-12 bg-[#C9A24D]/10 border border-[#C9A24D]/20 rounded-3xl p-8 md:p-10 space-y-8 text-center">
              <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-[#C9A24D]" />
                </div>
              </div>

              {/* Method Reassurance */}
              <div className="max-w-3xl mx-auto space-y-4">
                <p className="text-base md:text-lg text-white/80 leading-relaxed font-medium">
                  Le Crash Test combine des questionnaires validés et des analyses comportementales pour mesurer votre potentiel et vos leviers d’action.
                </p>
                <p className="text-sm md:text-base text-white/50 leading-relaxed">
                  Votre date et lieu de naissance servent de cadre contextuel, permettant de mieux comprendre vos tendances naturelles et d’obtenir un diagnostic précis et exploitable.
                </p>
              </div>

              {/* Free/Transparency Divider */}
              <div className="w-full h-px bg-[#C9A24D]/10" />

              <div className="space-y-4">
                <p className="text-lg text-white/80 leading-relaxed">
                  ✅ <span className="font-bold text-white">Le Crash Test est gratuit.</span> <br />
                  Il te donne déjà des informations utiles et exploitables.
                </p>
                <p className="text-sm md:text-base text-white/50 leading-relaxed max-w-xl mx-auto">
                  👉 Certaines analyses avancées et l’accompagnement sont proposés ensuite, <br className="hidden md:block" />
                  uniquement si tu choisis d’aller plus loin.
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 5. LE CHOIX FINAL */}
      <section className="py-32 px-4 md:px-6 relative">
        <div className="max-w-6xl mx-auto space-y-20">
          <motion.div {...fadeIn} className="text-center space-y-8">
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Deux chemins s&apos;ouvrent</h2>
            <p className="text-white/50 text-lg md:text-2xl max-w-3xl mx-auto">
              Une fois le Crash Test terminé, après la lecture de ton rapport et l’échange avec ton coach IA...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <motion.div {...fadeIn} className="p-10 md:p-14 rounded-[3rem] bg-white/5 border border-white/10 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold italic">Tu fais le travail seul</h3>
              <p className="text-lg md:text-xl text-white/40 leading-relaxed">
                Avec ton rapport comme boussole, tu avances à ton rythme, en toute autonomie.
              </p>
            </motion.div>

            <motion.div {...fadeIn} className="p-10 md:p-14 rounded-[3rem] bg-[#C9A24D]/5 border border-[#C9A24D]/20 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold italic">Tu décides de ne plus être seul</h3>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium">
                Notre équipe s’engage à donner autant que toi pour mettre en place toutes les actions concrètes possibles afin de te rapprocher réellement de ton vœu.
              </p>
            </motion.div>
          </div>

          {/* SOCIAL PROOF */}
          <div className="space-y-12 pt-16 border-t border-white/5">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20">
                <Star className="w-4 h-4 text-[#C9A24D] fill-[#C9A24D]" />
                <span className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest">Déjà + de 1200 crash-tests réalisés</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { text: "J'ai enfin compris pourquoi je tournais en rond depuis 3 ans.", author: "Sophie, 34 ans" },
                { text: "Le diagnostic a mis des mots exacts sur mon blocage.", author: "Marc, 42 ans" },
                { text: "C'est bluffant de précision, même sans rien dire.", author: "Léa, 29 ans" }
              ].map((temoignage, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 p-8 rounded-3xl border border-white/10 text-center space-y-6 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-[#C9A24D] fill-[#C9A24D]" />)}
                  </div>
                  <p className="text-base md:text-lg text-white/80 italic leading-relaxed">"{temoignage.text}"</p>
                  <p className="text-xs font-black uppercase tracking-widest text-white/40">{temoignage.author}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CHOIX FINAL CTA */}
          <SectionCTA 
            text="HONORER MON VŒU MAINTENANT" 
            isActive={!!selectedVoeu}
            onClick={handleCtaClick}
          />
        </div>

        {/* Transparency Section Moved */}
      </section>

      {/* 6. CTA FINAL — ALIGNÉ AVEC LE VOEU */}
      <section className="py-40 px-4 md:px-6 text-center relative overflow-hidden">
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
            <div className="text-center space-y-2 opacity-80">
              <p className="text-base font-bold text-white/90">
                Crash Test gratuit → Diagnostic clair
              </p>
              <p className="text-sm text-white/50">
                Modules d’analyse avancés accessibles ensuite.
              </p>
            </div>

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
              <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-60">
                {selectedVoeu ? `Pour ton vœu : ${selectedVoeu}` : "Sélectionne ton vœu pour commencer"}
              </span>
            </Link>
            
            <div className="flex items-center justify-center gap-6 opacity-30">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3 h-3" /> Sans engagement
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
                <Lock className="w-3 h-3" /> Diagnostic personnel
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center opacity-20">
        <p className="text-[10px] font-black uppercase tracking-[0.5em]">
          © {new Date().getFullYear()} VOTRE LÉGENDE · MÉTHODE ALIGNEMENT DÉCISION · v3.8
        </p>
      </footer>
    </div>
  );
}
