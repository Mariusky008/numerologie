import React, { useState, useRef } from 'react';
import { Play, Shield, Smartphone, User, Compass, Eye, FileText, ArrowRight, Volume2, VolumeX, BookOpen, Mic, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPageHero({ onStart }: LandingPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // States for Preview Video
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);
  const [isPreviewMuted, setIsPreviewMuted] = useState(true);
  const [isPreviewLoaded, setIsPreviewLoaded] = useState(false);
  
  const [showExcerpt, setShowExcerpt] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  // Force Autoplay on Mount
  // React.useEffect(() => {
  //   if (previewVideoRef.current) {
  //     previewVideoRef.current.play().catch(() => {
  //       // Autoplay prevented (e.g. low power mode), waiting for user interaction
  //     });
  //   }
  // }, []);

  const togglePreviewPlay = () => {
    if (previewVideoRef.current) {
      if (isPreviewPlaying) {
        previewVideoRef.current.pause();
      } else {
        previewVideoRef.current.currentTime = 0; // Restart video from beginning
        previewVideoRef.current.play();
        previewVideoRef.current.muted = false;
        setIsPreviewMuted(false);
      }
      setIsPreviewPlaying(!isPreviewPlaying);
    }
  };

  const togglePreviewMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewVideoRef.current) {
      previewVideoRef.current.muted = !isPreviewMuted;
      setIsPreviewMuted(!isPreviewMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.currentTime = 0; // Restart video from beginning
        videoRef.current.play();
        videoRef.current.muted = false; // Unmute on click
        setIsMuted(false);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] font-sans selection:bg-[#C9A24D]/20">
      
      {/* 🧩 SECTION 1 — HERO */}
      <section className="relative pt-8 pb-16 px-6 overflow-hidden max-w-md mx-auto md:max-w-4xl">
        
        {/* Glowing Orb Heartbeat (reintroduced) */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[80px] mix-blend-multiply opacity-20"
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.15, 0.3, 0.15],
              backgroundColor: ["#FCD34D", "#FB923C", "#FCD34D"]
            }}
            transition={{
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto pt-8">
          
          {/* Badge / Tag */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 px-4 py-1.5 rounded-full bg-white/80 border border-[#C9A24D]/30 shadow-sm backdrop-blur-sm flex items-center gap-2"
          >
             <span className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] animate-pulse"></span>
             <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#2C2F4A]/70">
               Basée sur votre date de naissance
             </span>
          </motion.div>

          {/* Titre Principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#2C2F4A] leading-[1.1] text-center mb-6"
          >
            Votre histoire révélée<br/> en <span className="text-[#C9A24D]">5 minutes</span>
          </motion.h1>

          {/* Sous-titre / Description */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-lg md:text-xl text-[#2C2F4A]/80 font-light leading-relaxed">
              Laissez votre avatar personnel vous expliquer votre thème de vie, sans jargon ni détours. Découvrez enfin qui vous êtes vraiment.
            </h2>
          </motion.div>



          {/* Visuel Central (Avatar + Play) */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-80 h-80 md:w-96 md:h-96 mx-auto my-10 rounded-full border-4 border-[#C9A24D]/30 p-2 shadow-2xl cursor-pointer group"
            onClick={togglePlay}
          >
            {/* Mystic Particles (reintroduced) */}
            {Array.from({ length: 12 }).map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute text-[#C9A24D] font-serif font-bold pointer-events-none z-0"
                 initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                 animate={{ 
                   opacity: [0, 0.8, 0],
                   x: (Math.random() - 0.5) * 350,
                   y: (Math.random() - 0.5) * 350,
                   scale: [0.5, 1.5, 0.5],
                   rotate: Math.random() * 360
                 }}
                 transition={{ 
                   duration: 3 + Math.random() * 3,
                   repeat: Infinity,
                   delay: Math.random() * 2,
                   ease: "easeOut"
                 }}
                 style={{
                   top: '50%',
                   left: '50%',
                   fontSize: Math.random() > 0.5 ? '20px' : '12px',
                 }}
               >
                 {['1', '7', '4', 'A', 'Ω', '✨', '☾', '9', '3', '∞', '⚡', '8'][i % 12]}
               </motion.div>
             ))}

            <div className="w-full h-full rounded-full overflow-hidden relative bg-gradient-to-br from-[#2C2F4A] to-[#5B4B8A] z-10">
              {/* Avatar Video Preview */}
              <video 
                ref={videoRef}
                src="/Ton Parcours de Vie.mp4" 
                // muted: Removed to ensure sound is ON when user clicks play
                // autoPlay: Removed to prevent silent playback
                // loop: Removed to stop at end
                playsInline
                className="w-full h-full object-cover object-top opacity-90"
                onEnded={() => setIsPlaying(false)}
              />
              
              {/* Controls Overlay */}
              <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                 <div className="absolute inset-0 flex items-center justify-center">
                    {!isPlaying && (
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 animate-pulse">
                        <Play className="w-10 h-10 text-white fill-white ml-1" />
                      </div>
                    )}
                 </div>
                 
                 {/* Mute/Unmute Button (Visible when playing) */}
                 {isPlaying && (
                    <button 
                      onClick={toggleMute}
                      className="absolute bottom-6 right-6 p-3 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors"
                    >
                      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                    </button>
                 )}
              </div>
            </div>
            
            {/* Decorative Orbit */}
            <div className={`absolute inset-0 border border-[#C9A24D] rounded-full scale-110 opacity-30 ${isPlaying ? 'animate-spin-slow' : ''}`}></div>
          </motion.div>

          {/* CTA UNIQUE */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="pb-8 flex flex-col items-center text-center"
          >
            <button 
              onClick={onStart}
              className="w-full md:w-auto px-8 py-5 bg-[#2C2F4A] text-white rounded-full font-bold text-lg md:text-xl shadow-[0_10px_30px_-10px_rgba(44,47,74,0.4)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto"
            >
              <Play className="w-5 h-5 fill-current" />
              Découvrez ce que votre avatar dit de vous
            </button>
            <div className="mt-4 max-w-sm mx-auto">
               <strong className="text-[#5B4B8A] font-bold block text-sm mb-1">Le résumé de votre Thème Astrologique et Numérologique OFFERT</strong>
               <p className="text-xs text-[#2C2F4A]/40 font-medium">Vous n’avez rien à deviner. Vous avez juste à regarder.</p>
            </div>
          </motion.div>



        </div>
      </section>

      {/* 🧩 SECTION 1.2 — BÉNÉFICES & CHAT (NOUVEAU PLACEMENT) */}
      <section className="py-16 px-6 bg-white border-y border-[#EFEDE9]">
          <div className="w-full max-w-4xl mx-auto space-y-16">
            
            {/* 1. Benefits List */}
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center"
            >
               <h3 className="text-2xl md:text-3xl font-serif text-[#2C2F4A] mb-10 leading-tight">
                 En <span className="text-[#C9A24D]">5 minutes de vidéo</span>, votre avatar vous révèle :
               </h3>
               
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
                 <li className="flex items-start gap-4 bg-[#FAF9F7] p-5 rounded-2xl border border-[#EFEDE9] hover:border-[#C9A24D]/30 transition-colors">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#C9A24D] font-bold text-sm shadow-sm">✓</div>
                   <span className="text-[#2C2F4A]/80 font-medium text-base pt-1">Ce que vous portez profondément</span>
                 </li>
                 <li className="flex items-start gap-4 bg-[#FAF9F7] p-5 rounded-2xl border border-[#EFEDE9] hover:border-[#C9A24D]/30 transition-colors">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#C9A24D] font-bold text-sm shadow-sm">✓</div>
                   <span className="text-[#2C2F4A]/80 font-medium text-base pt-1">Ce que vous traversez en ce moment</span>
                 </li>
                 <li className="flex items-start gap-4 bg-[#FAF9F7] p-5 rounded-2xl border border-[#EFEDE9] hover:border-[#C9A24D]/30 transition-colors">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#C9A24D] font-bold text-sm shadow-sm">✓</div>
                   <span className="text-[#2C2F4A]/80 font-medium text-base pt-1">Les grandes dynamiques de votre vie</span>
                 </li>
                 <li className="flex items-start gap-4 bg-[#FAF9F7] p-5 rounded-2xl border border-[#EFEDE9] hover:border-[#C9A24D]/30 transition-colors">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 text-[#C9A24D] font-bold text-sm shadow-sm">✓</div>
                   <span className="text-[#2C2F4A]/80 font-medium text-base pt-1">Vos forces et vos défis récurrents</span>
                 </li>
               </ul>
               <p className="text-sm text-center pt-8 italic text-[#2C2F4A]/50">
                 "Sans jargon. Sans discours flou. Sans promesses irréalistes."
               </p>
            </motion.div>

            {/* 2. Chat Feature Promo (Redesigned & Narrative) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#1F2235] to-[#2C2F4A] text-white shadow-2xl border border-[#C9A24D]/20 group max-w-5xl mx-auto flex flex-col md:flex-row items-stretch"
            >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#C9A24D] rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity"></div>
                
                {/* Gauche : Le Visuel de Continuité (45%) */}
                <div className="w-full md:w-[45%] p-8 md:p-12 relative flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10 bg-black/20">
                   
                   {/* Avatar Circle (Large & Alive) */}
                   <div className="relative w-28 h-28 md:w-32 md:h-32 mb-8 group-hover:scale-105 transition-transform duration-500">
                      <div className="absolute inset-0 rounded-full border-2 border-[#C9A24D] animate-[pulse_3s_infinite]"></div>
                      <div className="absolute -inset-2 rounded-full border border-white/10"></div>
                      
                      {/* Photo Avatar (La même que la vidéo) */}
                      <div className="w-full h-full rounded-full overflow-hidden shadow-2xl relative z-10 bg-[#2C2F4A]">
                        <video 
                          src="/Ton Parcours de Vie.mp4" 
                          muted 
                          autoPlay 
                          loop 
                          playsInline 
                          className="w-full h-full object-cover object-top transform scale-150 translate-y-2" 
                        />
                      </div>

                      {/* Status Indicator (Online) */}
                      <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-4 border-[#1F2235] rounded-full z-20 shadow-md flex items-center justify-center">
                         <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                      </div>
                   </div>

                   {/* Simulation Interface Vocale */}
                   <div className="w-full max-w-xs space-y-4">
                      {/* Bulle User */}
                      <div className="flex justify-end">
                         <div className="bg-[#C9A24D] text-[#2C2F4A] px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs md:text-sm font-bold shadow-lg flex items-center gap-2 transform translate-x-2 group-hover:translate-x-0 transition-transform duration-500">
                            <span>"Pourquoi je bloque en amour ?"</span>
                            <div className="w-5 h-5 bg-[#2C2F4A]/10 rounded-full flex items-center justify-center shrink-0">
                               <Mic className="w-2.5 h-2.5 text-[#2C2F4A]" />
                            </div>
                         </div>
                      </div>
                      
                      {/* Bulle Avatar (Waveform Response) */}
                      <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-700 delay-300 fill-mode-both">
                         <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0 bg-[#2C2F4A]">
                            <video 
                              src="/Ton Parcours de Vie.mp4" 
                              muted 
                              autoPlay 
                              loop 
                              playsInline 
                              className="w-full h-full object-cover object-top transform scale-150 translate-y-1" 
                            />
                         </div>
                         <div className="h-10 flex-1 bg-white/10 rounded-full rounded-tl-sm flex items-center px-4 gap-1 border border-white/5 shadow-inner">
                            {/* Waveform Bars */}
                            {[...Array(12)].map((_, i) => (
                               <div key={i} className="w-0.5 md:w-1 bg-[#C9A24D] rounded-full animate-[pulse_1s_ease-in-out_infinite]" style={{ 
                                  height: Math.random() * 16 + 6 + 'px',
                                  animationDelay: i * 0.05 + 's',
                                  opacity: 0.8
                               }}></div>
                            ))}
                         </div>
                      </div>
                   </div>

                </div>

                {/* Droite : Le Texte Explicatif (55%) */}
                <div className="w-full md:w-[55%] p-8 md:p-12 text-center md:text-left relative z-10 flex flex-col justify-center">
                   <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-6">
                      <div className="px-3 py-1 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-widest">
                        ✨ La suite de l'expérience
                      </div>
                   </div>
                   
                   <h3 className="text-2xl md:text-4xl font-serif leading-tight mb-6">
                     Après la vidéo,<br/>
                     <span className="text-[#C9A24D]">la conversation continue.</span>
                   </h3>
                   
                   <p className="text-white/70 leading-relaxed text-base md:text-lg mb-8 font-light">
                     Ne restez pas sur votre faim. Une fois la vidéo terminée, votre avatar reste disponible pour <strong>30 minutes d'échange vocal</strong>, comme une vraie consultation.
                   </p>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center shrink-0">
                           <User className="w-4 h-4 text-[#C9A24D]" />
                        </div>
                        <span className="text-sm text-white/80 font-medium">Posez vos questions</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center shrink-0">
                           <Sparkles className="w-4 h-4 text-[#C9A24D]" />
                        </div>
                        <span className="text-sm text-white/80 font-medium">Réponses uniques</span>
                      </div>
                   </div>

                   <div className="pt-6 border-t border-white/10 flex items-center justify-center md:justify-between gap-4">
                     <div className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                       <Volume2 className="w-4 h-4 text-[#C9A24D]" />
                       Inclus dans le Pack
                     </div>
                     <div className="text-[#C9A24D] font-serif italic opacity-60 text-sm hidden sm:block">
                        "C'est comme parler à une amie qui sait tout."
                     </div>
                   </div>
                   
                   <div className="mt-8 flex justify-center md:justify-start">
                      <button 
                        onClick={onStart}
                        className="px-8 py-4 bg-[#C9A24D] text-[#2C2F4A] rounded-full font-bold shadow-[0_10px_20px_-5px_rgba(201,162,77,0.4)] hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2 group"
                      >
                        <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                        Découvrir mon avatar maintenant
                      </button>
                   </div>
                </div>
            </motion.div>

          </div>
      </section>


      {/* 🧩 SECTION 2 — TÉMOIGNAGE UNIQUE */}
      <section className="py-16 px-6 bg-white border-y border-[#EFEDE9]">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-center gap-10">
             {/* Photo Témoin */}
             <div className="relative w-48 h-48 flex-shrink-0">
               <div className="absolute inset-0 bg-[#C9A24D] rounded-full blur-xl opacity-20"></div>
               <img 
                 src="/thomas.jpg?v=1" 
                 alt="Thomas, 34 ans" 
                 className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl relative z-10"
               />
               <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-lg z-20">
                  <span className="text-2xl">⭐️</span>
               </div>
             </div>

             {/* Contenu Témoignage */}
             <div className="flex-1 text-center md:text-left space-y-6">
                <div className="space-y-2">
                   <div className="flex items-center justify-center md:justify-start gap-2 text-[#C9A24D]">
                      <span className="text-xl">★★★★★</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#2C2F4A]/40">Vérifié</span>
                   </div>
                   <h3 className="font-serif text-2xl md:text-3xl text-[#2C2F4A] leading-tight">
                     "Je pensais me connaître, mais l'Avatar a vu ce que j'ignorais."
                   </h3>
                </div>

                <div className="space-y-4 text-[#2C2F4A]/70 text-lg font-light leading-relaxed">
                   <p>
                     J'étais sceptique. Une vidéo et un chat IA sur ma vie ? Je m'attendais à des généralités d'horoscope. Mais quand l'avatar a commencé à parler, j'ai été scotché.
                   </p>
                   <p>
                     <strong className="text-[#5B4B8A] font-medium">En 5 minutes, elle a mis des mots sur des blocages que je traîne depuis 10 ans.</strong> J'ai ensuite passé 30 minutes à discuter avec elle : ses conseils étaient d'une justesse effrayante.
                   </p>
                   <p>
                     Le dossier de 40 pages est la cerise sur le gâteau : une véritable feuille de route. J'ai enfin compris que mon "instabilité" était en fait ma plus grande force créative.
                   </p>
                </div>

                <div className="pt-4 border-t border-[#EFEDE9] flex flex-col md:flex-row items-center gap-4">
                   <div className="text-left">
                      <div className="font-bold text-[#2C2F4A]">Thomas R.</div>
                      <div className="text-sm text-[#2C2F4A]/50">34 ans • Entrepreneur • Chemin de Vie 5</div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </section>

      {/* 🧩 SECTION 3 — CE QUE VOUS RECEVEZ (REDESIGN PREMIUM) */}
      <section className="py-20 px-6 bg-[#FAF9F7] relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-[#C9A24D]/10 rounded-full blur-[60px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto relative z-10">
          
          <div className="text-center mb-12 space-y-4">
             <span className="text-[#C9A24D] font-bold tracking-[0.2em] text-xs uppercase border border-[#C9A24D]/30 px-4 py-1 rounded-full bg-white/50 backdrop-blur-sm">Offre Complète</span>
             <h2 className="text-3xl md:text-5xl font-serif text-[#2C2F4A]">Votre Pack Révélation</h2>
             <p className="text-[#2C2F4A]/60 max-w-lg mx-auto">
               Une suite d'outils unique pour explorer votre identité sous tous ses angles. Écrit, Visuel et Oral.
             </p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#EFEDE9] overflow-hidden relative">
             {/* Top Banner Stripe */}
             <div className="h-2 w-full bg-gradient-to-r from-[#2C2F4A] via-[#C9A24D] to-[#2C2F4A]"></div>

             <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
                
                {/* Left Col: The Content Items (Span 7) */}
                <div className="lg:col-span-7 space-y-6">
                   
                   {/* Item 1: Dossier */}
                   <div className="flex items-start gap-5 p-5 rounded-2xl bg-[#FAF9F7] border border-[#EFEDE9] group hover:border-[#C9A24D]/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#5B4B8A] shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                         <FileText className="w-6 h-6" />
                      </div>
                      <div>
                         <h3 className="font-serif text-lg text-[#2C2F4A] mb-1">Votre Dossier Numérologique</h3>
                         <p className="text-sm text-[#2C2F4A]/60 leading-relaxed">
                           Un document PDF complet de <strong>40+ pages</strong>, analysant vos cycles, vos défis et votre chemin de vie avec une clarté absolue.
                         </p>
                      </div>
                   </div>

                   {/* Item 2: Vidéo */}
                   <div className="flex items-start gap-5 p-5 rounded-2xl bg-[#FAF9F7] border border-[#EFEDE9] group hover:border-[#C9A24D]/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#C9A24D] shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                         <Play className="w-6 h-6 fill-current" />
                      </div>
                      <div>
                         <h3 className="font-serif text-lg text-[#2C2F4A] mb-1">Votre Vidéo Avatar (5 min)</h3>
                         <p className="text-sm text-[#2C2F4A]/60 leading-relaxed">
                           La synthèse visuelle et orale de votre profil. Votre avatar vous explique l'essentiel, droit dans les yeux.
                         </p>
                      </div>
                   </div>

                   {/* Item 3: Coach (Highlight) */}
                   <div className="flex items-start gap-5 p-5 rounded-2xl bg-[#2C2F4A] text-white relative overflow-hidden group">
                      {/* Glow */}
                      <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#C9A24D] rounded-full blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-[#C9A24D] shrink-0 ring-1 ring-white/20">
                         <Volume2 className="w-6 h-6" />
                      </div>
                      <div className="relative z-10">
                         <h3 className="font-serif text-lg text-white mb-1 flex items-center gap-2">
                           Coach Vocal IA (30 min)
                           <span className="text-[10px] bg-[#C9A24D] text-[#2C2F4A] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Exclusif</span>
                         </h3>
                         <p className="text-sm text-white/70 leading-relaxed">
                           Posez toutes vos questions à l'oral. Votre avatar vous répond instantanément avec une sagesse personnalisée.
                         </p>
                      </div>
                   </div>

                </div>

                {/* Right Col: Price & CTA (Span 5) */}
                <div className="lg:col-span-5 flex flex-col justify-center bg-[#FAF9F7]/50 rounded-2xl p-8 border border-[#EFEDE9] text-center relative">
                   
                   <div className="mb-6">
                      <div className="text-sm text-[#2C2F4A]/40 line-through mb-1">Valeur réelle : 129€</div>
                      <div className="text-6xl font-serif text-[#2C2F4A] font-bold tracking-tight">29€</div>
                      <div className="text-[#C9A24D] text-sm font-bold uppercase tracking-widest mt-2">Paiement Unique</div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex flex-col gap-2 text-xs text-[#2C2F4A]/50 mb-4">
                         <div className="flex items-center justify-center gap-2">
                            <Shield className="w-4 h-4 text-[#C9A24D]" /> <span>Paiement 100% Sécurisé</span>
                         </div>
                         <div className="flex items-center justify-center gap-2">
                            <span className="text-lg leading-none">⚡️</span> <span>Accès Immédiat par Email</span>
                         </div>
                      </div>

                      {/* Option Livre Mention */}
                      <div className="py-3 px-4 bg-white rounded-lg border border-[#C9A24D]/20 text-xs text-[#2C2F4A]/70 italic">
                        <span className="font-bold text-[#5B4B8A] block mb-1 not-italic">🎁 Bonus Optionnel</span>
                        Possibilité d'ajouter le <strong>Livre "Roman de Vie"</strong> à l'étape suivante.
                      </div>
                      
                      <button 
                        onClick={onStart}
                        className="w-full py-4 bg-[#2C2F4A] text-white rounded-xl font-bold text-lg shadow-xl hover:bg-[#C9A24D] hover:text-[#2C2F4A] transition-all flex items-center justify-center gap-2 mt-2 group"
                      >
                        <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
                        Obtenir mon accès immédiat
                      </button>
                   </div>
                </div>

             </div>
          </div>

        </div>
      </section>




      {/* 🧩 SECTION 4 — UPSELL LIVRE & VIDÉO (PREMIUM) */}
      <section className="py-16 px-6 bg-[#2C2F4A] text-white relative overflow-hidden">
         {/* Title Premium */}
         <div className="max-w-4xl mx-auto text-center mb-16 relative z-20">
            <h2 className="text-2xl md:text-3xl font-serif leading-tight text-white">
              Et si vous voulez aller encore plus loin, <br/>
              nous vous proposons <span className="text-[#C9A24D]">le roman de votre propre vie</span> en option premium.
            </h2>
         </div>

         {/* Background Elements */}
         <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A24D] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#5B4B8A] rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

         <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            
            {/* Visualisation (Video + Livre) */}
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
            >
               {/* Container Principal : Vidéo Avatar */}
               <div 
                  className="relative aspect-[9/16] w-full max-w-[260px] rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 group cursor-pointer bg-black"
                  onClick={togglePreviewPlay}
               >
                  <video 
                     ref={previewVideoRef}
                     muted 
                     loop 
                     playsInline
                     preload="auto"
                     poster="/avatar-poster.jpg"
                     className="w-full h-full object-contain bg-black relative z-10"
                  >
                    <source src="/avatars.mp4?v=2" type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                  
                  {/* Bouton Play Central (Masqué si lecture) */}
                  {!isPreviewPlaying && (
                     <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(201,162,77,0.3)]">
                           <Play className="w-6 h-6 text-white fill-white ml-1" />
                        </div>
                     </div>
                  )}

                  {/* Contrôles Son (Visible si lecture) */}
                  {isPreviewPlaying && (
                     <div className="absolute bottom-6 left-6 z-30" onClick={(e) => e.stopPropagation()}>
                        <button 
                          onClick={togglePreviewMute}
                          className="p-2 bg-black/40 rounded-full hover:bg-black/60 text-white transition-colors backdrop-blur-sm"
                        >
                          {isPreviewMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                     </div>
                  )}
               </div>
                  
               {/* Livre Flottant (À côté) */}
               <motion.div 
                 initial={{ y: 20, rotate: -3 }}
                 animate={{ y: [0, -10, 0] }}
                 transition={{ 
                   repeat: Infinity, 
                   duration: 6,
                   ease: "easeInOut"
                 }}
                 className="w-48 md:w-56 aspect-[3/4] bg-[#FAF9F7] rounded-r-lg shadow-[20px_20px_50px_-10px_rgba(0,0,0,0.5)] border-l-[10px] border-[#1a1c2e] overflow-hidden transform hover:scale-105 transition-transform duration-300 relative z-10"
               >
                  {/* Effet reliure (Ombre portée depuis la gauche) */}
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/20 to-transparent pointer-events-none z-10"></div>
                  
                  {/* Effet épaisseur des pages (Bordure droite et basse) */}
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-[#E3E1DD] border-l border-black/5"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#E3E1DD] border-t border-black/5"></div>

                  {/* Couverture Livre */}
                  <div className="h-full w-full flex flex-col relative p-5 pb-8">
                     {/* Ornements Coins */}
                     <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#C9A24D]/60 rounded-tr-lg"></div>
                     <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#C9A24D]/60 rounded-br-lg"></div>
                     
                     {/* Titre */}
                     <div className="mt-4 text-center space-y-2 relative z-20">
                        <div className="text-[9px] uppercase tracking-[0.2em] text-[#C9A24D] font-bold">Thomas R.</div>
                        <div className="text-2xl font-serif text-[#2C2F4A] font-bold leading-[0.95]">La trajectoire</div>
                        <div className="text-[10px] text-[#2C2F4A]/70 italic leading-tight px-1">
                          "Une vie ne se comprend jamais dans l’ordre où elle se vit."
                        </div>
                        <div className="w-8 h-[2px] bg-[#C9A24D] mx-auto my-3"></div>
                     </div>

                     {/* Contenu visuel abstrait (Cosmic Wheel) */}
                     <div className="flex-1 flex items-center justify-center my-2 opacity-10">
                        <div className="w-24 h-24 rounded-full border border-[#2C2F4A] flex items-center justify-center">
                           <div className="w-16 h-16 border border-[#2C2F4A] rotate-45"></div>
                        </div>
                     </div>

                     {/* Button Extrait (Positionné en bas) */}
                     <div className="mt-auto mb-4 relative z-30 flex justify-center">
                        <button 
                          onClick={(e) => { e.stopPropagation(); setShowExcerpt(true); }}
                          className="bg-[#2C2F4A] text-white text-xs font-bold px-5 py-3 rounded-full shadow-lg flex items-center gap-2 hover:bg-[#C9A24D] hover:text-[#2C2F4A] hover:scale-105 transition-all whitespace-nowrap"
                        >
                          <BookOpen className="w-4 h-4" />
                          Lire un extrait
                        </button>
                     </div>

                     {/* Footer Cover */}
                     <div className="text-center">
                        <div className="text-[8px] text-[#2C2F4A]/50 uppercase tracking-widest">Tome 1 • L'Éveil</div>
                     </div>
                     
                     {/* Texture Papier */}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 mix-blend-multiply pointer-events-none z-0"></div>
                  </div>
               </motion.div>
            </motion.div>

            {/* Texte Explicatif */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="space-y-6 text-center lg:text-left"
            >
               <h2 className="text-3xl md:text-4xl font-serif leading-tight">
                  <span className="text-[#C9A24D]">Regardez</span> votre histoire,<br/>
                  <span className="text-white/60">puis</span> lisez votre destin.
               </h2>
               <p className="text-white/70 text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Votre expérience commence par une <strong>vidéo immersive</strong> où votre avatar vous parle directement. 
                  <br/><br/>
                  Elle se prolonge (si vous le souhaitez) par un <strong>livre unique</strong> et un <strong>dossier d'analyse</strong> complet, retraçant chaque étape de votre vie avec une précision troublante.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <button 
                    onClick={onStart}
                    className="px-8 py-4 bg-[#C9A24D] text-[#2C2F4A] rounded-full font-bold shadow-lg hover:bg-white transition-all flex items-center justify-center gap-2 group"
                  >
                    <Play className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" />
                    Voir votre lecture complète
                  </button>
               </div>
            </motion.div>

         </div>
      </section>

      {/* 🧩 SECTION 5 — CTA FINAL */}
      <section className="py-12 px-6 bg-[#2C2F4A] text-center border-t border-white/10">
        <button 
          onClick={onStart}
          className="w-full md:w-auto px-10 py-5 bg-[#FAF9F7] text-[#2C2F4A] rounded-full font-bold text-xl shadow-lg hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto"
        >
          <Play className="w-5 h-5 fill-current" />
          Votre avatar vous montre vos forces et vos blocages
        </button>

        {/* Trust Badges (Nouveau) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10 text-white/60">
           <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#C9A24D]" />
              <span className="text-xs font-medium">Paiement 100% sécurisé</span>
           </div>
           <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full"></div>
           <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#C9A24D]" />
              <span className="text-xs font-medium">Données confidentielles (RGPD)</span>
           </div>
           <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full"></div>
           <div className="flex items-center gap-2">
              <span className="text-lg">💳</span>
              <span className="text-xs font-medium">Stripe • Visa • Mastercard</span>
           </div>
        </div>
      </section>

      {/* 🧩 FOOTER PREMIUM */}
      <footer className="py-16 px-6 bg-[#1F2235] text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-[#C9A24D]">Votre Légende</h3>
            <p className="text-sm text-white/50 leading-relaxed">
              La première expérience de numérologie narrative qui transforme vos données de naissance en une épopée visuelle et écrite.
            </p>
          </div>

          {/* Col 2: Liens Utiles */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/80 uppercase tracking-wider text-xs">Navigation</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#" className="hover:text-[#C9A24D] transition-colors">Accueil</a></li>
              <li><a href="#" onClick={onStart} className="hover:text-[#C9A24D] transition-colors">Commencer l'expérience</a></li>
              <li><a href="mailto:contact@roman-de-vie.com" className="hover:text-[#C9A24D] transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Col 3: Légal */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/80 uppercase tracking-wider text-xs">Informations Légales</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/legal/mentions" className="hover:text-[#C9A24D] transition-colors">Mentions Légales</a></li>
              <li><a href="/legal/cgu" className="hover:text-[#C9A24D] transition-colors">CGU & Avertissement</a></li>
              <li><a href="/legal/cgv" className="hover:text-[#C9A24D] transition-colors">Conditions Générales de Vente</a></li>
              <li><a href="/legal/privacy" className="hover:text-[#C9A24D] transition-colors">Politique de Confidentialité</a></li>
            </ul>
          </div>

          {/* Col 4: Trust */}
          <div className="space-y-4">
            <h4 className="font-bold text-white/80 uppercase tracking-wider text-xs">Paiement Sécurisé</h4>
            <div className="flex gap-2 opacity-70">
              <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] text-black font-bold">VISA</div>
              <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] text-black font-bold">MC</div>
              <div className="w-10 h-6 bg-white rounded flex items-center justify-center text-[8px] text-black font-bold">AMEX</div>
            </div>
            <p className="text-xs text-white/40">
              Toutes les transactions sont sécurisées et chiffrées par Stripe.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Roman de Vie. Tous droits réservés.
          </p>
          <div className="flex gap-4 text-xs text-white/30">
            <span>Fait avec ✨ à Paris</span>
          </div>
        </div>
      </footer>

      {/* Excerpt Modal */}
      {showExcerpt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowExcerpt(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-[#FDFBF7] w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Book Spine Effect */}
            <div className="absolute left-0 top-0 bottom-0 w-4 md:w-8 bg-gradient-to-r from-[#E3E1DD] to-[#FDFBF7] z-10"></div>
            
            <button 
              onClick={() => setShowExcerpt(false)}
              className="absolute top-4 right-4 text-[#2C2F4A]/40 hover:text-[#2C2F4A] transition-colors z-20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            <div className="p-8 md:p-16 pl-12 md:pl-24 font-serif text-[#2C2F4A] leading-relaxed relative max-h-[80vh] overflow-y-auto custom-scrollbar">
              <div className="text-xs tracking-[0.2em] text-[#C9A24D] uppercase mb-8 text-center font-sans font-bold">Extrait du Chapitre 1</div>
              
              <div className="space-y-6 text-lg md:text-xl">
                <p>
                  <span className="text-5xl float-left mr-3 mt-[-10px] text-[#5B4B8A] font-bold">L</span>
                  ’air de la pièce semblait s’être figé, comme si le temps lui-même attendait une permission pour reprendre sa course. Thomas fixa le reflet dans le miroir, mais ce n'était plus tout à fait le sien. Ce matin-là, les lignes de son visage semblaient dessiner une carte qu'il avait longtemps refusé de lire.
                </p>
                <p>
                  Il se souvint de ce vieux secret qu'il portait depuis l'enfance : cette sensation d'être né sous un ciel qui exigeait trop de lui. Le nombre 14 n'était pas qu'une simple date sur son état civil ; c'était un rythme, une oscillation constante entre le besoin de tout détruire et l'envie de tout construire. Pour d'autres, c'était un mardi ordinaire. Pour lui, c'était le code source de son instabilité chronique et de son génie foudroyant.
                </p>
                <p>
                  Soudain, une lueur dorée traversa la fenêtre, illuminant une vieille boussole posée sur son bureau. Thomas comprit alors ce que les cycles tentaient de lui dire depuis des mois. Il arrivait au bout de la Neuvième Terre. Tout ce qu'il avait bâti ces dernières années s'effritait, non pas par échec, mais pour laisser place à la suite. Les dragons qu'il avait combattus — ce doute persistant sur sa légitimité, cette peur de l'ombre — n'étaient en réalité que des gardiens. Ils ne voulaient pas le dévorer, ils vérifiaient s'il était prêt pour la Grande Transition.
                </p>
              </div>

              <div className="mt-12 text-center">
                <div className="inline-block w-16 h-[1px] bg-[#C9A24D]/50 mb-2"></div>
                <p className="text-xs text-[#2C2F4A]/40 italic">Page 14 • Le Gardien des Seuils</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
