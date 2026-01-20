'use client';

import { motion } from 'framer-motion';
import { UserData, NumerologyResult } from '@/lib/types';
import { NameData } from '@/lib/numerology/db_etymology';
import CosmicHeader from './design-system/CosmicHeader';
import KeyNumbersSection from './design-system/KeyNumbersSection';
import PersonalityRadar from './PersonalityRadar';
import InclusionGridViz from './InclusionGridViz';
import WahooRevelation from './WahooRevelation';
import Part1Identity from './parts/Part1Identity';
import Part2Incarnation from './parts/Part2Incarnation';
import Part3KarmaV2 from './parts/Part3KarmaV2';
import Part4Focus from './parts/Part4Focus';
import Part5Future from './parts/Part5Future';
import Part6Integration from './parts/Part6Integration';
import Part7ConclusionKeys from './parts/Part7ConclusionKeys';
import Part8Forecast from './parts/Part8Forecast';
import { Check } from 'lucide-react';
import { PEDAGOGY_CONTENT } from '@/lib/numerology/modules/pedagogy';
import { TRAINING_30D } from '@/lib/numerology/modules/training30d';
import { analyzeNameSignature } from '@/lib/numerology/modules/anthroponymy';
import { generateDecadeForecast } from '@/lib/numerology/modules/decade';
import { PLANET_INFLUENCES, ZODIAC_DETAILS } from '@/lib/numerology/interpretations-astro-geo';
import interpretations from '@/lib/numerology/interpretations.json';

interface FullReportProps {
  userData: UserData;
  results: NumerologyResult;
  etymology?: NameData | null;
}

export default function FullReportV3({ userData, results, etymology }: FullReportProps) {
  
  // Calculations
  const decadeForecast = generateDecadeForecast(userData.birthDate);
  const nameSignature = analyzeNameSignature(userData.firstName + " " + userData.lastName);

  // Advanced data display helpers
  const lifePathText = results.advancedProfile?.pathData?.essence || (interpretations.lifePath as any)[results.lifePath.toString()] || "Chemin unique.";
  const expressionText = (interpretations.expression as any)[results.expression.toString()] || "Expression unique.";
  const pathTitle = results.advancedProfile?.pathData?.titre || `Chemin de Vie ${results.lifePath}`;

  const zodiacKey = results.advancedProfile?.zodiac?.toLowerCase();
  const planetKey = results.advancedProfile?.dominantPlanet?.toLowerCase();
  
  // Prefer Real Astro calculation if available
  const realZodiac = results.realAstro?.['Sun']?.signe;
  const realAscendant = results.realAstro?.['Ascendant']?.signe;
  const realHouse = results.realAstro?.['Sun']?.maison;
  
  const zodiac = realZodiac || (zodiacKey ? zodiacKey.charAt(0).toUpperCase() + zodiacKey.slice(1) : "");
  const ascendant = realAscendant || "Inconnu (Heure nécessaire)";
  const planet = planetKey ? planetKey.charAt(0).toUpperCase() + planetKey.slice(1) : "";
  const planetText = planetKey ? PLANET_INFLUENCES[planetKey] : "";
  const zodiacInfoKey = realZodiac ? realZodiac.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : zodiacKey;
  const zodiacInfo = zodiacInfoKey ? ZODIAC_DETAILS[zodiacInfoKey] : null;

  return (
    <div className="w-full bg-[#FAF9F7] text-[#2C2F4A] font-sans">
      
      {/* 1. HEADER COSMIQUE */}
      <CosmicHeader 
        firstName={userData.firstName}
        lastName={userData.lastName}
        lifePath={results.lifePath}
      />

      <div className="p-8 max-w-5xl mx-auto">

        {/* 2. PÉDAGOGIE & MODE D'EMPLOI */}
        <div className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm mb-12">
          <h2 className="text-2xl font-serif text-[#2C2F4A] mb-4 flex items-center gap-2">
            <span className="text-[#C9A24D]">★</span> {PEDAGOGY_CONTENT.intro.title}
          </h2>
          <div className="text-[#2C2F4A]/80 leading-relaxed whitespace-pre-line mb-6">
            {PEDAGOGY_CONTENT.intro.content}
          </div>
          <div className="bg-[#FAF9F7] p-4 rounded-xl border border-[#C9A24D]/20">
            <ul className="space-y-2">
              {PEDAGOGY_CONTENT.intro.points_cles.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                   <Check className="w-4 h-4 text-[#C9A24D] shrink-0 mt-0.5" />
                   <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. ANTHROPONYMIE */}
        {nameSignature && (
          <div className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm mb-12">
             <h3 className="text-xl font-serif text-[#2C2F4A] mb-4">Signature Vibratoire du Nom</h3>
             {nameSignature.etymology && (
               <div className="mb-8 p-6 bg-[#2C2F4A] rounded-xl text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A24D]/10 rounded-full blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="text-xs uppercase tracking-widest text-[#C9A24D] mb-2">Origine & Sens Caché</div>
                    <h4 className="text-2xl font-serif mb-2">{userData.firstName}</h4>
                    <div className="flex flex-wrap gap-4 text-sm mb-4 opacity-80">
                      <span className="bg-white/10 px-3 py-1 rounded-full">{nameSignature.etymology.origin}</span>
                      <span className="italic">"{nameSignature.etymology.meaning}"</span>
                    </div>
                    {nameSignature.etymology.spiritual && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-sm leading-relaxed italic text-[#C9A24D]">
                          ✨ Dimension Spirituelle : {nameSignature.etymology.spiritual}
                        </p>
                      </div>
                    )}
                  </div>
               </div>
             )}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="bg-[#FAF9F7] p-4 rounded-lg text-center">
                 <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-1">Initiale</div>
                 <div className="text-4xl font-serif text-[#C9A24D]">{nameSignature.firstLetter}</div>
                 <p className="text-xs text-[#2C2F4A]/60 mt-2">{nameSignature.initialMeaning}</p>
               </div>
               <div className="bg-[#FAF9F7] p-4 rounded-lg text-center">
                 <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-1">Type de Signature</div>
                 <div className="text-xl font-bold text-[#2C2F4A] mt-2">{nameSignature.signatureType}</div>
                 <p className="text-xs text-[#2C2F4A]/60 mt-2">
                   {nameSignature.vowelsCount} voyelles / {nameSignature.consonantsCount} consonnes
                 </p>
               </div>
               <div className="bg-[#FAF9F7] p-4 rounded-lg text-center">
                 <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-1">Longueur</div>
                 <div className="text-xl font-bold text-[#2C2F4A] mt-2">{nameSignature.length} Lettres</div>
                 <p className="text-xs text-[#2C2F4A]/60 mt-2">Vibration de l'amplitude</p>
               </div>
             </div>
          </div>
        )}

        {/* 5.5 INCARNATION & KARMA (V2) */}
        <div className="space-y-12 mb-12">
          <Part2Incarnation userData={userData} results={results} />
          <Part3KarmaV2 userData={userData} results={results} />
        </div>

        {/* 6. RADAR & AXES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          <div className="w-full">
            <PersonalityRadar data={results} />
          </div>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-[#EFEDE9] shadow-sm">
              <h3 className="text-xl font-serif text-[#2C2F4A] mb-4">Axes Professionnels</h3>
              <div className="flex flex-wrap gap-2">
                {results.professionalAxes.map((axis, i) => (
                  <span key={i} className="px-3 py-1 bg-[#FAF9F7] text-[#5B4B8A] rounded-full text-sm border border-[#5B4B8A]/20 font-medium">
                    {axis}
                  </span>
                ))}
              </div>
            </div>
            {results.planesOfExpression && (
              <div className="bg-white p-6 rounded-xl border border-[#EFEDE9] shadow-sm">
                <h3 className="text-xl font-serif text-[#2C2F4A] mb-4">Plans d'Expression</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Mental */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Mental</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.mental}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <div style={{ width: `${results.planesOfExpression.mental}%` }} className="h-full bg-blue-400" />
                      </div>
                    </div>
                    {/* Physique */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Physique</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.physical}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <div style={{ width: `${results.planesOfExpression.physical}%` }} className="h-full bg-red-400" />
                      </div>
                    </div>
                    {/* Émotionnel */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Émotionnel</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.emotional}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <div style={{ width: `${results.planesOfExpression.emotional}%` }} className="h-full bg-green-400" />
                      </div>
                    </div>
                    {/* Intuitif */}
                    <div>
                      <div className="flex justify-between text-[10px] uppercase tracking-widest mb-1">
                        <span>Intuitif</span>
                        <span className="font-bold text-[#5B4B8A]">{results.planesOfExpression.intuitive}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#EFEDE9] rounded-full overflow-hidden">
                        <div style={{ width: `${results.planesOfExpression.intuitive}%` }} className="h-full bg-purple-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 6.5 FOCUS (V2) */}
        <div className="mb-12">
          <Part4Focus userData={userData} results={results} />
        </div>

        {/* 7. GRILLE D'INCLUSION */}
        <div className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
             <div>
               <h3 className="text-2xl font-serif text-[#2C2F4A] mb-4">Grille d'Inclusion</h3>
               <p className="text-[#2C2F4A]/80 mb-6">
                 Cette matrice révèle la répartition de vos énergies.
               </p>
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center text-red-600 font-bold">
                      {results.missingNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-[#2C2F4A] font-medium">Dettes Karmiques</div>
                      <div className="text-sm text-[#8FA6A0]">Nombres manquants</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                      {results.excessNumbers?.length || 0}
                    </div>
                    <div>
                      <div className="text-[#2C2F4A] font-medium">Forces Acquises</div>
                      <div className="text-sm text-[#8FA6A0]">Nombres en excès</div>
                    </div>
                  </div>
               </div>
             </div>
             <div>
               <InclusionGridViz 
                 grid={results.inclusionGrid} 
                 missing={results.missingNumbers} 
                 excess={results.excessNumbers} 
               />
             </div>
          </div>
        </div>

        {/* 7.5 INTEGRATION (V2) */}
        <div className="mb-12">
          <Part6Integration userData={userData} results={results} />
        </div>

        {/* 7.5 INTEGRATION (V2) */}
        <div className="mb-12">
          <Part6Integration userData={userData} results={results} />
        </div>

        {/* 8. ARCHITECTURE ASTRALE */}
        {results.advancedProfile && (
           <div className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm mb-12">
             <h3 className="text-2xl font-serif text-[#2C2F4A] mb-6 flex items-center gap-3">
               <span className="text-[#C9A24D]">VII.</span> Architecture Astrale
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Zodiac */}
                <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#C9A24D]/10">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="text-4xl">♈</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Signe Solaire</div>
                       <div className="text-xl font-serif text-[#2C2F4A] font-bold">{zodiac}</div>
                       {results.realAstro && (
                         <div className="text-xs text-[#C9A24D] mt-1 space-y-1">
                           <div>Ascendant : <span className="font-bold">{ascendant}</span></div>
                           {realHouse && <div>Maison {realHouse}</div>}
                         </div>
                       )}
                     </div>
                   </div>
                   {zodiacInfo && (
                     <div className="flex gap-2 mb-4">
                       <span className="px-3 py-1 bg-white text-[#5B4B8A] text-xs rounded-full uppercase tracking-wider font-bold border border-[#5B4B8A]/10">{zodiacInfo.element}</span>
                       <span className="px-3 py-1 bg-white text-[#5B4B8A] text-xs rounded-full uppercase tracking-wider font-bold border border-[#5B4B8A]/10">{zodiacInfo.quality}</span>
                     </div>
                   )}
                   {zodiacInfo && (
                     <p className="mt-4 text-[#2C2F4A]/70 italic text-xs leading-relaxed border-t border-[#C9A24D]/10 pt-3">
                       "{zodiacInfo.description}"
                     </p>
                   )}
                </div>
                {/* Planet */}
                <div className="bg-[#FAF9F7] p-6 rounded-xl border border-[#C9A24D]/10">
                   <div className="flex items-center gap-4 mb-4">
                     <div className="text-4xl">🪐</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Planète Dominante</div>
                       <div className="text-xl font-serif text-[#2C2F4A] font-bold">{planet}</div>
                     </div>
                   </div>
                   <div className="text-sm text-[#2C2F4A]/80 leading-relaxed space-y-3">
                     <p className="font-medium text-[#5B4B8A]">Maître du Chemin de Vie {results.lifePath}</p>
                     <p>{planetText}</p>
                   </div>
                </div>
             </div>
           </div>
        )}

        {/* 9. ÉCHOS ÉTYMOLOGIQUES */}
        {etymology && (
           <div className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm relative overflow-hidden mb-12">
             <h3 className="text-2xl font-serif text-[#2C2F4A] mb-6 flex items-center gap-3">
               <span className="text-[#C9A24D]">VIII.</span> Échos Étymologiques
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="space-y-2">
                 <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Origine</div>
                 <div className="font-serif text-lg text-[#2C2F4A]">{etymology.origin}</div>
               </div>
               <div className="space-y-2 md:col-span-2">
                 <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Signification</div>
                 <p className="text-[#2C2F4A]/80 italic">"{etymology.meaning}"</p>
               </div>
               {etymology.spiritual && (
                 <div className="md:col-span-3 pt-4 border-t border-[#C9A24D]/10">
                   <div className="text-xs uppercase tracking-widest text-[#8FA6A0] mb-2">Dimension Spirituelle</div>
                   <p className="text-[#2C2F4A]/80 leading-relaxed">{etymology.spiritual}</p>
                 </div>
               )}
             </div>
           </div>
        )}

        {/* 9.5 CYCLES & PINACLES (V2) */}
        <div className="mb-12">
          <Part5Future userData={userData} results={results} />
        </div>

        {/* 10. MÉTÉO ASTRALE */}
        {results.previsions && (
           <div className="bg-gradient-to-br from-[#2C2F4A] to-[#1a1c2e] text-white p-8 rounded-2xl border border-[#2C2F4A] shadow-lg mb-12">
             <h3 className="text-2xl font-serif text-[#FAF9F7] mb-6 flex items-center gap-3">
               <span className="text-[#C9A24D]">IX.</span> Météo Astrale & Numérologique
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                     <div className="text-4xl text-[#C9A24D]">📅</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Cycles Temporels</div>
                       <div className="text-xl font-serif font-bold">Vibrations du Moment</div>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold text-[#C9A24D] mb-1">{results.previsions.personalMonth}</div>
                        <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Mois Personnel</div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                        <div className="text-3xl font-bold text-[#C9A24D] mb-1">{results.previsions.personalDay}</div>
                        <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Jour Personnel</div>
                      </div>
                   </div>
                </div>
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                     <div className="text-4xl text-[#C9A24D]">🌌</div>
                     <div>
                       <div className="text-xs uppercase tracking-widest text-[#8FA6A0]">Ciel Actuel</div>
                       <div className="text-xl font-serif font-bold">Transits Planétaires</div>
                     </div>
                   </div>
                   <div className="grid grid-cols-2 gap-3 text-sm">
                      {['Sun', 'Moon', 'Saturn', 'Jupiter'].map((planet) => {
                        const p = results.previsions?.astroTransits[planet];
                        if (!p) return null;
                        const planetName = planet === 'Sun' ? 'Soleil' : planet === 'Moon' ? 'Lune' : planet === 'Saturn' ? 'Saturne' : 'Jupiter';
                        return (
                          <div key={planet} className="flex justify-between items-center bg-white/5 px-3 py-2 rounded border border-white/10">
                            <span>{planetName}</span>
                            <span className="font-bold text-[#C9A24D]">{p.signe}</span>
                          </div>
                        );
                      })}
                   </div>
                </div>
             </div>
           </div>
        )}

        {/* 10.5 PRÉVISIONS DÉTAILLÉES (V2) */}
        <div className="mb-12">
          <Part8Forecast userData={userData} results={results} />
        </div>

        {/* 11. PROJECTION 10 ANS (CONTENU PAYANT) */}
        <div className="bg-white p-8 rounded-2xl border border-[#EFEDE9] shadow-sm mb-12">
          <h3 className="text-2xl font-serif text-[#2C2F4A] mb-6">Projection Décennale (2026-2035)</h3>
          <div className="space-y-4">
            {decadeForecast.map((yearData) => (
              <div key={yearData.year} className="flex items-center gap-4 p-4 border-b border-[#EFEDE9] last:border-0 hover:bg-[#FAF9F7] transition-colors rounded-lg">
                <div className="w-16 text-center shrink-0">
                  <div className="text-xl font-bold text-[#2C2F4A]">{yearData.year}</div>
                  <div className="text-xs text-[#C9A24D] font-bold uppercase">Année {yearData.personalYear}</div>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[#2C2F4A] text-sm mb-1">{yearData.theme}</div>
                  <div className="text-xs text-[#2C2F4A]/70">{yearData.focus}</div>
                </div>
                <div className="hidden md:block w-1/3 text-right">
                  <div className="text-xs italic text-[#8FA6A0]">"{yearData.mantra}"</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 12. TRAINING 30 JOURS (CONTENU PAYANT) */}
        <div className="bg-[#2C2F4A] text-white p-8 rounded-2xl shadow-lg border border-[#5B4B8A]">
          <h3 className="text-2xl font-serif text-[#FAF9F7] mb-6 flex items-center gap-2">
             <span className="text-[#C9A24D]">⚡</span> Programme d'Intégration 30 Jours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRAINING_30D.map((day, i) => (
              <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#C9A24D]/50 transition-colors">
                <div className="text-xs text-[#C9A24D] font-bold uppercase mb-1">Jour {day.day} • {day.theme}</div>
                <p className="text-sm text-[#FAF9F7]/80">{day.action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 13. CONCLUSION (V2) */}
        <div className="mt-12">
          <Part7ConclusionKeys userData={userData} results={results} />
        </div>

      </div>
    </div>
  );
}