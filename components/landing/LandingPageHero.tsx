import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Scroll, Clock, BookOpen, User as UserIcon, MapPin as MapPinIcon, Feather } from 'lucide-react';

import InclusionGridViz from '../report/InclusionGridViz';

interface LandingPageProps {
  onStart: () => void;
}

// "Hero's Journey" Variant Landing Page
export default function LandingPageHero({ onStart }: LandingPageProps) {
  // Sample data for preview
  const sampleGrid = { 1: 2, 2: 1, 3: 0, 4: 1, 5: 3, 6: 0, 7: 1, 8: 2, 9: 1 };
  const sampleMissing = [3, 6];
  const sampleExcess = [5];

  return (
    <div className="min-h-screen bg-[#1c1917] text-[#e7e5e4] overflow-hidden font-sans">
      {/* Navbar Dark */}
      <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-50 relative">
        <div className="text-2xl font-serif text-[#e7e5e4] font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#d97706]" />
          Roman de Vie
        </div>
      </nav>

      {/* Hero Section Cinematic */}
      <header className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-4 overflow-hidden">
        {/* Cinematic Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1917] via-transparent to-[#1c1917] z-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
          {/* Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d97706] rounded-full blur-[150px] opacity-20 animate-pulse"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#d97706]/10 text-[#d97706] text-xs font-bold tracking-widest uppercase mb-8 border border-[#d97706]/30">
              <Feather className="w-3 h-3" />
              Une Expérience Littéraire Unique
            </div>
            
            <h1 className="text-5xl md:text-7xl font-serif text-[#e7e5e4] mb-8 leading-tight">
              Ne lisez plus votre avenir. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#d97706] italic">Incarnez-le.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#a8a29e] font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              Nous analysons votre numérologie pour créer le plan détaillé de votre destinée... puis nous transformons ce plan en un <strong className="text-[#e7e5e4] font-medium">roman d'aventure dont VOUS êtes le héros.</strong>
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <button 
                onClick={onStart}
                className="group relative px-10 py-5 bg-[#d97706] text-white rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(217,119,6,0.5)] hover:bg-[#b45309] hover:shadow-[0_0_60px_-10px_rgba(217,119,6,0.7)] transition-all transform hover:scale-105"
              >
                <span className="flex items-center gap-3">
                  Commencer mon Épopée
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <div className="text-left text-xs text-[#78716c] uppercase tracking-widest space-y-1">
                <p>✓ Analyse Initiale Incluse</p>
                <p>✓ Roman Complet en Option</p>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* The Concept Section */}
      <section className="py-24 px-4 bg-[#292524] border-y border-[#44403c]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif text-[#e7e5e4]">
                Votre vie est déjà écrite dans les nombres. <br/>
                <span className="text-[#d97706]">Il ne reste qu'à la raconter.</span>
              </h2>
              <p className="text-lg text-[#d6d3d1] leading-relaxed">
                La numérologie classique vous donne des listes de qualités et de défauts. C'est utile, mais abstrait.
              </p>
              <p className="text-lg text-[#d6d3d1] leading-relaxed">
                Notre approche est différente : nous utilisons vos nombres pour construire la <strong>structure narrative</strong> de votre existence. Vos défis deviennent des dragons à combattre, vos cycles deviennent des chapitres, et votre mission de vie devient la quête du Graal.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <StepCard num="01" title="L'Analyse" desc="Nous décodons votre ADN numérologique complet." />
                <StepCard num="02" title="Le Roman" desc="Une IA rédige votre biographie épique sur-mesure." />
              </div>
            </div>
            
            <div className="flex-1 relative">
               {/* Book Mockup */}
               <div className="relative w-[320px] mx-auto aspect-[2/3] bg-[#1c1917] rounded-r-xl rounded-l-sm shadow-2xl border-l-4 border-[#78350f] transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#292524] to-[#0c0a09] rounded-r-xl opacity-90"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center border border-[#d97706]/30 m-2 rounded-r-lg border-l-0">
                    <div className="text-[#d97706] text-xs tracking-[0.4em] uppercase mb-8">Best-Seller Unique</div>
                    <h3 className="font-serif text-5xl text-[#e7e5e4] mb-2 tracking-tighter">L'Élu(e)</h3>
                    <p className="text-[#a8a29e] text-sm italic mt-4">
                      "Celui qui ne connaissait pas son nom..."
                    </p>
                    <div className="mt-auto w-16 h-16 rounded-full border border-[#d97706]/50 flex items-center justify-center text-[#d97706]">
                      <UserIcon className="w-8 h-8" />
                    </div>
                  </div>
                  {/* Glow behind book */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#d97706]/20 blur-3xl -z-10 group-hover:bg-[#d97706]/30 transition-colors"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Reassurance */}
      <section className="py-20 px-4 bg-[#1c1917]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-serif text-[#e7e5e4] mb-4">Une base scientifique solide</h2>
          <p className="text-[#a8a29e]">
            Avant d'écrire la légende, nous devons comprendre l'humain. Votre parcours commence par une analyse rigoureuse.
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <TechCard 
            icon="📐" 
            title="Géométrie Sacrée" 
            desc="Calcul précis de vos 7 nombres fondamentaux selon la méthode pythagoricienne."
          />
          <TechCard 
            icon="🌌" 
            title="Cycles Temporels" 
            desc="Projection de vos cycles de vie passés, présents et futurs pour situer l'intrigue."
          />
          <TechCard 
            icon="🧠" 
            title="Psychologie Profonde" 
            desc="Analyse de votre personnalité intime et de vos mécanismes inconscients."
          />
        </div>

        {/* Methodology Deep Dive */}
        <div className="max-w-4xl mx-auto bg-[#292524] rounded-2xl p-8 md:p-12 border border-[#44403c] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d97706]/5 rounded-full blur-3xl -z-10"></div>
          <h3 className="text-xl md:text-2xl font-serif text-[#e7e5e4] mb-6 text-center">
            Comment nous garantissons la précision de votre profil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-[#d97706] font-bold">01.</span>
                <p className="text-[#d6d3d1] text-sm">
                  <strong className="text-[#e7e5e4] block mb-1">Algorithme Multi-Couches</strong>
                  Nous croisons votre Chemin de Vie (basé sur la date) avec votre Nombre d'Expression (basé sur le nom) pour détecter les conflits internes et les talents latents.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#d97706] font-bold">02.</span>
                <p className="text-[#d6d3d1] text-sm">
                  <strong className="text-[#e7e5e4] block mb-1">Grille d'Inclusion Exclusive</strong>
                  Contrairement aux horoscopes génériques, nous calculons la répartition exacte de vos énergies (manques et excès) pour révéler vos dettes karmiques spécifiques.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-[#d97706] font-bold">03.</span>
                <p className="text-[#d6d3d1] text-sm">
                  <strong className="text-[#e7e5e4] block mb-1">Astrologie Structurelle</strong>
                  Nous intégrons la vibration de votre lieu de naissance pour affiner l'analyse et comprendre l'influence de votre environnement d'origine.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#d97706] font-bold">04.</span>
                <p className="text-[#d6d3d1] text-sm">
                  <strong className="text-[#e7e5e4] block mb-1">Vérification Cohérente</strong>
                  Chaque rapport est généré pour être logiquement cohérent : un cycle de vie ne peut pas contredire un défi majeur. Tout est lié.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Impact Section */}
      <section className="py-24 px-4 bg-[#0c0a09] relative">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4">
            <Star className="w-6 h-6 text-[#d97706] fill-[#d97706] animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#e7e5e4] mb-8">
            Une expérience émotionnelle <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fbbf24] to-[#d97706]">bouleversante.</span>
          </h2>
          <p className="text-xl text-[#a8a29e] mb-12 max-w-3xl mx-auto leading-relaxed">
            Ce n'est pas juste un livre. C'est un miroir. <br/>
            Découvrir sa vie transposée dans une fiction crée un déclic psychologique puissant.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <ImpactCard 
              quote="J'ai pleuré en lisant le chapitre 3. C'était exactement ce que j'avais vécu à 20 ans, mais vu sous un angle héroïque qui m'a enfin permis de pardonner."
              author="Sarah, 42 ans"
            />
            <ImpactCard 
              quote="Voir mes défauts incarnés par un personnage attachant m'a aidé à les accepter. Je ne me suis jamais senti aussi compris que par ce livre écrit par une machine."
              author="Thomas, 35 ans"
            />
            <ImpactCard 
              quote="C'est étrange et magique. On sait que c'est une fiction, mais ça résonne tellement fort avec la réalité que ça en devient une thérapie."
              author="Elena, 29 ans"
            />
          </div>
        </div>
      </section>

      {/* Featured Testimonial - Long Form */}
      <section className="py-24 px-4 bg-[#1c1917] border-y border-[#44403c] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] opacity-20"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 text-center md:text-left">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#d97706] mx-auto md:mx-0 overflow-hidden mb-6 shadow-2xl">
                <div className="w-full h-full bg-stone-800 flex items-center justify-center text-4xl">👨‍💼</div>
              </div>
              <h3 className="text-2xl font-serif text-[#e7e5e4] mb-2">Julien M.</h3>
              <p className="text-[#d97706] font-bold text-sm tracking-widest uppercase mb-4">Entrepreneur, 41 ans</p>
              <div className="flex gap-1 justify-center md:justify-start text-[#d97706]">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="relative">
                <span className="absolute -top-8 -left-4 text-8xl text-[#292524] font-serif">"</span>
                <blockquote className="text-lg md:text-xl text-[#d6d3d1] leading-relaxed space-y-6 font-light">
                  <p>
                    <span className="text-[#e7e5e4] font-medium">J'étais sceptique.</span> Je pensais recevoir un énième PDF générique avec des phrases bateau sur mon signe astrologique. Mais quand j'ai commencé à lire "Le Gardien des Seuils" (le titre de mon livre), j'ai eu des frissons dès la première page.
                  </p>
                  <p>
                    Le héros, c'était moi. Pas un "moi" idéalisé, mais un moi profond, avec mes doutes réels que je n'avais jamais avoués à personne. L'IA a utilisé mon cycle de vie actuel (une année personnelle 4) pour construire une intrigue où le protagoniste devait justement apprendre à structurer le chaos.
                  </p>
                  <p>
                    <span className="text-[#d97706] italic">C'était plus qu'une lecture, c'était une révélation.</span> Voir mes obstacles transformés en quête épique m'a redonné le pouvoir sur ma propre vie. J'ai compris que je n'étais pas "bloqué", mais en "préparation". Ce changement de perspective vaut tout l'or du monde.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#d97706]/20 to-[#1c1917]"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#e7e5e4]">Le premier chapitre <br/> commence maintenant.</h2>
          <p className="text-xl text-[#d6d3d1]">
            Ne laissez pas les pages de votre vie rester blanches. Découvrez qui vous êtes vraiment.
          </p>
          <button 
            onClick={onStart}
            className="px-12 py-6 bg-[#e7e5e4] text-[#1c1917] rounded-full font-bold text-xl hover:bg-white transition-colors shadow-2xl hover:scale-105 transform duration-300"
          >
            Lancer l'analyse et le récit
          </button>
          <p className="text-sm text-[#78716c]">Aucune inscription requise pour l'analyse initiale</p>
        </div>
      </section>

      {/* Footer Minimal with Disclaimer */}
      <footer className="py-12 px-4 text-center text-[#57534e] text-xs border-t border-[#292524] bg-[#151413]">
        <div className="max-w-4xl mx-auto space-y-6">
          <p>&copy; {new Date().getFullYear()} Roman de Vie. Une expérience Numérologie.app</p>
          
          <div className="border-t border-[#292524] pt-6 max-w-2xl mx-auto">
            <p className="text-[#44403c] leading-relaxed">
              <strong>Avertissement Légal :</strong> Ce service est conçu à des fins de divertissement, d'introspection et de développement personnel uniquement. 
              Les analyses numérologiques et les récits générés par intelligence artificielle ne constituent en aucun cas un conseil psychologique, médical, financier ou juridique. 
              L'option "Roman de Vie" est une œuvre de fiction personnalisée basée sur vos données.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-[#1c1917] border border-[#44403c] hover:border-[#d97706]/50 transition-colors">
      <span className="text-3xl font-serif text-[#44403c] font-bold">{num}</span>
      <div>
        <h4 className="text-[#e7e5e4] font-bold">{title}</h4>
        <p className="text-sm text-[#a8a29e]">{desc}</p>
      </div>
    </div>
  );
}

function TechCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="p-8 bg-[#292524] rounded-2xl border border-[#44403c] text-center hover:bg-[#35312e] transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-[#e7e5e4] mb-2">{title}</h3>
      <p className="text-[#a8a29e] text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ImpactCard({ quote, author }: { quote: string, author: string }) {
  return (
    <div className="p-6 rounded-xl bg-[#1c1917] border border-[#d97706]/20 hover:border-[#d97706]/40 transition-all group">
      <div className="text-[#d97706] text-4xl font-serif mb-2 opacity-50">"</div>
      <p className="text-[#d6d3d1] italic mb-6 leading-relaxed relative z-10">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#d97706]/20 flex items-center justify-center text-[#d97706] text-xs font-bold">
          {author.charAt(0)}
        </div>
        <span className="text-[#a8a29e] text-xs font-bold tracking-widest uppercase">{author}</span>
      </div>
    </div>
  );
}
