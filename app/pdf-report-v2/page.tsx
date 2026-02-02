'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import FullReportV3 from '@/components/report/FullReportV3';
import UnifiedMiroirReport from '@/components/report/UnifiedMiroirReport';
import BookCreationModal from '@/components/report/BookCreationModal';
import { UserData, NumerologyResult } from '@/lib/types';
import { PsyMirrorResult } from '@/lib/psy-mirror/types';
import { 
  calculateLifePath, 
  calculateNameNumbers, 
  calculatePersonalYear, 
  getProfessionalAxes,
  calculateInclusionGrid,
  analyzeInclusion,
  calculateSubconsciousSelf,
  calculateBridge,
  calculateChallenges,
  calculateCycles,
  calculateDeepChallenges,
  calculatePlaceVibration,
  generateCareerForecast,
  getAdvancedProfile,
  calculateLifePathDetailed,
  calculateNameNumbersDetailed,
  calculateTransits,
  calculatePlanesOfExpression,
  calculatePersonalMonth,
  calculatePersonalDay
} from '@/lib/numerology/engine';
import { fetchNameAnalysis, NameData } from '@/lib/numerology/db_etymology';
import { trackEvent } from '@/lib/analytics';
import { calculerThemeAstral, calculerTransits as calculerTransitsAstro } from '@/lib/astro/engine';

export const dynamic = 'force-dynamic';

function PrintContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<{
    userData: UserData, 
    results: NumerologyResult, 
    etymology?: NameData | null,
    psyResult?: PsyMirrorResult | null
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showBookModal, setShowBookModal] = useState(false);

  useEffect(() => {
    // Si le paiement a réussi et qu'on a un order_id, on peut potentiellement afficher la modale
    // Mais pour l'instant, on se base sur le paramètre 'payment_success'
    if (searchParams.get('payment_success') === 'true') {
      // On attend un peu que les données soient chargées pour afficher la modale
      // Ou on l'affiche dès que 'data' est prêt
    }
  }, [searchParams]);

  useEffect(() => {
    // Popup désactivée pour l'instant pour ne pas gêner le téléchargement
    // if (data && searchParams.get('payment_success') === 'true') {
    //     // Petit délai pour l'expérience utilisateur
    //     const timer = setTimeout(() => setShowBookModal(true), 1500);
    //     return () => clearTimeout(timer);
    // }
  }, [data, searchParams]);

  useEffect(() => {
    const initData = async () => {
      let userData: UserData | null = null;
      let preCalculatedResults: NumerologyResult | null = null;
      let psyResult: PsyMirrorResult | null = null;
      
      const orderId = searchParams.get('order_id');
      const dataParam = searchParams.get('data');

      if (orderId) {
        try {
          const res = await fetch(`/api/book-request?id=${orderId}`);
          if (res.ok) {
            const order = await res.json();
            
            // SECURITY CHECK: Verify payment status
            if (order.status === 'pending') {
               setError("Ce rapport est en attente de paiement. Veuillez finaliser votre commande pour y accéder.");
               return;
            }

            if (order.numerology_result?.reportResults) {
               preCalculatedResults = order.numerology_result.reportResults;
            }

            if (order.numerology_result?.psyResult) {
               psyResult = order.numerology_result.psyResult;
            } else if (order.user_data?.psyResult) {
               psyResult = order.user_data.psyResult;
            } else if (order.psyResult) {
               psyResult = order.psyResult;
            }

            // If it's a Miroir plan but psyResult is missing insights, 
            // we should still try to show the Unified layout
            const isMiroir = order.user_data?.plan === 'bundle' || !!psyResult;
            
            if (isMiroir && (!psyResult || !psyResult.insights)) {
                 // If we have at least the profiles, we can reconstruct a basic psyResult
                 const basePsy = (psyResult as any) || { self_profile: {}, behavior_profile: {} };
                 
                 psyResult = { 
                   ...basePsy,
                   indices: basePsy.indices || { coherence: 70, avoidance: 30, overcontrol: 40 },
                   insights: { 
                     mirror_sentence: "Ton potentiel de naissance demande à s'exprimer pleinement.", 
                     mirror_full: "Ton analyse révèle une structure profonde riche de possibilités. L'écart observé entre ton potentiel théorique et tes modes d'action actuels est une opportunité de réalignement. Ce rapport explore comment retrouver ta fluidité originelle.",
                     reflex_insights: [
                       { title: "Attention & Focus", observation: "Une tendance à la dispersion sous pression.", exercise: "Pratiquez la focalisation sur une seule tâche pendant 20 minutes." },
                       { title: "Rupture & Engagement", observation: "Engagement fort mais fatigue rapide.", exercise: "Fractionnez vos efforts en cycles de 45 minutes." }
                     ],
                     dimension_insights: [
                       { id: 'D1', name: 'Élan Vital', text: 'Ton dynamisme naturel est ton plus grand atout.' },
                       { id: 'D2', name: 'Prudence', text: 'Ta capacité d\'analyse te protège des risques inutiles.' },
                       { id: 'D3', name: 'Structure', text: 'Ton besoin d\'ordre assure la pérennité de tes projets.' },
                       { id: 'D4', name: 'Adaptabilité', text: 'Tu sais naviguer dans le changement avec aisance.' },
                       { id: 'D5', name: 'Vision', text: 'Ta clarté d\'esprit te permet de voir loin.' },
                       { id: 'D6', name: 'Empathie', text: 'Ta connexion aux autres est une force de leadership.' }
                     ],
                     cosmic_alignment: {
                       score: 75,
                       astroElement: "Air",
                       bioElement: "Feu",
                       title: "Alignement en Transition",
                       text: "Tu es dans une phase où ton intuition (Air) commence à diriger tes actions (Feu).",
                       origin: "Des protections passées brident encore ton élan.",
                       remedy: "Fais confiance à ta première impulsion."
                     },
                     plan_7_days: [
                       { day: 1, action: "Observer tes automatismes" },
                       { day: 2, action: "Respirer en conscience" },
                       { day: 3, action: "Noter tes pensées" },
                       { day: 4, action: "Décider rapidement" },
                       { day: 5, action: "Relâcher les tensions" },
                       { day: 6, action: "Changer une habitude" },
                       { day: 7, action: "Célébrer tes victoires" }
                     ],
                     blind_spot_label: "L'auto-exigence",
                     blind_spot: "Tu as tendance à placer la barre si haut que le succès semble inatteignable.",
                     lever: "La bienveillance envers soi-même."
                   }
                 } as PsyMirrorResult;
              }

             userData = order.user_data;
          } else if (res.status === 404) {
             setError("Commande introuvable. Veuillez vérifier le lien ou contacter le support.");
             return;
          }
        } catch (e) {
          console.error("Error fetching order", e);
          setError("Une erreur est survenue lors de la récupération du rapport.");
          return;
        }
      } else if (dataParam) {
        try {
          userData = JSON.parse(decodeURIComponent(dataParam));
        } catch (e) {
          console.error("Error parsing data param", e);
        }
      } else {
        const firstName = searchParams.get('fn');
        const lastName = searchParams.get('ln');
        const birthDate = searchParams.get('bd');
        
        if (firstName && lastName && birthDate) {
          userData = {
            firstName,
            lastName,
            birthDate,
            birthPlace: searchParams.get('bp') || '',
            focus: (searchParams.get('fo') as any) || 'mission'
          };
        }
      }

      if (userData) {
        try {
          // Fetch Etymology
          const etymology = await fetchNameAnalysis(userData.firstName.split(' ')[0]);

          let results: NumerologyResult;

          if (preCalculatedResults) {
             results = preCalculatedResults;
          } else {
            const lifePath = calculateLifePath(userData.birthDate);
            const lifePathDetails = calculateLifePathDetailed(userData.birthDate);
            
            const nameNumbers = calculateNameNumbers(userData.firstName + userData.lastName);
            const nameNumbersDetails = calculateNameNumbersDetailed(userData.firstName + userData.lastName);
            
            const personalYear = calculatePersonalYear(userData.birthDate);
            const axes = getProfessionalAxes(lifePath, nameNumbers.expression);

            // Extended data
            const inclusionGrid = calculateInclusionGrid(userData.firstName + userData.lastName);
            const { missing, excess } = analyzeInclusion(inclusionGrid);
            const subconsciousSelf = calculateSubconsciousSelf(inclusionGrid);
            const bridgeNumber = calculateBridge(lifePath, nameNumbers.expression);
            const challenges = calculateChallenges(userData.birthDate);
            const deepChallenges = calculateDeepChallenges(userData.birthDate);
            const birthPlaceVibration = calculatePlaceVibration(userData.birthPlace || "");
            const careerForecast = generateCareerForecast(userData.birthDate, 2026);
            const cycles = calculateCycles(userData.birthDate);
            
            const advancedProfile = getAdvancedProfile(lifePath, userData.birthDate);
            
            const transits = calculateTransits(userData.firstName, userData.lastName, userData.birthDate);
            const planesOfExpression = calculatePlanesOfExpression(userData.firstName + userData.lastName);

            // Temporal Synthesis
            const now = new Date();
            const currentMonth = now.getMonth() + 1;
            const currentDay = now.getDate();
            const personalMonth = calculatePersonalMonth(personalYear, currentMonth);
            const personalDay = calculatePersonalDay(personalMonth, currentDay);
            const astroTransits = calculerTransitsAstro(now);

            results = {
               lifePath,
               ...nameNumbers,
               personalYear,
               details: {
                 lifePath: lifePathDetails,
                 expression: nameNumbersDetails.expression,
                 soulUrge: nameNumbersDetails.soulUrge,
                 personality: nameNumbersDetails.personality
               },
               professionalAxes: axes,
               inclusionGrid,
               missingNumbers: missing,
               excessNumbers: excess,
               subconsciousSelf,
               bridgeNumber,
               challenges: {
                 minor1: challenges.challenge1,
                 minor2: challenges.challenge2,
                 major: challenges.challengeMajor,
                 major2: challenges.challenge4
               },
               cycles: {
                  cycle1: cycles.cycle1,
                  cycle2: cycles.cycle2,
                  cycle3: cycles.cycle3,
                  cycle4: cycles.cycle4
                },
               deepChallenges,
               astroResonance: {
                 birthPlaceVibration
               },
               careerForecast,
               advancedProfile,
               transits,
               planesOfExpression,
               previsions: {
                  personalMonth,
                  personalDay,
                  astroTransits
               }
            };
          }

          // Real Astro (Check if missing)
          if (!results.realAstro && userData.birthPlace) {
             try {
                const geoRes = await fetch(`/api/geocode?city=${encodeURIComponent(userData.birthPlace)}`);
                const geoData = await geoRes.json();
                if (geoData.lat && geoData.lng) {
                   results.realAstro = calculerThemeAstral(userData.birthDate, undefined, geoData.lat, geoData.lng);
                }
             } catch (err) {
                console.error("Geocoding failed for PDF", err);
             }
          }

          setData({
            userData,
            results,
            etymology,
            psyResult
          });
        } catch (e) {
          console.error("Invalid data", e);
        }
      }
    };

    initData();
  }, [searchParams]);

  useEffect(() => {
    if (data) {
      window.scrollTo(0, 0);
    }
  }, [data]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-white p-12 rounded-[40px] shadow-xl border border-stone-200 max-w-lg space-y-6">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-800">{error}</h2>
          <p className="text-stone-500 leading-relaxed">
            Si vous avez déjà payé, il est possible que la synchronisation prenne quelques secondes. 
            Essayez de rafraîchir la page dans un instant.
          </p>
          <div className="pt-6">
            <button 
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-[#1A1C2E] text-white rounded-full font-bold hover:bg-[#C9A24D] transition-colors"
            >
              Rafraîchir la page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return <div className="p-12 text-center text-stone-500">Chargement de l'étude...</div>;

  return (
    <>
      {data.psyResult ? (
        <UnifiedMiroirReport 
          psyResult={data.psyResult}
          userData={data.userData}
          numerologyResult={data.results}
          etymology={data.etymology}
        />
      ) : (
        <FullReportV3 
          userData={data.userData} 
          results={data.results} 
          etymology={data.etymology} 
        />
      )}
      <BookCreationModal 
        isOpen={showBookModal} 
        onClose={() => setShowBookModal(false)} 
        userData={data.userData}
        reportResults={data.results}
      />
    </>
  );
}

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrintContent />
    </Suspense>
  );
}
