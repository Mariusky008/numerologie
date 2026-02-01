'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Zap, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CAAProps {
  tensionLevel: number;
}

export default function CAAModule({ tensionLevel }: CAAProps) {
  const [step, setStep] = useState(1);
  const [actionType, setActionType] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Logic: Calculate mode and constraint
  const getActionDetails = () => {
    if (tensionLevel >= 4) {
      return {
        mode: 'Action Test',
        constraint: 'Durée maximale : 20 min',
        objective: 'Observer la résistance, pas réussir.',
        color: 'text-red-400',
        bg: 'bg-red-400/5'
      };
    }
    if (tensionLevel >= 2) {
      return {
        mode: 'Action Progressive',
        constraint: 'Une seule tentative',
        objective: 'Ajuster le geste en temps réel.',
        color: 'text-[#C9A24D]',
        bg: 'bg-[#C9A24D]/5'
      };
    }
    return {
      mode: 'Action Préparée',
      constraint: 'Sans enjeu externe',
      objective: 'Stabiliser la nouvelle habitude.',
      color: 'text-green-400',
      bg: 'bg-green-400/5'
    };
  };

  const details = getActionDetails();

  const handleActionType = (type: string) => {
    setActionType(type);
    setStep(2);
  };

  return (
    <div className="p-8 md:p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C9A24D]/10 flex items-center justify-center text-[#C9A24D]">
            <Hammer className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold italic">Cadre d’Action Ajustée (CAA)</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Agir sans se disperser ni forcer</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-[#F8F9FA] rounded-full text-[10px] font-bold text-[#1A1C2E]/40 uppercase tracking-widest">
          Outil d'Action
        </div>
      </div>

      <div className="p-6 bg-[#FDFBF7] rounded-3xl border border-[#C9A24D]/10">
        <p className="text-sm text-[#1A1C2E]/60 italic">
          Un outil pour agir sans se disperser, sans forcer, et sans se trahir.
        </p>
      </div>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: TYPE OF ACTION */}
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <p className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40">Étape 1 — Type d'action</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Action courte', 'Action moyenne', 'Action engageante'].map((type) => (
                  <button
                    key={type}
                    onClick={() => handleActionType(type)}
                    className="p-6 rounded-3xl border border-[#1A1C2E]/5 bg-white hover:border-[#C9A24D] hover:bg-[#FDFBF7] transition-all text-sm font-bold text-[#1A1C2E]/60 hover:text-[#1A1C2E]"
                  >
                    {type}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: ACTION DETAILS & FINAL OUTPUT */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10"
            >
              <div className={`p-10 rounded-[50px] border border-[#1A1C2E]/5 space-y-10 ${details.bg}`}>
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Mode d'action recommandé</p>
                      <div className="flex items-center gap-3">
                        <Zap className={`w-6 h-6 ${details.color}`} />
                        <h4 className={`text-2xl font-serif font-bold italic ${details.color}`}>{details.mode}</h4>
                      </div>
                      <p className="text-xs text-[#1A1C2E]/40">Ce mode est le plus cohérent avec ta structure actuelle.</p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Contrainte saine</p>
                      <div className="flex items-center gap-3 text-[#1A1C2E]">
                        <Clock className="w-5 h-5 opacity-40" />
                        <p className="font-bold text-lg">{details.constraint}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-8 bg-white/50 rounded-3xl border border-[#1A1C2E]/5 space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Objectif</p>
                      <p className="text-sm font-medium italic">« {details.objective} »</p>
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1C2E]/20 mt-2">SANS OBLIGATION DE RÉSULTAT</p>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-[#1A1C2E]/5">
                  <button 
                    onClick={() => setIsCompleted(true)}
                    disabled={isCompleted}
                    className={`w-full py-8 rounded-full font-bold text-lg uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-4 ${isCompleted ? 'bg-green-400 text-white' : 'bg-[#1A1C2E] text-white hover:bg-[#C9A24D]'}`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-6 h-6" />
                        <span>Action réalisée</span>
                      </>
                    ) : (
                      <span>Valider l'Action Ajustée</span>
                    )}
                  </button>
                </div>
              </div>

              <button 
                onClick={() => { setStep(1); setIsCompleted(false); }}
                className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30 hover:text-[#C9A24D] transition-colors"
              >
                Réinitialiser l'outil CAA
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
