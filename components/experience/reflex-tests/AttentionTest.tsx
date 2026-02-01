'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle, Volume2, VolumeX } from 'lucide-react';

interface AttentionTestProps {
  onComplete: (results: {
    accuracy: number;
    avgSpeed: number;
    degradation: number; // Ratio of error increase under stress
  }) => void;
}

const COLORS = [
  { name: 'Rouge', value: '#EF4444' },
  { name: 'Bleu', value: '#3B82F6' },
  { name: 'Vert', value: '#10B981' },
  { name: 'Jaune', value: '#F59E0B' },
];

export default function AttentionTest({ onComplete }: AttentionTestProps) {
  const [currentChallenge, setCurrentChallenge] = useState({ word: '', color: '' });
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [reactionTimes, setReactionTimes] = useState<number[]>([]);
  const [isStressed, setIsStressed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds test
  const [stressErrors, setStressErrors] = useState(0);
  const [normalErrors, setNormalErrors] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [feedback, setFeedback] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  // Audio refs
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const stressRef = useRef<HTMLAudioElement | null>(null);
  const feedbackIdCounter = useRef(0);

  const addFeedback = (text: string, isError: boolean = false) => {
    const id = feedbackIdCounter.current++;
    setFeedback(prev => [...prev, { id, text, x: Math.random() * 40 - 20, y: Math.random() * 20 - 10 }]);
    setTimeout(() => {
      setFeedback(prev => prev.filter(f => f.id !== id));
    }, 1000);
  };

  const speakColor = useCallback((colorName: string) => {
    if (!audioEnabled || !isStressed) return;
    
    // Pick a DIFFERENT color name to destabilize
    const wrongColors = COLORS.filter(c => c.name !== colorName);
    const randomWrong = wrongColors[Math.floor(Math.random() * wrongColors.length)];
    
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(randomWrong.name);
      utterance.lang = 'fr-FR';
      utterance.rate = 1.2;
      utterance.pitch = 0.8;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis error", e);
    }
  }, [audioEnabled, isStressed]);

  const isProcessing = useRef(false);

  const generateChallenge = useCallback(() => {
    const wordIdx = Math.floor(Math.random() * COLORS.length);
    let colorIdx = Math.floor(Math.random() * COLORS.length);
    
    if (Math.random() > 0.2) {
      while (colorIdx === wordIdx) {
        colorIdx = Math.floor(Math.random() * COLORS.length);
      }
    }

    const challenge = {
      word: COLORS[wordIdx].name,
      color: COLORS[colorIdx].value,
      id: Date.now() // Unique ID for each challenge
    };
    
    setCurrentChallenge(challenge);
    setStartTime(Date.now());
    isProcessing.current = false;
    
    if (isStressed) {
      speakColor(COLORS[colorIdx].name);
    }
  }, [isStressed, speakColor]);

  // Audio effect management
  useEffect(() => {
    if (!audioEnabled) return;

    const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isStressed) {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
    }

    osc.start();

    return () => {
      try {
        osc.stop();
        ctx.close();
      } catch (e) {}
    };
  }, [audioEnabled, isStressed]);

  useEffect(() => {
    generateChallenge();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Initial generate

  // Watch timeLeft for stress trigger
  useEffect(() => {
    if (timeLeft === 23 && !isStressed) {
      setIsStressed(true);
    }
    if (timeLeft === 0) {
      finishTest();
    }
  }, [timeLeft, isStressed]);

  const handleAnswer = (colorValue: string) => {
    if (isProcessing.current || timeLeft === 0) return;
    
    isProcessing.current = true;
    const reactionTime = Date.now() - startTime;
    
    // Explicitly compare current color value
    const isCorrect = colorValue.toLowerCase().trim() === currentChallenge.color.toLowerCase().trim();
    
    setReactionTimes((prev) => [...prev, reactionTime]);
    setTotalAttempts((prev) => prev + 1);

    if (isCorrect) {
      setScore((prev) => prev + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo(prev => Math.max(prev, newCombo));
      addFeedback(reactionTime < 400 ? 'PARFAIT !' : 'BIEN !');
    } else {
      if (isStressed) setStressErrors((prev) => prev + 1);
      else setNormalErrors((prev) => prev + 1);
      setCombo(0);
      addFeedback('ERREUR', true);
    }

    generateChallenge();
  };

  const finishTest = () => {
    const accuracy = (score / totalAttempts) * 100;
    const avgSpeed = reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length;
    
    // Calculate degradation: error rate during stress vs normal
    const normalRate = normalErrors / (totalAttempts / 2 || 1);
    const stressRate = stressErrors / (totalAttempts / 2 || 1);
    const degradation = normalRate > 0 ? (stressRate / normalRate) : stressRate > 0 ? 2 : 1;

    onComplete({ accuracy, avgSpeed, degradation });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-2xl relative py-12">
      {/* COMBO INDICATOR */}
      <AnimatePresence>
        {combo > 1 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-0 left-0 bg-[#C9A24D] text-white px-6 py-2 rounded-2xl font-black text-xl shadow-lg z-20"
          >
            COMBO X{combo}
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING FEEDBACK - PERFECTLY CENTERED */}
      <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
        <AnimatePresence>
          {feedback.map(f => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, scale: 0.5, y: 0, x: "-50%" }}
              animate={{ opacity: 1, scale: 1.5, y: -150, x: "-50%" }}
              exit={{ opacity: 0 }}
              className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black text-4xl tracking-tighter drop-shadow-2xl ${f.text === 'ERREUR' ? 'text-red-500' : 'text-[#C9A24D]'}`}
              style={{ marginLeft: f.x, marginTop: f.y }}
            >
              {f.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* SOUND TOGGLE */}
      <button 
        onClick={() => setAudioEnabled(!audioEnabled)}
        className="absolute top-[-60px] right-0 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all z-50"
      >
        {audioEnabled ? (
          <>
            <Volume2 className="w-3 h-3 text-[#C9A24D]" />
            Son Activé
          </>
        ) : (
          <>
            <VolumeX className="w-3 h-3 text-red-400" />
            Son Désactivé
          </>
        )}
      </button>

      {/* STRESS OVERLAY - LESS LIKE AN ERROR */}
      <AnimatePresence>
        {isStressed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.05, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-[-100px] bg-[#C9A24D] pointer-events-none z-0 rounded-[60px] blur-3xl"
          />
        )}
      </AnimatePresence>

      <div className="w-full space-y-4 relative z-10">
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#1A1C2E]/40">
          <span className="flex items-center gap-2">
            {isStressed && <Zap className="w-3 h-3 text-[#C9A24D] animate-pulse" />}
            Test A : Filtre Attentionnel
          </span>
          <span>{timeLeft}s restants</span>
        </div>
        <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 45) * 100}%` }}
            className={`h-full ${isStressed ? 'bg-[#C9A24D]' : 'bg-[#1A1C2E]'}`}
          />
        </div>
      </div>

      <motion.div 
        key={currentChallenge.word + currentChallenge.color}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl md:text-8xl font-black uppercase tracking-tighter py-20 relative z-10 drop-shadow-sm"
        style={{ color: currentChallenge.color }}
      >
        {currentChallenge.word}
        
        {isStressed && (
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <Zap className="w-32 h-32 text-[#C9A24D]/10" />
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative z-10">
        {COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => handleAnswer(color.value)}
            className="h-24 rounded-[32px] border-4 border-white shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center text-white font-black text-xs uppercase tracking-widest overflow-hidden group relative"
            style={{ backgroundColor: color.value }}
          >
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <div className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-white drop-shadow-md">{color.name}</span>
            </div>
          </button>
        ))}
      </div>

      <p className="text-[#1A1C2E]/40 text-sm font-medium animate-pulse">
        Cliquez sur la COULEUR du mot, pas sur le texte.
      </p>
    </div>
  );
}
