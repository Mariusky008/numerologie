import React, { useState, useRef } from 'react';
import { Play, Shield, Smartphone, User, Compass, Eye, FileText, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPageHero({ onStart }: LandingPageProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
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
               Basée sur ta date de naissance
             </span>
          </motion.div>

          {/* Titre Principal */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-[#2C2F4A] leading-[1.1] text-center mb-6"
          >
            Ton avatar personnel <br className="hidden md:block" />
            t’explique ta vie en <span className="text-[#C9A24D] italic">5 minutes</span>
          </motion.h1>

          {/* Sous-titre / Description */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-center space-y-4 max-w-2xl"
          >
            <p className="text-lg md:text-xl text-[#2C2F4A] font-medium">
              Reçois ta vidéo personnalisée instantanément.
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
                muted={false} // Initially handled by code
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
               <p className="text-xs text-[#2C2F4A]/40 font-medium">Tu n’as rien à deviner. Tu as juste à regarder.</p>
            </div>
          </motion.div>

          {/* Hook List */}
          <div className="text-left bg-white p-6 rounded-2xl border border-[#EFEDE9] shadow-sm max-w-sm mx-auto space-y-3">
             <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-wider mb-2 text-center">En 5 minutes, il te révèle :</p>
             <ul className="space-y-2 text-sm text-[#2C2F4A]/80">
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> ce que tu portes profondément
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> ce que tu traverses en ce moment
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> les grandes dynamiques de ta vie
               </li>
               <li className="flex items-start gap-2">
                 <span className="text-[#C9A24D]">✓</span> tes forces et tes défis récurrents
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
               className="relative"
            >
               {/* Container Principal : Vidéo Avatar */}
               <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 group">
                  <video 
                     src="/Ton Parcours de Vie.mp4" 
                     muted 
                     loop 
                     autoPlay
                     playsInline
                     className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  {/* Overlay Dégradé */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C2F4A] via-transparent to-transparent opacity-90"></div>
                  
                  {/* Badge "En direct" */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                     <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Analyse en cours</span>
                  </div>

                  {/* Livre Flottant (Superposé) */}
                  <motion.div 
                    initial={{ y: 20, rotate: -5 }}
                    animate={{ y: 0, rotate: 0 }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      duration: 4,
                      ease: "easeInOut"
                    }}
                    className="absolute -bottom-6 -right-6 w-32 md:w-48 aspect-[2/3] bg-white rounded-r-lg shadow-2xl border-l-4 border-[#C9A24D] overflow-hidden transform rotate-3 hover:scale-105 transition-transform duration-300"
                  >
                     <div className="h-full w-full bg-[#FAF9F7] p-3 flex flex-col relative">
                        {/* Fake Content Lines */}
                        <div className="w-full h-2 bg-[#EFEDE9] mb-4 mt-2"></div>
                        <div className="space-y-2">
                           <div className="w-full h-1 bg-[#2C2F4A]/10"></div>
                           <div className="w-5/6 h-1 bg-[#2C2F4A]/10"></div>
                           <div className="w-4/6 h-1 bg-[#2C2F4A]/10"></div>
                           <div className="w-full h-1 bg-[#2C2F4A]/10"></div>
                        </div>
                        {/* Chapter Title */}
                        <div className="mt-6 text-center">
                           <div className="text-[8px] uppercase tracking-widest text-[#C9A24D] font-bold">Chapitre 1</div>
                           <div className="text-[10px] font-serif text-[#2C2F4A] font-bold">L'Appel de l'Aventure</div>
                        </div>
                        {/* Page Corner Effect */}
                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-gradient-to-tl from-black/10 to-transparent"></div>
                     </div>
                  </motion.div>
               </div>
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
                  <div className="flex items-center gap-3 px-6 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm text-white/80">
                     <FileText className="w-4 h-4 text-[#C9A24D]" />
                     <span>Aperçu immédiat</span>
                  </div>
               </div>
            </motion.div>

         </div>
      </section>

      {/* 🧩 SECTION 2 — POURQUOI C’EST DIFFÉRENT */}
      <section className="py-16 px-6 bg-white border-y border-[#EFEDE9]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif text-[#2C2F4A] text-center mb-10">Pourquoi c’est différent</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Bloc 1 */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-[#FAF9F7] rounded-full flex items-center justify-center mx-auto text-3xl">🎥</div>
              <h3 className="font-bold text-[#2C2F4A]">Tu regardes au lieu de lire</h3>
              <p className="text-sm text-[#2C2F4A]/70 leading-relaxed">
                Une vidéo courte, personnelle, accessible immédiatement.
              </p>
            </div>

            {/* Bloc 2 */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-[#FAF9F7] rounded-full flex items-center justify-center mx-auto text-3xl">🧭</div>
              <h3 className="font-bold text-[#2C2F4A]">Une structure, pas du hasard</h3>
              <p className="text-sm text-[#2C2F4A]/70 leading-relaxed">
                Tes nombres servent de trame à ton histoire et donnent une cohérence à ce que tu vis.
              </p>
            </div>

            {/* Bloc 3 */}
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-[#FAF9F7] rounded-full flex items-center justify-center mx-auto text-3xl">🐉</div>
              <h3 className="font-bold text-[#2C2F4A]">Tes défis deviennent lisibles</h3>
              <p className="text-sm text-[#2C2F4A]/70 leading-relaxed">
                Découvre tes 3 forces principales et comment les utiliser chaque jour.
              </p>
            </div>
          </div>

          {/* Témoignages (Preuve Sociale) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[#EFEDE9]">
            <div className="p-4 bg-[#FAF9F7] rounded-xl italic text-sm text-[#2C2F4A]/80 relative">
               <span className="absolute top-2 left-2 text-2xl text-[#C9A24D] opacity-30">"</span>
               "Je ne lis jamais ça, mais cette vidéo m’a aidé à comprendre mes choix."
               <div className="mt-2 text-xs font-bold text-[#5B4B8A] not-italic">— Thomas</div>
            </div>
            <div className="p-4 bg-[#FAF9F7] rounded-xl italic text-sm text-[#2C2F4A]/80 relative">
               <span className="absolute top-2 left-2 text-2xl text-[#C9A24D] opacity-30">"</span>
               "C'est fou comme 5 minutes peuvent être plus claires que des heures de recherche."
               <div className="mt-2 text-xs font-bold text-[#5B4B8A] not-italic">— Sarah</div>
            </div>
            <div className="p-4 bg-[#FAF9F7] rounded-xl italic text-sm text-[#2C2F4A]/80 relative">
               <span className="absolute top-2 left-2 text-2xl text-[#C9A24D] opacity-30">"</span>
               "J'ai enfin mis des mots sur ce que je ressentais depuis toujours."
               <div className="mt-2 text-xs font-bold text-[#5B4B8A] not-italic">— Julien</div>
            </div>
          </div>

        </div>
      </section>

      {/* 🧩 SECTION 3 — CE QUE TU REÇOIS */}
      <section className="py-16 px-6 bg-[#FAF9F7]">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-[#C9A24D]/20 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#C9A24D] text-white text-[10px] font-bold px-3 py-1 uppercase">Pack Immédiat</div>
          
          <h2 className="text-2xl font-serif text-[#2C2F4A] mb-6 text-center">Ce que tu reçois</h2>
          
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
        <h3 className="text-lg font-serif text-[#8FA6A0] mb-6 italic">Et si tu veux aller plus loin…</h3>
        <p className="text-sm text-[#2C2F4A]/70 mb-6">
          Après la vidéo, tu pourras, si tu le souhaites :
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-[#2C2F4A]/80 mb-8">
          <div className="flex items-center gap-2 justify-center bg-white px-4 py-2 rounded-full border border-[#EFEDE9]">
            <FileText className="w-4 h-4 text-[#C9A24D]" />
            <span>Télécharger ton analyse détaillée</span>
          </div>
          <div className="flex items-center gap-2 justify-center bg-white px-4 py-2 rounded-full border border-[#EFEDE9]">
            <Compass className="w-4 h-4 text-[#C9A24D]" />
            <span>Transformer ton thème en livre narratif</span>
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

    </div>
  );
}
