
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import InclusionGridViz from '../InclusionGridViz';
import { getKarmicLessonContent, getExcessNumberContent } from '@/lib/numerology/contentGenerator';

export default function Part3Karma({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  return (
    <>
      {/* PAGE 17: GRILLE D'INCLUSION VISUELLE */}
      <PageContainer className="p-4 md:p-16 bg-[#1c1917]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fdfbf7] mb-8 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Le Miroir Karmique
        </h2>
        <p className="text-base md:text-xl font-light mb-12 max-w-2xl text-[#d6d3d1]">
          La Grille d'Inclusion est la radiographie de votre âme. Elle montre ce que vous avez emporté dans vos valises pour cette vie.
        </p>
        <div className="flex justify-center overflow-x-auto">
          <div className="scale-100 md:scale-125 origin-top p-4">
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
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Vos Forces Acquises
        </h2>
        <div className="space-y-8">
          {results.excessNumbers && results.excessNumbers.length > 0 ? (
            results.excessNumbers.map(n => {
              const content = getExcessNumberContent(n);
              return (
                <div key={n} className="bg-[#292524] p-6 md:p-8 border-l-4 border-[#fbbf24]">
                  <h3 className="text-xl md:text-2xl font-serif text-[#fbbf24] mb-2">{content.title}</h3>
                  <p className="text-[#d6d3d1] mb-4 text-sm md:text-base">
                    {content.desc}
                  </p>
                  <p className="text-[#d6d3d1] italic mb-2 text-sm md:text-base">
                    {content.potential}
                  </p>
                  <p className="text-[#fbbf24]/80 text-xs md:text-sm font-bold uppercase tracking-wide">
                    {content.warning}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-lg md:text-xl italic text-[#fbbf24]">
              Votre grille est remarquablement équilibrée en termes d'excès. Vous ne dépendez pas d'une seule force dominante.
            </p>
          )}
        </div>
      </PageContainer>

      {/* PAGE 20-21: LEÇONS KARMIQUES */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12 border-b-2 border-red-400 pb-4 inline-block">
          Les Leçons Karmiques
        </h2>
        <div className="space-y-8">
          {results.missingNumbers && results.missingNumbers.length > 0 ? (
            results.missingNumbers.map(n => {
              const content = getKarmicLessonContent(n);
              return (
                <div key={n} className="bg-[#292524] p-6 md:p-8 border-l-4 border-red-400">
                  <h3 className="text-xl md:text-2xl font-serif text-red-400 mb-2">{content.title}</h3>
                  <p className="text-red-200/80 mb-4 font-bold text-sm md:text-base">
                    {content.desc}
                  </p>
                  <p className="text-[#d6d3d1] mb-4 leading-relaxed text-sm md:text-base">
                    {content.lesson}
                  </p>
                  <div className="bg-[#1c1917] p-4 rounded border border-red-900/30">
                     <span className="text-red-400 font-bold mr-2 text-sm md:text-base">Conseil :</span>
                     <span className="text-[#d6d3d1] text-sm md:text-base">{content.advice}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-[#292524] p-8 border-l-4 border-green-500">
              <h3 className="text-2xl font-serif text-green-400 mb-2">Karma Libre</h3>
              <p className="text-green-200/80">
                Vous n'avez pas de dettes karmiques majeures dans votre grille d'inclusion. Vous êtes venu(e) perfectionner vos acquis plutôt que de combler des manques.
              </p>
            </div>
          )}
        </div>
      </PageContainer>

      {/* PAGE 22: MOI SUBCONSCIENT */}
      <PageContainer className="p-4 md:p-16 justify-center text-center">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12">Le Moi Subconscient</h2>
        <div className="text-7xl md:text-9xl font-serif text-[#fbbf24] mb-8">{results.subconsciousSelf} / 9</div>
        <p className="text-base md:text-xl max-w-2xl mx-auto text-[#d6d3d1]">
          Avec un score de {results.subconsciousSelf}, vous avez une base émotionnelle {results.subconsciousSelf >= 7 ? "très stable" : "réactive"}.
          Cela détermine votre capacité à garder votre sang-froid face aux imprévus de la vie.
        </p>
      </PageContainer>

      {/* PAGE 23: LE PONT */}
      <PageContainer className="p-4 md:p-16 bg-[#1c1917]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#fef3c7] mb-8 md:mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Le Pont de Réconciliation
        </h2>
        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xl md:text-2xl font-serif text-[#a8a29e]">
            <span>Chemin {results.lifePath}</span>
            <span className="hidden md:block h-px w-16 bg-[#fbbf24]"></span>
            <span className="md:hidden text-[#fbbf24]">↓</span>
            <span>Expression {results.expression}</span>
          </div>
          <div className="p-8 border-2 border-[#fbbf24] rounded-full w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
            <span className="text-4xl md:text-6xl font-bold text-[#fbbf24]">{results.bridgeNumber}</span>
          </div>
          <p className="text-center max-w-xl text-[#d6d3d1] text-sm md:text-base">
            Le nombre {results.bridgeNumber} est l'attitude à adopter pour harmoniser votre mission de vie et votre personnalité.
            C'est la clé qui permet de fluidifier votre avancement.
          </p>
        </div>
      </PageContainer>
    </>
  );
}
