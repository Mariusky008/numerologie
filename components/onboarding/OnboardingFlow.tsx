
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { UserData, UserFocus } from '@/lib/types';

interface OnboardingFlowProps {
  onComplete: (data: UserData) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    focus: 'amour'
  });

  const handleNext = () => {
    // Step 0: Name
    if (step === 0 && (!formData.firstName || !formData.lastName)) return;
    
    // Step 1: Birth Info (Date, Time, Place)
    if (step === 1) {
      if (!formData.birthDate || !formData.birthTime || !formData.birthPlace) return;
      
      // Skip Step 2 (Focus), go directly to Step 3 (Calculation)
      setStep(3);
      // Simulate calculation time for "Wow" effect
      setTimeout(() => {
        onComplete(formData);
      }, 3500);
      return;
    }

    setStep(step + 1);
  };

  const updateField = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F7] text-[#2C2F4A] p-4 font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60"></div>
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#C9A24D] rounded-full blur-[150px] opacity-5"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#5B4B8A] rounded-full blur-[150px] opacity-5"></div>
      </div>

      <div className="w-full max-w-xl relative z-10">
        <AnimatePresence mode="wait">
          
          {/* STEP 0: Identity */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif text-center text-[#2C2F4A]">
                Commençons par votre identité
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#5B4B8A] mb-2 uppercase tracking-wide">Prénoms (tous)</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#C9A24D]/30 py-3 text-2xl focus:border-[#C9A24D] focus:outline-none transition-colors text-center text-[#2C2F4A] placeholder-[#2C2F4A]/30 font-serif"
                    placeholder="Jean-Philippe Pierre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#5B4B8A] mb-2 uppercase tracking-wide">Nom de Naissance</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#C9A24D]/30 py-3 text-2xl focus:border-[#C9A24D] focus:outline-none transition-colors text-center text-[#2C2F4A] placeholder-[#2C2F4A]/30 font-serif"
                    placeholder="Dupont"
                  />
                </div>
              </div>
              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!formData.firstName || !formData.lastName}
                  className="group flex items-center gap-2 px-8 py-3 bg-[#5B4B8A] text-white rounded-full transition-all disabled:opacity-50 hover:bg-[#6A5FA8] shadow-lg shadow-[#5B4B8A]/20"
                >
                  <span className="font-bold">Continuer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 1: Birth Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif text-center text-[#2C2F4A]">
                Votre moment d'incarnation
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-[#5B4B8A] mb-2 text-center uppercase tracking-wide">Date de Naissance</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#C9A24D]/30 py-3 text-3xl focus:border-[#C9A24D] focus:outline-none transition-colors text-center text-[#2C2F4A] font-serif"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#5B4B8A] mb-2 text-center uppercase tracking-wide">Heure (HH:MM)</label>
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => updateField('birthTime', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#C9A24D]/30 py-3 text-2xl focus:border-[#C9A24D] focus:outline-none transition-colors text-center text-[#2C2F4A] font-serif"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#5B4B8A] mb-2 text-center uppercase tracking-wide">Lieu de Naissance</label>
                    <input
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) => updateField('birthPlace', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#C9A24D]/30 py-3 text-2xl focus:border-[#C9A24D] focus:outline-none transition-colors text-center text-[#2C2F4A] placeholder-[#2C2F4A]/30 font-serif"
                      placeholder="Paris, France"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!formData.birthDate || !formData.birthTime || !formData.birthPlace}
                  className="group flex items-center gap-2 px-8 py-3 bg-[#5B4B8A] text-white rounded-full transition-all disabled:opacity-50 hover:bg-[#6A5FA8] shadow-lg shadow-[#5B4B8A]/20"
                >
                  <span className="font-bold">Continuer</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Focus - REMOVED per user request */}
          {/* 
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif text-center text-[#2C2F4A]">
                Quelle est votre priorité ?
              </h2>
              <p className="text-center text-[#2C2F4A]/70">
                Cela orientera l'énergie de votre lecture d'âme.
              </p>
              
              <div className="grid grid-cols-1 gap-4 max-w-md mx-auto">
                {[
                  { id: 'amour', label: 'Amour & Relations', icon: '❤️' },
                  { id: 'carriere', label: 'Carrière & Abondance', icon: '💼' },
                  { id: 'mission', label: 'Mission de Vie', icon: '✨' },
                  { id: 'spiritualite', label: 'Spiritualité & Karma', icon: '👁️' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => updateField('focus', option.id)}
                    className={`
                      relative p-4 rounded-xl border transition-all flex items-center gap-4 text-left
                      ${formData.focus === option.id 
                        ? 'border-[#C9A24D] bg-white text-[#2C2F4A] shadow-lg ring-1 ring-[#C9A24D]/50' 
                        : 'border-[#EFEDE9] bg-white/50 text-[#2C2F4A]/70 hover:border-[#C9A24D]/50 hover:bg-white'}
                    `}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-serif text-xl font-bold">{option.label}</span>
                    {formData.focus === option.id && (
                      <motion.div
                        layoutId="active-check"
                        className="absolute right-4 w-3 h-3 bg-[#C9A24D] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  className="group flex items-center gap-2 px-8 py-3 bg-[#5B4B8A] text-white rounded-full transition-all hover:bg-[#6A5FA8] shadow-lg shadow-[#5B4B8A]/20"
                >
                  <span className="font-bold">Révéler mon profil</span>
                  <Sparkles className="w-4 h-4 group-hover:spin transition-transform" />
                </button>
              </div>
            </motion.div>
          )} 
          */}

          {/* STEP 3: Loading / Calculation */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center space-y-8 text-center"
            >
              <div className="relative w-48 h-48">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 border-2 border-[#C9A24D]/20 rounded-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Inner Spinner */}
                <motion.div
                  className="absolute inset-4 border-t-2 border-r-2 border-[#C9A24D]/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Counter-rotating Ring */}
                 <motion.div
                  className="absolute inset-8 border-b-2 border-l-2 border-[#5B4B8A]/40 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-[#C9A24D]" />
                  </motion.div>
                </div>
              </div>
              
              <div className="space-y-4 w-full">
                <motion.h3 
                  className="text-2xl font-serif text-[#2C2F4A]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Alignement des constellations...
                </motion.h3>
                
                {/* Progress Bar */}
                <div className="w-full bg-[#EFEDE9] rounded-full h-2 overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#C9A24D]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
                
                <p className="text-[#2C2F4A]/60 text-sm">
                  Calcul de votre Grille d'Inclusion et analyse de vos dettes karmiques.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
