'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { trackEvent, identifyUser } from '@/lib/analytics';
import { 
  Lock, 
  CreditCard, 
  ArrowRight, 
  Star, 
  Zap, 
  ChevronLeft, 
  Search, 
  Brain, 
  Layers, 
  BookOpen, 
  Compass, 
  MessageCircle, 
  TrendingUp,
  User,
  Sparkles
} from 'lucide-react';

const PLANS = {
  bundle: {
    id: 'bundle',
    name: "Réalise Le Crash-Test complet",
    price: 49,
    description: "L’analyse complète pour comprendre l’écart entre ton potentiel de naissance et la façon dont tu fonctionnes aujourd’hui.",
    features: [
      { icon: Search, text: "Analyse numérologique & astrologique de ton potentiel de naissance" },
      { icon: Brain, text: "Analyse de tes choix et réactions réelles face aux situations" },
      { icon: Layers, text: "Comparaison claire entre potentiel, comportements et image perçue" },
      { icon: BookOpen, text: "Dossier personnalisé (PDF) pour approfondir à ton rythme" },
      { icon: Compass, text: "Exercices simples pour amorcer un réalignement progressif" },
      { icon: MessageCircle, text: "Accès illimité au Coach IA pour poser toutes tes questions et approfondir ton analyse" }
    ],
    cta: "Payer 49 € et débloquer mon analyse",
    label: "Accès complet au Crash-Test de ton Destin",
    type: "paiement unique"
  },
  parcours_autonome: {
    id: 'parcours_autonome',
    name: "Parcours 3 Mois - Autonome",
    price: 499,
    description: "Un parcours structuré sur 3 mois pour mettre en pratique ta lecture de vie à travers 3 cycles thématiques.",
    features: [
      { icon: Layers, text: "Accès aux 3 cycles mensuels d'exploration" },
      { icon: BookOpen, text: "Tous les contenus, exercices et synthèses" },
      { icon: Compass, text: "Accès illimité à la plateforme pendant 3 mois" },
      { icon: Lock, text: "Parcours en autonomie totale (sans rendez-vous)" }
    ],
    cta: "Payer 499 € et commencer mon parcours",
    label: "Parcours 3 Mois - Option 1",
    type: "pour 3 mois"
  },
  parcours_mensuel: {
    id: 'parcours_mensuel',
    name: "Parcours 3 Mois + Coach Mensuel",
    price: 1599,
    description: "Le parcours complet avec un accompagnement individuel chaque mois pour clarifier tes avancées.",
    features: [
      { icon: MessageCircle, text: "1 session individuelle (1 heure/mois) avec un coach" },
      { icon: Layers, text: "Accès complet aux 3 cycles mensuels" },
      { icon: Brain, text: "Échange personnalisé autour de tes exercices" },
      { icon: Compass, text: "Aide à la prise de recul et à la mise en pratique" }
    ],
    cta: "Payer 1 599 € et commencer mon parcours",
    label: "Parcours 3 Mois - Option 2",
    type: "pour 3 mois"
  },
  parcours_hebdo: {
    id: 'parcours_hebdo',
    name: "Parcours 3 Mois + Coach Hebdo",
    price: 2999,
    description: "L'engagement maximum avec un suivi hebdomadaire pour un réalignement profond et soutenu.",
    features: [
      { icon: TrendingUp, text: "1 session individuelle (1 heure/semaine) avec un coach" },
      { icon: Layers, text: "Accès complet aux 3 cycles mensuels" },
      { icon: Zap, text: "Cadre soutenu et ajustement constant des expérimentations" },
      { icon: Star, text: "Engagement maximum pour des résultats durables" }
    ],
    cta: "Payer 2 999 € et commencer mon parcours",
    label: "Parcours 3 Mois - Option 3",
    type: "pour 3 mois"
  }
};

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planKey = searchParams.get('plan') || 'bundle';
  const selectedPlan = PLANS[planKey as keyof typeof PLANS] || PLANS.bundle;

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [email, setEmail] = useState('');

  // Manual Info State (for Cold Traffic who skipped onboarding)
  const [manualInfo, setManualInfo] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthTime: '',
    birthCity: ''
  });

  // 1. Initialiser l'ID de commande une seule fois au chargement
  const [orderId] = useState(`PM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  
  // Ref pour tracker si le brouillon a déjà été sauvegardé
  const hasSavedDraft = React.useRef(false);

  // Fonction de sauvegarde extraite pour être réutilisée
  const saveDraftOrder = async (data: any, userEmail: string | null) => {
    // Si déjà sauvegardé AVEC un vrai email, on arrête
    // Si c'était sauvegardé sans email (prospect), on continue pour mettre à jour
    if (hasSavedDraft.current && userEmail && userEmail.includes('@')) return;
    
    try {
      if (userEmail && userEmail.includes('@')) {
         hasSavedDraft.current = true;
      }
      
      console.log("Auto-saving draft order...", data);
      
      const orderInfo = {
        plan: selectedPlan.id,
        totalPrice: selectedPlan.price,
        delivery: {
          email: userEmail || data?.email || 'client-prospect@votrelegende.fr'
        }
      };

      // Get psy result... (same logic as handlePayment)
      const unifiedResultRaw = localStorage.getItem('unified_miroir_result');
      const sessionDataRaw = localStorage.getItem('psy_mirror_session_data');
      let psyResult = null;
      if (unifiedResultRaw) {
        try {
          const unifiedData = JSON.parse(unifiedResultRaw);
          psyResult = unifiedData.psyResult;
        } catch (e) {}
      }
      if (!psyResult && sessionDataRaw) {
        try {
          const sessionData = JSON.parse(sessionDataRaw);
          psyResult = sessionData.profile;
        } catch (e) {}
      }

      const res = await fetch('/api/book-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: data ? { ...data, email: userEmail || data.email } : { email: userEmail },
          orderInfo,
          orderId, // Use the persistent ID
          psyResult
        })
      });

      if (!res.ok) {
        console.error("Failed to auto-save draft", await res.text());
        hasSavedDraft.current = false; // Allow retry
      } else {
        console.log("Draft auto-saved successfully");
      }
    } catch (e) {
      console.error("Erreur auto-sauvegarde draft", e);
      hasSavedDraft.current = false; // Retry later if failed
    }
  };

  useEffect(() => {
    trackEvent('checkout_view', { plan: planKey });
    trackEvent('InitiateCheckout', {
      contents: [{
          content_id: selectedPlan.id,
          content_type: 'product',
          content_name: selectedPlan.name
      }],
      value: selectedPlan.price,
      currency: 'EUR'
    });
    
    // 1. Try final data (complete profile)
    const finalData = localStorage.getItem('psy_mirror_final_data');
    if (finalData) {
      try {
        const parsed = JSON.parse(finalData);
        if (parsed.user_info) {
          setUserData(parsed.user_info);
          if (parsed.user_info.email) setEmail(parsed.user_info.email);
          
          // AUTO-SAVE ON LOAD if we have data!
          saveDraftOrder(parsed.user_info, parsed.user_info.email || null);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // 2. Fallback: Try cosmic user data (basic info from onboarding/home)
    const cosmicData = localStorage.getItem('cosmic_user_data');
    if (cosmicData) {
      try {
        const parsed = JSON.parse(cosmicData);
        setUserData(parsed); // It has firstName, lastName, birthDate etc.
        if (parsed.email) setEmail(parsed.email);
        
        // Pre-fill manual info
        setManualInfo(prev => ({
            ...prev,
            firstName: parsed.firstName || '',
            lastName: parsed.lastName || '',
            birthDate: parsed.birthDate || '',
            birthTime: parsed.birthTime || '',
            birthCity: parsed.birthCity || ''
        }));
        
        // AUTO-SAVE ON LOAD if we have data!
        saveDraftOrder(parsed, parsed.email || null);
      } catch (e) {
        console.error(e);
      }
    }
  }, [planKey]);

  // Sauvegarder le panier abandonné dès que l'email est valide
  const handleEmailBlur = async () => {
    // Basic validation
    if (!email || !email.includes('@')) return;
    
    // Identify for TikTok
    identifyUser({ email });
    
    // On force la sauvegarde même si hasSavedDraft est true, 
    // car on vient d'ajouter un email
    
    try {
      hasSavedDraft.current = true;
      console.log("Sauvegarde du panier abandonné avec email...");
      
      const orderInfo = {
        plan: selectedPlan.id,
        totalPrice: selectedPlan.price,
        delivery: {
          email: email || userData?.email || 'client@votrelegende.fr'
        }
      };

      // Get psy result... (same logic as handlePayment)
      const unifiedResultRaw = localStorage.getItem('unified_miroir_result');
      const sessionDataRaw = localStorage.getItem('psy_mirror_session_data');
      let psyResult = null;
      if (unifiedResultRaw) {
        try {
          const unifiedData = JSON.parse(unifiedResultRaw);
          psyResult = unifiedData.psyResult;
        } catch (e) {}
      }
      if (!psyResult && sessionDataRaw) {
        try {
          const sessionData = JSON.parse(sessionDataRaw);
          psyResult = sessionData.profile;
        } catch (e) {}
      }

      const res = await fetch('/api/book-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: userData ? { ...userData, email } : { email },
          orderInfo,
          orderId, // Use the persistent ID
          psyResult
        })
      });

      if (!res.ok) {
        console.error("Failed to save draft", await res.text());
        hasSavedDraft.current = false; // Allow retry
      } else {
        console.log("Draft saved successfully");
      }
    } catch (e) {
      console.error("Erreur sauvegarde draft", e);
      hasSavedDraft.current = false; // Retry later if failed
    }
  };

  const handlePayment = async () => {
    // 1. Prepare Final User Data (Merge existing + Manual)
    const finalUserData = {
        ...userData,
        ...manualInfo,
        email: email || userData?.email
    };

    // 2. Validation
    if (!finalUserData.firstName || !finalUserData.birthDate || !email) {
      alert("Veuillez remplir les informations obligatoires (Prénom, Date de naissance, Email) pour générer votre analyse.");
      return;
    }

    setLoading(true);
    
    try {
      // Pas de nouvel ID ici, on utilise celui du state
      
      const orderInfo = {
        plan: selectedPlan.id,
        totalPrice: selectedPlan.price,
        delivery: {
          email: finalUserData.email || 'client@votrelegende.fr'
        }
      };

      // 1. Get the most complete psy result available
      const unifiedResultRaw = localStorage.getItem('unified_miroir_result');
      const sessionDataRaw = localStorage.getItem('psy_mirror_session_data');
      
      let psyResult = null;
      
      if (unifiedResultRaw) {
        try {
          const unifiedData = JSON.parse(unifiedResultRaw);
          psyResult = unifiedData.psyResult; // Full result with insights
        } catch (e) {
          console.error("Error parsing unified result", e);
        }
      }
      
      if (!psyResult && sessionDataRaw) {
        try {
          const sessionData = JSON.parse(sessionDataRaw);
          psyResult = sessionData.profile; // Fallback to raw scores
        } catch (e) {
          console.error("Error parsing session data", e);
        }
      }

      // 2. Enregistrer la commande dans la base de données (Supabase)
      console.log("Saving pending order to DB...", orderId);
      const dbResponse = await fetch('/api/book-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: finalUserData,
          orderInfo,
          orderId,
          psyResult
        })
      });
      console.log("DB Save Response:", dbResponse.status);

      // NOTE: We don't throw error here immediately if it fails, to allow payment to proceed if possible,
      // but ideally we want the record. For now, let's log and alert if critical.
      if (!dbResponse.ok) {
        console.error("Erreur lors de l'enregistrement de la commande pending", await dbResponse.text());
        // On continue quand même vers Stripe pour ne pas bloquer une vente, 
        // le webhook s'occupera de créer/mettre à jour si besoin (si configuré ainsi)
        // ou on aura un log d'erreur.
      } else {
        console.log("Commande pending créée avec succès", orderId);
      }

      // 2. Enregistrer la stat de clic de paiement
      trackEvent('payment_click', { plan: selectedPlan.id });
      trackEvent('AddPaymentInfo', {
        contents: [{
            content_id: selectedPlan.id,
            content_type: 'product',
            content_name: selectedPlan.name
        }],
        value: selectedPlan.price,
        currency: 'EUR'
      });

      // 3. Créer la session Stripe et rediriger
      const stripeResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: finalUserData,
          orderInfo,
          orderId
        })
      });

      const stripeData = await stripeResponse.json();

      if (stripeData.url) {
        window.location.href = stripeData.url;
      } else {
        // ERROR: Stripe URL missing - DO NOT REDIRECT TO SUCCESS
        console.error("Stripe URL missing. Payment could not be initialized.");
        throw new Error("Impossible d'initialiser le paiement. Veuillez contacter le support.");
      }
    } catch (error: any) {
      console.error("Erreur de paiement:", error);
      alert(error.message || "Une erreur est survenue lors de l'initialisation du paiement. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans flex flex-col items-center py-20 px-6">
      
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="absolute top-10 left-10 flex items-center gap-2 text-[#1A1C2E]/40 hover:text-[#1A1C2E] transition-colors font-bold text-xs uppercase tracking-widest"
      >
        <ChevronLeft className="w-4 h-4" />
        Retour
      </button>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-20 items-start">
        
        {/* LEFT: ORDER SUMMARY */}
        <div className="space-y-12">
          {/* AI Coach Animation */}
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              {/* Outer Glow */}
              <motion.div 
                animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#C9A24D]/30 via-transparent to-[#5B4B8A]/30 blur-xl"
              />
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border-2 border-[#C9A24D]/20 border-dashed"
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-6 rounded-full border border-[#1A1C2E]/10"
              />
              {/* Central Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-[#1A1C2E] rounded-full flex items-center justify-center shadow-2xl border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C9A24D]/20 to-transparent opacity-50" />
                  <Sparkles className="w-8 h-8 text-[#C9A24D] animate-pulse relative z-10" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 text-[#1A1C2E]/60 text-[10px] font-black uppercase tracking-widest">
                <Brain className="w-3 h-3" />
                Coach IA Initialisé
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1A1C2E]">Ton Assistant Personnel est prêt</h3>
              <p className="text-sm text-[#1A1C2E]/50 max-w-xs mx-auto">
                Après le paiement, tu pourras échanger avec lui en illimité pour comprendre tes blocages.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-serif font-bold italic">{selectedPlan.name}</h1>
            <p className="text-xl text-[#1A1C2E]/60 leading-relaxed font-light">
              {selectedPlan.description}
            </p>
          </div>

          <div className="space-y-6 bg-white p-8 rounded-[40px] shadow-sm border border-[#1A1C2E]/5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-[#C9A24D] text-center md:text-left">CE QUE TU REÇOIS :</p>
            <div className="space-y-5">
              {[
                { icon: Search, text: "Analyse numérologique & astrologique de ton potentiel de naissance" },
                { icon: Brain, text: "Analyse de tes choix et réactions réelles face aux situations" },
                { icon: Layers, text: "Comparaison claire entre potentiel, comportements et image perçue" },
                { icon: BookOpen, text: "Dossier personnalisé (PDF) pour approfondir à ton rythme" },
                { icon: Compass, text: "Exercices simples pour amorcer un réalignement progressif" },
                { icon: MessageCircle, text: "Accès illimité au Coach IA pour poser toutes tes questions et approfondir ton analyse" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5 group">
                  <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] shadow-inner border border-[#1A1C2E]/5 flex items-center justify-center text-[#C9A24D] shrink-0 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-base md:text-lg font-medium opacity-80 leading-snug pt-1 text-left">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-[40px] bg-[#1A1C2E] text-white space-y-6 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="relative z-10 space-y-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#C9A24D] mb-3">{selectedPlan.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-5xl md:text-6xl font-serif font-bold">{selectedPlan.price} €</p>
                  <p className="text-xl font-medium text-white/80">TTC — {selectedPlan.type}</p>
                </div>
              </div>
              <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-white/60">
                <Lock className="w-4 h-4 text-[#C9A24D]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Paiement 100 % sécurisé — données protégées (SSL & RGPD)</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xl font-serif italic text-[#1A1C2E]/60 leading-relaxed border-l-2 border-[#C9A24D]/30 pl-8">
              « Tu ne paies pas pour une prédiction. Tu paies pour une <span className="text-[#1A1C2E] font-bold">lecture claire de ton fonctionnement</span>, et un point de départ concret pour retrouver plus de cohérence dans tes décisions. »
            </p>
          </div>
        </div>

        {/* RIGHT: PAYMENT FORM */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 md:p-16 rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 space-y-12"
        >
          {/* PERSONAL INFO SECTION */}
          <div className="space-y-8 border-b border-[#1A1C2E]/5 pb-8">
             <div className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FA] rounded-full border border-[#1A1C2E]/5 w-fit">
              <User className="w-4 h-4 text-[#1A1C2E]/40" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/60 font-bold">Qui êtes-vous ?</span>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Prénom</label>
                    <input 
                        type="text"
                        value={manualInfo.firstName}
                        onChange={(e) => setManualInfo({...manualInfo, firstName: e.target.value})}
                        className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl text-[#1A1C2E] outline-none focus:border-[#C9A24D] transition-colors"
                        placeholder="Prénom"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Nom</label>
                    <input 
                        type="text"
                        value={manualInfo.lastName}
                        onChange={(e) => setManualInfo({...manualInfo, lastName: e.target.value})}
                        className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl text-[#1A1C2E] outline-none focus:border-[#C9A24D] transition-colors"
                        placeholder="Nom"
                    />
                </div>
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Date de Naissance</label>
                <input 
                    type="date"
                    value={manualInfo.birthDate}
                    onChange={(e) => setManualInfo({...manualInfo, birthDate: e.target.value})}
                    className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl text-[#1A1C2E] outline-none focus:border-[#C9A24D] transition-colors"
                />
            </div>
            
             <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Ville (Optionnel)</label>
                    <input 
                        type="text"
                        value={manualInfo.birthCity}
                        onChange={(e) => setManualInfo({...manualInfo, birthCity: e.target.value})}
                        className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl text-[#1A1C2E] outline-none focus:border-[#C9A24D] transition-colors"
                        placeholder="Ville"
                    />
                </div>
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Heure (Optionnel)</label>
                    <input 
                        type="time"
                        value={manualInfo.birthTime}
                        onChange={(e) => setManualInfo({...manualInfo, birthTime: e.target.value})}
                        className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl text-[#1A1C2E] outline-none focus:border-[#C9A24D] transition-colors"
                    />
                </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FA] rounded-full border border-[#1A1C2E]/5">
              <CreditCard className="w-4 h-4 text-[#1A1C2E]/40" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/60 font-bold">Informations de paiement</span>
            </div>
            <div className="flex gap-2 opacity-40 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" className="h-3 w-auto" alt="Visa" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" className="h-4 w-auto" alt="Mastercard" />
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Ton adresse email (pour recevoir l’analyse)</label>
              <div className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl flex items-center focus-within:border-[#C9A24D] transition-colors">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  placeholder="ton@email.com"
                  className="bg-transparent border-none outline-none w-full text-[#1A1C2E] placeholder:opacity-20"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Numéro de carte</label>
              <div className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl flex items-center justify-between focus-within:border-[#C9A24D] transition-colors">
                <input 
                  type="text"
                  placeholder="•••• •••• •••• ••••"
                  className="bg-transparent border-none outline-none w-full text-[#1A1C2E] placeholder:opacity-20"
                />
                <CreditCard className="w-5 h-5 text-[#1A1C2E]/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">Expiration</label>
                <input 
                  type="text"
                  placeholder="MM / AA"
                  className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl text-[#1A1C2E] outline-none focus:border-[#C9A24D] transition-colors placeholder:opacity-20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#1A1C2E]/40 ml-4">CVC</label>
                <input 
                  type="text"
                  placeholder="•••"
                  className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-[30px] py-5 px-8 text-xl text-[#1A1C2E] outline-none focus:border-[#C9A24D] transition-colors placeholder:opacity-20"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-8 bg-[#C9A24D] text-[#1A1C2E] rounded-full font-bold text-2xl hover:bg-[#1A1C2E] hover:text-white transition-all shadow-2xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 overflow-hidden relative group"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                />
              ) : (
                <>
                  <span>{selectedPlan.cta}</span>
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
            
            <div className="text-center space-y-4 px-4">
              <p className="text-[10px] font-bold text-[#1A1C2E]/30 uppercase tracking-[0.1em] leading-relaxed">
                En cliquant sur “Payer”, vous acceptez nos conditions générales de vente. <br />
                Le contenu proposé est un outil de compréhension personnelle et de réflexion. <br />
                Il ne constitue ni un diagnostic, ni un avis médical ou professionnel.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
