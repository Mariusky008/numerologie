
import PageContainer from './PageContainer';
import { UserData, NumerologyResult } from '@/lib/types';

export default function Part1Identity({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const firstNames = userData.firstName.split(' ');
  const lastName = userData.lastName;

  return (
    <>
      {/* PAGE 4: ANALYSE PRENOMS */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Identité Profonde & Étymologie
        </h2>
        
        <div className="space-y-8">
          <p className="text-base md:text-xl text-[#d6d3d1] italic">
            "Votre nom est le premier mantra que l'univers a chanté pour vous."
          </p>
          
          <div className="grid grid-cols-1 gap-6">
            {firstNames.map((name, i) => (
              <div key={i} className="bg-[#292524] p-6 rounded-xl border border-[#fbbf24]/20">
                <h3 className="text-xl md:text-2xl font-serif text-[#fbbf24] mb-2">{name}</h3>
                <div className="text-sm md:text-base text-[#a8a29e] mb-4 uppercase tracking-wide">Prénom {i + 1}</div>
                <p className="text-[#d6d3d1] mb-4 text-sm md:text-base">
                  Ce prénom porte une vibration spécifique qui influence votre manière d'entrer en relation. 
                  (L'analyse étymologique détaillée nécessite une connexion à la base de données linguistique).
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>

      {/* PAGE 5: NOM DE FAMILLE & SIGNATURE */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Héritage & Signature
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-[#292524] p-8 rounded-xl border-l-4 border-[#fbbf24]">
            <h3 className="text-xl md:text-2xl font-serif text-[#fbbf24] mb-4">Le Nom : {lastName}</h3>
            <p className="text-[#d6d3d1] text-sm md:text-base leading-relaxed">
              Votre nom de famille représente votre héritage, vos racines et la mémoire de votre lignée.
              C'est le bagage avec lequel vous voyagez, contenant les forces et les défis de vos ancêtres.
            </p>
          </div>
          
          <div className="bg-[#1c1917] p-8 rounded-xl border border-[#fbbf24]/30">
            <h3 className="text-xl md:text-2xl font-serif text-[#fef3c7] mb-4">Signature Anthroponymique</h3>
            <p className="text-[#d6d3d1] text-sm md:text-base leading-relaxed mb-6">
              La fusion de vos prénoms et nom crée une fréquence unique, votre "code-barres" spirituel.
            </p>
            <div className="text-center p-6 bg-[#292524] rounded-lg">
              <div className="text-4xl md:text-6xl font-serif text-[#fbbf24] mb-2">{results.expression}</div>
              <div className="text-xs md:text-sm text-[#a8a29e] uppercase">Vibration Globale</div>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
}
