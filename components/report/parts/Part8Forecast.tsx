
import PageContainer from './PageContainer';
import { UserData, NumerologyResult } from '@/lib/types';

export default function Part8Forecast({ userData, results }: { userData: UserData, results: NumerologyResult }) {
  if (!results.previsions) return null;

  return (
    <PageContainer className="p-4 md:p-16">
      <h2 className="text-2xl md:text-4xl font-serif text-[#78350f] mb-8 md:mb-12 border-b-2 border-[#d97706] pb-4 inline-block">
        Météo Astrale & Numérologique
      </h2>

      <p className="text-[#57534e] text-lg mb-8 italic">
        "Ce que vous vivez aujourd'hui est la rencontre entre votre nature profonde et les cycles du temps."
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Numerology Forecast */}
        <div className="bg-white p-8 rounded-xl border-l-4 border-[#d97706] shadow-sm">
           <div className="flex items-center gap-4 mb-6">
             <div className="text-4xl">📅</div>
             <div>
               <div className="text-xs uppercase tracking-widest text-[#a8a29e]">Cycles Temporels</div>
               <h3 className="text-xl font-serif font-bold text-[#78350f]">Vibrations du Moment</h3>
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-[#fffbf0] p-4 rounded-xl border border-[#d97706]/20 text-center">
                <div className="text-4xl font-bold text-[#d97706] mb-1">{results.previsions.personalMonth}</div>
                <div className="text-xs uppercase tracking-widest text-[#78350f]">Mois Personnel</div>
              </div>
              <div className="bg-[#fffbf0] p-4 rounded-xl border border-[#d97706]/20 text-center">
                <div className="text-4xl font-bold text-[#d97706] mb-1">{results.previsions.personalDay}</div>
                <div className="text-xs uppercase tracking-widest text-[#78350f]">Jour Personnel</div>
              </div>
           </div>
           <p className="text-sm text-[#57534e] italic leading-relaxed">
             Votre Jour Personnel {results.previsions.personalDay} vous invite à l'action immédiate, coloré par l'ambiance de fond de votre Mois {results.previsions.personalMonth}.
           </p>
        </div>

        {/* Astro Transits */}
        <div className="bg-[#1B263B] text-white p-8 rounded-xl border border-[#1B263B] shadow-sm print:bg-[#2c3e50] print:text-white">
           <div className="flex items-center gap-4 mb-6">
             <div className="text-4xl">🌌</div>
             <div>
               <div className="text-xs uppercase tracking-widest text-stone-400">Ciel Actuel</div>
               <h3 className="text-xl font-serif font-bold text-[#fffbf0]">Transits Planétaires</h3>
             </div>
           </div>

           <div className="space-y-3 text-sm">
              {['Sun', 'Moon', 'Saturn', 'Jupiter', 'Mars', 'Venus'].map((planet) => {
                const p = results.previsions?.astroTransits[planet];
                if (!p) return null;
                
                const planetNames: Record<string, string> = {
                    'Sun': 'Soleil',
                    'Moon': 'Lune',
                    'Mercury': 'Mercure',
                    'Venus': 'Vénus',
                    'Mars': 'Mars',
                    'Jupiter': 'Jupiter',
                    'Saturn': 'Saturne',
                    'Uranus': 'Uranus',
                    'Neptune': 'Neptune',
                    'Pluto': 'Pluton'
                };

                return (
                  <div key={planet} className="flex justify-between items-center bg-white/10 px-4 py-3 rounded border border-white/10">
                    <span className="font-medium">{planetNames[planet] || planet}</span>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[#d97706]">{p.signe}</span>
                        {p.retrograde && <span className="text-[10px] bg-red-500/20 text-red-200 px-1 rounded">R</span>}
                    </div>
                  </div>
                );
              })}
           </div>
           <p className="text-xs text-stone-400 mt-4 italic text-center">
             * Positions actuelles influençant le collectif.
           </p>
        </div>
      </div>
    </PageContainer>
  );
}
