
import { UserData, NumerologyResult } from '@/lib/types';
import PageContainer from './PageContainer';
import InclusionGridViz from '../InclusionGridViz';
import { getKarmicLessonContent, getExcessNumberContent, getBridgeContent, getBalancedNumberContent } from '@/lib/numerology/contentGenerator';

export default function Part3KarmaV2({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const bridgeContent = getBridgeContent(results.bridgeNumber);
  
  // Calculate balanced numbers (neither missing nor excess)
  const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const balancedNumbers = allNumbers.filter(n => 
    (!results.missingNumbers?.includes(n)) && 
    (!results.excessNumbers?.includes(n))
  );

  return (
    <>
      {/* PAGE 17: GRILLE D'INCLUSION VISUELLE */}
      <PageContainer className="p-4 md:p-16 bg-[#FAF9F7]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Le Miroir Karmique
        </h2>
        <p className="text-base md:text-xl font-light mb-12 max-w-2xl text-[#2C2F4A]">
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
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block" style={{ pageBreakBefore: 'always' }}>
          Vos Forces Acquises
        </h2>

        <div className="space-y-8">
          {results.excessNumbers && results.excessNumbers.length > 0 ? (
            results.excessNumbers.map(n => {
              const content = getExcessNumberContent(n);
              return (
                <div key={n} className="bg-white p-6 md:p-8 border-l-4 border-[#C9A24D] shadow-sm rounded-r-xl" style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-xl md:text-2xl font-serif text-[#C9A24D] mb-2">{content.title}</h3>
                  <p className="text-[#2C2F4A] mb-4 text-sm md:text-base">
                    {content.desc}
                  </p>
                  <p className="text-[#2C2F4A] italic mb-2 text-sm md:text-base">
                    {content.potential}
                  </p>
                  <p className="text-[#C9A24D]/80 text-xs md:text-sm font-bold uppercase tracking-wide">
                    {content.warning}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-lg md:text-xl italic text-[#C9A24D]">
              Votre grille est remarquablement équilibrée en termes d'excès. Vous ne dépendez pas d'une seule force dominante.
            </p>
          )}
        </div>
      </PageContainer>

      {/* NOMBRES ÉQUILIBRÉS */}
      {balancedNumbers.length > 0 && (
        <PageContainer className="p-4 md:p-16">
          <h2 className="text-2xl md:text-4xl font-serif text-[#15803d] mb-8 md:mb-12 border-b-2 border-[#15803d] pb-4 inline-block" style={{ pageBreakBefore: 'always' }}>
            Vos Zones d'Équilibre
          </h2>
          
          <div className="space-y-8">
            {balancedNumbers.map(n => {
              const content = getBalancedNumberContent(n);
              return (
                <div key={n} className="bg-white p-6 md:p-8 border-l-4 border-[#15803d] shadow-sm rounded-r-xl" style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-xl md:text-2xl font-serif text-[#15803d] mb-2">{content.title}</h3>
                  <p className="text-[#15803d] mb-4 font-medium text-sm md:text-base">
                    {content.desc}
                  </p>
                  <p className="text-[#2C2F4A] mb-4 leading-relaxed text-sm md:text-base">
                    {content.meaning}
                  </p>
                  <p className="text-[#2C2F4A] italic text-sm md:text-base">
                    {content.benefit}
                  </p>
                </div>
              );
            })}
          </div>
        </PageContainer>
      )}

      {/* PAGE 20-21: LEÇONS KARMIQUES */}
      <PageContainer className="p-4 md:p-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-red-400 pb-4 inline-block" style={{ pageBreakBefore: 'always' }}>
          Les Leçons Karmiques
        </h2>
        
        <div className="space-y-8">
          {results.missingNumbers && results.missingNumbers.length > 0 ? (
            results.missingNumbers.map(n => {
              try {
                const content = getKarmicLessonContent(n);
                return (
                  <div key={n} className="bg-white p-6 md:p-8 border-l-4 border-red-400 shadow-sm rounded-r-xl" style={{ pageBreakInside: 'avoid' }}>
                    <h3 className="text-xl md:text-2xl font-serif text-red-500 mb-2">{content.title}</h3>
                    <p className="text-red-400 mb-4 font-bold text-sm md:text-base">
                      {content.desc}
                    </p>
                    <p className="text-[#2C2F4A] mb-4 leading-relaxed text-sm md:text-base">
                      {content.lesson}
                    </p>
                    <div className="bg-red-50 p-4 rounded border border-red-200">
                       <span className="text-red-600 font-bold mr-2 text-sm md:text-base">Conseil :</span>
                       <span className="text-[#2C2F4A] text-sm md:text-base">{content.advice}</span>
                    </div>
                  </div>
                );
              } catch (e) {
                return (
                  <div key={n} className="p-4 bg-red-100 border border-red-500 text-red-700">
                    Erreur d'affichage pour la leçon {n}: {String(e)}
                  </div>
                );
              }
            })
          ) : (
            <div className="bg-white p-8 border-l-4 border-green-500 shadow-sm rounded-r-xl" style={{ pageBreakInside: 'avoid' }}>
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
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12">Le Moi Subconscient</h2>
        <div className="text-7xl md:text-9xl font-serif text-[#C9A24D] mb-4">{results.subconsciousSelf}</div>
        
        <p className="text-base md:text-xl max-w-2xl mx-auto text-[#2C2F4A]">
          Avec un résultat de {results.subconsciousSelf}, votre réaction face aux imprévus est {results.subconsciousSelf >= 7 ? "empreinte de recul et de maturité" : "instinctive et rapide"}.
          {results.subconsciousSelf >= 7 
            ? "Vous avez cette capacité naturelle à ne pas vous laisser submerger par l'émotion immédiate." 
            : "Vous ressentez les choses intensément et réagissez souvent dans l'instant, avec spontanéité."}
        </p>
      </PageContainer>

      {/* PAGE 23: LE PONT */}
      <PageContainer className="p-4 md:p-16 bg-[#FAF9F7]">
        <h2 className="text-2xl md:text-4xl font-serif text-[#2C2F4A] mb-8 md:mb-12 border-b-2 border-[#C9A24D] pb-4 inline-block">
          Le Pont de Réconciliation
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
          
          {/* Left Column: Visual & Number */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xl md:text-2xl font-serif text-[#8FA6A0] mb-8">
              <span>Chemin {results.lifePath}</span>
              <span className="hidden md:block h-px w-16 bg-[#C9A24D]"></span>
              <span className="md:hidden text-[#C9A24D]">↓</span>
              <span>Expression {results.expression}</span>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-[#C9A24D] blur-2xl opacity-10 rounded-full"></div>
              <div className="relative p-12 border-2 border-[#C9A24D] rounded-full w-48 h-48 flex items-center justify-center bg-white shadow-lg">
                <span className="text-6xl font-bold text-[#C9A24D]">{results.bridgeNumber}</span>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-serif text-[#2C2F4A] mb-2">{bridgeContent.title}</h3>
              <p className="text-[#C9A24D] font-medium italic">{bridgeContent.mantra}</p>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
              <h4 className="font-bold text-[#2C2F4A] mb-2 flex items-center gap-2">
                <span className="text-xl">⚠️</span> Quand l'utiliser ?
              </h4>
              <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed">
                {bridgeContent.symptoms}
              </p>
            </div>

            <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#C9A24D]/30">
              <h4 className="font-bold text-[#C9A24D] mb-2 flex items-center gap-2">
                <span className="text-xl">🔑</span> La Solution
              </h4>
              <p className="text-[#2C2F4A] text-sm md:text-base leading-relaxed">
                {bridgeContent.desc} {bridgeContent.action}
              </p>
            </div>
            
            <p className="text-sm text-[#8FA6A0] italic border-l-2 border-[#8FA6A0] pl-4">
              "Le nombre du Pont est la pièce manquante qui transforme la friction entre ce que vous êtes et ce que vous vivez en une force propulsive."
            </p>
          </div>

        </div>
      </PageContainer>
    </>
  );
}
