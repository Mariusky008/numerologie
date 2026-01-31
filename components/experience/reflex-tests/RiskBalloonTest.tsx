'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, AlertTriangle, Brain, Sparkles, Bomb } from 'lucide-react';

interface RiskBalloonTestProps {
  onComplete: (results: {
    avgPumps: number; // Average pumps per balloon
    pops: number; // Number of balloons popped
    riskScore: number; // Calculated risk appetite
  }) => void;
}

export default function RiskBalloonTest({ onComplete }: RiskBalloonTestProps) {
  const [balloonSize, setBalloonSize] = useState(1);
  const [pumps, setPumps] = useState(0);
  const [balloonsPlayed, setBalloonsPlayed] = useState(0);
  const [totalPumps, setTotalPumps] = useState(0);
  const [pops, setPops] = useState(0);
  const [isPopped, setIsPopped] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const MAX_BALLOONS = 10;

  const handlePump = () => {
    if (isPopped) return;

    const popProbability = (pumps + 1) / 32; // Probability increases with pumps
    if (Math.random() < popProbability) {
      setIsPopped(true);
      setPops(prev => prev + 1);
      setMessage("EXPLOSÉ !");
      setTimeout(nextBalloon, 1000);
    } else {
      setPumps(prev => prev + 1);
      setBalloonSize(prev => prev + 0.1);
    }
  };

  const handleCollect = () => {
    if (isPopped || pumps === 0) return;
    setTotalPumps(prev => prev + pumps);
    setMessage(`+${pumps} points !`);
    setTimeout(nextBalloon, 1000);
  };

  const nextBalloon = () => {
    if (balloonsPlayed + 1 >= MAX_BALLOONS) {
      const avgPumps = totalPumps / (MAX_BALLOONS - pops || 1);
      const riskScore = (totalPumps / (MAX_BALLOONS * 15)) * 100;
      onComplete({ avgPumps, pops, riskScore });
      return;
    }
    setBalloonsPlayed(prev => prev + 1);
    setBalloonSize(1);
    setPumps(0);
    setIsPopped(false);
    setMessage(null);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-2xl">
      <div className="w-full space-y-4">
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#1A1C2E]/40">
          <span className="flex items-center gap-2">
            <TrendingUp className="w-3 h-3" />
            Test C : Ballon de Risque
          </span>
          <span>Ballon {balloonsPlayed + 1} / {MAX_BALLOONS}</span>
        </div>
        <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((balloonsPlayed + 1) / MAX_BALLOONS) * 100}%` }}
            className="h-full bg-blue-500"
          />
        </div>
      </div>

      <div className="h-96 flex items-center justify-center w-full relative">
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: -140, scale: 1.2 }}
              exit={{ opacity: 0, scale: 2 }}
              className={`absolute z-20 font-black text-5xl tracking-tighter ${isPopped ? 'text-red-500' : 'text-[#C9A24D]'}`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative flex items-center justify-center">
          {/* ENERGY FIELD */}
          {!isPopped && (
            <motion.div
              animate={{
                scale: [balloonSize * 0.9, balloonSize * 1.1, balloonSize * 0.9],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute w-64 h-64 bg-blue-400 rounded-full blur-3xl pointer-events-none"
            />
          )}

          <motion.div
            animate={{
              scale: isPopped ? [1, 2, 0] : balloonSize,
              rotate: isPopped ? [0, 15, -15, 0] : 0,
              filter: isPopped ? 'contrast(200%) brightness(200%)' : 'none',
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className={`w-40 h-40 rounded-[60px] shadow-2xl relative flex items-center justify-center overflow-hidden ${
              isPopped ? 'bg-red-500' : 'bg-gradient-to-br from-[#1A1C2E] to-[#5B4B8A]'
            }`}
          >
            {/* BRAIN CORE */}
            {!isPopped ? (
              <div className="relative flex flex-col items-center gap-2">
                <Brain className="w-12 h-12 text-white animate-pulse" />
                <div className="flex items-center gap-1 text-white/50 text-[10px] font-black uppercase">
                  <Sparkles className="w-3 h-3" />
                  Potentiel
                </div>
              </div>
            ) : (
              <Bomb className="w-20 h-20 text-white animate-bounce" />
            )}

            {/* GLOSS EFFECT */}
            {!isPopped && (
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
            )}
          </motion.div>
        </div>
      </div>

      <div className="flex gap-6 w-full max-w-sm">
        <button
          onClick={handlePump}
          disabled={isPopped}
          className="flex-1 py-6 bg-[#1A1C2E] text-white rounded-[30px] font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
        >
          Gonfler
        </button>
        <button
          onClick={handleCollect}
          disabled={isPopped || pumps === 0}
          className="flex-1 py-6 bg-emerald-500 text-white rounded-[30px] font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl disabled:opacity-50"
        >
          Récupérer
        </button>
      </div>

      <div className="text-center space-y-2">
        <p className="text-sm text-[#1A1C2E]/40 font-medium flex items-center justify-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Plus vous gonflez, plus vous gagnez. S'il éclate, vous perdez tout.
        </p>
      </div>
    </div>
  );
}
