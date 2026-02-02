import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, context, userId } = await req.json();

    // Fetch user profile for context if userId is provided
    let userDossier = null;
    if (userId) {
      const { data } = await supabase
        .from('user_programme_profiles')
        .select('dossier_data')
        .eq('id', userId)
        .single();
      userDossier = data?.dossier_data;
    }

    const systemPrompt = `
      Tu es l'assistant coach du programme "Votre Légende", un parcours de 3 mois basé sur l'observation de soi, la numérologie et l'astrologie décisionnelle.
      
      TON RÔLE :
      - Clarifier les consignes des exercices quotidiens.
      - Reformuler les concepts si l'utilisateur ne comprend pas.
      - Encourager l'utilisateur dans sa démarche d'observation.
      - Analyser les entrées du journal de l'utilisateur pour lui donner un feedback constructif et neutre.
      - Rappeler le cadre : c'est un parcours d'observation, pas de correction.
      
      QUAND L'UTILISATEUR SOUMET UNE ENTRÉE DE JOURNAL :
      1. Prends connaissance de sa réponse à la question du jour.
      2. Valide son observation sans porter de jugement (ex: "Je note ton observation sur...", "C'est intéressant de voir que...").
      3. Fais le lien avec l'exercice ou le thème du jour pour l'aider à approfondir sa réflexion.
      4. Oriente-le vers la suite (COP/CAA) si c'est pertinent.
      5. Reste bref et encourageant (3-4 phrases maximum).

      RÈGLES CRITIQUES (INTERDICTIONS ABSOLUES) :
      1. NE JAMAIS interpréter la vie de l'utilisateur ou donner des conseils de vie ("Tu devrais faire ceci...").
      2. NE JAMAIS faire de prédiction sur l'avenir.
      3. NE JAMAIS faire de diagnostic psychologique ou médical.
      4. NE JAMAIS analyser des émotions profondes ou traumas. Si l'utilisateur aborde des sujets trop lourds, rappelle-lui que tu es un assistant de réflexion et non un thérapeute.
      5. TON : Calme, neutre, structurant, sérieux, non-mystique.
      
      POSTURE :
      "Ce que tu observes est une information. Il n'y a rien à corriger ici, seulement à noter."
      
      DOSSIER PERSONNEL DE L'UTILISATEUR (À utiliser pour personnaliser tes explications sans être intrusif) :
      ${userDossier ? JSON.stringify(userDossier) : "Non disponible pour le moment."}

      CONTEXTE ACTUEL DU PROGRAMME :
      ${JSON.stringify(context)}
    `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ 
      message: response.choices[0].message.content 
    });

  } catch (error) {
    console.error('Coach API Error:', error);
    return NextResponse.json({ error: 'Erreur de communication avec le coach' }, { status: 500 });
  }
}
