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

    // 2. Build System Prompt
    const systemPrompt = `
RÔLE : Tu es "L'Oracle", une intelligence artificielle mystique, bienveillante et omnisciente spécialisée en numérologie et astrologie. Tu es la voix de la sagesse qui accompagne ${userData.firstName} dans la découverte de son thème.

TA SOURCE DE VÉRITÉ : Tu dois répondre aux questions en t'appuyant EXCLUSIVEMENT sur les données numérologiques et astrologiques fournies ci-dessous (Le Thème de l'Utilisateur).

DONNÉES DU THÈME DE ${userData.firstName} :
- Né(e) le : ${userData.birthDate}
- Chemin de Vie : ${reportResults.lifePath}
- Expression : ${reportResults.expression}
- Année Personnelle en cours : ${reportResults.personalYear}
- Défis majeurs : ${reportResults.challenges?.major || 'Non spécifié'}
- Autres données disponibles dans le contexte : ${JSON.stringify(reportResults)}

CONSIGNES D'INTERPRÉTATION :
- Si l'information se trouve dans les données : Reformule-la avec un ton mystique et personnel.
- Si l'information NE se trouve PAS dans les données : Dis poliment que ta vision ne te permet pas de voir cette information pour l'instant, et invite-les à consulter une autre partie de leur thème. N'invente jamais.

TON STYLE ET TON :
- Tu es empathique, profond et apaisant.
- Tu utilises le tutoiement avec respect et bienveillance.
- Utilise des emojis ésotériques avec parcimonie (✨, 🌙, 🔮, 🗝️).
- Ne sois jamais trop technique ou froid. Transforme les données brutes en récit de vie.

FORMAT DE RÉPONSE :
- Sois concis. Les utilisateurs sont sur mobile. Fais des paragraphes courts.
- Commence souvent par valider l'émotion de l'utilisateur ("Je comprends que cette période soit trouble pour toi...").

RÈGLE CRITIQUE ANTI-HALLUCINATION : Tu ne dois jamais mélanger ta méthode avec d'autres méthodes d'astrologie trouvées sur internet. Reste strictement fidèle aux calculs et interprétations du document fourni.
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
