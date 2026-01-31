'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Lock, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Check,
  Star,
  Zap,
  ChevronLeft
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const finalData = localStorage.getItem('psy_mirror_final_data');
    if (finalData) {
      try {
        const parsed = JSON.parse(finalData);
        setUserData(parsed.user_info);
        // Pre-fill email if available
        if (parsed.user_info?.email) setEmail(parsed.user_info.email);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handlePayment = async () => {
    if (!userData) {
      alert("Erreur : Données utilisateur introuvables. Veuillez recommencer l'expérience.");
      return;
    }

    setLoading(true);
    
    try {
      const orderId = `PM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      const orderInfo = {
        plan: 'bundle',
        totalPrice: 49,
        delivery: {
          email: email || userData.email || 'client@votrelegende.fr'
        }
      };

      // 1. Enregistrer la commande dans la base de données (Supabase)
      // Cela permet à l'admin de voir la commande même si le paiement Stripe échoue
      const dbResponse = await fetch('/api/book-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: { ...userData, email: email || userData.email },
          orderInfo,
          orderId
        })
      });

      if (!dbResponse.ok) {
        throw new Error("Erreur lors de l'enregistrement de la commande");
      }

      // 2. Enregistrer la stat de clic de paiement
      await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'payment_click' })
      }).catch(err => console.error("Stat tracking failed", err));

      // 3. Créer la session Stripe et rediriger
      const stripeResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData: { ...userData, email: email || userData.email },
          orderInfo,
          orderId
        })
      });

      const stripeData = await stripeResponse.json();

      if (stripeData.url) {
        window.location.href = stripeData.url;
      } else {
        // Fallback simulation if Stripe key is missing or error
        console.warn("Stripe URL missing, simulating success...");
        setTimeout(() => {
          setLoading(false);
          router.push('/miroir/resultat');
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur de paiement:", error);
      alert("Une erreur est survenue lors de l'initialisation du paiement. Veuillez réessayer.");
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
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-serif font-bold">Le Crash-Test de ton Destin</h1>
            <p className="text-xl text-[#1A1C2E]/60 leading-relaxed">
              Une expérience complète pour comprendre tes schémas profonds et reprendre le contrôle de tes décisions.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Analyse numérologique & astrologique de ton potentiel de naissance",
              "Analyse psychologique de tes choix et réactions réelles",
              "Comparaison claire entre potentiel, comportements et image perçue",
              "Dossier personnalisé (PDF)",
              "Vidéo explicative personnalisée",
              "Exercices simples pour favoriser un réalignement progressif"
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#C9A24D]/10 flex items-center justify-center text-[#C9A24D] shrink-0 mt-1">
                  <Check className="w-4 h-4" />
                </div>
                <span className="text-lg font-medium opacity-80 leading-tight">{item}</span>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[40px] bg-white border border-[#1A1C2E]/5 space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/30 mb-2">Total de la commande</p>
                <p className="text-5xl font-serif font-bold">49 €</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D] mb-1">TVA Incluse</p>
                <p className="text-xs font-bold opacity-30">Paiement 100% Sécurisé</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xl font-serif italic text-[#1A1C2E]/60 leading-relaxed">
              « Tu ne paies pas pour une prédiction. <br />
              Tu paies pour une lecture claire de ton fonctionnement et des clés concrètes. »
            </p>
            <div className="flex items-center gap-8 opacity-40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">RGPD Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-widest">SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: PAYMENT FORM */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-12 md:p-16 rounded-[60px] shadow-2xl border border-[#1A1C2E]/5 space-y-12"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FA] rounded-full border border-[#1A1C2E]/5">
              <CreditCard className="w-4 h-4 text-[#1A1C2E]/40" />
              <span className="text-[10px] font-black uppercase tracking-widest">Paiement par carte</span>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-5 bg-[#F8F9FA] rounded border border-[#1A1C2E]/5"></div>
              <div className="w-8 h-5 bg-[#F8F9FA] rounded border border-[#1A1C2E]/5"></div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Ton adresse Email (pour recevoir l'analyse)</label>
              <div className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-2xl py-5 px-6 text-xl flex items-center justify-between">
                <input 
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  className="bg-transparent border-none outline-none w-full text-[#1A1C2E]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Numéro de carte</label>
              <div className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-2xl py-5 px-6 text-xl flex items-center justify-between">
                <input 
                  type="text"
                  placeholder="•••• •••• •••• ••••"
                  className="bg-transparent border-none outline-none w-full text-[#1A1C2E]"
                />
                <CreditCard className="w-5 h-5 text-[#1A1C2E]/20" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Expiration</label>
                <input 
                  type="text"
                  placeholder="MM / AA"
                  className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-2xl py-5 px-6 text-xl text-[#1A1C2E] outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">CVC</label>
                <input 
                  type="text"
                  placeholder="•••"
                  className="w-full bg-[#F8F9FA] border border-[#1A1C2E]/10 rounded-2xl py-5 px-6 text-xl text-[#1A1C2E] outline-none"
                />
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full py-8 bg-[#C9A24D] text-white rounded-full font-bold text-2xl hover:bg-[#1A1C2E] transition-all shadow-xl hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-4 overflow-hidden relative"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                />
              ) : (
                <>
                  <span>Payer 49 € et Débloquer mon Analyse</span>
                  <ArrowRight className="w-8 h-8" />
                </>
              )}
            </button>
            
            <p className="text-center text-[10px] font-bold text-[#1A1C2E]/30 uppercase tracking-[0.2em] leading-relaxed">
              En cliquant sur payer, vous acceptez nos conditions générales de vente <br />
              et reconnaissez que le contenu est à but de divertissement et de compréhension personnelle.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
