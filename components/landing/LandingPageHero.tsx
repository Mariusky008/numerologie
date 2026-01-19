import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Scroll, Clock, BookOpen, User as UserIcon, MapPin as MapPinIcon, Feather, Check } from 'lucide-react';

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
    <div className="min-h-screen bg-[#FAF9F7] text-[#2C2F4A] overflow-hidden font-sans">
      {/* Navbar Light */}
      <nav className="p-6 md:p-8 flex justify-between items-center max-w-7xl mx-auto z-50 relative">
        <div className="text-2xl font-serif text-[#5B4B8A] font-bold flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[#C9A24D]" />
          Roman de Vie
        </div>
      </nav>

      {/* Hero Section Cinematic Light */}
      <header className="relative pt-20 pb-32 md:pt-32 md:pb-48 px-4 overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F7] via-transparent to-[#FAF9F7] z-10"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60"></div>
          {/* Glowing Orb Heartbeat - INTENSIFIED */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[100px] mix-blend-screen"
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.4, 0.8, 0.4],
              backgroundColor: [
                "#FCD34D", // Bright Amber
                "#FB923C", // Bright Orange
                "#EF4444", // Bright Red
                "#FCD34D"  // Loop
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.33, 0.66, 1]
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Left Column: Main Value Proposition */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#5B4B8A]/5 text-[#5B4B8A] text-xs font-bold tracking-widest uppercase mb-8 border border-[#5B4B8A]/20">
                <Feather className="w-3 h-3" />
                Numérologie & Astrologie - Édition personnalisée
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif text-[#2C2F4A] mb-8 leading-tight">
                Le seul livre qui raconte <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5B4B8A] to-[#C9A24D] italic">VOTRE histoire intérieure</span>
              </h1>
              
              <p className="text-xl text-[#2C2F4A]/80 font-light mb-8 leading-relaxed">
                Vous recevez votre rapport complet de numérologie & astrologie, puis sa version ultime : un livre personnalisé qui transforme l'analyse en récit vivant.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                <button 
                  onClick={onStart}
                  className="px-8 py-4 bg-[#5B4B8A] text-white rounded-full font-bold text-lg shadow-[0_10px_40px_-10px_rgba(91,75,138,0.4)] hover:bg-[#6A5FA8] transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Recevoir mon édition maintenant
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column: Offer Breakdown Card */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/80 backdrop-blur-sm border border-[#EFEDE9] rounded-2xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5B4B8A] to-[#C9A24D]"></div>
                
                <h3 className="text-lg font-serif text-[#2C2F4A] mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#C9A24D]" />
                  Ce que comprend votre commande
                </h3>

                <div className="space-y-6">
                  {/* Part 1: Report */}
                  <div className="space-y-3 opacity-70">
                    <div className="flex items-center gap-2 font-bold text-[#5B4B8A]">
                      <div className="w-2 h-2 rounded-full bg-[#5B4B8A]"></div>
                      Rapport complet de numérologie
                    </div>
                    <ul className="pl-6 space-y-1 text-sm text-[#2C2F4A]/70">
                      <li>• Analyse technique</li>
                      <li>• Données et interprétations</li>
                      <li>• Consultation ponctuelle</li>
                    </ul>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[#EFEDE9] w-full"></div>

                  {/* Part 2: Book (Highlighted) */}
                  <div className="space-y-3 relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#C9A24D] rounded-r-full"></div>
                    <div className="flex items-center gap-2 font-bold text-[#2C2F4A]">
                      <div className="w-2 h-2 rounded-full bg-[#C9A24D]"></div>
                      Rapport + Livre personnalisé
                      <span className="text-[10px] bg-[#C9A24D]/10 text-[#C9A24D] px-2 py-0.5 rounded-full uppercase tracking-wide">Inclus</span>
                    </div>
                    <ul className="pl-6 space-y-2 text-sm text-[#2C2F4A]">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C9A24D]" />
                        Analyse complète incluse
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C9A24D]" />
                        Mise en récit fluide et incarnée
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#C9A24D]" />
                        Compréhension globale et durable
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EFEDE9] text-center">
                  <p className="text-sm font-serif text-[#5B4B8A] italic">
                    "Vous ne choisissez pas entre le rapport et le livre. <br/>
                    <strong>Vous recevez les deux.</strong>"
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* The Concept Section Light */}
      <section className="py-24 px-4 bg-white border-y border-[#EFEDE9]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif text-[#2C2F4A]">
                Votre vie est déjà écrite dans les nombres. <br/>
                <span className="text-[#C9A24D]">Il ne reste qu'à la raconter.</span>
              </h2>
              <p className="text-lg text-[#2C2F4A]/80 leading-relaxed">
                Votre signe solaire définit le caractère du héros, votre ascendant définit son armure, et vos planètes sont les alliés qui vous accompagnent dans votre quête.
              </p>
              <p className="text-lg text-[#2C2F4A]/80 leading-relaxed">
                Notre approche est différente : nous utilisons vos nombres pour construire la <strong>structure narrative</strong> de votre existence. Vos défis deviennent des dragons à combattre, vos cycles deviennent des chapitres, et votre mission de vie devient la quête du Graal.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <StepCard num="01" title="L'Analyse" desc="Nous décodons votre ADN numérologique complet." />
                <StepCard num="02" title="Le Roman" desc="Notre plume narrative transcrit votre biographie épique sur-mesure." />
              </div>
            </div>
            
            <div className="flex-1 relative">
               {/* Book Mockup Light Premium */}
               <div className="relative w-[340px] mx-auto aspect-[2/3] bg-[#FAF9F7] rounded-r-xl rounded-l-sm shadow-2xl border-l-4 border-[#5B4B8A] transform rotate-[-5deg] hover:rotate-0 transition-transform duration-700 group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FAF9F7] to-[#EFEDE9] rounded-r-xl opacity-90"></div>
                  {/* Texture Papier */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 rounded-r-xl"></div>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center border-2 border-[#C9A24D] m-4 rounded-r-lg border-l-0">
                    <div className="text-[#C9A24D] text-xs tracking-[0.4em] uppercase mb-8 font-bold">Roman de Vie</div>
                    
                    <h3 className="font-serif text-4xl text-[#2C2F4A] mb-2 tracking-tight leading-none">
                      L'Épopée de<br/>
                      <span className="text-[#5B4B8A] italic">Thomas</span>
                    </h3>
                    
                    <div className="w-16 h-[1px] bg-[#C9A24D] my-6"></div>
                    
                    <h4 className="font-serif text-xl text-[#2C2F4A] mb-8">Le Gardien des Seuils</h4>
                    
                    <div className="mt-auto w-20 h-20 rounded-full border border-[#C9A24D]/50 flex items-center justify-center text-[#C9A24D] relative">
                      <div className="absolute inset-0 border border-[#C9A24D]/30 rounded-full scale-125"></div>
                      <UserIcon className="w-8 h-8" />
                    </div>
                  </div>
                  {/* Glow behind book */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[80%] bg-[#C9A24D]/20 blur-3xl -z-10 group-hover:bg-[#C9A24D]/30 transition-colors"></div>
               </div>
               
               {/* Note d'adaptation */}
               <p className="text-center text-xs text-[#2C2F4A]/50 mt-4 italic">
                 * Exemple basé sur le profil de Thomas. Votre livre sera unique.
               </p>
               
               {/* Page intérieure preview (Tangibilité) */}
               <div className="absolute -bottom-10 -right-10 w-48 h-64 bg-white shadow-xl rounded-lg border border-stone-200 rotate-12 p-5 block md:block">
                  <div className="w-full h-full overflow-hidden font-serif">
                    <div className="flex justify-between text-[4px] text-stone-400 mb-2 border-b border-stone-100 pb-1">
                      <span>CHAPITRE I</span>
                      <span>14</span>
                    </div>
                    <div className="text-[5px] text-justify leading-relaxed text-stone-600 space-y-2 font-serif">
                        <p>
                          <span className="text-3xl float-left mr-1 mt-[-4px] text-[#5B4B8A] font-bold">L</span>
                          ’air de la pièce semblait s’être figé, comme si le temps lui-même attendait une permission pour reprendre sa course. Thomas fixa le reflet dans le miroir, mais ce n'était plus tout à fait le sien. Ce matin-là, les lignes de son visage semblaient dessiner une carte qu'il avait longtemps refusé de lire.
                        </p>
                        <p>
                          Il se souvint de ce vieux secret qu'il portait depuis l'enfance : cette sensation d'être né sous un ciel qui exigeait trop de lui. Le nombre 14 n'était pas qu'une simple date sur son état civil ; c'était un rythme, une oscillation constante entre le besoin de tout détruire et l'envie de tout construire. Pour d'autres, c'était un mardi ordinaire. Pour lui, c'était le code source de son instabilité chronique et de son génie foudroyant.
                        </p>
                        <p>
                          Soudain, une lueur dorée traversa la fenêtre, illuminant une vieille boussole posée sur son bureau. Thomas comprit alors ce que les cycles tentaient de lui dire depuis des mois. Il arrivait au bout de la Neuvième Terre. Tout ce qu'il avait bâti ces dernières années s'effritait, non pas par échec, mais pour laisser place à la suite. Les dragons qu'il avait combattus — ce doute persistant sur sa légitimité, cette peur de l'ombre — n'étaient en réalité que des gardiens. Ils ne voulaient pas le dévorer, ils vérifiaient s'il était prêt pour la Grande Transition.
                        </p>
                        <p className="blur-[1px] opacity-70">
                          Le manuscrit de sa destinée était ouvert sur la table. La page était blanche, mais sous la lumière, des lettres de feu commençaient à apparaître, traçant son nom d'une manière qu'il n'avait jamais vue. Le récit ne faisait que commencer, et pour la première fois, Thomas ne craignait plus de tourner la page. Il savait enfin que son nom n'était pas un hasard. C'était un ordre de mission.
                        </p>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Table (Psychologie) */}
      <section className="py-20 px-4 bg-[#FAF9F7]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-[#2C2F4A] text-center mb-12">Ce que vous allez recevoir</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-[#EFEDE9] rounded-2xl overflow-hidden shadow-lg bg-white">
            {/* Free Tier */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#EFEDE9] bg-[#FAF9F7]/50">
              <h3 className="text-xl font-bold text-[#2C2F4A] mb-2">Analyse Initiale</h3>
              <div className="text-3xl font-serif text-[#8FA6A0] mb-6">Gratuit</div>
              <ul className="space-y-4 text-sm text-[#2C2F4A]/80">
                <li className="flex items-center gap-3"><span className="text-[#8FA6A0]">✓</span> Vos 7 Nombres Clés</li>
                <li className="flex items-center gap-3"><span className="text-[#8FA6A0]">✓</span> Votre Profil Astral</li>
                <li className="flex items-center gap-3"><span className="text-[#8FA6A0]">✓</span> Titre de votre Roman</li>
                <li className="flex items-center gap-3"><span className="text-[#8FA6A0]">✓</span> Résumé (4ème de couv.)</li>
              </ul>
              <button onClick={onStart} className="w-full mt-8 py-3 px-6 rounded-lg border border-[#2C2F4A]/20 text-[#2C2F4A] font-bold hover:bg-[#2C2F4A] hover:text-white transition-colors">
                Commencer Gratuitement
              </button>
            </div>
            
            {/* Premium Tier */}
            <div className="p-8 md:p-12 bg-white relative overflow-hidden ring-4 ring-[#C9A24D]/10">
              <div className="absolute top-0 right-0 bg-[#C9A24D] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">Choix le plus populaire</div>
              <h3 className="text-xl font-bold text-[#5B4B8A] mb-2">Le Roman de Vie</h3>
              <div className="text-3xl font-serif text-[#C9A24D] mb-6">49€ <span className="text-sm text-stone-400 font-sans font-normal line-through">89€</span></div>
              <ul className="space-y-4 text-sm text-[#2C2F4A]/80">
                <li className="flex items-center gap-3"><span className="text-[#C9A24D]">✓</span> <strong>Livre Complet (~100 pages)</strong></li>
                <li className="flex items-center gap-3"><span className="text-[#C9A24D]">✓</span> Structure Narrative Héroïque</li>
                <li className="flex items-center gap-3"><span className="text-[#C9A24D]">✓</span> PDF Haute Qualité (Imprimable)</li>
                <li className="flex items-center gap-3"><span className="text-[#C9A24D]">✓</span> <strong className="text-[#5B4B8A]">Inclus : Analyse Numérologique & Astrale Complète (PDF)</strong></li>
                <li className="flex items-center gap-3"><span className="text-[#C9A24D]">✓</span> Bonus : Carte du Ciel Détaillée</li>
                <li className="flex items-center gap-3"><span className="text-[#C9A24D]">✓</span> <span className="text-[#2C2F4A] font-medium">Livraison immédiate par email ou livre physique</span></li>
              </ul>
              <button onClick={onStart} className="w-full mt-8 py-4 px-6 rounded-lg bg-[#5B4B8A] text-white font-bold text-lg hover:bg-[#6A5FA8] transition-all transform hover:scale-[1.02] shadow-xl shadow-[#5B4B8A]/30">
                Créer mon Roman
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Reassurance Light */}
      <section className="py-20 px-4 bg-[#FAF9F7] border-t border-[#EFEDE9]">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-2xl font-serif text-[#2C2F4A] mb-4">Une base scientifique solide</h2>
          <p className="text-[#2C2F4A]/70">
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

        {/* Methodology Deep Dive Light */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 border border-[#EFEDE9] relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A24D]/5 rounded-full blur-3xl -z-10"></div>
          <h3 className="text-xl md:text-2xl font-serif text-[#2C2F4A] mb-6 text-center">
            Comment nous garantissons la précision de votre profil
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-[#C9A24D] font-bold">01.</span>
                <p className="text-[#2C2F4A]/80 text-sm">
                  <strong className="text-[#5B4B8A] block mb-1">Algorithme Multi-Couches</strong>
                  Nous croisons votre Chemin de Vie (basé sur la date) avec votre Nombre d'Expression (basé sur le nom) pour détecter les conflits internes et les talents latents.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#C9A24D] font-bold">02.</span>
                <p className="text-[#2C2F4A]/80 text-sm">
                  <strong className="text-[#5B4B8A] block mb-1">Grille d'Inclusion Exclusive</strong>
                  Contrairement aux horoscopes génériques, nous calculons la répartition exacte de vos énergies (manques et excès) pour révéler vos dettes karmiques spécifiques.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <span className="text-[#C9A24D] font-bold">03.</span>
                <p className="text-[#2C2F4A]/80 text-sm">
                  <strong className="text-[#5B4B8A] block mb-1">Astrologie Structurelle</strong>
                  Nous intégrons la vibration de votre lieu de naissance pour affiner l'analyse et comprendre l'influence de votre environnement d'origine.
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#C9A24D] font-bold">04.</span>
                <p className="text-[#2C2F4A]/80 text-sm">
                  <strong className="text-[#5B4B8A] block mb-1">Vérification Cohérente</strong>
                  Chaque rapport est généré pour être logiquement cohérent : un cycle de vie ne peut pas contredire un défi majeur. Tout est lié.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emotional Impact Section Light */}
      <section className="py-24 px-4 bg-[#F7F5F2] relative border-t border-[#EFEDE9]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-block mb-4">
            <Star className="w-6 h-6 text-[#C9A24D] fill-[#C9A24D] animate-pulse" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#2C2F4A] mb-8">
            Une expérience émotionnelle <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24D] to-[#B89B5E]">bouleversante.</span>
          </h2>
          <p className="text-xl text-[#2C2F4A]/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ce n'est pas juste un livre. C'est un miroir. <br/>
            Découvrir sa vie transposée dans une fiction crée un déclic psychologique puissant.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <ImpactCard 
              quote="J'ai pleuré en lisant le chapitre 3. C'était exactement ce que j'avais vécu à 20 ans, mais vu sous un angle héroïque qui m'a enfin permis de pardonner."
              author="Sarah, 42 ans"
            />
            <ImpactCard 
              quote="Voir mes défauts incarnés par un personnage attachant m'a aidé à les accepter. Je ne me suis jamais senti aussi compris que par ce livre écrit avec une telle précision."
              author="Thomas, 35 ans"
            />
            <ImpactCard 
              quote="C'est étrange et magique. On sait que c'est une fiction, mais ça résonne tellement fort avec la réalité que ça en devient une thérapie."
              author="Elena, 29 ans"
            />
          </div>
        </div>
      </section>

      {/* Featured Testimonial - Long Form Light */}
      <section className="py-24 px-4 bg-[#FAF9F7] border-y border-[#EFEDE9] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-60"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 text-center md:text-left">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-[#C9A24D]/30 mx-auto md:mx-0 overflow-hidden mb-6 shadow-xl">
                <div className="w-full h-full bg-stone-100 flex items-center justify-center text-4xl">👨‍💼</div>
              </div>
              <h3 className="text-2xl font-serif text-[#2C2F4A] mb-2">Julien M.</h3>
              <p className="text-[#C9A24D] font-bold text-sm tracking-widest uppercase mb-4">Entrepreneur, 41 ans</p>
              <div className="flex gap-1 justify-center md:justify-start text-[#C9A24D]">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
            </div>
            
            <div className="md:w-2/3">
              <div className="relative">
                <span className="absolute -top-8 -left-4 text-8xl text-[#C9A24D]/20 font-serif">"</span>
                <blockquote className="text-lg md:text-xl text-[#2C2F4A]/80 leading-relaxed space-y-6 font-light">
                  <p>
                    <span className="text-[#5B4B8A] font-medium">J'étais sceptique.</span> Je pensais recevoir un énième PDF générique avec des phrases bateau sur mon signe astrologique. Mais quand j'ai commencé à lire "Le Gardien des Seuils" (le titre de mon livre), j'ai eu des frissons dès la première page.
                  </p>
                  <p>
                    Le héros, c'était moi. Pas un "moi" idéalisé, mais un moi profond, avec mes doutes réels que je n'avais jamais avoués à personne. L'IA a utilisé mon cycle de vie actuel (une année personnelle 4) pour construire une intrigue où le protagoniste devait justement apprendre à structurer le chaos.
                  </p>
                  <p>
                    <span className="text-[#C9A24D] italic">C'était plus qu'une lecture, c'était une révélation.</span> Voir mes obstacles transformés en quête épique m'a redonné le pouvoir sur ma propre vie. J'ai compris que je n'étais pas "bloqué", mais en "préparation". Ce changement de perspective vaut tout l'or du monde.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Light */}
      <section className="py-32 px-4 relative overflow-hidden bg-[#2C2F4A]">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-[#FAF9F7] mb-8">Le premier chapitre <br/> commence maintenant.</h2>
          <p className="text-xl text-[#FAF9F7]/80">
            Ne laissez pas les pages de votre vie rester blanches. Découvrez qui vous êtes vraiment.
          </p>
          <button 
            onClick={onStart}
            className="px-12 py-6 bg-[#FAF9F7] text-[#2C2F4A] rounded-full font-bold text-xl hover:bg-white transition-colors shadow-2xl hover:scale-105 transform duration-300"
          >
            Lancer l'analyse et le récit
          </button>
          <p className="text-sm text-[#FAF9F7]/50">Aucune inscription requise pour l'analyse initiale</p>
        </div>
      </section>

      {/* Footer Minimal with Disclaimer Light */}
      <footer className="py-12 px-4 text-center text-[#2C2F4A]/60 text-xs border-t border-[#EFEDE9] bg-[#FAF9F7]">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-[#5B4B8A] font-medium">
            <Link href="/cgv" className="hover:text-[#2C2F4A] transition-colors">CGV</Link>
            <span className="hidden md:inline text-[#C9A24D]">•</span>
            <Link href="/cgu" className="hover:text-[#2C2F4A] transition-colors">CGU</Link>
            <span className="hidden md:inline text-[#C9A24D]">•</span>
            <Link href="/mentions-legales" className="hover:text-[#2C2F4A] transition-colors">Mentions Légales</Link>
          </div>

          <p>&copy; {new Date().getFullYear()} Roman de Vie. Une expérience Numérologie.app</p>
          
          <div className="border-t border-[#EFEDE9] pt-6 max-w-2xl mx-auto">
            <div className="bg-[#EFEDE9] p-4 rounded-lg">
              <p className="text-[#6B6B6B] leading-relaxed">
                <strong>Avertissement Légal :</strong> Ce service est conçu à des fins de divertissement, d'introspection et de développement personnel uniquement. 
                Les analyses numérologiques et les récits générés ne constituent en aucun cas un conseil psychologique, médical, financier ou juridique. 
                L'option "Roman de Vie" est une œuvre de fiction personnalisée basée sur vos données.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function StepCard({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-lg bg-white border border-[#EFEDE9] hover:border-[#C9A24D]/50 transition-colors shadow-sm">
      <span className="text-3xl font-serif text-[#C9A24D] font-bold">{num}</span>
      <div>
        <h4 className="text-[#2C2F4A] font-bold">{title}</h4>
        <p className="text-sm text-[#2C2F4A]/70">{desc}</p>
      </div>
    </div>
  );
}

function TechCard({ icon, title, desc }: { icon: string, title: string, desc: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-[#EFEDE9] text-center hover:shadow-lg transition-all shadow-sm">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-[#5B4B8A] mb-2">{title}</h3>
      <p className="text-[#2C2F4A]/70 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function ImpactCard({ quote, author }: { quote: string, author: string }) {
  return (
    <div className="p-6 rounded-xl bg-white border border-[#EFEDE9] hover:border-[#C9A24D]/40 transition-all group shadow-sm hover:shadow-md">
      <div className="text-[#C9A24D] text-4xl font-serif mb-2 opacity-50">"</div>
      <p className="text-[#2C2F4A]/80 italic mb-6 leading-relaxed relative z-10">
        {quote}
      </p>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#5B4B8A]/10 flex items-center justify-center text-[#5B4B8A] text-xs font-bold">
          {author.charAt(0)}
        </div>
        <span className="text-[#8FA6A0] text-xs font-bold tracking-widest uppercase">{author}</span>
      </div>
    </div>
  );
}
