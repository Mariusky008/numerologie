
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import InclusionGridViz from '../InclusionGridViz';
import { getKarmicLessonContent, getExcessNumberContent } from '@/lib/numerology/contentGenerator';

export default function Part3Karma({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  return (
    <>
      {/* PAGE 17: GRILLE D'INCLUSION VISUELLE */}
      <PageContainer className="p-16 bg-[#1c1917]">
        <h2 className="text-4xl font-serif text-[#fdfbf7] mb-8 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Le Miroir Karmique
        </h2>
        <p className="text-xl font-light mb-12 max-w-2xl text-[#d6d3d1]">
          La Grille d'Inclusion est la radiographie de votre âme. Elle montre ce que vous avez emporté dans vos valises pour cette vie.
        </p>
        <div className="flex justify-center">
          <div className="scale-125 origin-top">
            <InclusionGridViz 
              grid={results.inclusionGrid} 
              missing={results.missingNumbers} 
              excess={results.excessNumbers} 
            />
          </div>
        </div>
      </PageContainer>

      {/* PAGE 18-19: FORCES ACQUISES */}
      <PageContainer className="p-16">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Vos Forces Acquises
        </h2>
        <div className="space-y-8">
          {results.excessNumbers && results.excessNumbers.length > 0 ? (
            results.excessNumbers.map(n => {
              const content = getExcessNumberContent(n);
              return (
                <div key={n} className="bg-[#292524] p-8 border-l-4 border-[#fbbf24]">
                  <h3 className="text-2xl font-serif text-[#fbbf24] mb-2">{content.title}</h3>
                  <p className="text-[#d6d3d1] mb-4">
                    {content.desc}
                  </p>
                  <p className="text-[#d6d3d1] italic mb-2">
                    {content.potential}
                  </p>
                  <p className="text-[#fbbf24]/80 text-sm font-bold uppercase tracking-wide">
                    {content.warning}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-xl italic text-[#fbbf24]">
              Votre grille est remarquablement équilibrée en termes d'excès. Vous ne dépendez pas d'une seule force dominante.
            </p>
          )}
        </div>
      </PageContainer>

      {/* PAGE 20-21: LEÇONS KARMIQUES */}
      <PageContainer className="p-16">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-12 border-b-2 border-red-400 pb-4 inline-block">
          Les Leçons Karmiques
        </h2>
        <div className="space-y-8">
          {results.missingNumbers && results.missingNumbers.length > 0 ? (
            results.missingNumbers.map(n => {
              const content = getKarmicLessonContent(n);
              return (
                <div key={n} className="bg-[#292524] p-8 border-l-4 border-red-400">
                  <h3 className="text-2xl font-serif text-red-400 mb-2">{content.title}</h3>
                  <p className="text-red-200/80 mb-4 font-bold">
                    {content.desc}
                  </p>
                  <p className="text-[#d6d3d1] mb-4 leading-relaxed">
                    {content.lesson}
                  </p>
                  <div className="bg-[#1c1917] p-4 rounded border border-red-900/30">
                     <span className="text-red-400 font-bold mr-2">Conseil :</span>
                     <span className="text-[#d6d3d1]">{content.advice}</span>
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
      <PageContainer className="p-16 justify-center text-center">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-12">Le Moi Subconscient</h2>
        <div className="text-9xl font-serif text-[#fbbf24] mb-8">{results.subconsciousSelf} / 9</div>
        <p className="text-xl max-w-2xl mx-auto text-[#d6d3d1]">
          Avec un score de {results.subconsciousSelf}, vous avez une base émotionnelle {results.subconsciousSelf >= 7 ? "très stable" : "réactive"}.
          Cela détermine votre capacité à garder votre sang-froid face aux imprévus de la vie.
        </p>
      </PageContainer>

      {/* PAGE 23: LE PONT */}
      <PageContainer className="p-16 bg-[#1c1917]">
        <h2 className="text-4xl font-serif text-[#fef3c7] mb-12 border-b-2 border-[#fbbf24] pb-4 inline-block">
          Le Pont de Réconciliation
        </h2>
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-8 text-2xl font-serif text-[#a8a29e]">
            <span>Chemin {results.lifePath}</span>
            <span className="h-px w-16 bg-[#fbbf24]"></span>
            <span>Expression {results.expression}</span>
          </div>
          <div className="p-8 border-2 border-[#fbbf24] rounded-full w-48 h-48 flex items-center justify-center">
            <span className="text-6xl font-bold text-[#fbbf24]">{results.bridgeNumber}</span>
          </div>
          <p className="text-center max-w-xl text-[#d6d3d1]">
            Le nombre {results.bridgeNumber} est l'attitude à adopter pour harmoniser votre mission de vie et votre personnalité.
            C'est la clé qui permet de fluidifier votre avancement.
          </p>
        </div>
      </PageContainer>
    </>
  );
}
