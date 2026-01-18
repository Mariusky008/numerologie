'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import { Check, Star, BookOpen, Download, Package } from 'lucide-react';
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

  // Prix
  const PRICE_REPORT = 29;
  const PRICE_BUNDLE = 49;
  const PRICE_PAPER = 29;

  const currentTotal = selectedPlan === 'report' 
    ? PRICE_REPORT 
    : PRICE_BUNDLE + (paperOption ? PRICE_PAPER : 0);

  const handlePayment = () => {
    // TODO: Intégration Stripe ici
    alert(`Redirection vers le paiement Stripe (${currentTotal}€)...\n\nPour le test, nous allons générer le PDF.`);
    
    // Simulation de succès -> Redirection vers le PDF (ou le dashboard client plus tard)
    const params = new URLSearchParams({
        fn: userData.firstName,
        ln: userData.lastName,
        bd: userData.birthDate,
        bp: userData.birthPlace,
        fo: userData.focus
    });
    
    // Si c'est le bundle livre, on pourrait rediriger vers une page de confirmation spécifique
    // Pour l'instant on garde la logique existante
    window.open(`/pdf-report-v2?${params.toString()}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fffbf0] text-[#57534e] py-12 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif text-[#78350f] font-bold">
            Finalisez votre accès
          </h1>
          <p className="text-lg text-[#a8a29e]">
            {userData.firstName}, votre analyse complète est prête. <br/>
            Choisissez le format qui vous correspond pour révéler votre destinée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* OPTION 1: RAPPORT SEUL */}
          <div 
            onClick={() => setSelectedPlan('report')}
            className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer ${
              selectedPlan === 'report' 
                ? 'border-[#78350f] bg-white shadow-xl scale-[1.02]' 
                : 'border-stone-200 bg-white/50 hover:border-[#78350f]/30'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#78350f]">Dossier Essentiel</h3>
                <p className="text-sm text-[#a8a29e]">Numérologie & Astrologie V3</p>
              </div>
              <div className="text-2xl font-bold text-[#78350f]">{PRICE_REPORT}€</div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-green-500 shrink-0" />
                <span>Rapport PDF Complet (V3)</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-green-500 shrink-0" />
                <span>Thème Astral Précis (Ascendant, Maisons)</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-green-500 shrink-0" />
                <span>Transits & Météo Astrale du jour</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Check className="w-5 h-5 text-green-500 shrink-0" />
                <span>Plans d'Expression & Dettes Karmiques</span>
              </li>
            </ul>

            <div className={`w-6 h-6 rounded-full border-2 absolute top-8 right-8 flex items-center justify-center ${
              selectedPlan === 'report' ? 'border-[#78350f]' : 'border-stone-300'
            }`}>
              {selectedPlan === 'report' && <div className="w-3 h-3 rounded-full bg-[#78350f]" />}
            </div>
          </div>

          {/* OPTION 2: BUNDLE (RAPPORT + LIVRE) */}
          <div 
            onClick={() => setSelectedPlan('bundle')}
            className={`relative p-8 rounded-2xl border-2 transition-all cursor-pointer overflow-hidden ${
              selectedPlan === 'bundle' 
                ? 'border-[#d97706] bg-white shadow-2xl scale-[1.02] ring-4 ring-[#d97706]/10' 
                : 'border-stone-200 bg-white/50 hover:border-[#d97706]/30'
            }`}
          >
            {/* Badge Recommended */}
            <div className="absolute top-0 right-0 bg-[#d97706] text-white text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">
              Recommandé
            </div>

            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-[#78350f] flex items-center gap-2">
                  Pack Héros
                  <Star className="w-4 h-4 fill-[#d97706] text-[#d97706]" />
                </h3>
                <p className="text-sm text-[#a8a29e]">Dossier + Votre Roman de Vie</p>
              </div>
              <div className="text-right">
                 <div className="text-sm text-stone-400 line-through decoration-red-400">78€</div>
                 <div className="text-2xl font-bold text-[#d97706]">{PRICE_BUNDLE}€</div>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm font-medium">
                <Check className="w-5 h-5 text-[#d97706] shrink-0" />
                <span>Tout le contenu du Dossier Essentiel</span>
              </li>
              <li className="flex items-start gap-3 text-sm font-bold text-[#78350f] bg-[#fffbf0] p-2 rounded-lg -mx-2">
                <BookOpen className="w-5 h-5 text-[#d97706] shrink-0" />
                <span>Le Roman de votre Vie (E-Book)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-stone-600 ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] mt-2 shrink-0" />
                <span>100 pages personnalisées où vous êtes le héros</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-stone-600 ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] mt-2 shrink-0" />
                <span>Basé sur vos cycles réels</span>
              </li>
            </ul>

            {/* UPSELL PAPIER */}
            {selectedPlan === 'bundle' && (
               <motion.div 
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 className="mt-6 pt-6 border-t border-stone-100"
               >
                 <div 
                   onClick={(e) => {
                     e.stopPropagation();
                     setPaperOption(!paperOption);
                   }}
                   className={`flex items-start gap-4 p-4 rounded-xl border-2 transition-colors ${
                     paperOption ? 'border-[#78350f] bg-[#fffbf0]' : 'border-stone-200 hover:border-stone-300'
                   }`}
                 >
                   <div className={`w-5 h-5 rounded border-2 mt-1 flex items-center justify-center shrink-0 ${
                     paperOption ? 'border-[#78350f] bg-[#78350f]' : 'border-stone-300'
                   }`}>
                     {paperOption && <Check className="w-3 h-3 text-white" />}
                   </div>
                   <div className="flex-1">
                     <div className="flex justify-between items-center">
                        <span className="font-bold text-[#78350f]">Option Livre Papier</span>
                        <span className="font-bold text-[#78350f]">+{PRICE_PAPER}€</span>
                     </div>
                     <p className="text-xs text-stone-500 mt-1">
                       Recevez votre roman imprimé chez vous (Couverture rigide, papier premium).
                     </p>
                   </div>
                 </div>
               </motion.div>
            )}

            <div className={`w-6 h-6 rounded-full border-2 absolute top-8 right-12 flex items-center justify-center ${
              selectedPlan === 'bundle' ? 'border-[#d97706]' : 'border-stone-300'
            }`}>
              {selectedPlan === 'bundle' && <div className="w-3 h-3 rounded-full bg-[#d97706]" />}
            </div>
          </div>

        </div>

        {/* FOOTER ACTION */}
        <div className="mt-12 text-center sticky bottom-8 z-10">
          <button 
            onClick={handlePayment}
            className="group relative inline-flex items-center gap-4 px-12 py-5 bg-[#78350f] text-[#fffbf0] text-xl font-serif font-bold rounded-full shadow-2xl hover:bg-[#92400e] transition-all transform hover:scale-105"
          >
            <span>Procéder au paiement</span>
            <span className="bg-white/20 px-3 py-1 rounded text-sm font-sans">
              {currentTotal}€
            </span>
            <Package className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="mt-4 text-xs text-stone-400">
            Paiement sécurisé via Stripe • Satisfait ou remboursé 30 jours
          </p>
        </div>

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
