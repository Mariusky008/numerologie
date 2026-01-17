'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles, User, Calendar, MapPin, Heart, CheckCircle, Clock, Music, Compass, Star, TrendingUp, AlertTriangle, GitBranch, Copy, FileJson, Trash2 } from 'lucide-react';
import { UserData, NumerologyResult } from '@/lib/types';

export interface BookRequest {
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
    childhoodMemories: string;
    passions: string;
    fears: string;
    dreams: string;
    mentors: string;
    dailyRituals: string;
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
        // Map Supabase data to BookRequest
        const mappedData = data.map((item: any) => ({
          id: item.id,
          date: item.created_at,
          status: item.status,
          userData: item.user_data,
          reportResults: item.numerology_result.reportResults,
          lifeDetails: item.numerology_result.lifeDetails
        }));
        setRequests(mappedData);
      }
    } catch (error) {
      console.error('Failed to fetch requests', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async (id: string) => {
    setGeneratingId(id);
    
    // Simulate generation time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      // Call API to update status in DB
      const res = await fetch('/api/book-request', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'completed' }),
      });

      if (res.ok) {
        // Update local state to show completed
        setRequests(requests.map(req => 
          req.id === id ? { ...req, status: 'completed' } : req
        ));
        alert("Livre généré avec succès ! Statut mis à jour.");
      } else {
        alert("Erreur lors de la mise à jour du statut.");
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert("Erreur réseau.");
    } finally {
      setGeneratingId(null);
    }
  };

  const copyToClipboard = (req: BookRequest) => {
    const prompt = `
Agis comme un écrivain biographe expert en numérologie.
Voici le profil complet du sujet pour écrire son "Roman de Vie".

--- PROFIL NUMÉROLOGIQUE ---
Prénom: ${req.userData.firstName}
Nom: ${req.userData.lastName}
Date de Naissance: ${req.userData.birthDate}
Focus de lecture: ${req.userData.focus || 'Non spécifié'}

Chemin de Vie: ${req.reportResults.lifePath}
Nombre d'Expression: ${req.reportResults.expression}
Élan Spirituel: ${req.reportResults.soulUrge}
Moi Intime: ${req.reportResults.personality}
Année Personnelle: ${req.reportResults.personalYear}

Grille d'Inclusion: ${req.reportResults.inclusionGrid ? Object.entries(req.reportResults.inclusionGrid).map(([k, v]) => `${k}:${v}`).join(', ') : 'Non calculée'}
Dettes Karmiques (Manques): ${req.reportResults.missingNumbers?.join(', ') || 'Aucune'}
Forces (Excès): ${req.reportResults.excessNumbers?.join(', ') || 'Aucune'}
Moi Subconscient: ${req.reportResults.subconsciousSelf || 'Non calculé'}
Le Pont: ${req.reportResults.bridgeNumber || 'Non calculé'}

Cycles de Vie:
- Cycle 1 (Formatif): ${req.reportResults.cycles.cycle1}
- Cycle 2 (Productif): ${req.reportResults.cycles.cycle2}
- Cycle 3 (Moisson): ${req.reportResults.cycles.cycle3}
- Cycle 4 (Sagesse): ${req.reportResults.cycles.cycle4}

Défis de Vie:
- Mineur 1: ${req.reportResults.challenges.minor1}
- Mineur 2: ${req.reportResults.challenges.minor2}
- Majeur: ${req.reportResults.challenges.major}
- Ultime: ${req.reportResults.challenges.major2}

Défis Profonds (Module 3): ${req.reportResults.deepChallenges?.join(', ') || 'Non calculé'}
Vibration Lieu de Naissance: ${req.reportResults.astroResonance?.birthPlaceVibration || 'Non calculé'}

Prévisions Carrière (10 ans):
${req.reportResults.careerForecast ? req.reportResults.careerForecast.map(f => `- ${f.year}: AP ${f.personalYear}`).join('\n') : 'Non calculé'}

--- ÉLÉMENTS BIOGRAPHIQUES (SOUVENIRS) ---
Lieux de vie: ${req.lifeDetails.placesLived}
Déménagements: ${req.lifeDetails.moves}
Vie Sentimentale: ${req.lifeDetails.relationships}
Événements Majeurs: ${req.lifeDetails.majorEvents}
Souvenirs d'Enfance: ${req.lifeDetails.childhoodMemories || '-'}
Passions: ${req.lifeDetails.passions || '-'}
Rêves & Regrets: ${req.lifeDetails.dreams || '-'}
Mentors: ${req.lifeDetails.mentors || '-'}
Rituels: ${req.lifeDetails.dailyRituals || '-'}
Peurs: ${req.lifeDetails.fears || '-'}

--- CONSIGNE ---
Écris le premier chapitre d'un roman à la troisième personne centré sur ce personnage.
L'axe principal du récit doit être : ${req.userData.focus || 'Le développement personnel'}.
Utilise les cycles et les défis pour structurer l'intrigue et les éléments biographiques pour donner de la chair à l'histoire.
Le ton doit être inspirant, mystérieux et profondément psychologique.
    `;
    
    navigator.clipboard.writeText(prompt);
    alert("Prompt complet copié dans le presse-papier !");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible.")) {
      return;
    }

    try {
      const res = await fetch(`/api/book-request?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setRequests(requests.filter(req => req.id !== id));
        alert("Demande supprimée avec succès.");
      } else {
        alert("Erreur lors de la suppression.");
      }
    } catch (error) {
      console.error('Failed to delete request', error);
      alert("Erreur réseau.");
    }
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

                    {/* Extended Details */}
                    <div className="mt-4 pt-4 border-t border-[#d97706]/10 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="flex items-center gap-2 font-bold text-[#78350f] mb-1">
                          <TrendingUp className="w-3 h-3" /> Cycles
                        </span>
                        <div className="text-xs space-y-1 text-stone-600">
                          <p>C1: {req.reportResults.cycles.cycle1} | C2: {req.reportResults.cycles.cycle2}</p>
                          <p>C3: {req.reportResults.cycles.cycle3} | C4: {req.reportResults.cycles.cycle4}</p>
                        </div>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-[#78350f] mb-1">
                          <AlertTriangle className="w-3 h-3" /> Défis
                        </span>
                        <div className="text-xs space-y-1 text-stone-600">
                          <p>Min1: {req.reportResults.challenges.minor1} | Min2: {req.reportResults.challenges.minor2}</p>
                          <p>Maj: {req.reportResults.challenges.major} | Ult: {req.reportResults.challenges.major2}</p>
                        </div>
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
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.majorEvents || "-"}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Star className="w-3 h-3" /> Enfance
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.childhoodMemories || "-"}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Music className="w-3 h-3" /> Passions
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.passions || "-"}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Compass className="w-3 h-3" /> Rêves
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.dreams || "-"}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-between gap-3">
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
                    title="Supprimer la demande"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => copyToClipboard(req)}
                      className="flex items-center gap-2 px-4 py-3 bg-stone-200 text-stone-700 rounded-lg hover:bg-stone-300 transition-colors font-medium text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Copier Prompt IA
                    </button>
                    
                    {req.status !== 'completed' && (
                      <button
                        onClick={() => handleGenerate(req.id)}
                        disabled={generatingId === req.id}
                        className="flex items-center gap-2 px-6 py-3 bg-[#78350f] text-white rounded-lg hover:bg-[#573c28] transition-colors shadow-lg disabled:opacity-70 disabled:cursor-wait"
                      >
                        {generatingId === req.id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                            Écriture...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5" />
                            Générer (Simu)
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
