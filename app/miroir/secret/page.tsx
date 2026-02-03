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
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Sequence timing for a total of ~5 seconds
    const timers = [
      setTimeout(() => setStep(1), 600),   // Phrase 1
      setTimeout(() => setStep(2), 1200),  // Phrase 2
      setTimeout(() => setStep(3), 1800),  // Phrase 3
      setTimeout(() => setStep(4), 2400),  // Phrase 4
      setTimeout(() => setStep(5), 3000),  // Phrase 5
      setTimeout(() => setStep(6), 3600),  // Phrase 6
      setTimeout(() => setStep(7), 4200),  // CTA
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  const phrases = [
    "Chaque matin, tu te regardes dans le miroir en pensant te voir tel que tu es.",
    "En réalité, tu vois souvent la personne que tu étais il y a des années.",
    "Ce type d’écart est fréquent, il fabrique une perte de fluidité dans nos vies.",
    "Beaucoup de blocages viennent de l’écart entre qui tu es au fond et la personne que tu es devenue avec le temps.",
    "On a créé un crash test basé sur ta date, ton lieu de naissance et quelques questions pour mettre en lumière ces décalages invisibles.",
    "Afin que tu saches quoi faire pour revenir à ce que tu étais."
  ];

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
              {phrases.map((phrase, index) => (
                step > index && (
                  <motion.div 
                    key={index}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none shadow-xl text-left w-full max-w-sm"
                  >
                    <p className="text-sm md:text-base font-medium leading-relaxed">
                      {phrase}
                    </p>
                  </motion.div>
                )
              ))}
            </AnimatePresence>

            {/* Final CTA */}
            <AnimatePresence mode="popLayout">
              {step >= 7 && (
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
