'use client';

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
  MapPin
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AUTO_PERCEPTION_ITEMS, BEHAVIOR_SCENARIOS } from '@/lib/psy-mirror/data';
import type { Option } from '@/lib/psy-mirror/types';
import AttentionTest from './reflex-tests/AttentionTest';
import BreakingPointTest from './reflex-tests/BreakingPointTest';
import RiskBalloonTest from './reflex-tests/RiskBalloonTest';
import MentalAgilityTest from './reflex-tests/MentalAgilityTest';
import { calculateLifePathNumber, getLifePathData, getMoonSign, getSunSign, getAscendant, getChartMaster } from '@/lib/psy-mirror/cosmic';

export default function ExperiencePsyMirror() {
  const router = useRouter();
  const [step, setStep] = useState<'intro' | 'collectInfo' | 'cosmicReveal' | 'moduleA' | 'moduleB' | 'moduleC' | 'loading'>('intro');
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

  const reflexTests = [
    { 
      id: 'attention', 
      title: 'Test d\'Attention', 
      instruction: 'Cliquez sur les cibles dès qu\'elles apparaissent. Soyez le plus rapide possible.',
      component: AttentionTest 
    },
    { 
      id: 'breaking', 
      title: 'Point de Rupture', 
      instruction: 'Maintenez le bouton enfoncé le plus longtemps possible, mais relâchez avant que la barre ne devienne rouge.',
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
        </div>
      ),
      component: MentalAgilityTest 
    },
    { 
      id: 'balloon', 
      title: 'Prise de Risque', 
      instruction: 'Gonflez le ballon pour gagner des points. Plus il est gros, plus vous gagnez, mais s\'il éclate, vous perdez tout pour ce ballon.',
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
        if (parsed.birthDate) {
          setPersonalInfo({
            firstName: parsed.firstName || '',
            lastName: parsed.lastName || '',
            birthDate: parsed.birthDate || '',
            birthTime: parsed.birthTime || '',
            birthCity: parsed.birthCity || ''
          });
          
          const pathNum = calculateLifePathNumber(parsed.birthDate);
          const pathData = getLifePathData(pathNum);
          const moonData = getMoonSign(parsed.birthDate);
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
        }
      } catch (e) {
        console.error("Error parsing cosmic data", e);
      }
    }
  }, []);

  // --- Intro & Cosmic Identity ---
  const handleIntroStart = () => {
    if (userData && userData.birthDate && userData.firstName && userData.birthTime) {
      setStep('cosmicReveal');
    } else {
      setStep('collectInfo');
    }
  };

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personalInfo.birthDate || !personalInfo.firstName) return;

    const pathNum = calculateLifePathNumber(personalInfo.birthDate);
    const pathData = getLifePathData(pathNum);
    const moonData = getMoonSign(personalInfo.birthDate);
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
    setStep('moduleA');
  };

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
      setShowInstructions(true);
    }
  };

  // --- Module C (Reflex Tests) ---
  const startTest = () => {
    setShowInstructions(false);
  };

  const handleReflexComplete = (testKey: string, result: any) => {
    const newReflexResults = { ...reflexResults, [testKey]: result };
    setReflexResults(newReflexResults);

    if (currentReflexStep < reflexTests.length - 1) {
      setCurrentReflexStep(currentReflexStep + 1);
      setShowInstructions(true);
    } else {
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
      setStep('intro');
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
              onClick={handleIntroStart}
              className="w-full py-5 bg-[#1A1C2E] text-white rounded-full font-bold text-lg hover:bg-[#2C2F4A] transition-all shadow-xl hover:scale-105"
            >
              Commencer l'expérience
            </button>
          </motion.div>
        )}

        {/* STEP: COLLECT INFO */}
        {step === 'collectInfo' && (
          <motion.div 
            key="collectInfo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-[#1A1C2E]/5 space-y-10"
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mx-auto border border-[#C9A24D]/20">
                <User className="w-10 h-10 text-[#C9A24D]" />
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold">Le Sceau de Naissance</h2>
              <p className="text-[#1A1C2E]/60 text-lg">
                Pour calculer ton empreinte cosmique, nous avons besoin de tes coordonnées de naissance exactes.
              </p>
            </div>

            <form onSubmit={handleInfoSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Prénom</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ton prénom"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                    className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Nom</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ton nom"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                    className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Date de Naissance</label>
                <input 
                  type="date" 
                  required
                  value={personalInfo.birthDate}
                  onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                  className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40 ml-4">Heure de Naissance</label>
                  <input 
                    type="time" 
                    required
                    value={personalInfo.birthTime}
                    onChange={(e) => setPersonalInfo({...personalInfo, birthTime: e.target.value})}
                    className="w-full bg-[#F8F9FA] border-2 border-[#1A1C2E]/5 rounded-2xl px-6 py-4 font-bold focus:border-[#C9A24D] outline-none transition-all"
                  />
                </div>
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
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-6 bg-[#1A1C2E] text-white rounded-2xl font-bold text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl flex items-center justify-center gap-4 mt-4"
              >
                Calculer mon Empreinte
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>
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
                <div className="space-y-4 text-[#1A1C2E]/70 text-lg leading-relaxed">
                  <p>
                    nous allons comparer ce que ta date de naissance révèle de ton potentiel de départ <br className="hidden md:block" />
                    <span className="text-[#1A1C2E] font-bold">(numérologie et astrologie)</span> <br className="hidden md:block" />
                    avec la manière dont tu prends tes décisions aujourd’hui.
                  </p>
                  <p>
                    Pour cela, tu vas passer par le <span className="font-bold text-[#C9A24D]">Laboratoire des Réflexes et psychologique</span>.
                  </p>
                  <p className="italic">
                    Cette étape permet d’observer certains automatismes <br className="hidden md:block" />
                    et de mieux comprendre les zones de tension ou d’incohérence <br className="hidden md:block" />
                    qui peuvent apparaître dans ton parcours.
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
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-40 font-black">Démarrer le Crash-Test</span>
              </button>
            </div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl h-full flex flex-col"
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
                  <div className="w-20 h-20 bg-[#C9A24D]/10 rounded-3xl flex items-center justify-center text-[#C9A24D] mx-auto">
                    <Zap className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-4">
                    <h2 className="text-sm font-black uppercase tracking-[0.3em] text-[#C9A24D]">
                      Test {currentReflexStep + 1} / {reflexTests.length}
                    </h2>
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1"
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

    </div>
  );
}
