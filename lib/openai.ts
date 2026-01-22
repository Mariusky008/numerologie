import OpenAI from 'openai';
import { BookRequest } from '@/app/admin/page';

export async function generateScriptFromReport(request: BookRequest): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  console.log("Debug OpenAI: Checking API Key...");
  if (!apiKey) {
    console.error("OPENAI_API_KEY is missing from process.env");
    throw new Error("La clé API OpenAI n'est pas configurée côté serveur.");
  }
  console.log("Debug OpenAI: API Key found (starts with " + apiKey.substring(0, 7) + ")");

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const { userData, reportResults, lifeDetails } = request;

  const systemPrompt = `
Tu es un expert en numérologie et un orateur bienveillant. Ta mission est de rédiger un script vidéo TRÈS DÉTAILLÉ de 5 minutes environ.

**OBJECTIF DE LONGUEUR :**
- Le texte actuel est trop court. Tu dois impérativement développer chaque idée.
- Vise environ **800 à 1000 mots**.
- CONTRAINTE TECHNIQUE : Le texte final doit faire entre 3500 et 4800 caractères (espaces compris). Ne dépasse pas 4800.

**Instructions de Rédaction :**
- Ne fais pas de listes à puces. Rédige tout comme un discours fluide.
- Prends le temps de poser le décor, d'expliquer les nuances des nombres.
- Répète les concepts clés avec des reformulations pour bien ancrer le message.
- Fais des pauses narratives, pose des questions rhétoriques au client.
- Raconte une véritable histoire autour de sa vie.

**Structure du Script (à développer massivement) :**
1. **L'Introduction (1 min)** : Prends le temps d'accueillir Jean. Parle de la synchronicité de ce moment. Explique pourquoi la numérologie est une science ancienne et précise. Fais sentir que ce moment est solennel.
2. **L'Analyse Profonde (1 min 30)** : Ne dis pas juste "Vous êtes Chemin de Vie 5". Explique ce que cela signifie concrètement au quotidien, dans ses amours, son travail. Donne des exemples précis. Fais de même pour l'Expression. Tisse des liens entre les deux.
3. **Le Moment Présent (1 min)** : Analyse l'Année Personnelle avec finesse. Ce n'est pas juste "une année de changement". C'est une année où chaque mois compte. Donne des conseils pour les mois à venir.
4. **La Connexion Intime (1 min)** : Utilise les souvenirs et lieux fournis pour créer une résonance émotionnelle forte. Montre comment son passé (enfance, lieux) a sculpté l'adulte qu'il est, en lien avec ses nombres.
5. **Conclusion Inspirante (30s)** : Une ouverture vers le futur pleine d'espoir et de grandeur.

**Données du Client :**
- Prénom: ${userData.firstName}
- Date de Naissance: ${userData.birthDate}
- Chemin de Vie: ${reportResults.lifePath}
- Expression: ${reportResults.expression}
- Année Personnelle: ${reportResults.personalYear}
- Cycles: ${JSON.stringify(reportResults.cycles)}
- Défis: ${JSON.stringify(reportResults.challenges)}
- Thème du Livre souhaité: ${lifeDetails.bookTheme || 'Non spécifié'}
- Anecdote/Souvenir: ${lifeDetails.childhoodMemories || lifeDetails.bonusAnecdote || 'Non spécifié'}

**Consigne Importante :**
Ne mets pas de titres de section (comme "L'Accroche") dans le texte final. Écris le texte prêt à être lu, d'un seul bloc ou en paragraphes clairs.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview", // Ou gpt-3.5-turbo si budget limité, mais gpt-4 est meilleur pour la narration
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: "Rédige le script vidéo maintenant." }
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return response.choices[0].message.content || "Erreur lors de la génération du script.";
  } catch (error) {
    console.error("Erreur OpenAI:", error);
    throw new Error("Impossible de générer le script.");
  }
}
