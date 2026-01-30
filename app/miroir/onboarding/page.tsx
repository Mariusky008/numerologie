'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, MapPin, Clock, Calendar, User } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
  });

  // Split fields state
  const [dateParts, setDateParts] = useState({ day: '', month: '', year: '' });
  const [timeParts, setTimeParts] = useState({ hour: '', minute: '' });

  useEffect(() => {
    // Try to pre-fill from localStorage if available
    const saved = localStorage.getItem('cosmic_user_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
        if (parsed.birthDate) {
          const [y, m, d] = parsed.birthDate.split('-');
          setDateParts({ year: y, month: m, day: d });
        }
        if (parsed.birthTime) {
          const [h, min] = parsed.birthTime.split(':');
          setTimeParts({ hour: h, minute: min });
        }
      } catch (e) {}
    }
  }, []);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateDatePart = (part: string, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    const newParts = { ...dateParts, [part]: value };
    setDateParts(newParts);
    if (newParts.day && newParts.month && newParts.year.length === 4) {
      updateField('birthDate', `${newParts.year}-${newParts.month.padStart(2, '0')}-${newParts.day.padStart(2, '0')}`);
    }
  };

  const updateTimePart = (part: string, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    const newParts = { ...timeParts, [part]: value };
    setTimeParts(newParts);
    if (newParts.hour && newParts.minute) {
      updateField('birthTime', `${newParts.hour.padStart(2, '0')}:${newParts.minute.padStart(2, '0')}`);
    }
  };

  const handleNext = () => {
    if (step === 0 && (!formData.firstName || !formData.lastName)) return;
    if (step === 1 && (!formData.birthDate || !formData.birthPlace || !formData.birthTime)) return;

    if (step === 1) {
      // Finalize
      const sessionData = JSON.parse(localStorage.getItem('psy_mirror_session_data') || '{}');
      const finalData = { ...sessionData, user_info: formData };
      localStorage.setItem('psy_mirror_final_data', JSON.stringify(finalData));
      
      // Simulation calculation
      setStep(2);
      setTimeout(() => {
        router.push('/miroir/gratuit');
      }, 3500);
    } else {
      setStep(step + 1);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(201,162,77,0.05),_transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(91,75,138,0.05),_transparent_40%)]"></div>
      </div>

      <div className="w-full max-w-xl z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" {...fadeIn} className="space-y-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#1A1C2E] rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg mb-6">
                  <User className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Pour votre analyse complète...</h1>
                <p className="text-[#1A1C2E]/50 text-lg">Nous avons besoin de votre identité civile pour le calcul numérologique.</p>
              </div>

              <div className="space-y-8 bg-white p-10 rounded-[40px] shadow-2xl border border-[#1A1C2E]/5">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Prénoms (tous)</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateField('firstName', e.target.value)}
                      placeholder="Jean-Philippe Pierre"
                      className="w-full bg-[#F8F9FA] border-none rounded-2xl py-5 px-6 text-xl focus:ring-2 focus:ring-[#C9A24D]/20 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Nom de Naissance</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateField('lastName', e.target.value)}
                      placeholder="Dupont"
                      className="w-full bg-[#F8F9FA] border-none rounded-2xl py-5 px-6 text-xl focus:ring-2 focus:ring-[#C9A24D]/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.firstName || !formData.lastName}
                  className="w-full py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-xl hover:bg-[#2C2F4A] transition-all shadow-xl disabled:opacity-30 disabled:hover:scale-100 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                >
                  Continuer
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div key="step1" {...fadeIn} className="space-y-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#C9A24D] rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg mb-6">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">Votre incarnation</h1>
                <p className="text-[#1A1C2E]/50 text-lg">Ces précisions permettent de calculer votre thème astral et votre ascendant.</p>
              </div>

              <div className="space-y-10 bg-white p-10 rounded-[40px] shadow-2xl border border-[#1A1C2E]/5">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date de Naissance
                    </label>
                    <div className="flex gap-4 justify-center">
                      <input
                        type="tel"
                        value={dateParts.day}
                        onChange={(e) => updateDatePart('day', e.target.value)}
                        placeholder="JJ"
                        className="w-20 bg-[#F8F9FA] border-none rounded-2xl py-5 text-center text-2xl focus:ring-2 focus:ring-[#C9A24D]/20 outline-none"
                        maxLength={2}
                      />
                      <input
                        type="tel"
                        value={dateParts.month}
                        onChange={(e) => updateDatePart('month', e.target.value)}
                        placeholder="MM"
                        className="w-20 bg-[#F8F9FA] border-none rounded-2xl py-5 text-center text-2xl focus:ring-2 focus:ring-[#C9A24D]/20 outline-none"
                        maxLength={2}
                      />
                      <input
                        type="tel"
                        value={dateParts.year}
                        onChange={(e) => updateDatePart('year', e.target.value)}
                        placeholder="AAAA"
                        className="w-32 bg-[#F8F9FA] border-none rounded-2xl py-5 text-center text-2xl focus:ring-2 focus:ring-[#C9A24D]/20 outline-none"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Heure
                      </label>
                      <div className="flex gap-2 items-center justify-center bg-[#F8F9FA] rounded-2xl py-5">
                        <input
                          type="tel"
                          value={timeParts.hour}
                          onChange={(e) => updateTimePart('hour', e.target.value)}
                          placeholder="HH"
                          className="w-12 bg-transparent border-none text-center text-xl focus:ring-0 outline-none"
                          maxLength={2}
                        />
                        <span className="font-bold opacity-20">:</span>
                        <input
                          type="tel"
                          value={timeParts.minute}
                          onChange={(e) => updateTimePart('minute', e.target.value)}
                          placeholder="MM"
                          className="w-12 bg-transparent border-none text-center text-xl focus:ring-0 outline-none"
                          maxLength={2}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1C2E]/40 flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> Ville
                      </label>
                      <input
                        type="text"
                        value={formData.birthPlace}
                        onChange={(e) => updateField('birthPlace', e.target.value)}
                        placeholder="Paris"
                        className="w-full bg-[#F8F9FA] border-none rounded-2xl py-5 px-6 text-xl focus:ring-2 focus:ring-[#C9A24D]/20 outline-none text-center"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.birthDate || !formData.birthPlace || !formData.birthTime}
                  className="w-full py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-xl hover:bg-[#2C2F4A] transition-all shadow-xl disabled:opacity-30 disabled:hover:scale-100 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3"
                >
                  Finaliser mon analyse
                  <Sparkles className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center space-y-12 text-center">
              <div className="relative w-48 h-48">
                <motion.div
                  className="absolute inset-0 border-2 border-[#C9A24D]/20 rounded-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute inset-4 border-t-2 border-r-2 border-[#C9A24D]/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-[#C9A24D]" />
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-3xl font-serif font-bold italic">Génération de votre miroir...</h2>
                <p className="text-[#1A1C2E]/50 text-lg max-w-sm">Analyse croisée de vos réflexes décisionnels et de votre empreinte de naissance.</p>
                <div className="w-full bg-[#1A1C2E]/5 h-1.5 rounded-full overflow-hidden max-w-xs mx-auto">
                  <motion.div 
                    className="h-full bg-[#C9A24D]"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
