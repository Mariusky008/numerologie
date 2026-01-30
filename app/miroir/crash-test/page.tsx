'use client';

import React from 'react';
import { motion } from 'framer-motion';
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
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CrashTestLanding() {
  const router = useRouter();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1C2E] font-sans selection:bg-[#C9A24D]/20 overflow-x-hidden">
      
      {/* HERO — ÉCRAN 1 */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#FDFBF7]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#C9A24D]/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#5B4B8A]/5 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-3xl w-full z-10 text-center space-y-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1C2E] text-white text-[10px] font-black uppercase tracking-[0.3em]"
          >
            <Zap className="w-4 h-4 text-[#C9A24D]" />
            Le Crash-Test de ton Destin
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1]"
          >
            Tu connais ton potentiel. <br />
            <span className="text-[#C9A24D] italic">Mais est-ce vraiment comme ça que tu fonctionnes ?</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6 text-xl md:text-2xl text-[#1A1C2E]/70 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            <p>
              Nous comparons ton profil symbolique <br />
              <span className="text-[#1A1C2E] font-bold">(astrologie & numérologie)</span> <br />
              avec tes réactions réelles face aux choix.
            </p>
            <p className="text-[#C9A24D] font-bold">
              👉 Le décalage explique souvent <br />
              pourquoi certaines choses bloquent.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="pt-6"
          >
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="group relative inline-flex items-center gap-4 px-10 py-6 bg-[#1A1C2E] text-white rounded-full font-bold text-xl hover:bg-[#2A2D45] transition-all shadow-2xl hover:shadow-[#C9A24D]/20 active:scale-95"
            >
              👉 Faire mon Crash-Test
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#1A1C2E]/20"
        >
          <ArrowRight className="w-8 h-8 rotate-90" />
        </motion.div>
      </section>

      {/* SECTION — LE PRINCIPE */}
      <section className="py-32 px-6 bg-white border-y border-[#1A1C2E]/5">
        <div className="max-w-5xl mx-auto space-y-20">
          <motion.div {...fadeIn} className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold">Deux lectures. Une confrontation.</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                step: "1️⃣", 
                title: "Ton Empreinte", 
                desc: "Une lecture symbolique basée sur ta date de naissance. Ce qu’on dit souvent de ton potentiel.",
                icon: Star,
                color: "bg-[#C9A24D]/10 text-[#C9A24D]"
              },
              { 
                step: "2️⃣", 
                title: "Tes Réflexes", 
                desc: "Des mini-tests interactifs de décision, où tu fais des choix concrets, sans “bonne réponse”.",
                icon: Activity,
                color: "bg-[#1A1C2E]/5 text-[#1A1C2E]"
              },
              { 
                step: "3️⃣", 
                title: "Le Choc", 
                desc: "Là où ce que tu crois être ne correspond pas toujours à ce que tu fais.",
                icon: Zap,
                color: "bg-[#5B4B8A]/10 text-[#5B4B8A]"
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[40px] bg-[#FDFBF7] border border-[#1A1C2E]/5 space-y-6"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-serif font-bold">{item.step} {item.title}</h3>
                <p className="text-[#1A1C2E]/70 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeIn} className="text-center text-2xl font-serif italic text-[#C9A24D]">
            C’est là que la prise de conscience commence.
          </motion.p>
        </div>
      </section>

      {/* SECTION — POURQUOI C’EST DIFFÉRENT */}
      <section className="py-32 px-6 bg-[#1A1C2E]/[0.02]">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.h2 {...fadeIn} className="text-4xl md:text-6xl font-serif font-bold text-center">
            Ce n’est pas un horoscope de plus.
          </motion.h2>

          <div className="space-y-6">
            {[
              { text: "Ce n’est pas une prédiction", positive: false },
              { text: "Ce n’est pas un test de personnalité figé", positive: false },
              { text: "Ce n’est pas du développement personnel flou", positive: false },
              { text: "C’est une comparaison directe entre une lecture symbolique et tes comportements réels sous contrainte.", positive: true }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-6 p-8 rounded-3xl border ${item.positive ? 'bg-white border-[#C9A24D] shadow-xl shadow-[#C9A24D]/5' : 'bg-white/50 border-[#1A1C2E]/5'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.positive ? 'bg-[#C9A24D] text-white' : 'bg-red-50 text-red-400'}`}>
                  {item.positive ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>
                <span className={`text-xl md:text-2xl ${item.positive ? 'font-bold text-[#1A1C2E]' : 'text-[#1A1C2E]/50'}`}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION — CE QUE TU DÉCOUVRES */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.h2 {...fadeIn} className="text-4xl md:text-6xl font-serif font-bold text-center">
            Ce que révèle ton Crash-Test
          </motion.h2>

          <div className="grid gap-4">
            {[
              "Ton écart principal entre potentiel et fonctionnement réel",
              "Ton style de réaction dominant face aux décisions",
              "Ton frein invisible le plus fréquent",
              "Une clé concrète pour réaligner les deux",
              "Un plan simple sur 7 jours, sans jargon"
            ].map((text, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 p-6 rounded-2xl bg-[#FDFBF7] border border-[#1A1C2E]/5"
              >
                <div className="w-2 h-2 rounded-full bg-[#C9A24D]"></div>
                <span className="text-xl text-[#1A1C2E]/80 font-medium">{text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center space-y-2 pt-8">
            <p className="text-2xl font-serif font-bold">Pas de jugement. Pas d’étiquette.</p>
            <p className="text-xl text-[#C9A24D] italic">Juste une lecture claire et exploitable.</p>
          </motion.div>
        </div>
      </section>

      {/* SECTION — LE FORMAT */}
      <section className="py-32 px-6 bg-[#1A1C2E] text-white rounded-[60px] mx-4 md:mx-10 my-20">
        <div className="max-w-5xl mx-auto space-y-20">
          <motion.h2 {...fadeIn} className="text-4xl md:text-6xl font-serif font-bold text-center">
            Ce que tu reçois
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Un dossier personnalisé", desc: "Clair, structuré et complet.", icon: BookOpen },
              { title: "Une vidéo explicative", desc: "6–7 minutes d'analyse profonde.", icon: Video },
              { title: "Un plan d’ajustement", desc: "Simple, actionnable immédiatement.", icon: Compass }
            ].map((item, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="text-center space-y-6"
              >
                <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto border border-white/10 backdrop-blur-sm">
                  <item.icon className="w-10 h-10 text-[#C9A24D]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                  <p className="text-white/60 text-lg">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p {...fadeIn} className="text-center text-2xl md:text-3xl font-serif italic text-white/80">
            Tu ne lis pas ton destin. <br />
            <span className="text-[#C9A24D]">Tu observes comment tu fonctionnes vraiment.</span>
          </motion.p>
        </div>
      </section>

      {/* SECTION — POUR QUI / POUR QUI PAS */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
          <motion.div {...fadeIn} className="space-y-10">
            <h3 className="text-3xl font-serif font-bold text-[#C9A24D]">C’est pour toi si :</h3>
            <div className="space-y-6">
              {[
                "Tu es curieux(se) de te comprendre autrement",
                "Tu aimes confronter les idées à la réalité",
                "Tu veux arrêter de tourner en rond"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-[#C9A24D] shrink-0 mt-1" />
                  <span className="text-xl text-[#1A1C2E]/80">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeIn} className="space-y-10">
            <h3 className="text-3xl font-serif font-bold text-[#1A1C2E]/40">Ce n’est pas pour toi si :</h3>
            <div className="space-y-6">
              {[
                "Tu cherches une prédiction magique",
                "Tu veux qu’on te dise qui tu es",
                "Tu veux une réponse toute faite"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-4">
                  <X className="w-6 h-6 text-[#1A1C2E]/20 shrink-0 mt-1" />
                  <span className="text-xl text-[#1A1C2E]/40">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION — CADRE & TRANSPARENCE */}
      <section className="py-32 px-6 bg-white border-y border-[#1A1C2E]/5">
        <div className="max-w-3xl mx-auto space-y-12">
          <motion.div {...fadeIn} className="flex items-center gap-4 justify-center text-[#1A1C2E]/40">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-xl font-black uppercase tracking-[0.2em]">Important à savoir</h3>
          </motion.div>

          <div className="space-y-6">
            {[
              "Lecture symbolique + interactive",
              "Aucun diagnostic médical",
              "Aucun traitement, aucune prédiction",
              "Résultats influencés par le contexte et l’attention"
            ].map((text, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 text-lg text-[#1A1C2E]/60"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#1A1C2E]/20"></div>
                <span>{text}</span>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="space-y-4 pt-6 text-center">
            <p className="text-xl font-bold text-[#1A1C2E]">👉 Outil de compréhension personnelle, rien de plus.</p>
            <p className="text-lg text-[#C9A24D] font-bold">👉 Et c’est déjà beaucoup.</p>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(201,162,77,0.1),_transparent_70%)]"></div>
        </div>

        <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12 relative z-10">
          <h2 className="text-4xl md:text-7xl font-serif font-bold">
            Prêt à confronter ton potentiel à la réalité ?
          </h2>

          <div className="space-y-8">
            <button 
              onClick={() => router.push('/miroir/experience')}
              className="group relative inline-flex flex-col items-center gap-2 px-12 py-8 bg-[#C9A24D] text-white rounded-full font-bold shadow-2xl hover:shadow-[#C9A24D]/40 transition-all hover:scale-105 active:scale-95"
            >
              <span className="text-2xl md:text-3xl">👉 Accéder à mon Crash-Test – 29 €</span>
              <span className="text-xs uppercase tracking-[0.2em] opacity-80">Paiement sécurisé · Accès immédiat · Expérience unique</span>
            </button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t border-[#1A1C2E]/5 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-[#1A1C2E]/20">
        © {new Date().getFullYear()} MIROIR PSYCHOLOGIQUE · LE CRASH-TEST DU DESTIN
      </footer>

    </div>
  );
}
