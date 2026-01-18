import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Scroll, Clock, BookOpen, User as UserIcon, MapPin as MapPinIcon } from 'lucide-react';

import InclusionGridViz from '../report/InclusionGridViz';

interface LandingPageProps {
  onStart: () => void;
}

// Optimized Landing Page with high conversion elements
export default function LandingPage({ onStart }: LandingPageProps) {
  // Sample data for preview
  const sampleGrid = { 1: 2, 2: 1, 3: 0, 4: 1, 5: 3, 6: 0, 7: 1, 8: 2, 9: 1 };
  const sampleMissing = [3, 6];
  const sampleExcess = [5];
  return (
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] overflow-hidden">
      {/* Navbar Simple */}
      <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-serif text-[#2C2F4A] font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-[#C9A24D] fill-[#C9A24D]" />
          Numérologie
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 md:pt-24 md:pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] text-xs font-bold tracking-widest uppercase mb-6 border border-[#C9A24D]/20">
              Architecture de l'Âme
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#2C2F4A] mb-6 leading-tight">
              Et si votre nom n'était pas un hasard ? <br />
              <span className="italic text-[#C9A24D] text-3xl md:text-5xl block mt-2">Accédez au mode d'emploi de votre vie.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#2C2F4A]/80 font-medium mb-12 max-w-2xl mx-auto">
              Notre méthode combine des méthodes traditionnelles de numérologie et d’astrologie pour générer une interprétation structurée de votre profil.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-3xl mx-auto mb-12 bg-white/60 p-6 rounded-2xl border border-[#C9A24D]/10 backdrop-blur-sm">
               <div className="flex gap-3 items-start">
                 <span className="text-2xl">🗝️</span>
                 <p className="text-sm text-[#2C2F4A] font-medium">Quelle est la peur inconsciente qui bloque votre carrière ?</p>
               </div>
               <div className="flex gap-3 items-start">
                 <span className="text-2xl">✨</span>
                 <p className="text-sm text-[#2C2F4A] font-medium">Quel est le talent caché que vous possédez depuis l'enfance ?</p>
               </div>
               <div className="flex gap-3 items-start">
                 <span className="text-2xl">🔮</span>
                 <p className="text-sm text-[#2C2F4A] font-medium">Pourquoi certains schémas se répètent-ils dans vos relations ?</p>
               </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="group relative px-8 py-4 bg-[#C9A24D] text-white rounded-full font-medium text-lg shadow-xl shadow-[#C9A24D]/30 hover:bg-[#b08d44] transition-all hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Révéler mon Profil (v2)
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <div className="flex items-center gap-2 text-sm text-[#8FA6A0] mt-4 md:mt-0 bg-white/80 px-4 py-2 rounded-full border border-stone-100">
                <span className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-6 h-6 rounded-full bg-stone-200 border-2 border-white"></div>
                  ))}
                </span>
                <span>+1 200 analyses générées</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A24D]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </header>

      {/* Services Detail Section */}
      <section className="py-12 border-b border-[#C9A24D]/10">
         <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-center text-xl font-serif text-[#2C2F4A] mb-8">Ce que votre analyse révèle</h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
               <ServicePill icon="📊" text="Chemin de Vie" />
               <ServicePill icon="🌟" text="Mission de Vie" />
               <ServicePill icon="⚖️" text="Dettes Karmiques" />
               <ServicePill icon="📆" text="Prévisions 12 mois" />
               <ServicePill icon="🧩" text="Grille d'Inclusion" />
               <ServicePill icon="🔮" text="Défis de Vie" />
               <ServicePill icon="♈" text="Signe Astrologique" />
               <ServicePill icon="🪐" text="Planète Dominante" />
            </div>
         </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-12 bg-[#FAF9F7] border-y border-[#C9A24D]/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-serif text-[#2C2F4A] mb-8">Ils ont découvert leur plan de vie</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Julie, 34 ans" 
              role="Consultante"
              text="Le rapport m’a permis de comprendre pourquoi certaines situations professionnelles se répétaient et à quel moment agir plutôt que forcer."
            />
            <TestimonialCard 
              name="Marc, 41 ans" 
              role="Entrepreneur"
              text="La lecture des cycles m’a aidé à mieux planifier mes décisions importantes au lieu d’agir au hasard."
            />
            <TestimonialCard 
              name="Sophie, 29 ans" 
              role="Thérapeute"
              text="La grille d'inclusion est un outil incroyable. La visualisation graphique m'a permis de voir mes carences et mes excès en un coup d'œil."
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 border-y border-[#C9A24D]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-[#2C2F4A] mb-4">Comment ça marche ?</h2>
            <p className="text-[#2C2F4A]/80">Une méthodologie unique alliant tradition pythagoricienne et méthodes modernes.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-[#C9A24D]" />}
              title="Identité Vibratoire"
              desc="Interprétation de vos nombres personnels pour mieux comprendre vos forces et vos défis."
            />
            <FeatureCard 
              icon={<Scroll className="w-8 h-8 text-[#C9A24D]" />}
              title="Mission de Vie"
              desc="Identification des axes principaux de votre développement personnel selon votre date de naissance."
            />
            <FeatureCard 
              icon={<Clock className="w-8 h-8 text-[#C9A24D]" />}
              title="Météo Temporelle"
              desc="Analyse des cycles temporels pour vous aider à planifier vos décisions."
            />
          </div>
        </div>
      </section>

      {/* Book Novel Section */}
      <section className="py-24 px-4 bg-[#2C2F4A] text-[#FAF9F7] relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
        
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16 relative z-10">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#C9A24D]/20 text-[#C9A24D] text-xs font-bold tracking-widest uppercase border border-[#C9A24D]/30">
              <Sparkles className="w-3 h-3" />
              Exclusivité Mondiale
            </div>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              Devenez le héros <br />
              <span className="text-[#C9A24D] italic">de votre propre roman.</span>
            </h2>
            <p className="text-[#FAF9F7]/80 text-lg leading-relaxed">
              Une fois votre analyse numérologique terminée, nous écrirons pour vous un livre unique de 100 pages.
            </p>
            <p className="text-[#FAF9F7]/80 text-lg leading-relaxed">
              Un roman captivant où le personnage principal (Vous) vit une aventure façonnée par vos véritables nombres, vos souvenirs et vos défis de vie.
            </p>
            
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                  <UserIcon className="w-4 h-4" />
                </div>
                <span>Un protagoniste qui possède votre caractère et votre vécu.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                  <MapPinIcon className="w-4 h-4" />
                </div>
                <span>Vos lieux de vie réels intégrés à l'intrigue.</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#C9A24D]/20 flex items-center justify-center text-[#C9A24D]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span>Une histoire qui vous aide à comprendre votre destin.</span>
              </li>
            </ul>

            <button 
              onClick={onStart}
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#C9A24D] text-white rounded-full font-bold text-lg hover:bg-[#b08d44] transition-colors shadow-lg shadow-[#C9A24D]/20 mt-4"
            >
              <BookOpen className="w-5 h-5" />
              Commencer mon analyse pour créer mon livre
            </button>
          </div>

          <div className="flex-1 flex justify-center relative">
             <div className="relative w-[300px] md:w-[400px] aspect-[2/3] bg-[#FAF9F7] rounded-r-2xl rounded-l-md shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700 border-l-8 border-[#2C2F4A] flex flex-col overflow-hidden">
                <div className="h-full p-8 flex flex-col items-center justify-center text-center border-r border-t border-b border-[#C9A24D]/20 rounded-r-xl bg-[url('https://www.transparenttextures.com/patterns/paper.png')]">
                   <div className="text-[#C9A24D] text-xs tracking-[0.3em] uppercase mb-4">Le Roman de</div>
                   <h3 className="font-serif text-4xl text-[#2C2F4A] mb-2">Votre Vie</h3>
                   <div className="w-12 h-1 bg-[#C9A24D] my-6"></div>
                   <p className="text-[#2C2F4A]/80 text-sm italic max-w-[200px]">
                     "Une épopée où le destin n'est plus un mystère, mais une carte à jouer."
                   </p>
                   <div className="mt-auto pt-12 text-[#8FA6A0] text-xs uppercase tracking-widest">
                     Édition Unique - Numérotée
                   </div>
                </div>
                {/* Book Spine Effect */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-[#1a1c2e] to-[#2C2F4A] opacity-80"></div>
                <div className="absolute left-2 top-0 bottom-0 w-1 bg-black/10"></div>
             </div>
             
             {/* Background Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C9A24D]/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section id="preview-section" className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <span className="text-[#C9A24D] font-bold tracking-widest text-sm uppercase">Ce que vous recevez</span>
            <h2 className="text-3xl md:text-5xl font-serif text-[#2C2F4A]">
              Plus qu'un horoscope, <br />
              <span className="text-[#C9A24D]">une carte routière précise.</span>
            </h2>
            <p className="text-lg text-[#2C2F4A]/80 leading-relaxed">
              Recevez une analyse personnalisée de vos nombres, avec interprétation claire et conseils pour les prochains mois.
            </p>
            <ul className="space-y-4">
              <ListItem text="Analyse de votre Chemin de Vie et Expression" />
              <ListItem text="Détection de vos Dettes Karmiques" />
              <ListItem text="Calcul de votre Grille d'Inclusion" />
              <ListItem text="Prévisions pour les 12 prochains mois" />
            </ul>
            <button 
              onClick={onStart}
              className="text-[#C9A24D] font-bold border-b-2 border-[#C9A24D] pb-1 hover:text-[#b08d44] hover:border-[#b08d44] transition-colors"
            >
              Voir un exemple de rapport
            </button>
          </div>
          
          <div className="flex-1 relative">
            <p className="text-center text-sm text-[#2C2F4A] mb-4 italic">
              Ci-dessous, un aperçu synthétique de vos nombres personnels : chaque ligne représente une dimension de votre profil numérologique.
            </p>
            {/* Abstract Report Preview UI */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-[#C9A24D]/20 p-6 md:p-8 max-w-md mx-auto rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-8 border-b border-[#FAF9F7] pb-4">
                <div className="w-32 h-4 bg-[#FAF9F7] rounded"></div>
                <div className="w-8 h-8 rounded-full bg-[#C9A24D]/10 text-[#C9A24D] flex items-center justify-center font-serif font-bold">7</div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="w-full">
                  <InclusionGridViz 
                    grid={sampleGrid}
                    missing={sampleMissing}
                    excess={sampleExcess}
                    className="!bg-[#FAF9F7] !border-[#C9A24D]/10 !shadow-none !p-2"
                  />
                </div>
                <div className="space-y-2">
                   <div className="w-full h-3 bg-[#FAF9F7] rounded"></div>
                   <div className="w-5/6 h-3 bg-[#FAF9F7] rounded"></div>
                   <div className="w-4/6 h-3 bg-[#FAF9F7] rounded"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 h-20 bg-[#f0f9ff] rounded-lg border border-[#0ea5e9]/20"></div>
                <div className="flex-1 h-20 bg-[#FAF9F7] rounded-lg border border-[#C9A24D]/20"></div>
              </div>
            </div>
            
            {/* Decor elements */}
            <div className="absolute top-10 -right-10 w-full h-full bg-[#2C2F4A] rounded-2xl -z-10 opacity-5 rotate-6"></div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 bg-[#2C2F4A] text-[#FAF9F7] text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif">Prêt à rencontrer votre véritable vous ?</h2>
          <p className="text-[#FAF9F7]/80 text-lg">
            Commencez par la lecture essentielle offerte. Vous pourrez ensuite choisir d'approfondir avec l'étude complète.
          </p>
          <div className="flex flex-col items-center gap-4">
             <button 
               onClick={onStart}
               className="px-10 py-5 bg-[#FAF9F7] text-[#2C2F4A] rounded-full font-bold text-lg hover:bg-white transition-colors shadow-xl"
             >
               Obtenir mon rapport personnalisé (gratuit et immédiat)
             </button>
             <button 
               onClick={() => document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' })}
               className="text-[#FAF9F7]/60 hover:text-white underline text-sm mt-2"
             >
               Voir un exemple de rapport
             </button>
          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <footer className="bg-[#1a1c2e] text-[#FAF9F7]/60 py-12 px-4 border-t border-[#FAF9F7]/10 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
           <div className="space-y-4">
              <div className="flex items-center gap-2 text-white font-serif text-lg font-bold">
                 <Star className="w-5 h-5 text-[#C9A24D] fill-[#C9A24D]" />
                 Numérologie
              </div>
              <p className="opacity-80 leading-relaxed">
                 Une approche moderne de la numérologie traditionnelle pour vous aider à décoder votre potentiel et naviguer vos cycles de vie avec confiance.
              </p>
           </div>
           
           <div>
              <h4 className="text-white font-bold mb-4">Navigation</h4>
              <ul className="space-y-2">
                 <li><button onClick={onStart} className="hover:text-white transition-colors">Commencer l'analyse</button></li>
                 <li><button onClick={() => document.getElementById('preview-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Exemple de rapport</button></li>
                 <li><a href="#" className="hover:text-white transition-colors">Blog (Bientôt)</a></li>
              </ul>
           </div>
           
           <div>
              <h4 className="text-white font-bold mb-4">Légal</h4>
              <ul className="space-y-2">
                 <li>
                   <Link href="/legal/cgv" className="hover:text-white transition-colors">CGV</Link>
                   <span className="mx-2">/</span>
                   <Link href="/legal/cgu" className="hover:text-white transition-colors">CGU</Link>
                 </li>
                 <li><Link href="/legal/privacy" className="hover:text-white transition-colors">Politique de Confidentialité</Link></li>
                 <li><Link href="/legal/mentions" className="hover:text-white transition-colors">Mentions Légales</Link></li>
                 <li><Link href="/legal/cookies" className="hover:text-white transition-colors">Gestion des cookies</Link></li>
              </ul>
           </div>

           <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <p className="opacity-80 mb-2">Une question ?</p>
              <a href="mailto:contact@numerologie.app" className="text-[#C9A24D] hover:text-[#fbbf24] transition-colors">contact@numerologie.app</a>
              <div className="mt-4 flex gap-4">
                 {/* Social placeholders */}
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">IG</div>
                 <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">FB</div>
              </div>
           </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center opacity-60">
           &copy; {new Date().getFullYear()} Numérologie. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

function ServicePill({ icon, text }: { icon: string, text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#C9A24D]/20 shadow-sm text-[#2C2F4A] text-sm font-medium">
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

function TestimonialCard({ name, role, text }: { name: string, role: string, text: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#C9A24D]/10 text-left">
      <div className="flex gap-1 text-[#C9A24D] mb-3">
        {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
      </div>
      <p className="text-[#2C2F4A]/80 italic mb-4 text-sm leading-relaxed">"{text}"</p>
      <div>
        <div className="font-bold text-[#2C2F4A]">{name}</div>
        <div className="text-xs text-[#8FA6A0]">{role}</div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-[#C9A24D]/10 hover:border-[#C9A24D]/30 transition-colors shadow-sm hover:shadow-md group">
      <div className="mb-6 p-4 bg-[#FAF9F7] rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 border border-[#C9A24D]/10">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-[#2C2F4A] mb-3 font-bold">{title}</h3>
      <p className="text-[#2C2F4A]/80 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-[#2C2F4A]/80">
      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A24D]"></div>
      <span>{text}</span>
    </li>
  );
}