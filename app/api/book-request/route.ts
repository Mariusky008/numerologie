import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceRoleKey) {
  console.error("ERREUR CRITIQUE : SUPABASE_SERVICE_ROLE_KEY manquante ! Impossible de sauvegarder les commandes.");
}

// Initialize Supabase with Service Role Key to bypass RLS for inserts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  serviceRoleKey || '' // Fallback to empty string to avoid immediate crash, but auth will fail
);

export const dynamic = 'force-dynamic';

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

function formatError(error: unknown) {
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error, null, 2);
  } catch (e) {
    return String(error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let { userData, reportResults, lifeDetails, orderInfo, psyResult, orderId } = body;

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
      ...orderInfo, // contains plan, price, paper options, etc.
      orderId // Save the ID generated by Frontend
    };

    const { data, error } = await supabase
      .from('book_requests')
      .insert([
        {
          user_data: enrichedUserData,
          numerology_result: { reportResults, lifeDetails, psyResult },
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
      { error: 'Internal Server Error', details: formatError(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  let id: string | null = null;
  try {
    const { searchParams } = new URL(request.url);
    id = searchParams.get('id');
    const password = searchParams.get('password');

    // 🔍 DEBUG LOG: Check auth params
    console.log(`[API] Fetching requests. ID: ${id}, Password provided: ${!!password}`);

    // If fetching all, require admin password
    if (!id) {
       if (password !== process.env.ADMIN_PASSWORD && password !== 'oracle2024') {
         console.warn("[API] Unauthorized access attempt - Invalid password");
         return NextResponse.json([]);
       }
    }

    // Check environment variable
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("[API] CRITICAL: SUPABASE_SERVICE_ROLE_KEY is missing.");
        return NextResponse.json(
          { error: 'Configuration Error', details: 'SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables.' },
          { status: 500 }
        );
    }

    if (id) {
      const { data, error } = await supabase
        .from('book_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return NextResponse.json(data);
    }

    // 🔍 DEBUG LOG: Before Supabase Query
    console.log("[API] Querying Supabase for all book_requests...");
    
    // Add count: 'exact' to debug the total rows in DB
    const { data, error, count } = await supabase
      .from('book_requests')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (error) {
      // 🚨 CRITICAL LOG: This will show if the Key is invalid or Table is missing
      console.error("[API] SUPABASE ERROR:", error); 
      throw error;
    }

    // 🔍 DEBUG LOG: Success
    console.log(`[API] Success! Found ${data?.length} rows. Total count in DB: ${count}`);

    return NextResponse.json(data);

  } catch (error) {
     console.error('[API] CRITICAL ERROR fetching requests:', error);
     // Return 500 so the frontend knows something went wrong instead of thinking it's empty
     return NextResponse.json(
       { error: 'Internal Server Error', details: formatError(error) }, 
       { status: 500 }
     );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, password } = body;

    if (password !== process.env.ADMIN_PASSWORD && password !== 'oracle2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('book_requests')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: formatError(error) },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const bulk = searchParams.get('bulk');
    const password = searchParams.get('password');

    // Security check for admin operations
    if (bulk === 'true' || !id) {
       if (password !== process.env.ADMIN_PASSWORD && password !== 'oracle2024') {
         return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
       }
    }

    if (bulk === 'true') {
      // Delete all requests
      const { error } = await supabase
        .from('book_requests')
        .delete()
        .neq('status', 'non-existent-status'); // Delete all
      
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'All requests deleted' });
    }

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const { error } = await supabase
      .from('book_requests')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: formatError(error) },
      { status: 500 }
    );
  }
}
