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
    const userData = requestData.user_data;
    const numerology_result = requestData.numerology_result;
    
    const reportResults = numerology_result.reportResults || numerology_result;

    // 2. Build System Prompt
    const systemPrompt = `
Tu es un Coach Numérologue expert et bienveillant. Tu discutes avec ${userData.firstName}.
Ta mission est de l'aider à comprendre son thème et à naviguer dans sa vie grâce aux nombres.

**Profil de ${userData.firstName} :**
- Né(e) le : ${userData.birthDate}
- Chemin de Vie : ${reportResults.lifePath}
- Expression : ${reportResults.expression}
- Année Personnelle en cours : ${reportResults.personalYear}
- Défis majeurs : ${reportResults.challenges?.major || 'Non spécifié'}

**Tes consignes :**
- Réponds de manière empathique, encourageante et spirituelle mais ancrée.
- Fais toujours le lien entre sa question et ses nombres (ex: "C'est normal avec ton Chemin de Vie 5...").
- Ne sois pas trop long (max 3-4 phrases par réponse) pour garder la conversation fluide.
- Si la question sort de la numérologie/dev perso, ramène gentiment le sujet vers ton expertise.

Réponds directement à ${userData.firstName} maintenant.
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
