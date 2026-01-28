'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Target, 
  Zap,
  ChevronRight,
  ShieldCheck,
  Brain
} from 'lucide-react';
import { AUTO_PERCEPTION_ITEMS, BEHAVIOR_SCENARIOS } from '@/lib/psy-mirror/data';
import { Option, PsyMirrorResult } from '@/lib/psy-mirror/types';
import { useRouter } from 'next/navigation';
import AttentionTest from './reflex-tests/AttentionTest';
import BreakingPointTest from './reflex-tests/BreakingPointTest';
import RiskBalloonTest from './reflex-tests/RiskBalloonTest';

export default function ExperiencePsyMirror() {
  const router = useRouter();
  const [step, setStep] = useState<'intro' | 'moduleA' | 'moduleB' | 'moduleC' | 'loading'>('intro');
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentScenarioStep, setCurrentScenarioStep] = useState(0);
  const [currentReflexStep, setCurrentReflexStep] = useState(0);
  const [moduleAAnswers, setModuleAAnswers] = useState<Option[]>([]);
  const [moduleBAnswers, setModuleBAnswers] = useState<Option[]>([]);
  const [reflexResults, setReflexResults] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  const loadingSteps = [
    "Analyse de l'intention consciente (Module A)...",
    "Décodage des réflexes sous pression (Module B)...",
    "Calcul des capacités cognitives (Laboratoire)...",
    "Identification des angles morts invisibles...",
    "Génération de votre miroir psychologique...",
    "Préparation de votre Oracle personnel..."
  ];

  // --- Module A (Auto-perception) ---
  const handleModuleASelect = (option: Option) => {
    const newAnswers = [...moduleAAnswers, option];
    setModuleAAnswers(newAnswers);
    
    if (currentModuleIndex < AUTO_PERCEPTION_ITEMS.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    } else {
      setStep('moduleB');
      setCurrentModuleIndex(0);
    }
  };

  // --- Module B (Behavior Scenarios) ---
  const handleModuleBSelect = (option: Option) => {
    const newAnswers = [...moduleBAnswers, option];
    setModuleBAnswers(newAnswers);
    
    const currentScenario = BEHAVIOR_SCENARIOS[currentModuleIndex];
    if (currentScenarioStep < currentScenario.steps.length - 1) {
      setCurrentScenarioStep(currentScenarioStep + 1);
    } else if (currentModuleIndex < BEHAVIOR_SCENARIOS.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1);
      setCurrentScenarioStep(0);
    } else {
      setStep('moduleC');
    }
  };

  // --- Module C (Reflex Tests) ---
  const handleReflexComplete = (testKey: string, result: any) => {
    const newReflexResults = { ...reflexResults, [testKey]: result };
    setReflexResults(newReflexResults);

    if (currentReflexStep < 2) {
      setCurrentReflexStep(currentReflexStep + 1);
    } else {
      finishExperience(newReflexResults);
    }
  };

  const finishExperience = async (finalReflexResults: any) => {
    setStep('loading');
    setIsLoading(true);

    try {
      const response = await fetch('/api/psy-mirror', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleA_answers: moduleAAnswers,
          moduleB_answers: moduleBAnswers,
          moduleC_results: finalReflexResults,
          user_meta: { lang: 'fr', session_id: Math.random().toString(36).substring(7) }
        }),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem('psy_mirror_result', JSON.stringify(result));
        router.push('/miroir/resultat');
      } else {
        alert("Une erreur est survenue lors du calcul. Veuillez réessayer.");
        setStep('intro');
      }
    } catch (error) {
      console.error(error);
      alert("Erreur réseau.");
      setStep('intro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C2E] font-sans flex flex-col items-center justify-center p-6">
      
      <AnimatePresence mode="wait">
        {/* INTRO STEP */}
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-xl w-full bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#1A1C2E]/5 text-center space-y-8"
          >
            <div className="w-20 h-20 bg-[#1A1C2E] rounded-3xl flex items-center justify-center text-white mx-auto shadow-xl">
              <Brain className="w-10 h-10" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight">Prêt à voir votre reflet ?</h1>
              <p className="text-[#1A1C2E]/60 leading-relaxed">
                Cette expérience dure environ 15 à 20 minutes. Elle se compose de deux parties : vos croyances conscientes, puis vos réactions face à des scénarios réels.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F9FA] border border-[#1A1C2E]/5 text-left">
                <Clock className="w-5 h-5 text-[#1A1C2E]/40" />
                <span className="text-sm font-medium">Temps estimé : 15 min</span>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8F9FA] border border-[#1A1C2E]/5 text-left">
                <ShieldCheck className="w-5 h-5 text-[#1A1C2E]/40" />
                <span className="text-sm font-medium">Analyse privée & non médicale</span>
              </div>
            </div>
            <button 
              onClick={() => setStep('moduleA')}
              className="w-full py-5 bg-[#1A1C2E] text-white rounded-full font-bold text-lg hover:bg-[#2C2F4A] transition-all shadow-xl hover:scale-105"
            >
              Commencer l'expérience
            </button>
          </motion.div>
        )}

        {/* MODULE A: AUTO-PERCEPTION */}
        {step === 'moduleA' && (
          <motion.div 
            key="moduleA"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full space-y-12"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#1A1C2E]/40">
                <span>Partie 1: Auto-perception</span>
                <span>{currentModuleIndex + 1} / {AUTO_PERCEPTION_ITEMS.length}</span>
              </div>
              <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentModuleIndex + 1) / AUTO_PERCEPTION_ITEMS.length) * 100}%` }}
                  className="h-full bg-[#1A1C2E]"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {AUTO_PERCEPTION_ITEMS[currentModuleIndex].prompt}
              </h2>
              <div className="grid gap-4">
                {AUTO_PERCEPTION_ITEMS[currentModuleIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleModuleASelect(option)}
                    className="group flex items-center justify-between p-6 bg-white border border-[#1A1C2E]/5 rounded-3xl text-left hover:border-[#1A1C2E] hover:shadow-xl transition-all duration-300"
                  >
                    <span className="font-medium text-lg pr-4">{option.text}</span>
                    <div className="w-10 h-10 rounded-full border border-[#1A1C2E]/10 flex items-center justify-center group-hover:bg-[#1A1C2E] group-hover:text-white transition-colors shrink-0">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* MODULE B: BEHAVIOR SCENARIOS */}
        {step === 'moduleB' && (
          <motion.div 
            key="moduleB"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full space-y-12"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest text-[#1A1C2E]/40">
                <span>Partie 2: Scénarios Réels</span>
                <span>Scénario {currentModuleIndex + 1} / {BEHAVIOR_SCENARIOS.length}</span>
              </div>
              <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentModuleIndex * 4 + currentScenarioStep + 1) / (BEHAVIOR_SCENARIOS.length * 4)) * 100}%` }}
                  className="h-full bg-[#1A1C2E]"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-[9px] font-bold uppercase w-fit">
                <Target className="w-3 h-3" />
                Contrainte : {BEHAVIOR_SCENARIOS[currentModuleIndex].constraint}
              </div>
            </div>

            <div className="space-y-8 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#1A1C2E]/5">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[#1A1C2E]/40 uppercase tracking-widest">Le contexte</h3>
                <p className="text-xl md:text-2xl font-bold leading-tight">
                  {BEHAVIOR_SCENARIOS[currentModuleIndex].steps[currentScenarioStep].context}
                </p>
              </div>
              
              <div className="grid gap-3 pt-4">
                {BEHAVIOR_SCENARIOS[currentModuleIndex].steps[currentScenarioStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleModuleBSelect(option)}
                    className="group flex items-center justify-between p-5 bg-[#F8F9FA] border border-[#1A1C2E]/5 rounded-2xl text-left hover:bg-[#1A1C2E] hover:text-white transition-all duration-300"
                  >
                    <span className="text-sm md:text-base font-medium pr-4">{option.text}</span>
                    <div className="w-8 h-8 rounded-full border border-[#1A1C2E]/10 flex items-center justify-center group-hover:border-white/20 shrink-0">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* MODULE C: REFLEX TESTS */}
        {step === 'moduleC' && (
          <motion.div 
            key="moduleC"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full flex flex-col items-center"
          >
            {currentReflexStep === 0 && (
              <AttentionTest onComplete={(res) => handleReflexComplete('attention', res)} />
            )}
            {currentReflexStep === 1 && (
              <BreakingPointTest onComplete={(res) => handleReflexComplete('breaking_point', res)} />
            )}
            {currentReflexStep === 2 && (
              <RiskBalloonTest onComplete={(res) => handleReflexComplete('risk_balloon', res)} />
            )}
          </motion.div>
        )}

        {/* LOADING STEP */}
        {step === 'loading' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-8"
          >
            <div className="relative w-24 h-24">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-4 border-[#1A1C2E]/10 border-t-[#1A1C2E] rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-[#1A1C2E] animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Analyse en cours...</h2>
              <p className="text-[#1A1C2E]/60">Le moteur calcule vos écarts comportementaux.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
