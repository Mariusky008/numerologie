'use client';

import React, { useState, useEffect } from 'react';
import { Play, Lock, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA SIMULÉE ---
// Dans la vraie version, cela viendra du calcul
const ARCHETYPES: Record<number, { title: string; subtitle: string; power: string; shadow: string }> = {
  1: { title: "LE PIONNIER", subtitle: "L'Initiateur", power: "Indépendance", shadow: "Isolement" },
  2: { title: "LE MÉDIATEUR", subtitle: "L'Harmonisateur", power: "Intuition", shadow: "Dépendance" },
  3: { title: "L'ARTISTE", subtitle: "Le Communicant", power: "Créativité", shadow: "Dispersion" },
  4: { title: "LE BÂTISSEUR", subtitle: "Le Pilier", power: "Stabilité", shadow: "Rigidité" },
  5: { title: "L'AVENTURIER", subtitle: "Le Libertaire", power: "Liberté", shadow: "Instabilité" },
  6: { title: "LE PROTECTEUR", subtitle: "Le Gardien", power: "Harmonie", shadow: "Sacrifice" },
  7: { title: "LE SAGE", subtitle: "Le Chercheur", power: "Sagesse", shadow: "Solitude" },
  8: { title: "LE STRATÈGE", subtitle: "Le Conquérant", power: "Puissance", shadow: "Matérialisme" },
  9: { title: "L'HUMANISTE", subtitle: "L'Idéaliste", power: "Compassion", shadow: "Détachement" },
  11: { title: "LE VISIONNAIRE", subtitle: "L'Éveilleur", power: "Inspiration", shadow: "Tension nerveuse" },
  22: { title: "LE BÂTISSEUR UNIVERSEL", subtitle: "Le Maître d'Œuvre", power: "Réalisation", shadow: "Autodestruction" },
  33: { title: "LE GUIDE", subtitle: "Le Maître Enseignant", power: "Amour Inconditionnel", shadow: "Martyre" },
};

export default function DemoRevealPage() {
  // Simulation d'un Chemin de Vie 7 pour la démo
  const lifePath = 7;
  const archetype = ARCHETYPES[lifePath];
  const firstName = "Jean-Philippe";

  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Simulation de la vidéo : On utilise la vidéo générique pour le teaser
  // TRUCAGE : On joue les 10 premières secondes de la vidéo générique
  // Pas besoin de générer une vidéo personnalisée avec le prénom (trop long/cher)
  // On utilise une vidéo "tronc commun" qui dit :
  // "Bonjour. J'ai analysé ta date de naissance. Ce que j'y ai vu est fascinant..."
  // C'est pré-enregistré, donc chargement instantané !

  const handlePlay = () => {
    setIsPlaying(true);
    // Simulation : Au bout de 8 secondes, on coupe
    setTimeout(() => {
      setIsPlaying(false);
      setVideoEnded(true);
    }, 8000);
  };

  return (
    <div className="min-h-screen bg-[#1a1c2e] text-white font-sans selection:bg-[#C9A24D]/30 overflow-x-hidden">
      
      {/* BACKGROUND MYSTIQUE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#5B4B8A] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A24D] rounded-full blur-[100px] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 py-8 flex flex-col min-h-screen">
        
        {/* HEADER SIMPLE */}
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C9A24D]" />
            <span className="font-serif font-bold tracking-wide">Votre Légende</span>
          </div>
          <div className="px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/10">
            Analyse Terminée
          </div>
        </header>

        {/* 1. L'ARCHÉTYPE (LA RÉVÉLATION GRATUITE) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-block mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#C9A24D] blur-xl opacity-30 animate-pulse"></div>
              <img 
                src={`/archetypes/${lifePath}.png`} // On mettra des images d'archétypes ici
                onError={(e) => e.currentTarget.src = "https://via.placeholder.com/150/2C2F4A/C9A24D?text=ARCHETYPE"}
                alt="Archetype"
                className="relative w-32 h-32 rounded-full border-2 border-[#C9A24D] object-cover shadow-2xl mx-auto"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#C9A24D] text-[#1a1c2e] text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap border-2 border-[#1a1c2e]">
                Chemin de Vie {lifePath}
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
            {firstName}, tu es <span className="text-[#C9A24D]">{archetype.title}</span>.
          </h1>
          <p className="text-white/60 text-lg font-light">
            "{archetype.subtitle}"
          </p>
        </motion.div>


        {/* 2. LE TEASER VIDÉO (LE CLIFFHANGER) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl mb-8 relative group"
        >
          {/* Header Vidéo */}
          <div className="px-4 py-3 bg-white/5 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-white/70">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
              Message de votre Avatar
            </div>
            <div className="text-xs text-white/40">00:08 / 05:00</div>
          </div>

          {/* Player Vidéo */}
          <div className="relative aspect-[9/16] bg-black">
            {!videoEnded ? (
              <>
                <video 
                  src="/Ton Parcours de Vie.mp4" 
                  className={`w-full h-full object-cover transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-60'}`}
                  // En prod, utiliser une vidéo générique "Intro" qui marche pour tout le monde
                  // "Bonjour, j'ai analysé ton thème..."
                />
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <button 
                      onClick={handlePlay}
                      className="w-16 h-16 bg-[#C9A24D] rounded-full flex items-center justify-center text-[#1a1c2e] shadow-[0_0_30px_rgba(201,162,77,0.4)] hover:scale-110 transition-transform"
                    >
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </button>
                  </div>
                )}

                {/* Barre de progression Fake */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                   <motion.div 
                     className="h-full bg-[#C9A24D]" 
                     initial={{ width: "0%" }}
                     animate={{ width: isPlaying ? "100%" : "0%" }}
                     transition={{ duration: 8, ease: "linear" }}
                   />
                </div>
              </>
            ) : (
              // ÉCRAN DE FIN (PAYWALL)
              <div className="absolute inset-0 bg-[#1a1c2e]/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
                  <Lock className="w-8 h-8 text-[#C9A24D]" />
                </div>
                <h3 className="text-xl font-bold mb-2">Vidéo Interrompue</h3>
                <p className="text-sm text-white/60 mb-6">
                  Ton avatar a découvert un blocage important lié à ton ombre : <strong className="text-white">{archetype.shadow}</strong>.
                </p>
                <button className="w-full py-4 bg-[#C9A24D] text-[#1a1c2e] font-bold rounded-xl shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Débloquer la suite (29€) <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-3 text-[10px] text-white/40">
                  Accès immédiat • Satisfait ou remboursé
                </p>
              </div>
            )}
          </div>
        </motion.div>


        {/* 3. LES CARTES (LA PROMESSE) */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 text-center mb-4">
            Dans ton dossier complet
          </h3>
          
          {/* Carte 1 : Force (Débloquée visuellement mais payante pour le détail) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden group">
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a1c2e] to-transparent z-10"></div>
            <div className="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center shrink-0 text-[#C9A24D]">
              <Star className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="text-xs text-[#C9A24D] font-bold uppercase">Ta Super-Puissance</div>
              <div className="text-lg font-serif">{archetype.power}</div>
            </div>
            <div className="ml-auto pr-2 opacity-50"><Lock className="w-4 h-4" /></div>
          </div>

          {/* Carte 2 : Ombre (Floutée) */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 relative overflow-hidden filter grayscale opacity-70">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="blur-sm select-none">
              <div className="text-xs text-white/50 font-bold uppercase">Ton Blocage Majeur</div>
              <div className="text-lg font-serif">La Peur de l'Échec</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
               <Lock className="w-6 h-6 text-white" />
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-8 text-center">
          <p className="text-xs text-white/30">
            Cette analyse est basée sur les coordonnées de naissance précises.
          </p>
        </div>

      </div>
    </div>
  );
}