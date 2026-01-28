'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Sparkles, User, Calendar, MapPin, Heart, CheckCircle, Clock, Music, Compass, Star, TrendingUp, AlertTriangle, GitBranch, Copy, FileJson, Trash2, Eye, Download, PenTool, ExternalLink } from 'lucide-react';
import { UserData, NumerologyResult } from '@/lib/types';

export interface BookRequest {
  id: string;
  date: string;
  status: 'pending' | 'generating' | 'completed';
  userData: UserData & {
    plan?: 'report' | 'bundle';
    totalPrice?: number;
    bookLength?: number;
    paperOption?: boolean;
    reportPaperOption?: boolean;
    generated_script?: string; // Script IA
    video_status?: 'pending' | 'processing' | 'completed' | 'failed';
    video_url?: string;
    delivery?: {
      email: string;
      address?: string;
      city?: string;
      zip?: string;
      country?: string;
    };
  };
  generated_script?: string; // Direct column
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
    bookTheme?: string;
    worstOrdeal?: string;
    bonusAnecdote?: string;
    otherNotes?: string;
  };
}

export default function AdminDashboard() {
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [generatingId, setGeneratingId] = useState<string | null>(null);
  const [scriptGeneratingId, setScriptGeneratingId] = useState<string | null>(null);
  const [editingScriptId, setEditingScriptId] = useState<string | null>(null);
  const [tempScript, setTempScript] = useState<string>("");
  const [videoGeneratingId, setVideoGeneratingId] = useState<string | null>(null);
  const [stats, setStats] = useState<any>({});
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests();
      fetchStats();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simplified auth for MVP. In production, use a proper session.
    if (password === 'oracle2024') {
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const handleResetAll = async () => {
    if (!confirm("ATTENTION : Vous allez supprimer TOUTES les demandes et réinitialiser les statistiques à zéro. Cette action est irréversible. Continuer ?")) {
      return;
    }

    try {
      // 1. Reset Stats
      const statsRes = await fetch(`/api/stats?password=${password}`, { method: 'DELETE' });
      
      // 2. Reset Requests
      const reqRes = await fetch(`/api/book-request?bulk=true&password=${password}`, { method: 'DELETE' });

      if (statsRes.ok && reqRes.ok) {
        alert("Tout a été réinitialisé avec succès !");
        fetchRequests();
        fetchStats();
      } else {
        alert("Erreur lors de la réinitialisation.");
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau.");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`/api/stats?password=${password}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/book-request?password=${password}`);
      if (res.ok) {
        const data = await res.json();
        // Map Supabase data to BookRequest
        const mappedData = data.map((item: any) => ({
          id: item.id,
          date: item.created_at,
          status: item.status,
          generated_script: item.generated_script || item.user_data?.generated_script, // Load script
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
        body: JSON.stringify({ id, status: 'completed', password }),
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

  const handleGenerateScript = async (req: BookRequest) => {
    setScriptGeneratingId(req.id);
    try {
      const res = await fetch('/api/generate-script', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: req.id, requestData: req }),
      });

      const data = await res.json();
      if (res.ok) {
        setRequests(requests.map(r => 
          r.id === req.id ? { ...r, generated_script: data.script } : r
        ));
        alert("Script généré avec succès !");
      } else {
        alert("Erreur: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau");
    } finally {
      setScriptGeneratingId(null);
    }
  };

  const handleEditScript = (req: BookRequest) => {
    setEditingScriptId(req.id);
    setTempScript(req.generated_script || "");
  };

  const handleSaveScript = async (id: string) => {
    // Here we should save to DB, for now we just update local state
    // Ideally create an endpoint to update just the script
    setRequests(requests.map(r => 
      r.id === id ? { ...r, generated_script: tempScript } : r
    ));
    setEditingScriptId(null);
  };

  const handleGenerateVideo = async (req: BookRequest) => {
    if (!req.generated_script) return;
    
    if (!confirm("Voulez-vous lancer la production vidéo HeyGen ? Cela consommera des crédits.")) {
      return;
    }

    setVideoGeneratingId(req.id);
    try {
      const res = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: req.id, script: req.generated_script }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Production vidéo lancée ! ID HeyGen: " + data.video_id);
        // Refresh requests to show processing status
        fetchRequests();
      } else {
        alert("Erreur HeyGen: " + data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau");
    } finally {
      setVideoGeneratingId(null);
    }
  };

  const handleSendEmail = async (req: BookRequest) => {
    if (!req.userData?.video_url || !req.userData.delivery?.email) return;

    if (!confirm(`Envoyer la vidéo à ${req.userData.delivery.email} ?`)) return;

    try {
      const res = await fetch('/api/send-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: req.userData.delivery.email,
          firstName: req.userData.firstName,
          videoUrl: req.userData.video_url,
          requestId: req.id, // Pass request ID for coach link
        }),
      });

      if (res.ok) {
        alert("Email envoyé avec succès !");
      } else {
        const err = await res.json();
        alert("Erreur envoi email: " + err.error);
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau");
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
Image Sociale: ${req.reportResults.personality}
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
Thème du Livre: ${req.lifeDetails.bookTheme || 'Non spécifié'}
Pire Galère (Héros humain): ${req.lifeDetails.worstOrdeal || '-'}
Anecdote Bonus: ${req.lifeDetails.bonusAnecdote || '-'}

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
Notes Personnelles: ${req.lifeDetails.otherNotes || '-'}

--- CONSIGNE ---
Écris le premier chapitre d'un roman à la troisième personne centré sur ce personnage.
Le genre littéraire souhaité est : ${req.lifeDetails.bookTheme || 'Roman Initiatique'}.
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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full border border-stone-200">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-[#78350f] rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
              <BookOpen className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-[#78350f]">Accès Administrateur</h1>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Mot de passe</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-stone-200 focus:ring-2 focus:ring-[#78350f] outline-none transition-all"
                placeholder="Entrez le code secret..."
                autoFocus
              />
            </div>
            <button 
              type="submit"
              className="w-full py-3 bg-[#78350f] text-white rounded-lg font-bold hover:bg-[#573c28] transition-colors shadow-md"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100 text-[#57534e] font-sans">
      <nav className="bg-[#78350f] text-white p-4 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 font-serif text-xl font-bold">
            <BookOpen className="w-6 h-6" />
            Admin - Romans de Vie
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={handleResetAll}
              className="flex items-center gap-2 px-3 py-1 bg-red-600/20 hover:bg-red-600/40 border border-red-500/30 rounded text-xs font-bold transition-colors"
            >
              <Trash2 className="w-3 h-3" />
              Reset Stats & Data
            </button>
            <div className="text-sm opacity-80">
              {requests.length} demandes
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* STATS SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Stat 1: Visiteurs sans action */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-stone-100 text-stone-600 rounded-full">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Visiteurs (Sans Profil)</p>
                <p className="text-2xl font-bold text-[#78350f]">
                  {Math.max(0, (stats.home_view || 0) - (stats.reveal_click || 0))}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400">
              Sur {stats.home_view || 0} vues totales
            </p>
          </div>

          {/* Stat 2: Téléchargements PDF */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Téléchargements PDF</p>
                <p className="text-2xl font-bold text-[#78350f]">
                  {stats.download_click || 0}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400">
              Rapports générés
            </p>
          </div>

          {/* Stat 3: Écritures commencées */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-full">
                <PenTool className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Écritures Commencées</p>
                <p className="text-2xl font-bold text-[#78350f]">
                  {stats.write_click || 0}
                </p>
              </div>
            </div>
            <p className="text-xs text-stone-400">
              Clics sur "Commencer l'écriture"
            </p>
          </div>
        </div>

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
                      
                      {/* Order Info Badge */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${req.userData.plan === 'bundle' ? 'bg-[#78350f] text-white border-[#78350f]' : 'bg-white text-stone-500 border-stone-200'}`}>
                          {req.userData.plan === 'bundle' ? 'Pack Révélation (29€)' : 'Rapport Simple'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 border border-green-200">
                          {req.userData.totalPrice}€
                        </span>
                        {(req.userData.paperOption || req.userData.reportPaperOption) && (
                           <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 border border-blue-200 flex items-center gap-1">
                             <MapPin className="w-3 h-3" /> Livraison
                           </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    {/* Toujours afficher l'email s'il est dispo */}
                    {req.userData.delivery?.email && (
                       <div className="mb-3 text-xs text-stone-500 text-right">
                         <p className="font-bold text-stone-700 flex items-center justify-end gap-1">
                           <span className="select-all">{req.userData.delivery.email}</span>
                           <button 
                             onClick={() => navigator.clipboard.writeText(req.userData.delivery!.email)}
                             className="text-stone-400 hover:text-stone-600"
                             title="Copier l'email"
                           >
                             <Copy className="w-3 h-3" />
                           </button>
                         </p>
                         {req.userData.delivery.address && (
                           <>
                             <p>{req.userData.delivery.address}</p>
                             <p>{req.userData.delivery.zip} {req.userData.delivery.city}</p>
                             <p>{req.userData.delivery.country}</p>
                           </>
                         )}
                         
                         {/* Admin Quick Links */}
                         <div className="mt-3 pt-3 border-t border-stone-100 flex flex-col gap-2">
                           <div className="flex items-center justify-end gap-2 text-[10px]">
                             <span className="text-stone-400 font-medium">PDF:</span>
                             <button 
                               onClick={() => navigator.clipboard.writeText(`https://www.votrelegende.fr/pdf-report-v2?order_id=${req.id}`)}
                               className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                               title="Copier le lien PDF pour email"
                             >
                               <Copy className="w-3 h-3" /> Copier
                             </button>
                             <a href={`/pdf-report-v2?order_id=${req.id}`} target="_blank" className="text-stone-300 hover:text-stone-500"><ExternalLink className="w-3 h-3" /></a>
                           </div>
                           <div className="flex items-center justify-end gap-2 text-[10px]">
                             <span className="text-stone-400 font-medium">Coach:</span>
                             <button 
                               onClick={() => navigator.clipboard.writeText(`https://www.votrelegende.fr/coach?id=${req.id}&name=${encodeURIComponent(req.userData.firstName)}`)}
                               className="text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                               title="Copier le lien Coach pour email"
                             >
                               <Copy className="w-3 h-3" /> Copier
                             </button>
                             <a href={`/coach?id=${req.id}&name=${encodeURIComponent(req.userData.firstName)}`} target="_blank" className="text-stone-300 hover:text-stone-500"><ExternalLink className="w-3 h-3" /></a>
                           </div>
                         </div>
                       </div>
                    )}
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
                      {req.lifeDetails.bookTheme && (
                        <div className="bg-[#d97706]/10 p-2 rounded border border-[#d97706]/20">
                           <span className="flex items-center gap-2 font-bold text-[#78350f] mb-1">
                             <BookOpen className="w-3 h-3" /> Thème
                           </span>
                           <p className="text-[#78350f]">{req.lifeDetails.bookTheme}</p>
                        </div>
                      )}
                      
                      {req.lifeDetails.worstOrdeal && (
                        <div>
                          <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                             <AlertTriangle className="w-3 h-3 text-red-500" /> Pire Galère
                          </span>
                          <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.worstOrdeal}</p>
                        </div>
                      )}

                      {req.lifeDetails.bonusAnecdote && (
                        <div>
                          <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                             <Sparkles className="w-3 h-3 text-amber-500" /> Anecdote Bonus
                          </span>
                          <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.bonusAnecdote}</p>
                        </div>
                      )}

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
                      
                      {req.lifeDetails.otherNotes && (
                        <div className="col-span-full border-t border-stone-100 pt-3 mt-2">
                          <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                            <FileJson className="w-3 h-3" /> Notes Personnelles
                          </span>
                          <p className="bg-amber-50 p-3 rounded text-stone-700 italic border border-amber-100">
                            "{req.lifeDetails.otherNotes}"
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                
                {/* STUDIO VIDEO SECTION */}
                <div className="bg-slate-50 p-6 border-t border-stone-100">
                  <h4 className="font-serif font-bold text-[#78350f] mb-4 flex items-center gap-2">
                    <Music className="w-4 h-4" /> Studio Vidéo IA
                  </h4>
                  
                  {!req.generated_script ? (
                    <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-lg">
                      <p className="text-sm text-slate-500 mb-4">Aucun script généré pour le moment</p>
                      <button
                        onClick={() => handleGenerateScript(req)}
                        disabled={!!scriptGeneratingId}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm inline-flex items-center gap-2 disabled:opacity-50"
                      >
                        {scriptGeneratingId === req.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                        ) : (
                          <Sparkles className="w-4 h-4" />
                        )}
                        Rédiger avec ChatGPT
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {editingScriptId === req.id ? (
                        <div className="space-y-2">
                          <textarea
                            value={tempScript}
                            onChange={(e) => setTempScript(e.target.value)}
                            className="w-full h-64 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 font-mono text-sm"
                          />
                          <div className="flex justify-end gap-2">
                            <button 
                              onClick={() => setEditingScriptId(null)}
                              className="px-3 py-1 text-slate-600 hover:text-slate-800"
                            >
                              Annuler
                            </button>
                            <button 
                              onClick={() => handleSaveScript(req.id)}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                            >
                              Valider le Script
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="relative group">
                          <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                            {req.generated_script}
                          </div>
                          <button
                            onClick={() => handleEditScript(req)}
                            className="absolute top-2 right-2 p-2 bg-white/90 shadow rounded-full text-slate-500 hover:text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <PenTool className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      
                      {/* HeyGen Action */}
                      <div className="flex justify-end pt-2">
                        {/* Status Display */}
                         {req.userData?.video_status && (
                            <div className="mr-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                              {req.userData.video_status === 'completed' && <span className="text-green-600">Vidéo Prête</span>}
                              {req.userData.video_status === 'processing' && <span className="text-amber-600 animate-pulse">En cours...</span>}
                              {req.userData.video_status === 'failed' && <span className="text-red-600">Échec</span>}
                            </div>
                         )}

                         <button 
                           onClick={() => handleGenerateVideo(req)}
                           disabled={!!videoGeneratingId || req.userData?.video_status === 'processing'}
                           className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-wait"
                         >
                            {videoGeneratingId === req.id ? (
                               <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                            ) : (
                               <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                            )}
                            Production HeyGen
                         </button>
                      </div>

                      {/* Video Player */}
                      {req.userData?.video_url && (
                        <div className="mt-4 border rounded-lg overflow-hidden bg-black">
                           <video 
                             src={req.userData.video_url} 
                             controls 
                             className="w-full h-auto max-h-[400px] mx-auto"
                           />
                           <div className="p-2 bg-stone-100 flex justify-center gap-4">
                              <a href={req.userData.video_url} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                                <Eye className="w-3 h-3" /> Voir
                              </a>
                              <button 
                                onClick={() => handleSendEmail(req)}
                                className="text-xs text-green-600 hover:underline flex items-center gap-1 font-bold"
                              >
                                <Sparkles className="w-3 h-3" /> Envoyer Pack Complet
                              </button>
                           </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

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
        {/* DEBUG STATS TABLE (TEMPORARY) */}
        <div className="mt-12 p-6 bg-slate-100 rounded-xl border border-slate-300">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Debug: Données Brutes</h3>
          <div className="overflow-x-auto">
            <pre className="text-xs text-slate-600 font-mono">
              {JSON.stringify(stats, null, 2)}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}
