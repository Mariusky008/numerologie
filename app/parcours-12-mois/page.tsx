'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Compass, 
  Target, 
  Calendar, 
  BookOpen, 
  Brain, 
  Users, 
  ShieldCheck, 
  ArrowRight,
  Check,
  Star,
  Zap,
  Clock,
  MessageCircle,
  TrendingUp,
  Activity,
  ChevronRight,
  Eye,
  Repeat,
  Lock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ParcoursPage() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 relative border-b border-[#1A1C2E]/5 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#5B4B8A]/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#C9A24D]/5 blur-[120px] rounded-full"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto z-10 text-center space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 backdrop-blur-sm text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
            <Compass className="w-4 h-4" />
            PROGRAMME PROPOSÉ
          </div>
          
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight leading-[1.1] text-[#1A1C2E]">
            Parcours d’Exploration <br />
            <span className="text-[#C9A24D] italic">& de Mise en Pratique</span>
          </h1>

          <p className="text-2xl md:text-3xl font-serif font-medium leading-relaxed italic text-[#1A1C2E]/60 max-w-4xl mx-auto">
            "Un parcours structuré pour mettre en pratique la lecture de ton thème, à travers des exercices concrets, des temps d’observation guidés et, si tu le souhaites, des échanges réguliers avec un coach."
          </p>
        </motion.div>
      </section>

      {/* 2. OBJECTIFS */}
      <section className="py-32 px-6 bg-[#FDFBF7]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeIn} className="space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-[10px] font-bold uppercase tracking-[0.4em]">
                  <Target className="w-4 h-4" />
                  OBJECTIF DU PARCOURS
                </div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold">Ce parcours a pour but de t’aider à :</h2>
              </div>

              <div className="space-y-6">
                {[
                  "Mieux observer tes fonctionnements",
                  "Expérimenter d’autres façons d’agir",
                  "Ajuster tes choix au fil du temps",
                  "Prendre du recul sur ce que tu vis"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-[#1A1C2E]/5 shadow-sm flex items-center justify-center text-[#C9A24D] group-hover:bg-[#C9A24D] group-hover:text-white transition-all">
                      <Check className="w-6 h-6" />
                    </div>
                    <span className="text-xl md:text-2xl font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="p-8 bg-white border border-red-500/10 rounded-[40px] space-y-4">
                <div className="flex items-center gap-3 text-red-400">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Avertissement Important</span>
                </div>
                <p className="text-[#1A1C2E]/60 italic">
                  Il ne s’agit ni d’un suivi thérapeutique, ni d’une promesse de transformation garantie, mais d’un cadre structuré pour progresser en conscience.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="relative aspect-square"
            >
              <div className="absolute inset-0 bg-[#C9A24D]/10 rounded-[80px] rotate-3"></div>
              <div className="absolute inset-0 bg-white border border-[#1A1C2E]/5 rounded-[80px] shadow-2xl overflow-hidden flex items-center justify-center p-12 text-center">
                <div className="space-y-8">
                  <div className="w-24 h-24 bg-[#C9A24D]/10 rounded-full flex items-center justify-center mx-auto">
                    <Calendar className="w-12 h-12 text-[#C9A24D]" />
                  </div>
                  <div className="space-y-4">
                    <p className="text-5xl font-serif font-bold text-[#C9A24D]">12 Mois</p>
                    <p className="text-xl text-[#1A1C2E]/40 uppercase tracking-[0.3em] font-bold">12 Cycles Mensuels</p>
                  </div>
                  <div className="h-px w-20 bg-[#C9A24D]/20 mx-auto"></div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-bold">1</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">Thème</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold">3-5</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">Exercices</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold">1</p>
                      <p className="text-[10px] uppercase tracking-widest opacity-40">Synthèse</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. CONTENU D'UN CYCLE */}
      <section className="py-32 px-6 bg-white border-y border-[#1A1C2E]/5">
        <div className="max-w-6xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 text-[#1A1C2E] text-[10px] font-bold uppercase tracking-[0.4em]">
              <BookOpen className="w-4 h-4" />
              CONTENU D’UN CYCLE MENSUEL
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold">Chaque mois, tu reçois :</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "1. Une lecture ciblée",
                icon: Eye,
                points: [
                  "Focus sur un aspect précis de ton thème",
                  "Lien avec le cycle actuel",
                  "Mise en perspective simple et lisible"
                ]
              },
              {
                title: "2. Des exercices concrets",
                icon: Activity,
                points: [
                  "Exercices d’observation (comportements, décisions)",
                  "Exercices d’écriture ou de réflexion guidée",
                  "Petites expérimentations dans le quotidien"
                ],
                footer: "👉 Aucun exercice intrusif ou psychologique."
              },
              {
                title: "3. Un temps de synthèse",
                icon: Repeat,
                points: [
                  "Questions de recul",
                  "Mise en lien avec le mois suivant"
                ]
              }
            ].map((card, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                className="p-10 rounded-[50px] bg-[#FDFBF7] border border-[#1A1C2E]/5 space-y-8 flex flex-col h-full hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#C9A24D]">
                  <card.icon className="w-8 h-8" />
                </div>
                <div className="space-y-6 flex-1">
                  <h3 className="text-2xl font-serif font-bold">{card.title}</h3>
                  <ul className="space-y-4">
                    {card.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-[#1A1C2E]/60 text-lg leading-relaxed">
                        <ChevronRight className="w-5 h-5 text-[#C9A24D] shrink-0 mt-1" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {card.footer && (
                  <div className="pt-6 border-t border-[#1A1C2E]/5 text-sm font-bold text-[#C9A24D] uppercase tracking-widest italic">
                    {card.footer}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THÈMES MENSUELS */}
      <section className="py-32 px-6 bg-[#FDFBF7]">
        <div className="max-w-5xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#5B4B8A]/10 text-[#5B4B8A] text-[10px] font-bold uppercase tracking-[0.4em]">
              <Brain className="w-4 h-4" />
              THÈMES MENSUELS
            </div>
            <h2 className="text-4xl md:text-7xl font-serif font-bold italic">Une structure claire.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Observer ses automatismes",
              "Comprendre ses rythmes personnels",
              "Rapport à la décision",
              "Gestion de l’énergie et de la fatigue",
              "Relation aux autres",
              "Sens et motivation",
              "Résistance et friction",
              "Ajustement des priorités",
              "Fin de cycle et lâcher-prise",
              "Vision à moyen terme",
              "Stabilisation",
              "Synthèse et recul global"
            ].map((theme, i) => (
              <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-[#1A1C2E]/5 shadow-sm hover:translate-x-2 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-[#1A1C2E] text-white flex items-center justify-center text-xs font-black">
                  {i + 1}
                </div>
                <span className="text-lg font-medium">{theme}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OPTIONS & PRICING */}
      <section className="py-32 px-6 bg-[#1A1C2E] text-white rounded-[80px] mx-4 md:mx-10 my-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A24D]/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-6xl mx-auto space-y-24 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-bold uppercase tracking-[0.4em]">
              <Users className="w-5 h-5" />
              OPTIONS AVEC COACH
            </div>
            <h2 className="text-5xl md:text-8xl font-serif font-bold">Choisis ton format.</h2>
            <div className="p-6 bg-white/5 border border-white/10 rounded-3xl max-w-2xl mx-auto space-y-2">
              <div className="flex items-center justify-center gap-3 text-red-400">
                <Zap className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Important</span>
              </div>
              <p className="text-white/60 text-sm italic">
                On parle de coach de réflexion / facilitateur, pas de thérapeute.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* OPTION 1 */}
            <motion.div 
              {...fadeIn} 
              className="flex flex-col p-12 rounded-[60px] bg-[#C9A24D] text-white space-y-10 shadow-2xl scale-105 relative z-20"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white text-[#C9A24D] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                LE PLUS POPULAIRE
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <Compass className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Parcours Autonome</h3>
                <p className="text-white/60 text-sm font-bold uppercase tracking-widest">🔵 Option 1</p>
              </div>

              <ul className="space-y-4 flex-1">
                {[
                  "Accès aux 12 cycles",
                  "Tous les contenus et exercices",
                  "Accès pendant 12 mois",
                  "Sans rendez-vous individuel"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg">
                    <Check className="w-5 h-5 text-white shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-6 pt-10 border-t border-white/20">
                <div className="text-4xl font-serif font-bold text-white">499 €/an</div>
                <button className="w-full py-5 bg-white text-[#C9A24D] rounded-full font-bold text-lg hover:scale-105 transition-all">
                  Choisir ce format
                </button>
              </div>
            </motion.div>

            {/* OPTION 2 */}
            <motion.div 
              {...fadeIn}
              className="flex flex-col p-12 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-sm space-y-10 hover:bg-white/10 transition-all"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                  <MessageCircle className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Parcours + Coach Mensuel</h3>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">🟣 Option 2</p>
              </div>

              <ul className="space-y-4 flex-1">
                {[
                  "Tout le parcours autonome",
                  "1 session individuelle (1 heure/mois)",
                  "Échange autour des exercices",
                  "Aide à clarifier et prendre du recul"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg opacity-80">
                    <Check className="w-5 h-5 text-white shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-6 pt-10 border-t border-white/10">
                <div className="text-4xl font-serif font-bold text-white">1 599 €/an</div>
                <button className="w-full py-5 bg-white text-[#1A1C2E] rounded-full font-bold text-lg hover:bg-[#C9A24D] hover:text-white transition-all">
                  Choisir ce format
                </button>
              </div>
            </motion.div>

            {/* OPTION 3 */}
            <motion.div {...fadeIn} className="flex flex-col p-12 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-sm space-y-10 hover:bg-white/10 transition-all">
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-400">
                  <TrendingUp className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-serif font-bold">Parcours + Coach Hebdo</h3>
                <p className="text-white/40 text-sm font-bold uppercase tracking-widest">🔴 Option 3</p>
              </div>

              <ul className="space-y-4 flex-1">
                {[
                  "Tout le parcours autonome",
                  "1 session (1 heure/semaine)",
                  "Cadre plus soutenu",
                  "Ajustement des expérimentations",
                  "Engagement maximum"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-lg opacity-80">
                    <Check className="w-5 h-5 text-red-400 shrink-0 mt-1" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-6 pt-10 border-t border-white/10">
                <div className="text-4xl font-serif font-bold text-red-400">2 999 €/an</div>
                <button className="w-full py-5 bg-white text-[#1A1C2E] rounded-full font-bold text-lg hover:bg-red-400 hover:text-white transition-all">
                  Choisir ce format
                </button>
              </div>
            </motion.div>
          </div>

          {/* CADRE CLAIR OBLIGATOIRE */}
          <div className="max-w-4xl mx-auto p-10 border border-white/10 rounded-[40px] bg-white/5 text-center space-y-6">
            <div className="flex items-center justify-center gap-3 text-[#C9A24D]">
              <ShieldCheck className="w-6 h-6" />
              <span className="text-xs font-black uppercase tracking-[0.3em]">Cadre Légal & Éthique</span>
            </div>
            <p className="text-white/60 text-lg leading-relaxed italic">
              "Les sessions avec le coach sont des temps d’échange et de réflexion. Elles ne constituent ni une thérapie, ni un accompagnement médical ou psychologique. Aucun résultat spécifique n’est garanti."
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
