'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles, User, Calendar, MapPin, Heart, CheckCircle, Clock } from 'lucide-react';
import { UserData, NumerologyResult } from '@/lib/types';

interface BookRequest {
  id: string;
  date: string;
  status: 'pending' | 'generating' | 'completed';
  userData: UserData;
  reportResults: NumerologyResult;
  lifeDetails: {
    placesLived: string;
    moves: string;
    relationships: string;
    majorEvents: string;
  };
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch('/api/book-request');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.reverse()); // Show newest first
      }
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (id: string) => {
    setGeneratingId(id);
    // Simulation of AI Generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update local state to show completed
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'completed' } : req
    ));
    setGeneratingId(null);
    alert("Livre généré avec succès ! Le manuscrit a été envoyé à l'utilisateur.");
  };

  return (
    <div className="min-h-screen bg-stone-100 text-[#57534e] font-sans">
      <nav className="bg-[#78350f] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-serif text-xl font-bold">
            <BookOpen className="w-6 h-6" />
            Admin - Romans de Vie
          </div>
          <div className="text-sm opacity-80">
            {requests.length} demandes
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-serif text-[#78350f] mb-8">File d'attente de production</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#78350f]"></div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <p className="text-lg text-stone-500">Aucune demande de livre pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((req) => (
              <div key={req.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                {/* Request Header */}
                <div className="bg-stone-50 p-4 border-b border-stone-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#d97706]/10 text-[#d97706] flex items-center justify-center font-bold font-serif">
                      {req.userData.firstName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#78350f] text-lg">
                        {req.userData.firstName} {req.userData.lastName}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <Clock className="w-3 h-3" />
                        {new Date(req.date).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    {req.status === 'completed' ? (
                      <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Généré
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        En attente
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                  {/* Left: Numerology Profile */}
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-[#78350f] border-b border-[#d97706]/20 pb-2">Profil Numérologique</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-stone-50 p-3 rounded-lg">
                        <span className="block text-stone-400 text-xs uppercase tracking-wider">Chemin de Vie</span>
                        <span className="text-xl font-bold text-[#d97706]">{req.reportResults.lifePath}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-lg">
                        <span className="block text-stone-400 text-xs uppercase tracking-wider">Expression</span>
                        <span className="text-xl font-bold text-[#d97706]">{req.reportResults.expression}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-lg">
                        <span className="block text-stone-400 text-xs uppercase tracking-wider">Année Perso</span>
                        <span className="text-xl font-bold text-[#d97706]">{req.reportResults.personalYear}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-lg">
                        <span className="block text-stone-400 text-xs uppercase tracking-wider">Dettes K.</span>
                        <span className="text-sm font-bold text-red-500">
                          {req.reportResults.missingNumbers?.join(', ') || 'Aucune'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Life Story Context */}
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-[#78350f] border-b border-[#d97706]/20 pb-2">Éléments Biographiques</h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <MapPin className="w-3 h-3" /> Lieux
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.placesLived}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Heart className="w-3 h-3" /> Cœur
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.relationships}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Sparkles className="w-3 h-3" /> Majeur
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.majorEvents}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-end">
                  {req.status !== 'completed' && (
                    <button
                      onClick={() => handleGenerate(req.id)}
                      disabled={generatingId === req.id}
                      className="flex items-center gap-2 px-6 py-3 bg-[#78350f] text-white rounded-lg hover:bg-[#573c28] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-wait"
                    >
                      {generatingId === req.id ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                          Écriture par l'IA en cours...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          Générer le Roman (IA)
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
