'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, AlertCircle, Brain, Zap, ShieldAlert } from 'lucide-react';

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

  const [isActive, setIsActive] = useState(true);
  const speedRef = useRef(1200);

  const spawnShape = useCallback(() => {
    if (!isActive) return;

    const isCircle = Math.random() > 0.3; // 70% circles
    const shape: Shape = isCircle ? 'circle' : 'triangle';
    
    setCurrentShape(shape);
    setStats(prev => ({
      ...prev,
      [isCircle ? 'circlesShown' : 'trianglesShown']: prev[isCircle ? 'circlesShown' : 'trianglesShown'] + 1
    }));

    // Speed up
    speedRef.current = Math.max(400, speedRef.current * 0.96);
    setSpeed(speedRef.current);

    // Clear shape after duration
    setTimeout(() => {
      setCurrentShape(null);
    }, Math.min(600, speedRef.current * 0.6));

  }, [isActive]);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsActive(false);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    let timeoutId: NodeJS.Timeout;

    const scheduleNext = (delay?: number) => {
      if (!isActive) return;
      
      const nextDelay = delay !== undefined ? delay : speedRef.current;
      timeoutId = setTimeout(() => {
        spawnShape();
        scheduleNext();
      }, nextDelay);
    };

    scheduleNext(500); // Start first shape after 500ms instead of full speed interval

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isActive, spawnShape]);

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

      <div className="h-96 flex items-center justify-center w-full relative">
        {/* BACKGROUND GLOW */}
        <AnimatePresence>
          {currentShape && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.2, scale: 1.5 }}
              exit={{ opacity: 0 }}
              className={`absolute inset-0 blur-[100px] rounded-full ${
                currentShape === 'circle' ? 'bg-emerald-500' : 'bg-red-500'
              }`}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentShape && (
            <motion.button
              key={currentShape + speed}
              initial={{ scale: 0, rotate: -45, filter: 'blur(20px)' }}
              animate={{ scale: 1, rotate: 0, filter: 'blur(0px)' }}
              exit={{ scale: 2, opacity: 0, filter: 'blur(40px)' }}
              onClick={() => handleInteraction('click')}
              className={`relative group w-48 h-48 transition-all duration-150 flex items-center justify-center ${
                currentShape === 'circle' 
                  ? 'rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_20px_50px_rgba(16,185,129,0.3)]' 
                  : 'bg-gradient-to-br from-red-500 to-red-700 shadow-[0_20px_50px_rgba(239,68,68,0.3)]'
              }`}
              style={{
                clipPath: currentShape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
              }}
            >
              {/* INNER DECORATION */}
              <div className="absolute inset-2 border-2 border-white/20 rounded-[inherit] pointer-events-none" />
              
              <div className="flex flex-col items-center gap-2">
                {currentShape === 'circle' ? (
                  <>
                    <Zap className="w-10 h-10 text-white animate-pulse" />
                    <span className="text-white font-black uppercase tracking-[0.2em] text-sm">Action</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-10 h-10 text-white animate-bounce" />
                    <span className="text-white font-black uppercase tracking-[0.2em] text-sm">Inhiber</span>
                  </>
                )}
              </div>

              {/* RADAR EFFECT */}
              {currentShape === 'circle' && (
                <motion.div 
                  animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-0 border-4 border-emerald-400 rounded-[inherit]"
                />
              )}
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
