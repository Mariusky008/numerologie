'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Star, 
  Activity, 
  Check, 
  X, 
  ArrowRight, 
  ShieldCheck, 
  BookOpen, 
  Video, 
  Compass,
  AlertCircle,
  Cpu,
  Fingerprint,
  Layers,
  Sparkles,
  Lock,
  ArrowDown,
  Quote,
  Users,
  Mic,
  Calendar,
  Heart,
  Target
} from 'lucide-react';import { useRouter } from 'next/navigation';

export default function CrashTestLanding() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8 }
  } as any;

  const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 overflow-x-hidden">
      
      {/* 0. FLOATING NAV */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${scrolled ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-xl border border-[#1A1C2E]/5 rounded-full py-3 px-6 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#C9A24D]" />
            <span className="text-[10px] font-black uppercase tracking-widest">Crash-Test</span>
          </div>
          <button 
            onClick={() => router.push('/miroir/experience')}
            className="bg-[#1A1C2E] text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full hover:bg-[#C9A24D] transition-colors"
          >
            Commencer
          </button>
        </div>
      </nav>

      {/* 1. HERO — ÉCRAN 1 */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-[#FDFBF7]">
        {/* Modern Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,_rgba(201,162,77,0.08),_transparent_40%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,_rgba(91,75,138,0.08),_transparent_40%)]"></div>
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1A1C2E 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="max-w-4xl w-full z-10 text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-[#1A1C2E]/5 shadow-sm text-[#1A1C2E] text-[11px] font-black uppercase tracking-[0.4em]"
          >
            <Cpu className="w-4 h-4 text-[#C9A24D]" />
            Protocole Mi-Bio Mi-Astro
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-9xl font-serif font-bold tracking-tight leading-[0.95] text-[#1A1C2E]">
              Le Crash-Test <br />
              <span className="text-[#C9A24D] italic relative">
                de ton Destin
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 1, duration: 1 }}
                  className="absolute bottom-4 left-0 h-1 bg-[#C9A24D]/20 -z-10"
                ></motion.span>
              </span>
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-8 text-xl md:text-2xl text-[#1A1C2E]/60 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            <p>
              Vis-tu vraiment ce pour quoi tu es né ?
            </p>
            <div className="p-8 bg-white/50 backdrop-blur-md border border-[#1A1C2E]/5 rounded-[40px] shadow-2xl shadow-black/5 space-y-4">
              <p className="text-lg">
                Nous comparons ce que ta date de naissance révèle de ton potentiel <br />
                <span className="text-[#1A1C2E] font-bold uppercase tracking-widest text-xs">(astrologie & numérologie)</span> <br />
                avec la façon dont tu prends réellement tes décisions aujourd’hui.
              </p>
              <div className="h-px w-12 bg-[#C9A24D]/30 mx-auto"></div>
              <p className="text-[#C9A24D] font-bold text-2xl">
                👉 Identifie enfin les schémas invisibles <br />
                qui bloquent tes décisions et ton parcours.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-6"
          >
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="group relative inline-flex items-center gap-4 px-12 py-8 bg-[#1A1C2E] text-white rounded-full font-bold text-xl hover:bg-[#C9A24D] transition-all shadow-[0_40px_80px_-20px_rgba(26,28,46,0.3)] hover:shadow-[#C9A24D]/40 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10">👉 Faire mon Crash-Test</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform relative z-10" />
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#1A1C2E]/10"
        >
          <ArrowDown className="w-10 h-10" />
        </motion.div>
      </section>

      {/* 2. SECTION — LE PRINCIPE (MODERN CARDS) */}
      <section className="py-40 px-6 relative bg-white">
        <div className="max-w-6xl mx-auto space-y-32">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.5em] mb-4">La Méthodologie</div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-[#1A1C2E]">Deux lectures. <br /><span className="text-[#C9A24D] italic">Une confrontation.</span></h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-12"
          >
            {[
              { 
                num: "01", 
                title: "Ton Empreinte", 
                desc: "Une lecture symbolique basée sur ta date de naissance. Ce qu’on dit souvent de ton potentiel.",
                icon: Fingerprint,
                color: "text-[#C9A24D]"
              },
              { 
                num: "02", 
                title: "Tes Réflexes", 
                desc: "Des mini-tests interactifs de décision, où tu fais des choix concrets, sans “bonne réponse”.",
                icon: Activity,
                color: "text-[#5B4B8A]"
              },
              { 
                num: "03", 
                title: "Le Choc", 
                desc: "Là où ce que tu crois être ne correspond pas toujours à ce que tu fais.",
                icon: Zap,
                color: "text-[#1A1C2E]"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                className="group relative p-12 rounded-[60px] bg-[#FDFBF7] border border-[#1A1C2E]/5 hover:border-[#C9A24D]/20 transition-all duration-500 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
              >
                <div className="absolute top-10 right-10 text-6xl font-black text-[#1A1C2E]/[0.03] group-hover:text-[#C9A24D]/10 transition-colors">
                  {item.num}
                </div>
                <div className={`w-16 h-16 rounded-[24px] bg-white flex items-center justify-center mb-10 shadow-sm ${item.color}`}>
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-6">{item.title}</h3>
                <p className="text-[#1A1C2E]/60 text-xl leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fadeIn} className="relative py-20 text-center">
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C9A24D]/20 to-transparent"></div>
            <span className="relative z-10 bg-white px-10 text-3xl md:text-5xl font-serif italic text-[#C9A24D]">
              C’est là que la prise de conscience commence.
            </span>
          </motion.div>
        </div>
      </section>

      {/* 3. SECTION — POURQUOI C’EST DIFFÉRENT (HIGH CONTRAST) */}
      <section className="py-40 px-6 bg-[#1A1C2E] text-white rounded-[100px] mx-4 md:mx-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-[#C9A24D]/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-5xl mx-auto space-y-24 relative z-10">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-serif font-bold leading-tight">
              Ce n’est pas un <br />
              <span className="text-[#C9A24D] italic underline underline-offset-8 decoration-white/10">horoscope de plus.</span>
            </h2>
          </motion.div>

          <div className="grid gap-6">
            {[
              { text: "Ce n’est pas une prédiction", positive: false },
              { text: "Ce n’est pas un test de personnalité figé", positive: false },
              { text: "Ce n’est pas du développement personnel flou", positive: false },
              { text: "C’est une comparaison directe entre une lecture symbolique et tes comportements réels sous contrainte.", positive: true }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className={`group flex items-center gap-8 p-10 rounded-[40px] border transition-all duration-500 ${item.positive ? 'bg-[#C9A24D] border-[#C9A24D] shadow-[0_30px_60px_-15px_rgba(201,162,77,0.3)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${item.positive ? 'bg-white text-[#C9A24D]' : 'bg-white/10 text-white/30 group-hover:text-white/60 transition-colors'}`}>
                  {item.positive ? <Check className="w-6 h-6 font-bold" /> : <X className="w-6 h-6" />}
                </div>
                <span className={`text-2xl md:text-4xl ${item.positive ? 'font-bold text-[#1A1C2E]' : 'text-white/40 group-hover:text-white/80 transition-colors'}`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3.5 SECTION — LA PREUVE SOCIALE (NOUVEAU) */}
      <section className="py-40 px-6 bg-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-24 relative z-10">
          {/* Counter Header */}
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#FDFBF7] border border-[#1A1C2E]/5 text-[#C9A24D] text-xs font-black uppercase tracking-[0.3em]">
              <Users className="w-4 h-4" />
              Déjà + de 1 200 légendes révélées
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#1A1C2E]">Ils ont fait l’expérience</h2>
          </motion.div>

          {/* Thomas Testimonial */}
          <motion.div 
            {...fadeIn}
            className="group relative max-w-4xl mx-auto p-12 md:p-20 rounded-[80px] bg-[#FDFBF7] border border-[#1A1C2E]/5 shadow-2xl shadow-black/[0.02] overflow-hidden"
          >
            <Quote className="absolute top-12 right-12 w-24 h-24 text-[#C9A24D]/5 rotate-180" />
            
            <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
              {/* Photo Placeholder */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[40px] bg-[#1A1C2E]/5 border-2 border-white shadow-xl overflow-hidden shrink-0 grayscale hover:grayscale-0 transition-all duration-700">
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" 
                  alt="Thomas"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-8 text-center md:text-left">
                <div className="flex justify-center md:justify-start gap-1 text-[#C9A24D]">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="w-5 h-5 fill-current" />)}
                </div>
                
                <p className="text-2xl md:text-4xl font-serif italic leading-relaxed text-[#1A1C2E]">
                  « J’étais très sceptique au départ. Le crash-test m’a surtout montré un décalage que je n’avais jamais vu chez moi. Une prise de conscience brutale mais nécessaire. »
                </p>

                <div className="pt-4">
                  <p className="text-lg font-black uppercase tracking-[0.2em] text-[#1A1C2E]">Thomas, 34 ans</p>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#1A1C2E]/30">Entrepreneur • Chemin de Vie 5</p>
                </div>
              </div>
            </div>

            {/* Subtle floating decoration */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#C9A24D]/5 blur-3xl rounded-full"></div>
          </motion.div>

          {/* Social Proof Stats */}
          <motion.div {...fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
              { label: "Vérifié", value: "4.6/5", icon: Star, sub: "Basé sur 1,200+ avis" },
              { label: "Utilisateurs", value: "1,200+", icon: Users, sub: "Légendes révélées" },
              { label: "Recommandé", value: "94%", icon: Sparkles, sub: "Taux de satisfaction" }
            ].map((stat, i) => (
              <div key={i} className="relative group p-8 rounded-[40px] bg-white border border-[#1A1C2E]/5 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C9A24D]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] flex items-center justify-center text-[#C9A24D] group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 fill-current" />
                  </div>
                </div>
                <div className="text-4xl font-serif font-bold text-[#1A1C2E] mb-1">{stat.value}</div>
                <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[#C9A24D] mb-2">{stat.label}</div>
                <div className="text-[10px] font-medium text-[#1A1C2E]/30 uppercase tracking-widest">{stat.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. SECTION — CE QUE TU DÉCOUVRES (ELEGANT LIST) */}
      <section className="py-40 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-24">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.5em]">L'Output</div>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#1A1C2E]">Ce que révèle ton Crash-Test</h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { text: "Comprendre pourquoi certaines situations reviennent toujours dans ta vie", icon: Activity },
              { text: "Identifier les schémas que tu reproduis sans t’en rendre compte", icon: Lock },
              { text: "Arrêter de reproduire les mêmes erreurs relationnelles ou professionnelles", icon: X },
              { text: "Voir où ton adaptation a pris le dessus sur ton potentiel profond", icon: Zap },
              { text: "Découvrir une clé concrète pour te réaligner et apaiser tes tensions", icon: Sparkles }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center gap-8 p-10 rounded-[40px] bg-[#FDFBF7] border border-[#1A1C2E]/5 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-2xl text-[#1A1C2E]/80 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center space-y-4 pt-10">
            <div className="inline-block p-10 rounded-[60px] bg-[#FDFBF7] border border-[#1A1C2E]/5">
              <p className="text-3xl font-serif font-bold mb-2">Pas de jugement. Pas d’étiquette.</p>
              <p className="text-2xl text-[#C9A24D] italic font-medium">Juste une lecture claire et exploitable.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. SECTION — UNE EXPÉRIENCE COMPLÈTE (PREMIUM DELIVERABLES) */}
      <section className="py-40 px-6 relative overflow-hidden bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto space-y-24 relative z-10">
          <motion.div {...fadeIn} className="text-center space-y-6">
            <div className="text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.5em]">Le Pack Révélation</div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold">Une expérience complète</h2>
            <p className="text-xl md:text-2xl text-[#1A1C2E]/50 max-w-2xl mx-auto">
              Ce n'est pas juste un PDF. C'est une immersion interactive avec une IA pour comprendre tes mécanismes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Dossier Personnalisé", desc: "40 pages d'analyse croisée : astro, numérologie et psychologie décisionnelle.", icon: BookOpen, tag: "PDF 40 pages" },
              { title: "Vidéo de l'Avatar", desc: "Une vidéo immersive de 5 à 7 minutes où ton avatar te parle directement.", icon: Video, tag: "Vidéo Personnalisée" },
              { title: "Coach Vocal IA", desc: "Une conversation vocale de 30 minutes avec l'IA pour approfondir tes résultats.", icon: Mic, tag: "Échange Interactif" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="p-12 rounded-[60px] bg-white border border-[#1A1C2E]/5 shadow-sm hover:shadow-2xl transition-all duration-700 space-y-8 group"
              >
                <div className="w-20 h-20 bg-[#FDFBF7] rounded-[28px] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#C9A24D] group-hover:text-white transition-all duration-500">
                  <item.icon className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                  <div className="text-[10px] font-black text-[#C9A24D] uppercase tracking-widest">{item.tag}</div>
                  <h3 className="text-3xl font-serif font-bold">{item.title}</h3>
                  <p className="text-[#1A1C2E]/50 text-xl leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center max-w-3xl mx-auto pt-20 space-y-12">
            <p className="text-4xl md:text-5xl font-serif italic text-[#1A1C2E] leading-tight">
              Tu ne lis pas ton destin. <br />
              <span className="text-[#C9A24D] not-italic font-bold tracking-tight">Tu observes comment tu fonctionnes vraiment.</span>
            </p>

            <div className="pt-4">
              <button 
                onClick={() => router.push('/miroir/experience')}
                className="group relative inline-flex flex-col items-center gap-2 px-12 py-8 bg-[#1A1C2E] text-white rounded-full font-bold shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <span className="text-2xl md:text-3xl">Accéder à mon Crash-Test — 29 €</span>
                <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Accès immédiat • Dossier + Vidéo + Coach IA</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5.5 SECTION — ALLER PLUS LOIN (NOUVEAU) */}
      <section className="py-40 px-6 bg-white relative">
        <div className="max-w-5xl mx-auto space-y-24">
          <motion.div {...fadeIn} className="text-center space-y-8">
            <div className="text-[#C9A24D] text-[10px] font-black uppercase tracking-[0.5em]">L'Après Crash-Test</div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold">Et après le Crash-Test ?</h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              <p className="text-2xl text-[#1A1C2E]/80 leading-relaxed">
                Le Crash-Test met en lumière l’écart entre ton potentiel naturel et ton fonctionnement actuel.
              </p>
              <p className="text-xl text-[#1A1C2E]/50 leading-relaxed italic">
                Pour celles et ceux qui le souhaitent, il est possible d’aller plus loin avec des exercices guidés conçus pour favoriser un rééquilibrage progressif.
              </p>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { text: "Des exercices simples, intégrés au quotidien", icon: Sparkles },
              { text: "Basés sur l’observation, les choix et les habitudes", icon: Activity },
              { text: "Sans diagnostic, sans thérapie, sans contrainte", icon: ShieldCheck }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="flex items-center gap-6 p-8 rounded-[40px] bg-[#FDFBF7] border border-[#1A1C2E]/5"
              >
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-[#C9A24D]">
                  <item.icon className="w-6 h-6" />
                </div>
                <span className="text-lg font-medium text-[#1A1C2E]/70 leading-tight">{item.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Durations / Paths */}
          <div className="space-y-12 pt-10">
            <motion.h3 {...fadeIn} className="text-2xl font-serif font-bold text-center text-[#1A1C2E]/40 uppercase tracking-[0.2em]">Parcours disponibles (en option)</motion.h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { 
                  duration: "3 mois", 
                  points: ["Reprendre conscience de ses schémas dominants", "Ajuster ses réactions clés"],
                  icon: Calendar,
                  color: "border-[#1A1C2E]/5"
                },
                { 
                  duration: "6 mois", 
                  points: ["Stabiliser de nouveaux repères", "Sortir des répétitions automatiques"],
                  icon: Target,
                  color: "border-[#C9A24D]/30 bg-[#C9A24D]/[0.02]"
                },
                { 
                  duration: "12 mois", 
                  points: ["Intégrer durablement un fonctionnement plus aligné", "Retrouver clarté, fluidité et dynamisme"],
                  icon: Heart,
                  color: "border-[#1A1C2E]/5"
                }
              ].map((path, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn}
                  className={`p-10 rounded-[50px] border ${path.color} space-y-6 hover:shadow-xl transition-all duration-500`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-[#C9A24D]">
                      <path.icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-[#1A1C2E]">{path.duration}</span>
                  </div>
                  <ul className="space-y-4">
                    {path.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#1A1C2E]/60 text-sm leading-relaxed">
                        <ArrowRight className="w-4 h-4 text-[#C9A24D] shrink-0 mt-1" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...fadeIn} className="max-w-2xl mx-auto p-10 rounded-[40px] bg-[#1A1C2E]/[0.02] border border-[#1A1C2E]/5 text-center space-y-6">
            <p className="text-2xl font-serif italic text-[#C9A24D]">
              « Le but n’est pas de changer qui tu es, mais de réduire ce qui te désaligne. »
            </p>
            <p className="text-xs font-bold text-[#1A1C2E]/30 uppercase tracking-widest leading-relaxed">
              Il s’agit d’un accompagnement de compréhension et d’ajustement personnel, <br />
              pas d’un suivi médical ou thérapeutique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. SECTION — POUR QUI / POUR QUI PAS (MINIMALIST) */}
      <section className="py-40 px-6 bg-white border-y border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-32">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-serif font-bold text-[#C9A24D]">C’est pour toi si :</h3>
              <div className="h-1 w-12 bg-[#C9A24D]/20"></div>
            </div>
            <div className="space-y-8">
              {[
                "Tu es curieux(se) de te comprendre autrement",
                "Tu aimes confronter les idées à la réalité",
                "Tu veux arrêter de tourner en rond"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="w-8 h-8 rounded-full bg-[#C9A24D]/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-2xl text-[#1A1C2E] font-medium leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-12">
            <div className="space-y-4">
              <h3 className="text-4xl font-serif font-bold text-[#1A1C2E]/30">Ce n’est pas pour toi si :</h3>
              <div className="h-1 w-12 bg-[#1A1C2E]/10"></div>
            </div>
            <div className="space-y-8">
              {[
                "Tu cherches une prédiction magique",
                "Tu veux qu’on te dise qui tu es",
                "Tu veux une réponse toute faite"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-6 text-[#1A1C2E]/30">
                  <div className="w-8 h-8 rounded-full bg-[#1A1C2E]/5 flex items-center justify-center shrink-0 mt-1">
                    <X className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-medium leading-tight">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. SECTION — CADRE & TRANSPARENCE (TRUST) */}
      <section className="py-32 px-6 bg-[#FDFBF7]">
        <div className="max-w-3xl mx-auto bg-white p-16 md:p-24 rounded-[80px] border border-[#1A1C2E]/5 shadow-2xl shadow-black/[0.02] space-y-16">
          <motion.div {...fadeIn} className="flex items-center gap-4 justify-center text-[#1A1C2E]/30">
            <ShieldCheck className="w-8 h-8" />
            <h3 className="text-sm font-black uppercase tracking-[0.4em]">Cadre & Transparence</h3>
          </motion.div>

          <div className="grid gap-8">
            {[
              "Lecture symbolique + interactive",
              "Aucun diagnostic médical",
              "Aucun traitement, aucune prédiction",
              "Résultats influencés par le contexte et l’attention"
            ].map((text, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="flex items-center gap-6 text-xl text-[#1A1C2E]/50 font-medium"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A24D]/30"></div>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="space-y-6 pt-10 text-center border-t border-[#1A1C2E]/5">
            <p className="text-2xl font-bold text-[#1A1C2E]">👉 Outil de compréhension personnelle, rien de plus.</p>
            <p className="text-xl text-[#C9A24D] font-black uppercase tracking-widest">Et c’est déjà beaucoup.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL (HIGH IMPACT) */}
      <section className="py-60 px-6 text-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.15),_transparent_70%)]"></div>
        </div>

        <motion.div {...fadeIn} className="max-w-5xl mx-auto space-y-16 relative z-10">
          <h2 className="text-6xl md:text-9xl font-serif font-bold text-[#1A1C2E] leading-[0.9]">
            Prêt à confronter ton potentiel <br />
            <span className="text-[#C9A24D] italic underline decoration-[#C9A24D]/20 underline-offset-[16px]">à la réalité ?</span>
          </h2>

          <div className="space-y-10 pt-10">
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="group relative inline-flex flex-col items-center gap-4 px-16 py-10 bg-[#1A1C2E] text-white rounded-[40px] shadow-[0_50px_100px_-20px_rgba(26,28,46,0.4)] hover:shadow-[#C9A24D]/40 transition-all duration-700 hover:scale-105 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="text-3xl md:text-5xl font-bold relative z-10">👉 Accéder à mon Crash-Test</span>
              <div className="flex items-center gap-4 relative z-10">
                <span className="text-4xl md:text-6xl font-serif italic text-[#C9A24D]">29 €</span>
                <div className="h-8 w-px bg-white/20"></div>
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] opacity-60 text-left">Paiement sécurisé <br /> Accès immédiat</span>
              </div>
            </button>
            <p className="text-[#1A1C2E]/40 text-sm font-bold uppercase tracking-[0.4em]">Expérience Unique · Révélation Immédiate</p>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 bg-[#FDFBF7] border-t border-[#1A1C2E]/5 text-center space-y-8">
        <div className="flex items-center justify-center gap-4 text-[#C9A24D]">
          <Zap className="w-6 h-6" />
          <div className="h-4 w-px bg-[#1A1C2E]/10"></div>
          <Fingerprint className="w-6 h-6" />
          <div className="h-4 w-px bg-[#1A1C2E]/10"></div>
          <Activity className="w-6 h-6" />
        </div>
        <div className="text-[11px] font-black uppercase tracking-[0.5em] text-[#1A1C2E]/20">
          © {new Date().getFullYear()} MIROIR PSYCHOLOGIQUE · LE CRASH-TEST DU DESTIN
        </div>
      </footer>

    </div>
  );
}
