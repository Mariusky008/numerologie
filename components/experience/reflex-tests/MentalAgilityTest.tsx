'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat, Zap, AlertCircle } from 'lucide-react';

interface MentalAgilityTestProps {
  onComplete: (results: {
    switchCost: number; // Extra time taken when rule changes
    accuracy: number;
    agilityScore: number;
  }) => void;
}

export default function MentalAgilityTest({ onComplete }: MentalAgilityTestProps) {
  const [number, setNumber] = useState(0);
  const [rule, setRule] = useState<'parity' | 'magnitude'>('parity');
  const [lastRule, setLastRule] = useState<'parity' | 'magnitude'>('parity');
  const [startTime, setStartTime] = useState(Date.now());
  const [results, setResults] = useState<{ speed: number; isSwitch: boolean; correct: boolean }[]>([]);
  const [timeLeft, setTimeLeft] = useState(40);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const generateChallenge = useCallback(() => {
    const newNumber = Math.floor(Math.random() * 9) + 1; // 1-9
    const newRule = Math.random() > 0.5 ? 'parity' : 'magnitude';
    
    setLastRule(rule);
    setNumber(newNumber);
    setRule(newRule);
    setStartTime(Date.now());
  }, [rule]);

  useEffect(() => {
    generateChallenge();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [generateChallenge]);

  const handleAnswer = (answer: 'left' | 'right') => {
    const reactionTime = Date.now() - startTime;
    let isCorrect = false;

    if (rule === 'parity') {
      // Parity: Left = Even, Right = Odd
      isCorrect = (number % 2 === 0 && answer === 'left') || (number % 2 !== 0 && answer === 'right');
    } else {
      // Magnitude: Left = >5, Right = <=5
      isCorrect = (number > 5 && answer === 'left') || (number <= 5 && answer === 'right');
    }

    setResults(prev => [...prev, {
      speed: reactionTime,
      isSwitch: rule !== lastRule,
      correct: isCorrect
    }]);
    setTotalAttempts(prev => prev + 1);
    generateChallenge();
  };

  const finishTest = () => {
    const switchSpeeds = results.filter(r => r.isSwitch && r.correct).map(r => r.speed);
    const normalSpeeds = results.filter(r => !r.isSwitch && r.correct).map(r => r.speed);
    
    const avgSwitch = switchSpeeds.length ? switchSpeeds.reduce((a, b) => a + b, 0) / switchSpeeds.length : 1000;
    const avgNormal = normalSpeeds.length ? normalSpeeds.reduce((a, b) => a + b, 0) / normalSpeeds.length : 600;
    
    const switchCost = Math.max(0, avgSwitch - avgNormal);
    const accuracy = (results.filter(r => r.correct).length / (results.length || 1)) * 100;
    const agilityScore = Math.max(0, 100 - (switchCost / 10));

    onComplete({ switchCost, accuracy, agilityScore });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-2xl relative">
      <div className="w-full space-y-4">
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#1A1C2E]/40">
          <span className="flex items-center gap-2">
            <Repeat className="w-3 h-3" />
            Test D : Agilité Mentale
          </span>
          <span>{timeLeft}s restants</span>
        </div>
        <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 40) * 100}%` }}
            className="h-full bg-purple-500"
          />
        </div>
      </div>

      <div className="w-full grid grid-rows-2 gap-4 h-80 relative">
        {/* TOP RULE: PARITY */}
        <div className={`flex flex-col items-center justify-center rounded-[40px] border-2 transition-all duration-500 ${rule === 'parity' ? 'bg-purple-500/10 border-purple-500 shadow-lg' : 'bg-white/5 border-transparent opacity-20'}`}>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Règle A : Parité</span>
          <div className="flex gap-8 text-xs font-bold text-purple-600">
            <span>PAIR = GAUCHE</span>
            <span>IMPAIR = DROITE</span>
          </div>
        </div>

        {/* BOTTOM RULE: MAGNITUDE */}
        <div className={`flex flex-col items-center justify-center rounded-[40px] border-2 transition-all duration-500 ${rule === 'magnitude' ? 'bg-purple-500/10 border-purple-500 shadow-lg' : 'bg-white/5 border-transparent opacity-20'}`}>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Règle B : Magnitude</span>
          <div className="flex gap-8 text-xs font-bold text-purple-600">
            <span>{'>'} 5 = GAUCHE</span>
            <span>{'≤'} 5 = DROITE</span>
          </div>
        </div>

        {/* FLOATING NUMBER */}
        <AnimatePresence mode="wait">
          <motion.div
            key={number + rule}
            initial={{ scale: 0, y: rule === 'parity' ? 40 : -40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white rounded-full shadow-2xl flex items-center justify-center text-6xl font-black text-purple-600 border-4 border-purple-100 z-10"
          >
            {number}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-6 w-full">
        <button
          onClick={() => handleAnswer('left')}
          className="flex-1 py-8 bg-[#1A1C2E] text-white rounded-[30px] font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          GAUCHE
        </button>
        <button
          onClick={() => handleAnswer('right')}
          className="flex-1 py-8 bg-[#1A1C2E] text-white rounded-[30px] font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl"
        >
          DROITE
        </button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-[#1A1C2E]/40 font-medium flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          La règle change quand le nombre saute d'une zone à l'autre.
        </p>
      </div>
    </div>
  );
}
