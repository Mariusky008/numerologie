'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  ChevronDown
} from 'lucide-react';

export default function PsyMirrorLanding() {
  const scrollToNext = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1C2E] font-sans selection:bg-[#007AFF]/10">
      
      {/* 1️⃣ HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,122,255,0.03),_transparent_70%)] pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1C2E]/5 border border-[#1A1C2E]/10 text-[#1A1C2E]/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
            Analyse Comportementale & Décisionnelle
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
            Tu ne te connais pas aussi bien que tu le crois.
          </h1>
          
          <p className="text-lg md:text-xl text-[#1A1C2E]/70 mb-10 leading-relaxed max-w-2xl mx-auto">
            Cet outil met en lumière l’écart entre ce que tu penses être et ce que ton comportement révèle réellement face aux situations concrètes.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={() => document.getElementById('steps')?.scrollIntoView({ behavior: 'smooth' })}
              className="group flex items-center gap-3 px-8 py-4 bg-[#1A1C2E] text-white rounded-full font-bold hover:bg-[#2C2F4A] transition-all shadow-[0_10px_30px_rgba(26,28,46,0.2)] hover:scale-105"
            >
              Découvrir mon miroir psychologique
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[11px] text-[#1A1C2E]/40 uppercase tracking-widest font-medium">
              Expérience individuelle de 20 minutes
            </p>
          </div>
        </motion.div>

        <motion.button 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToNext}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 p-2 text-[#1A1C2E]/20 hover:text-[#1A1C2E]/40 transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      {/* 2️⃣ SECTION — PAS UN TEST CLASSIQUE */}
      <section className="py-24 px-6 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pourquoi ce n’est PAS un test de personnalité</h2>
            <p className="text-[#1A1C2E]/60">Oubliez les étiquettes et les classifications figées.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Classique */}
            <div className="p-8 rounded-3xl border border-[#1A1C2E]/5 bg-white/50 space-y-6 opacity-60">
              <h3 className="font-bold text-lg uppercase tracking-wider text-[#1A1C2E]/40">Test Classique</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>Tu réponds → On te classe dans une case</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>Rapport figé et descriptif</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>Résultat abstrait sans application</span>
                </li>
              </ul>
            </div>

            {/* Miroir */}
            <div className="p-8 rounded-3xl border-2 border-[#1A1C2E] bg-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="px-2 py-1 bg-[#1A1C2E] text-white text-[10px] font-bold rounded uppercase">Recommandé</div>
              </div>
              <h3 className="font-bold text-lg uppercase tracking-wider">Le Miroir Psychologique</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Tu choisis → On observe tes décisions</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Analyse comportementale dynamique</span>
                </li>
                <li className="flex gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Lecture actionnable et concrète</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3️⃣ SECTION — COMMENT ÇA FONCTIONNE */}
      <section id="steps" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Le parcours de révélation</h2>
            <p className="text-[#1A1C2E]/60 max-w-xl mx-auto">Une immersion en 3 étapes pour décoder vos mécanismes internes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Ligne de connexion (Desktop) */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1A1C2E]/10 to-transparent"></div>

            {[
              {
                step: "01",
                title: "Auto-perception",
                desc: "Tu réponds à des situations concrètes du quotidien pour définir ton image consciente.",
                icon: <Search className="w-6 h-6" />
              },
              {
                step: "02",
                title: "Décisions sous conditions",
                desc: "Tu fais des choix dans des scénarios réalistes et parfois ambigus pour tester tes réflexes.",
                icon: <Target className="w-6 h-6" />
              },
              {
                step: "03",
                title: "Le Miroir",
                desc: "On te montre précisément où ton comportement ne correspond pas à ce que tu crois être.",
                icon: <Zap className="w-6 h-6" />
              }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-16 h-16 rounded-2xl bg-[#F8F9FA] border border-[#1A1C2E]/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#1A1C2E] group-hover:text-white transition-all duration-500 shadow-sm">
                  {s.icon}
                </div>
                <div className="text-xs font-bold text-[#1A1C2E]/30 uppercase tracking-widest mb-2">{s.step}</div>
                <h3 className="text-xl font-bold mb-4">{s.title}</h3>
                <p className="text-sm text-[#1A1C2E]/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-6 rounded-2xl bg-[#F8F9FA] border border-[#1A1C2E]/5 text-center max-w-2xl mx-auto">
            <p className="text-sm italic text-[#1A1C2E]/70">
              "L'expérience est courte (20–25 min) et sans pression : il n'y a aucune bonne ou mauvaise réponse, seulement la vérité de vos réactions."
            </p>
          </div>
        </div>
      </section>

      {/* 4️⃣ SECTION — CE QUE TU DÉCOUVRES VRAIMENT */}
      <section className="py-24 px-6 bg-[#1A1C2E] text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_10%,_rgba(255,255,255,0.05),_transparent_50%)]"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que tu découvres vraiment</h2>
            <p className="text-white/50">Pas de magie, seulement de l'utilité concrète.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Ton écart psychologique central",
              "Ton mode de réaction dominant",
              "Ton angle mort principal",
              "Ton levier prioritaire d’ajustement",
              "Un plan d'action simple sur 7 jours"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5️⃣ SECTION — FORMAT DU LIVRABLE */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Tu ne lis pas un rapport.<br />
                <span className="text-[#1A1C2E]/40 text-2xl md:text-3xl">Tu te vois fonctionner.</span>
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#007AFF]/10 flex items-center justify-center shrink-0 text-[#007AFF]">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Dossier interactif personnalisé</h4>
                    <p className="text-sm text-[#1A1C2E]/60 leading-relaxed">15 à 20 pages d'analyse structurée sur ton mode opératoire décisionnel.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[#FF2D55]/10 flex items-center justify-center shrink-0 text-[#FF2D55]">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Vidéo explicative personnalisée</h4>
                    <p className="text-sm text-[#1A1C2E]/60 leading-relaxed">6 à 7 minutes de décryptage visuel pour comprendre tes angles morts.</p>
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 text-emerald-600">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">Lecture non culpabilisante</h4>
                    <p className="text-sm text-[#1A1C2E]/60 leading-relaxed">Une approche factuelle et claire pour arrêter de tourner en rond.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-sm">
              <div className="aspect-[3/4] bg-[#F8F9FA] rounded-[40px] border border-[#1A1C2E]/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-8">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] opacity-20"></div>
                <div className="w-20 h-20 bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6 relative z-10">
                  <FileText className="w-10 h-10 text-[#1A1C2E]" />
                </div>
                <div className="text-center relative z-10">
                  <div className="text-2xl font-bold mb-2 tracking-tight">Mon Dossier</div>
                  <div className="text-xs uppercase tracking-widest text-[#1A1C2E]/40 font-bold">Analyse 2026</div>
                </div>
                <div className="mt-12 w-full space-y-2 relative z-10">
                  <div className="h-1.5 w-full bg-[#1A1C2E]/5 rounded-full"></div>
                  <div className="h-1.5 w-3/4 bg-[#1A1C2E]/5 rounded-full"></div>
                  <div className="h-1.5 w-1/2 bg-[#1A1C2E]/5 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6️⃣ SECTION — POUR QUI / PAS POUR QUI */}
      <section className="py-24 px-6 bg-[#F8F9FA]">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              C'est pour toi si...
            </h3>
            <ul className="space-y-4">
              {[
                "tu veux comprendre tes réactions automatiques",
                "tu veux décider plus clairement au quotidien",
                "tu veux arrêter de répéter les mêmes erreurs"
              ].map((text, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#1A1C2E]/70 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold flex items-center gap-3 text-[#1A1C2E]/40">
              Ce n'est pas pour toi si...
            </h3>
            <ul className="space-y-4">
              {[
                "tu cherches une prédiction sur ton avenir",
                "tu veux qu'on te donne une étiquette figée",
                "tu attends une solution miracle sans effort"
              ].map((text, i) => (
                <li key={i} className="flex gap-3 text-sm text-[#1A1C2E]/40 leading-relaxed">
                  <XCircle className="w-5 h-5 text-red-300 shrink-0" />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7️⃣ SECTION — CADRE & ÉTHIQUE */}
      <section className="py-24 px-6 bg-white border-t border-[#1A1C2E]/5">
        <div className="max-w-3xl mx-auto text-center space-y-10">
          <ShieldCheck className="w-12 h-12 text-[#1A1C2E]/20 mx-auto" />
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Cadre & Déontologie</h2>
            <p className="text-sm text-[#1A1C2E]/60 leading-relaxed px-4">
              Cet outil est une ressource de compréhension personnelle et comportementale. 
              Il ne constitue en aucun cas un avis médical, thérapeutique ou un diagnostic clinique. 
              Notre approche repose sur l'observation des processus décisionnels dans un cadre de développement personnel.
            </p>
          </div>
        </div>
      </section>

      {/* 8️⃣ CTA FINAL */}
      <section className="py-24 px-6 bg-[#F8F9FA] text-center border-t border-[#1A1C2E]/5">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Prêt à voir ton reflet ?</h2>
            <p className="text-[#1A1C2E]/60">Accédez immédiatement à votre analyse complète après l'expérience.</p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button className="w-full md:w-auto px-12 py-5 bg-[#1A1C2E] text-white rounded-full font-bold text-lg hover:bg-[#2C2F4A] transition-all shadow-2xl hover:scale-105 active:scale-95">
              Accéder à mon miroir psychologique — 29 €
            </button>
            
            <div className="grid grid-cols-3 gap-8 w-full max-w-sm mx-auto pt-4 border-t border-[#1A1C2E]/5">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#1A1C2E]/40" />
                <span className="text-[9px] font-bold uppercase tracking-tighter text-[#1A1C2E]/40 text-center">Paiement Sécurisé</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Zap className="w-4 h-4 text-[#1A1C2E]/40" />
                <span className="text-[9px] font-bold uppercase tracking-tighter text-[#1A1C2E]/40 text-center">Accès Immédiat</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-[#1A1C2E]/40" />
                <span className="text-[9px] font-bold uppercase tracking-tighter text-[#1A1C2E]/40 text-center">Expérience Unique</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 text-center border-t border-[#1A1C2E]/5 bg-white">
        <p className="text-[10px] text-[#1A1C2E]/30 uppercase tracking-widest leading-relaxed">
          Miroir Psychologique &copy; 2026 • Un outil de compréhension comportementale.<br />
          Tous droits réservés.
        </p>
      </footer>

    </div>
  );
}
