'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, TrendingUp, AlertTriangle } from 'lucide-react';

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

      <div className="h-80 flex items-center justify-center w-full relative">
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`absolute top-0 font-black text-4xl ${isPopped ? 'text-red-500' : 'text-emerald-500'}`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{
            scale: isPopped ? [1, 1.5, 0] : balloonSize,
            rotate: isPopped ? [0, 10, -10, 0] : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`w-32 h-40 rounded-full shadow-2xl relative ${
            isPopped ? 'bg-red-200' : 'bg-gradient-to-br from-blue-400 to-blue-600'
          }`}
        >
          {!isPopped && (
            <div className="absolute top-1/4 left-1/4 w-4 h-8 bg-white/30 rounded-full blur-sm rotate-12" />
          )}
        </motion.div>
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
