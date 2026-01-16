import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Scroll, Clock } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#fffbf0] text-[#57534e] overflow-hidden">
      {/* Navbar Simple */}
      <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-2xl font-serif text-[#78350f] font-bold flex items-center gap-2">
          <Star className="w-6 h-6 text-[#d97706] fill-[#d97706]" />
          Numérologie
        </div>
        <button 
          onClick={onStart}
          className="px-6 py-2 rounded-full border border-[#d97706]/30 text-[#78350f] hover:bg-[#d97706]/5 transition-colors text-sm font-medium"
        >
          Connexion
        </button>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 md:pt-24 md:pb-32 px-4">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-[#fef3c7] text-[#d97706] text-xs font-bold tracking-widest uppercase mb-6 border border-[#d97706]/20">
              Architecture de l'Âme
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-[#78350f] mb-8 leading-tight">
              Découvrez le Plan Invisible <br />
              <span className="italic text-[#d97706]">de votre Destinée</span>
            </h1>
            <p className="text-lg md:text-xl text-[#57534e] max-w-2xl mx-auto mb-12 leading-relaxed">
              Votre date de naissance et votre nom ne sont pas un hasard. Ils forment un code unique qui révèle vos talents, vos défis et votre mission de vie.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="group relative px-8 py-4 bg-[#d97706] text-white rounded-full font-medium text-lg shadow-lg shadow-[#d97706]/30 hover:bg-[#b45309] transition-all hover:scale-105"
              >
                <span className="flex items-center gap-2">
                  Commencer l'Analyse Gratuite
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <p className="text-sm text-[#a8a29e] mt-4 md:mt-0">
                Lecture immédiate • Sans inscription requise
              </p>
            </div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#d97706]/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      </header>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white/50 border-y border-[#d97706]/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Sparkles className="w-8 h-8 text-[#d97706]" />}
              title="Identité Vibratoire"
              desc="Décodez la puissance de vos prénoms et la structure de votre âme à travers la symbolique des nombres."
            />
            <FeatureCard 
              icon={<Scroll className="w-8 h-8 text-[#d97706]" />}
              title="Mission de Vie"
              desc="Comprenez pourquoi vous êtes ici. Identifiez vos dettes karmiques et les talents innés pour les dépasser."
            />
            <FeatureCard 
              icon={<Clock className="w-8 h-8 text-[#d97706]" />}
              title="Météo Temporelle"
              desc="Ne nagez plus à contre-courant. Découvrez votre Année Personnelle et alignez vos actions sur les cycles universels."
            />
          </div>
        </div>
      </section>

      {/* Preview Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-5xl font-serif text-[#78350f]">
              Plus qu'un horoscope, <br />
              <span className="text-[#d97706]">une carte routière précise.</span>
            </h2>
            <p className="text-lg text-[#57534e] leading-relaxed">
              Notre algorithme unique croise l'astrologie, la numérologie pythagoricienne et l'étymologie pour générer un rapport d'une précision troublante.
            </p>
            <ul className="space-y-4">
              <ListItem text="Analyse de votre Chemin de Vie et Expression" />
              <ListItem text="Détection de vos Dettes Karmiques" />
              <ListItem text="Calcul de votre Grille d'Inclusion" />
              <ListItem text="Prévisions pour les 12 prochains mois" />
            </ul>
            <button 
              onClick={onStart}
              className="text-[#d97706] font-bold border-b-2 border-[#d97706] pb-1 hover:text-[#b45309] hover:border-[#b45309] transition-colors"
            >
              Voir un exemple de rapport
            </button>
          </div>
          
          <div className="flex-1 relative">
            {/* Abstract Report Preview UI */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl border border-[#d97706]/20 p-6 md:p-8 max-w-md mx-auto rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-8 border-b border-[#f5f5f4] pb-4">
                <div className="w-32 h-4 bg-[#f5f5f4] rounded"></div>
                <div className="w-8 h-8 rounded-full bg-[#fef3c7] text-[#d97706] flex items-center justify-center font-serif font-bold">7</div>
              </div>
              <div className="space-y-4 mb-8">
                <div className="w-full bg-[#fffbf0] rounded-lg border border-[#d97706]/10 p-4">
                  <div className="text-[#d97706] font-serif text-sm mb-2 text-center">Graphique d'Inclusion</div>
                  <div className="grid grid-cols-3 gap-2">
                    {[3, 1, 9, 2, 5, 8, 4, 7, 6].map((num, i) => (
                      <div key={i} className={`
                        aspect-square rounded flex items-center justify-center text-sm font-bold
                        ${[0, 2, 4, 6, 8].includes(i) ? 'bg-[#d97706]/10 text-[#d97706]' : 'bg-white text-[#a8a29e] border border-stone-100'}
                      `}>
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                   <div className="w-full h-3 bg-[#f5f5f4] rounded"></div>
                   <div className="w-5/6 h-3 bg-[#f5f5f4] rounded"></div>
                   <div className="w-4/6 h-3 bg-[#f5f5f4] rounded"></div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1 h-20 bg-[#f0f9ff] rounded-lg border border-[#0ea5e9]/20"></div>
                <div className="flex-1 h-20 bg-[#fff7ed] rounded-lg border border-[#d97706]/20"></div>
              </div>
            </div>
            
            {/* Decor elements */}
            <div className="absolute top-10 -right-10 w-full h-full bg-[#78350f] rounded-2xl -z-10 opacity-5 rotate-6"></div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 bg-[#78350f] text-[#fffbf0] text-center">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-serif">Prêt à rencontrer votre véritable vous ?</h2>
          <p className="text-[#d6d3d1] text-lg">
            Commencez par la lecture essentielle offerte. Vous pourrez ensuite choisir d'approfondir avec l'étude complète.
          </p>
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-[#fffbf0] text-[#78350f] rounded-full font-bold text-lg hover:bg-[#fef3c7] transition-colors shadow-xl"
          >
            Révéler mon Profil maintenant
          </button>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-[#d97706]/10 hover:border-[#d97706]/30 transition-colors shadow-sm hover:shadow-md group">
      <div className="mb-6 p-4 bg-[#fffbf0] rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 border border-[#d97706]/10">
        {icon}
      </div>
      <h3 className="text-xl font-serif text-[#78350f] mb-3 font-bold">{title}</h3>
      <p className="text-[#57534e] leading-relaxed">
        {desc}
      </p>
    </div>
  );
}

function ListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center gap-3 text-[#57534e]">
      <div className="w-1.5 h-1.5 rounded-full bg-[#d97706]"></div>
      <span>{text}</span>
    </li>
  );
}