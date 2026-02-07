'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Heart,
  Users,
  Compass,
  Star,
  Target,
  Activity,
  X,
  Zap,
  CheckCircle2,
  Share2,
  Lock,
  ShieldCheck
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';
import { calculateLifePath } from '@/lib/numerology/engine';

// --- DATA ---

const MATRIX_INSIGHTS: Record<number, Record<string, string>> = {
  1: {
    amour: "Tu aimes quand ça avance.",
    famille: "Tu montres naturellement la voie.",
    decisions: "Tu es fait pour décider.",
    confiance: "Ta force, c’est l’initiative.",
    solitude: "Choisir te libère.",
    vie: "Ta vie demande du leadership."
  },
  2: {
    amour: "Tu recherches une vraie connexion.",
    famille: "Tu crées l’harmonie.",
    decisions: "Ton ressenti guide tes choix.",
    confiance: "Ta sensibilité est une force.",
    solitude: "Te faire confiance change tout.",
    vie: "Ta vie suit ton rythme."
  },
  3: {
    amour: "Tu dois rester toi-même.",
    famille: "Tu apportes de la légèreté.",
    decisions: "Ton élan montre la voie.",
    confiance: "T’exprimer te renforce.",
    solitude: "La joie te libère.",
    vie: "Ta vie doit s’exprimer."
  },
  4: {
    amour: "Tu recherches la solidité.",
    famille: "Tu es un pilier.",
    decisions: "Le concret te guide.",
    confiance: "La constance te renforce.",
    solitude: "La structure apaise.",
    vie: "Ta vie manque de bases."
  },
  5: {
    amour: "Tu as besoin d’air.",
    famille: "Tu insuffles du mouvement.",
    decisions: "L’espace clarifie tes choix.",
    confiance: "La liberté te révèle.",
    solitude: "Le mouvement t’équilibre.",
    vie: "Ta vie te limite."
  },
  6: {
    amour: "Tu aimes en protégeant.",
    famille: "Tu prends soin naturellement.",
    decisions: "Tes valeurs te guident.",
    confiance: "Ton cœur est ta force.",
    solitude: "Tu n’as pas à tout porter.",
    vie: "Ta vie manque d’alignement."
  },
  7: {
    amour: "Tu cherches du sens.",
    famille: "Tu observes avant d’agir.",
    decisions: "Comprendre t’éclaire.",
    confiance: "Ta lucidité te renforce.",
    solitude: "Ton intuition sait.",
    vie: "Ta vie manque de profondeur."
  },
  8: {
    amour: "Tu veux du solide.",
    famille: "Tu sécurises ton entourage.",
    decisions: "Tu es fait pour diriger.",
    confiance: "L’action te renforce.",
    solitude: "Reprendre le contrôle libère.",
    vie: "Ta puissance est retenue."
  },
  9: {
    amour: "Tu aimes profondément.",
    famille: "Tu fédères naturellement.",
    decisions: "Le sens guide tes choix.",
    confiance: "Ton impact te porte.",
    solitude: "Lâcher libère.",
    vie: "Ta vie manque de sens."
  }
};

const ARCHETYPE_DESCRIPTIONS: Record<string, string> = {
  "amour": "Ton Chemin de Vie {{LP}} cherche l'indépendance, mais ton ambition amoureuse demande de la fusion. C'est ce tiraillement qui crée l'instabilité.",
  "famille": "Avec un Chemin de Vie {{LP}}, tu as besoin de liberté, mais ton ambition familiale te ramène à des devoirs. Tu te sens piégé entre loyauté et évasion.",
  "decisions": "Ton Chemin de Vie {{LP}} est intuitif, mais tu essaies de tout rationaliser. Ton indécision vient de là : tu n'écoutes pas ta première impression.",
  "confiance": "Ton énergie {{LP}} est puissante mais brute. Ton manque de confiance vient du fait que tu essaies de rentrer dans un moule trop petit pour toi.",
  "solitude": "Le Chemin de Vie {{LP}} a besoin de solitude pour se recharger, mais tu la confonds avec de l'isolement. Tu as peur du vide alors qu'il est ta force.",
  "vie": "Ton Chemin de Vie {{LP}} demande du mouvement. Ta vie actuelle est trop statique, c'est pour ça que tu as l'impression d'étouffer."
};

const getMicroInsight = (lifePath: number, archetypeId: string): { description: string, punchline: string } => {
  // Force reduction to single digit (1-9) for matrix lookup
  let lookupPath = lifePath;
  
  while (lookupPath > 9) {
    lookupPath = String(lookupPath).split('').reduce((a, b) => Number(a) + Number(b), 0);
  }

  const rawDesc = ARCHETYPE_DESCRIPTIONS[archetypeId] || "Ton Chemin de Vie {{LP}} entre en friction avec ton ambition actuelle.";
  const description = rawDesc.replace("{{LP}}", lifePath.toString()); // Keep original LP for display text

  const pathInsights = MATRIX_INSIGHTS[lookupPath];
  const punchline = (pathInsights && pathInsights[archetypeId]) 
    ? pathInsights[archetypeId] 
    : `Ton Chemin de Vie ${lifePath} cherche sa voie.`;

  return { description, punchline };
};

const DOMAINS = [
  { id: "amour", label: "Amour & Relations", icon: Heart },
  { id: "famille", label: "Famille & Liens", icon: Users },
  { id: "decisions", label: "Décisions & Choix", icon: Compass },
  { id: "confiance", label: "Confiance en soi", icon: Star },
  { id: "solitude", label: "Solitude", icon: Target },
  { id: "vie", label: "Sens de la vie", icon: Activity }
];

// --- COMPONENTS ---

export default function Home() {
  const router = useRouter();
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  
  // Teaser Modal State
  const [showTeaserModal, setShowTeaserModal] = useState(false);
  const [teaserBirthDate, setTeaserBirthDate] = useState('');
  const [teaserResult, setTeaserResult] = useState<{path: number, description: string, punchline: string} | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  useEffect(() => {
    trackEvent('home_view');
  }, []);

  const scrollToDomains = () => {
    const section = document.getElementById('domaines');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      trackEvent('cta_start_click');
    }
  };

  const handleDomainSelect = (id: string) => {
    setSelectedDomain(id);
    setShowTeaserModal(true);
    trackEvent('domain_selected', { id });
  };

  const calculateTeaser = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanDate = teaserBirthDate.replace(/\D/g, '');
    if (cleanDate.length < 8) return; 
    
    trackEvent('compatibility_check_start');
    setIsCalculating(true);
    
    setTimeout(() => {
      let isoDate = teaserBirthDate;
      if (!teaserBirthDate.includes('-') && cleanDate.length === 8) {
        const d = cleanDate.slice(0, 2);
        const m = cleanDate.slice(2, 4);
        const y = cleanDate.slice(4);
        isoDate = `${y}-${m}-${d}`;
      } else if (teaserBirthDate.includes('/')) {
        const [d, m, y] = teaserBirthDate.split('/');
        isoDate = `${y}-${m}-${d}`;
      }

      const lp = calculateLifePath(isoDate);
      const currentDomain = selectedDomain || 'vie';
      const { description, punchline } = getMicroInsight(lp, currentDomain);
      
      setTeaserResult({ path: lp, description, punchline });
      setIsCalculating(false);
      trackEvent('teaser_calculated', { lifePath: lp });
      
      // TikTok Standard Event
      trackEvent('ViewContent', {
        contents: [{
          content_id: 'teaser_lp_' + lp,
          content_type: 'product',
          content_name: `Teaser Chemin de Vie ${lp}`
        }],
        value: 0,
        currency: 'EUR'
      });
    }, 1500);
  };
  
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.length < teaserBirthDate.length) {
       setTeaserBirthDate(val);
       return;
    }
    val = val.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length > 4) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4)}`;
    } else if (val.length > 2) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setTeaserBirthDate(val);
  };

  const proceedToFullTest = () => {
    let isoDate = teaserBirthDate;
    const cleanDate = teaserBirthDate.replace(/\D/g, '');
    if (!teaserBirthDate.includes('-') && cleanDate.length === 8) {
      const d = cleanDate.slice(0, 2);
      const m = cleanDate.slice(2, 4);
      const y = cleanDate.slice(4);
      isoDate = `${y}-${m}-${d}`;
    } else if (teaserBirthDate.includes('/')) {
      const [d, m, y] = teaserBirthDate.split('/');
      isoDate = `${y}-${m}-${d}`;
    }

    const cosmicData = { birthDate: isoDate };
    localStorage.setItem('cosmic_user_data', JSON.stringify(cosmicData));
    
    trackEvent('teaser_convert_to_full');
    router.push('/miroir/experience');
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)]/20 font-sans">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center pt-10 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto space-y-10"
        >
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight text-[var(--foreground)]">
            Un test simple pour comprendre tes blocages actuels.
          </h1>

          {/* Subtext */}
          <div className="space-y-4">
            <p className="text-lg md:text-xl text-[var(--text-secondary)] font-light leading-relaxed">
              Choisis le domaine où tu te sens coincé(e). <br className="hidden md:block"/>
              Obtiens la réponse immédiate sur l'origine du problème.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-[var(--text-secondary)]/60 uppercase tracking-widest">
              <span>⏱ 2 minutes</span>
              <span>•</span>
              <span>Résultat immédiat</span>
              <span>•</span>
              <span>Gratuit</span>
            </div>
          </div>

          {/* Single CTA */}
          <div className="pt-4">
            <button 
              onClick={scrollToDomains}
              className="px-10 py-5 bg-[var(--accent)] text-white rounded-full text-lg font-bold shadow-lg hover:bg-[#B9621F] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full md:w-auto"
            >
              Commencer le test gratuit
            </button>
          </div>
        </motion.div>
      </section>

      {/* --- DOMAINS GRID (Hidden initially, revealed on scroll) --- */}
      <section id="domaines" className="py-24 px-6 bg-white/50 border-t border-[var(--foreground)]/5">
        <div className="max-w-5xl mx-auto space-y-16 text-center">
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--foreground)]">
              Où ressens-tu un blocage ?
            </h2>
            <p className="text-[var(--text-secondary)]">
              Sélectionne un thème pour lancer l'analyse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOMAINS.map((domain) => (
              <motion.button
                key={domain.id}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDomainSelect(domain.id)}
                className="group p-8 bg-white rounded-3xl border border-[var(--foreground)]/5 shadow-sm hover:border-[var(--accent)]/30 transition-all text-left flex flex-col gap-6"
              >
                <div className="w-12 h-12 rounded-2xl bg-[var(--background)] flex items-center justify-center text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-white transition-colors">
                  <domain.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[var(--foreground)] mb-1">
                    {domain.label}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Comprendre mon blocage ici
                  </p>
                </div>
                <div className="mt-auto pt-4 flex items-center text-sm font-bold text-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                  Analyser <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.button>
            ))}
          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 text-center text-[var(--text-secondary)]/40 text-sm bg-[var(--background)] border-t border-[var(--foreground)]/5">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <div className="flex justify-center gap-6 uppercase tracking-widest text-xs font-bold">
            <Link href="/mentions-legales" className="hover:text-[var(--accent)]">Mentions</Link>
            <Link href="/cgv" className="hover:text-[var(--accent)]">CGV</Link>
            <Link href="mailto:contact@votrelegende.com" className="hover:text-[var(--accent)]">Contact</Link>
          </div>
          <p>© {new Date().getFullYear()} Votre Légende. Tous droits réservés.</p>
          <button 
             onClick={() => setShowDisclaimer(!showDisclaimer)}
             className="text-xs hover:text-[var(--foreground)] underline decoration-dotted underline-offset-4"
          >
             Avertissement Légal
          </button>
          {showDisclaimer && (
             <div className="max-w-2xl mx-auto pt-4 text-xs leading-relaxed opacity-70">
                Ce service est conçu à des fins de divertissement et d'introspection. 
                Il ne remplace en aucun cas un avis médical ou psychologique professionnel.
             </div>
          )}
        </div>
      </footer>

      {/* --- MODAL --- */}
      <AnimatePresence>
        {showTeaserModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#3A2E26]/40 backdrop-blur-sm"
              onClick={() => setShowTeaserModal(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-[#FAF8F4] rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowTeaserModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[var(--text-secondary)]" />
              </button>

              {!teaserResult ? (
                // STEP 1: INPUT
                <div className="space-y-8 text-center">
                  <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto text-[var(--accent)]">
                    <Lock className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif font-bold text-[var(--foreground)]">
                      Date de naissance
                    </h3>
                    <p className="text-[var(--text-secondary)]">
                      Nécessaire pour calculer ton cycle de décision.
                    </p>
                  </div>

                  <form onSubmit={calculateTeaser} className="space-y-6">
                    <input 
                      type="text" 
                      inputMode="numeric"
                      placeholder="JJ/MM/AAAA"
                      maxLength={10}
                      required
                      value={teaserBirthDate}
                      onChange={handleDateChange}
                      className="w-full bg-white border border-[var(--foreground)]/10 rounded-xl px-6 py-4 font-bold text-2xl text-[var(--foreground)] text-center focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] outline-none transition-all placeholder:text-[var(--foreground)]/20"
                    />
                    
                    <button
                      type="submit"
                      disabled={!teaserBirthDate || teaserBirthDate.replace(/\D/g, '').length < 8 || isCalculating}
                      className="w-full py-4 bg-[var(--accent)] text-white rounded-xl font-bold text-lg hover:bg-[#B9621F] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isCalculating ? 'Calcul en cours...' : 'Révéler mon blocage'}
                    </button>
                  </form>
                  
                  <p className="text-xs text-[var(--text-secondary)]/50 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Donnée confidentielle, non stockée.
                  </p>
                </div>
              ) : (
                // STEP 2: RESULT
                <div className="space-y-8 text-center">
                   <div className="w-12 h-12 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-2 animate-pulse">
                      <Sparkles className="w-6 h-6 text-[var(--accent)]" />
                   </div>
                   
                   <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-bold uppercase tracking-widest mb-2">
                      Chemin de Vie {teaserResult.path}
                   </div>

                   <h3 className="text-3xl font-serif font-bold text-[var(--foreground)] leading-tight">
                     "{teaserResult.punchline}"
                   </h3>

                   <div className="py-6 border-y border-[var(--foreground)]/5">
                     <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                       {teaserResult.description}
                     </p>
                   </div>

                   <div className="space-y-4">
                     <button
                       onClick={proceedToFullTest}
                       className="w-full py-4 bg-[var(--accent)] text-white rounded-xl font-bold text-lg hover:bg-[#B9621F] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                     >
                       Comprendre pourquoi <ArrowRight className="w-5 h-5" />
                     </button>

                     <button 
                        onClick={() => {
                          const text = `Je viens de découvrir mon blocage caché : "${teaserResult.punchline}".\n\nFais le test ici : https://votrelegende.fr`;
                          if (navigator.share) {
                            navigator.share({ title: 'Mon Diagnostic', text, url: 'https://votrelegende.fr' }).catch(() => {});
                          } else {
                            navigator.clipboard.writeText(text);
                            alert("Copié !");
                          }
                          trackEvent('share_tiktok_dm_teaser');
                        }}
                        className="w-full py-3 bg-white border border-[var(--foreground)]/10 text-[var(--text-secondary)] rounded-xl font-bold text-sm hover:bg-[var(--background)] transition-all flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Partager à un ami
                      </button>
                   </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
