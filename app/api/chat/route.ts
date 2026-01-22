import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge'; // Use Edge Runtime for better streaming performance

export async function POST(req: Request) {
  try {
    const { messages, userId } = await req.json();

    if (!userId) {
      return new Response('User ID required', { status: 400 });
    }

    // 1. Fetch User's Numerology Profile from Supabase
    // We need to give the AI context about who it's talking to
    const { data: requestData, error } = await supabase
      .from('book_requests')
      .select('user_data, numerology_result, life_details') // Assuming life_details is stored or part of result
      .eq('id', userId) // userId here is actually the request ID from the URL or session
      .single();

    if (error || !requestData) {
      console.error('Profile fetch error:', error);
      return new Response('Profile not found', { status: 404 });
    }

    const { userData, numerology_result } = requestData;
    const reportResults = numerology_result.reportResults || numerology_result; // Handle structure variation

    // 2. Build System Prompt with Context
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
- Ne sois pas trop long (max 3-4 phrases par réponse) pour garder la conversation fluide, sauf si on te demande une explication détaillée.
- Si la question sort de la numérologie/dev perso, ramène gentiment le sujet vers ton expertise ou décline poliment.
- Tu as une mémoire de la conversation en cours.

Réponds directement à ${userData.firstName} maintenant.
`;

    // 3. Call OpenAI
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview', // Smartest model for coaching
      stream: true,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
    });

    // 4. Return Stream
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
