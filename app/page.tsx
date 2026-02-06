'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Star,
  X,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { calculateLifePath } from '@/lib/numerology/engine';

// Micro-Insight Logic
const getMicroInsight = (lifePath: number, archetypeId: string): string => {
  // Simple mapping logic: LifePath vs Archetype
  // This is a teaser, so it should be striking but generic enough
  
  const insights: Record<string, string> = {
    "amour": `Ton Chemin de Vie ${lifePath} cherche l'indépendance, mais ton ambition amoureuse demande de la fusion. C'est ce tiraillement qui crée l'instabilité.`,
    "famille": `Avec un Chemin de Vie ${lifePath}, tu as besoin de liberté, mais ton ambition familiale te ramène à des devoirs. Tu te sens piégé entre loyauté et évasion.`,
    "decisions": `Ton Chemin de Vie ${lifePath} est intuitif, mais tu essaies de tout rationaliser. Ton indécision vient de là : tu n'écoutes pas ta première impression.`,
    "confiance": `Ton énergie ${lifePath} est puissante mais brute. Ton manque de confiance vient du fait que tu essaies de rentrer dans un moule trop petit pour toi.`,
    "solitude": `Le Chemin de Vie ${lifePath} a besoin de solitude pour se recharger, mais tu la confonds avec de l'isolement. Tu as peur du vide alors qu'il est ta force.`,
    "vie": `Ton Chemin de Vie ${lifePath} demande du mouvement. Ta vie actuelle est trop statique, c'est pour ça que tu as l'impression d'étouffer.`
  };

  // Fallback specific per number if needed, but generic archetype mapping is safer for a teaser
  // We can refine this later with a matrix Number x Archetype
  
  return insights[archetypeId] || `Ton Chemin de Vie ${lifePath} entre en friction avec ton ambition actuelle.`;
};

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
      {selectedVoeu && selectedVoeu !== "Aucune ne me parle pour l’instant" && (
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
                  <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-[#08090F]/70 block">Mon ambition actuelle</span>
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
                        Prends un instant pour ressentir si cette ambition vient de ton cœur (envie) ou de ta tête (peur).
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-6 w-full sm:w-auto">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="px-8 py-4 bg-[#C9A24D] text-[#08090F] rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_10px_30px_-5px_rgba(201,162,77,0.4)]"
                      >
                        Oui, je la garde
                      </button>
                      <button
                        onClick={() => {
                          onClear();
                          setIsOpen(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-8 py-4 bg-white/5 text-white/60 border border-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all"
                      >
                        Changer d'ambition
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
        id="hero-cta" // Add ID for scroll targeting
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="py-12 flex flex-col items-center gap-4 w-full"
      >
        <button 
          onClick={onClick}
          className="group relative inline-flex flex-col items-center gap-2 px-10 py-8 rounded-[40px] bg-[#C9A24D] text-[#08090F] shadow-[0_20px_60px_-10px_rgba(201,162,77,0.5)] hover:scale-105 active:scale-95 transition-all overflow-hidden mx-auto"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
          
          <span className="text-xl md:text-2xl font-black tracking-tight uppercase">
            {text}
          </span>
          <div className="flex items-center gap-2 opacity-60">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Accéder au Crash Test</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
        
        <div className="text-center space-y-1">
          <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
            Diagnostic Flash (30 secondes)
          </p>
          <p className="text-[9px] text-white/30">
            Gratuit & Sans inscription
          </p>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default function Home() {
  const router = useRouter();
  const [selectedArchetype, setSelectedArchetype] = useState<string | null>(null);
  const [selectedVoeu, setSelectedVoeu] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  
  // Teaser Modal State
  const [showTeaserModal, setShowTeaserModal] = useState(false);
  const [teaserBirthDate, setTeaserBirthDate] = useState('');
  const [teaserResult, setTeaserResult] = useState<{path: number, text: string} | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const [userResponse, setUserResponse] = useState<string | null>(null);

  useEffect(() => {
    trackEvent('home_view');
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
    
    // Attendre un peu pour laisser l'UI se mettre à jour
    setTimeout(() => {
      // Au lieu de scroller vers #decalage, on scrolle vers le bouton CTA dans la même section
      // On cherche l'élément CTA par son texte ou une classe spécifique
      const ctaButton = document.getElementById('hero-cta');
      if (ctaButton) {
        ctaButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  const handleTeaserClick = () => {
    setShowTeaserModal(true);
    trackEvent('teaser_modal_open');
  };

  const calculateTeaser = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mobile fix: ensure we have enough data even if format is slightly off
    const cleanDate = teaserBirthDate.replace(/\D/g, '');
    if (cleanDate.length < 8) return; 

    setIsCalculating(true);
    
    // Simulate calculation time for effect
    setTimeout(() => {
      // Handle DD/MM/YYYY format manual entry or YYYY-MM-DD from picker
      let isoDate = teaserBirthDate;
      
      // If we have clean 8 digits (DDMMYYYY), format it to ISO
      if (!teaserBirthDate.includes('-') && cleanDate.length === 8) {
        const d = cleanDate.slice(0, 2);
        const m = cleanDate.slice(2, 4);
        const y = cleanDate.slice(4);
        isoDate = `${y}-${m}-${d}`;
      }
      else if (teaserBirthDate.includes('/')) {
        const [d, m, y] = teaserBirthDate.split('/');
        isoDate = `${y}-${m}-${d}`;
      }

      const lp = calculateLifePath(isoDate);
      const text = getMicroInsight(lp, selectedArchetype || 'vie');
      setTeaserResult({ path: lp, text });
      setIsCalculating(false);
      trackEvent('teaser_calculated', { lifePath: lp });
    }, 1500);
  };
  
  // Format input value visually for DD/MM/YYYY
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    
    // Allow user to delete slashes naturally
    if (val.length < teaserBirthDate.length) {
       setTeaserBirthDate(val);
       return;
    }

    val = val.replace(/\D/g, ''); // Keep only numbers
    if (val.length > 8) val = val.slice(0, 8); // Max 8 digits
    
    // Add slashes automatically
    if (val.length > 4) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
    } else if (val.length > 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    
    setTeaserBirthDate(val);
  };

  const proceedToFullTest = () => {
    // Pre-save data to localStorage so it's ready in the full test
    const cosmicData = { birthDate: teaserBirthDate };
    localStorage.setItem('cosmic_user_data', JSON.stringify(cosmicData));
    
    trackEvent('teaser_convert_to_full');
    router.push('/miroir/experience');
  };

  const handleCtaClick = () => {
    // OLD Logic: handleTeaserClick instead of direct navigation
    handleTeaserClick();
  };

  // State to show full content only after initial engagement if desired, 
  // but for now we simplify the view by hiding sections initially or just visual focus.
  // User asked for "Single Block" at start.
  
  return (
    <div className="min-h-screen bg-[#08090F] text-white font-sans selection:bg-[#C9A24D]/30 overflow-x-hidden flex flex-col">
      
      <FloatingVoeuBadge selectedVoeu={selectedVoeu} onClear={() => {
        setSelectedVoeu(null);
        setSelectedArchetype(null);
      }} />

      {/* TEASER MODAL */}
      <AnimatePresence>
        {showTeaserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#08090F]/90 backdrop-blur-md"
              onClick={() => setShowTeaserModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#12121A] border border-[#C9A24D]/30 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-[0_0_100px_-20px_rgba(201,162,77,0.3)] text-center"
            >
              <button 
                onClick={() => setShowTeaserModal(false)}
                className="absolute top-6 right-6 p-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>

              {!teaserResult ? (
                // STEP 1: INPUT
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mx-auto border border-[#C9A24D]/20 animate-pulse">
                    <Sparkles className="w-8 h-8 text-[#C9A24D]" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                      Vérifions ta compatibilité
                    </h3>
                    <p className="text-white/60 leading-relaxed">
                      Pour identifier ton blocage précis, nous avons juste besoin de ta date de naissance.
                    </p>
                  </div>

                  <form onSubmit={calculateTeaser} className="space-y-6">
                    <div className="space-y-2 text-left">
                      <label className="text-xs font-black uppercase tracking-widest text-[#C9A24D] ml-4">Ta date de naissance (JJ/MM/AAAA)</label>
                      <input 
                        type="text" 
                        inputMode="numeric"
                        placeholder="Ex: 12/05/1990"
                        maxLength={10}
                        required
                        value={teaserBirthDate}
                        onChange={handleDateChange}
                        className="w-full bg-[#08090F] border-2 border-white/10 rounded-2xl px-6 py-4 font-bold text-xl text-white focus:border-[#C9A24D] outline-none transition-all text-center placeholder-white/20"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={!teaserBirthDate || teaserBirthDate.replace(/\D/g, '').length < 8 || isCalculating}
                      onTouchEnd={(e) => {
                         // Fallback for mobile touch
                         if (!isCalculating && teaserBirthDate.replace(/\D/g, '').length >= 8) {
                           calculateTeaser(e);
                         }
                      }}
                      className="w-full py-5 bg-[#C9A24D] text-[#08090F] rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_-5px_rgba(201,162,77,0.4)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100 touch-manipulation"
                    >
                      {isCalculating ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#08090F]"></div>
                          Analyse en cours...
                        </>
                      ) : (
                        <>
                          Révéler mon blocage <Zap className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                  
                  <p className="text-[10px] text-white/30 flex items-center justify-center gap-2">
                    <ShieldCheck className="w-3 h-3" /> 100% Confidentiel
                  </p>
                </div>
              ) : (
                // STEP 2: RESULT
                <div className="space-y-8">
                  <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                    <Activity className="w-8 h-8 text-red-500" />
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-black uppercase tracking-widest text-[#C9A24D]">
                      Chemin de Vie {teaserResult.path} détecté
                    </p>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                      ⚠️ Origine du blocage identifiée
                    </h3>
                  </div>

                  <div className="bg-white/5 p-6 rounded-3xl border border-white/10">
                    <p className="text-lg text-white/90 italic leading-relaxed">
                      "{teaserResult.text}"
                    </p>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={proceedToFullTest}
                      className="w-full py-5 bg-[#C9A24D] text-[#08090F] rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_-5px_rgba(201,162,77,0.4)] flex items-center justify-center gap-3"
                    >
                      Comprendre ce qui me rend différent <ArrowRight className="w-5 h-5" />
                    </button>
                    <p className="text-xs text-white/40">
                      Nouvelle analyse gratuite avec votre prénom
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. HERO — SINGLE BLOCK FOCUS */}
      <section className="flex-grow flex flex-col items-center justify-center px-4 md:px-8 relative pt-12 pb-12 w-full z-10">
        <div className="w-full max-w-[1600px] text-center space-y-12 md:space-y-16">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            <div className="flex flex-col items-center gap-6 mb-4">
              <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#C9A24D] text-[#08090F] shadow-[0_0_40px_-5px_rgba(201,162,77,0.6)] animate-pulse">
                <Zap className="w-5 h-5 fill-[#08090F]" />
                <span className="text-sm md:text-base font-black uppercase tracking-widest">Diagnostic Flash en 30 secondes</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
              Pourquoi ça bloque <br />
              <span className="text-[#C9A24D] italic">pour toi ?</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-2xl text-white/60 leading-relaxed font-medium">
              Choisis le domaine où tu te sens coincé(e). <br />
              Obtiens la réponse immédiate sur l'origine du problème.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-0 max-w-5xl mx-auto">
            {ARCHETYPES.map((arch) => (
              <motion.button
                key={arch.id}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                   setSelectedArchetype(arch.id);
                   setTimeout(() => {
                     handleTeaserClick();
                   }, 100);
                }}
                className={`p-6 md:p-8 rounded-[2rem] border transition-all flex flex-col items-center justify-center gap-4 group bg-white/5 border-white/10 text-white/70 hover:border-[#C9A24D]/50 hover:text-white hover:shadow-[0_0_30px_-10px_rgba(201,162,77,0.2)]`}
              >
                <arch.icon className={`w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-110 text-[#C9A24D]`} />
                <span className="text-sm md:text-lg font-black uppercase tracking-widest leading-relaxed">{arch.label}</span>
              </motion.button>
            ))}
          </div>

          <div className="pt-4 opacity-40 text-sm font-medium">
            <p>Sans inscription • Résultat immédiat • 100% Gratuit</p>
          </div>
        </div>
      </section>

      {/* BACKGROUND ELEMENTS - FIXED FULLSCREEN */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[120px] rounded-full" />
          <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover opacity-20">
            <source src="/nuage.mp4" type="video/mp4" />
          </video>
      </div>

      {/* FOOTER - FIXED BOTTOM - Z-INDEX MAXIMAL */}
      <footer className="fixed bottom-0 left-0 right-0 py-4 px-6 border-t border-white/10 text-center opacity-80 text-[10px] font-black uppercase tracking-[0.2em] z-[100] bg-[#08090F] safe-area-bottom">
        © {new Date().getFullYear()} VOTRE LÉGENDE · MÉTHODE ALIGNEMENT DÉCISION
      </footer>
    </div>
  );
}
