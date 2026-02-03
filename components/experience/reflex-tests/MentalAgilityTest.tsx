'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Repeat, Zap, AlertCircle, Brain, Layers } from 'lucide-react';

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
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const isProcessing = useRef(false);

  const generateChallenge = useCallback(() => {
    const newNumber = Math.floor(Math.random() * 9) + 1; // 1-9
    const newRule = Math.random() > 0.5 ? 'parity' : 'magnitude';
    
    // Crucial: Update everything together to avoid sync issues
    setLastRule(rule);
    setRule(newRule);
    setNumber(newNumber);
    setStartTime(Date.now());
    isProcessing.current = false;
  }, [rule]); // rule dependency added to correctly update lastRule

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
  }, [generateChallenge]);

  useEffect(() => {
    if (timeLeft === 0) {
      finishTest();
    }
  }, [timeLeft]);

  const handleAnswer = (answer: 'left' | 'right') => {
    if (isProcessing.current || timeLeft === 0) return;
    
    isProcessing.current = true;
    const reactionTime = Date.now() - startTime;
    let isCorrect = false;

    if (rule === 'parity') {
      // Parity: Left = Even, Right = Odd
      isCorrect = (number % 2 === 0 && answer === 'left') || (number % 2 !== 0 && answer === 'right');
    } else {
      // Magnitude: Left = >5, Right = <=5
      isCorrect = (number > 5 && answer === 'left') || (number <= 5 && answer === 'right');
    }

    setFeedback(isCorrect ? 'correct' : 'wrong');
    setTimeout(() => setFeedback(null), 400);

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

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 h-auto relative">
        {/* RULE A: PARITY */}
        <div className={`relative p-8 rounded-[40px] border-4 transition-all duration-500 overflow-hidden ${rule === 'parity' ? 'bg-[#5B4B8A]/10 border-[#5B4B8A] shadow-[0_0_40px_rgba(91,75,138,0.2)]' : 'bg-white/5 border-transparent opacity-20'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-5 h-5 text-[#5B4B8A]" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#5B4B8A]">Module : Parité</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl text-center shadow-sm">
              <p className="text-[10px] uppercase opacity-40 mb-1">PAIR</p>
              <p className="font-black text-[#5B4B8A]">GAUCHE</p>
            </div>
            <div className="bg-white p-4 rounded-2xl text-center shadow-sm">
              <p className="text-[10px] uppercase opacity-40 mb-1">IMPAIR</p>
              <p className="font-black text-[#5B4B8A]">DROITE</p>
            </div>
          </div>
          {rule === 'parity' && (
            <motion.div 
              layoutId="activeRule"
              className="absolute inset-0 bg-gradient-to-br from-white/0 to-[#5B4B8A]/5 pointer-events-none"
            />
          )}
        </div>

        {/* RULE B: MAGNITUDE */}
        <div className={`relative p-8 rounded-[40px] border-4 transition-all duration-500 overflow-hidden ${rule === 'magnitude' ? 'bg-[#C9A24D]/10 border-[#C9A24D] shadow-[0_0_40px_rgba(201,162,77,0.2)]' : 'bg-white/5 border-transparent opacity-20'}`}>
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-5 h-5 text-[#C9A24D]" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#C9A24D]">Module : Magnitude</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl text-center shadow-sm">
              <p className="text-[10px] uppercase opacity-40 mb-1">{'>'} 5</p>
              <p className="font-black text-[#C9A24D]">GAUCHE</p>
            </div>
            <div className="bg-white p-4 rounded-2xl text-center shadow-sm">
              <p className="text-[10px] uppercase opacity-40 mb-1">{'≤'} 5</p>
              <p className="font-black text-[#C9A24D]">DROITE</p>
            </div>
          </div>
          {rule === 'magnitude' && (
            <motion.div 
              layoutId="activeRule"
              className="absolute inset-0 bg-gradient-to-br from-white/0 to-[#C9A24D]/5 pointer-events-none"
            />
          )}
        </div>

        {/* FLOATING NUMBER CONTAINER */}
        <div className="md:col-span-2 flex justify-center py-12 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={number + rule}
              initial={{ scale: 0, rotate: -180, filter: 'blur(20px)' }}
              animate={{ 
                scale: 1, 
                rotate: 0, 
                filter: 'blur(0px)',
                backgroundColor: feedback === 'correct' ? '#dcfce7' : feedback === 'wrong' ? '#fee2e2' : '#ffffff'
              }}
              exit={{ scale: 1.5, opacity: 0, filter: 'blur(40px)' }}
              className={`w-40 h-40 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.1)] flex items-center justify-center text-7xl font-black border-8 transition-colors duration-200 ${rule === 'parity' ? 'text-[#5B4B8A] border-[#5B4B8A]/10' : 'text-[#C9A24D] border-[#C9A24D]/10'}`}
            >
              {number}
              
              {/* FEEDBACK INDICATOR */}
              {feedback && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${feedback === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {feedback === 'correct' ? <Zap className="w-6 h-6 text-white fill-current" /> : <AlertCircle className="w-6 h-6 text-white" />}
                </motion.div>
              )}

              {/* SCANLINE EFFECT */}
              <motion.div 
                animate={{ y: [-80, 80] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className={`absolute inset-x-0 h-1 blur-md ${rule === 'parity' ? 'bg-[#5B4B8A]/30' : 'bg-[#C9A24D]/30'}`}
              />
            </motion.div>
          </AnimatePresence>
        </div>
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
