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
  Activity
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
    <div className="min-h-screen bg-[#08090F] text-[#FDFBF7] font-sans selection:bg-[#C9A24D]/30">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#5B4B8A]/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#C9A24D]/10 blur-[120px] rounded-full"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen"></div>
        </div>

        <motion.div 
          style={{ opacity, scale }}
          className="max-w-5xl z-10 text-center space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#C9A24D] text-xs font-bold uppercase tracking-[0.3em] mb-4"
          >
            <Sparkles className="w-4 h-4" />
            L'Expérience Miroir Psychologique
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-[1.05] bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
          >
            Tu ne te connais pas <br />
            <span className="italic text-[#C9A24D]">encore.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-white/60 mb-12 leading-relaxed max-w-3xl mx-auto font-light"
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
              className="group relative flex items-center gap-4 px-10 py-5 bg-[#C9A24D] text-[#08090F] rounded-full font-bold text-lg hover:bg-[#D4B46B] transition-all shadow-[0_20px_50px_rgba(201,162,77,0.3)] hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              Entrer dans l'expérience
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-6 text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">
              <span className="flex items-center gap-2"><ClockIcon className="w-3 h-3" /> 20 Minutes</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Privé & Sécurisé</span>
              <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> Accès Immédiat</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 2, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 md:right-20 w-32 h-32 md:w-64 md:h-64 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-full blur-[2px] backdrop-blur-sm z-0 pointer-events-none hidden md:block"
        ></motion.div>

        <motion.button 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 text-white/20 hover:text-[#C9A24D] transition-colors z-10"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      {/* 2. COMPARISON SECTION */}
      <section className="py-32 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold italic">La fin des tests déclaratifs.</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">Un test classique vous demande ce que vous pensez. Le Miroir observe ce que vous faites.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl space-y-8 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400/50" />
              </div>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-widest text-white/40">Approche Classique</h3>
              <ul className="space-y-6">
                {[
                  "Questions théoriques subjectives",
                  "Classement dans une case prédéfinie",
                  "Rapport statique sans action",
                  "Biais de désirabilité sociale"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-white/30 items-center font-light">
                    <div className="w-1 h-1 bg-white/20 rounded-full"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 rounded-[40px] bg-gradient-to-br from-[#1A1C2E] to-[#08090F] border-2 border-[#C9A24D]/30 shadow-[0_30px_60px_rgba(0,0,0,0.5)] space-y-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-6">
                <div className="px-3 py-1 bg-[#C9A24D] text-[#08090F] text-[10px] font-bold rounded-full uppercase tracking-widest">Technologie Active</div>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-[#C9A24D]/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#C9A24D]" />
              </div>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-widest text-[#C9A24D]">Le Miroir Actif™</h3>
              <ul className="space-y-6">
                {[
                  "Mise en situation réelle (Scénarios)",
                  "Analyse des réflexes sous pression",
                  "Détection des angles morts invisibles",
                  "Plan d'action concret sur 7 jours"
                ].map((item, i) => (
                  <li key={i} className="flex gap-4 text-white/80 items-center font-medium">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. PROCESS SECTION */}
      <section className="py-32 px-6 bg-[#0F0B15]/50 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Le Voyage Intérieur</h2>
            <p className="text-white/40 text-lg">Trois étapes pour briser la vitre et voir la réalité.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                step: "Phase 01",
                title: "Auto-Perception",
                desc: "Définition de votre image consciente. Ce que vous croyez être et comment vous justifiez vos choix.",
                icon: <Eye className="w-8 h-8" />
              },
              {
                step: "Phase 02",
                title: "Réflexes de Crise",
                desc: "Série de scénarios immersifs où le temps et l'enjeu forcent votre cerveau à révéler ses vrais patterns.",
                icon: <Activity className="w-8 h-8" />
              },
              {
                step: "Phase 03",
                title: "La Révélation",
                desc: "Analyse des écarts. Nous superposons votre perception et vos actes pour créer votre Miroir.",
                icon: <Layers className="w-8 h-8" />
              }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group space-y-6"
              >
                <div className="w-20 h-20 rounded-[30px] bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-[#C9A24D]/50 group-hover:bg-[#C9A24D]/10 transition-all duration-500 relative">
                  <div className="absolute inset-0 bg-[#C9A24D]/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative z-10 text-white/40 group-hover:text-[#C9A24D] transition-colors">{s.icon}</div>
                </div>
                <div className="text-[#C9A24D] text-xs font-bold uppercase tracking-[0.3em]">{s.step}</div>
                <h3 className="text-2xl font-serif font-bold">{s.title}</h3>
                <p className="text-white/40 leading-relaxed font-light">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REVELATION SECTION */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.05),_transparent_70%)]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold italic">La précision d'un scalpel.</h2>
            <p className="text-white/40 text-lg">Votre rapport de 20 pages n'est pas une description, c'est un diagnostic de performance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                className="flex items-center gap-5 p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-[#C9A24D]/30 transition-all cursor-default"
              >
                <div className="w-10 h-10 rounded-xl bg-[#C9A24D]/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-[#C9A24D]" />
                </div>
                <span className="font-medium text-white/80">{item}</span>
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
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Le dossier qui change <br />
                <span className="text-[#C9A24D] italic">votre vision.</span>
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#C9A24D]/10 flex items-center justify-center shrink-0 text-[#C9A24D] border border-[#C9A24D]/20">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">L'Analyse de Restitution V2</h4>
                    <p className="text-white/40 leading-relaxed font-light">Une lecture chirurgicale de votre mode opératoire. Pas de jargon, que des faits observables.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#5B4B8A]/20 flex items-center justify-center shrink-0 text-[#5B4B8A] border border-[#5B4B8A]/20">
                    <Brain className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">L'Oracle du Miroir Interactif</h4>
                    <p className="text-white/40 leading-relaxed font-light">Discutez en direct avec l'IA qui a analysé votre dossier pour des réponses personnalisées.</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-400 border border-emerald-500/20">
                    <Target className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Protocole d'Action 7 Jours</h4>
                    <p className="text-white/40 leading-relaxed font-light">7 micro-actions concrètes pour transformer vos angles morts en leviers de puissance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full flex justify-center lg:justify-end">
              <motion.div 
                whileHover={{ rotateY: -10, rotateX: 5 }}
                className="relative w-full max-w-md aspect-[3/4] bg-[#1A1C2E] rounded-[60px] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center justify-center p-12 transition-all duration-700"
                style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-10"></div>
                
                <div className="w-24 h-24 bg-[#C9A24D] rounded-[30px] shadow-[0_0_40px_rgba(201,162,77,0.4)] flex items-center justify-center mb-8 relative z-10">
                  <FileText className="w-12 h-12 text-[#08090F]" />
                </div>
                
                <div className="text-center relative z-10 space-y-4">
                  <div className="text-3xl font-serif font-bold tracking-tight">VOTRE DOSSIER</div>
                  <div className="text-[10px] uppercase tracking-[0.4em] text-[#C9A24D] font-bold">Confidentiel • Restitution V2</div>
                </div>

                <div className="mt-16 w-full space-y-4 relative z-10">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-[#C9A24D]/50"></motion.div>
                  </div>
                  <div className="h-2 w-3/4 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "75%" }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-[#C9A24D]/30"></motion.div>
                  </div>
                  <div className="h-2 w-1/2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "50%" }} transition={{ duration: 1, delay: 0.9 }} className="h-full bg-[#C9A24D]/20"></motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ETHICS SECTION */}
      <section className="py-24 px-6 text-center border-b border-white/5 bg-[#08090F]">
        <div className="max-w-3xl mx-auto space-y-8">
          <ShieldCheck className="w-12 h-12 text-[#C9A24D]/20 mx-auto" />
          <div className="space-y-4">
            <h2 className="text-xl font-bold uppercase tracking-widest text-white/60">Éthique & Déontologie</h2>
            <p className="text-sm text-white/30 leading-relaxed font-light">
              Cet outil est une ressource de compréhension comportementale. 
              Il ne constitue en aucun cas un avis médical ou un diagnostic clinique. 
              Notre approche repose sur l'observation factuelle des processus décisionnels.
            </p>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 blur-[150px] rounded-full"></div>
        
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-serif font-bold">Prêt à voir <br />ton <span className="italic text-[#C9A24D]">vrai</span> reflet ?</h2>
            <p className="text-white/40 text-xl font-light">Accédez à votre analyse complète immédiatement après l'expérience.</p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="w-full md:w-auto px-16 py-6 bg-[#C9A24D] text-[#08090F] rounded-full font-bold text-xl hover:bg-[#D4B46B] transition-all shadow-[0_0_50px_rgba(201,162,77,0.4)] hover:scale-105 active:scale-95"
            >
              Obtenir mon Miroir Psychologique — 29 €
            </button>
            
            <div className="flex flex-wrap justify-center gap-10 opacity-40">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Paiement Sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Accès Instantané</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Satisfaction Garantie</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 text-center border-t border-white/5 bg-[#08090F]">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] leading-relaxed">
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
