
import PageContainer from './PageContainer';
import { UserData, NumerologyResult } from '@/lib/types';

export default function PartAstro({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  const birthPlace = userData.birthPlace || "Lieu Inconnu";
  const vibration = results.astroResonance.birthPlaceVibration;

  // Simple interpretation logic (placeholder for real Astrocartography)
  const resonance = (vibration + results.lifePath) % 9 || 9;
  const isHarmonious = [1, 3, 5, 6, 9].includes(resonance);

  return (
    <PageContainer className="p-4 md:p-16">
      <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
        Astrocartographie Numérologique
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-[#d97706] mb-2">Lieu de Naissance</h3>
            <div className="text-2xl md:text-3xl text-[#78350f] font-serif mb-2">{birthPlace}</div>
            <div className="flex items-center gap-4 mt-4">
              <div className="w-12 h-12 rounded-full bg-[#fffbf0] flex items-center justify-center border border-[#d97706] text-[#d97706] font-bold text-xl">
                {vibration}
              </div>
              <span className="text-[#a8a29e] text-sm uppercase">Vibration du Lieu</span>
            </div>
          </div>

          <div className={`p-6 rounded-xl border-l-4 ${isHarmonious ? 'border-green-500 bg-green-50' : 'border-orange-500 bg-orange-50'}`}>
            <h3 className={`text-lg md:text-xl font-bold mb-2 ${isHarmonious ? 'text-green-700' : 'text-orange-700'}`}>
              Résonance : {isHarmonious ? "Harmonieuse" : "Dynamique"}
            </h3>
            <p className="text-[#57534e] text-sm md:text-base leading-relaxed">
              {isHarmonious 
                ? "Ce lieu soutient naturellement votre énergie. C'est une terre d'ancrage pour vous." 
                : "Ce lieu vous pousse à l'action et au dépassement. Il peut être stimulant mais exigeant."}
            </p>
          </div>
        </div>

        {/* Placeholder for Map */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden relative min-h-[300px] flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center"></div>
          <div className="relative z-10 text-center p-8">
            <div className="text-4xl mb-4">🌍</div>
            <h4 className="text-xl font-serif text-[#d97706] mb-2">Carte Énergétique Mondiale</h4>
            <p className="text-[#a8a29e] text-sm">
              (Module de visualisation des Hotspots en cours de développement)
            </p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
