'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Star, 
  Activity, 
  Eye, 
  Target, 
  Sparkles, 
  ChevronDown,
  Brain,
  Download,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Repeat,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Snowflake,
  Clock,
  Compass,
  ArrowRight,
  Layout
} from 'lucide-react';
import { PsyMirrorResult } from '@/lib/psy-mirror/types';
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import PsyCoachChat from '@/components/chat/PsyCoachChat';
import { getPersonalizedLectures, TargetedLecture } from '@/lib/psy-mirror/lectures';
import PersonalityRadar from './PersonalityRadar';
import KeyNumbersSection from './design-system/KeyNumbersSection';
import PartAstroV2 from './parts/PartAstroV2';
import PartMasterNumbers from './parts/PartMasterNumbers';
import Part2Incarnation from './parts/Part2Incarnation';
import Part3KarmaV2 from './parts/Part3KarmaV2';
import Part5Future from './parts/Part5Future';
import { generateDecadeForecast } from '@/lib/numerology/modules/decade';

interface UnifiedMiroirReportProps {
  psyResult: PsyMirrorResult;
  userData: UserData;
  numerologyResult: NumerologyResult;
  etymology?: NameData | null;
}

export default function UnifiedMiroirReport({ 
  psyResult, 
  userData, 
  numerologyResult,
  etymology
}: UnifiedMiroirReportProps) {
  React.useEffect(() => {
    // Force scroll to top on mount with a small delay to ensure rendering is complete
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const [isOracleOpen, setIsOracleOpen] = React.useState(false);

  const decadeForecast = generateDecadeForecast(userData.birthDate);
  const personalizedLectures = getPersonalizedLectures(psyResult);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 pb-20 overflow-x-hidden">
      
      {/* 1. HERO REVEAL SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative border-b border-[#1A1C2E]/5 overflow-hidden bg-gradient-to-b from-white to-[#FDFBF7]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5B4B8A]/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#C9A24D]/5 blur-[120px] rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl z-10 text-center space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 backdrop-blur-sm text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <Eye className="w-4 h-4" />
            Révélation du Miroir Intégral
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] text-[#1A1C2E]">
            {userData.firstName}, <br />
            voici ton reflet complet.
          </h1>

          <div className="bg-white border border-[#1A1C2E]/5 p-8 md:p-14 rounded-[60px] shadow-[0_40px_100px_-20px_rgba(26,28,46,0.08)] relative group max-w-4xl mx-auto">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#C9A24D] text-white px-8 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              La Synthèse du Miroir
            </div>
            
            <p className="text-2xl md:text-4xl font-serif font-medium leading-relaxed italic text-[#1A1C2E] mb-10">
              "{psyResult.insights?.mirror_sentence}"
            </p>
            
            <div className="max-w-none text-[#1A1C2E] leading-relaxed text-lg md:text-xl font-normal text-left space-y-6">
              {psyResult.insights?.mirror_full?.split('\n\n').map((para: string, i: number) => (
                <p key={i} className="last:mb-0">{para.replace('### ', '')}</p>
              ))}
            </div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="pt-12 text-[#1A1C2E]/20"
          >
            <ChevronDown className="w-12 h-12 mx-auto" />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. PARTIE I : L'EMPREINTE DE NAISSANCE (POTENTIEL) */}
      <section className="py-32 px-6 bg-white border-b border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Star className="w-4 h-4" />
              Dimension I : Empreinte de Naissance & Numérologie
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Ton Code Source</h2>
            <p className="text-[#1A1C2E]/60 text-xl max-w-2xl mx-auto leading-relaxed">
              Ce que les nombres et les astres ont gravé en toi au moment de ton premier souffle. C'est ton potentiel de base, ta vibration originelle.
            </p>
          </div>

          {/* Key Numbers Grid - Numerology Focus */}
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1A1C2E]/10 pb-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#C9A24D] text-white flex items-center justify-center shadow-lg shadow-[#C9A24D]/20">
                    <Star className="w-6 h-6" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-serif font-bold italic text-[#1A1C2E]">Architecture Numérologique</h3>
                </div>
                <p className="text-[#1A1C2E]/50 text-xl max-w-2xl font-light">
                  L'analyse de vos nombres fondamentaux révèle la structure profonde de votre personnalité et les piliers de votre destin.
                </p>
              </div>
              <div className="bg-[#FAF9F7] px-8 py-4 rounded-3xl border border-[#1A1C2E]/5 flex items-center gap-4">
                <div className="text-right">
                  <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-widest">Chemin de Vie</div>
                  <div className="text-2xl font-serif font-bold text-[#1A1C2E]">{numerologyResult.lifePath}</div>
                </div>
                <div className="w-px h-10 bg-[#1A1C2E]/10"></div>
                <div className="text-left">
                  <div className="text-[10px] font-black text-[#5B4B8A] uppercase tracking-widest">Année Personnelle</div>
                  <div className="text-2xl font-serif font-bold text-[#1A1C2E]">{numerologyResult.personalYear}</div>
                </div>
              </div>
            </div>
            
            <KeyNumbersSection results={numerologyResult} userData={userData} areCardsLocked={false} />
            
            {/* Highlight Section for Numerology */}
            <div className="bg-[#1A1C2E] rounded-[60px] p-12 md:p-20 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A24D]/10 blur-[120px] rounded-full group-hover:bg-[#C9A24D]/20 transition-all duration-1000"></div>
              <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
                    Focus Destination
                  </div>
                  <h4 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                    Ta Mission de Vie <br />
                    <span className="text-[#C9A24D] italic">Niveau {numerologyResult.lifePath}</span>
                  </h4>
                  <p className="text-white/70 text-xl leading-relaxed font-light italic">
                    "Le nombre {numerologyResult.lifePath} n'est pas juste un chiffre, c'est la fréquence sur laquelle ton âme a choisi de s'incarner pour cette existence. Comprendre ce nombre, c'est comprendre le 'Pourquoi' derrière tes plus grandes aspirations."
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[40px] space-y-6">
                  <div className="text-sm font-bold uppercase tracking-widest text-[#C9A24D]">Synthèse Numérologique</div>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {numerologyResult.details?.lifePath?.description || "Votre chemin est une invitation à incarner pleinement votre vibration de naissance et à transformer vos défis en opportunités de croissance."}
                  </p>
                  <div className="pt-6 border-t border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                      <Target className="w-6 h-6" />
                    </div>
                    <div className="text-sm text-white/60">
                      Utilise cette force pour réduire l'écart observé de {100 - (psyResult.insights?.cosmic_alignment?.score || 0)}%.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Identity & Incarnation - VERTICAL CENTERED LAYOUT */}
          <div className="max-w-none space-y-24">
            <Part2Incarnation userData={userData} results={numerologyResult} />
            
            <div className="max-w-4xl mx-auto space-y-24">
              <PartMasterNumbers userData={userData} results={numerologyResult} />
              
              <div className="bg-[#FAF9F7] p-12 md:p-20 rounded-[80px] border border-[#1A1C2E]/5 space-y-12 shadow-sm text-center">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-widest">
                    Visualisation Énergétique
                  </div>
                  <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-[#1A1C2E]">Radar de Potentiel</h3>
                  <p className="text-xl text-[#1A1C2E]/40 leading-relaxed font-light max-w-2xl mx-auto">
                    Visualisation de ta distribution énergétique selon ton empreinte de naissance.
                  </p>
                </div>
                <div className="py-8 max-w-2xl mx-auto">
                  <PersonalityRadar data={numerologyResult} />
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Part3KarmaV2 userData={userData} results={numerologyResult} />
            </div>
          </div>

          {/* Astro Architecture */}
          <div className="pt-12">
            <div className="text-center mb-16 space-y-4">
              <h3 className="text-3xl md:text-5xl font-serif font-bold italic text-[#1A1C2E]">Architecture Astrale & Résonance</h3>
              <p className="text-[#1A1C2E]/60 text-lg">Le ciel au moment de ton incarnation.</p>
            </div>
            <PartAstroV2 userData={userData} results={numerologyResult} etymology={etymology} />
          </div>
        </div>
      </section>

      {/* 3. PARTIE II : LE LABORATOIRE DES COMPORTEMENTS (RÉALITÉ) */}
      <section className="py-32 px-6 bg-[#FDFBF7] border-b border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 text-[#1A1C2E] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Activity className="w-4 h-4" />
              Dimension II : Réalité Comportementale
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Laboratoire de l'Action</h2>
            <p className="text-[#1A1C2E]/60 text-xl max-w-2xl mx-auto leading-relaxed">
              L'analyse de tes choix réels. Ici, nous croisons tes réactions aux scénarios de vie et tes réflexes biologiques pour révéler ton mode de fonctionnement instinctif.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* REFLEX INSIGHTS */}
            <div className="space-y-12">
              <div className="flex items-center gap-4 border-b border-[#1A1C2E]/5 pb-6">
                <Zap className="w-6 h-6 text-[#C9A24D]" />
                <h3 className="text-3xl font-serif font-bold">Observation des Réactions sous Pression</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {psyResult.insights?.reflex_insights?.map((ri, i) => (
                  <motion.div 
                    key={i}
                    {...fadeIn}
                    className="p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 hover:shadow-2xl hover:shadow-[#1A1C2E]/5 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity text-[#1A1C2E]">
                      {ri.title.includes('Attention') && <Brain className="w-28 h-28" />}
                      {ri.title.includes('Rupture') && <Activity className="w-28 h-28" />}
                      {ri.title.includes('Risque') && <TrendingUp className="w-28 h-28" />}
                      {ri.title.includes('Agilité') && <Repeat className="w-28 h-28" />}
                    </div>

                    <div className="space-y-8 relative z-10">
                      <div className="text-[#C9A24D] text-xs font-bold uppercase tracking-[0.4em]">{ri.title}</div>
                      <h3 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-[#1A1C2E]">{ri.observation}</h3>
                      
                      <div className="pt-10 border-t border-[#1A1C2E]/5">
                        <div className="flex items-center gap-3 text-[#1A1C2E]/40 mb-5">
                          <Target className="w-5 h-5" />
                          <span className="text-xs font-bold uppercase tracking-widest text-[#1A1C2E]/80">Protocole d'Entraînement</span>
                        </div>
                        <p className="text-xl text-[#5B4B8A] italic font-medium leading-relaxed">
                          "{ri.exercise}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* BEHAVIORAL DIMENSIONS */}
            <div className="space-y-24 pt-24">
              <div className="flex items-center gap-6 border-b border-[#1A1C2E]/10 pb-8">
                <div className="w-14 h-14 rounded-2xl bg-[#C9A24D] text-white flex items-center justify-center shadow-lg">
                  <Layout className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#1A1C2E]">Analyse Comportementale</h3>
                  <p className="text-[#1A1C2E]/40 text-lg font-light">Tes piliers opérationnels en situation réelle.</p>
                </div>
              </div>

              {/* INDICES SECTION */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { label: "Indice de Cohérence", val: psyResult.indices.coherence, desc: "Capacité à aligner tes intentions et tes actes.", icon: <CheckCircle2 className="w-6 h-6" /> },
                  { label: "Indice d'Évitement", val: psyResult.indices.avoidance, desc: "Tendance à contourner les zones de friction.", icon: <TrendingUp className="w-6 h-6 rotate-180" /> },
                  { label: "Indice d'Hyper-Contrôle", val: psyResult.indices.overcontrol, desc: "Besoin de maîtriser chaque paramètre.", icon: <ShieldCheck className="w-6 h-6" /> }
                ].map((idx, i) => (
                  <div key={i} className="bg-white p-10 rounded-[40px] border border-[#1A1C2E]/5 shadow-sm text-center space-y-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] text-[#C9A24D] flex items-center justify-center mx-auto border border-[#C9A24D]/20">
                      {idx.icon}
                    </div>
                    <div className="space-y-2">
                      <div className="text-4xl font-serif font-bold text-[#1A1C2E]">{idx.val}%</div>
                      <div className="text-xs font-black uppercase tracking-widest text-[#C9A24D]">{idx.label}</div>
                    </div>
                    <p className="text-sm text-[#1A1C2E]/50 leading-relaxed">{idx.desc}</p>
                  </div>
                ))}
              </div>

              {/* BLIND SPOT & LEVER */}
              <div className="grid md:grid-cols-2 gap-12">
                <div className="p-12 md:p-16 rounded-[60px] bg-[#1A1C2E] text-white relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-full bg-[#C9A24D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest border border-red-500/30">
                      <Eye className="w-4 h-4" /> Angle Mort Détecté
                    </div>
                    <h4 className="text-3xl md:text-4xl font-serif font-bold italic text-[#C9A24D]">
                      {psyResult.insights.blind_spot_label}
                    </h4>
                    <p className="text-xl leading-relaxed font-light italic text-white/80">
                      "{psyResult.insights.blind_spot}"
                    </p>
                  </div>
                </div>
                <div className="p-12 md:p-16 rounded-[60px] bg-white border-2 border-[#C9A24D] shadow-2xl relative overflow-hidden group">
                  <div className="relative z-10 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-black uppercase tracking-widest border border-[#C9A24D]/20">
                      <Zap className="w-4 h-4" /> Levier de Transformation
                    </div>
                    <h4 className="text-3xl md:text-4xl font-serif font-bold italic text-[#1A1C2E]">
                      Ton Levier Prioritaire
                    </h4>
                    <p className="text-xl leading-relaxed font-medium text-[#1A1C2E]">
                      {psyResult.insights.lever}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-12">
                {psyResult.insights?.dimension_insights?.map((di) => (
                  <div key={di.id} className="group relative">
                    <div className="p-10 md:p-16 rounded-[60px] bg-white border border-[#1A1C2E]/5 shadow-sm hover:shadow-2xl transition-all relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/5 blur-[80px] rounded-full group-hover:bg-[#C9A24D]/10 transition-all duration-700"></div>
                      
                      <div className="relative z-10 space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <h3 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#1A1C2E]">{di.name}</h3>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-widest">Score Réel</div>
                              <div className="text-3xl font-serif font-bold text-[#1A1C2E]">{psyResult.behavior_profile[di.id]}/100</div>
                            </div>
                            <div className="w-px h-10 bg-[#1A1C2E]/10"></div>
                            <div className="text-left">
                              <div className="text-[10px] font-black text-[#5B4B8A] uppercase tracking-widest">Potentiel</div>
                              <div className="text-3xl font-serif font-bold text-[#1A1C2E]">{psyResult.self_profile[di.id]}/100</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="h-3 w-full bg-[#1A1C2E]/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              whileInView={{ width: `${psyResult.behavior_profile[di.id]}%` }}
                              className="h-full bg-gradient-to-r from-[#C9A24D] to-[#D4B46B]"
                            />
                          </div>
                          <div className="flex justify-between text-[10px] font-bold text-[#1A1C2E]/30 uppercase tracking-widest">
                            <span>Réaction Instinctive</span>
                            <span>Mise en Mouvement</span>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 pt-10 border-t border-[#1A1C2E]/5">
                          <div className="space-y-4">
                            <div className="text-xs font-black text-[#C9A24D] uppercase tracking-widest">Ce que cela révèle</div>
                            <p className="text-xl text-[#1A1C2E] leading-relaxed font-light">
                              {di.text}
                            </p>
                          </div>
                          <div className="space-y-6">
                            <div className="p-8 bg-[#FAF9F7] rounded-[30px] border border-stone-100 space-y-4">
                              <div className="text-xs font-black text-[#5B4B8A] uppercase tracking-widest">Impact sur ton quotidien</div>
                              <p className="text-[#1A1C2E]/70 leading-relaxed italic">
                                {di.id === 'D1' && "Ton dynamisme est ton moteur, mais il peut devenir ton propre frein si tu ne canalises pas l'énergie du départ vers la durée."}
                                {di.id === 'D2' && "Ta prudence face à l'inconnu te protège, mais elle crée aussi une barrière invisible entre toi et les opportunités de croissance rapide."}
                                {di.id === 'D3' && "Ton sens du détail assure la qualité, mais il sature ton attention et t'empêche de voir la vision globale nécessaire à ton alignement."}
                                {di.id === 'D4' && "Ton adaptabilité est une force, mais attention à ne pas te perdre en chemin en voulant trop satisfaire les contraintes extérieures."}
                                {di.id === 'D5' && "Ta vision est claire, mais la mise en action demande une structure plus solide pour ne pas rester au stade du rêve."}
                                {di.id === 'D6' && "Ton empathie est précieuse, mais elle ne doit pas se transformer en surcharge émotionnelle qui bloquerait ton propre élan."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: LECTURES CIBLÉES */}
      <section className="py-32 px-6 bg-white border-b border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 border border-[#5B4B8A]/20 text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Brain className="w-4 h-4" />
              Dimension III : Lectures Ciblées
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Analyses Approfondies</h2>
            <p className="text-[#1A1C2E]/60 text-xl max-w-2xl mx-auto leading-relaxed">
              Sept lectures ciblées pour explorer l'écart entre ton potentiel et tes modes d'adaptation réels.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-16">
            {personalizedLectures.map((lecture: TargetedLecture, index: number) => (
              <motion.div 
                key={lecture.id}
                {...fadeIn}
                className="p-10 md:p-16 rounded-[60px] bg-[#FAF9F7] border border-[#1A1C2E]/5 hover:shadow-2xl transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <lecture.icon className="w-48 h-48" />
                </div>

                <div className="relative z-10 space-y-12">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#1A1C2E] text-white flex items-center justify-center">
                        <lecture.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#1A1C2E]">{lecture.title}</h3>
                        <p className="text-[#C9A24D] font-medium italic">{lecture.subtitle}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {lecture.questions.map((q: string) => (
                        <span key={q} className="text-[9px] font-bold px-2 py-1 rounded-md bg-[#1A1C2E]/5 text-[#1A1C2E]/40 uppercase">
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#1A1C2E]/40">🧠 Lecture fonctionnelle</h4>
                        <p className="text-xl text-[#1A1C2E] leading-relaxed font-light italic">
                          "{lecture.functionalReading}"
                        </p>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-[#C9A24D]">🔭 Mise en perspective potentiel ↔ adaptation</h4>
                        <p className="text-lg text-[#1A1C2E]/70 leading-relaxed">
                          {lecture.perspective}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white p-10 rounded-[40px] border border-[#1A1C2E]/10 shadow-sm space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Compass className="w-5 h-5 text-[#5B4B8A]" />
                          <h4 className="text-xs font-black uppercase tracking-widest text-[#5B4B8A]">Expérimentation Proposée</h4>
                        </div>
                        <div className="text-[10px] font-bold text-[#C9A24D] uppercase px-3 py-1 bg-[#C9A24D]/10 rounded-full">
                          {lecture.exercise.duration}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-2xl font-serif font-bold italic text-[#1A1C2E]">{lecture.exercise.title}</p>
                        <ul className="space-y-3">
                          {lecture.exercise.steps.map((step: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-[#1A1C2E]/70">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D] mt-2 shrink-0" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-6 border-t border-[#1A1C2E]/5">
                        <p className="text-sm font-medium text-[#1A1C2E]/40 uppercase tracking-widest mb-1">Objectif</p>
                        <p className="text-[#5B4B8A] font-medium">{lecture.exercise.objective}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PARTIE III : LA DISSONANCE DE DESTINÉE (SYNTHÈSE) */}
      {psyResult.insights?.cosmic_alignment && (
        <section className="py-32 px-6 relative overflow-hidden bg-white border-b border-[#1A1C2E]/5">
          <div className="max-w-4xl mx-auto relative z-10 space-y-24">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
                Synthèse Ultime
              </div>
              <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#1A1C2E]">
                L'Alignement Sacré
              </h2>
              <p className="text-[#1A1C2E]/60 text-2xl max-w-2xl mx-auto leading-relaxed font-light">
                Le point de rencontre entre ton <span className="text-[#C9A24D] font-medium">Code Source</span> (Potentiel) et ton <span className="text-[#5B4B8A] font-medium">Mode Réflexe</span> (Réalité).
              </p>
            </div>

            <div className="space-y-24">
              {/* Massive Venn Diagram / Visual Intersection */}
              <div className="relative flex flex-col items-center justify-center py-20">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#C9A24D]/5 to-transparent blur-[120px] rounded-full"></div>
                
                <div className="relative w-full max-w-[600px] aspect-square flex items-center justify-center">
                  {/* Potentiel Circle */}
                  <motion.div 
                    animate={{ x: [-20, -40, -20], y: [0, 10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute left-0 w-2/3 aspect-square rounded-full bg-white border-2 border-[#C9A24D] shadow-[0_0_60px_rgba(201,162,77,0.15)] flex flex-col items-center justify-center p-10 z-10 backdrop-blur-sm bg-white/80"
                  >
                    <div className="text-[#C9A24D] text-[10px] font-black uppercase tracking-widest mb-4">Potentiel de Naissance</div>
                    <div className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E] mb-2">{psyResult.insights.cosmic_alignment.astroElement}</div>
                    <div className="w-12 h-px bg-[#C9A24D]/30 mb-4"></div>
                    <p className="text-center text-xs text-[#1A1C2E]/40 leading-relaxed uppercase tracking-widest">Vibration Originelle</p>
                  </motion.div>

                  {/* Réalité Circle */}
                  <motion.div 
                    animate={{ x: [20, 40, 20], y: [0, -10, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute right-0 w-2/3 aspect-square rounded-full bg-white border-2 border-[#5B4B8A] shadow-[0_0_60px_rgba(91,75,138,0.15)] flex flex-col items-center justify-center p-10 z-10 backdrop-blur-sm bg-white/80"
                  >
                    <div className="text-[#5B4B8A] text-[10px] font-black uppercase tracking-widest mb-4">Réalité du Labo</div>
                    <div className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E] mb-2">{psyResult.insights.cosmic_alignment.bioElement}</div>
                    <div className="w-12 h-px bg-[#5B4B8A]/30 mb-4"></div>
                    <p className="text-center text-xs text-[#1A1C2E]/40 leading-relaxed uppercase tracking-widest">Fonctionnement Actuel</p>
                  </motion.div>

                  {/* Intersection Center */}
                  <div className="relative z-20 flex flex-col items-center bg-white border-4 border-[#1A1C2E] px-10 py-8 rounded-[40px] shadow-2xl scale-110">
                    <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-[0.5em] mb-2">Alignement</div>
                    <div className="text-6xl md:text-8xl font-black text-[#1A1C2E] tracking-tighter">
                      {psyResult.insights.cosmic_alignment.score}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Massive Interpretation Content */}
              <div className="grid grid-cols-1 gap-12">
                <div className="p-12 md:p-20 rounded-[80px] bg-[#1A1C2E] text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A24D]/10 blur-[120px] rounded-full"></div>
                  
                  <div className="relative z-10 space-y-12">
                    <div className="flex items-center gap-6">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl ${psyResult.insights.cosmic_alignment.score > 70 ? 'bg-green-500 text-white' : 'bg-[#C9A24D] text-white'}`}>
                        {psyResult.insights.cosmic_alignment.score > 70 ? <CheckCircle2 className="w-10 h-10" /> : <Zap className="w-10 h-10" />}
                      </div>
                      <h4 className="text-4xl md:text-6xl font-serif font-bold italic">
                        {psyResult.insights.cosmic_alignment.title}
                      </h4>
                    </div>

                    <div className="space-y-10">
                      <p className="text-2xl md:text-4xl leading-relaxed font-light italic border-l-4 border-[#C9A24D] pl-10">
                        "{psyResult.insights.cosmic_alignment.text}"
                      </p>

                      <div className="grid md:grid-cols-2 gap-16 pt-10">
                        <div className="space-y-6">
                          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full text-[#C9A24D] text-xs font-black uppercase tracking-widest">
                            L'Origine du Désalignement
                          </div>
                          <p className="text-xl text-white/70 leading-relaxed font-light">
                            {psyResult.insights.cosmic_alignment.origin}
                          </p>
                          <p className="text-lg text-white/50 italic">
                            Cet écart n'est pas un échec, c'est une adaptation. Ton intelligence biologique a créé des mécanismes de protection qui, aujourd'hui, brident ta vibration originelle.
                          </p>
                        </div>
                        <div className="space-y-6">
                          <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#C9A24D]/20 rounded-full text-[#C9A24D] text-xs font-black uppercase tracking-widest">
                            La Clé de Récupération
                          </div>
                          <p className="text-xl text-white/90 leading-relaxed font-medium">
                            {psyResult.insights.cosmic_alignment.remedy}
                          </p>
                          <div className="p-8 bg-white/5 rounded-[30px] border border-white/10">
                            <div className="text-xs font-bold text-[#C9A24D] uppercase tracking-widest mb-2">Conseil Miroir</div>
                            <p className="text-white/60 italic leading-relaxed">
                              "Pour retrouver tes 100%, tu ne dois pas changer qui tu es, mais désapprendre qui tu as cru devoir devenir pour survivre."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Depth: Potential vs Reality Analysis */}
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="p-12 rounded-[60px] bg-[#FDFBF7] border border-stone-200 space-y-8">
                    <h5 className="text-2xl font-serif font-bold text-[#1A1C2E]">La Tension Observable</h5>
                    <p className="text-[#1A1C2E]/70 leading-relaxed text-lg font-light">
                      Ton score de {psyResult.insights.cosmic_alignment.score}% indique que ton énergie vitale est actuellement canalisée à travers un filtre de protection. Cela se traduit par une sensation de <span className="font-bold text-[#1A1C2E]">frein à main serré</span> : tu sais ce que tu vaux, tu vois ta destination, mais le passage à l'action est coûteux nerveusement.
                    </p>
                  </div>
                  <div className="p-12 rounded-[60px] bg-white border border-[#C9A24D]/20 shadow-xl space-y-8">
                    <h5 className="text-2xl font-serif font-bold text-[#C9A24D]">Le Levier de Puissance</h5>
                    <p className="text-[#1A1C2E]/70 leading-relaxed text-lg font-light">
                      En appliquant le protocole de 7 jours, tu vas progressivement "rassurer" ton système nerveux. L'objectif est de faire passer ton alignement à <span className="font-bold text-[#C9A24D]">plus de 80%</span> dans les 3 prochains mois pour retrouver une fluidité totale dans tes décisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. PARTIE IV : LE CHEMIN DE RÉALIGNEMENT (ACTION) */}
      <section className="py-32 px-6 bg-[#1A1C2E]/[0.02] border-b border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-24">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 border border-[#5B4B8A]/20 text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Compass className="w-4 h-4" />
              Dimension IV : Réalignement & Futur
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Le Plan d'Action</h2>
          </div>

          <div className="grid grid-cols-1 gap-24">
            {/* 7-Day Protocol */}
            <div className="space-y-16 max-w-5xl mx-auto w-full">
              <div className="space-y-6 text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
                  Protocole de Transformation
                </div>
                <h3 className="text-4xl md:text-8xl font-serif font-bold italic tracking-tight text-[#1A1C2E] leading-tight">
                  Ton Plan d'Action <br />
                  <span className="text-[#C9A24D]">sur 7 Jours</span>
                </h3>
                <p className="text-[#1A1C2E]/60 text-xl max-w-3xl mx-auto leading-relaxed font-light">
                  Voici ta feuille de route concrète. Chaque jour, un levier spécifique est actionné pour réduire l'écart entre ton fonctionnement actuel et ton potentiel originel. Ne cherche pas la perfection, cherche la répétition.
                </p>
              </div>

              <div className="grid gap-12 relative">
                {/* Vertical Line for Desktop */}
                <div className="hidden md:block absolute left-12 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A24D]/50 via-[#C9A24D]/20 to-transparent"></div>

                {psyResult.insights?.plan_7_days?.map((step, i) => (
                  <motion.div 
                    key={i}
                    {...fadeIn}
                    className="relative p-10 md:p-16 rounded-[70px] bg-white border border-[#1A1C2E]/5 shadow-xl hover:shadow-2xl transition-all group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#C9A24D]/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#C9A24D]/10 transition-all duration-700"></div>
                    
                    <div className="flex flex-col md:flex-row items-start gap-12 relative z-10">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="text-xs font-black text-[#C9A24D] uppercase tracking-[0.5em] mb-4">JOUR</div>
                        <div className="w-24 h-24 rounded-[40px] bg-[#1A1C2E] text-white flex items-center justify-center text-5xl font-serif font-bold shadow-2xl group-hover:bg-[#C9A24D] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                          {i + 1}
                        </div>
                      </div>
                      
                      <div className="space-y-10 flex-1">
                        <div className="space-y-4">
                          <div className="text-[#C9A24D] text-xs font-black uppercase tracking-[0.4em]">Objectif du Jour</div>
                          <h4 className="text-3xl md:text-6xl font-serif font-bold text-[#1A1C2E] leading-tight italic group-hover:text-[#C9A24D] transition-colors">
                            {step.action}
                          </h4>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-12 pt-10 border-t border-[#1A1C2E]/5">
                          <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#C9A24D] text-xs font-black uppercase tracking-[0.3em]">
                              <Brain className="w-4 h-4" /> L'Enjeu Psychologique
                            </div>
                            <div className="space-y-4">
                              <p className="text-[#1A1C2E]/80 leading-relaxed text-xl font-light italic border-l-2 border-[#C9A24D]/20 pl-6">
                                {i === 0 && "Il s'agit de briser le cercle vicieux de l'hyper-contrôle matinal. En déléguant une tâche dès le début de journée, tu envoies un signal fort à ton cerveau : tu n'as pas besoin de tout porter seul pour être en sécurité."}
                                {i === 1 && "Le stress s'accumule souvent par une respiration superficielle. En imposant ces pauses respiratoires, tu forces ton système nerveux à repasser en mode 'parasympathique', le mode de la clarté et du calme."}
                                {i === 2 && "L'observation sans jugement est la clé de la dé-identification. Tu n'es pas tes pensées, tu es celui qui les regarde. Cet exercice réduit instantanément la charge mentale liée à l'auto-critique."}
                                {i === 3 && "Ton intuition est un muscle atrophié par l'analyse. En décidant vite pour des choses sans gravité, tu réapprends à faire confiance à ta première impulsion, celle qui vient directement de ton Code Source."}
                                {i === 4 && "Ton corps stocke tes résistances. En relâchant les tensions physiques, tu libères des blocages émotionnels. C'est le principe de la rétroaction biologique : un corps détendu amène un esprit serein."}
                                {i === 5 && "La stagnation vient souvent de la routine. En changeant ta manière de faire une tâche simple, tu crées de nouvelles connexions neuronales et tu réintroduis du jeu dans ton fonctionnement."}
                                {i === 6 && "L'ancrage final consiste à célébrer le chemin parcouru. Reconnaître tes victoires sur ton désalignement est indispensable pour que ton subconscient accepte ces nouveaux schémas comme bénéfiques."}
                              </p>
                            </div>
                          </div>
                          <div className="space-y-6">
                            <div className="flex items-center gap-3 text-[#5B4B8A] text-xs font-black uppercase tracking-[0.3em]">
                              <Activity className="w-4 h-4" /> Le Protocole Pratique
                            </div>
                            <div className="bg-[#FAF9F7] p-10 rounded-[40px] border border-[#1A1C2E]/5 text-[#1A1C2E] leading-relaxed text-lg shadow-inner group-hover:border-[#C9A24D]/20 transition-all">
                              <div className="font-bold text-[#5B4B8A] mb-4 text-sm">Action Concrète :</div>
                              {i === 0 && "Choisis une tâche que tu as l'habitude de surveiller de près. Confie-la totalement. Ne demande pas de nouvelles avant la fin de journée. Observe l'angoisse monter, puis redescendre."}
                              {i === 1 && "Règle une alarme toutes les 2 heures. À chaque sonnerie, prends 3 inspirations profondes par le nez, et expire longuement par la bouche. Ressens ton rythme cardiaque ralentir."}
                              {i === 2 && "Prends un carnet. Note 3 pensées récurrentes qui te freinent. Ne cherche pas à les contredire, écris juste : 'Je remarque que j'ai la pensée que...'. Prends de la distance."}
                              {i === 3 && "Ne lis pas la carte en entier. Commande le premier plat qui attire ton regard. Dans un magasin, prends l'article sans comparer les prix pendant 10 minutes. Fais confiance au premier choix."}
                              {i === 4 && "Place un post-it sur ton écran ou un rappel téléphone. À chaque fois que tu le vois, fais un scan rapide : épaules, mâchoire, ventre. Relâche tout pendant 10 secondes."}
                              {i === 5 && "Si tu es droitier, utilise ta main gauche. Prends un autre chemin pour aller travailler. Change l'ordre de ta routine matinale. Casse les automatismes pour réveiller ta vigilance."}
                              {i === 6 && "Relis tes notes de la semaine. Identifie le moment où tu t'es senti le plus 'aligné'. Écris une lettre à toi-même pour te promettre de garder cette habitude comme priorité."}
                            </div>
                          </div>
                        </div>

                        {/* Additional value add */}
                        <div className="pt-8 flex flex-wrap gap-4">
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600 px-4 py-2 rounded-full border border-green-100">
                            <CheckCircle2 className="w-3 h-3" /> Bénéfice : {i === 0 ? "Libération Mentale" : i === 1 ? "Clarté de Vision" : i === 2 ? "Paix Intérieure" : i === 3 ? "Confiance Instinctive" : i === 4 ? "Vitalité Physique" : i === 5 ? "Innovation Neuronale" : "Ancrage de Réussite"}
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-stone-50 text-stone-400 px-4 py-2 rounded-full border border-stone-100">
                            <Clock className="w-3 h-3" /> Durée : {i === 1 || i === 4 ? "Toute la journée" : "15-20 min"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decade Forecast */}
            <div className="space-y-24 max-w-5xl mx-auto w-full pt-32 border-t border-[#1A1C2E]/5">
              <div className="space-y-6 text-center mb-16">
                <h3 className="text-4xl md:text-7xl font-serif font-bold italic tracking-tight text-[#1A1C2E]">
                  Ta Trajectoire <br />
                  <span className="text-[#C9A24D]">à 10 ans</span>
                </h3>
                <p className="text-[#1A1C2E]/60 text-xl max-w-3xl mx-auto leading-relaxed font-light">
                  Comprendre les cycles de ton existence te permet de naviguer avec intention plutôt que de subir le courant. Voici tes prochaines étapes majeures.
                </p>
              </div>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#C9A24D]/50 via-[#C9A24D]/20 to-transparent hidden md:block"></div>

                <div className="space-y-16 relative">
                  {decadeForecast.map((yearData, i) => (
                    <motion.div 
                      key={i}
                      {...fadeIn}
                      className={`flex flex-col items-center gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} group`}
                    >
                      {/* Year Bubble */}
                      <div className="w-full md:w-1/2 flex justify-center items-center">
                        <div className="relative">
                          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white border-2 border-[#C9A24D] flex flex-col items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500 z-10 relative">
                            <div className="text-3xl md:text-4xl font-black text-[#1A1C2E]">{yearData.year}</div>
                            <div className="text-[10px] text-[#C9A24D] font-black uppercase tracking-widest mt-2">Année {yearData.personalYear}</div>
                          </div>
                          {/* Connection Dot */}
                          <div className="hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#C9A24D] border-4 border-white shadow-md z-20 transition-all duration-500 group-hover:scale-150" 
                               style={i % 2 === 0 ? { right: '-20px' } : { left: '-20px' }}></div>
                        </div>
                      </div>

                      {/* Content Card */}
                      <div className="w-full md:w-1/2">
                        <div className={`p-10 md:p-12 rounded-[50px] bg-white border border-[#1A1C2E]/5 shadow-sm hover:shadow-2xl transition-all duration-500 group-hover:border-[#C9A24D]/20 ${i % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                          <div className="space-y-4">
                            <div className="text-[#C9A24D] text-xs font-black uppercase tracking-[0.4em] mb-2">Cycle Vibratoire</div>
                            <h4 className="text-2xl md:text-3xl font-serif font-bold text-[#1A1C2E] leading-tight italic">{yearData.theme}</h4>
                            <p className="text-[#1A1C2E]/60 text-lg font-light leading-relaxed">
                              {yearData.mantra}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="max-w-4xl mx-auto space-y-12 pt-12">
                  <div className="w-full">
                    <Part5Future userData={userData} results={numerologyResult} />
                  </div>
                  
                  <div className="bg-[#1A1C2E] p-12 md:p-20 rounded-[80px] text-white space-y-10 shadow-2xl relative overflow-hidden flex flex-col justify-center text-center">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A24D]/10 blur-[120px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#5B4B8A]/10 blur-[120px] rounded-full"></div>
                    
                    <div className="space-y-6 relative z-10">
                      <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#C9A24D]/20 text-[#C9A24D] text-[12px] font-black uppercase tracking-[0.4em] border border-[#C9A24D]/30">
                        Conseil Stratégique
                      </div>
                      <h4 className="text-4xl md:text-6xl font-serif font-bold italic">Maîtrise tes cycles</h4>
                      <p className="text-white/60 text-xl leading-relaxed font-light italic max-w-3xl mx-auto">
                        "L'alignement n'est pas un état permanent, c'est une navigation. Utilise ces cycles comme une boussole pour ajuster ton cap plutôt que de subir le courant. Chaque année possède une vibration qui peut soit te freiner, soit te porter : choisis d'être le capitaine."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. THE ORACLE - AI CHAT */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#C9A24D]/10 border border-[#C9A24D]/20 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Sparkles className="w-5 h-5" />
              Soutien Illimité
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#1A1C2E]">L'Oracle du Miroir</h2>
            <p className="text-[#1A1C2E]/80 text-2xl font-light max-w-3xl mx-auto leading-relaxed">
              Discutez avec l'intelligence qui a analysé votre empreinte et vos réflexes pour lever vos derniers blocages.
            </p>
          </div>

          <div className="p-2 bg-[#FDFBF7] border border-[#1A1C2E]/5 rounded-[70px] shadow-[0_40px_120px_-20px_rgba(0,0,0,0.05)]">
            <PsyCoachChat psyResult={psyResult} userData={userData} numerologyResult={numerologyResult} />
          </div>
        </div>
      </section>

      {/* FINAL ACTIONS */}
      <section className="py-24 px-6 border-t border-[#1A1C2E]/5 bg-white text-center space-y-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-8 text-[#1A1C2E] text-lg md:text-xl leading-relaxed">
            <p>
              Ce rapport te donne une lecture structurée de ton thème et met en lumière certaines dynamiques clés.
            </p>
            <p>
              Certaines personnes choisissent ensuite de mettre cette lecture en pratique dans leur quotidien.
            </p>
            <p>
              Pour cela, il existe un parcours de 12 mois, composé d’exercices concrets, de temps de réflexion guidés et de points de lecture réguliers, pensés pour expérimenter, ajuster et observer son évolution au fil des cycles personnels.
            </p>
            <p className="font-medium">
              Ce parcours est une démarche volontaire de progression personnelle, basée sur l’observation et l’expérimentation.
            </p>
          </div>

          <div className="pt-8">
            <button 
              onClick={() => window.location.href = '/parcours-12-mois'}
              className="group relative inline-flex items-center gap-4 px-12 py-8 bg-[#C9A24D] text-white rounded-full font-bold text-2xl shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95"
            >
              <span>Découvrir le parcours de 12 mois</span>
              <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </div>
      </section>
      
      {/* FLOATING ORACLE BUTTON */}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
        {isOracleOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[90vw] md:w-[450px] h-[600px] bg-white rounded-[40px] shadow-2xl border border-[#1A1C2E]/10 overflow-hidden mb-4 flex flex-col"
          >
            <div className="p-6 bg-[#1A1C2E] text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A24D] flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-sm font-bold uppercase tracking-widest">L'Oracle du Miroir</div>
              </div>
              <button 
                onClick={() => setIsOracleOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ChevronDown className="w-6 h-6 rotate-180" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <PsyCoachChat psyResult={psyResult} userData={userData} numerologyResult={numerologyResult} />
            </div>
          </motion.div>
        )}
        
        <button 
          onClick={() => setIsOracleOpen(!isOracleOpen)}
          className={`group flex items-center gap-4 px-8 py-5 rounded-full font-bold text-lg shadow-2xl transition-all hover:scale-105 active:scale-95 ${isOracleOpen ? 'bg-white text-[#1A1C2E] border border-[#1A1C2E]/10' : 'bg-[#1A1C2E] text-white'}`}
        >
          {!isOracleOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              className="overflow-hidden whitespace-nowrap"
            >
              Poser une question à l'Oracle
            </motion.div>
          )}
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-500 ${isOracleOpen ? 'rotate-180 bg-[#1A1C2E] text-white' : 'bg-[#C9A24D] text-white group-hover:rotate-12'}`}>
            <Brain className="w-5 h-5" />
          </div>
        </button>
      </div>

    </div>
  );
}
