'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Zap, Clock, ShieldCheck, CheckCircle2, Target, Info, ArrowRight } from 'lucide-react';

interface CAAProps {
  tensionLevel: number;
}

export default function CAAModule({ tensionLevel }: CAAProps) {
  const [step, setStep] = useState(1);
  const [actionType, setActionType] = useState<string | null>(null);
  const [userAction, setUserAction] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  // Logic: Calculate mode and constraint
  const getActionDetails = () => {
    if (tensionLevel >= 4) {
      return {
        mode: 'Action Test',
        constraint: 'Durée maximale : 20 min',
        objective: 'Observer la résistance, pas réussir.',
        description: 'La tension est élevée. L\'objectif n\'est pas d\'aboutir, mais de voir où ça bloque dans ton système. Si ça devient trop lourd, arrête-toi avant les 20 min.',
        howTo: 'Choisis une micro-tâche. Lance un chrono. Observe tes pensées ("Je n\'y arriverai pas", "C\'est nul") sans t\'y arrêter.',
        color: 'text-red-400',
        bg: 'bg-red-400/5'
      };
    }
    if (tensionLevel >= 2) {
      return {
        mode: 'Action Progressive',
        constraint: 'Une seule tentative',
        objective: 'Ajuster le geste en temps réel.',
        description: 'Le flux est présent mais demande de la vigilance. Fais l\'action d\'un trait, sans revenir en arrière pour corriger.',
        howTo: 'Fais l\'action (un mail, un rangement, un appel) en restant attentif à ta respiration. Une fois fini, c\'est fini.',
        color: 'text-[#C9A24D]',
        bg: 'bg-[#C9A24D]/5'
      };
    }
    return {
      mode: 'Action Préparée',
      constraint: 'Sans enjeu externe',
      objective: 'Stabiliser la nouvelle habitude.',
      description: 'Tout est fluide. C\'est le moment idéal pour ancrer un nouveau comportement sans pression.',
      howTo: 'Prends le temps de bien faire les choses, avec plaisir et précision. Savoure la fluidité du geste.',
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
              <div className={`p-8 md:p-12 rounded-[50px] border border-[#1A1C2E]/5 space-y-12 ${details.bg}`}>
                
                {/* 1. Header & Context */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30">Mode d'action recommandé</p>
                    <div className="flex items-center gap-3">
                      <Zap className={`w-6 h-6 ${details.color}`} />
                      <h4 className={`text-3xl font-serif font-bold italic ${details.color}`}>{details.mode}</h4>
                    </div>
                  </div>
                  <p className="text-lg text-[#1A1C2E]/60 leading-relaxed font-light italic">
                    {details.description}
                  </p>
                </div>

                {/* 2. Constraints & Objective Cards */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-8 bg-white/60 rounded-[40px] border border-[#1A1C2E]/5 space-y-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 text-[#C9A24D]" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40">Contrainte saine</p>
                    </div>
                    <p className="font-bold text-xl text-[#1A1C2E]">{details.constraint}</p>
                    <p className="text-xs text-[#1A1C2E]/40 leading-relaxed">
                      La contrainte n'est pas une punition, mais un cadre pour éviter la dispersion.
                    </p>
                  </div>

                  <div className="p-8 bg-white/60 rounded-[40px] border border-[#1A1C2E]/5 space-y-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-[#C9A24D]" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40">Objectif de posture</p>
                    </div>
                    <p className="font-bold text-xl text-[#1A1C2E]">« {details.objective} »</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-red-400/60 mt-2">SANS OBLIGATION DE RÉSULTAT</p>
                  </div>
                </div>

                {/* 3. How to execute */}
                <div className="p-8 bg-[#1A1C2E] text-white rounded-[40px] space-y-4 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-[#C9A24D]" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Comment faire concrètement ?</p>
                  </div>
                  <p className="text-lg leading-relaxed font-light italic text-white/80">
                    {details.howTo}
                  </p>
                </div>

                {/* 4. User Input */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40">Quelle action vas-tu poser maintenant ?</label>
                    <input 
                      type="text"
                      value={userAction}
                      onChange={(e) => setUserAction(e.target.value)}
                      placeholder="Ex: Répondre à ce mail en une fois..."
                      className="w-full p-6 bg-white border border-[#1A1C2E]/10 rounded-2xl text-lg focus:outline-none focus:border-[#C9A24D] transition-colors shadow-inner"
                    />
                  </div>

                  <button 
                    onClick={() => setIsCompleted(true)}
                    disabled={isCompleted || !userAction.trim()}
                    className={`w-full py-8 rounded-full font-bold text-xl uppercase tracking-widest shadow-2xl transition-all flex items-center justify-center gap-4 ${isCompleted ? 'bg-green-500 text-white' : userAction.trim() ? 'bg-[#1A1C2E] text-white hover:bg-[#C9A24D] active:scale-95' : 'bg-[#F8F9FA] text-[#1A1C2E]/20 cursor-not-allowed'}`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-8 h-8" />
                        <span>Action réalisée et validée</span>
                      </>
                    ) : (
                      <>
                        <span>Valider mon intention</span>
                        <ArrowRight className="w-6 h-6" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <button 
                  onClick={() => { setStep(1); setIsCompleted(false); setUserAction(''); }}
                  className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/30 hover:text-[#C9A24D] transition-colors border-b border-transparent hover:border-[#C9A24D]"
                >
                  Réinitialiser l'outil CAA
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
