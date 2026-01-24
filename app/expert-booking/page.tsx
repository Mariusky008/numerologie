'use client';

import React from 'react';
import { Calendar, Star, ShieldCheck, Clock, Phone, Video, User } from 'lucide-react';

export default function ExpertBookingPage() {
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
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden mx-auto mb-4 relative bg-gray-200">
               {/* Placeholder pour photo astrologue */}
               <User className="w-full h-full text-gray-400 p-8" />
            </div>
            <div className="flex justify-center gap-1 text-[#C9A24D] mb-1">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-xs text-gray-400">4.9/5 (120 avis)</p>
          </div>

          {/* Bio Expert */}
          <div className="flex-1">
            <h2 className="text-2xl font-serif font-bold mb-2">Marie D.</h2>
            <p className="text-[#C9A24D] font-medium mb-4">Numérologue & Astrologue Humaniste • 15 ans d'expérience</p>
            <p className="text-gray-600 leading-relaxed mb-6">
              "L'IA est un outil merveilleux pour calculer, mais seul l'humain peut ressentir. Je suis là pour vous aider à interpréter les nuances subtiles de votre thème et répondre aux questions que vous n'osez pas poser à une machine. Mon approche est bienveillante, directe et axée sur la solution."
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">Compatibilité Amoureuse</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">Orientation Pro</span>
              <span className="px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 font-medium">Karma & Mission</span>
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
              <h4 className="text-xl font-bold mb-2">Consultation Flash</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold">29€</span>
                <span className="text-gray-500">/ 15 min</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 text-sm text-gray-600">
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-[#C9A24D]" />
                Focus sur 1 question précise
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-[#C9A24D]" />
                Appel Audio ou Visio
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
                Réponse immédiate et concrète
              </li>
            </ul>

            <a 
              href="https://calendly.com/contact-votrelegende" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-3 border-2 border-[#2C2F4A] text-[#2C2F4A] font-bold rounded-lg hover:bg-[#2C2F4A] hover:text-white transition-colors"
            >
              Réserver un créneau
            </a>
          </div>

          {/* Option 2: Deep Dive (Featured) */}
          <div className="bg-white rounded-xl border border-[#C9A24D] p-8 shadow-xl relative overflow-hidden transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-[#C9A24D] text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
              RECOMMANDÉ
            </div>
            <div className="mb-6">
              <h4 className="text-xl font-bold mb-2 text-[#C9A24D]">Thème Astral Profond</h4>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-serif font-bold">79€</span>
                <span className="text-gray-500">/ 45 min</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 text-sm text-gray-600">
              <li className="flex gap-3">
                <Clock className="w-5 h-5 text-[#C9A24D]" />
                Analyse complète & Prévisions 12 mois
              </li>
              <li className="flex gap-3">
                <Video className="w-5 h-5 text-[#C9A24D]" />
                Visio-conférence enregistrée
              </li>
              <li className="flex gap-3">
                <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
                Déblocage des nœuds karmiques
              </li>
            </ul>

            <a 
              href="https://calendly.com/contact-votrelegende" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-3 bg-[#C9A24D] text-white font-bold rounded-lg hover:bg-[#b08d42] transition-colors shadow-lg"
            >
              Réserver maintenant
            </a>
            <p className="text-center text-xs text-gray-400 mt-3">
              Seulement 3 créneaux disponibles cette semaine
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