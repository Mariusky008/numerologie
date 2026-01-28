'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, AlertCircle } from 'lucide-react';

interface BreakingPointTestProps {
  onComplete: (results: {
    inhibitionError: number; // Percentage of clicks on triangles
    omissionRate: number; // Percentage of missed circles
    peakSpeed: number; // Final speed reached
  }) => void;
}

type Shape = 'circle' | 'triangle';

export default function BreakingPointTest({ onComplete }: BreakingPointTestProps) {
  const [currentShape, setCurrentShape] = useState<Shape | null>(null);
  const [speed, setSpeed] = useState(1200); // Start with 1.2s
  const [timeLeft, setTimeLeft] = useState(40); // 40 seconds test
  const [stats, setStats] = useState({
    circlesShown: 0,
    circlesClicked: 0,
    trianglesShown: 0,
    trianglesClicked: 0,
  });
  
  const statsRef = useRef(stats);
  statsRef.current = stats;
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const spawnShape = useCallback(() => {
    const isCircle = Math.random() > 0.3; // 70% circles
    const shape: Shape = isCircle ? 'circle' : 'triangle';
    
    setCurrentShape(shape);
    setStats(prev => ({
      ...prev,
      [isCircle ? 'circlesShown' : 'trianglesShown']: prev[isCircle ? 'circlesShown' : 'trianglesShown'] + 1
    }));

    // Speed up
    setSpeed(prev => Math.max(400, prev * 0.96));

    // Clear shape after duration
    setTimeout(() => {
      setCurrentShape(null);
    }, speed * 0.8);

  }, [speed]);

  useEffect(() => {
    const mainInterval = setInterval(() => {
      spawnShape();
    }, speed);

    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(mainInterval);
          clearInterval(countdown);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(mainInterval);
      clearInterval(countdown);
    };
  }, [speed, spawnShape]);

  const handleInteraction = (type: 'click' | 'miss') => {
    if (currentShape === 'circle') {
      setStats(prev => ({ ...prev, circlesClicked: prev.circlesClicked + 1 }));
    } else if (currentShape === 'triangle') {
      setStats(prev => ({ ...prev, trianglesClicked: prev.trianglesClicked + 1 }));
    }
    setCurrentShape(null); // Clear immediately after click
  };

  const finishTest = () => {
    const s = statsRef.current;
    const inhibitionError = (s.trianglesClicked / (s.trianglesShown || 1)) * 100;
    const omissionRate = ((s.circlesShown - s.circlesClicked) / (s.circlesShown || 1)) * 100;
    onComplete({ inhibitionError, omissionRate, peakSpeed: speed });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-2xl">
      <div className="w-full space-y-4">
        <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#1A1C2E]/40">
          <span className="flex items-center gap-2">
            <Target className="w-3 h-3" />
            Test B : Point de Rupture
          </span>
          <span>{timeLeft}s • Vitesse : {Math.round(1000/speed * 10) / 10} obj/s</span>
        </div>
        <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: `${(timeLeft / 40) * 100}%` }}
            className="h-full bg-orange-500"
          />
        </div>
      </div>

      <div className="h-64 flex items-center justify-center w-full">
        <AnimatePresence mode="wait">
          {currentShape && (
            <motion.button
              key={currentShape + speed}
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => handleInteraction('click')}
              className={`w-40 h-40 shadow-2xl transition-shadow flex items-center justify-center ${
                currentShape === 'circle' 
                  ? 'rounded-full bg-emerald-500 shadow-emerald-500/20' 
                  : 'bg-red-500 shadow-red-500/20'
              }`}
              style={{
                clipPath: currentShape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
              }}
            >
              <span className="text-white font-bold uppercase tracking-tighter">
                {currentShape === 'circle' ? 'Vite !' : 'STOP'}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="text-center space-y-2">
        <p className="text-xl font-bold">Cliquez sur les <span className="text-emerald-500">CERCLES</span></p>
        <p className="text-sm text-[#1A1C2E]/40 font-medium flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          Ignorez absolument les triangles.
        </p>
      </div>
    </div>
  );
}
