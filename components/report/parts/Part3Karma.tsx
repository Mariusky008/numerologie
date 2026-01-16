
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import InclusionGridViz from '../InclusionGridViz';
import { getKarmicLessonContent, getExcessNumberContent, getBridgeContent } from '@/lib/numerology/contentGenerator';

export default function Part3Karma({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const bridgeContent = getBridgeContent(results.bridgeNumber);

  return (
    <>
      {/* PAGE 17: GRILLE D'INCLUSION VISUELLE */}
      <PageContainer className="p-4 md:p-16 bg-[#fffbf0]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 border-b-2 border-[#d97706] pb-4 inline-block">
          Le Miroir Karmique
        </h2>
        <p className="text-base md:text-xl font-light mb-12 max-w-2xl text-[#57534e]">
          La Grille d'Inclusion est la radiographie de votre âme. Elle montre ce que vous avez emporté dans vos valises pour cette vie.
        </p>
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <InclusionGridViz 
              grid={results.inclusionGrid} 
              missing={results.missingNumbers} 
              excess={results.excessNumbers} 
            />
          </div>
        </div>
      </PageContainer>

      {/* PAGE 18-19: FORCES ACQUISES */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
          Vos Forces Acquises
        </h2>
        <div className="space-y-8">
          {results.excessNumbers && results.excessNumbers.length > 0 ? (
            results.excessNumbers.map(n => {
              const content = getExcessNumberContent(n);
              return (
                <div key={n} className="bg-white p-6 md:p-8 border-l-4 border-[#d97706] shadow-sm rounded-r-xl">
                  <h3 className="text-xl md:text-2xl font-serif text-[#d97706] mb-2">{content.title}</h3>
                  <p className="text-[#57534e] mb-4 text-sm md:text-base">
                    {content.desc}
                  </p>
                  <p className="text-[#57534e] italic mb-2 text-sm md:text-base">
                    {content.potential}
                  </p>
                  <p className="text-[#d97706]/80 text-xs md:text-sm font-bold uppercase tracking-wide">
                    {content.warning}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-lg md:text-xl italic text-[#d97706]">
              Votre grille est remarquablement équilibrée en termes d'excès. Vous ne dépendez pas d'une seule force dominante.
            </p>
          )}
        </div>
      </PageContainer>

      {/* PAGE 20-21: LEÇONS KARMIQUES */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-red-400 pb-4 inline-block">
          Les Leçons Karmiques
        </h2>
        <div className="space-y-8">
          {results.missingNumbers && results.missingNumbers.length > 0 ? (
            results.missingNumbers.map(n => {
              const content = getKarmicLessonContent(n);
              return (
                <div key={n} className="bg-white p-6 md:p-8 border-l-4 border-red-400 shadow-sm rounded-r-xl">
                  <h3 className="text-xl md:text-2xl font-serif text-red-500 mb-2">{content.title}</h3>
                  <p className="text-red-400 mb-4 font-bold text-sm md:text-base">
                    {content.desc}
                  </p>
                  <p className="text-[#57534e] mb-4 leading-relaxed text-sm md:text-base">
                    {content.lesson}
                  </p>
                  <div className="bg-red-50 p-4 rounded border border-red-200">
                     <span className="text-red-600 font-bold mr-2 text-sm md:text-base">Conseil :</span>
                     <span className="text-[#78350f] text-sm md:text-base">{content.advice}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white p-8 border-l-4 border-green-500 shadow-sm rounded-r-xl">
              <h3 className="text-2xl font-serif text-green-600 mb-2">Karma Libre</h3>
              <p className="text-green-700">
                Vous n'avez pas de dettes karmiques majeures dans votre grille d'inclusion. Vous êtes venu(e) perfectionner vos acquis plutôt que de combler des manques.
              </p>
            </div>
          )}
        </div>
      </PageContainer>

      {/* PAGE 22: MOI SUBCONSCIENT */}
      <PageContainer className="p-4 md:p-16 justify-center text-center">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12">Le Moi Subconscient</h2>
        <div className="text-7xl md:text-9xl font-serif text-[#d97706] mb-8">{results.subconsciousSelf} / 9</div>
        <p className="text-base md:text-xl max-w-2xl mx-auto text-[#57534e]">
          Avec un score de {results.subconsciousSelf}, vous avez une base émotionnelle {results.subconsciousSelf >= 7 ? "très stable" : "réactive"}.
          Cela détermine votre capacité à garder votre sang-froid face aux imprévus de la vie.
        </p>
      </PageContainer>

      {/* PAGE 23: LE PONT */}
      <PageContainer className="p-4 md:p-16 bg-[#fffbf0]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
          Le Pont de Réconciliation
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Left Column: Visual & Number */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xl md:text-2xl font-serif text-[#a8a29e] mb-8">
              <span>Chemin {results.lifePath}</span>
              <span className="hidden md:block h-px w-16 bg-[#d97706]"></span>
              <span className="md:hidden text-[#d97706]">↓</span>
              <span>Expression {results.expression}</span>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#d97706] blur-2xl opacity-10 rounded-full"></div>
              <div className="relative p-12 border-2 border-[#d97706] rounded-full w-48 h-48 flex items-center justify-center bg-white shadow-lg">
                <span className="text-6xl font-bold text-[#d97706]">{results.bridgeNumber}</span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-serif text-[#78350f] mb-2">{bridgeContent.title}</h3>
              <p className="text-[#d97706] font-medium italic">{bridgeContent.mantra}</p>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h4 className="font-bold text-[#78350f] mb-2 flex items-center gap-2">
                <span className="text-xl">⚠️</span> Quand l'utiliser ?
              </h4>
              <p className="text-[#57534e] text-sm md:text-base leading-relaxed">
                {bridgeContent.symptoms}
              </p>
            </div>

            <div className="bg-[#fff7ed] p-6 rounded-xl border border-[#d97706]/30">
              <h4 className="font-bold text-[#d97706] mb-2 flex items-center gap-2">
                <span className="text-xl">🔑</span> La Solution
              </h4>
              <p className="text-[#78350f] text-sm md:text-base leading-relaxed">
                {bridgeContent.desc} {bridgeContent.action}
              </p>
            </div>
            
            <p className="text-sm text-[#a8a29e] italic border-l-2 border-[#a8a29e] pl-4">
              "Le nombre du Pont est la pièce manquante qui transforme la friction entre ce que vous êtes et ce que vous vivez en une force propulsive."
            </p>
          </div>

        </div>
      </PageContainer>
    </>
  );
}
