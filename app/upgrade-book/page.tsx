'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { BookOpen, Star, CheckCircle, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

function UpgradeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('orderId');
  const isDemo = searchParams.get('demo') === 'true';
  
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showExcerpt, setShowExcerpt] = useState(false);

  useEffect(() => {
    if (isDemo) {
      setUserData({ firstName: "Jean-Philippe", delivery: { email: "demo@example.com" } });
      setLoading(false);
      return;
    }

    if (!orderId) {
      setError("Lien invalide. Veuillez utiliser le lien reçu par email.");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/book-request?id=${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setUserData(data.user_data);
        } else {
          setError("Commande introuvable.");
        }
      } catch (err) {
        setError("Erreur de connexion.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, isDemo]);

  const handleUpgrade = async () => {
    if (isDemo) {
      alert("Mode démo : Redirection vers Stripe simulée.");
      return;
    }
    setProcessing(true);
    try {
      const res = await fetch('/api/checkout/upgrade', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: orderId,
          email: userData?.delivery?.email || '',
          firstName: userData?.firstName || 'Client',
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de la création du paiement.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24D]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex flex-col items-center justify-center p-4">
        <div className="text-red-500 mb-4 text-xl font-serif">⚠️ {error}</div>
        <button 
          onClick={() => router.push('/')}
          className="text-[#2C2F4A] underline hover:text-[#C9A24D]"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans text-[#2C2F4A]">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] font-bold text-sm tracking-wide uppercase mb-4">
            Offre Réservée aux Membres
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#2C2F4A] mb-6">
            Complétez votre Légende, {userData?.firstName}
          </h1>
          <p className="text-lg text-[#57534e] max-w-2xl mx-auto leading-relaxed">
            Vous avez découvert vos nombres. Maintenant, laissez-nous écrire votre histoire.
            Transformez votre rapport technique en une véritable biographie romancée.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#EFEDE9]">
          <div className="grid md:grid-cols-2">
            
            {/* Image Side */}
            <div className="relative h-64 md:h-auto bg-[#2C2F4A] flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop')] opacity-20 bg-cover bg-center"></div>
              <div className="relative z-10 text-center">
                <BookOpen className="w-16 h-16 text-[#C9A24D] mx-auto mb-4" />
                <h3 className="text-white font-serif text-2xl font-bold mb-2">Le Roman de Votre Vie</h3>
                <p className="text-white/70 italic mb-6">"Votre existence est une épopée qui mérite d'être racontée."</p>
                
                <button 
                  onClick={() => setShowExcerpt(true)}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-xs font-bold px-5 py-3 rounded-full shadow-lg flex items-center gap-2 mx-auto transition-all transform hover:scale-105"
                >
                  <BookOpen className="w-4 h-4" />
                  Lire un extrait
                </button>
              </div>
            </div>

            {/* Content Side */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#C9A24D]" />
                  Ce que vous allez recevoir
                </h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Biographie Romancée (100 pages)</span>
                      <p className="text-sm text-gray-500">Votre vie racontée comme un roman initiatique dont vous êtes le héros.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Basé sur VOTRE Numérologie</span>
                      <p className="text-sm text-gray-500">L'IA utilise les calculs de votre rapport existant pour structurer l'intrigue.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Format PDF Haute Qualité</span>
                      <p className="text-sm text-gray-500">Lecture confortable sur tablette, liseuse ou ordinateur.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div>
                <div className="flex items-end gap-3 mb-6">
                  <div className="text-4xl font-bold text-[#2C2F4A]">29,00 €</div>
                  <div className="text-gray-400 line-through mb-1.5">59,00 €</div>
                </div>

                <button
                  onClick={handleUpgrade}
                  disabled={processing}
                  className="w-full bg-[#C9A24D] hover:bg-[#b08d42] text-white font-bold py-4 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white"></div>
                      Préparation du paiement...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Obtenir mon Roman maintenant
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Paiement sécurisé par Stripe
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-12 text-center max-w-2xl mx-auto">
          <div className="flex justify-center gap-1 text-[#C9A24D] mb-4">
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </div>
          <p className="text-lg italic text-[#57534e]">
            "Je ne pensais pas que ma vie pouvait être aussi passionnante à lire. J'ai pleuré en découvrant comment mes épreuves étaient en fait des étapes nécessaires de mon voyage."
          </p>
          <p className="text-sm font-bold text-[#2C2F4A] mt-2">— Sarah L., Lyon</p>
        </div>
      </div>

      {/* Excerpt Modal */}
      <AnimatePresence>
        {showExcerpt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowExcerpt(false)}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-[#FDFBF7] w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Book Spine Effect */}
              <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-[#E3E1DD] to-[#FDFBF7] z-10"></div>
              
              <button 
                onClick={() => setShowExcerpt(false)}
                className="absolute top-4 right-4 text-[#2C2F4A]/40 hover:text-[#2C2F4A] transition-colors z-20"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <div className="p-8 md:p-16 pl-12 md:pl-24 font-serif text-[#2C2F4A] leading-relaxed relative max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="text-xs tracking-[0.2em] text-[#C9A24D] uppercase mb-8 text-center font-sans font-bold">Extrait du Chapitre 1</div>
                
                <div className="space-y-6 text-lg md:text-xl">
                  <p>
                    <span className="text-5xl float-left mr-3 mt-[-10px] text-[#5B4B8A] font-bold">L</span>
                    ’air de la pièce semblait s’être figé, comme si le temps lui-même attendait une permission pour reprendre sa course. Thomas fixa le reflet dans le miroir, mais ce n'était plus tout à fait le sien. Ce matin-là, les lignes de son visage semblaient dessiner une carte qu'il avait longtemps refusé de lire.
                  </p>
                  <p>
                    Il se souvint de ce vieux secret qu'il portait depuis l'enfance : cette sensation d'être né sous un ciel qui exigeait trop de lui. Le nombre 14 n'était pas qu'une simple date sur son état civil ; c'était un rythme, une oscillation constante entre le besoin de tout détruire et l'envie de tout construire. Pour d'autres, c'était un mardi ordinaire. Pour lui, c'était le code source de son instabilité chronique et de son génie foudroyant.
                  </p>
                  <p>
                    Soudain, une lueur dorée traversa la fenêtre, illuminant une vieille boussole posée sur son bureau. Thomas comprit alors ce que les cycles tentaient de lui dire depuis des mois. Il arrivait au bout de la Neuvième Terre. Tout ce qu'il avait bâti ces dernières années s'effritait, non pas par échec, mais pour laisser place à la suite. Les dragons qu'il avait combattus — ce doute persistant sur sa légitimité, cette peur de l'ombre — n'étaient en réalité que des gardiens. Ils ne voulaient pas le dévorer, ils vérifiaient s'il était prêt pour la Grande Transition.
                  </p>
                </div>

                <div className="mt-12 text-center">
                  <div className="inline-block w-16 h-[1px] bg-[#C9A24D]/50 mb-2"></div>
                  <p className="text-xs text-[#2C2F4A]/40 italic">Page 14 • Le Gardien des Seuils</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UpgradeBookPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9A24D]"></div>
      </div>
    }>
      <UpgradeContent />
    </Suspense>
  );
}