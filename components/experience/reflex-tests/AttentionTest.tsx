'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, AlertTriangle } from 'lucide-react';

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

  const generateChallenge = useCallback(() => {
    const wordIdx = Math.floor(Math.random() * COLORS.length);
    let colorIdx = Math.floor(Math.random() * COLORS.length);
    
    // Ensure word and color are different most of the time (Stroop effect)
    if (Math.random() > 0.2) {
      while (colorIdx === wordIdx) {
        colorIdx = Math.floor(Math.random() * COLORS.length);
      }
    }

    setCurrentChallenge({
      word: COLORS[wordIdx].name,
      color: COLORS[colorIdx].value,
    });
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    generateChallenge();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        if (prev <= 22 && !isStressed) {
          setIsStressed(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [generateChallenge, isStressed]);

  const handleAnswer = (colorValue: string) => {
    const reactionTime = Date.now() - startTime;
    setReactionTimes((prev) => [...prev, reactionTime]);
    setTotalAttempts((prev) => prev + 1);

    if (colorValue === currentChallenge.color) {
      setScore((prev) => prev + 1);
    } else {
      if (isStressed) setStressErrors((prev) => prev + 1);
      else setNormalErrors((prev) => prev + 1);
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
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-2xl relative">
      {/* STRESS OVERLAY */}
      <AnimatePresence>
        {isStressed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-[-100px] bg-red-500 pointer-events-none z-0 rounded-[60px] blur-3xl"
          />
        )}
      </AnimatePresence>

      <div className="w-full space-y-4 relative z-10">
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#1A1C2E]/40">
          <span className="flex items-center gap-2">
            {isStressed && <Zap className="w-3 h-3 text-red-500 animate-pulse" />}
            Test A : Filtre Attentionnel
          </span>
          <span>{timeLeft}s restants</span>
        </div>
        <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 45) * 100}%` }}
            className={`h-full ${isStressed ? 'bg-red-500' : 'bg-[#1A1C2E]'}`}
          />
        </div>
      </div>

      <motion.div 
        key={currentChallenge.word + currentChallenge.color}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-6xl md:text-8xl font-black uppercase tracking-tighter py-20 relative z-10"
        style={{ color: currentChallenge.color }}
      >
        {currentChallenge.word}
        
        {isStressed && (
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 0.3, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <AlertTriangle className="w-32 h-32 text-red-500/20" />
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full relative z-10">
        {COLORS.map((color) => (
          <button
            key={color.value}
            onClick={() => handleAnswer(color.value)}
            className="h-20 rounded-3xl border-2 border-[#1A1C2E]/5 hover:scale-105 active:scale-95 transition-all shadow-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: color.value }}
          >
            Cliquez
          </button>
        ))}
      </div>

      <p className="text-[#1A1C2E]/40 text-sm font-medium animate-pulse">
        Cliquez sur la COULEUR du mot, pas sur le texte.
      </p>
    </div>
  );
}
