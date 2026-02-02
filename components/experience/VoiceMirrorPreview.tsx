'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Square, Mic, Volume2 } from 'lucide-react';

export default function VoiceMirrorPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const transcript = [
    "Jean,",
    "ce que tes tests montrent,",
    "ce n’est pas un manque de potentiel…",
    "mais une tension entre ta vision",
    "et ton rythme actuel."
  ];

  useEffect(() => {
    if (isPlaying && !isFinished) {
      const timer = setInterval(() => {
        setTextIndex(prev => {
          if (prev >= transcript.length - 1) {
            clearInterval(timer);
            setIsFinished(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1500);
      return () => clearInterval(timer);
    }
  }, [isPlaying, isFinished, transcript.length]);

  const togglePlay = () => {
    if (isFinished) {
      setTextIndex(0);
      setIsFinished(false);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 overflow-hidden bg-[#0D0E14] rounded-[40px] border border-white/10 shadow-2xl">
      <div className="p-8 md:p-12 space-y-10">
        {/* Header/Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/20'}`} />
            <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">
              {isPlaying ? 'Conversation en cours...' : 'Miroir prêt à parler'}
            </span>
          </div>
          <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-[#C9A24D]' : 'text-white/10'}`} />
        </div>

        {/* Central Visualization */}
        <div className="relative h-48 flex items-center justify-center">
          {/* Waveform Animation */}
          <div className="flex items-center gap-1.5 h-24">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                animate={isPlaying ? {
                  height: [
                    Math.random() * 20 + 10,
                    Math.random() * 60 + 20,
                    Math.random() * 20 + 10
                  ]
                } : { height: 4 }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.05,
                  ease: "easeInOut"
                }}
                className={`w-1.5 rounded-full ${isPlaying ? 'bg-[#C9A24D]' : 'bg-white/10'}`}
              />
            ))}
          </div>

          {/* Oracle Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div 
              animate={isPlaying ? { scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-48 h-48 bg-[#C9A24D] rounded-full blur-[80px]"
            />
          </div>
        </div>

        {/* Transcript Display */}
        <div className="min-h-[100px] flex flex-col items-center justify-center text-center space-y-2">
          <AnimatePresence mode="wait">
            {isPlaying && (
              <motion.div
                key={textIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                <p className="text-xl md:text-3xl font-serif italic text-white leading-tight">
                  {transcript.slice(0, textIndex + 1).join(' ')}
                </p>
                {isFinished && (
                  <motion.p 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="text-[#C9A24D] text-xs font-bold uppercase tracking-widest pt-4"
                  >
                    Ceci est un extrait de ce que ton miroir te dira...
                  </motion.p>
                )}
              </motion.div>
            )}
            {!isPlaying && !isFinished && (
              <motion.p 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="text-white/40 text-lg font-light italic"
              >
                "Voici comment ton miroir te parle"
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={togglePlay}
            className={`group relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-white/10 hover:bg-white/20' : 'bg-[#C9A24D] hover:scale-105'}`}
          >
            {isPlaying ? (
              <Square className="w-8 h-8 text-white fill-current" />
            ) : (
              <Play className="w-8 h-8 text-[#1A1C2E] fill-current ml-1" />
            )}
            {!isPlaying && (
              <div className="absolute -inset-4 border border-[#C9A24D]/30 rounded-full animate-ping pointer-events-none" />
            )}
          </button>
          
          <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">
            Cliquez pour écouter un extrait
          </p>
        </div>
      </div>
    </div>
  );
}
