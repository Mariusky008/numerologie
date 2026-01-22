'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Check, Star, ShieldCheck, ArrowLeft, Play, MessageSquare, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Récupération des données utilisateurs depuis l'URL
  const userData = {
    firstName: searchParams.get('fn') || '',
    lastName: searchParams.get('ln') || '',
    birthDate: searchParams.get('bd') || '',
    birthPlace: searchParams.get('bp') || '',
    focus: searchParams.get('fo') || 'mission',
    origin: searchParams.get('origin') || 'download'
  };

  // État de la sélection (Pack unique désormais)
  const [selectedPlan] = useState<'bundle'>('bundle');
  
  // Formulaire de livraison
  const [deliveryInfo, setDeliveryInfo] = useState({
    email: '',
    country: 'France'
  });

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  // Prix Unique
  const TOTAL_PRICE = 29;

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!deliveryInfo.email) {
      alert("Merci de renseigner votre email pour recevoir vos documents.");
      return;
    }
    
    setIsProcessing(true);

    // Préparation des données de commande
    const orderInfo = {
      plan: selectedPlan,
      totalPrice: TOTAL_PRICE,
      includeReport: true, // Toujours inclus
      includeBook: false, // Plus d'option livre en supplément
      includeChat: true, // Nouvelle option Chat incluse
      delivery: deliveryInfo,
      orderDate: new Date().toISOString()
    };

    try {
      // 1. Sauvegarde en base de données (via API)
      const resDb = await fetch('/api/book-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userData,
          orderInfo,
        })
      });

      if (!resDb.ok) {
        throw new Error("Erreur lors de la sauvegarde de la commande");
      }

      const dbData = await resDb.json();
      const orderId = dbData.id;

      // 2. Création de la session Stripe
      const resStripe = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderInfo,
          userData,
          orderId
        })
      });

      if (!resStripe.ok) {
        throw new Error("Erreur lors de l'initialisation du paiement");
      }

      const { url } = await resStripe.json();

      // 3. Redirection vers Stripe
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("Pas d'URL de redirection reçue");
      }
      
    } catch (e: any) {
      console.error("Erreur checkout:", e);
      const errorMessage = e?.message || "Une erreur est survenue.";
      alert(`${errorMessage} Veuillez réessayer.`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] font-sans overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#C9A24D] rounded-full blur-[150px] opacity-5"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#5B4B8A] rounded-full blur-[150px] opacity-5"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16 relative z-10">
        
        {/* Navigation Back */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#5B4B8A] hover:text-[#2C2F4A] transition-colors mb-8 font-medium text-sm tracking-wide group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'analyse
        </button>

        {/* Header Hero */}
        <div className="text-center mb-12 space-y-4 max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif text-[#2C2F4A] leading-tight">
            <span className="text-[#5B4B8A] italic block text-xl md:text-2xl mb-2">Bonjour {userData.firstName},</span>
            Votre pack complet est prêt.
          </h1>
          <p className="text-lg text-[#2C2F4A]/70 font-light">
            Une offre unique pour maîtriser votre destinée.
          </p>
        </div>

        {/* MAIN BUNDLE CARD */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-2xl border-2 border-[#C9A24D] shadow-2xl overflow-hidden"
          >
            {/* Best Value Badge */}
            <div className="absolute top-0 right-0 bg-[#C9A24D] text-[#2C2F4A] text-xs font-bold px-6 py-2 rounded-bl-xl uppercase tracking-widest shadow-sm z-10">
              Offre Complète
            </div>

            <div className="p-8 md:p-12">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                 <div>
                    <h2 className="text-3xl font-serif text-[#2C2F4A] mb-2">Le Pack Révélation</h2>
                    <p className="text-[#2C2F4A]/60">Tout ce dont vous avez besoin pour avancer.</p>
                 </div>
                 <div className="text-right">
                    <div className="text-sm text-[#2C2F4A]/40 line-through decoration-red-400">Valeur réelle : 129€</div>
                    <div className="text-4xl font-bold text-[#C9A24D]">{TOTAL_PRICE}€</div>
                 </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Item 1: Video */}
                  <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#EFEDE9]">
                     <div className="w-12 h-12 bg-[#2C2F4A] rounded-full flex items-center justify-center mb-4">
                        <Play className="w-6 h-6 text-[#C9A24D]" />
                     </div>
                     <h3 className="font-bold text-[#2C2F4A] mb-2">Vidéo Avatar</h3>
                     <p className="text-sm text-[#2C2F4A]/70">5 minutes d'analyse personnalisée par votre guide virtuel.</p>
                  </div>

                  {/* Item 2: Report */}
                  <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#EFEDE9]">
                     <div className="w-12 h-12 bg-[#5B4B8A] rounded-full flex items-center justify-center mb-4">
                        <FileText className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="font-bold text-[#2C2F4A] mb-2">Dossier PDF</h3>
                     <p className="text-sm text-[#2C2F4A]/70">40 pages d'études techniques, cycles et prévisions détaillées.</p>
                  </div>

                  {/* Item 3: Chat */}
                  <div className="bg-[#FFFBF2] p-6 rounded-xl border border-[#C9A24D]/30 relative overflow-hidden">
                     <div className="absolute top-2 right-2 text-[10px] font-bold bg-[#C9A24D] text-white px-2 py-0.5 rounded">OFFERT</div>
                     <div className="w-12 h-12 bg-[#C9A24D] rounded-full flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-white" />
                     </div>
                     <h3 className="font-bold text-[#2C2F4A] mb-2">Coach Interactif</h3>
                     <p className="text-sm text-[#2C2F4A]/70">30 min de chat vocal/écrit avec l'IA pour poser vos questions.</p>
                  </div>
               </div>

               <div className="bg-[#2C2F4A]/5 p-6 rounded-xl">
                  <h4 className="font-serif font-bold text-[#2C2F4A] mb-4">Inclus dans votre commande :</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <FeatureItem label="Vidéo HD Personnalisée (5 min)" highlight />
                    <FeatureItem label="Rapport Numérologique Complet (40 pages)" highlight />
                    <FeatureItem label="Chatbot Coach (30 min) - OFFERT" highlight />
                    <FeatureItem label="Accès Immédiat par Email" />
                    <FeatureItem label="Garantie Satisfait ou Remboursé" />
                    <FeatureItem label="Paiement Sécurisé SSL" />
                  </ul>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Email Field */}
        <div className="max-w-xl mx-auto mb-12">
            <label className="block text-sm font-bold text-[#2C2F4A] mb-2 text-center">Où envoyer votre pack ? <span className="text-red-400">*</span></label>
            <input 
              type="email" 
              name="email"
              value={deliveryInfo.email}
              onChange={handleDeliveryChange}
              placeholder="Votre adresse email principale"
              className="w-full p-4 rounded-full bg-white border-2 border-[#C9A24D]/30 focus:border-[#C9A24D] focus:ring-4 focus:ring-[#C9A24D]/10 outline-none transition-all text-center text-lg shadow-sm"
            />
        </div>

        {/* FOOTER ACTION */}
        <div className="text-center">
             <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`group relative inline-flex items-center gap-4 px-16 py-6 bg-[#2C2F4A] text-[#FAF9F7] text-xl font-serif font-bold rounded-full shadow-[0_20px_50px_-12px_rgba(44,47,74,0.5)] transition-all transform ${isProcessing ? 'opacity-80 cursor-wait' : 'hover:bg-[#5B4B8A] hover:scale-105 hover:-translate-y-1'}`}
              >
                <span>{isProcessing ? 'Préparation...' : 'Débloquer mon Pack à 29€'}</span>
                {isProcessing && (
                  <div className="w-6 h-6 border-2 border-[#C9A24D] border-t-transparent rounded-full animate-spin"></div>
                )}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#2C2F4A]/50 font-medium tracking-wide">
                 <span className="flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4" /> Paiement Sécurisé par Stripe
                 </span>
                 <span className="flex items-center gap-2">
                   <Star className="w-4 h-4" /> Garantie Satisfaction
                 </span>
              </div>
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ label, highlight = false }: { label: string, highlight?: boolean }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${highlight ? 'bg-[#C9A24D]' : 'bg-[#8FA6A0]/20'}`}>
        <Check className={`w-3 h-3 ${highlight ? 'text-white' : 'text-[#2C2F4A]/50'}`} />
      </div>
      <span className={highlight ? 'text-[#2C2F4A] font-bold' : 'text-[#2C2F4A]/70'}>{label}</span>
    </li>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
