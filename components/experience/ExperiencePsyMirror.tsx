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
  MessageCircle,
  CheckCircle,
  User,
  MapPin,
  Calendar,
  Share2,
  Bot
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';
import { AUTO_PERCEPTION_ITEMS, BEHAVIOR_SCENARIOS, INTRO_QCM_ITEMS } from '@/lib/psy-mirror/data';
import { ROTATING_FEEDBACKS, MODULE_B_FEEDBACKS, SYNTHESIS } from '@/lib/psy-mirror/feedbacks';
import type { Option } from '@/lib/psy-mirror/types';

const FeatureRow = ({ icon, text }: { icon: React.ReactNode, text: string }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-[var(--accent)] shrink-0">{icon}</div>
    <p className="text-sm font-medium leading-relaxed opacity-90">{text}</p>
  </div>
);

const StepRow = ({ number, title, desc }: { number: string, title: string, desc: string }) => (
  <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[var(--foreground)]/5 shadow-sm">
    <div className="w-8 h-8 rounded-full bg-[var(--foreground)] text-white flex items-center justify-center font-bold text-sm shrink-0">
      {number}
    </div>
    <div>
      <h4 className="font-bold text-[var(--foreground)] text-sm uppercase tracking-wide mb-1">{title}</h4>
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
    </div>
  </div>
);

const AttentionTest = dynamic(() => import('./reflex-tests/AttentionTest'), { ssr: false });
const BreakingPointTest = dynamic(() => import('./reflex-tests/BreakingPointTest'), { ssr: false });
const RiskBalloonTest = dynamic(() => import('./reflex-tests/RiskBalloonTest'), { ssr: false });
const MentalAgilityTest = dynamic(() => import('./reflex-tests/MentalAgilityTest'), { ssr: false });
import { calculateLifePathNumber, getLifePathData, getMoonSign, getSunSign, getAscendant, getChartMaster } from '@/lib/psy-mirror/cosmic';

export default function ExperiencePsyMirror() {
  const router = useRouter();
  const [step, setStep] = useState<'introQCM' | 'preReveal' | 'awareness' | 'paymentTrigger' | 'collectInfo' | 'cosmicReveal' | 'moduleA' | 'moduleB' | 'moduleC' | 'emailCapture' | 'loading'>('introQCM');
  const [infoSubStep, setInfoSubStep] = useState(1); // 1: Name, 2: Date/Time, 3: City
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    birthTime: '',
    birthCity: ''
  });
  const [email, setEmail] = useState(''); // New email state
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
    const savedSessionData = localStorage.getItem('psy_mirror_session_data');

    if (savedSessionData) {
      try {
        const session = JSON.parse(savedSessionData);
        if (session.moduleA_answers) {
          setModuleAAnswers(session.moduleA_answers);
          // Sync index with answers
          setCurrentModuleIndex(session.moduleA_answers.length);
        }
        // ... restore other session data if needed
      } catch (e) {
        console.error("Error parsing session data", e);
      }
    }

    if (savedCosmicData) {
      try {
        const parsed = JSON.parse(savedCosmicData);
        setUserData(parsed);
        
        // Always pre-fill whatever data we have
        setPersonalInfo(prev => ({
          ...prev,
          firstName: parsed.firstName || prev.firstName,
          lastName: parsed.lastName || prev.lastName,
          birthDate: parsed.birthDate || prev.birthDate,
          birthTime: parsed.birthTime || prev.birthTime,
          birthCity: parsed.birthCity || prev.birthCity
        }));

        if (parsed.birthDate && parsed.firstName) {
          // Calculate everything if we have both
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
          
          // Determine step based on progress
          // If we have full info, we might be past collectInfo
          if (parsed.birthDate && parsed.firstName && parsed.birthTime && parsed.birthCity) {
            // But check if we finished introQCM
            // We'll rely on moduleAAnswers length in the render or separate effect
            // For now, let's just say if we have data, we assume we might be in cosmicReveal
            // BUT the new flow is IntroQCM -> CollectInfo.
            // So we should check answers length first.
            // This logic will be handled by the fact that step defaults to 'introQCM'.
            // We only override it here if we are SURE.
            setStep('cosmicReveal'); 
          }
        }
      } catch (e) {
        console.error("Error parsing cosmic data", e);
      }
    }
  }, []);

  // Effect to manage transitions from IntroQCM
  useEffect(() => {
    if (step === 'introQCM' && moduleAAnswers.length >= 5) {
      // Calculate dynamic gap score based on answers
      // We sum up the absolute values of the weights from the chosen answers
      // This is a pseudo-calculation to make it feel real, but deterministic
      let totalWeight = 0;
      moduleAAnswers.forEach(ans => {
        if (ans.weights) {
            Object.values(ans.weights).forEach(w => totalWeight += Math.abs(w));
        }
      });
      
      // Map to a percentage between 25% and 85% to look realistic
      // Base 25 + (totalWeight * 2) capped at 85
      const calculatedGap = Math.min(85, Math.max(25, 25 + totalWeight));
      
      setGapScore(calculatedGap);
      setStep('preReveal');
    }
  }, [moduleAAnswers, step]);

  // Track funnel steps on step change
  useEffect(() => {
    if (step === 'introQCM') {
        trackEvent('intro_qcm_start'); // Screen 5 Start
    } else if (step === 'preReveal') {
        trackEvent('pre_reveal_viewed'); // Screen 9
    } else if (step === 'awareness') {
        trackEvent('awareness_viewed'); // New Screen
    } else if (step === 'paymentTrigger') {
        trackEvent('payment_trigger_viewed'); // Screen 10
    }
  }, [step]);

  // Track Intro QCM Question Views
  useEffect(() => {
    if (step === 'introQCM') {
        trackEvent(`intro_qcm_q${currentModuleIndex + 1}_viewed`);
    }
  }, [step, currentModuleIndex]);

  const [gapScore, setGapScore] = useState(38); // Default state

  const [showNameReward, setShowNameReward] = useState(false); // NEW STATE FOR NAME REWARD
  const [showCityReward, setShowCityReward] = useState(false); // NEW STATE FOR CITY REWARD
  
  // --- Intro & Cosmic Identity ---
  const handleIntroStart = () => {
    trackEvent('experience_start');
    if (userData && userData.birthDate && userData.firstName && userData.birthTime) {
      setStep('cosmicReveal');
    } else {
      setStep('collectInfo');
    }
  };
  
  // --- NEW: Handle Name Submission with Reward ---
  const handleNameSubmit = () => {
    if (!personalInfo.firstName) return;
    trackEvent('name_submitted');
    
    // Calculate Name Number immediately
    const calculateNameNumber = (name: string) => {
      const mapping: {[key: string]: number} = {
        a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
        j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
        s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8
      };
      const cleanName = (name + (personalInfo.lastName || '')).toLowerCase().replace(/[^a-z]/g, '');
      let sum = 0;
      for (const char of cleanName) {
        sum += mapping[char] || 0;
      }
      while (sum > 9 && sum !== 11 && sum !== 22) {
        sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
      }
      return sum;
    };
    
    const exprNum = calculateNameNumber(personalInfo.firstName);
    
    // Store temporarily in cosmicData
    setCosmicData((prev: any) => ({
      ...prev,
      expressionNumber: exprNum
    }));
    
    setShowNameReward(true);
    
    // Auto-advance after reward
    setTimeout(() => {
        setShowNameReward(false);
        // Skip Date step if we already have it from Landing Page
        if (personalInfo.birthDate) {
            setInfoSubStep(3); // Go to City
        } else {
            setInfoSubStep(2); // Go to Date
        }
    }, 3500);
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

    // --- NEW: Calculate Name Number (Expression) ---
    // Simple Pythagorean system: 1-9
    const calculateNameNumber = (name: string) => {
      const mapping: {[key: string]: number} = {
        a:1,b:2,c:3,d:4,e:5,f:6,g:7,h:8,i:9,
        j:1,k:2,l:3,m:4,n:5,o:6,p:7,q:8,r:9,
        s:1,t:2,u:3,v:4,w:5,x:6,y:7,z:8
      };
      const cleanName = name.toLowerCase().replace(/[^a-z]/g, '');
      let sum = 0;
      for (const char of cleanName) {
        sum += mapping[char] || 0;
      }
      // Reduce to single digit (except 11, 22)
      while (sum > 9 && sum !== 11 && sum !== 22) {
        sum = sum.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
      }
      return sum;
    };

    const expressionNumber = calculateNameNumber(personalInfo.firstName + personalInfo.lastName);
    
    // Quick insights for expression number
    const expressionInsights: {[key: number]: string} = {
      1: "Un leader né qui doit apprendre à diriger sans dominer.",
      2: "Un diplomate sensible qui harmonise les contraires.",
      3: "Un créatif communicant qui a besoin de s'exprimer pour exister.",
      4: "Un bâtisseur méthodique, pilier de stabilité.",
      5: "Un explorateur libre qui refuse les cages dorées.",
      6: "Un protecteur responsable, le cœur sur la main.",
      7: "Un penseur analytique en quête de vérité profonde.",
      8: "Un visionnaire ambitieux, fait pour les grandes réalisations.",
      9: "Un humaniste inspiré qui voit au-delà de soi.",
      11: "Un inspirateur intuitif avec une forte tension nerveuse.",
      22: "Un maître d'œuvre capable de matérialiser l'impossible."
    };

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
      lastName: personalInfo.lastName,
      // Add Expression Data
      expressionNumber,
      expressionInsight: expressionInsights[expressionNumber] || "Une personnalité complexe aux multiples facettes."
    });
    
    // Update userData for persistence
    const updatedUserData = { ...personalInfo };
    setUserData(updatedUserData);
    localStorage.setItem('cosmic_user_data', JSON.stringify(updatedUserData));

    // Show City Reward then proceed
    setShowCityReward(true);
    setTimeout(() => {
        setShowCityReward(false);
        setStep('cosmicReveal');
    }, 3500);
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

    // Skip feedback during Intro QCM (first 5 questions)
    if (step === 'introQCM') {
       if (currentModuleIndex < INTRO_QCM_ITEMS.length - 1) {
         setCurrentModuleIndex(currentModuleIndex + 1);
       }
       return;
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
      trackEvent('experience_finished_pre_email');
      // Store final results and move to email capture
      setStep('emailCapture');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsProcessing(true);
    trackEvent('email_captured');

    try {
      // 1. Prepare data payload
      const payload = {
        userData: {
          ...personalInfo,
          email, // Save email at root
          delivery: { email } // Save email in delivery for Admin compatibility
        },
        // We trigger calculation in backend by sending userData without reportResults
      };

      // 2. Send to API to create "Lead" (Pending Order)
      await fetch('/api/book-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
    } catch (err) {
      console.error("Error saving lead:", err);
      // Continue anyway to show results
    }

    // 3. Finalize experience
    finishExperience(reflexResults);
  };

  const finishExperience = async (finalReflexResults: any) => {
    setStep('loading');

    try {
      // Stockage des données de session pour la page d'onboarding/checkout
      const sessionData = {
        moduleA_answers: moduleAAnswers,
        moduleB_answers: moduleBAnswers,
        moduleC_results: finalReflexResults,
        cosmic_data: cosmicData,
        user_info: { ...personalInfo, email } // Add email here too
      };
      localStorage.setItem('psy_mirror_session_data', JSON.stringify(sessionData));
      
      // Simulation de calcul pour l'effet "Wow"
      setTimeout(() => {
        router.push('/miroir/resultats'); // Redirect to results, NOT onboarding
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de la finalisation:", error);
      setStep('collectInfo');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/5 blur-[100px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {/* STEP: INTRO QCM (HOOK) */}
        {step === 'introQCM' && (
          <motion.div 
            key={`introQCM-${currentModuleIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-[var(--foreground)]/5 space-y-10 relative z-10"
          >
             <div className="space-y-4">
               <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest">
                 <div className="flex flex-col gap-1">
                   <span className="text-[var(--accent)]">Profilage Express</span>
                   <span className="text-[var(--text-secondary)]">Question {currentModuleIndex + 1} / 5</span>
                 </div>
                 <span className="text-[var(--text-secondary)]"><Clock className="w-3 h-3 inline mr-1"/> ~45s</span>
               </div>
               <div className="h-1.5 w-full bg-[var(--foreground)]/5 rounded-full overflow-hidden">
                 <motion.div 
                   initial={{ width: `${(currentModuleIndex / 5) * 100}%` }}
                   animate={{ width: `${((currentModuleIndex + 1) / 5) * 100}%` }}
                   className="h-full bg-[var(--accent)]"
                 />
               </div>
             </div>

             <div className="space-y-8">
               <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight text-[var(--foreground)]">
                 {INTRO_QCM_ITEMS[currentModuleIndex]?.prompt}
               </h2>
               <div className="grid gap-4">
                 {INTRO_QCM_ITEMS[currentModuleIndex]?.options.map((option, idx) => (
                   <button
                     key={`${currentModuleIndex}-${idx}`}
                     onClick={() => handleModuleASelect(option)}
                     className="group flex items-center justify-between p-6 bg-[var(--background)] border border-[var(--foreground)]/5 rounded-3xl text-left hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300 shadow-sm"
                   >
                     <span className="font-medium text-lg pr-4">{option.text}</span>
                     <div className="w-8 h-8 rounded-full border border-[var(--foreground)]/10 flex items-center justify-center group-hover:border-white/30 shrink-0">
                       <ChevronRight className="w-5 h-5" />
                     </div>
                   </button>
                 ))}
               </div>
             </div>
          </motion.div>
        )}

        {/* STEP: PRE-REVEAL (TEASING RESULT) */}
        {step === 'preReveal' && (
          <motion.div 
            key="preReveal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="w-full max-w-lg bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-[var(--foreground)]/5 text-center space-y-8 relative overflow-hidden"
          >
             {/* Background Effects */}
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-50" />
             <div className="absolute -top-20 -right-20 w-40 h-40 bg-[var(--accent)]/10 blur-[50px] rounded-full" />

             <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest mb-4">
                  <Target className="w-3 h-3" />
                  Analyse Partielle Terminée
                </div>
                <h2 className="text-4xl font-serif font-bold text-[var(--foreground)]">
                    Écart détecté
                 </h2>
                 <div className="flex items-center justify-center gap-4 py-6">
                    <div className="text-6xl font-black text-[var(--accent)]">
                       {gapScore}%
                    </div>
                 </div>
                 <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light">
                    "Tu as l'énergie pour avancer, mais quelque chose dans ton environnement actuel te freine."
                 </p>
             </div>

             <div className="p-6 bg-[var(--background)] rounded-3xl border border-[var(--foreground)]/5">
                <p className="text-[var(--accent)] font-bold italic text-lg">
                   ✨ "Ton potentiel demande plus d'espace."
                </p>
             </div>

             <div className="space-y-4 pt-4">
                <button
                  onClick={() => setStep('awareness')}
                  className="w-full py-6 bg-[var(--accent)] text-white rounded-[20px] font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_-5px_rgba(185,98,31,0.5)] flex items-center justify-center gap-3"
                >
                  Je veux comprendre <ArrowRight className="w-6 h-6" />
                </button>

                <div className="space-y-3 pt-2">
                  <button 
                    onClick={() => {
                      const text = `Mon analyse montre un écart de ${gapScore}% : "Tu as l'énergie pour avancer, mais quelque chose dans ton environnement actuel te freine."\n\nEst-ce que tu trouves que ça me correspond ?\n\nFais le test ici : https://votrelegende.fr`;
                      if (navigator.share) {
                        navigator.share({
                          title: 'Mon Écart Détecté',
                          text: text,
                          url: 'https://votrelegende.fr'
                        }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(text);
                        alert("Texte copié ! Tu peux le coller dans TikTok.");
                      }
                      trackEvent('share_tiktok_dm_pre_reveal');
                    }}
                    className="w-full py-4 bg-white border border-[var(--foreground)]/10 rounded-[20px] font-bold text-sm uppercase tracking-widest hover:bg-[var(--background)] transition-all flex items-center justify-center gap-2 text-[var(--text-secondary)] shadow-sm"
                  >
                    <Share2 className="w-4 h-4" />
                    Envoyer en message privé
                  </button>
                  <p className="text-xs text-[var(--text-secondary)]/50 italic max-w-xs mx-auto">
                    « Envoie ce résumé à quelqu’un qui te connaît bien. Il pourrait te voir différemment. »
                  </p>
                </div>
             </div>
          </motion.div>
        )}

        {/* STEP: AWARENESS (NEW STEP) */}
        {step === 'awareness' && (
          <motion.div 
            key="awareness"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-[var(--foreground)]/5 space-y-10 relative z-10"
          >
             {/* 1. Header */}
             <div className="space-y-4 text-center">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest">
                  <Brain className="w-3 h-3" />
                  Analyse approfondie en cours
               </div>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)] leading-tight">
                 Ce décalage n’est pas théorique.
               </h2>
               <p className="text-xl text-[var(--text-secondary)] italic">
                 Il agit déjà dans ta vie quotidienne.
               </p>
             </div>

             {/* 2. Central Block */}
             <div className="bg-[var(--background)] p-8 rounded-[40px] border border-[var(--foreground)]/5 space-y-6">
                <p className="text-[var(--foreground)] font-medium text-lg leading-relaxed text-center">
                  Quand cet écart reste invisible, tu ne fais pas de “mauvais choix”. <br/>
                  <span className="text-[var(--accent)] font-bold">Tu prends de bonnes décisions, mais au mauvais endroit.</span>
                </p>
                
                <div className="space-y-3 pt-2">
                  <p className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] ml-2">Concrètement, cela se traduit par :</p>
                  {[
                    "Une fatigue mentale malgré tes efforts",
                    "Des décisions que tu remets en question après coup",
                    "L’impression d’avancer… puis de revenir au même point",
                    "Des blocages qui reviennent même quand tu “comprends”",
                    "Un décalage entre ce que tu ressens et ce que tu montres"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 bg-white rounded-2xl border border-[var(--foreground)]/5">
                      <div className="w-5 h-5 mt-0.5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                      </div>
                      <span className="text-[var(--foreground)]/80 text-sm leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
             </div>

             {/* 3. Reversal */}
             <div className="text-center px-4">
               <p className="text-xl md:text-2xl font-serif font-bold italic text-[var(--foreground)] leading-relaxed">
                 "Le problème n’est pas ce que tu fais. C’est ce que tu ne vois pas encore."
               </p>
             </div>

             {/* 4. Report Explanation */}
             <div className="space-y-6 text-center">
                <div className="space-y-2">
                   <h3 className="text-lg font-bold text-[var(--foreground)]">C'est précisément là que l'accompagnement change tout :</h3>
                   <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto">
                     Il ne s'agit pas juste de "savoir", mais d'avoir un <span className="text-[var(--foreground)] font-medium">miroir neutre et disponible</span> pour identifier tes angles morts au moment où ils surviennent.
                   </p>
                </div>
                
                <div className="p-4 bg-[var(--accent)]/5 rounded-2xl border border-[var(--accent)]/10">
                   <p className="text-sm text-[var(--foreground)]/70 italic">
                     Pas pour te changer. Mais pour t'aider à naviguer avec ta vraie nature.
                   </p>
                </div>
             </div>

             {/* 5. Proof / Reality (Optional based on prompt, merged above) */}
             {/* 6. Transition & CTA */}
             <div className="space-y-6 pt-4 border-t border-[var(--foreground)]/5">
                <p className="text-center text-[var(--foreground)] font-medium">
                  Tu peux continuer à avancer comme avant. <br/>
                  <span className="text-[var(--text-secondary)]">Ou prendre 20 minutes pour comprendre précisément ce qui te freine aujourd’hui.</span>
                </p>

                <div className="space-y-4">
                  <button
                    onClick={() => setStep('paymentTrigger')}
                    className="w-full py-6 bg-[var(--accent)] text-white rounded-[20px] font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_-5px_rgba(185,98,31,0.5)] flex items-center justify-center gap-3"
                  >
                    Découvrir ma solution personnalisée <ArrowRight className="w-6 h-6" />
                  </button>
                  <p className="text-xs text-center text-[var(--text-secondary)]/50 uppercase tracking-widest">
                    Analyse immédiate • accès direct • sans engagement
                  </p>

                  <button 
                    onClick={() => {
                      const text = `Mon analyse montre un écart de ${gapScore}% : "Tu as l'énergie pour avancer, mais quelque chose dans ton environnement actuel te freine."\n\nEst-ce que tu trouves que ça me correspond ?\n\nFais le test ici : https://votrelegende.fr`;
                      if (navigator.share) {
                        navigator.share({
                          title: 'Mon Écart Détecté',
                          text: text,
                          url: 'https://votrelegende.fr'
                        }).catch(() => {});
                      } else {
                        navigator.clipboard.writeText(text);
                        alert("Texte copié ! Tu peux le coller dans TikTok.");
                      }
                      trackEvent('share_tiktok_dm_awareness');
                    }}
                    className="w-full py-4 bg-transparent border-2 border-[var(--foreground)]/5 rounded-[20px] font-bold text-sm uppercase tracking-widest hover:bg-[var(--foreground)]/5 transition-all flex items-center justify-center gap-2 text-[var(--text-secondary)] opacity-60 hover:opacity-100"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager ce résumé à quelqu’un qui te connaît bien
                  </button>
                </div>
             </div>
          </motion.div>
        )}

        {/* STEP: PAYMENT TRIGGER (SALES PAGE - COACH IA FOCUS) */}
        {step === 'paymentTrigger' && (
          <motion.div 
            key="paymentTrigger"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-[var(--foreground)]/5 space-y-8 relative z-10"
          >
             {/* 1. Title */}
             <div className="text-center space-y-2">
               <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest">
                  <Sparkles className="w-3 h-3" />
                  Solution Recommandée
               </div>
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)] leading-tight">
                 Votre Plan d'Action Personnalisé
               </h2>
             </div>

             {/* 2. Visual Gap */}
             <div className="bg-[var(--background)] p-6 rounded-3xl border border-[var(--foreground)]/5 space-y-4">
               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/60">
                   <span>Potentiel de Naissance</span>
                   <span className="text-emerald-600">100% Alignement</span>
                 </div>
                 <div className="h-4 w-full bg-emerald-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: "100%" }}
                     transition={{ duration: 1, ease: "easeOut" }}
                     className="h-full bg-emerald-500"
                   />
                 </div>
               </div>
               
               <div className="space-y-2 relative">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-[var(--foreground)]/60">
                   <span>Fonctionnement Actuel</span>
                   <span className="text-red-500">Zone de Friction</span>
                 </div>
                 <div className="h-4 w-full bg-red-100 rounded-full overflow-hidden">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${100 - gapScore}%` }}
                     transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                     className="h-full bg-red-500"
                   />
                 </div>
                 
                 {/* Gap Connector */}
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 1.5 }}
                   className="absolute top-8 right-[10%] transform translate-x-1/2 flex flex-col items-center"
                 >
                   <div className="h-8 w-px bg-[var(--foreground)]/20 border-l border-dashed border-[var(--foreground)]/40"></div>
                   <span className="bg-white px-2 py-1 rounded text-[10px] font-bold text-[var(--text-secondary)] shadow-sm border border-[var(--foreground)]/10 whitespace-nowrap">
                     Écart à combler
                   </span>
                 </motion.div>
               </div>
             </div>

             {/* 3. Simple Text */}
             <div className="text-center">
               <p className="text-lg text-[var(--foreground)] font-medium leading-relaxed">
                 "L'écart que vous ressentez n'est pas une fatalité. <br/>
                 <span className="text-[var(--text-secondary)] font-normal">C'est simplement la distance entre qui vous êtes vraiment et qui vous essayez d'être."</span>
               </p>
             </div>

             {/* 4. Coach Description */}
             <div className="bg-[var(--foreground)] text-white p-8 rounded-3xl relative overflow-hidden space-y-6 shadow-xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
               
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Bot className="w-8 h-8 text-[var(--accent)]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">L'Assistant Numérologique IA</h3>
                    <p className="text-white/60 text-sm">Votre guide personnel 24/7</p>
                  </div>
                </div>

                {/* VISUAL: Chat Simulation (Active) */}
                <div className="relative z-10 bg-white/5 backdrop-blur-sm rounded-2xl p-4 space-y-3 border border-white/10 my-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-white/90">
                      Je vais te poser quelques questions pour affiner mon modèle de ta personnalité. <br/><br/>
                      <span className="font-bold text-[var(--accent)]">Pourquoi as-tu ressenti ce blocage hier ?</span>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                      <span className="text-xs font-bold">{personalInfo.firstName ? personalInfo.firstName[0] : 'M'}</span>
                    </div>
                    <div className="bg-[var(--accent)]/80 rounded-2xl rounded-tr-none p-3 text-xs text-white">
                      J'avais peur de décevoir...
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 text-xs text-white/90">
                      Intéressant. Cela confirme ton axe de sensibilité. Creusons ça ensemble...
                    </div>
                  </div>
                </div>

                <div className="space-y-4 relative z-10">
                  <div className="bg-white/10 p-4 rounded-xl border border-white/5 text-center">
                    <p className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-1">PROFILAGE ACTIF</p>
                    <p className="text-sm font-bold text-white leading-relaxed">
                      IL VA VOUS POSER DES QUESTIONS. <br/>
                      <span className="font-normal opacity-80">Ce n'est pas un simple chatbot. Il vous interroge activement pour comprendre vos nuances et en déduire une <span className="text-white font-bold border-b border-[var(--accent)]">ANALYSE PSYCHOLOGIQUE DE HAUTE PRÉCISION.</span></span>
                    </p>
                  </div>
                </div>
             </div>
             
             {/* 5. What you get List (New Section from prompt) */}
             <div className="space-y-4">
               <h3 className="text-center text-sm font-black uppercase tracking-widest text-[var(--text-secondary)]">Ce que vous obtenez</h3>
               <div className="grid gap-4">
                 <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[var(--foreground)]/5 shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5" /></div>
                   <div>
                     <h4 className="font-bold text-[var(--foreground)] text-sm">Profil psychologique affiné</h4>
                     <p className="text-xs text-[var(--text-secondary)] leading-relaxed">L’IA vous pose des questions précises pour comprendre vos modes de pensée, vos réactions et vos schémas comportementaux.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[var(--foreground)]/5 shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5" /></div>
                   <div>
                     <h4 className="font-bold text-[var(--foreground)] text-sm">Identification de vos zones de friction</h4>
                     <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Découvrez où vous perdez de l’énergie et ce qui bloque votre progression.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[var(--foreground)]/5 shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5" /></div>
                   <div>
                     <h4 className="font-bold text-[var(--foreground)] text-sm">Questions-réponses personnalisées</h4>
                     <p className="text-xs text-[var(--text-secondary)] leading-relaxed">L’IA répond à vos questionnements concrets et vous guide pas à pas.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[var(--foreground)]/5 shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5" /></div>
                   <div>
                     <h4 className="font-bold text-[var(--foreground)] text-sm">Rituels quotidiens simples et concrets</h4>
                     <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Actions ciblées à réaliser en 2 minutes pour réaligner votre trajectoire.</p>
                   </div>
                 </div>
                 <div className="flex items-start gap-4 p-4 bg-white rounded-2xl border border-[var(--foreground)]/5 shadow-sm">
                   <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5" /></div>
                   <div>
                     <h4 className="font-bold text-[var(--foreground)] text-sm">Guidance IA 24/7</h4>
                     <p className="text-xs text-[var(--text-secondary)] leading-relaxed">Votre assistant reste disponible en continu pour ajuster vos micro-actions et répondre à vos doutes.</p>
                   </div>
                 </div>
               </div>
             </div>

             {/* 6. How it works */}
             <div className="space-y-4 pt-4 border-t border-[var(--foreground)]/5">
               <h3 className="text-center text-sm font-black uppercase tracking-widest text-[var(--text-secondary)]">Comment ça marche ?</h3>
               <div className="grid gap-4">
                 <StepRow number="1" title="Analyse" desc="L’Assistant IA scanne votre profil complet et identifie vos forces dormantes." />
                 <StepRow number="2" title="Identification" desc="Il pointe précisément où vous perdez de l'énergie aujourd'hui." />
                 <StepRow number="3" title="Guidance" desc="Il vous donne des actions simples pour réaligner votre trajectoire." />
               </div>
             </div>

             {/* 6. Target Audience */}
             <div className="bg-[var(--accent)]/5 p-6 rounded-3xl border border-[var(--accent)]/10 space-y-4">
               <h3 className="font-bold text-[var(--accent)] flex items-center gap-2">
                 <User className="w-5 h-5" /> Pour qui est-ce conçu ?
               </h3>
               <ul className="space-y-2 text-sm text-[var(--foreground)]/80">
                 <li className="flex gap-2">
                   <CheckCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                   Ceux qui se sentent bloqués malgré leurs efforts.
                 </li>
                 <li className="flex gap-2">
                   <CheckCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                   Ceux qui voient des schémas se répéter dans leur vie.
                 </li>
                 <li className="flex gap-2">
                   <CheckCircle className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                   Ceux qui veulent de la clarté sans passer des années en thérapie.
                 </li>
               </ul>
             </div>

             {/* Micro-Social Proof */}
             <div className="bg-white p-4 rounded-2xl border border-[var(--foreground)]/5 shadow-md text-center space-y-2">
               <div className="flex justify-center gap-1 text-amber-400">
                  <Sparkles className="w-4 h-4 fill-current" />
                  <Sparkles className="w-4 h-4 fill-current" />
                  <Sparkles className="w-4 h-4 fill-current" />
                  <Sparkles className="w-4 h-4 fill-current" />
                  <Sparkles className="w-4 h-4 fill-current" />
               </div>
               <p className="text-sm italic text-[var(--foreground)] font-medium">
                 “Mon rituel quotidien m’aide à agir plus vite et à mieux gérer mes blocages. Je ne pensais pas qu’un outil IA pouvait être aussi précis.”
               </p>
               <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest">– Jean D.</p>
             </div>

             {/* NEW SECTION: DAILY RITUAL */}
             <div className="space-y-8 py-8 border-t border-[var(--foreground)]/5">
                <div className="text-center space-y-3">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest">
                      <Sparkles className="w-3 h-3" />
                      Méthode Exclusive
                   </div>
                   <h3 className="text-2xl font-serif font-bold text-[var(--foreground)]">Ton Rituel Quotidien d’Alignement</h3>
                   <p className="text-[var(--text-secondary)] leading-relaxed max-w-lg mx-auto text-sm">
                     Comprendre ses schémas est une première étape. Mais ce sont les micro-ajustements répétés qui créent un vrai changement.
                   </p>
                </div>

                <div className="bg-[var(--background)] rounded-3xl p-6 border border-[var(--foreground)]/5 space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm shrink-0">🧠</div>
                      <div>
                        <h4 className="font-bold text-[var(--foreground)]">Pas de conseils génériques.</h4>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">
                          Chaque jour, ton coach IA personnel t’aide à recalibrer ce qui te bloque réellement avec un rituel simple, ciblé et concret.
                        </p>
                      </div>
                   </div>

                   <div className="space-y-3 pl-4 border-l-2 border-[var(--accent)]/20 ml-5">
                      <div className="space-y-1">
                        <p className="font-bold text-[var(--foreground)] text-sm">✔ Une phrase d’alignement personnalisée</p>
                        <p className="text-xs text-[var(--text-secondary)]">pour corriger un automatisme précis dans ta façon de penser.</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[var(--foreground)] text-sm">✔ Un micro-exercice pratique (2 min)</p>
                        <p className="text-xs text-[var(--text-secondary)]">pour agir là où tu bloques habituellement, sans te forcer.</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-[var(--foreground)] text-sm">✔ Une question de prise de conscience</p>
                        <p className="text-xs text-[var(--text-secondary)]">pour repérer ce qui s’est joué inconsciemment dans ta journée.</p>
                      </div>
                   </div>
                </div>

                {/* Examples Carousel / List */}
                <div className="space-y-4">
                  <h4 className="text-center text-xs font-black uppercase tracking-widest text-[var(--text-secondary)]">3 Exemples Concrets de Rituels</h4>
                  
                  <div className="grid gap-4 md:grid-cols-3">
                     {/* Ex 1 */}
                     <div className="bg-white p-4 rounded-2xl border border-[var(--foreground)]/5 shadow-sm space-y-3">
                        <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wide">Profil “Blocage d’initiative”</p>
                        <div className="space-y-2">
                           <div>
                             <p className="text-[10px] text-[var(--text-secondary)] uppercase">Phrase</p>
                             <p className="text-xs font-medium italic">« Aujourd’hui, je choisis d’agir sans attendre d’être sûr à 100 %. »</p>
                           </div>
                           <div>
                             <p className="text-[10px] text-[var(--text-secondary)] uppercase">Exercice</p>
                             <p className="text-xs">Prends une décision sans demander de validation.</p>
                           </div>
                        </div>
                     </div>
                     
                     {/* Ex 2 */}
                     <div className="bg-white p-4 rounded-2xl border border-[var(--foreground)]/5 shadow-sm space-y-3">
                        <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wide">Profil “Mental Dominant”</p>
                        <div className="space-y-2">
                           <div>
                             <p className="text-[10px] text-[var(--text-secondary)] uppercase">Phrase</p>
                             <p className="text-xs font-medium italic">« Je n’ai pas besoin de tout comprendre pour avancer. »</p>
                           </div>
                           <div>
                             <p className="text-[10px] text-[var(--text-secondary)] uppercase">Exercice</p>
                             <p className="text-xs">Fais une action aujourd’hui sans la rationaliser.</p>
                           </div>
                        </div>
                     </div>

                     {/* Ex 3 */}
                     <div className="bg-white p-4 rounded-2xl border border-[var(--foreground)]/5 shadow-sm space-y-3">
                        <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wide">Profil “Fatigue Intérieure”</p>
                        <div className="space-y-2">
                           <div>
                             <p className="text-[10px] text-[var(--text-secondary)] uppercase">Phrase</p>
                             <p className="text-xs font-medium italic">« J’écoute mon rythme au lieu de me forcer. »</p>
                           </div>
                           <div>
                             <p className="text-[10px] text-[var(--text-secondary)] uppercase">Exercice</p>
                             <p className="text-xs">Supprime volontairement une action inutile.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="text-center pt-2">
                    <p className="text-xs text-[var(--text-secondary)] italic">
                      👉 Chaque rituel est ajusté automatiquement à ton profil, ton blocage et ta phase actuelle.
                    </p>
                  </div>
                </div>

                <div className="bg-[var(--accent)]/5 p-4 rounded-xl text-center space-y-2">
                   <h4 className="font-bold text-[var(--foreground)] text-sm">🔐 Un cadre clair et sain</h4>
                   <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-md mx-auto">
                     Ce n’est pas une promesse de résultat miracle ni une thérapie. C’est un outil d’accompagnement intelligent, basé sur ton profil réel et ton vécu.
                   </p>
                </div>
             </div>

             {/* 7. Offer & Price */}
            <div className="text-center space-y-2 pt-2">
              <p className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">Offre Spéciale</p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-5xl font-black text-[var(--foreground)]">29€</span>
                <span className="text-xl text-[var(--text-secondary)] line-through decoration-red-500 decoration-2">49€</span>
              </div>
              <p className="text-[var(--accent)] font-medium">par mois</p>
            </div>

            {/* 8. CTA */}
            <div className="space-y-4">
               <button
                 onClick={() => {
                   // Save QCM answers before redirecting
                   const sessionData = {
                       moduleA_answers: moduleAAnswers,
                       gapScore: gapScore
                   };
                   localStorage.setItem('psy_mirror_session_data', JSON.stringify(sessionData));
                   
                   trackEvent('payment_initiated_coach_lp');
                   
                   // TikTok Standard Event
                   trackEvent('InitiateCheckout', {
                     contents: [{
                       content_id: 'coach_ia_30days',
                       content_type: 'product',
                       content_name: 'Coach IA - 30 Jours'
                     }],
                     value: 29,
                     currency: 'EUR'
                   });

                   // Update URL to reflect the specific offer
                   router.push('/miroir/checkout?plan=coach-30d');
                 }}
                 className="w-full py-6 bg-[var(--accent)] text-white rounded-[20px] font-black text-xl uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_-5px_rgba(185,98,31,0.5)] flex items-center justify-center gap-3"
               >
                 Démarrer mon Accompagnement <ArrowRight className="w-6 h-6" />
               </button>
                
                {/* 9. Final Phrase */}
                <div className="flex justify-center items-center gap-2 text-xs text-[var(--text-secondary)] uppercase tracking-widest opacity-60">
                  <ShieldCheck className="w-3 h-3" /> Satisfait ou Remboursé
                </div>
             </div>
          </motion.div>
        )}

        {/* STEP: COLLECT INFO */}
        {step === 'collectInfo' && (
          <motion.div 
            key="collectInfo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-[var(--foreground)]/5 space-y-10 relative z-10"
          >
            {/* Name Reward Modal */}
            <AnimatePresence>
              {showNameReward && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--background)]/95 backdrop-blur-md rounded-[50px] border border-[var(--accent)]/20"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 20 }}
                    className="text-center space-y-4 p-6"
                  >
                    <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto shadow-xl border border-[var(--accent)]/20">
                      <Sparkles className="w-10 h-10 text-[var(--accent)]" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-[var(--accent)] font-black uppercase tracking-widest text-sm">Identité Décodée</p>
                        <h3 className="text-3xl font-serif font-bold text-[var(--foreground)]">
                            Nombre d'Expression {cosmicData?.expressionNumber}
                        </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
                        Votre prénom porte la vibration de votre mission. <br/>
                        <span className="font-bold text-[var(--foreground)]">On continue l'exploration...</span>
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* City/Cosmic Reward Modal */}
            <AnimatePresence>
              {showCityReward && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 flex items-center justify-center bg-[var(--background)]/95 backdrop-blur-md rounded-[50px] border border-[var(--accent)]/20"
                >
                  <motion.div
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: 20 }}
                    className="text-center space-y-4 p-6"
                  >
                    <div className="w-20 h-20 bg-[#5B4B8A]/20 rounded-full flex items-center justify-center mx-auto shadow-xl border border-[#5B4B8A]/40">
                      <Star className="w-10 h-10 text-[#9F8FEF]" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-[#9F8FEF] font-black uppercase tracking-widest text-sm">Carte du Ciel Générée</p>
                        <h3 className="text-3xl font-serif font-bold text-[var(--foreground)]">
                           Ascendant {cosmicData?.ascendant}
                        </h3>
                    </div>
                    <p className="text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
                        Votre lieu et heure de naissance révèlent votre masque social. <br/>
                        <span className="font-bold text-[var(--foreground)]">Initialisation du Miroir Psychologique...</span>
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form Progress Bar */}
            <div className="w-full h-1.5 bg-[var(--foreground)]/5 rounded-full overflow-hidden mb-8">
              <motion.div 
                animate={{ width: `${(infoSubStep / 3) * 100}%` }}
                className="h-full bg-[var(--accent)]"
              />
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto border border-[var(--accent)]/20">
                {infoSubStep === 1 ? <User className="w-8 h-8 text-[var(--accent)]" /> : 
                 infoSubStep === 2 ? <Calendar className="w-8 h-8 text-[var(--accent)]" /> : 
                 <MapPin className="w-8 h-8 text-[var(--accent)]" />}
              </div>
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-[var(--foreground)]">
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
                    <label className="text-xs font-black uppercase tracking-widest text-[var(--accent)] ml-4">Prénom</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ton prénom"
                      value={personalInfo.firstName}
                      onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && personalInfo.firstName) {
                          handleNameSubmit();
                        }
                      }}
                      className="w-full bg-[var(--background)] border-2 border-[var(--foreground)]/5 rounded-2xl px-6 py-4 font-bold text-[var(--foreground)] focus:border-[var(--accent)] outline-none transition-all placeholder-[var(--text-secondary)]/40"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[var(--accent)] ml-4">Nom</label>
                    <input 
                      type="text" 
                      placeholder="Ton nom de famille"
                      value={personalInfo.lastName}
                      onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                      onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
                      className="w-full bg-[var(--background)] border-2 border-[var(--foreground)]/5 rounded-2xl px-6 py-4 font-bold text-[var(--foreground)] focus:border-[var(--accent)] outline-none transition-all placeholder-[var(--text-secondary)]/40"
                    />
                  </div>
                  <button 
                    onClick={() => {
                      if (personalInfo.firstName) {
                        handleNameSubmit();
                      }
                    }}
                    disabled={!personalInfo.firstName}
                    className="md:col-span-2 w-full py-5 bg-[var(--accent)] text-white rounded-2xl font-black text-lg uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_-5px_rgba(185,98,31,0.4)] flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    Découvrir mon Nombre d'Expression <ArrowRight className="w-5 h-5" />
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
                    <label className="text-xs font-black uppercase tracking-widest text-[var(--accent)] ml-4">Date de Naissance</label>
                    <input 
                      type="date" 
                      required
                      value={personalInfo.birthDate}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                      className="w-full bg-[var(--background)] border-2 border-[var(--foreground)]/5 rounded-2xl px-6 py-4 font-bold text-[var(--foreground)] focus:border-[var(--accent)] outline-none transition-all"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-[var(--accent)] ml-4">Heure de naissance</label>
                    <input 
                      type="time" 
                      value={personalInfo.birthTime}
                      onChange={(e) => setPersonalInfo({...personalInfo, birthTime: e.target.value})}
                      className="w-full bg-[var(--background)] border-2 border-[var(--foreground)]/5 rounded-2xl px-6 py-4 font-bold text-[var(--foreground)] focus:border-[var(--accent)] outline-none transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setInfoSubStep(1)}
                      className="py-5 bg-[var(--background)] text-[var(--text-secondary)] rounded-2xl font-bold hover:bg-[var(--foreground)]/5 transition-all"
                    >
                      Retour
                    </button>
                    <button 
                      onClick={() => personalInfo.birthDate && setInfoSubStep(3)}
                      disabled={!personalInfo.birthDate}
                      className="py-5 bg-[var(--accent)] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
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
                    <label className="text-xs font-black uppercase tracking-widest text-[var(--accent)] ml-4">Ville de Naissance</label>
                    <div className="relative">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]/40" />
                      <input 
                        type="text" 
                        required
                        placeholder="Ta ville"
                        value={personalInfo.birthCity}
                        onChange={(e) => setPersonalInfo({...personalInfo, birthCity: e.target.value})}
                        className="w-full bg-[var(--background)] border-2 border-[var(--foreground)]/5 rounded-2xl pl-14 pr-6 py-4 font-bold text-[var(--foreground)] focus:border-[var(--accent)] outline-none transition-all placeholder-[var(--text-secondary)]/40"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && personalInfo.birthCity && handleInfoSubmit(e as any)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setInfoSubStep(2)}
                      className="py-5 bg-[var(--background)] text-[var(--text-secondary)] rounded-2xl font-bold hover:bg-[var(--foreground)]/5 transition-all"
                    >
                      Retour
                    </button>
                    <button 
                      onClick={(e) => handleInfoSubmit(e as any)}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        if (personalInfo.birthCity) handleInfoSubmit(e as any);
                      }}
                      disabled={!personalInfo.birthCity}
                      className="py-5 bg-[var(--accent)] text-white rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 touch-manipulation active:scale-95 transition-transform"
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
            <div className="p-12 md:p-16 rounded-[60px] bg-white text-[var(--foreground)] shadow-2xl relative overflow-hidden group border border-[var(--foreground)]/5">
              <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                <Star className="w-48 h-48 text-[var(--accent)]" />
              </div>
              
              <div className="relative z-10 space-y-10">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-bold uppercase tracking-[0.3em]">
                  <Sparkles className="w-4 h-4" />
                  Potentiel de Naissance Révélé
                </div>
                
                <div className="space-y-4">
                  <p className="text-[var(--accent)] text-lg font-bold tracking-[0.2em] uppercase">
                    {cosmicData?.firstName} {cosmicData?.lastName}
                  </p>
                  <h3 className="text-5xl md:text-7xl font-serif font-bold italic">{cosmicData?.title}</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8 text-left max-w-2xl mx-auto">
                    <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/5 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Chemin de Vie {cosmicData?.pathNum}</p>
                      <p className="text-sm font-bold text-[var(--foreground)]/90">{cosmicData?.potential}</p>
                      <p className="text-xs text-[var(--text-secondary)] italic">{cosmicData?.description}</p>
                    </div>
                    {/* NEW: Expression Number Card */}
                    <div className="p-4 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Nombre d'Expression {cosmicData?.expressionNumber}</p>
                      <p className="text-sm font-bold text-[var(--foreground)]/90">{cosmicData?.expressionInsight}</p>
                      <p className="text-xs text-[var(--text-secondary)] italic">Ce que votre nom révèle de votre mission.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/5 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Soleil en {cosmicData?.sun} ({cosmicData?.sun_element})</p>
                      <p className="text-xs text-[var(--text-secondary)] italic">{cosmicData?.sun_desc}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[var(--background)] border border-[var(--foreground)]/5 space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Ascendant {cosmicData?.ascendant}</p>
                      <p className="text-xs text-[var(--text-secondary)] italic">{cosmicData?.ascendant_desc}</p>
                    </div>
                  </div>
                </div>

                <div className="max-w-xl mx-auto p-8 rounded-3xl bg-[var(--background)] border border-[var(--foreground)]/5 space-y-4">
                  <p className="text-[var(--foreground)]/80 text-xl leading-relaxed font-light">
                    "{cosmicData?.potential}"
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]/50">
                  <div className="space-y-1">
                    <p>Élément Solaire</p>
                    <p className="text-[var(--foreground)]">{cosmicData?.sun_element}</p>
                  </div>
                  <div className="space-y-1">
                    <p>Élément Lunaire</p>
                    <p className="text-[var(--foreground)]">{cosmicData?.moon_element}</p>
                  </div>
                  <div className="space-y-1">
                    <p>Ville</p>
                    <p className="text-[var(--foreground)]">{personalInfo.birthCity}</p>
                  </div>
                  <div className="space-y-1">
                    <p>Heure</p>
                    <p className="text-[var(--foreground)]">{personalInfo.birthTime}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 md:p-12 bg-white/50 backdrop-blur-md border border-[var(--foreground)]/5 rounded-[40px] space-y-6 shadow-sm text-left">
                <p className="text-[var(--foreground)]/80 text-xl font-medium leading-relaxed">
                  Maintenant que nous avons une première base,
                </p>
                <div className="h-px w-12 bg-[var(--accent)]/30"></div>
                <div className="space-y-6 text-[var(--foreground)]/70 text-lg leading-relaxed">
                  <p>
                    ce que tu viens de découvrir correspond à un extrait de ton potentiel de naissance, tel qu’il ressort de ta date de naissance <span className="text-[var(--foreground)] font-bold">(numérologie et astrologie)</span>.
                  </p>
                  <p>
                    👉 Le portrait complet est bien plus vaste et détaillé. Il sert de fondation à l’analyse, mais il ne dit pas encore comment ce potentiel s’exprime dans ta réalité actuelle, notamment lorsque tu dois décider, t’adapter ou réagir sous pression.
                  </p>
                  <p>
                    Pour comprendre cet écart éventuel, tu vas entrer dans le <span className="font-bold text-[var(--accent)]">Laboratoire des Réflexes et des choix</span>.
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <p className="font-bold text-[var(--foreground)]/80">Cette étape permet d’observer :</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                        <span>tes automatismes décisionnels</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                        <span>tes réactions spontanées</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></div>
                        <span>la cohérence (ou non) entre potentiel et fonctionnement réel</span>
                      </div>
                    </div>
                  </div>

                  <p className="italic text-sm pt-4 border-t border-[var(--foreground)]/5">
                    Il n’y a pas de bonne ou de mauvaise réponse. Il s’agit uniquement d’observer ton style naturel d’action.
                  </p>
                </div>
              </div>
              
              <button 
                onClick={proceedFromCosmic}
                className="w-full py-7 bg-[var(--accent)] text-white rounded-[30px] font-bold text-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex flex-col items-center justify-center gap-1 group"
              >
                <div className="flex items-center gap-4">
                  Entrer dans le Laboratoire
                  <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.3em] opacity-80 font-black">Durée estimée : ~10 minutes</span>
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
                  <span className="text-[var(--text-secondary)]">Partie 1: Auto-perception</span>
                  <span className="text-[var(--accent)]">Encore ~{getRemainingTime()} minutes</span>
                </div>
                <span className="text-[var(--text-secondary)]">{moduleAAnswers.length + 1} / {AUTO_PERCEPTION_ITEMS.length}</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--foreground)]/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((moduleAAnswers.length + 1) / AUTO_PERCEPTION_ITEMS.length) * 100}%` }}
                  className="h-full bg-[var(--accent)]"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight text-[var(--foreground)]">
                {AUTO_PERCEPTION_ITEMS[currentModuleIndex].prompt}
              </h2>
              <div className="grid gap-4">
                {AUTO_PERCEPTION_ITEMS[currentModuleIndex].options.map((option, idx) => (
                  <button
                    key={`${currentModuleIndex}-${idx}`}
                    onClick={() => handleModuleASelect(option)}
                    className="group flex items-center justify-between p-6 bg-white border border-[var(--foreground)]/5 rounded-3xl text-left hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] hover:shadow-xl transition-all duration-300 shadow-sm"
                  >
                    <span className="font-medium text-lg pr-4">{option.text}</span>
                    <div className="w-10 h-10 rounded-full border border-[var(--foreground)]/10 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white group-hover:border-white/30 transition-colors shrink-0 text-[var(--foreground)]">
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
                  <span className="text-[var(--text-secondary)]">Partie 2: Scénarios Réels</span>
                  <span className="text-[var(--accent)]">Encore ~{getRemainingTime()} minutes</span>
                </div>
                <span className="text-[var(--text-secondary)]">Scénario {Math.min(currentModuleIndex + 1, BEHAVIOR_SCENARIOS.length)} / {BEHAVIOR_SCENARIOS.length}</span>
              </div>
              <div className="h-1.5 w-full bg-[var(--foreground)]/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${((moduleBAnswers.length + 1) / (BEHAVIOR_SCENARIOS.length * 4)) * 100}%` }}
                  className="h-full bg-[var(--accent)]"
                />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 text-[9px] font-bold uppercase w-fit border border-red-500/20">
                <Target className="w-3 h-3" />
                Contrainte : {BEHAVIOR_SCENARIOS[currentModuleIndex].constraint}
              </div>
            </div>

            <div className="space-y-8 bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[var(--foreground)]/5">
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-widest">Le contexte</h3>
                <p className="text-xl md:text-2xl font-bold leading-tight text-[var(--foreground)]">
                  {BEHAVIOR_SCENARIOS[currentModuleIndex].steps[currentScenarioStep].context}
                </p>
              </div>
              
              <div className="grid gap-3 pt-4">
                {BEHAVIOR_SCENARIOS[currentModuleIndex].steps[currentScenarioStep].options.map((option, idx) => (
                  <button
                    key={`${currentModuleIndex}-${currentScenarioStep}-${idx}`}
                    onClick={() => handleModuleBSelect(option)}
                    className="group flex items-center justify-between p-5 bg-[var(--background)] border border-[var(--foreground)]/5 rounded-2xl text-left hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)] transition-all duration-300"
                  >
                    <span className="text-sm md:text-base font-medium pr-4">{option.text}</span>
                    <div className="w-8 h-8 rounded-full border border-[var(--foreground)]/10 flex items-center justify-center group-hover:border-white/20 shrink-0 text-[var(--foreground)] group-hover:text-white">
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
                  className="max-w-xl w-full mx-auto bg-white p-12 rounded-[50px] shadow-2xl border border-[var(--foreground)]/5 text-center space-y-10"
                >
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">
                    <span>Test {currentReflexStep + 1} / {reflexTests.length}</span>
                    <span>Encore ~{getRemainingTime()} minutes</span>
                  </div>
                  
                  <div className="w-20 h-20 bg-[var(--accent)]/10 rounded-3xl flex items-center justify-center text-[var(--accent)] mx-auto">
                    <Zap className="w-10 h-10" />
                  </div>
                  
                  <div className="space-y-4">
                    <h1 className="text-4xl font-serif font-bold text-[var(--foreground)]">
                      {reflexTests[currentReflexStep].title}
                    </h1>
                  </div>

                  <div className="text-xl text-[var(--text-secondary)] leading-relaxed">
                    {reflexTests[currentReflexStep].instruction}
                  </div>

                  <button
                    onClick={startTest}
                    className="w-full py-6 bg-[var(--foreground)] text-white rounded-full font-bold text-xl hover:bg-[var(--foreground)]/80 transition-all shadow-xl hover:scale-[1.02] active:scale-95"
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

        {/* STEP: EMAIL CAPTURE */}
        {step === 'emailCapture' && (
          <motion.div
            key="emailCapture"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white p-8 md:p-12 rounded-[50px] shadow-2xl border border-[var(--foreground)]/5 text-center space-y-10"
          >
             <div className="w-20 h-20 bg-[var(--foreground)]/5 rounded-3xl flex items-center justify-center text-[var(--foreground)] mx-auto border border-[var(--foreground)]/10">
                <ShieldCheck className="w-10 h-10" />
             </div>

             <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[var(--foreground)]">
                   Sécurisez vos résultats
                </h2>
                <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                   Vos résultats d'analyse comportementale sont prêts. Indiquez votre email pour recevoir votre synthèse gratuite et accéder à l'interprétation.
                </p>
             </div>

             <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="text-left space-y-2">
                   <label className="text-xs font-black uppercase tracking-widest text-[var(--text-secondary)] ml-4">Votre Email Personnel</label>
                   <input
                      type="email"
                      required
                      placeholder="exemple@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[var(--background)] border-2 border-[var(--foreground)]/5 rounded-2xl px-6 py-5 font-bold text-lg focus:border-[var(--accent)] outline-none transition-all text-[var(--foreground)]"
                      autoFocus
                   />
                </div>
                
                <button
                   type="submit"
                   disabled={!email || isProcessing}
                   className="w-full py-6 bg-[var(--foreground)] text-white rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                >
                   {isProcessing ? (
                     <>
                       <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                       Sauvegarde...
                     </>
                   ) : (
                     <>
                       Voir mes résultats <ArrowRight className="w-6 h-6" />
                     </>
                   )}
                </button>
                
                <p className="text-xs text-[var(--text-secondary)]/50 flex items-center justify-center gap-2">
                   <ShieldCheck className="w-3 h-3" /> Vos données restent 100% confidentielles
                </p>
             </form>
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
                className="absolute inset-0 border-4 border-[var(--foreground)]/10 border-t-[var(--foreground)] rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Zap className="w-8 h-8 text-[var(--foreground)] animate-pulse" />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-[var(--foreground)]">Analyse en cours...</h2>
              <p className="text-[var(--text-secondary)]">Le moteur calcule vos écarts comportementaux.</p>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[var(--foreground)]/20 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-[var(--foreground)]/5 max-w-md w-full text-center space-y-8"
            >
              <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center ${intermediateFeedback.type === 'insight' ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : intermediateFeedback.type === 'synthesis' ? 'bg-[var(--foreground)]/10 text-[var(--foreground)]' : 'bg-[#5B4B8A]/10 text-[#5B4B8A]'}`}>
                {intermediateFeedback.type === 'insight' ? <Target className="w-8 h-8" /> : intermediateFeedback.type === 'synthesis' ? <Brain className="w-8 h-8" /> : <Sparkles className="w-8 h-8" />}
              </div>
              <div className="space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest opacity-40 text-[var(--text-secondary)]">{intermediateFeedback.title}</h3>
                <p className="text-xl md:text-2xl font-serif font-bold italic leading-tight text-[var(--foreground)]">
                  {intermediateFeedback.message}
                </p>
              </div>
              
              {!intermediateFeedback.autoClose && (
                <button
                  onClick={handleContinueFromSynthesis}
                  className="w-full py-4 bg-[var(--foreground)] text-white rounded-full font-bold hover:scale-105 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {intermediateFeedback.type === 'synthesis' 
                    ? (step === 'moduleA' ? SYNTHESIS.MODULE_A.cta : SYNTHESIS.MODULE_B.cta) 
                    : "Continuer l'expérience"}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
              
              {intermediateFeedback.autoClose && (
                <div className="pt-4">
                  <div className="h-1 w-24 bg-[var(--foreground)]/10 mx-auto rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2, ease: "linear" }}
                      className="h-full bg-[var(--foreground)]"
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
