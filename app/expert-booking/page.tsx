
'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Star, ShieldCheck, Clock, Phone, Video, User } from 'lucide-react';
import type { GoracashExpert } from '@/lib/goracash';

const BOOKING_LINK = "https://www.wengo.fr/voyance/numerologie?tracker_id=6289"; 

const STATIC_EXPERTS: GoracashExpert[] = [
  {
    id: "1",
    name: "Marie-Hélène",
    specialties: ["Numérologie", "Astrologie"],
    rating: 4.9,
    review_count: 1250,
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    is_online: true,
    price_per_min: 2.50,
    call_url: "https://www.wengo.fr/voyance/numerologie?tracker_id=6289"
  },
  {
    id: "2",
    name: "Jean-Pierre",
    specialties: ["Tarologie", "Voyance"],
    rating: 4.8,
    review_count: 890,
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    is_online: true,
    price_per_min: 2.90,
    call_url: "https://www.wengo.fr/voyance/numerologie?tracker_id=6289"
  },
  {
    id: "3",
    name: "Clara",
    specialties: ["Médiumnité", "Canalisation"],
    rating: 5.0,
    review_count: 450,
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    is_online: false,
    price_per_min: 3.10,
    call_url: "https://www.wengo.fr/voyance/numerologie?tracker_id=6289"
  }
];

export default function ExpertBookingPage() {
  const [experts, setExperts] = useState<GoracashExpert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperts() {
      try {
        const response = await fetch('/api/experts');
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setExperts(data);
          } else {
            setExperts(STATIC_EXPERTS);
          }
        } else {
          setExperts(STATIC_EXPERTS);
        }
      } catch (error) {
        console.error("Error fetching experts:", error);
        setExperts(STATIC_EXPERTS);
      } finally {
        setLoading(false);
      }
    }
    fetchExperts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F7] font-sans text-[#2C2F4A]">
      
      {/* HERO SECTION */}
      <div className="bg-[#2C2F4A] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#C9A24D] rounded-full blur-[150px] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/20 border border-[#C9A24D]/30 text-[#C9A24D] text-xs font-bold uppercase tracking-widest mb-6">
            <Star className="w-3 h-3 fill-current" /> Service Premium d'Affiliation
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

      {/* EXPERTS GRID */}
      <div className="max-w-6xl mx-auto px-4 -mt-12 relative z-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-2xl h-[450px] animate-pulse border border-gray-200"></div>
            ))
          ) : (
            experts.map((expert) => (
              <div key={expert.id} className="bg-white rounded-2xl shadow-xl border border-[#EFEDE9] overflow-hidden flex flex-col group hover:scale-[1.02] transition-transform duration-300">
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={expert.photo_url} 
                    alt={expert.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {expert.is_online && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                      EN LIGNE
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white font-serif">{expert.name}</h3>
                    <div className="flex items-center gap-1 text-[#C9A24D]">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-white text-sm font-medium">{expert.rating} <span className="text-white/60 text-xs">({expert.review_count} avis)</span></span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {expert.specialties.map(s => (
                      <span key={s} className="px-2 py-0.5 bg-gray-100 rounded-md text-[10px] text-gray-600 font-bold uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-8 py-4 border-y border-gray-50">
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Réponse immédiate</span>
                    </div>
                    <div className="text-[#2C2F4A] font-bold">
                      {expert.price_per_min}€<span className="text-xs text-gray-400 font-normal">/min</span>
                    </div>
                  </div>

                  <a 
                    href={expert.call_url || BOOKING_LINK}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-auto block w-full text-center py-4 bg-[#2C2F4A] text-white font-bold rounded-xl hover:bg-[#1a1c2e] transition-all shadow-lg flex items-center justify-center gap-2 group-hover:gap-4"
                  >
                    <Phone className="w-4 h-4" />
                    Consulter maintenant
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* REASSURANCE SECTION */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-10 border border-[#EFEDE9]">
            <ShieldCheck className="w-12 h-12 text-[#C9A24D] mx-auto mb-6" />
            <h3 className="text-2xl font-serif font-bold mb-4">Votre consultation est protégée</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Nous collaborons exclusivement avec des plateformes certifiées. Votre anonymat est garanti et le paiement est 100% sécurisé via notre partenaire de confiance.
            </p>
            <div className="flex justify-center gap-8 opacity-40 grayscale mb-10">
               <div className="font-bold text-xl">Stripe</div>
               <div className="font-bold text-xl">Visa</div>
               <div className="font-bold text-xl">Mastercard</div>
            </div>
            
            <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed border-t pt-8">
              SERVICE D'AFFILIATION INDÉPENDANT • VOTRE LÉGENDE N'EST PAS RESPONSABLE DES CONSEILS DONNÉS PAR LES EXPERTS EXTERNES • TOUTE TRANSACTION S'EFFECTUE SUR LA PLATEFORME DU PARTENAIRE.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
