'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Info, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface COPProps {
  tensionLevel: number;
  dayTheme: string;
  onOrientationChange?: (orientation: string) => void;
}

export default function COPModule({ tensionLevel, dayTheme, onOrientationChange }: COPProps) {
  const [step, setStep] = useState(1);
  const [decisionType, setDecisionType] = useState<string | null>(null);
  const [filterResponses, setFilterResponses] = useState<Record<number, string>>({});
  
  useEffect(() => {
    if (step === 4 && onOrientationChange) {
      onOrientationChange(getFinalOrientation().text);
    }
  }, [step, filterResponses]);
  const getPosture = () => {
    if (tensionLevel >= 4) return { label: 'Posture d\'observation', color: 'text-blue-400', bg: 'bg-blue-400/10', icon: '🔵' };
    if (tensionLevel >= 2) return { label: 'Posture d\'ajustement', color: 'text-yellow-400', bg: 'bg-yellow-400/10', icon: '🟡' };
    return { label: 'Posture d\'action', color: 'text-green-400', bg: 'bg-green-400/10', icon: '🟢' };
  };

  const posture = getPosture();

  const questions = [
    "Est-ce une décision prise pour éviter une tension ?",
    "Est-ce une décision compatible avec ton rythme actuel ?",
    "As-tu toutes les informations brutes (sans interprétation) ?"
  ];

  const handleDecisionType = (type: string) => {
    setDecisionType(type);
    setStep(2);
  };

  const handleFilter = (qIndex: number, response: string) => {
    setFilterResponses(prev => ({ ...prev, [qIndex]: response }));
    if (Object.keys({ ...filterResponses, [qIndex]: response }).length === questions.length) {
      setStep(4);
    }
  };

  const getFinalOrientation = () => {
    const values = Object.values(filterResponses);
    const incertainCount = values.filter(v => v === 'Incertain').length;
    const nonCount = values.filter(v => v === 'Non').length;

    if (incertainCount >= 2) return { text: 'Clarifier encore', color: 'text-yellow-400' };
    if (nonCount >= 1 || posture.label.includes('observation')) return { text: 'Décider plus tard', color: 'text-blue-400' };
    return { text: 'Décider maintenant', color: 'text-green-400' };
  };

  return (
    <div className="p-8 md:p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A24D]/10 flex items-center justify-center text-[#C9A24D]">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold italic">Cadre d’Orientation Personnelle (COP)</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Déterminer la posture la plus juste</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-[#F8F9FA] rounded-full text-[10px] font-bold text-[#1A1C2E]/40 uppercase tracking-widest">
          Outil d'Orientation
        </div>
      </div>

      <div className="p-6 bg-[#FDFBF7] rounded-3xl border border-[#C9A24D]/10">
        <p className="text-sm text-[#1A1C2E]/60 italic">
          Un outil pour déterminer la posture la plus juste avant de décider.
        </p>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: TYPE OF DECISION */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40">Étape 1 — Type de décision</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Décision mineure', 'Décision intermédiaire', 'Décision structurante'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleDecisionType(type)}
                    className="p-6 rounded-3xl border border-[#1A1C2E]/5 bg-white hover:border-[#C9A24D] hover:bg-[#FDFBF7] transition-all text-sm font-bold text-[#1A1C2E]/60 hover:text-[#1A1C2E]"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: POSTURE */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40">Étape 2 — Posture recommandée</p>
              <div className={`p-8 rounded-[40px] ${posture.bg} border border-[#1A1C2E]/5 space-y-4`}>
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{posture.icon}</span>
                  <h4 className={`text-2xl font-serif font-bold italic ${posture.color}`}>{posture.label}</h4>
                </div>
                <p className="text-sm text-[#1A1C2E]/60 leading-relaxed">
                  Dans ton cycle actuel (Mois 1 - {dayTheme}), il est préférable d'adopter une <span className="font-bold">{posture.label}</span>.
                </p>
              </div>
              <button 
                onClick={() => setStep(3)}
                className="w-full py-5 bg-[#1A1C2E] text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#C9A24D] transition-colors"
              >
                Continuer vers les filtres
              </button>
            </motion.div>
          )}

          {/* STEP 3: FILTERS */}
          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40">Étape 3 — Filtres personnalisés</p>
              <div className="space-y-6">
                {questions.map((q, i) => (
                  <div key={i} className="space-y-4">
                    <p className="text-lg font-serif italic text-[#1A1C2E]/80">{q}</p>
                    <div className="flex gap-3">
                      {['Oui', 'Non', 'Incertain'].map((resp) => (
                        <button
                          key={resp}
                          onClick={() => handleFilter(i, resp)}
                          className={`px-6 py-3 rounded-full border text-xs font-bold transition-all ${filterResponses[i] === resp ? 'bg-[#1A1C2E] text-white border-[#1A1C2E]' : 'bg-white text-[#1A1C2E]/40 border-[#1A1C2E]/10 hover:border-[#1A1C2E]/30'}`}
                        >
                          {resp}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: FINAL ORIENTATION */}
          {step === 4 && (
            <motion.div 
              key="step4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              <div className="p-10 rounded-[50px] bg-[#1A1C2E] text-white space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 blur-3xl rounded-full"></div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Orientation recommandée</p>
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className={`w-8 h-8 ${getFinalOrientation().color}`} />
                    <h4 className={`text-4xl font-serif font-bold italic ${getFinalOrientation().color}`}>
                      → {getFinalOrientation().text}
                    </h4>
                  </div>
                </div>
                <p className="text-sm text-white/60 font-light leading-relaxed">
                  Cette orientation est basée sur ton Cadre d'Orientation Personnelle d'aujourd'hui. Elle ne constitue pas un ordre, mais un repère pour ton alignement.
                </p>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30 hover:text-[#C9A24D] transition-colors"
              >
                Réinitialiser l'outil COP
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
