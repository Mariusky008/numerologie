import React, { useState, useRef } from 'react';
import { Play, Shield, Smartphone, User, Compass, Eye, FileText, ArrowRight, Volume2, VolumeX, BookOpen } from 'lucide-react';
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
            Votre avatar personnel <br className="hidden md:block" />
            vous explique votre vie en <span className="text-[#C9A24D] italic">5 minutes</span>
          </motion.h1>

          {/* Sous-titre / Description */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-center space-y-4 max-w-2xl"
          >
            <p className="text-lg md:text-xl text-[#2C2F4A] font-medium">
              Recevez votre vidéo personnalisée instantanément.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-sm md:text-base text-[#2C2F4A]/60 font-light">
               <span>Numérologie & Astrologie</span>
               <span className="hidden md:inline w-1 h-1 rounded-full bg-[#C9A24D]"></span>
               <span>Pas une prédiction</span>
               <span className="hidden md:inline w-1 h-1 rounded-full bg-[#C9A24D]"></span>
               <span>Une lecture claire</span>
            </div>
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
                muted // Always start muted for autoplay policy
                autoPlay // Play immediately to show content
                loop 
                playsInline
                className="w-full h-full object-cover object-top opacity-90"
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

          {/* Hook List */}
          <div className="text-left bg-white p-6 rounded-2xl border border-[#EFEDE9] shadow-sm max-w-sm mx-auto space-y-3">
             <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-wider mb-2 text-center">En 5 minutes, il te révèle :</p>
             <ul className="space-y-2 text-sm text-[#2C2F4A]/80">
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> ce que vous portez profondément
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> ce que vous traversez en ce moment
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> les grandes dynamiques de votre vie
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> vos forces et vos défis récurrents
               </li>
             </ul>
             <p className="text-xs text-center pt-2 italic text-[#2C2F4A]/50 border-t border-[#EFEDE9] mt-2">
               Sans jargon. Sans discours flou. Sans promesses irréalistes.
             </p>
          </div>

        </div>
      </section>

      {/* 🧩 SECTION 1.5 — APERÇU PRODUIT (NOUVEAU) */}
      <section className="py-16 px-6 bg-[#2C2F4A] text-white relative overflow-hidden">
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
                     "Je pensais me connaître, mais je n'avais lu que la préface."
                   </h3>
                </div>

                <div className="space-y-4 text-[#2C2F4A]/70 text-lg font-light leading-relaxed">
                   <p>
                     J'étais sceptique au début. Un "livre" sur moi ? Je m'attendais à un horoscope glorifié, un PDF générique rempli de phrases bateau.
                   </p>
                   <p>
                     Mais dès la première page, j'ai été happé. Ce n'est pas juste une analyse froide. <strong className="text-[#5B4B8A] font-medium">L'équipe de "Votre Légende" a tissé une véritable histoire.</strong>
                   </p>
                   <p>
                     Quand j'ai lu le passage sur mon "instabilité chronique" transformée en "génie foudroyant", j'ai eu les larmes aux yeux. J'ai compris que ce que je voyais comme un défaut était en fait ma plus grande arme.
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

      {/* 🧩 SECTION 3 — CE QUE TU REÇOIS */}
      <section className="py-16 px-6 bg-[#FAF9F7]">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#C9A24D]/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#C9A24D] text-white text-[10px] font-bold px-3 py-1 uppercase">Pack Immédiat</div>
          
          <h2 className="text-2xl font-serif text-[#2C2F4A] mb-6 text-center">Ce que vous recevez</h2>
          
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F7] flex items-center justify-center text-[#5B4B8A]">
                <Play className="w-5 h-5" />
              </div>
              <div>
                <span className="font-medium text-[#2C2F4A] block">Une vidéo privée de 5 minutes</span>
                <span className="text-xs text-[#2C2F4A]/50">Livraison immédiate après paiement</span>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F7] flex items-center justify-center text-[#5B4B8A]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-medium text-[#2C2F4A] block">Accessible à vie</span>
                <span className="text-xs text-[#2C2F4A]/50">Données sécurisées & confidentielles</span>
              </div>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F7] flex items-center justify-center text-[#5B4B8A]">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="font-medium text-[#2C2F4A]">Visionnable sur mobile & PC</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FAF9F7] flex items-center justify-center text-[#5B4B8A]">
                <User className="w-5 h-5" />
              </div>
              <div>
                 <span className="font-medium text-[#2C2F4A] block">100 % personnalisée</span>
                 <span className="text-xs text-[#2C2F4A]/50">Garantie de satisfaction</span>
              </div>
            </li>
          </ul>

          <div className="bg-[#FAF9F7] p-4 rounded-lg text-center mb-4 border border-[#C9A24D]/10">
            <div className="text-3xl font-serif text-[#C9A24D] mb-1">29€</div>
            <p className="text-sm font-bold text-[#2C2F4A]">Paiement unique. Aucun abonnement.</p>
            <div className="flex justify-center gap-2 mt-2 opacity-50">
               <span className="text-[10px] border border-[#2C2F4A] px-1 rounded">🔒 Paiement Sécurisé</span>
               <span className="text-[10px] border border-[#2C2F4A] px-1 rounded">🛡 Données Privées</span>
            </div>
          </div>
          
          {/* Mini Comment ça marche */}
          <div className="mt-6 pt-6 border-t border-[#EFEDE9]">
             <p className="text-xs text-[#8FA6A0] uppercase tracking-widest text-center mb-4">Comment ça marche</p>
             <div className="flex justify-between items-center text-xs text-[#2C2F4A]/70 px-2">
               <div className="flex flex-col items-center gap-1">
                 <span className="w-6 h-6 rounded-full bg-[#FAF9F7] flex items-center justify-center font-bold text-[#5B4B8A]">1</span>
                 <span>Date</span>
               </div>
               <div className="h-px w-8 bg-[#EFEDE9]"></div>
               <div className="flex flex-col items-center gap-1">
                 <span className="w-6 h-6 rounded-full bg-[#FAF9F7] flex items-center justify-center font-bold text-[#5B4B8A]">2</span>
                 <span>Vidéo</span>
               </div>
               <div className="h-px w-8 bg-[#EFEDE9]"></div>
               <div className="flex flex-col items-center gap-1">
                 <span className="w-6 h-6 rounded-full bg-[#FAF9F7] flex items-center justify-center font-bold text-[#5B4B8A]">3</span>
                 <span>Analyse</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 🧩 SECTION UPSELL TEASE */}
      <section className="py-12 px-6 max-w-2xl mx-auto text-center border-t border-[#EFEDE9]">
        <h3 className="text-lg font-serif text-[#8FA6A0] mb-6 italic">Et si vous voulez aller plus loin…</h3>
        <p className="text-sm text-[#2C2F4A]/70 mb-6">
          Après la vidéo, vous pourrez, si vous le souhaitez :
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-[#2C2F4A]/80 mb-8">
          <div className="flex items-center gap-2 justify-center bg-white px-4 py-2 rounded-full border border-[#EFEDE9]">
            <FileText className="w-4 h-4 text-[#C9A24D]" />
            <span>Télécharger votre analyse détaillée</span>
          </div>
          <div className="flex items-center gap-2 justify-center bg-white px-4 py-2 rounded-full border border-[#EFEDE9]">
            <Compass className="w-4 h-4 text-[#C9A24D]" />
            <span>Transformer votre thème en livre narratif</span>
          </div>
        </div>
        <p className="text-xs text-[#2C2F4A]/40 italic">
          Ces options sont proposées après, jamais obligatoires.
        </p>
      </section>

      {/* 🧩 SECTION 5 — CTA FINAL */}
      <section className="py-12 px-6 bg-[#2C2F4A] text-center">
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

      {/* 🧩 SECTION 6 — AVERTISSEMENT LÉGAL */}
      <footer className="py-8 px-6 bg-[#FAF9F7] text-center">
        {/* Navigation Footer */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-[#2C2F4A]/60 mb-8 font-medium">
          <a href="/cgv" className="hover:text-[#5B4B8A] transition-colors">CGV</a>
          <span className="text-[#EFEDE9]">•</span>
          <a href="/cgu" className="hover:text-[#5B4B8A] transition-colors">CGU</a>
          <span className="text-[#EFEDE9]">•</span>
          <a href="/mentions-legales" className="hover:text-[#5B4B8A] transition-colors">Mentions Légales</a>
          <span className="text-[#EFEDE9]">•</span>
          <a href="/confidentialite" className="hover:text-[#5B4B8A] transition-colors">Politique de Confidentialité</a>
          <span className="text-[#EFEDE9]">•</span>
          <a href="mailto:contact@roman-de-vie.com" className="hover:text-[#5B4B8A] transition-colors">Contact</a>
        </div>

        <div className="max-w-2xl mx-auto p-4 bg-[#EFEDE9]/30 rounded-xl">
          <p className="text-[10px] md:text-xs text-[#2C2F4A]/50 leading-relaxed">
            <strong className="block mb-1 text-[#2C2F4A]/70">⚠️ Information importante</strong>
            Ce service s’inscrit dans une démarche de développement personnel et de narration symbolique. 
            Il ne constitue ni une science exacte, ni un conseil médical, juridique ou financier. 
            Tu restes pleinement responsable de tes décisions.
          </p>
        </div>
        <p className="text-[10px] text-[#2C2F4A]/30 mt-6">
          © {new Date().getFullYear()} Roman de Vie
        </p>
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
