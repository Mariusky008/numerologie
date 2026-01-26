'use client';

import React from 'react';
import { Calendar, Star, ShieldCheck, Clock, Phone, Video, User } from 'lucide-react';

export default function ExpertBookingPage() {
  // TODO: Remplacez ce lien par votre lien d'affiliation Wengo/Kang/Spiriteo
  // Exemple Wengo (Goracash) : "https://www.wengo.fr/voyance/?tracker_id=VOTRE_ID"
  const BOOKING_LINK = "https://www.wengo.fr/"; 

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans text-[#2C2F4A]">
      
      {/* HERO SECTION */}
      <div className="bg-[#2C2F4A] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#C9A24D] rounded-full blur-[150px] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/20 border border-[#C9A24D]/30 text-[#C9A24D] text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="w-3 h-3 fill-current" /> Service Premium
          </div>
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6">
            Parlez à un Expert Humain
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Votre rapport IA vous a donné la carte. Maintenant, laissez un guide expérimenté vous aider à naviguer sur le territoire.
            Une consultation privée pour débloquer vos situations complexes.
          </p>
        </div>
      </div>

      {/* EXPERT PROFILE */}
      <div className="max-w-5xl mx-auto px-4 -mt-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#EFEDE9] flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Avatar Expert */}
          <div className="shrink-0 text-center">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden mx-auto mb-4 relative bg-[#2C2F4A]/5 flex items-center justify-center">
               <div className="text-4xl">🔮</div>
            </div>
            <div className="flex justify-center gap-1 text-[#C9A24D] mb-1">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-xs text-gray-400">4.9/5 (2500+ avis)</p>
          </div>

          {/* Bio Expert */}
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-bold mb-2">Les Meilleurs Experts Certifiés</h2>
            <p className="text-[#C9A24D] font-medium mb-4">Numérologie • Astrologie • Tarologie • Voyance</p>
            <p className="text-gray-600 leading-relaxed mb-6">
              "Parce que chaque situation est unique, nous avons sélectionné pour vous les meilleurs experts francophones. Que vous ayez besoin d'une réponse immédiate ou d'une analyse approfondie, trouvez le guide qui résonne avec vous parmi notre réseau de partenaires de confiance."
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">Disponibles 24/7</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">100% Confidentiel</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">Sélection Rigoureuse</span>
            </div>
          </div>
        </div>
      </div>

      {/* PRICING CARDS */}
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <h3 className="text-2xl font-bold text-center mb-12">Choisissez votre consultation</h3>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          
          {/* Option 1: Flash */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 group-hover:bg-[#C9A24D] transition-colors"></div>
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2">Consultation Découverte</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold">Dès 10€</span>
                <span className="text-gray-500">/ 10 min</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 text-sm text-gray-600">
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-[#C9A24D]" />
                Réponse immédiate (sans RDV)
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-[#C9A24D]" />
                Par Téléphone ou Chat
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
                Idéal pour une question précise
              </li>
            </ul>

            <a 
              href={BOOKING_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-3 border-2 border-[#2C2F4A] text-[#2C2F4A] font-bold rounded-lg hover:bg-[#2C2F4A] hover:text-white transition-colors"
            >
              Voir les experts disponibles
            </a>
          </div>

          {/* Option 2: Deep Dive (Featured) */}
          <div className="bg-white rounded-xl border border-[#C9A24D] p-8 shadow-xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-[#C9A24D] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMANDÉ
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2 text-[#C9A24D]">Consultation Approfondie</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold">Sur Mesure</span>
                <span className="text-gray-500">/ 30 à 60 min</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 text-sm text-gray-600">
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-[#C9A24D]" />
                Analyse complète de votre situation
              </li>
              <li className="flex gap-3">
                <Video className="w-5 h-5 text-[#C9A24D]" />
                Experts les mieux notés (5 étoiles)
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
                Spécialistes (Amour, Travail, Karma...)
              </li>
            </ul>

            <a 
              href={BOOKING_LINK}
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-[#C9A24D] text-white font-bold rounded-lg hover:bg-[#b08d42] transition-colors shadow-lg"
            >
              Choisir mon expert
            </a>
            <p className="text-center text-xs text-gray-400 mt-3">
              +150 experts connectés actuellement
            </p>
          </div>

        </div>
      </div>

      {/* FAQ & Reassurance */}
      <div className="bg-white py-16 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <ShieldCheck className="w-12 h-12 text-[#C9A24D] mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-4">Garantie Satisfaction</h3>
          <p className="text-gray-600 mb-8">
            Si vous n'obtenez pas de clarté sur votre situation dans les 10 premières minutes de l'appel, nous vous remboursons intégralement. Sans poser de questions.
          </p>
          <div className="flex justify-center gap-8 opacity-50 grayscale">
             {/* Logos Stripe, Visa, etc. simulés */}
             <div className="font-bold text-xl">Stripe</div>
             <div className="font-bold text-xl">Visa</div>
             <div className="font-bold text-xl">Mastercard</div>
          </div>
        </div>
      </div>

    </div>
  );
}