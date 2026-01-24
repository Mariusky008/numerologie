'use client';

import React, { useState, useEffect } from 'react';
import { Play, Lock, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

// --- DATA SIMULÉE ---
// Dans la vraie version, cela viendra du calcul
const ARCHETYPES: Record<number, { title: string; subtitle: string; power: string; shadow: string; description: string }> = {
  1: { title: "LE PIONNIER", subtitle: "L'Initiateur", power: "Indépendance", shadow: "Isolement", description: "Tu es une force de la nature, un leader né qui n'a pas peur d'ouvrir de nouvelles voies. Là où les autres hésitent, tu fonces. Ton énergie est brute, directe et puissante." },
  2: { title: "LE MÉDIATEUR", subtitle: "L'Harmonisateur", power: "Intuition", shadow: "Dépendance", description: "Tu as un don rare pour ressentir ce que les autres cachent. Tu es le lien, le pont entre les mondes. Ton empathie est ta boussole, mais parfois aussi ton fardeau." },
  3: { title: "L'ARTISTE", subtitle: "Le Communicant", power: "Créativité", shadow: "Dispersion", description: "Ton esprit est un feu d'artifice permanent. Tu es né pour exprimer, créer et inspirer. Ta parole est magique, mais attention à ne pas t'éparpiller dans mille directions." },
  4: { title: "LE BÂTISSEUR", subtitle: "Le Pilier", power: "Stabilité", shadow: "Rigidité", description: "Tu es le roc sur lequel les autres s'appuient. Tu construis pour durer. Ton sens du détail et ta discipline sont légendaires, mais n'oublie pas de laisser entrer un peu de lumière." },
  5: { title: "L'AVENTURIER", subtitle: "Le Libertaire", power: "Liberté", shadow: "Instabilité", description: "La routine est ton pire ennemi. Tu as besoin de mouvement, de changement, d'air frais. Tu es un explorateur de la vie, capable de t'adapter à tout, sauf à l'ennui." },
  6: { title: "LE PROTECTEUR", subtitle: "Le Gardien", power: "Harmonie", shadow: "Sacrifice", description: "Ton cœur est grand comme une maison. Tu prends soin, tu nourris, tu protèges. Tu es l'âme du foyer, mais attention à ne pas t'oublier en voulant sauver tout le monde." },
  7: { title: "LE SAGE", subtitle: "Le Chercheur", power: "Sagesse", shadow: "Solitude", description: "Tu ne te contentes pas des apparences. Tu cherches la vérité cachée derrière chaque chose. Ton esprit est analytique et profond. Tu as besoin de temps seul pour recharger tes batteries spirituelles." },
  8: { title: "LE STRATÈGE", subtitle: "Le Conquérant", power: "Puissance", shadow: "Matérialisme", description: "Tu as l'ambition des grands bâtisseurs d'empires. Tu comprends instinctivement le monde matériel et l'argent. Tu es fait pour diriger, mais ton défi est d'allier cette puissance à l'éthique." },
  9: { title: "L'HUMANISTE", subtitle: "L'Idéaliste", power: "Compassion", shadow: "Détachement", description: "Tu vois le monde non pas tel qu'il est, mais tel qu'il devrait être. Tu es une vieille âme, venue pour achever un cycle et aider l'humanité à s'élever. Ton amour est universel." },
  11: { title: "LE VISIONNAIRE", subtitle: "L'Éveilleur", power: "Inspiration", shadow: "Tension nerveuse", description: "Tu captes des fréquences que les autres ignorent. Tu es un canal, une source d'inspiration. Ta présence électrise, mais cette haute tension peut parfois être épuisante." },
  22: { title: "LE BÂTISSEUR UNIVERSEL", subtitle: "Le Maître d'Œuvre", power: "Réalisation", shadow: "Autodestruction", description: "Tu as la vision de l'idéaliste et les mains du bâtisseur. Tu peux transformer les rêves les plus fous en réalité concrète. Ton potentiel est immense, tout comme ta responsabilité." },
  33: { title: "LE GUIDE", subtitle: "Le Maître Enseignant", power: "Amour Inconditionnel", shadow: "Martyre", description: "Ton énergie est celle de la guérison pure. Tu es ici pour enseigner par l'exemple de l'amour. C'est un chemin exigeant qui demande un dévouement total." },
};

export default function DemoRevealPage() {
  // Simulation d'un Chemin de Vie 7 pour la démo
  const lifePath = 7;
  const archetype = ARCHETYPES[lifePath];
  const firstName = "Jean-Philippe";

  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

        {/* 1. TITRE CHOC (DIAGNOSTIC VITAL) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-2xl md:text-3xl font-serif font-bold mb-4 leading-tight">
            {firstName}, tu es né pour être un <span className="text-[#C9A24D]">{archetype.title}</span>, mais quelque chose te freine.
          </h1>
          <p className="text-white/60 text-sm font-light leading-relaxed px-4 mb-6">
            {archetype.description}
          </p>
          <div className="flex justify-center gap-2 mb-8">
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">Chemin de Vie {lifePath}</span>
             <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">Âme {lifePath === 7 ? '9' : '1'}</span>
          </div>
        </motion.div>

        {/* 2. LE TEASER VIDÉO (LE CLIFFHANGER) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl mb-12 relative group"
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
                  playsInline
                />
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                    <button 
                      onClick={handlePlay}
                      className="w-16 h-16 bg-[#C9A24D] rounded-full flex items-center justify-center text-[#1a1c2e] shadow-[0_0_30px_rgba(201,162,77,0.4)] hover:scale-110 transition-transform animate-pulse"
                    >
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </button>
                    <div className="absolute bottom-8 text-xs font-bold uppercase tracking-widest text-white/80">
                      Cliquez pour écouter
                    </div>
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
                
                <div className="bg-white/5 p-4 rounded-xl text-left mb-6 border border-white/5">
                  <p className="text-xs font-bold text-[#C9A24D] uppercase mb-2">Ce que tu débloques (29€) :</p>
                  <ul className="space-y-2 text-xs text-white/80">
                    <li className="flex gap-2">
                      <span className="text-[#C9A24D]">▶</span>
                      <strong>Vidéo Révélation (5 min) :</strong> L'analyse de tes traits profonds.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#C9A24D]">💬</span>
                      <strong>Coach Vocal IA (30 min) :</strong> Pose tes questions pour comprendre tes échecs passés.
                    </li>
                    <li className="flex gap-2">
                      <span className="text-[#C9A24D]">📄</span>
                      <strong>Dossier Complet (40 pages) :</strong> Ton plan d'action écrit pour le futur.
                    </li>
                  </ul>
                </div>

                <button className="w-full py-4 bg-[#C9A24D] text-[#1a1c2e] font-bold rounded-xl shadow-lg hover:bg-white transition-colors flex items-center justify-center gap-2">
                  Débloquer mon Pack <ArrowRight className="w-4 h-4" />
                </button>
                <p className="mt-3 text-[10px] text-white/40">
                  Accès immédiat • Satisfait ou remboursé
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* 3. LES 3 CARTES (GAMIFICATION) */}
        <div className="space-y-6 mb-12">
          <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 text-center mb-2">
            Les Clés de ton Analyse
          </h3>

          {/* CARTE 1 : RÉVÉLÉE (LE CADEAU) */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#C9A24D]/20 to-[#C9A24D]/5 border border-[#C9A24D]/30 rounded-xl p-5 relative overflow-hidden"
          >
             <div className="flex items-start justify-between mb-2">
               <div className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider flex items-center gap-1">
                 <Star className="w-3 h-3 fill-current" /> Carte 1 • Révélée
               </div>
             </div>
             <h4 className="text-xl font-serif font-bold text-white mb-1">{archetype.title}</h4>
             <p className="text-white/60 text-sm italic mb-3">"{archetype.subtitle}"</p>
             
             <div className="flex gap-2">
                <span className="px-2 py-1 bg-[#C9A24D]/20 rounded text-[10px] font-bold text-[#C9A24D] border border-[#C9A24D]/20">{archetype.power}</span>
                <span className="px-2 py-1 bg-[#C9A24D]/20 rounded text-[10px] font-bold text-[#C9A24D] border border-[#C9A24D]/20">Intuitif</span>
                <span className="px-2 py-1 bg-[#C9A24D]/20 rounded text-[10px] font-bold text-[#C9A24D] border border-[#C9A24D]/20">Visionnaire</span>
             </div>
          </motion.div>

          {/* CARTE 2 : VERROUILLÉE (LA DOULEUR) */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#1F2235] border border-white/5 rounded-xl p-5 relative overflow-hidden group"
          >
             {/* Flou et Overlay */}
             <div className="absolute inset-0 backdrop-blur-[2px] bg-black/40 z-10 flex flex-col items-center justify-center text-center p-4">
                <Lock className="w-6 h-6 text-white/50 mb-2" />
                <p className="text-xs text-white/60 font-medium">Débloquer pour voir ton blocage</p>
             </div>

             <div className="flex items-start justify-between mb-2 opacity-50 blur-[1px]">
               <div className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                 <ShieldCheck className="w-3 h-3" /> Carte 2 • Inconscient
               </div>
             </div>
             <h4 className="text-xl font-serif font-bold text-white mb-1 blur-[3px]">Le Saboteur Caché</h4>
             <p className="text-white/60 text-sm mb-3 blur-[2px]">Il y a une raison pour laquelle tu répètes les mêmes schémas...</p>
          </motion.div>

          {/* CARTE 3 : VERROUILLÉE (LA PROMESSE) */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#1F2235] border border-white/5 rounded-xl p-5 relative overflow-hidden group"
          >
             {/* Flou et Overlay */}
             <div className="absolute inset-0 backdrop-blur-[4px] bg-black/40 z-10 flex flex-col items-center justify-center text-center p-4">
                <Lock className="w-6 h-6 text-[#C9A24D] mb-2" />
                <p className="text-xs text-[#C9A24D] font-bold uppercase tracking-widest">Ta Destinée 2026</p>
             </div>

             <div className="flex items-start justify-between mb-2 opacity-50 blur-[2px]">
               <div className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                 <Sparkles className="w-3 h-3" /> Carte 3 • Futur
               </div>
             </div>
             <h4 className="text-xl font-serif font-bold text-white mb-1 blur-[4px]">L'Année de la Récolte</h4>
             <p className="text-white/60 text-sm mb-3 blur-[3px]">Ce que tu as semé va enfin porter ses fruits, mais attention à...</p>
          </motion.div>
        </div>

        {/* 4. LE DIAGNOSTIC VITAL (STYLE DOCTEUR) */}
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-8">
          <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
            <span className="text-2xl">🩺</span> Diagnostic de l'Âme
          </h3>
          
          <div className="space-y-4 mb-6">
            <p className="text-sm font-bold text-white/80 uppercase tracking-wide">Ressens-tu ceci ?</p>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm text-white/70">
                <span className="text-red-400 font-bold">✕</span>
                Tu as souvent l'impression d'être incompris par ton entourage, comme si tu parlais une autre langue.
              </li>
              <li className="flex gap-3 text-sm text-white/70">
                <span className="text-red-400 font-bold">✕</span>
                Tu as beaucoup d'idées brillantes, mais une force invisible t'empêche de les concrétiser jusqu'au bout.
              </li>
              <li className="flex gap-3 text-sm text-white/70">
                <span className="text-red-400 font-bold">✕</span>
                Tu donnes beaucoup aux autres, mais tu finis souvent épuisé et vide.
              </li>
            </ul>
          </div>

          <div className="bg-[#C9A24D]/10 rounded-xl p-4 border border-[#C9A24D]/20">
            <p className="text-sm text-[#C9A24D] italic text-center">
              "Ce n'est pas de ta faute. C'est écrit dans ton thème (Maison 12). Ton rapport complet contient le mode d'emploi précis pour désactiver ce frein."
            </p>
          </div>
        </div>

        {/* CTA FINAL STICKY */}
        <div className="sticky bottom-4 z-50">
          <button className="w-full py-4 bg-[#C9A24D] text-[#1a1c2e] font-bold rounded-xl shadow-[0_10px_30px_rgba(201,162,77,0.4)] hover:bg-white transition-all flex items-center justify-center gap-2 animate-pulse">
            Obtenir ma Guérison maintenant <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-8 text-center pb-20">
          <p className="text-xs text-white/30">
            Cette analyse est basée sur les coordonnées de naissance précises.
          </p>
        </div>

      </div>
    </div>
  );
}