'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Brain
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SecretPage() {
  const router = useRouter();
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showCta, setShowCta] = useState(false);

  const phrases = [
    "Chaque matin, tu te regardes dans le miroir en pensant te voir tel que tu es.",
    "En réalité, tu te vois aujourd'hui comme tu étais il y a des années.",
    "Ce type d’écart est fréquent, il fabrique une perte de fluidité dans nos vies.",
    "Beaucoup de blocages viennent de l’écart entre qui tu es au fond et la personne que tu es devenue avec le temps.",
    "On a créé un crash test basé sur ta date, ton lieu de naissance et quelques questions pour mettre en lumière ces décalages invisibles.",
    "Afin que tu saches quoi faire pour revenir à ce que tu étais."
  ];

  useEffect(() => {
    let currentStep = 0;

    const runSequence = async () => {
      while (currentStep < phrases.length) {
        // 1. Start typing
        setIsTyping(true);
        // Delay based on phrase length (min 800ms, max 2000ms)
        const typingTime = Math.min(Math.max(phrases[currentStep].length * 20, 800), 2000);
        await new Promise(r => setTimeout(r, typingTime));

        // 2. Show message
        setIsTyping(false);
        setVisibleSteps(prev => [...prev, currentStep]);
        currentStep++;

        // 3. Natural pause before next message
        if (currentStep < phrases.length) {
          await new Promise(r => setTimeout(r, 600));
        }
      }

      // 4. Show CTA after last message
      await new Promise(r => setTimeout(r, 800));
      setShowCta(true);
    };

    runSequence();
  }, []);

  return (
    <div className="min-h-screen bg-[#08090F] text-white font-sans selection:bg-[#C9A24D]/30 overflow-hidden relative">
      
      {/* Mystic Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[120px] rounded-full" />
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
        >
          <source src="/acceuil.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pb-20">
        <div className="max-w-xl w-full text-center flex flex-col items-center justify-center -mt-10">
          <motion.div layout className="w-full space-y-4 flex flex-col items-center">
            
            <AnimatePresence mode="popLayout">
              {visibleSteps.map((index) => (
                <motion.div 
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl rounded-tl-none shadow-xl text-left w-full max-w-2xl"
                >
                  <p className="text-lg md:text-2xl font-medium leading-relaxed">
                    {phrases[index]}
                  </p>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white/5 border border-white/10 p-6 rounded-3xl rounded-tl-none shadow-xl flex items-center gap-2 w-fit self-start ml-0 md:ml-16"
                >
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-2 h-2 bg-white/40 rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-white/40 rounded-full" />
                  <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-white/40 rounded-full" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final CTA */}
            <AnimatePresence mode="popLayout">
              {showCta && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-6 relative group w-full flex flex-col items-center"
                >
                  <div className="text-[#C9A24D] text-sm font-black uppercase tracking-widest animate-pulse">
                    👉 Fais le test et découvre ce qui bloque vraiment
                  </div>

                  <Link 
                    href="/miroir/experience"
                    className="group w-full max-w-sm relative inline-flex flex-col items-center justify-center gap-1 px-8 py-10 bg-[#C9A24D] text-[#08090F] rounded-[32px] font-black hover:scale-[1.02] active:scale-95 transition-all shadow-[0_25px_60px_-15px_rgba(201,162,77,0.6)] border-4 border-white/20 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 text-xl md:text-2xl relative z-10">
                      FAIS TON CRASH TEST
                      <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] opacity-80 relative z-10">
                      (LIEN EN BIO)
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
