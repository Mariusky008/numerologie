
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import { Star, MapPin } from 'lucide-react';

const VibrationalSignature = ({ name }: { name: string }) => {
  // Simple generative art based on name char codes
  const chars = name.toUpperCase().split('').filter(c => c.match(/[A-Z]/));
  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      <div className="absolute inset-0 border border-[#C9A24D]/20 rounded-full animate-spin-slow" style={{ animationDuration: '60s' }} />
      {chars.map((char, i) => {
        const rotation = (i / chars.length) * 360;
        const height = (char.charCodeAt(0) - 64) * 4; // A=1 -> 4px, Z=26 -> 104px
        return (
          <div 
            key={i}
            className="absolute bottom-1/2 left-1/2 w-1 bg-[#C9A24D]/40 origin-bottom rounded-full"
            style={{ 
              height: `${height}px`,
              transform: `rotate(${rotation}deg) translateX(-50%)`,
            }}
          />
        );
      })}
      <div className="absolute w-32 h-32 border border-[#C9A24D]/40 rounded-full" />
      <div className="absolute w-2 h-2 bg-[#C9A24D] rounded-full shadow-[0_0_20px_#C9A24D]" />
    </div>
  );
};

export default function Part1Intro({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  return (
    <>
      {/* PAGE 1: COVER */}
      <PageContainer className="items-center justify-center p-4 md:p-12 text-center bg-[#FAF9F7] text-[#2C2F4A]">
        <div className="absolute inset-4 md:inset-8 border border-[#C9A24D]/30 pointer-events-none" />
        <h1 className="text-4xl md:text-6xl font-serif text-[#2C2F4A] mb-4 md:mb-6 break-words max-w-full px-4">
          {userData.firstName} <br className="hidden md:block" />
          <span className="text-[#C9A24D] block md:inline mt-2 md:mt-0">{userData.lastName}</span>
        </h1>
        <div className="w-16 md:w-24 h-1 bg-[#C9A24D] mx-auto mb-6 md:mb-8" />
        <h2 className="text-lg md:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase text-[#8FA6A0] mb-8 md:mb-12">
          L'Odyssée Numérologique
        </h2>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-[#78716c] text-xs md:text-sm tracking-widest uppercase">
          <span className="flex items-center gap-2"><Star className="w-4 h-4 text-[#C9A24D]" /> Chemin de Vie {results.lifePath}</span>
          <span className="hidden md:block">•</span>
          <span className="flex items-center gap-2 text-center"><MapPin className="w-4 h-4 text-[#C9A24D]" /> {userData.birthPlace}</span>
        </div>
        <div className="absolute bottom-6 md:bottom-12 text-[#8FA6A0] text-[10px] md:text-xs px-4">
          Document Confidentiel • Généré pour l'âme de {userData.firstName}
        </div>
      </PageContainer>

      {/* PAGE 2: SOMMAIRE */}
      <PageContainer className="p-4 md:p-16 justify-center">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-16 text-center">Architecture de la Lecture</h2>
        <div className="space-y-4 md:space-y-8 max-w-2xl mx-auto w-full px-4">
          {[
            { id: 'I', title: "Le Portail d'Entrée", page: '03' },
            { id: 'II', title: "L'Incarnation", page: '08' },
            { id: 'III', title: "Le Miroir Karmique", page: '17' },
            { id: 'IV', title: `Focus : ${userData.focus}`, page: '24' },
            { id: 'V', title: "Visions Futures", page: '31' },
            { id: 'VI', title: "Plan d'Action", page: '37' },
            { id: 'VII', title: "Architecture Astrale", page: '42' },
            { id: 'VIII', title: "Échos Étymologiques", page: '45' }
          ].map((item) => (
            <div key={item.id} className="flex justify-between items-baseline border-b border-[#C9A24D]/30 pb-2 md:pb-4">
              <span className="text-base md:text-xl font-serif text-[#C9A24D]">{item.id}. {item.title}</span>
              <span className="text-[#78716c] text-sm md:text-base">{item.page}</span>
            </div>
          ))}
        </div>
      </PageContainer>

      {/* PAGE 3: PREAMBULE - NOUVEL AGENCEMENT */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-3xl font-serif text-[#1B263B] mb-6 border-b-2 border-[#E07A5F] pb-4 inline-block uppercase">
          PRÉAMBULE — CE QUE VOUS TENEZ ENTRE LES MAINS
        </h2>
        
        <div className="prose prose-lg text-[#2C2F4A] max-w-none text-sm md:text-base leading-relaxed mb-8">
          <p>
            Avant de plonger dans l’analyse de votre Équation Secrète, il est essentiel de préciser la nature exacte de ce dossier...
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-8">
          {/* Bloc 1 - Une cartographie personnelle */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderColor: '#1B263B' }}>
            <h3 className="font-serif text-xl mb-3" style={{ color: '#1B263B' }}>Une cartographie personnelle</h3>
            <p className="text-[#2C2F4A] text-sm md:text-base">
              La partie numérologique propose une lecture structurante. Elle agit comme une carte topographique de votre fonctionnement...
            </p>
          </div>

          {/* Bloc 2 - Une lecture symbolique approfondie */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderColor: '#E07A5F' }}>
            <h3 className="font-serif text-xl mb-3" style={{ color: '#E07A5F' }}>Une lecture symbolique approfondie</h3>
            <p className="text-[#2C2F4A] text-sm md:text-base">
              La partie astrologique explore la dimension psychologique et symbolique. Elle s’intéresse aux dynamiques internes...
            </p>
          </div>

          {/* Bloc 3 - Une synthèse orientée évolution */}
          <div className="bg-white p-6 rounded-lg shadow-sm border-l-4" style={{ borderColor: '#D4A373' }}>
            <h3 className="font-serif text-xl mb-3" style={{ color: '#D4A373' }}>Une synthèse orientée évolution</h3>
            <p className="text-[#2C2F4A] text-sm md:text-base">
              Certaines sections croisent volontairement ces deux approches. C’est dans cette zone de convergence que se dessinent vos principaux leviers...
            </p>
          </div>
        </div>

        {/* Note Ethique */}
        <div className="mt-8 p-6 bg-[#FAF9F7] border border-[#C9A24D]/30 rounded-lg">
          <h4 className="font-bold text-[#2C2F4A] mb-2 uppercase text-sm tracking-wide">
            Note sur le libre arbitre
          </h4>
          <p className="text-[#2C2F4A] italic text-sm md:text-base">
            "Cette analyse éclaire une direction, mais ne décide jamais de la destination. Vous restez l’unique acteur de vos choix..."
          </p>
        </div>
      </PageContainer>

      {/* PAGE 4-5: ETYMOLOGIE & VIBRATION NOM */}
      
      <PageContainer className="p-4 md:p-16 flex items-center justify-center bg-[#FAF9F7] text-[#2C2F4A]">
         <div className="text-center w-full">
           <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-6 md:mb-8">La Signature Vibratoire</h2>
           <p className="text-base md:text-xl text-[#2C2F4A] max-w-2xl mx-auto mb-8 px-4">
             Voici la représentation graphique unique de la fréquence sonore de votre identité complète.
           </p>
           <div className="mt-8 md:mt-12 flex justify-center scale-75 md:scale-100">
             <VibrationalSignature name={userData.firstName + userData.lastName} />
           </div>
         </div>
      </PageContainer>

      {/* PAGE 6-7: SIGNATURE ENERGETIQUE (Suite ou Visualisation) */}
       <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Résonance Intérieure
        </h2>
        <div className="prose prose-lg text-[#2C2F4A] text-sm md:text-base leading-relaxed">
           <p className="mb-8">
             Votre signature énergétique est unique. Elle agit comme un aimant, attirant à vous les expériences qui résonnent avec votre fréquence dominante : le nombre {results.expression}.
           </p>
           <div className="my-8 md:my-12 p-6 md:p-8 bg-white border-l-4 border-[#C9A24D] rounded-r-lg shadow-sm">
             <h3 className="text-lg md:text-xl font-bold mb-2 text-[#C9A24D]">Note de Fréquence</h3>
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
