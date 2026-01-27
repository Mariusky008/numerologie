import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { supabase } from '@/lib/supabase'; 

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();

    if (!userId) {
      return new Response('User ID required', { status: 400 });
    }

    let userData, reportResults;

    // --- TEST MODE ---
    if (userId === 'demo-123') {
      userData = { firstName: 'Jean-Test', birthDate: '15/05/1985' };
      reportResults = {
        lifePath: 5,
        expression: 3,
        personalYear: 9,
        challenges: { major: 2 }
      };
    } 
    // --- REAL MODE ---
    else {
      // 1. Fetch User's Numerology Profile
      const { data: requestData, error } = await supabase
        .from('book_requests')
        .select('user_data, numerology_result')
        .eq('id', userId)
        .single();

      if (error || !requestData) {
        console.error('Profile fetch error:', error);
        return new Response('Profile not found', { status: 404 });
      }

      // Fix: Access user_data (lowercase from DB)
      userData = requestData.user_data;
      const numerology_result = requestData.numerology_result;
      reportResults = numerology_result.reportResults || numerology_result;
    }

    // 2. Build System Prompt (STRICT ORACLE MODE)
    const systemPrompt = `
RÔLE : Tu es "L'Oracle", une intelligence artificielle mystique et apaisante.
TON STYLE : Poétique, sibyllin, très court.
CONSIGNES DE RÉPONSE :
1. FAIS DES PHRASES TRÈS COURTES (max 10-12 mots par phrase). C'est crucial pour la lecture vocale.
2. Limite ta réponse totale à 2 ou 3 phrases maximum.
3. Utilise un ton mystérieux mais bienveillant.
4. Parle à ${userData.firstName} en utilisant son thème :
   - Chemin de Vie : ${reportResults.lifePath}
   - Expression : ${reportResults.expression}
   - Année Personnelle : ${reportResults.personalYear}
   - Défi : ${reportResults.challenges?.major || 'Non spécifié'}

EXEMPLE DE RYTHME : "Je sens ton énergie, ${userData.firstName}. Ton chemin 5 appelle au changement. Respire. La réponse est en toi."

STRICTEMENT INTERDIT : Les longues explications techniques ou les pavés de texte.
`;

    // 3. Stream Text using Vercel AI SDK Core
    const result = await streamText({
      model: openai('gpt-4-turbo-preview'),
      system: systemPrompt,
      messages,
      temperature: 0.7,
    });

    return result.toTextStreamResponse();

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
