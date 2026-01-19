'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Check, Star, BookOpen, Package, Feather, ShieldCheck, ArrowLeft } from 'lucide-react';
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
    origin: searchParams.get('origin') || 'download' // 'download' ou 'book' pour pré-sélection
  };

  // État de la sélection
  const [selectedPlan, setSelectedPlan] = useState<'report' | 'bundle'>(
    userData.origin === 'book' ? 'bundle' : 'report'
  );
  
  // Option papier (disponible uniquement pour le bundle)
  const [paperOption, setPaperOption] = useState(false);
  // Option papier pour le rapport seul
  const [reportPaperOption, setReportPaperOption] = useState(false);
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
  const PRICE_REPORT = 29;
  const PRICE_BUNDLE = 49;
  const PRICE_PAPER = 29;
  const PRICE_REPORT_PAPER = 10;
  const PRICE_PAGE_EXTENSION = 10; // +10€ pour chaque palier de 100 pages supp

  const currentTotal = selectedPlan === 'report' 
    ? PRICE_REPORT + (reportPaperOption ? PRICE_REPORT_PAPER : 0)
    : PRICE_BUNDLE + (paperOption ? PRICE_PAPER : 0) + ((bookLength - 100) / 100 * PRICE_PAGE_EXTENSION);

  // Prix affiché dans la carte "Pack Héros" (inclut la longueur ET l'option papier si sélectionnée)
  const bundleDisplayPrice = PRICE_BUNDLE + ((bookLength - 100) / 100 * PRICE_PAGE_EXTENSION) + (paperOption ? PRICE_PAPER : 0);
  const bundleFullValue = 78 + ((bookLength - 100) / 100 * PRICE_PAGE_EXTENSION) + (paperOption ? PRICE_PAPER : 0); // Prix barré dynamique

  // Prix affiché dans la carte "Dossier Essentiel"
  const reportDisplayPrice = PRICE_REPORT + (reportPaperOption ? PRICE_REPORT_PAPER : 0);

  const handlePayment = async () => {
    if (!deliveryInfo.email) {
      alert("Merci de renseigner votre email pour recevoir vos documents.");
      return;
    }
    
    if ((paperOption || reportPaperOption) && (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.zip)) {
      alert("Merci de compléter votre adresse de livraison pour le livre papier.");
      return;
    }

    // Préparation des données de commande
    const orderInfo = {
      plan: selectedPlan,
      totalPrice: currentTotal,
      bookLength: selectedPlan === 'bundle' ? bookLength : undefined,
      paperOption: paperOption,
      reportPaperOption: reportPaperOption,
      delivery: deliveryInfo,
      orderDate: new Date().toISOString()
    };

    try {
      // Sauvegarde en base de données (via API)
      // On envoie userData et orderInfo. L'API calculera le profil complet.
      const res = await fetch('/api/book-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userData,
          orderInfo,
          // On n'envoie pas reportResults ni lifeDetails, l'API s'en chargera
        })
      });

      if (!res.ok) {
        console.error("Erreur lors de la sauvegarde de la commande");
        // On continue quand même vers le paiement/résultat pour ne pas bloquer l'utilisateur
      }

      // Simulation Paiement & Redirection
      alert(`Commande validée (${currentTotal}€) !\nUn email de confirmation a été envoyé à ${deliveryInfo.email}.`);
      
      const params = new URLSearchParams({
          fn: userData.firstName,
          ln: userData.lastName,
          bd: userData.birthDate,
          bp: userData.birthPlace,
          fo: userData.focus
      });
      
      window.open(`/pdf-report-v2?${params.toString()}`, '_self'); // _self pour rester dans l'onglet
      
    } catch (e) {
      console.error("Erreur critique checkout:", e);
      alert("Une erreur est survenue. Veuillez réessayer.");
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

      <div className="max-w-6xl mx-auto px-4 py-8 md:py-16 relative z-10">
        
        {/* Navigation Back */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#5B4B8A] hover:text-[#2C2F4A] transition-colors mb-8 md:mb-12 font-medium text-sm tracking-wide group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Retour à l'analyse
        </button>

        {/* Header Hero */}
        <div className="text-center mb-16 space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#5B4B8A]/5 text-[#5B4B8A] text-xs font-bold tracking-widest uppercase border border-[#5B4B8A]/20">
             <Feather className="w-3 h-3" />
             Votre histoire est prête
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#2C2F4A] leading-tight">
            <span className="text-[#5B4B8A] italic block text-2xl md:text-3xl mb-2">Bonjour {userData.firstName},</span>
            Comment souhaitez-vous recevoir <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24D] to-[#B89B5E]">votre révélation ?</span>
          </h1>
          <p className="text-lg text-[#2C2F4A]/70 font-light leading-relaxed">
            Votre profil numérologique complet a été calculé. <br/>
            Choisissez maintenant le format qui vous permettra d'intégrer au mieux ces connaissances.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* OPTION 1: RAPPORT SEUL */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setSelectedPlan('report')}
            className={`relative p-8 md:p-10 rounded-2xl border transition-all cursor-pointer flex flex-col ${
              selectedPlan === 'report' 
                ? 'border-[#5B4B8A] bg-white shadow-xl ring-1 ring-[#5B4B8A]/20' 
                : 'border-[#EFEDE9] bg-white/60 hover:border-[#5B4B8A]/30 hover:bg-white'
            }`}
          >
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-2xl font-serif text-[#2C2F4A] mb-1">Clés de Votre Destin</h3>
                <p className="text-sm text-[#8FA6A0] uppercase tracking-wider font-bold">L'Analyse Technique</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-serif text-[#2C2F4A] font-bold">{reportDisplayPrice}€</div>
              </div>
            </div>

            <div className="flex-grow space-y-6 mb-8">
               <p className="text-[#2C2F4A]/80 leading-relaxed text-sm">
                 Pour ceux qui veulent aller droit au but. Une cartographie précise de vos forces, défis et cycles, sans la narration romancée.
               </p>
               <ul className="space-y-4">
                <FeatureItem label="Rapport PDF Complet (V3)" />
                <FeatureItem label="Thème Astral Précis (Ascendant, Maisons)" />
                <FeatureItem label="Transits & Météo Astrale du jour" />
                <FeatureItem label="Plans d'Expression & Dettes Karmiques" />
                <FeatureItem label="Prévisions 12 Mois détaillées" />
                <FeatureItem label="Grille d'Inclusion & Défis de Vie" />
                <FeatureItem label="Axes Professionnels & Mission" />
              </ul>
            </div>

            {/* UPSELL PAPIER REPORT */}
            {selectedPlan === 'report' && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="mt-4 pt-6 border-t border-[#EFEDE9]"
               >
                 <div 
                   onClick={(e) => {
                     e.stopPropagation();
                     setReportPaperOption(!reportPaperOption);
                   }}
                   className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                     reportPaperOption ? 'border-[#5B4B8A] bg-[#5B4B8A]/5' : 'border-[#EFEDE9] hover:border-[#5B4B8A]/30 bg-white'
                   }`}
                 >
                   <div className={`w-5 h-5 rounded border mt-1 flex items-center justify-center shrink-0 transition-colors ${
                     reportPaperOption ? 'border-[#5B4B8A] bg-[#5B4B8A]' : 'border-stone-300 bg-white'
                   }`}>
                     {reportPaperOption && <Check className="w-3 h-3 text-white" />}
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#2C2F4A] text-sm">Recevoir le Dossier Imprimé</span>
                        <span className="font-serif text-[#5B4B8A] font-bold text-xl">+10€</span>
                     </div>
                     <p className="text-xs text-[#2C2F4A]/60 leading-relaxed">
                       Impression haute qualité, reliure spirale pro. Livré directement chez vous.
                     </p>
                   </div>
                 </div>
               </motion.div>
            )}

            <div className={`w-6 h-6 rounded-full border-2 absolute top-6 right-6 flex items-center justify-center transition-colors ${
              selectedPlan === 'report' ? 'border-[#5B4B8A]' : 'border-stone-300'
            }`}>
              {selectedPlan === 'report' && <div className="w-3 h-3 rounded-full bg-[#5B4B8A]" />}
            </div>
          </motion.div>

          {/* OPTION 2: BUNDLE (RAPPORT + LIVRE) */}
          <motion.div 
            whileHover={{ y: -5 }}
            onClick={() => setSelectedPlan('bundle')}
            className={`relative rounded-r-2xl rounded-l-md border-l-8 transition-all cursor-pointer flex flex-col overflow-hidden ${
              selectedPlan === 'bundle' 
                ? 'border-l-[#1a1c2e] bg-[#2C2F4A] shadow-[20px_20px_60px_-15px_rgba(44,47,74,0.6)] ring-4 ring-[#C9A24D]/20 transform scale-[1.02]' 
                : 'border-l-[#8FA6A0] bg-[#2C2F4A] opacity-90 hover:opacity-100 hover:scale-[1.01]'
            }`}
          >
            {/* BOOK TEXTURE OVERLAY */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
            
            {/* GOLDEN BORDER FRAME */}
            <div className="absolute inset-4 border border-[#C9A24D]/30 rounded-lg pointer-events-none"></div>

            {/* Badge Recommended */}
            <div className="absolute top-0 right-0 bg-[#C9A24D] text-[#2C2F4A] text-[10px] font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-widest shadow-sm z-10">
              Recommandé
            </div>

            <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <h3 className="text-2xl font-serif text-[#FAF9F7] mb-1 flex items-center gap-2">
                      Pack Héros
                      <Star className="w-4 h-4 fill-[#C9A24D] text-[#C9A24D]" />
                    </h3>
                    <p className="text-sm text-[#C9A24D] uppercase tracking-wider font-bold">Dossier + Roman de Vie</p>
                  </div>
                  <div className="text-right">
                     <div className="text-lg text-[#FAF9F7]/40 line-through decoration-red-400 font-medium mb-1 mr-2">{bundleFullValue}€</div>
                     <div className="text-6xl font-serif text-[#C9A24D] font-bold drop-shadow-md">{bundleDisplayPrice}€</div>
                  </div>
                </div>

                <div className="flex-grow space-y-6 mb-8">
                   <p className="text-[#FAF9F7]/80 leading-relaxed text-sm italic border-l-2 border-[#C9A24D] pl-4">
                     "L'expérience ultime. Votre analyse technique transformée en une épopée littéraire dont vous êtes le protagoniste."
                   </p>
                   
                   <div className="bg-[#FAF9F7]/5 p-4 rounded-xl border border-[#FAF9F7]/10 backdrop-blur-sm">
                     <ul className="space-y-4">
                      <FeatureItem label="INCLUS : Le Dossier Essentiel (Analyse Technique)" highlight lightMode />
                      <li className="flex items-start gap-3 text-sm">
                        <BookOpen className="w-5 h-5 text-[#C9A24D] shrink-0" />
                        <span className="font-bold text-[#FAF9F7]">Le Roman de votre Vie (E-Book)</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-[#FAF9F7]/60 ml-8">
                        <span className="list-disc">100 pages personnalisées</span>
                      </li>
                      <li className="flex items-start gap-3 text-xs text-[#FAF9F7]/60 ml-8">
                        <span className="list-disc">Structure narrative héroïque basée sur vos cycles</span>
                      </li>
                     </ul>

                     {/* BOOK LENGTH SELECTOR */}
                     <div className="mt-6 pt-4 border-t border-[#FAF9F7]/10">
                       <div className="flex justify-between items-center mb-3">
                         <span className="text-xs font-bold text-[#FAF9F7]/80 uppercase tracking-wider">Longueur de l'épopée</span>
                         <span className="text-xs text-[#C9A24D] font-bold">
                           {bookLength === 100 ? 'Inclus' : `+${((bookLength - 100) / 100 * 10)}€`}
                         </span>
                       </div>
                       <div className="grid grid-cols-3 gap-2">
                         {[100, 200, 300].map((length) => (
                           <button
                             key={length}
                             onClick={(e) => { e.stopPropagation(); setBookLength(length as any); }}
                             className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                               bookLength === length 
                                 ? 'bg-[#C9A24D] text-[#2C2F4A] border-[#C9A24D]' 
                                 : 'bg-[#FAF9F7]/5 text-[#FAF9F7]/60 border-[#FAF9F7]/10 hover:border-[#C9A24D]/50 hover:text-[#FAF9F7]'
                             }`}
                           >
                             {length} Pages
                           </button>
                         ))}
                       </div>
                       <p className="text-[10px] text-[#FAF9F7]/40 mt-2 italic text-center">
                         Plus le livre est long, plus l'intrigue et les détails de vos vies antérieures sont développés.
                       </p>
                     </div>
                   </div>
                </div>

                {/* UPSELL PAPIER */}
                {selectedPlan === 'bundle' && (
                   <motion.div 
                     initial={{ opacity: 0, height: 0 }}
                     animate={{ opacity: 1, height: 'auto' }}
                     className="mt-4 pt-6 border-t border-[#FAF9F7]/10"
                   >
                     <div 
                       onClick={(e) => {
                         e.stopPropagation();
                         setPaperOption(!paperOption);
                       }}
                       className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                         paperOption ? 'border-[#C9A24D] bg-[#C9A24D]/10' : 'border-[#FAF9F7]/10 hover:border-[#C9A24D]/30 bg-[#FAF9F7]/5'
                       }`}
                     >
                       <div className={`w-5 h-5 rounded border mt-1 flex items-center justify-center shrink-0 transition-colors ${
                         paperOption ? 'border-[#C9A24D] bg-[#C9A24D]' : 'border-[#FAF9F7]/30 bg-transparent'
                       }`}>
                         {paperOption && <Check className="w-3 h-3 text-white" />}
                       </div>
                       <div className="flex-1">
                         <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-[#FAF9F7] text-sm">Recevoir le Livre Papier</span>
                            <span className="font-serif text-[#C9A24D] font-bold text-2xl">+29€</span>
                         </div>
                         <p className="text-xs text-[#FAF9F7]/60 leading-relaxed">
                           Un objet d'exception. Couverture rigide, papier bouffant premium, dorure à chaud. Livré chez vous.
                         </p>
                       </div>
                     </div>
                   </motion.div>
                )}

                <div className={`w-6 h-6 rounded-full border-2 absolute top-6 right-6 flex items-center justify-center transition-colors ${
                  selectedPlan === 'bundle' ? 'border-[#C9A24D]' : 'border-[#FAF9F7]/30'
                }`}>
                  {selectedPlan === 'bundle' && <div className="w-3 h-3 rounded-full bg-[#C9A24D]" />}
                </div>
            </div>
          </motion.div>

        </div>

        {/* Delivery Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
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
                 placeholder="Pour recevoir vos documents PDF"
                 className="w-full p-4 rounded-lg bg-[#FAF9F7] border border-[#EFEDE9] focus:border-[#5B4B8A] focus:ring-1 focus:ring-[#5B4B8A] outline-none transition-all"
               />
             </div>

             {/* Physical Address Fields (Conditional) */}
             {(paperOption || reportPaperOption) && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="space-y-6 pt-4 border-t border-[#EFEDE9]"
               >
                 <div className="flex items-center gap-2 text-[#C9A24D] text-sm font-bold uppercase tracking-wide mb-2">
                   <Package className="w-4 h-4" />
                   Livraison du Livre Physique
                 </div>
                 
                 <div>
                   <label className="block text-sm font-bold text-[#2C2F4A] mb-2">Adresse Postale <span className="text-red-400">*</span></label>
                   <input 
                     type="text" 
                     name="address"
                     value={deliveryInfo.address}
                     onChange={handleDeliveryChange}
                     placeholder="Numéro et nom de rue"
                     className="w-full p-4 rounded-lg bg-[#FAF9F7] border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none transition-all"
                   />
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-bold text-[#2C2F4A] mb-2">Code Postal <span className="text-red-400">*</span></label>
                     <input 
                       type="text" 
                       name="zip"
                       value={deliveryInfo.zip}
                       onChange={handleDeliveryChange}
                       placeholder="75000"
                       className="w-full p-4 rounded-lg bg-[#FAF9F7] border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none transition-all"
                     />
                   </div>
                   <div>
                     <label className="block text-sm font-bold text-[#2C2F4A] mb-2">Ville <span className="text-red-400">*</span></label>
                     <input 
                       type="text" 
                       name="city"
                       value={deliveryInfo.city}
                       onChange={handleDeliveryChange}
                       placeholder="Paris"
                       className="w-full p-4 rounded-lg bg-[#FAF9F7] border border-[#EFEDE9] focus:border-[#C9A24D] focus:ring-1 focus:ring-[#C9A24D] outline-none transition-all"
                     />
                   </div>
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-[#2C2F4A] mb-2">Pays</label>
                    <select 
                      name="country"
                      value={deliveryInfo.country}
                      onChange={handleDeliveryChange}
                      className="w-full p-4 rounded-lg bg-[#FAF9F7] border border-[#EFEDE9] focus:border-[#C9A24D] outline-none"
                    >
                      <option value="France">France</option>
                      <option value="Belgique">Belgique</option>
                      <option value="Suisse">Suisse</option>
                      <option value="Canada">Canada</option>
                      <option value="Luxembourg">Luxembourg</option>
                    </select>
                 </div>
               </motion.div>
             )}
          </div>
        </motion.div>

        {/* FOOTER ACTION */}
        <div className="mt-16 text-center sticky bottom-8 z-20 pointer-events-none">
          <div className="pointer-events-auto inline-block">
             <button 
                onClick={handlePayment}
                className="group relative inline-flex items-center gap-6 px-12 py-5 bg-[#2C2F4A] text-[#FAF9F7] text-xl font-serif font-bold rounded-full shadow-[0_20px_50px_-12px_rgba(44,47,74,0.5)] hover:bg-[#5B4B8A] transition-all transform hover:scale-105 hover:-translate-y-1"
              >
                <span>Accéder à ma destinée</span>
                <span className="bg-[#FAF9F7]/10 px-4 py-1.5 rounded-full text-lg font-sans border border-[#FAF9F7]/20">
                  {currentTotal}€
                </span>
                <Package className="w-6 h-6 text-[#C9A24D] group-hover:rotate-12 transition-transform" />
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[#2C2F4A]/50 font-medium tracking-wide">
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

function FeatureItem({ label, highlight = false, lightMode = false }: { label: string, highlight?: boolean, lightMode?: boolean }) {
  return (
    <li className="flex items-start gap-3 text-sm">
      <Check className={`w-5 h-5 shrink-0 ${highlight ? 'text-[#C9A24D]' : lightMode ? 'text-[#FAF9F7]/50' : 'text-[#8FA6A0]'}`} />
      <span className={highlight ? (lightMode ? 'text-[#FAF9F7] font-medium' : 'text-[#2C2F4A] font-medium') : (lightMode ? 'text-[#FAF9F7]/70' : 'text-[#2C2F4A]/70')}>{label}</span>
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