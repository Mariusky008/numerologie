'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Check, Star, BookOpen, Package, Feather, ShieldCheck, ArrowLeft, Play, FileText } from 'lucide-react';
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

  // État de la sélection
  // Le plan de base est toujours "avatar"
  const [selectedPlan, setSelectedPlan] = useState<'avatar'>('avatar');
  
  // Options additionnelles
  const [includeReport, setIncludeReport] = useState(false);
  const [includeBook, setIncludeBook] = useState(false);
  
  // Longueur du livre (100, 200, 300 pages)
  const [bookLength, setBookLength] = useState<100 | 200 | 300>(100);

  // Formulaire de livraison
  const [deliveryInfo, setDeliveryInfo] = useState({
    email: '',
    address: '',
    city: '',
    zip: '',
    country: 'France'
  });

  const handleDeliveryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  // Prix
  const PRICE_AVATAR = 29;
  const PRICE_REPORT_ADDON = 10;
  const PRICE_BOOK_BASE = 29;
  const PRICE_PAGE_EXTENSION = 10; // +10€ pour chaque palier de 100 pages supp

  // Calcul du total
  let currentTotal = PRICE_AVATAR;
  if (includeReport) currentTotal += PRICE_REPORT_ADDON;
  if (includeBook) {
    currentTotal += PRICE_BOOK_BASE;
    currentTotal += ((bookLength - 100) / 100 * PRICE_PAGE_EXTENSION);
  }

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    if (!deliveryInfo.email) {
      alert("Merci de renseigner votre email pour recevoir vos documents.");
      return;
    }
    
    // Adresse nécessaire seulement si livre papier (mais ici le livre est E-Book pour l'instant d'après le texte "Le Roman de votre Vie (E-Book)")
    // Wait, the user said "Le livre de 100 à 300 pages pour 29 à 49 euros". 
    // Usually books are digital unless specified. 
    // In the previous code, there was a "paperOption". 
    // Let's assume these are DIGITAL products for now as implied by "E-Book" in my previous code, 
    // BUT the previous code had a paper option.
    // User didn't specify paper for the new book option, but usually 29-49€ for an ebook is high?
    // "Le livre de 100 a 300 pages pour 29à 49 euros" -> Likely Digital given the price scaling and immediate delivery context.
    // However, if I want to be safe, I'll keep the address fields hidden unless we explicitly add a paper option later.
    // For now, I will assume digital delivery for everything to simplify, unless user asked for paper.
    // User didn't ask for paper option in this prompt.
    
    setIsProcessing(true);

    // Préparation des données de commande
    const orderInfo = {
      plan: 'avatar', // Toujours avatar
      totalPrice: currentTotal,
      includeReport,
      includeBook,
      bookLength: includeBook ? bookLength : undefined,
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
      const errorMessage = e?.message || "Une erreur est survenue lors de l'initialisation du paiement.";
      if (errorMessage.includes("clé Stripe") || errorMessage.includes("500")) {
         alert(`Erreur de configuration Paiement: ${errorMessage}\n\nVérifiez que la clé STRIPE_SECRET_KEY est bien configurée.`);
      } else {
         alert(`${errorMessage} Veuillez réessayer.`);
      }
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

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-16 relative z-10">
        
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
            Votre révélation est prête.
          </h1>
          <p className="text-lg text-[#2C2F4A]/70 font-light">
            Découvrez votre destin à travers l'expérience Avatar.
          </p>
        </div>

        {/* MAIN PRODUCT: AVATAR VIDEO */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white rounded-2xl border-2 border-[#C9A24D]/30 shadow-xl overflow-hidden"
          >
            {/* Badge */}
            <div className="absolute top-0 right-0 bg-[#C9A24D] text-[#2C2F4A] text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm z-10">
              Inclus
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
               {/* Left: Visual */}
               <div className="bg-[#2C2F4A] p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2C2F4A] to-[#5B4B8A] opacity-80"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full border-4 border-[#C9A24D] flex items-center justify-center bg-black/30 mb-4 shadow-lg">
                      <Play className="w-10 h-10 text-white fill-current" />
                    </div>
                    <div className="text-[#C9A24D] font-serif text-xl">Votre Avatar</div>
                    <div className="text-white/60 text-sm">Vidéo Personnalisée</div>
                  </div>
               </div>

               {/* Right: Content */}
               <div className="col-span-2 p-8 md:p-10 flex flex-col justify-center">
                 <div className="flex justify-between items-start mb-4">
                   <h2 className="text-3xl font-serif text-[#2C2F4A]">Votre Destin Révélé</h2>
                   <div className="text-3xl font-bold text-[#C9A24D]">{PRICE_AVATAR}€</div>
                 </div>
                 <p className="text-[#2C2F4A]/70 mb-6 leading-relaxed">
                   Une expérience vidéo immersive de 5 minutes où votre avatar personnel décrypte votre chemin de vie, vos forces cachées et vos défis à venir. 
                   Comprend également le résumé des points clés de votre dossier complet.
                 </p>
                 <ul className="space-y-2 grid grid-cols-1 md:grid-cols-2 gap-x-8">
                   <FeatureItem label="Vidéo 100% Personnalisée" highlight />
                   <FeatureItem label="Analyse Vocale & Visuelle" highlight />
                   <FeatureItem label="Accessible sur Mobile & PC" />
                   <FeatureItem label="Accès à Vie" />
                 </ul>
               </div>
            </div>
          </motion.div>
        </div>

        {/* ADD-ONS SECTION */}
        <h3 className="text-2xl font-serif text-[#2C2F4A] mb-6 text-center">Complétez votre expérience</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
           
           {/* ADD-ON 1: PDF REPORT */}
           <motion.div 
             className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${includeReport ? 'border-[#5B4B8A] bg-white shadow-lg' : 'border-[#EFEDE9] bg-white/60 hover:bg-white'}`}
             onClick={() => setIncludeReport(!includeReport)}
           >
             <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                 <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${includeReport ? 'bg-[#5B4B8A] border-[#5B4B8A]' : 'bg-white border-stone-300'}`}>
                   {includeReport && <Check className="w-4 h-4 text-white" />}
                 </div>
                 <h4 className="text-xl font-bold text-[#2C2F4A]">Dossier PDF Complet</h4>
               </div>
               <div className="text-xl font-bold text-[#5B4B8A]">{PRICE_REPORT_ADDON}€</div>
             </div>
             <p className="text-sm text-[#2C2F4A]/70 mb-4 pl-9">
               40 pages d'analyse technique détaillée. Cartographie précise de vos cycles, défis, dettes karmiques et prévisions mois par mois.
             </p>
             <div className="pl-9">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5B4B8A] bg-[#5B4B8A]/10 px-2 py-1 rounded">Format Numérique</span>
             </div>
           </motion.div>

           {/* ADD-ON 2: BOOK */}
           <motion.div 
             className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${includeBook ? 'border-[#C9A24D] bg-white shadow-lg' : 'border-[#EFEDE9] bg-white/60 hover:bg-white'}`}
             onClick={() => setIncludeBook(!includeBook)}
           >
             <div className="flex justify-between items-start mb-4">
               <div className="flex items-center gap-3">
                 <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${includeBook ? 'bg-[#C9A24D] border-[#C9A24D]' : 'bg-white border-stone-300'}`}>
                   {includeBook && <Check className="w-4 h-4 text-white" />}
                 </div>
                 <h4 className="text-xl font-bold text-[#2C2F4A]">Roman de Vie (E-Book)</h4>
               </div>
               <div className="text-xl font-bold text-[#C9A24D]">
                 {PRICE_BOOK_BASE + ((bookLength - 100) / 100 * PRICE_PAGE_EXTENSION)}€
               </div>
             </div>
             <p className="text-sm text-[#2C2F4A]/70 mb-4 pl-9">
               Votre vie racontée comme une épopée héroïque. Une narration immersive unique de 100 à 300 pages dont vous êtes le héros.
             </p>
             
             {/* Length Selector (Only active if book selected) */}
             <div className={`pl-9 transition-opacity ${includeBook ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
               <div className="flex gap-2 mb-2">
                 {[100, 200, 300].map((length) => (
                   <button
                     key={length}
                     onClick={(e) => { e.stopPropagation(); setBookLength(length as any); }}
                     className={`px-3 py-1 rounded text-xs font-bold border transition-all ${
                       bookLength === length 
                         ? 'bg-[#C9A24D] text-white border-[#C9A24D]' 
                         : 'bg-transparent text-[#2C2F4A]/60 border-stone-200'
                     }`}
                   >
                     {length} pages
                   </button>
                 ))}
               </div>
               <p className="text-[10px] text-[#2C2F4A]/50 italic">
                 +10€ par tranche de 100 pages supplémentaires.
               </p>
             </div>
           </motion.div>

        </div>

        {/* Delivery Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto mt-12 bg-white rounded-2xl p-8 border border-[#EFEDE9] shadow-sm"
        >
          <h3 className="text-xl font-serif text-[#2C2F4A] mb-6 flex items-center gap-2">
            <Feather className="w-5 h-5 text-[#5B4B8A]" />
            Coordonnées de réception
          </h3>
          
          <div className="space-y-6">
             {/* Email Field (Always visible) */}
             <div>
               <label className="block text-sm font-bold text-[#2C2F4A] mb-2">Adresse Email <span className="text-red-400">*</span></label>
               <input 
                 type="email" 
                 name="email"
                 value={deliveryInfo.email}
                 onChange={handleDeliveryChange}
                 placeholder="Pour recevoir vos documents et accès"
                 className="w-full p-4 rounded-lg bg-[#FAF9F7] border border-[#EFEDE9] focus:border-[#5B4B8A] focus:ring-1 focus:ring-[#5B4B8A] outline-none transition-all"
               />
             </div>
          </div>
        </motion.div>

        {/* FOOTER ACTION */}
        <div className="mt-12 text-center sticky bottom-8 z-20 pointer-events-none">
          <div className="pointer-events-auto inline-block">
             <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className={`group relative inline-flex items-center gap-6 px-12 py-5 bg-[#2C2F4A] text-[#FAF9F7] text-xl font-serif font-bold rounded-full shadow-[0_20px_50px_-12px_rgba(44,47,74,0.5)] transition-all transform ${isProcessing ? 'opacity-80 cursor-wait' : 'hover:bg-[#5B4B8A] hover:scale-105 hover:-translate-y-1'}`}
              >
                <span>{isProcessing ? 'Redirection...' : 'Accéder à ma destinée'}</span>
                {!isProcessing && (
                  <span className="bg-[#FAF9F7]/10 px-4 py-1.5 rounded-full text-lg font-sans border border-[#FAF9F7]/20">
                    {currentTotal}€
                  </span>
                )}
                {isProcessing ? (
                  <div className="w-6 h-6 border-2 border-[#C9A24D] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Package className="w-6 h-6 text-[#C9A24D] group-hover:rotate-12 transition-transform" />
                )}
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#2C2F4A]/50 font-medium tracking-wide bg-white/80 backdrop-blur py-2 px-4 rounded-full mx-auto max-w-max">
                 <span className="flex items-center gap-2">
                   <ShieldCheck className="w-4 h-4" /> Paiement Sécurisé
                 </span>
                 <span className="flex items-center gap-2">
                   <Star className="w-4 h-4" /> Satisfait ou Remboursé
                 </span>
              </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function FeatureItem({ label, highlight = false }: { label: string, highlight?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <Check className={`w-5 h-5 shrink-0 ${highlight ? 'text-[#C9A24D]' : 'text-[#8FA6A0]'}`} />
      <span className={highlight ? 'text-[#2C2F4A] font-medium' : 'text-[#2C2F4A]/70'}>{label}</span>
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