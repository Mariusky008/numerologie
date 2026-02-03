'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Clock, 
  Target, 
  Zap,
  ChevronRight,
  ShieldCheck,
  Brain,
  Sparkles,
  Star,
  User,
  MapPin,
  Calendar
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { AUTO_PERCEPTION_ITEMS, BEHAVIOR_SCENARIOS } from '@/lib/psy-mirror/data';
import { ROTATING_FEEDBACKS, MODULE_B_FEEDBACKS, SYNTHESIS } from '@/lib/psy-mirror/feedbacks';
import type { Option } from '@/lib/psy-mirror/types';

const AttentionTest = dynamic(() => import('./reflex-tests/AttentionTest'), { ssr: false });
const BreakingPointTest = dynamic(() => import('./reflex-tests/BreakingPointTest'), { ssr: false });
const RiskBalloonTest = dynamic(() => import('./reflex-tests/RiskBalloonTest'), { ssr: false });
const MentalAgilityTest = dynamic(() => import('./reflex-tests/MentalAgilityTest'), { ssr: false });
import { calculateLifePathNumber, getLifePathData, getMoonSign, getSunSign, getAscendant, getChartMaster } from '@/lib/psy-mirror/cosmic';

export default function ExperiencePsyMirror() {
  const router = useRouter();
  const [step, setStep] = useState<'collectInfo' | 'cosmicReveal' | 'moduleA' | 'moduleB' | 'moduleC' | 'loading'>('collectInfo');
  const [infoSubStep, setInfoSubStep] = useState(1); // 1: Name, 2: Date/Time, 3: City
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthTime: '',
    birthCity: ''
  });
  const [cosmicData, setCosmicData] = useState<any>(null);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentScenarioStep, setCurrentScenarioStep] = useState(0);
  const [currentReflexStep, setCurrentReflexStep] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);
  const [moduleAAnswers, setModuleAAnswers] = useState<Option[]>([]);
  const [moduleBAnswers, setModuleBAnswers] = useState<Option[]>([]);
  const [reflexResults, setReflexResults] = useState<any>({});
  const [userData, setUserData] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [intermediateFeedback, setIntermediateFeedback] = useState<{
    title: string;
    message: string;
    type: 'insight' | 'presell' | 'synthesis';
    autoClose?: boolean;
  } | null>(null);

  const getRemainingTime = () => {
    if (step === 'moduleA') {
      const rem = (AUTO_PERCEPTION_ITEMS.length - currentModuleIndex) * 10 + 5 * 60 + 8 * 60;
      return Math.ceil(rem / 60);
    }
    if (step === 'moduleB') {
      const currentStepCount = currentModuleIndex * 4 + currentScenarioStep;
      const totalModuleBSteps = BEHAVIOR_SCENARIOS.length * 4;
      const rem = (totalModuleBSteps - currentStepCount) * 25 + 8 * 60;
      return Math.ceil(rem / 60);
    }
    if (step === 'moduleC') {
      const rem = (reflexTests.length - currentReflexStep) * 2 * 60;
      return Math.ceil(rem / 60);
    }
    return 15;
  };

  const checkFeedback = (count: number, type: 'moduleA' | 'moduleB' | 'moduleC') => {
    if (type === 'moduleA') {
      // Fréquence 1 feedback toutes les 2 questions
      if (count % 2 === 0 && count < AUTO_PERCEPTION_ITEMS.length) {
        const feedbackIndex = (count / 2 - 1) % ROTATING_FEEDBACKS.length;
        setIntermediateFeedback({
          title: "Analyse en cours...",
          message: ROTATING_FEEDBACKS[feedbackIndex],
          type: 'insight',
          autoClose: true
        });
        return true; // Feedback affiché
      }
      
      // Fin du module A
      if (count === AUTO_PERCEPTION_ITEMS.length) {
        setIntermediateFeedback({
          title: SYNTHESIS.MODULE_A.title,
          message: SYNTHESIS.MODULE_A.message,
          type: 'synthesis',
          autoClose: false
        });
        return true;
      }
    } else if (type === 'moduleB') {
      // 1 feedback par scénario (toutes les 4 étapes)
      if (count % 4 === 0 && count < BEHAVIOR_SCENARIOS.length * 4) {
        const feedbackIndex = (count / 4 - 1) % MODULE_B_FEEDBACKS.length;
        setIntermediateFeedback({
          title: "Scénario terminé",
          message: MODULE_B_FEEDBACKS[feedbackIndex],
          type: 'insight',
          autoClose: true
        });
        return true;
      }

      // Fin du module B
      if (count === BEHAVIOR_SCENARIOS.length * 4) {
        setIntermediateFeedback({
          title: SYNTHESIS.MODULE_B.title,
          message: SYNTHESIS.MODULE_B.message,
          type: 'synthesis',
          autoClose: false
        });
        return true;
      }
    }
    return false;
  };

  const reflexTests = [
    { 
      id: 'attention', 
      title: 'Test d\'Attention', 
      instruction: (
        <div className="space-y-4">
          <p>Cliquez sur les cibles dès qu'elles apparaissent. Soyez le plus rapide possible.</p>
          <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest italic">Ce test ne mesure pas ta performance, mais ton style de réaction.</p>
        </div>
      ),
      component: AttentionTest 
    },
    { 
      id: 'breaking', 
      title: 'Point de Rupture', 
      instruction: (
        <div className="space-y-4">
          <p>Cliquez sur les CERCLES dès qu'ils apparaissent. Ignorez absolument les triangles rouges.</p>
          <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest italic">Ce test ne mesure pas ta performance, mais ton style de réaction.</p>
        </div>
      ),
      component: BreakingPointTest 
    },
    { 
      id: 'agility', 
      title: 'Agilité Mentale', 
      instruction: (
        <div className="space-y-6 text-left">
          <p className="text-lg font-medium text-center">Vous allez devoir trier des nombres selon une règle qui change.</p>
          <div className="grid gap-4">
            <div className="p-6 bg-[#C9A24D]/10 rounded-[30px] border-2 border-[#C9A24D]/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A24D] text-white flex items-center justify-center font-bold text-xs">A</div>
                <p className="font-black text-[#C9A24D] uppercase tracking-widest text-xs">Règle : PARITÉ</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-2xl text-center shadow-sm">
                  <p className="text-[10px] uppercase opacity-40 mb-1">Si Pair</p>
                  <p className="font-bold">GAUCHE</p>
                </div>
                <div className="bg-white p-3 rounded-2xl text-center shadow-sm">
                  <p className="text-[10px] uppercase opacity-40 mb-1">Si Impair</p>
                  <p className="font-bold">DROITE</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-[#5B4B8A]/10 rounded-[30px] border-2 border-[#5B4B8A]/20 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#5B4B8A] text-white flex items-center justify-center font-bold text-xs">B</div>
                <p className="font-black text-[#5B4B8A] uppercase tracking-widest text-xs">Règle : MAGNITUDE</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-2xl text-center shadow-sm">
                  <p className="text-[10px] uppercase opacity-40 mb-1">Si &gt; 5</p>
                  <p className="font-bold">GAUCHE</p>
                </div>
                <div className="bg-white p-3 rounded-2xl text-center shadow-sm">
                  <p className="text-[10px] uppercase opacity-40 mb-1">Si ≤ 5</p>
                  <p className="font-bold">DROITE</p>
                </div>
              </div>
            </div>
          </div>
          <p className="text-sm text-[#1A1C2E]/50 italic text-center px-4">
            Restez vigilant : la règle (Parité ou Magnitude) s'affiche en haut de l'écran et peut changer à tout moment.
          </p>
          <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest italic text-center">Ce test ne mesure pas ta performance, mais ton style de réaction.</p>
        </div>
      ),
      component: MentalAgilityTest 
    },
    { 
      id: 'balloon', 
      title: 'Prise de Risque', 
      instruction: (
        <div className="space-y-4">
          <p>Gonflez le ballon pour gagner des points. Plus il est gros, plus vous gagnez, mais s'il éclate, vous perdez tout pour ce ballon.</p>
          <p className="text-sm font-bold text-[#C9A24D] uppercase tracking-widest italic">Ce test ne mesure pas ta performance, mais ton style de réaction.</p>
        </div>
      ),
      component: RiskBalloonTest 
    }
  ];

  useEffect(() => {
    // Check if we have data from the Astro landing page
    const savedCosmicData = localStorage.getItem('cosmic_user_data');
    if (savedCosmicData) {
      try {
        const parsed = JSON.parse(savedCosmicData);
        setUserData(parsed);
        if (parsed.birthDate && parsed.firstName) {
          setPersonalInfo({
            firstName: parsed.firstName || '',
            lastName: parsed.lastName || '',
            birthDate: parsed.birthDate || '',
            birthTime: parsed.birthTime || '',
            birthCity: parsed.birthCity || ''
          });
          
          const pathNum = calculateLifePathNumber(parsed.birthDate);
          const pathData = getLifePathData(pathNum);
          const moonData = getMoonSign(parsed.birthDate, parsed.birthTime);
          const sunData = getSunSign(parsed.birthDate);
          const ascendantData = parsed.birthTime ? getAscendant(parsed.birthDate, parsed.birthTime) : { name: 'Bélier', description: '' };
          const chartMaster = getChartMaster(ascendantData.name);

          setCosmicData({ 
            pathNum, 
            ...pathData, 
            moon: moonData.name, 
            moon_element: moonData.element,
            sun: sunData.name,
            sun_element: sunData.element,
            sun_desc: sunData.description,
            ascendant: ascendantData.name,
            ascendant_desc: ascendantData.description,
            masterPlanet: chartMaster?.planet,
            masterHouse: chartMaster?.house,
            master_desc: chartMaster?.description,
            firstName: parsed.firstName,
            lastName: parsed.lastName
          });
          
          // Skip directly to cosmic reveal if we have all info
          if (parsed.birthDate && parsed.firstName && parsed.birthTime && parsed.birthCity) {
            setStep('cosmicReveal');
          }
        }
      } catch (e) {
        console.error("Error parsing cosmic data", e);
      }
    }
  }, []);

  // --- Intro & Cosmic Identity ---
  const handleIntroStart = () => {
    trackEvent('experience_start');
    if (userData && userData.birthDate && userData.firstName && userData.birthTime) {
      setStep('cosmicReveal');
    } else {
      setStep('collectInfo');
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalInfo.birthDate || !personalInfo.firstName) return;

    trackEvent('info_submitted');
    const pathNum = calculateLifePathNumber(personalInfo.birthDate);
    const pathData = getLifePathData(pathNum);
    const moonData = getMoonSign(personalInfo.birthDate, personalInfo.birthTime);
    const sunData = getSunSign(personalInfo.birthDate);
    const ascendantData = personalInfo.birthTime ? getAscendant(personalInfo.birthDate, personalInfo.birthTime) : { name: 'Bélier', description: '' };
    const masterData = getChartMaster(ascendantData.name);

    setCosmicData({ 
      pathNum, 
      ...pathData, 
      moon: moonData.name, 
      moon_element: moonData.element,
      sun: sunData.name,
      sun_element: sunData.element,
      sun_desc: sunData.description,
      ascendant: ascendantData.name,
      ascendant_desc: ascendantData.description,
      masterPlanet: masterData.planet,
      masterHouse: masterData.house,
      master_desc: masterData.description,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName
    });
    
    // Update userData for persistence
    const updatedUserData = { ...personalInfo };
    setUserData(updatedUserData);
    localStorage.setItem('cosmic_user_data', JSON.stringify(updatedUserData));

    setStep('cosmicReveal');
  };

  const proceedFromCosmic = () => {
    trackEvent('moduleA_start');
    setStep('moduleA');
  };

  // --- Module A (Auto-perception) ---
  const handleModuleASelect = (option: Option) => {
    if (isProcessing) return;
    
    const newAnswers = [...moduleAAnswers, option];
    setModuleAAnswers(newAnswers);
    
    // Reset scroll to top for next question
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track every 3 questions or so to see where they drop
    if (newAnswers.length % 3 === 0) {
      trackEvent(`moduleA_progress_${newAnswers.length}`);
    }

    const hasFeedback = checkFeedback(newAnswers.length, 'moduleA');

    if (hasFeedback) {
      setIsProcessing(true);
      // Si c'est un feedback auto-fermant (toutes les 2 questions)
      if (newAnswers.length < AUTO_PERCEPTION_ITEMS.length) {
        setTimeout(() => {
          setIntermediateFeedback(null);
          setIsProcessing(false);
          if (currentModuleIndex < AUTO_PERCEPTION_ITEMS.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
          }
        }, 2000);
      }
      // Si c'est la synthèse (fin du module), on ne fait rien, l'utilisateur cliquera sur le bouton
    } else {
      if (currentModuleIndex < AUTO_PERCEPTION_ITEMS.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
      }
    }
  };

  // --- Module B (Behavior Scenarios) ---
  const handleModuleBSelect = (option: Option) => {
    if (isProcessing) return;

    const newAnswers = [...moduleBAnswers, option];
    setModuleBAnswers(newAnswers);
    
    // Reset scroll to top for next question
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track every scenario (4 steps)
    if (newAnswers.length % 4 === 0) {
      trackEvent(`moduleB_progress_${newAnswers.length / 4}`);
    }

    const hasFeedback = checkFeedback(newAnswers.length, 'moduleB');

    if (hasFeedback) {
      setIsProcessing(true);
      // Si c'est un feedback auto-fermant (fin de scénario)
      if (newAnswers.length < BEHAVIOR_SCENARIOS.length * 4) {
        setTimeout(() => {
          setIntermediateFeedback(null);
          setIsProcessing(false);
          
          const currentScenario = BEHAVIOR_SCENARIOS[currentModuleIndex];
          if (currentScenarioStep < currentScenario.steps.length - 1) {
            setCurrentScenarioStep(currentScenarioStep + 1);
          } else if (currentModuleIndex < BEHAVIOR_SCENARIOS.length - 1) {
            setCurrentModuleIndex(currentModuleIndex + 1);
            setCurrentScenarioStep(0);
          }
        }, 2000);
      }
      // Si c'est la synthèse finale du module B
    } else {
      const currentScenario = BEHAVIOR_SCENARIOS[currentModuleIndex];
      if (currentScenarioStep < currentScenario.steps.length - 1) {
        setCurrentScenarioStep(currentScenarioStep + 1);
      } else if (currentModuleIndex < BEHAVIOR_SCENARIOS.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1);
        setCurrentScenarioStep(0);
      } else {
        setStep('moduleC');
        setShowInstructions(true);
      }
    }
  };

  // --- Module C (Reflex Tests) ---
  const startTest = () => {
    setShowInstructions(false);
  };

  const handleContinueFromSynthesis = () => {
    if (!intermediateFeedback) return;

    if (step === 'moduleA') {
      trackEvent('moduleB_start');
      setStep('moduleB');
      setCurrentModuleIndex(0);
      setCurrentScenarioStep(0);
    } else if (step === 'moduleB') {
      trackEvent('moduleC_start');
      setStep('moduleC');
      setShowInstructions(true);
      setCurrentModuleIndex(0);
      setCurrentReflexStep(0);
    }
    
    setIntermediateFeedback(null);
    setIsProcessing(false);
  };

  const handleReflexComplete = (testKey: string, result: any) => {
    const newReflexResults = { ...reflexResults, [testKey]: result };
    setReflexResults(newReflexResults);

    const testCount = Object.keys(newReflexResults).length;
    trackEvent(`moduleC_progress_${testCount}`);
    checkFeedback(testCount, 'moduleC');

    if (currentReflexStep < reflexTests.length - 1) {
      setCurrentReflexStep(currentReflexStep + 1);
      setShowInstructions(true);
    } else {
      trackEvent('experience_finished');
      finishExperience(newReflexResults);
    }
  };

  const finishExperience = async (finalReflexResults: any) => {
    setStep('loading');

    try {
      // Stockage des données de session pour la page d'onboarding
      const sessionData = {
        moduleA_answers: moduleAAnswers,
        moduleB_answers: moduleBAnswers,
        moduleC_results: finalReflexResults,
        cosmic_data: cosmicData,
      };
      localStorage.setItem('psy_mirror_session_data', JSON.stringify(sessionData));
      
      // Simulation de calcul pour l'effet "Wow"
      setTimeout(() => {
        router.push('/miroir/onboarding');
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la finalisation:", error);
      setStep('collectInfo');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C2E] font-sans flex flex-col items-center justify-center p-6">
      
      <AnimatePresence mode="wait">
        {/* STEP: COLLECT INFO */}
        {step === 'collectInfo' && (
          <motion.div 
            key="collectInfo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-[#1A1C2E]/5 space-y-10"
          >
            {/* Form Progress Bar */}
            <div className="w-full h-1.5 bg-[#1A1C2E]/5 rounded-full overflow-hidden mb-8">
              <motion.div 
                animate={{ width: `${(infoSubStep / 3) * 100}%` }}
                className="h-full bg-[#C9A24D]"
              />
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mx-auto border border-[#C9A24D]/20">
                {infoSubStep === 1 ? <User className="w-8 h-8 text-[#C9A24D]" /> : 
                 infoSubStep === 2 ? <Calendar className="w-8 h-8 text-[#C9A24D]" /> : 
                 <MapPin className="w-8 h-8 text-[#C9A24D]" />}
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold">
                {infoSubStep === 1 ? "Comment t'appelles-tu ?" : 
                 infoSubStep === 2 ? "Ta naissance ?" : 
                 "Où es-tu né ?"}
              </h2>
            </div>

            <div className="space-y-6">
              {infoSubStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="grid md:grid-cols-2 gap-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Prénom</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ton prénom"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && personalInfo.firstName && setInfoSubStep(2)}
                      className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Nom</label>
                    <input 
                      type="text" 
                      placeholder="Ton nom (optionnel)"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && setInfoSubStep(2)}
                      className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                    />
                  </div>
                  <button 
                    onClick={() => personalInfo.firstName && setInfoSubStep(2)}
                    disabled={!personalInfo.firstName}
                    className="md:col-span-2 w-full py-5 bg-[#1A1C2E] text-white rounded-2xl font-bold text-lg shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    Continuer <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {infoSubStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Date de Naissance</label>
                    <input 
                      type="date" 
                      required
                      value={personalInfo.birthDate}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                      className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Heure (si connue)</label>
                    <input 
                      type="time" 
                      value={personalInfo.birthTime}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthTime: e.target.value})}
                      className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setInfoSubStep(1)}
                      className="py-5 bg-[#F8F9FA] text-[#1A1C2E]/60 rounded-2xl font-bold"
                    >
                      Retour
                    </button>
                    <button 
                      onClick={() => personalInfo.birthDate && setInfoSubStep(3)}
                      disabled={!personalInfo.birthDate}
                      className="py-5 bg-[#1A1C2E] text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      Continuer <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {infoSubStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Ville de Naissance</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1A1C2E]/20" />
                      <input 
                        type="text" 
                        required
                        placeholder="Ta ville"
                        value={personalInfo.birthCity}
                        onChange={(e) => setPersonalInfo({...personalInfo, birthCity: e.target.value})}
                        className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl pl-14 pr-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && personalInfo.birthCity && handleInfoSubmit(e as any)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setInfoSubStep(2)}
                      className="py-5 bg-[#F8F9FA] text-[#1A1C2E]/60 rounded-2xl font-bold"
                    >
                      Retour
                    </button>
                    <button 
                      onClick={(e) => handleInfoSubmit(e as any)}
                      disabled={!personalInfo.birthCity}
                      className="py-5 bg-[#1A1C2E] text-white rounded-2xl font-bold shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      Voir mon profil <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {/* STEP: COSMIC REVEAL */}
        {step === 'cosmicReveal' && (
          <motion.div 
            key="cosmicReveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-3xl text-center space-y-12"
          >
            <div className="p-12 md:p-16 rounded-[60px] bg-gradient-to-br from-[#1A1C2E] to-[#08090F] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                <Star className="w-48 h-48" />
              </div>
              
              <div className="relative z-10 space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.3em]">
                  <Sparkles className="w-4 h-4" />
                  Potentiel de Naissance Révélé
                </div>
                
                <div className="space-y-4">
                  <p className="text-[#C9A24D] text-lg font-bold tracking-[0.2em] uppercase">
                    {cosmicData?.firstName} {cosmicData?.lastName}
                  </p>
                  <h3 className="text-5xl md:text-7xl font-serif font-bold italic">{cosmicData?.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 text-left max-w-2xl mx-auto">
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">Chemin de Vie {cosmicData?.pathNum}</p>
                      <p className="text-sm font-bold text-white/90">{cosmicData?.potential}</p>
                      <p className="text-xs text-white/50 italic">{cosmicData?.description}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Soleil en {cosmicData?.sun} ({cosmicData?.sun_element})</p>
                      <p className="text-xs text-white/50 italic">{cosmicData?.sun_desc}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Ascendant {cosmicData?.ascendant}</p>
                      <p className="text-xs text-white/50 italic">{cosmicData?.ascendant_desc}</p>
                    </div>
                    {cosmicData?.masterPlanet && (
                      <div className="p-4 rounded-2xl bg-[#5B4B8A]/10 border border-[#5B4B8A]/20 space-y-1">
                        <p className="text-[10px] font-black uppercase tracking-widest text-[#A78BFA]">Maître : {cosmicData?.masterPlanet} (Maison {cosmicData?.masterHouse})</p>
                        <p className="text-xs text-white/50 italic">{cosmicData?.master_desc}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="max-w-xl mx-auto p-8 rounded-3xl bg-white/5 border border-white/10 space-y-4">
                  <p className="text-white/80 text-xl leading-relaxed font-light">
                    "{cosmicData?.potential}"
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-widest text-white/30">
                  <div className="space-y-1">
                    <p>Élément Solaire</p>
                    <p className="text-white">{cosmicData?.sun_element}</p>
                  </div>
                  <div className="space-y-1">
                    <p>Élément Lunaire</p>
                    <p className="text-white">{cosmicData?.moon_element}</p>
                  </div>
                  <div className="space-y-1">
                    <p>Ville</p>
                    <p className="text-white">{personalInfo.birthCity}</p>
                  </div>
                  <div className="space-y-1">
                    <p>Heure</p>
                    <p className="text-white">{personalInfo.birthTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 md:p-12 bg-white/50 backdrop-blur-md border border-[#1A1C2E]/5 rounded-[40px] space-y-6 shadow-sm text-left">
                <p className="text-[#1A1C2E]/80 text-xl font-medium leading-relaxed">
                  Maintenant que nous avons une première base,
                </p>
                <div className="h-px w-12 bg-[#C9A24D]/30"></div>
                <div className="space-y-6 text-[#1A1C2E]/70 text-lg leading-relaxed">
                  <p>
                    ce que tu viens de découvrir correspond à un extrait de ton potentiel de naissance, tel qu’il ressort de ta date de naissance <span className="text-[#1A1C2E] font-bold">(numérologie et astrologie)</span>.
                  </p>
                  <p>
                    👉 Le portrait complet est bien plus vaste et détaillé. Il sert de fondation à l’analyse, mais il ne dit pas encore comment ce potentiel s’exprime dans ta réalité actuelle, notamment lorsque tu dois décider, t’adapter ou réagir sous pression.
                  </p>
                  <p>
                    Pour comprendre cet écart éventuel, tu vas entrer dans le <span className="font-bold text-[#C9A24D]">Laboratoire des Réflexes et des choix</span>.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <p className="font-bold text-[#1A1C2E]/80">Cette étape permet d’observer :</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
                        <span>tes automatismes décisionnels</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
                        <span>tes réactions spontanées</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
                        <span>la cohérence (ou non) entre potentiel et fonctionnement réel</span>
                      </div>
                    </div>
                  </div>

                  <p className="italic text-sm pt-4 border-t border-[#1A1C2E]/5">
                    Il n’y a pas de bonne ou de mauvaise réponse. Il s’agit uniquement d’observer ton style naturel d’action.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={proceedFromCosmic}
                className="w-full py-7 bg-[#1A1C2E] text-white rounded-[30px] font-bold text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex flex-col items-center justify-center gap-1 group"
              >
                <div className="flex items-center gap-4">
                  Entrer dans le Laboratoire
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-black">Durée estimée : ~10 minutes</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* MODULE A: AUTO-PERCEPTION */}
        {step === 'moduleA' && (
          <motion.div 
            key={`moduleA-${currentModuleIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full space-y-12"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest">
                <div className="flex flex-col gap-1">
                  <span className="text-[#1A1C2E]/40">Partie 1: Auto-perception</span>
                  <span className="text-[#C9A24D]">Encore ~{getRemainingTime()} minutes</span>
                </div>
                <span className="text-[#1A1C2E]/40">{moduleAAnswers.length + 1} / {AUTO_PERCEPTION_ITEMS.length}</span>
              </div>
              <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((moduleAAnswers.length + 1) / AUTO_PERCEPTION_ITEMS.length) * 100}%` }}
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
                    key={`${currentModuleIndex}-${idx}`}
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
            key={`moduleB-${currentModuleIndex}-${currentScenarioStep}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl w-full space-y-12"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest">
                <div className="flex flex-col gap-1">
                  <span className="text-[#1A1C2E]/40">Partie 2: Scénarios Réels</span>
                  <span className="text-[#C9A24D]">Encore ~{getRemainingTime()} minutes</span>
                </div>
                <span className="text-[#1A1C2E]/40">Scénario {Math.min(currentModuleIndex + 1, BEHAVIOR_SCENARIOS.length)} / {BEHAVIOR_SCENARIOS.length}</span>
              </div>
              <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((moduleBAnswers.length + 1) / (BEHAVIOR_SCENARIOS.length * 4)) * 100}%` }}
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
                    key={`${currentModuleIndex}-${currentScenarioStep}-${idx}`}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl min-h-[80vh] flex flex-col items-center justify-center py-12"
          >
            <AnimatePresence mode="wait">
              {showInstructions ? (
                <motion.div
                  key={`instr-${currentReflexStep}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="max-w-xl w-full mx-auto bg-white p-12 rounded-[50px] shadow-2xl border border-[#1A1C2E]/5 text-center space-y-10"
                >
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#C9A24D]">
                    <span>Test {currentReflexStep + 1} / {reflexTests.length}</span>
                    <span>Encore ~{getRemainingTime()} minutes</span>
                  </div>
                  
                  <div className="w-20 h-20 bg-[#C9A24D]/10 rounded-3xl flex items-center justify-center text-[#C9A24D] mx-auto">
                    <Zap className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-4xl font-serif font-bold text-[#1A1C2E]">
                      {reflexTests[currentReflexStep].title}
                    </h1>
                  </div>

                  <div className="text-xl text-[#1A1C2E]/60 leading-relaxed">
                    {reflexTests[currentReflexStep].instruction}
                  </div>

                  <button
                    onClick={startTest}
                    className="w-full py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-xl hover:bg-[#2C2F4A] transition-all shadow-xl hover:scale-[1.02] active:scale-95"
                  >
                    C'est compris
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`test-${currentReflexStep}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full flex items-center justify-center"
                >
                  {React.createElement(reflexTests[currentReflexStep].component as any, {
                    onComplete: (res: any) => handleReflexComplete(reflexTests[currentReflexStep].id, res)
                  })}
                </motion.div>
              )}
            </AnimatePresence>
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

      <AnimatePresence>
        {intermediateFeedback && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1A1C2E]/20 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[#1A1C2E]/5 max-w-md w-full text-center space-y-8"
            >
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${intermediateFeedback.type === 'insight' ? 'bg-[#C9A24D]/10 text-[#C9A24D]' : intermediateFeedback.type === 'synthesis' ? 'bg-[#1A1C2E]/10 text-[#1A1C2E]' : 'bg-[#5B4B8A]/10 text-[#5B4B8A]'}`}>
                {intermediateFeedback.type === 'insight' ? <Target className="w-8 h-8" /> : intermediateFeedback.type === 'synthesis' ? <Brain className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest opacity-40">{intermediateFeedback.title}</h3>
                <p className="text-xl md:text-2xl font-serif font-bold italic leading-tight">
                  {intermediateFeedback.message}
                </p>
              </div>
              
              {!intermediateFeedback.autoClose && (
                <button
                  onClick={handleContinueFromSynthesis}
                  className="w-full py-4 bg-[#1A1C2E] text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {intermediateFeedback.type === 'synthesis' 
                    ? (step === 'moduleA' ? SYNTHESIS.MODULE_A.cta : SYNTHESIS.MODULE_B.cta) 
                    : "Continuer l'expérience"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              
              {intermediateFeedback.autoClose && (
                <div className="pt-4">
                  <div className="h-1 w-24 bg-[#1A1C2E]/10 mx-auto rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="h-full bg-[#1A1C2E]"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
