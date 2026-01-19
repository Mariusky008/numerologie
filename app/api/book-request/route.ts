import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { 
  calculateLifePath, calculateLifePathDetailed, calculateNameNumbers, 
  calculateNameNumbersDetailed, calculatePersonalYear, getProfessionalAxes,
  calculateInclusionGrid, analyzeInclusion, calculateSubconsciousSelf,
  calculateBridge, calculateChallenges, calculateDeepChallenges,
  calculatePlaceVibration, generateCareerForecast, calculateCycles,
  getAdvancedProfile, calculateTransits, calculatePlanesOfExpression,
  calculatePersonalMonth, calculatePersonalDay
} from '@/lib/numerology/engine';
import { calculerTransits as calculerTransitsAstro } from '@/lib/astro/engine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { userData, reportResults, lifeDetails, orderInfo } = body;

    // If reportResults is missing (from Checkout), calculate it
    if (!reportResults && userData) {
      try {
        const lifePath = calculateLifePath(userData.birthDate);
        const lifePathDetails = calculateLifePathDetailed(userData.birthDate);
        
        const fullName = (userData.firstName || '') + (userData.lastName || '');
        const nameNumbers = calculateNameNumbers(fullName);
        const nameNumbersDetails = calculateNameNumbersDetailed(fullName);
        
        const personalYear = calculatePersonalYear(userData.birthDate);
        const axes = getProfessionalAxes(lifePath, nameNumbers.expression);

        const inclusionGrid = calculateInclusionGrid(fullName);
        const { missing, excess } = analyzeInclusion(inclusionGrid);
        const subconsciousSelf = calculateSubconsciousSelf(inclusionGrid);
        const bridgeNumber = calculateBridge(lifePath, nameNumbers.expression);
        const challenges = calculateChallenges(userData.birthDate);
        const deepChallenges = calculateDeepChallenges(userData.birthDate);
        const birthPlaceVibration = calculatePlaceVibration(userData.birthPlace || "");
        const careerForecast = generateCareerForecast(userData.birthDate, new Date().getFullYear());
        const cycles = calculateCycles(userData.birthDate);
        
        const advancedProfile = getAdvancedProfile(lifePath, userData.birthDate);
        const transits = calculateTransits(userData.firstName || '', userData.lastName || '', userData.birthDate);
        const planesOfExpression = calculatePlanesOfExpression(fullName);

        const now = new Date();
        const personalMonth = calculatePersonalMonth(personalYear, now.getMonth() + 1);
        const personalDay = calculatePersonalDay(personalMonth, now.getDate());
        const astroTransits = calculerTransitsAstro(now);

        reportResults = {
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

        // Initialize lifeDetails if missing
        if (!lifeDetails) {
          lifeDetails = {
            placesLived: '', moves: '', relationships: '', majorEvents: '',
            childhoodMemories: '', passions: '', fears: '', dreams: '',
            mentors: '', dailyRituals: '', otherNotes: ''
          };
        }
      } catch (e) {
        console.error("Calculation error in API:", e);
        // Continue with partial data if calculation fails
      }
    }

    // Merge orderInfo into user_data for persistence without migration
    const enrichedUserData = {
      ...userData,
      ...orderInfo // contains plan, price, paper options, etc.
    };

    const { data, error } = await supabase
      .from('book_requests')
      .insert([
        {
          user_data: enrichedUserData,
          numerology_result: { reportResults, lifeDetails },
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ success: true, id: data[0].id });
  } catch (error) {
    console.error('Error processing book request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('book_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
     console.error('Error fetching requests:', error);
     return NextResponse.json([]);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const { data, error } = await supabase
      .from('book_requests')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const { error } = await supabase
      .from('book_requests')
      .delete()
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
