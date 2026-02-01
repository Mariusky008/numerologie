'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Volume2, ShieldCheck, Zap } from 'lucide-react';

interface PersonalizedAnalysisAvatarProps {
  firstName: string;
  results?: any;
}

export default function PersonalizedAnalysisAvatar({ firstName, results }: PersonalizedAnalysisAvatarProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState(0); // 0: Idle, 1: Hook, 2: Revelation, 3: Cut/CTA
  const [isFinished, setIsFinished] = useState(false);
  
  // Script divided into phases for the 3-step structure
  const script = useMemo(() => {
    // Variations based on a simple rotation or results if provided
    const hooks = [
      `à travers tes réponses, on voit que tu avances souvent plus vite que ce que tu ressens vraiment.`,
      `tu te décris comme adaptable, mais sous pression, ton fonctionnement change nettement.`,
      `on observe un écart intéressant entre ta manière de décider et ce que ton potentiel de départ suggère.`
    ];
    
    // Use firstName length or something stable to pick a hook if no specific results
    const hookIdx = firstName.length % hooks.length;
    const selectedHook = hooks[hookIdx];

    return [
      {
        id: 1,
        text: `${firstName}, ${selectedHook}`,
        duration: 4500,
      },
      {
        id: 2,
        text: "Ce n’est pas un défaut. C’est une adaptation que tu as construite pour avancer.",
        duration: 3500,
      },
      {
        id: 3,
        text: "Le problème, c’est que cette adaptation n’est plus alignée avec ton potentiel de départ...",
        duration: 3500,
      },
      {
        id: 4,
        text: "Et c’est exactement là que tout se joue.",
        duration: 2500,
      }
    ];
  }, [firstName]);

  const totalDuration = script.reduce((acc, s) => acc + s.duration, 0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let phaseTimer: NodeJS.Timeout;

    if (isPlaying && !isFinished) {
      let currentIdx = 0;
      
      const runPhase = () => {
        if (currentIdx < script.length) {
          setPhase(currentIdx + 1);
          phaseTimer = setTimeout(() => {
            currentIdx++;
            runPhase();
          }, script[currentIdx].duration);
        } else {
          setIsFinished(true);
          setIsPlaying(false);
          setPhase(0);
        }
      };

      runPhase();
    }

    return () => {
      if (phaseTimer) clearTimeout(phaseTimer);
    };
  }, [isPlaying, isFinished, script]);

  const togglePlay = () => {
    if (isFinished) {
      setPhase(0);
      setIsFinished(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 overflow-hidden bg-[#0D0E14] rounded-[60px] border border-white/10 shadow-2xl relative">
      {/* Background Subtle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#C9A24D]/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="p-10 md:p-16 space-y-12 relative z-10">
        {/* Header Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">
              {isPlaying ? 'Analyse en temps réel...' : 'Miroir prêt pour la synthèse'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck className="w-4 h-4 text-white/20" />
            <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#C9A24D]' : 'text-white/10'}`} />
          </div>
        </div>

        {/* Central Avatar & Visualization */}
        <div className="relative h-64 flex flex-col items-center justify-center">
          {/* SOBER AVATAR */}
          <div className="relative w-32 h-32 mb-8">
            {/* Outer Glow */}
            <motion.div 
              animate={isPlaying ? { 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.2, 0.1]
              } : { opacity: 0.05 }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-[-40px] bg-[#C9A24D] rounded-full blur-3xl"
            />
            
            {/* The Silhouette */}
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 opacity-80">
              <defs>
                <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C9A24D" />
                  <stop offset="100%" stopColor="#8B6E31" />
                </linearGradient>
              </defs>
              {/* Head Silhouette */}
              <path 
                d="M50 15 C65 15 75 25 75 45 C75 65 65 75 50 75 C35 75 25 65 25 45 C25 25 35 15 50 15 Z" 
                fill="#1A1C2E" 
                stroke="#C9A24D" 
                strokeWidth="0.5"
              />
              {/* Shoulders */}
              <path 
                d="M15 95 C15 80 30 75 50 75 C70 75 85 80 85 95" 
                fill="none" 
                stroke="#C9A24D" 
                strokeWidth="0.5" 
                strokeLinecap="round"
              />
              {/* The "Fixed Regard" - Two calm points that pulse slowly */}
              <motion.g
                animate={isPlaying ? { 
                  opacity: [0.6, 1, 0.6],
                } : { opacity: 0.3 }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <circle cx="42" cy="42" r="1" fill="#C9A24D" />
                <circle cx="58" cy="42" r="1" fill="#C9A24D" />
              </motion.g>
            </svg>
          </div>

          {/* DYNAMIC WAVEFORM - Circular / Sine mix */}
          <div className="flex items-center gap-1.5 h-16">
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? {
                  height: [
                    Math.random() * 10 + 5,
                    Math.random() * 45 + 10,
                    Math.random() * 10 + 5
                  ],
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: ['#C9A24D', '#E5C17B', '#C9A24D']
                } : { height: 3, opacity: 0.05, backgroundColor: '#ffffff' }}
                transition={{
                  duration: 0.5 + Math.random() * 0.3,
                  repeat: Infinity,
                  delay: i * 0.015,
                  ease: "easeInOut"
                }}
                className="w-1 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* Subtitles (Mandatory) */}
        <div className="min-h-[140px] flex flex-col items-center justify-center text-center px-4 relative">
          <AnimatePresence mode="wait">
            {isPlaying && phase > 0 && (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                className="max-w-2xl"
              >
                <p className="text-2xl md:text-3xl font-serif italic text-white leading-tight tracking-tight drop-shadow-sm">
                  {script[phase - 1].text}
                </p>
              </motion.div>
            )}
            {!isPlaying && !isFinished && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="space-y-6"
              >
                <p className="text-white/60 text-xl font-light italic">
                  Écoutez la synthèse de votre diagnostic personnel
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-[1px] w-8 bg-white/10" />
                  <div className="flex items-center gap-2 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.4em]">
                    <Zap className="w-3 h-3" />
                    Audio Haute Fidélité
                  </div>
                  <div className="h-[1px] w-8 bg-white/10" />
                </div>
              </motion.div>
            )}
            {isFinished && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="space-y-6"
              >
                <p className="text-[#C9A24D] text-2xl md:text-3xl font-serif font-bold italic leading-tight">
                  « La suite de cette lecture change souvent la manière dont une personne se voit. »
                </p>
                <div className="flex flex-col items-center gap-2">
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">
                    Diagnostic Interrompu • Accès Intégral Requis
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6 pb-4">
          <button
            onClick={togglePlay}
            className={`group relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${isPlaying ? 'bg-white/5 hover:bg-white/10 border border-white/10' : 'bg-[#C9A24D] hover:scale-110 shadow-[0_0_50px_rgba(201,162,77,0.3)]'}`}
          >
            {isPlaying ? (
              <Square className="w-8 h-8 text-white fill-current" />
            ) : (
              <Play className="w-8 h-8 text-[#1A1C2E] fill-current ml-1" />
            )}
            {!isPlaying && !isFinished && (
              <motion.div 
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 border-2 border-[#C9A24D] rounded-full pointer-events-none" 
              />
            )}
          </button>
          
          <div className="flex flex-col items-center gap-2">
            <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">
              {isFinished ? 'Réécouter la synthèse' : 'Démarrer la synthèse vocale'}
            </p>
            {isPlaying && (
              <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: totalDuration / 1000, ease: "linear" }}
                  className="h-full bg-[#C9A24D]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
