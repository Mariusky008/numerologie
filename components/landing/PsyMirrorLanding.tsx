'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Target, 
  Search, 
  ShieldCheck, 
  FileText, 
  Video, 
  Zap,
  ChevronDown,
  Brain,
  Eye,
  Sparkles,
  Layers,
  Activity,
  MessageSquare,
  Clock,
  UserCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PsyMirrorLanding() {
  const router = useRouter();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#0F111A] text-[#FDFBF7] font-sans selection:bg-[#C9A24D]/30">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-gradient-to-b from-[#161925] to-[#0F111A]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5B4B8A]/30 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C9A24D]/15 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-screen"></div>
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="max-w-5xl z-10 text-center space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#C9A24D] text-xs font-bold uppercase tracking-[0.3em] mb-4 shadow-[0_0_20px_rgba(201,162,77,0.1)]"
          >
            <Sparkles className="w-4 h-4" />
            L'Expérience Miroir Psychologique
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-9xl font-serif font-bold tracking-tight leading-[1.05] bg-gradient-to-b from-white via-white to-[#C9A24D]/50 bg-clip-text text-transparent"
          >
            Tu ne te connais pas <br />
            <span className="italic text-[#C9A24D]">encore.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/70 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
          >
            Découvre l'écart invisible entre ton intention consciente et tes réflexes réels face à la pression. 
            Une immersion de 20 minutes pour voir ton <span className="text-white font-medium">véritable reflet.</span>
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="group relative flex items-center gap-4 px-12 py-6 bg-[#C9A24D] text-[#08090F] rounded-full font-bold text-xl hover:bg-[#D4B46B] transition-all shadow-[0_20px_60px_rgba(201,162,77,0.4)] hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              Entrer dans l'expérience
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-8 text-[11px] text-white/40 uppercase tracking-[0.25em] font-bold">
              <span className="flex items-center gap-2"><ClockIcon className="w-4 h-4" /> 20 Minutes</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Privé & Sécurisé</span>
              <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Accès Immédiat</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 md:right-20 w-48 h-48 md:w-80 md:h-80 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-full blur-[2px] backdrop-blur-sm z-0 pointer-events-none hidden md:block"
        ></motion.div>

        <motion.button 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 text-white/30 hover:text-[#C9A24D] transition-colors z-10"
        >
          <ChevronDown className="w-10 h-10" />
        </motion.button>
      </section>

      {/* 2. COMPARISON SECTION - LIGHTER PURPLE GRADIENT */}
      <section className="py-32 px-6 relative bg-gradient-to-b from-[#0F111A] via-[#1A1C2E] to-[#0F111A]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic">La fin des tests déclaratifs.</h2>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Un test classique vous demande ce que vous pensez. Le Miroir observe ce que vous faites.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-12 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-8 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                <XCircle className="w-7 h-7 text-red-400/50" />
              </div>
              <h3 className="font-serif text-3xl font-bold uppercase tracking-widest text-white/40">Approche Classique</h3>
              <ul className="space-y-6">
                {[
                  "Questions théoriques subjectives",
                  "Classement dans une case prédéfinie",
                  "Rapport statique sans action",
                  "Biais de désirabilité sociale"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-white/40 items-center font-light text-lg">
                    <div className="w-1.5 h-1.5 bg-white/20 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-12 rounded-[50px] bg-gradient-to-br from-[#2A2D45] to-[#161925] border-2 border-[#C9A24D]/40 shadow-[0_40px_80px_rgba(0,0,0,0.6)] space-y-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="px-4 py-1.5 bg-[#C9A24D] text-[#08090F] text-[11px] font-bold rounded-full uppercase tracking-[0.2em]">Technologie Active</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#C9A24D]/20 flex items-center justify-center">
                <Zap className="w-7 h-7 text-[#C9A24D]" />
              </div>
              <h3 className="font-serif text-3xl font-bold uppercase tracking-widest text-[#C9A24D]">Le Miroir Actif™</h3>
              <ul className="space-y-6">
                {[
                  "Mise en situation réelle (Scénarios)",
                  "Analyse des réflexes sous pression",
                  "Détection des angles morts invisibles",
                  "Plan d'action concret sur 7 jours"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-white/90 items-center font-medium text-lg">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS SECTION */}
      <section className="py-32 px-6 bg-[#161925]/80 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[30%] h-[100%] bg-[#C9A24D]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Le Voyage Intérieur</h2>
            <p className="text-white/50 text-xl">Trois étapes pour briser la vitre et voir la réalité.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                step: "Phase 01",
                title: "Auto-Perception",
                desc: "Définition de votre image consciente. Ce que vous croyez être et comment vous justifiez vos choix.",
                icon: <Eye className="w-10 h-10" />
              },
              {
                step: "Phase 02",
                title: "Réflexes de Crise",
                desc: "Série de scénarios immersifs où le temps et l'enjeu forcent votre cerveau à révéler ses vrais patterns.",
                icon: <Activity className="w-10 h-10" />
              },
              {
                step: "Phase 03",
                title: "La Révélation",
                desc: "Analyse des écarts. Nous superposons votre perception et vos actes pour créer votre Miroir.",
                icon: <Layers className="w-10 h-10" />
              }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group space-y-8"
              >
                <div className="w-24 h-24 rounded-[35px] bg-white/5 border border-white/10 flex items-center justify-center mb-10 group-hover:border-[#C9A24D]/60 group-hover:bg-[#C9A24D]/15 transition-all duration-700 relative">
                  <div className="absolute inset-0 bg-[#C9A24D]/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 text-white/50 group-hover:text-[#C9A24D] transition-colors">{s.icon}</div>
                </div>
                <div className="text-[#C9A24D] text-sm font-bold uppercase tracking-[0.4em]">{s.step}</div>
                <h3 className="text-3xl font-serif font-bold">{s.title}</h3>
                <p className="text-white/50 text-lg leading-relaxed font-light">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: VIRTUAL COACH SECTION - LIGHTER AND INTERACTIVE */}
      <section className="py-40 px-6 relative bg-gradient-to-br from-[#1A1C2E] via-[#252841] to-[#1A1C2E] overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#C9A24D]/10 blur-[150px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#5B4B8A]/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1 space-y-10"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#C9A24D]/20 border border-[#C9A24D]/30 text-[#C9A24D] text-xs font-bold uppercase tracking-[0.3em]">
                <MessageSquare className="w-4 h-4" />
                Coaching Illimité
              </div>
              
              <h2 className="text-5xl md:text-7xl font-serif font-bold leading-tight">
                L'Oracle du Miroir : <br />
                <span className="text-[#C9A24D] italic text-4xl md:text-6xl">Votre coach virtuel personnel.</span>
              </h2>
              
              <p className="text-white/70 text-xl leading-relaxed font-light">
                Au-delà de votre rapport, accédez à une intelligence conversationnelle qui <span className="text-white font-medium">connaît parfaitement votre dossier.</span> Posez toutes vos questions, levez vos blocages et passez à l'action.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C9A24D]">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">2 Heures de Dialogue</h4>
                  <p className="text-white/40 font-light">Une session profonde pour explorer chaque recoin de votre analyse et de votre psychologie.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C9A24D]">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">Exercices sur-mesure</h4>
                  <p className="text-white/40 font-light">L'Oracle conçoit des exercices pratiques basés sur vos propres scénarios et vos blocages réels.</p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C9A24D]">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">Connaissance du Dossier</h4>
                  <p className="text-white/40 font-light">Le coach virtuel analyse vos 6 dimensions et votre angle mort avant même que vous ne parliez.</p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#C9A24D]">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold">Réponses Immédiates</h4>
                  <p className="text-white/40 font-light">Plus d'attente. Obtenez une clarté totale sur vos interrogations dès que vous en avez besoin.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex-1 w-full flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-md bg-[#0F0B15] rounded-[60px] border border-[#C9A24D]/20 shadow-[0_60px_120px_-20px_rgba(201,162,77,0.2)] p-8 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A24D]/50 to-transparent"></div>
                
                {/* Chat Mockup */}
                <div className="space-y-6 mt-8">
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 max-w-[80%]">
                      <p className="text-sm italic text-white/60 font-serif leading-relaxed">"J'ai analysé ton dossier. Ton angle mort sur l'Impulsion sous-estimée freine ta croissance. Veux-tu un exercice pour stabiliser tes décisions ?"</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-[#C9A24D]/20 p-4 rounded-2xl border border-[#C9A24D]/30 max-w-[80%]">
                      <p className="text-sm text-white font-medium">"Oui, comment je peux faire quand je suis sous pression le matin ?"</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 max-w-[80%]">
                      <p className="text-sm italic text-white/60 font-serif leading-relaxed">"Voici un protocole en 3 respirations. Dès que tu reçois un mail urgent, applique cette règle..."</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-xs uppercase tracking-widest text-white/40 font-bold">L'Oracle est en ligne</span>
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-full text-[10px] text-[#C9A24D] font-bold uppercase tracking-widest border border-[#C9A24D]/20">Inclus dans l'expérience</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. REVELATION SECTION - LIGHTER FEEL */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#161925]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.1),_transparent_70%)]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic">La précision d'un scalpel.</h2>
            <p className="text-white/50 text-xl font-light">Votre rapport de 20 pages n'est pas une description, c'est un diagnostic de performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Écart Psychologique Central (Score exact)",
              "Diagnostic de l'Angle Mort Invisible",
              "Analyse des 6 Dimensions Comportementales",
              "Script de Coaching Narratif (6 min)",
              "Plan d'Ajustement Prioritaire sur 7 Jours",
              "Accès illimité à l'Oracle du Miroir (IA)"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#C9A24D]/40 transition-all cursor-default shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9A24D]/15 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#C9A24D]" />
                </div>
                <span className="font-medium text-white/90 text-lg">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. DELIVERABLE SECTION */}
      <section className="py-32 px-6 bg-white/5 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="flex-1 space-y-10">
              <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight">
                Le dossier qui change <br />
                <span className="text-[#C9A24D] italic">votre vision.</span>
              </h2>
              
              <div className="space-y-10">
                <div className="flex gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#C9A24D]/15 flex items-center justify-center shrink-0 text-[#C9A24D] border border-[#C9A24D]/30 shadow-[0_0_20px_rgba(201,162,77,0.1)]">
                    <FileText className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">L'Analyse de Restitution V2</h4>
                    <p className="text-white/50 leading-relaxed font-light text-lg">Une lecture chirurgicale de votre mode opératoire. Pas de jargon, que des faits observables.</p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#5B4B8A]/30 flex items-center justify-center shrink-0 text-[#8E7CC3] border border-[#5B4B8A]/40 shadow-[0_0_20px_rgba(91,75,138,0.2)]">
                    <Brain className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">L'Oracle du Miroir Interactif</h4>
                    <p className="text-white/50 leading-relaxed font-light text-lg">Discutez en direct avec l'IA qui a analysé votre dossier pour des réponses personnalisées.</p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 flex items-center justify-center shrink-0 text-emerald-400 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                    <Target className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold mb-3">Protocole d'Action 7 Jours</h4>
                    <p className="text-white/50 leading-relaxed font-light text-lg">7 micro-actions concrètes pour transformer vos angles morts en leviers de puissance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5 }}
                className="relative w-full max-w-md aspect-[3/4] bg-gradient-to-br from-[#1A1C2E] to-[#0F111A] rounded-[60px] border border-white/20 shadow-[0_60px_120px_-30px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col items-center justify-center p-14 transition-all duration-700"
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-15"></div>
                
                <div className="w-28 h-28 bg-[#C9A24D] rounded-[35px] shadow-[0_0_50px_rgba(201,162,77,0.5)] flex items-center justify-center mb-10 relative z-10">
                  <FileText className="w-14 h-14 text-[#08090F]" />
                </div>
                
                <div className="text-center relative z-10 space-y-5">
                  <div className="text-4xl font-serif font-bold tracking-tight">VOTRE DOSSIER</div>
                  <div className="text-[11px] uppercase tracking-[0.5em] text-[#C9A24D] font-bold">Confidentiel • Restitution V2</div>
                </div>

                <div className="mt-20 w-full space-y-6 relative z-10">
                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.2, delay: 0.5 }} className="h-full bg-[#C9A24D]/60 shadow-[0_0_10px_rgba(201,162,77,0.3)]"></motion.div>
                  </div>
                  <div className="h-2.5 w-3/4 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} transition={{ duration: 1.2, delay: 0.7 }} className="h-full bg-[#C9A24D]/40 shadow-[0_0_10px_rgba(201,162,77,0.2)]"></motion.div>
                  </div>
                  <div className="h-2.5 w-1/2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "50%" }} transition={{ duration: 1.2, delay: 0.9 }} className="h-full bg-[#C9A24D]/30 shadow-[0_0_10px_rgba(201,162,77,0.1)]"></motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ETHICS SECTION - LIGHTER CONTRAST */}
      <section className="py-24 px-6 text-center border-b border-white/5 bg-[#161925]">
        <div className="max-w-3xl mx-auto space-y-10">
          <ShieldCheck className="w-14 h-14 text-[#C9A24D]/40 mx-auto" />
          <div className="space-y-6">
            <h2 className="text-2xl font-bold uppercase tracking-[0.3em] text-white/70">Éthique & Déontologie</h2>
            <p className="text-lg text-white/40 leading-relaxed font-light">
              Cet outil est une ressource de compréhension comportementale. 
              Il ne constitue en aucun cas un avis médical ou un diagnostic clinique. 
              Notre approche repose sur l'observation factuelle des processus décisionnels.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA - MASSIVE & RADIANT */}
      <section className="py-48 px-6 text-center relative overflow-hidden bg-gradient-to-b from-[#161925] to-[#0F111A]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#C9A24D]/10 blur-[180px] rounded-full"></div>
        
        <div className="max-w-5xl mx-auto space-y-16 relative z-10">
          <div className="space-y-8">
            <h2 className="text-6xl md:text-9xl font-serif font-bold">Prêt à voir <br />ton <span className="italic text-[#C9A24D]">vrai</span> reflet ?</h2>
            <p className="text-white/50 text-2xl font-light max-w-2xl mx-auto leading-relaxed">Accédez à votre analyse complète et à votre coach virtuel immédiatement après l'expérience.</p>
          </div>

          <div className="flex flex-col items-center gap-10">
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="w-full md:w-auto px-20 py-8 bg-[#C9A24D] text-[#08090F] rounded-full font-bold text-2xl hover:bg-[#D4B46B] transition-all shadow-[0_0_70px_rgba(201,162,77,0.5)] hover:scale-105 active:scale-95 tracking-tight"
            >
              Obtenir mon Miroir Psychologique — 29 €
            </button>
            
            <div className="flex flex-wrap justify-center gap-14 opacity-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Paiement Sécurisé</span>
              </div>
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Accès Instantané</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em]">Satisfaction Garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 text-center border-t border-white/5 bg-[#08090F]">
        <p className="text-[11px] text-white/30 uppercase tracking-[0.6em] leading-relaxed">
          Miroir Psychologique &copy; 2026 • Un outil de compréhension comportementale.<br />
          Tous droits réservés.
        </p>
      </footer>

    </div>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
