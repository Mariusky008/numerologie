'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, User, Calendar, MapPin, Heart, CheckCircle, Clock, Compass, Star, TrendingUp, AlertTriangle, Copy, FileJson, Trash2, Eye, Download, ExternalLink, Sparkles, Music, CreditCard, Brain, Zap } from 'lucide-react';
import { UserData, NumerologyResult } from '@/lib/types';

export interface BookRequest {
  id: string;
  date: string;
  status: 'pending' | 'paid' | 'generating' | 'completed';
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
  psyResult?: any;
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
  const [stats, setStats] = useState<any>({});
  const [showUnpaid, setShowUnpaid] = useState(true);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [testLoading, setTestLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchRequests();
      fetchStats();
    }
  }, [isAuthenticated]);

  const sendTestEvent = async () => {
    setTestLoading(true);
    try {
      const res = await fetch('/api/stats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'test_event' })
      });
      if (res.ok) {
        alert("Événement de test envoyé avec succès ! Rafraîchissement...");
        fetchStats();
      } else {
        const err = await res.json();
        alert("Erreur lors de l'envoi : " + JSON.stringify(err));
      }
    } catch (e) {
      alert("Erreur réseau : " + String(e));
    } finally {
      setTestLoading(false);
    }
  };

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
      const res = await fetch(`/api/stats?password=${password}&t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        console.log("Stats received in Admin:", data);
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to fetch stats', error);
    }
  };

  const calculateConversion = (val: number, base: number) => {
    if (!base) return '0%';
    return `${Math.round((val / base) * 100)}%`;
  };

  const fetchRequests = async () => {
    try {
      const res = await fetch(`/api/book-request?password=${password}&t=${Date.now()}`);
      if (res.ok) {
        const data = await res.json();
        // Map Supabase data to BookRequest
        const mappedData = data.map((item: any) => ({
          id: item.id,
          date: item.created_at,
          status: item.status,
          generated_script: item.generated_script || item.user_data?.generated_script, // Load script
          userData: item.user_data || {},
          reportResults: item.numerology_result?.reportResults || {},
          lifeDetails: item.numerology_result?.lifeDetails || {},
          psyResult: item.numerology_result?.psyResult || {}
        }));
        setRequests(mappedData);
      } else {
        const errorText = await res.text();
        console.error("Erreur API Admin:", res.status, errorText);
        alert(`Erreur lors du chargement des commandes (${res.status}): ${errorText}`);
      }
    } catch (error) {
      console.error('Failed to fetch requests', error);
      alert("Erreur réseau : Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
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
              onClick={sendTestEvent}
              disabled={testLoading}
              className="flex items-center gap-2 px-3 py-1 bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/30 rounded text-xs font-bold transition-colors text-amber-200"
            >
              <Zap className="w-3 h-3" />
              {testLoading ? 'Envoi...' : 'Diagnostic : Tester Tracking'}
            </button>
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
        
        {/* TIKTOK FUNNEL (Detailed Drop-off) */}
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-stone-200 mb-8">
          <h2 className="text-xl font-serif font-bold text-[#78350f] flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5" />
            Entonnoir TikTok (Détail Drop-off)
          </h2>
          
          <div className="space-y-1">
            {/* Header */}
            <div className="grid grid-cols-12 text-xs font-black uppercase tracking-widest text-stone-400 pb-2 border-b border-stone-100 mb-2">
              <div className="col-span-6">Étape</div>
              <div className="col-span-2 text-right">Vues</div>
              <div className="col-span-2 text-right">Rétention</div>
              <div className="col-span-2 text-right">Global</div>
            </div>

            {[
              { label: "1. Page Accueil", key: "home_view", step: 1 },
              { label: "2. Vérif. Compatibilité", key: "compatibility_check_start", step: 2 },
              { label: "4. Blocage Identifié", key: "teaser_result_viewed", step: 4 },
              { label: "5. Profilage Q1 (Start)", key: "intro_qcm_start", step: 5 },
              { label: "   — Question 2", key: "intro_qcm_q2_viewed", step: 6, sub: true },
              { label: "   — Question 3", key: "intro_qcm_q3_viewed", step: 7, sub: true },
              { label: "   — Question 4", key: "intro_qcm_q4_viewed", step: 8, sub: true },
              { label: "   — Question 5", key: "intro_qcm_q5_viewed", step: 8.5, sub: true },
              { label: "9. Écart Détecté", key: "pre_reveal_viewed", step: 9 },
              { label: "9.5. Prise de Conscience", key: "awareness_viewed", step: 9.5 },
              { label: "10. Sales Page (Rapport)", key: "payment_trigger_viewed", step: 10 },
              { label: "11. Checkout", key: "checkout_view", step: 11 },
            ].map((row, idx, arr) => {
              const val = stats[row.key] || 0;
              const prevVal = idx > 0 ? stats[arr[idx-1].key] || 0 : val;
              const baseVal = stats.home_view || 1;
              const retention = prevVal > 0 ? Math.round((val / prevVal) * 100) : 0;
              const global = Math.round((val / baseVal) * 100);

              return (
                <div key={row.key} className={`grid grid-cols-12 items-center py-3 border-b border-stone-50 hover:bg-stone-50 transition-colors ${row.sub ? 'pl-8 opacity-80' : ''}`}>
                  <div className="col-span-6 font-medium text-stone-700 flex items-center gap-2">
                    {row.sub && <div className="w-1 h-1 rounded-full bg-stone-300" />}
                    {row.label}
                  </div>
                  <div className="col-span-2 text-right font-bold text-[#78350f]">{val}</div>
                  <div className="col-span-2 text-right text-xs">
                    <span className={`px-2 py-1 rounded ${retention < 50 ? 'bg-red-100 text-red-600' : retention < 80 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'}`}>
                      {idx === 0 ? '-' : `${retention}%`}
                    </span>
                  </div>
                  <div className="col-span-2 text-right text-xs font-bold text-stone-400">
                    {global}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* FUNNEL STATS SECTION */}
        <div className="space-y-6 mb-12">
          <h2 className="text-xl font-serif font-bold text-[#78350f] flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Entonnoir de Conversion (Miroir)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Acquisition */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Acquisition</span>
                <Eye className="w-4 h-4 text-stone-300" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-end pb-2 border-b border-stone-50">
                  <div>
                    <p className="text-2xl font-bold text-[#78350f]">{stats.home_view || 0}</p>
                    <p className="text-[10px] text-stone-500 uppercase">Vues Accueil</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-stone-700">{stats.cta_click || 0}</p>
                    <p className="text-[9px] uppercase font-bold text-stone-400">Clics CTA</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xl font-bold text-[#78350f]">{stats.experience_start || 0}</p>
                    <p className="text-[10px] text-stone-500 uppercase">Début Exp.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-stone-700">{stats.info_submitted || 0}</p>
                    <p className="text-[9px] uppercase font-bold text-stone-400">Infos Saisies</p>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-stone-400">Taux d'engagement</span>
                <span className="text-sm font-bold text-green-600">{calculateConversion(stats.cta_click || 0, stats.home_view || 0)}</span>
              </div>
            </div>

            {/* 2. Questionnaire Progress */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Questionnaire</span>
                <Brain className="w-4 h-4 text-stone-300" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-stone-600">Module A (Psy)</span>
                  <span className="text-sm font-bold">{stats.moduleA_start || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-stone-600">Module B (Situations)</span>
                  <span className="text-sm font-bold">{stats.moduleB_start || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-stone-600">Module C (Réflexes)</span>
                  <span className="text-sm font-bold">{stats.moduleC_start || 0}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                  <span className="text-xs font-bold text-[#78350f]">Terminés</span>
                  <span className="text-sm font-bold text-[#78350f]">{stats.experience_finished || 0}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-stone-400">
                  Abandon : <span className="text-red-500">{calculateConversion((stats.cta_click || 0) - (stats.experience_finished || 0), stats.cta_click || 0)}</span>
                </p>
              </div>
            </div>

            {/* 3. Intention d'achat */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Vente</span>
                <CreditCard className="w-4 h-4 text-stone-300" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-[#78350f]">{stats.checkout_view || 0}</p>
                <p className="text-xs text-stone-500">Vues page Checkout</p>
              </div>
              <div className="pt-4 border-t border-stone-100">
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-xl font-bold text-stone-700">{stats.payment_click || 0}</p>
                    <p className="text-[10px] uppercase font-bold text-stone-400">Clics Payer</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-600">{calculateConversion(stats.payment_click || 0, stats.checkout_view || 0)}</p>
                    <p className="text-[9px] uppercase font-bold text-stone-300">Intention</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Conversions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200 space-y-4 bg-[#78350f]/5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#78350f]/40">Résultats</span>
                <Sparkles className="w-4 h-4 text-[#78350f]/30" />
              </div>
              <div className="space-y-1">
                <p className="text-4xl font-black text-[#78350f]">{stats.report_purchase || 0}</p>
                <p className="text-xs font-bold text-[#78350f]/60 uppercase">Ventes Totales</p>
              </div>
              <div className="pt-4 border-t border-[#78350f]/10">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-lg font-bold text-[#78350f]">{calculateConversion(stats.report_purchase || 0, stats.home_view || 0)}</p>
                    <p className="text-[9px] uppercase font-bold text-stone-400">CVR Totale</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#78350f]">{calculateConversion(stats.report_purchase || 0, stats.experience_finished || 0)}</p>
                    <p className="text-[9px] uppercase font-bold text-stone-400">CVR Post-Test</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PROGRESS DETAILS (DROP-OFF) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-4">Drop-off Module A</h3>
            <div className="space-y-2">
              {[3, 6, 9, 12].map(step => (
                <div key={step} className="flex justify-between items-center text-sm">
                  <span className="text-stone-500">Q{step}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-400" 
                        style={{ width: calculateConversion(stats[`moduleA_progress_${step}`] || 0, stats.moduleA_start || 1) }}
                      />
                    </div>
                    <span className="font-bold w-8 text-right">{stats[`moduleA_progress_${step}`] || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-4">Drop-off Module B</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map(step => (
                <div key={step} className="flex justify-between items-center text-sm">
                  <span className="text-stone-500">Scénario {step}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-400" 
                        style={{ width: calculateConversion(stats[`moduleB_progress_${step}`] || 0, stats.moduleB_start || 1) }}
                      />
                    </div>
                    <span className="font-bold w-8 text-right">{stats[`moduleB_progress_${step}`] || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-200">
            <h3 className="text-xs font-black uppercase tracking-widest text-stone-400 mb-4">Drop-off Module C</h3>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(step => (
                <div key={step} className="flex justify-between items-center text-sm">
                  <span className="text-stone-500">Test {step}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-400" 
                        style={{ width: calculateConversion(stats[`moduleC_progress_${step}`] || 0, stats.moduleC_start || 1) }}
                      />
                    </div>
                    <span className="font-bold w-8 text-right">{stats[`moduleC_progress_${step}`] || 0}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif text-[#78350f]">Détail des Commandes</h1>
          
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-xl shadow-sm border border-stone-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="checkbox" 
                checked={showUnpaid} 
                onChange={(e) => setShowUnpaid(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 text-[#78350f] focus:ring-[#78350f]"
              />
              <span className="text-sm font-medium text-stone-600">Afficher les paniers abandonnés (Non payés)</span>
            </label>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#78350f]"></div>
          </div>
        ) : requests.filter(req => showUnpaid || req.status !== 'pending').length === 0 ? (
          <div className="bg-white p-12 rounded-xl shadow-sm text-center">
            <p className="text-lg text-stone-500">Aucune commande validée pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests
              .filter(req => showUnpaid || req.status !== 'pending')
              .map((req) => (
              <div key={req.id} className="bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden">
                {/* Request Header */}
                <div className="bg-stone-50 p-4 border-b border-stone-100 flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#d97706]/10 text-[#d97706] flex items-center justify-center font-bold font-serif">
                      {req.userData?.firstName?.[0] || '?'}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#78350f] text-lg">
                        {req.userData?.firstName || 'Anonyme'} {req.userData?.lastName || ''}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-500">
                        <Clock className="w-3 h-3" />
                        {new Date(req.date).toLocaleString()}
                      </div>
                      
                      {/* Order Info Badge */}
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${req.userData.plan === 'bundle' ? 'bg-[#78350f] text-white border-[#78350f]' : 'bg-white text-stone-500 border-stone-200'}`}>
                          {req.userData.plan === 'bundle' ? 'Pack Révélation (49€)' : 'Rapport Simple'}
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
                               onClick={() => navigator.clipboard.writeText(`https://www.votrelegende.fr/pdf-report-v2?order_id=${req.id}&admin=oracle2024`)}
                               className="text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                               title="Copier le lien PDF pour email"
                             >
                               <Copy className="w-3 h-3" /> Copier
                             </button>
                             <a href={`/pdf-report-v2?order_id=${req.id}&admin=oracle2024`} target="_blank" className="text-stone-300 hover:text-stone-500"><ExternalLink className="w-3 h-3" /></a>
                           </div>
                           <div className="flex items-center justify-end gap-2 text-[10px]">
                             <span className="text-stone-400 font-medium">Coach:</span>
                             <button 
                              onClick={() => navigator.clipboard.writeText(`https://www.votrelegende.fr/coach?id=${req.id}&name=${encodeURIComponent(req.userData?.firstName || 'Anonyme')}&admin=oracle2024`)}
                              className="text-purple-600 hover:text-purple-800 bg-purple-50 hover:bg-purple-100 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                              title="Copier le lien Coach pour email"
                            >
                              <Copy className="w-3 h-3" /> Copier
                            </button>
                            <a href={`/coach?id=${req.id}&name=${encodeURIComponent(req.userData?.firstName || 'Anonyme')}&admin=oracle2024`} target="_blank" className="text-stone-300 hover:text-stone-500"><ExternalLink className="w-3 h-3" /></a>
                           </div>
                         </div>
                       </div>
                    )}
                    {req.status === 'completed' ? (
                      <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Généré
                      </span>
                    ) : req.status === 'paid' ? (
                      <span className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        <CreditCard className="w-4 h-4" />
                        Payé
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                        <Clock className="w-4 h-4" />
                        En attente (Non payé)
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
                        <span className="text-xl font-bold text-[#d97706]">{req.reportResults?.lifePath || '-'}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-lg">
                        <span className="block text-stone-400 text-xs uppercase tracking-wider">Expression</span>
                        <span className="text-xl font-bold text-[#d97706]">{req.reportResults?.expression || '-'}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-lg">
                        <span className="block text-stone-400 text-xs uppercase tracking-wider">Année Perso</span>
                        <span className="text-xl font-bold text-[#d97706]">{req.reportResults?.personalYear || '-'}</span>
                      </div>
                      <div className="bg-stone-50 p-3 rounded-lg">
                        <span className="block text-stone-400 text-xs uppercase tracking-wider">Dettes K.</span>
                        <span className="text-sm font-bold text-red-500">
                          {req.reportResults?.missingNumbers?.join(', ') || 'Aucune'}
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
                          <p>C1: {req.reportResults?.cycles?.cycle1 || '-'} | C2: {req.reportResults?.cycles?.cycle2 || '-'}</p>
                          <p>C3: {req.reportResults?.cycles?.cycle3 || '-'} | C4: {req.reportResults?.cycles?.cycle4 || '-'}</p>
                        </div>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-[#78350f] mb-1">
                          <AlertTriangle className="w-3 h-3" /> Défis
                        </span>
                        <div className="text-xs space-y-1 text-stone-600">
                          <p>Min1: {req.reportResults?.challenges?.minor1 || '-'} | Min2: {req.reportResults?.challenges?.minor2 || '-'}</p>
                          <p>Maj: {req.reportResults?.challenges?.major || '-'} | Ult: {req.reportResults?.challenges?.major2 || '-'}</p>
                        </div>
                      </div>
                    </div>

                    {/* Psy Mirror Profile (New) */}
                    {req.psyResult && (
                      <div className="mt-4 pt-4 border-t border-[#d97706]/10">
                        <span className="flex items-center gap-2 font-bold text-[#78350f] mb-2">
                          <Brain className="w-3 h-3" /> Profil Psy Mirror
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {Object.entries(req.psyResult).map(([dim, score]: [string, any]) => (
                            <div key={dim} className="bg-stone-50 p-2 rounded text-[10px]">
                              <span className="block text-stone-400 uppercase">{dim}</span>
                              <span className="font-bold text-[#78350f]">{score}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Life Story Context */}
                  <div className="space-y-4">
                    <h4 className="font-serif font-bold text-[#78350f] border-b border-[#d97706]/20 pb-2">Éléments Biographiques</h4>
                    <div className="space-y-3 text-sm">
                      {req.lifeDetails?.bookTheme && (
                        <div className="bg-[#d97706]/10 p-2 rounded border border-[#d97706]/20">
                           <span className="flex items-center gap-2 font-bold text-[#78350f] mb-1">
                             <BookOpen className="w-3 h-3" /> Thème
                           </span>
                           <p className="text-[#78350f]">{req.lifeDetails.bookTheme}</p>
                        </div>
                      )}
                      
                      {req.lifeDetails?.worstOrdeal && (
                        <div>
                          <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                             <AlertTriangle className="w-3 h-3 text-red-500" /> Pire Galère
                          </span>
                          <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails.worstOrdeal}</p>
                        </div>
                      )}

                      {req.lifeDetails?.bonusAnecdote && (
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
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails?.placesLived || '-'}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Heart className="w-3 h-3" /> Cœur
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails?.relationships || '-'}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Sparkles className="w-3 h-3" /> Majeur
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails?.majorEvents || "-"}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Star className="w-3 h-3" /> Enfance
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails?.childhoodMemories || "-"}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Music className="w-3 h-3" /> Passions
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails?.passions || "-"}</p>
                      </div>
                      <div>
                        <span className="flex items-center gap-2 font-bold text-stone-600 mb-1">
                          <Compass className="w-3 h-3" /> Rêves
                        </span>
                        <p className="bg-stone-50 p-2 rounded text-stone-600">{req.lifeDetails?.dreams || "-"}</p>
                      </div>
                      
                      {req.lifeDetails?.otherNotes && (
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
                <div className="p-4 bg-stone-50 border-t border-stone-100 flex justify-between gap-3">
                  <button
                    onClick={() => handleDelete(req.id)}
                    className="flex items-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
                    title="Supprimer la demande"
                  >
                    <Trash2 className="w-4 h-4" />
                    Supprimer
                  </button>
                  
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigator.clipboard.writeText(`https://www.votrelegende.fr/pdf-report-v2?order_id=${req.id}&admin=oracle2024`)}
                      className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Lien PDF
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(`https://www.votrelegende.fr/coach?id=${req.id}&name=${encodeURIComponent(req.userData?.firstName || 'Anonyme')}&admin=oracle2024`)}
                      className="flex items-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors font-medium text-sm"
                    >
                      <Copy className="w-4 h-4" />
                      Lien Oracle
                    </button>
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
