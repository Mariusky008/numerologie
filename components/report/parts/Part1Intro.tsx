
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { Star, MapPin } from 'lucide-react';

const VibrationalSignature = ({ name }: { name: string }) => {
  // Simple generative art based on name char codes
  const chars = name.toUpperCase().split('').filter(c => c.match(/[A-Z]/));
  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      <div className="absolute inset-0 border border-[#fbbf24]/20 rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
      {chars.map((char, i) => {
        const rotation = (i / chars.length) * 360;
        const height = (char.charCodeAt(0) - 64) * 4; // A=1 -> 4px, Z=26 -> 104px
        return (
          <div 
            key={i}
            className="absolute bottom-1/2 left-1/2 w-1 bg-[#fbbf24]/40 origin-bottom rounded-full"
            style={{ 
              height: `${height}px`,
              transform: `rotate(${rotation}deg) translateX(-50%)`,
            }}
          />
        );
      })}
      <div className="absolute w-32 h-32 border border-[#fbbf24]/40 rounded-full" />
      <div className="absolute w-2 h-2 bg-[#fbbf24] rounded-full shadow-[0_0_20px_#fbbf24]" />
    </div>
  );
};

export default function Part1Intro({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  return (
    <>
      {/* PAGE 1: COVER */}
      <PageContainer className="items-center justify-center p-12 text-center bg-[#1c1917] text-[#fdfbf7]">
        <div className="absolute inset-8 border border-[#fbbf24]/30" />
        <h1 className="text-6xl font-serif text-[#fef3c7] mb-6">
          {userData.firstName} <br />
          <span className="text-[#fbbf24]">{userData.lastName}</span>
        </h1>
        <div className="w-24 h-1 bg-[#fbbf24] mx-auto mb-8" />
        <h2 className="text-2xl font-light tracking-[0.3em] uppercase text-[#fef3c7]/80 mb-12">
          L'Odyssée Numérologique
        </h2>
        <div className="flex items-center gap-6 text-[#a8a29e] text-sm tracking-widest uppercase">
          <span className="flex items-center gap-2"><Star className="w-4 h-4" /> Chemin de Vie {results.lifePath}</span>
          <span>•</span>
          <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {userData.birthPlace}</span>
        </div>
        <div className="absolute bottom-12 text-[#57534e] text-xs">
          Document Confidentiel • Généré pour l'âme de {userData.firstName}
        </div>
      </PageContainer>

      {/* PAGE 2: SOMMAIRE */}
      <PageContainer className="p-16 justify-center">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-16 text-center">Architecture de la Lecture</h2>
        <div className="space-y-8 max-w-2xl mx-auto w-full">
          {[
            { id: 'I', title: "Le Portail d'Entrée", page: '03' },
            { id: 'II', title: "L'Incarnation", page: '08' },
            { id: 'III', title: "Le Miroir Karmique", page: '17' },
            { id: 'IV', title: `Focus : ${userData.focus}`, page: '24' },
            { id: 'V', title: "Visions Futures", page: '31' },
            { id: 'VI', title: "Plan d'Action", page: '37' }
          ].map((item) => (
            <div key={item.id} className="flex justify-between items-baseline border-b border-[#fbbf24]/30 pb-4">
              <span className="text-xl font-serif text-[#fbbf24]">{item.id}. {item.title}</span>
              <span className="text-[#a8a29e]">{item.page}</span>
            </div>
          ))}
        </div>
      </PageContainer>

      {/* PAGE 3: AVANT-PROPOS */}
      <PageContainer className="p-16">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Avant-Propos
        </h2>
        <div className="prose prose-lg text-[#d6d3d1] max-w-none">
          <p className="text-xl italic text-[#fbbf24] mb-8">
            "Les nombres sont le plus haut degré de la connaissance. Le nombre est la connaissance même." — Platon
          </p>
          <p>
            Bienvenue, {userData.firstName}, dans ce voyage au cœur de votre structure énergétique. 
            Ce document n'est pas une simple lecture de caractère, c'est un miroir tendu à votre âme pour vous rappeler pourquoi vous avez choisi cette incarnation.
          </p>
          <p>
            La numérologie n'est pas de la voyance. C'est une science sacrée des vibrations. Chaque lettre de votre nom, chaque chiffre de votre date de naissance est une fréquence que vous émettez en permanence.
          </p>
          <p>
            En prenant conscience de ces fréquences, vous passez du statut de "joueur inconscient" à celui de "créateur conscient" de votre réalité.
          </p>
        </div>
      </PageContainer>

      {/* PAGE 4-5: ETYMOLOGIE & VIBRATION NOM */}
      <PageContainer className="p-16">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Analyse Étymologique
        </h2>
        <div className="grid grid-cols-2 gap-12">
           <div className="bg-[#292524] p-8 border border-[#fbbf24]/30">
             <h3 className="text-2xl font-serif mb-4 text-[#fbbf24]">Votre Prénom : {userData.firstName.split(' ')[0]}</h3>
             <p className="text-[#d6d3d1]">
               Le prénom est la clé personnelle, l'identité choisie pour cette vie. Il porte la vibration de votre individualité.
               Votre prénom commence par une lettre puissante qui donne le ton de votre caractère dès la première rencontre.
             </p>
           </div>
           <div className="bg-[#292524] p-8 border border-[#fbbf24]/30">
             <h3 className="text-2xl font-serif mb-4 text-[#fbbf24]">Votre Nom : {userData.lastName}</h3>
             <p className="text-[#d6d3d1]">
               Le nom de famille est l'héritage, la mémoire des ancêtres. Il contient l'histoire de la lignée que vous êtes venu(e) honorer ou guérir.
               C'est le socle sur lequel vous bâtissez votre propre légende.
             </p>
           </div>
        </div>
      </PageContainer>
      
      <PageContainer className="p-16 flex items-center justify-center bg-[#1c1917] text-[#fdfbf7]">
         <div className="text-center">
           <h2 className="text-4xl font-serif text-[#fef3c7] mb-8">La Signature Vibratoire</h2>
           <p className="text-xl text-[#d6d3d1] max-w-2xl mx-auto">
             Voici la représentation graphique unique de la fréquence sonore de votre identité complète.
           </p>
           <div className="mt-12 flex justify-center">
             <VibrationalSignature name={userData.firstName + userData.lastName} />
           </div>
         </div>
      </PageContainer>

      {/* PAGE 6-7: SIGNATURE ENERGETIQUE (Suite ou Visualisation) */}
       <PageContainer className="p-16">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Résonance Intérieure
        </h2>
        <div className="prose prose-lg text-[#d6d3d1]">
           <p>
             Votre signature énergétique est unique. Elle agit comme un aimant, attirant à vous les expériences qui résonnent avec votre fréquence dominante : le nombre {results.expression}.
           </p>
           <div className="my-12 p-8 bg-[#292524] border-l-4 border-[#fbbf24]">
             <h3 className="text-xl font-bold mb-2 text-[#fbbf24]">Note de Fréquence</h3>
             <p>
               Tout comme une note de musique, votre présence émet une vibration constante.
               Les gens ressentent cette "note" avant même que vous ne parliez. C'est votre charisme naturel.
             </p>
           </div>
        </div>
      </PageContainer>
    </>
  );
}
