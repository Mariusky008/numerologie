import React, { useState, useEffect } from 'react';
import { Play, Lock, Star, ArrowRight, ShieldCheck, Sparkles, Brain, Heart, Zap, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  getLifePathContent, 
  getSoulUrgeContent, 
  getExpressionContent, 
  getPersonalYearContent,
  getChallengeContent 
} from '@/lib/numerology/contentGenerator';
import { UserData, NumerologyResult } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface DemoRevealViewProps {
  userData: UserData;
  results: NumerologyResult;
}

export default function DemoRevealView({ userData, results }: DemoRevealViewProps) {
  const router = useRouter();
  
  // Content Generation based on Real Results
  const lpData = getLifePathContent(results.lifePath);
  const expressionData = getExpressionContent(results.expression);
  const soulData = getSoulUrgeContent(results.soulUrge);
  const yearData = getPersonalYearContent(results.personalYear);
  const challengeData = getChallengeContent(results.challenges.major, 'major');

  const [videoEnded, setVideoEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent('video_play_demo');
    setTimeout(() => {
      setIsPlaying(false);
      setVideoEnded(true);
      trackEvent('video_ended_paywall');
    }, 8000);
  };

  const handleUnlock = () => {
    trackEvent('unlock_click');
    const params = new URLSearchParams({
        fn: userData.firstName,
        ln: userData.lastName,
        bd: userData.birthDate,
        bp: userData.birthPlace || '',
        fo: userData.focus,
        origin: 'demo_reveal'
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#1a1c2e] text-white font-sans selection:bg-[#C9A24D]/30 overflow-x-hidden">
      
      {/* BACKGROUND MYSTIQUE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#5B4B8A] rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#C9A24D] rounded-full blur-[100px] opacity-10"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex flex-col min-h-screen">
        
        {/* HEADER SIMPLE */}
        <header className="flex justify-between items-center mb-8 md:mb-12">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#C9A24D]" />
            <span className="font-serif font-bold tracking-wide text-lg">Votre Légende</span>
          </div>
          <div className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold border border-white/10 tracking-wide uppercase">
            Analyse Terminée
          </div>
        </header>

        {/* LAYOUT DESKTOP : GRILLE 2 COLONNES */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16 items-start">
          
          {/* COLONNE GAUCHE (Vidéo & Archétype) - Sticky sur Desktop */}
          <div className="md:col-span-5 md:sticky md:top-8">
            
            {/* 1. TITRE CHOC */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:text-left md:mb-6"
            >
              <h1 className="text-2xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                {userData.firstName}, tu es né pour être un <span className="text-[#C9A24D]">{lpData.title.toUpperCase()}</span>.
              </h1>
              <p className="text-white/60 text-sm md:text-base font-light leading-relaxed mb-6">
                {lpData.desc}
              </p>
              <div className="flex justify-center md:justify-start gap-2 mb-8 flex-wrap">
                 <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">Chemin de Vie {results.lifePath}</span>
                 <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">Expression {results.expression}</span>
                 <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/70 border border-white/10">Âme {results.soulUrge}</span>
              </div>
            </motion.div>

            {/* 2. LE TEASER VIDÉO */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-black/40 rounded-2xl border border-white/10 overflow-hidden shadow-2xl mb-8 relative group max-w-sm mx-auto md:mx-0 md:max-w-full"
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
                      src="/acceuil.mp4" 
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
                  <div className="absolute inset-0 bg-[#1a1c2e]/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500 z-50">
                    
                    {/* Icône Cadenas */}
                    <div className="w-12 h-12 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mb-4 border border-[#C9A24D]/20 shadow-[0_0_15px_rgba(201,162,77,0.2)]">
                      <Lock className="w-6 h-6 text-[#C9A24D]" />
                    </div>

                    <h3 className="text-xl font-serif font-bold mb-2 text-white">Vidéo Interrompue</h3>
                    <p className="text-sm text-white/60 mb-6 max-w-xs mx-auto leading-relaxed">
                      Ton avatar a découvert un blocage important lié à ton ombre : <strong className="text-white border-b border-[#C9A24D]/50 pb-0.5">{lpData.challenge || "La Peur de l'Inconnu"}</strong>.
                    </p>
                    
                    {/* Offre Packagée - Design Amélioré & Plus Impactant */}
                    <div className="bg-gradient-to-b from-white/10 to-white/5 p-8 rounded-2xl text-left mb-8 border border-[#C9A24D]/30 w-full shadow-2xl relative overflow-hidden group">
                      {/* Effet de brillance au survol */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4 relative z-10">
                        <span className="text-xl font-bold text-[#C9A24D] uppercase tracking-widest drop-shadow-md">Pack Révélation</span>
                        <div className="flex flex-col items-end">
                          <span className="text-3xl font-bold text-white drop-shadow-lg">29€</span>
                          <span className="text-[10px] text-white/50 line-through">99€</span>
                        </div>
                      </div>
                      
                      <ul className="space-y-5 relative z-10">
                        <li className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#C9A24D]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A24D]/30 shadow-[0_0_10px_rgba(201,162,77,0.2)]">
                            <span className="text-[#C9A24D] text-sm">▶</span>
                          </div>
                          <div>
                            <strong className="text-lg text-white block mb-1">Vidéo Révélation (5 min)</strong>
                            <span className="text-sm text-white/60 block leading-tight">L'analyse percutante de tes traits profonds et de ton potentiel caché.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#C9A24D]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A24D]/30 shadow-[0_0_10px_rgba(201,162,77,0.2)]">
                            <span className="text-[#C9A24D] text-sm">💬</span>
                          </div>
                          <div>
                            <strong className="text-lg text-white block mb-1">Coach Vocal IA (30 min)</strong>
                            <span className="text-sm text-white/60 block leading-tight">Dialoguez avec votre profil pour comprendre vos échecs passés.</span>
                          </div>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#C9A24D]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#C9A24D]/30 shadow-[0_0_10px_rgba(201,162,77,0.2)]">
                            <span className="text-[#C9A24D] text-sm">📄</span>
                          </div>
                          <div>
                            <strong className="text-lg text-white block mb-1">Dossier Complet (40 pages)</strong>
                            <span className="text-sm text-white/60 block leading-tight">Ton plan d'action écrit, tes cycles de vie et ta météo personnelle.</span>
                          </div>
                        </li>
                      </ul>
                    </div>

                    {/* Bouton CTA */}
                    <button 
                      onClick={handleUnlock}
                      className="w-full max-w-xs py-3.5 bg-gradient-to-r from-[#C9A24D] to-[#b08d42] text-[#1a1c2e] font-bold rounded-xl shadow-[0_4px_20px_rgba(201,162,77,0.3)] hover:shadow-[0_4px_25px_rgba(201,162,77,0.5)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Lock className="w-4 h-4" /> Débloquer mon Pack
                    </button>
                    
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-white/30">
                      <ShieldCheck className="w-3 h-3" /> Accès immédiat • Satisfait ou remboursé
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* COLONNE DROITE (Cartes & Diagnostic) */}
          <div className="md:col-span-7 space-y-8">
            
            {/* 3. LES 3 CARTES (GAMIFICATION) */}
            <div className="space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40 text-center md:text-left flex items-center gap-2">
                <Star className="w-4 h-4" /> Vos Piliers Fondamentaux
              </h3>

              {/* CARTE 1 : RÉVÉLÉE (LE CADEAU - CHEMIN DE VIE) */}
              <motion.div 
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-[#C9A24D]/20 to-[#C9A24D]/5 border border-[#C9A24D]/30 rounded-xl p-6 md:p-8 relative overflow-hidden"
              >
                 <div className="flex items-start justify-between mb-4">
                   <div className="text-xs font-bold text-[#C9A24D] uppercase tracking-wider flex items-center gap-1">
                     <Brain className="w-3 h-3 fill-current" /> Pilier Mental • Révélé
                   </div>
                 </div>
                 <h4 className="text-2xl font-serif font-bold text-white mb-2">{lpData.title}</h4>
                 <p className="text-white/60 text-sm italic mb-6">"{lpData.keywords[0] || "Sagesse"}"</p>
                 
                 <p className="text-base text-white/80 leading-relaxed mb-6 border-l-2 border-[#C9A24D] pl-4">
                   {lpData.extendedDesc.split('\n')[0]}
                 </p>

                 <div className="flex gap-2 flex-wrap">
                    {lpData.keywords.slice(0, 3).map((kw, i) => (
                      <span key={i} className="px-3 py-1 bg-[#C9A24D]/20 rounded text-xs font-bold text-[#C9A24D] border border-[#C9A24D]/20">{kw}</span>
                    ))}
                 </div>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* CARTE 2 : VERROUILLÉE (EXPRESSION) */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="bg-[#1F2235] border border-white/5 rounded-xl p-6 relative overflow-hidden group"
                >
                   {/* Flou et Overlay */}
                   <div className="absolute inset-0 backdrop-blur-[2px] bg-black/60 z-10 flex flex-col items-center justify-center text-center p-4 transition-all duration-300 group-hover:backdrop-blur-[4px] group-hover:bg-black/70">
                      <Lock className="w-8 h-8 text-[#C9A24D] mb-3" />
                      <p className="text-sm text-white font-bold mb-4">Débloquer le Pilier Social</p>
                      <button 
                        onClick={handleUnlock}
                        className="px-5 py-2 bg-[#C9A24D] text-[#1a1c2e] text-xs font-bold rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(201,162,77,0.3)] flex items-center gap-2"
                      >
                        Voir mon analyse <ArrowRight className="w-3 h-3" />
                      </button>
                   </div>

                   <div className="flex items-start justify-between mb-2 opacity-50 blur-[1px]">
                     <div className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                       <Eye className="w-3 h-3" /> Pilier Social • Expression
                     </div>
                   </div>
                   <h4 className="text-xl font-serif font-bold text-white mb-1 blur-[3px]">{expressionData.title}</h4>
                   <p className="text-white/60 text-sm mb-3 blur-[2px]">Comment le monde vous perçoit réellement...</p>
                </motion.div>

                {/* CARTE 3 : VERROUILLÉE (ÂME) */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-[#1F2235] border border-white/5 rounded-xl p-6 relative overflow-hidden group"
                >
                   {/* Flou et Overlay */}
                   <div className="absolute inset-0 backdrop-blur-[2px] bg-black/60 z-10 flex flex-col items-center justify-center text-center p-4 transition-all duration-300 group-hover:backdrop-blur-[4px] group-hover:bg-black/70">
                      <Lock className="w-8 h-8 text-[#C9A24D] mb-3" />
                      <p className="text-sm text-white font-bold mb-4">Débloquer le Pilier Cœur</p>
                      <button 
                        onClick={handleUnlock}
                        className="px-5 py-2 bg-[#C9A24D] text-[#1a1c2e] text-xs font-bold rounded-full hover:bg-white hover:scale-105 transition-all shadow-[0_0_15px_rgba(201,162,77,0.3)] flex items-center gap-2"
                      >
                        Voir mon analyse <ArrowRight className="w-3 h-3" />
                      </button>
                   </div>

                   <div className="flex items-start justify-between mb-2 opacity-50 blur-[2px]">
                     <div className="text-xs font-bold text-white/40 uppercase tracking-wider flex items-center gap-1">
                       <Heart className="w-3 h-3" /> Pilier Cœur • Élan
                     </div>
                   </div>
                   <h4 className="text-xl font-serif font-bold text-white mb-1 blur-[4px]">{soulData.title}</h4>
                   <p className="text-white/60 text-sm mb-3 blur-[3px]">Ce qui motive secrètement vos choix...</p>
                </motion.div>
              </div>
            </div>

            {/* 4. LE DIAGNOSTIC VITAL (STYLE DOCTEUR) - AMÉLIORÉ */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10 relative overflow-hidden">
              {/* Effet d'arrière plan */}
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-500/10 rounded-full blur-3xl"></div>
              
              <h3 className="text-xl font-serif font-bold mb-6 flex items-center gap-2 relative z-10">
                <span className="text-2xl">🩺</span> Diagnostic de l'Âme
              </h3>
              
              <div className="space-y-6 mb-8 relative z-10">
                <div>
                    <p className="text-sm font-bold text-white/80 uppercase tracking-wide mb-2">Votre Blocage Actuel</p>
                    <p className="text-lg text-white font-serif italic">"{challengeData.desc}"</p>
                </div>

                <div className="space-y-3">
                    <p className="text-xs text-white/50 uppercase tracking-wide">Symptômes Fréquents</p>
                    <ul className="space-y-3">
                    <li className="flex gap-4 text-base text-white/70">
                        <span className="text-red-400 font-bold text-lg mt-[-2px]">✕</span>
                        <span>Difficulté à lâcher prise sur le mental (Analyse excessive).</span>
                    </li>
                    <li className="flex gap-4 text-base text-white/70">
                        <span className="text-red-400 font-bold text-lg mt-[-2px]">✕</span>
                        <span>Sentiment de solitude même entouré (Incompréhension).</span>
                    </li>
                    <li className="flex gap-4 text-base text-white/70">
                        <span className="text-red-400 font-bold text-lg mt-[-2px]">✕</span>
                        <span>Tendance à l'isolement pour se protéger.</span>
                    </li>
                    </ul>
                </div>
              </div>

              <div className="bg-[#C9A24D]/10 rounded-xl p-6 border border-[#C9A24D]/20 relative z-10">
                <p className="text-base text-[#C9A24D] italic text-center leading-relaxed">
                  "Ce n'est pas une fatalité. C'est le Défi Majeur de votre thème. Votre rapport contient l'exercice pratique '{challengeData.exercise?.title || "Le Pont de la Conscience"}' pour transformer ce blocage en force dès cette semaine."
                </p>
              </div>
            </div>

            {/* 5. NOUVELLE SECTION : TEASER FUTUR 2026 */}
            <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-300">
                        <Zap className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Votre Météo 2026</h3>
                        <p className="text-xs text-indigo-200 uppercase tracking-wide">Année Personnelle {yearData.split(' ')[0]}</p>
                    </div>
                </div>
                
                <p className="text-white/70 leading-relaxed mb-6">
                    {yearData.substring(0, 150)}...
                </p>
                
                <div className="flex items-center gap-2 text-sm text-indigo-300 font-medium cursor-not-allowed opacity-70">
                    <Lock className="w-4 h-4" />
                    <span>Lire les prévisions mois par mois dans le rapport</span>
                </div>
            </div>

          </div>
        </div>

        {/* CTA FINAL STICKY - Mobile only or Desktop floating */}
        <div className="sticky bottom-4 z-50 md:hidden">
          <button 
            onClick={handleUnlock}
            className="w-full py-4 bg-[#C9A24D] text-[#1a1c2e] font-bold rounded-xl shadow-[0_10px_30px_rgba(201,162,77,0.4)] hover:bg-white transition-all flex items-center justify-center gap-2 animate-pulse"
          >
            Obtenir mes solutions maintenant <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Desktop CTA Floating */}
        <div className="hidden md:block fixed bottom-8 right-8 z-50">
           <button 
            onClick={handleUnlock}
            className="py-4 px-8 bg-[#C9A24D] text-[#1a1c2e] font-bold rounded-full shadow-[0_10px_40px_rgba(201,162,77,0.6)] hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 animate-pulse text-lg"
           >
            Obtenir mon Plan d'Action <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-8 text-center pb-20 md:pb-8">
          <p className="text-xs text-white/30">
            Cette analyse est basée sur les coordonnées de naissance précises.
          </p>
        </div>

      </div>

    </div>
  );
}
