
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
    if (step === 1 && (!formData.birthDate || !formData.birthTime || !formData.birthPlace)) return;
    
    // Step 2: Focus (Always has a default, so valid)
    
    if (step === 2) {
      // Transition to calculation
      setStep(3);
      // Simulate calculation time for "Wow" effect
      setTimeout(() => {
        onComplete(formData);
      }, 3500);
    } else {
      setStep(step + 1);
    }
  };

  const updateField = (field: keyof UserData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fffbf0] text-[#57534e] p-4">
      <div className="w-full max-w-xl">
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
              <h2 className="text-4xl font-serif text-center text-[#78350f]">
                Commençons par votre identité
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#d97706]/80 mb-2">Prénoms (tous)</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#d97706]/30 py-3 text-2xl focus:border-[#d97706] focus:outline-none transition-colors text-center text-[#78350f] placeholder-[#d6d3d1]"
                    placeholder="Jean-Philippe Pierre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#d97706]/80 mb-2">Nom de Naissance</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#d97706]/30 py-3 text-2xl focus:border-[#d97706] focus:outline-none transition-colors text-center text-[#78350f] placeholder-[#d6d3d1]"
                    placeholder="Dupont"
                  />
                </div>
              </div>
              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!formData.firstName || !formData.lastName}
                  className="group flex items-center gap-2 px-8 py-3 bg-[#d97706]/10 hover:bg-[#d97706]/20 border border-[#d97706]/30 rounded-full transition-all disabled:opacity-50"
                >
                  <span className="text-[#d97706] font-medium">Continuer</span>
                  <ArrowRight className="w-4 h-4 text-[#d97706] group-hover:translate-x-1 transition-transform" />
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
              <h2 className="text-4xl font-serif text-center text-[#78350f]">
                Votre moment d'incarnation
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#d97706]/80 mb-2 text-center">Date de Naissance</label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => updateField('birthDate', e.target.value)}
                    className="w-full bg-transparent border-b-2 border-[#d97706]/30 py-3 text-3xl focus:border-[#d97706] focus:outline-none transition-colors text-center text-[#78350f]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#d97706]/80 mb-2 text-center">Heure (HH:MM)</label>
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => updateField('birthTime', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#d97706]/30 py-3 text-2xl focus:border-[#d97706] focus:outline-none transition-colors text-center text-[#78350f]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#d97706]/80 mb-2 text-center">Lieu de Naissance</label>
                    <input
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) => updateField('birthPlace', e.target.value)}
                      className="w-full bg-transparent border-b-2 border-[#d97706]/30 py-3 text-2xl focus:border-[#d97706] focus:outline-none transition-colors text-center text-[#78350f] placeholder-[#d6d3d1]"
                      placeholder="Paris, France"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  disabled={!formData.birthDate || !formData.birthTime || !formData.birthPlace}
                  className="group flex items-center gap-2 px-8 py-3 bg-[#d97706]/10 hover:bg-[#d97706]/20 border border-[#d97706]/30 rounded-full transition-all disabled:opacity-50"
                >
                  <span className="text-[#d97706] font-medium">Continuer</span>
                  <ArrowRight className="w-4 h-4 text-[#d97706] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: Focus */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-serif text-center text-[#78350f]">
                Quelle est votre priorité ?
              </h2>
              <p className="text-center text-[#d97706]/80">
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
                      relative p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left
                      ${formData.focus === option.id 
                        ? 'border-[#d97706] bg-[#fff7ed] text-[#78350f] shadow-md' 
                        : 'border-stone-200 bg-white text-[#57534e] hover:border-[#d97706]/50'}
                    `}
                  >
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-serif text-xl">{option.label}</span>
                    {formData.focus === option.id && (
                      <motion.div
                        layoutId="active-check"
                        className="absolute right-4 w-3 h-3 bg-[#d97706] rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex justify-center pt-8">
                <button
                  onClick={handleNext}
                  className="group flex items-center gap-2 px-8 py-3 bg-[#d97706]/10 hover:bg-[#d97706]/20 border border-[#d97706]/30 rounded-full transition-all"
                >
                  <span className="text-[#d97706] font-medium">Révéler mon profil</span>
                  <Sparkles className="w-4 h-4 text-[#d97706] group-hover:spin transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

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
                  className="absolute inset-0 border-2 border-[#d97706]/20 rounded-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                
                {/* Inner Spinner */}
                <motion.div
                  className="absolute inset-4 border-t-2 border-r-2 border-[#d97706]/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Counter-rotating Ring */}
                 <motion.div
                  className="absolute inset-8 border-b-2 border-l-2 border-[#fbbf24]/40 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />

                {/* Center Pulse */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-[#d97706]" />
                  </motion.div>
                </div>
              </div>
              
              <div className="space-y-4 w-full">
                <motion.h3 
                  className="text-2xl font-serif text-[#78350f]"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Alignement des constellations...
                </motion.h3>
                
                {/* Progress Bar */}
                <div className="w-full bg-[#f5f5f4] rounded-full h-2 overflow-hidden relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#d97706]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5, ease: "easeInOut" }}
                  />
                </div>
                
                <p className="text-[#d97706]/80 text-sm">
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
