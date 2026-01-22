import OpenAI from 'openai';
import { BookRequest } from '@/app/admin/page';

export async function generateScriptFromReport(request: BookRequest): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error("OPENAI_API_KEY is missing");
    throw new Error("La clé API OpenAI n'est pas configurée.");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const { userData, reportResults, lifeDetails } = request;

  const systemPrompt = `
Tu es un expert en numérologie et un orateur bienveillant. Ta mission est de rédiger un script vidéo de 5 minutes environ.
**CONTRAINTE TECHNIQUE ABSOLUE :** Le texte doit faire MOINS de 4800 caractères (espaces compris) pour ne pas être rejeté par le système vidéo, mais il doit être suffisamment dense pour durer 5 minutes à l'oral (rythme posé).

**Ton et Style :**
- Bienveillant, mystérieux, inspirant et profondément personnel.
- Tu t'adresses directement à la personne ("Tu" ou "Vous" selon le prénom, privilégie le vouvoiement respectueux mais chaleureux).
- Utilise des phrases courtes, rythmées, adaptées à l'oral.
- Pas de jargon complexe sans explication simple.

**Structure du Script :**
1. **L'Accroche (0-30s)** : Connecte immédiatement avec le prénom et la date de naissance. Mentionne que ce n'est pas un hasard s'ils regardent cette vidéo.
2. **L'Essence (30s-1m30)** : Parle de leur Chemin de Vie et de leur Expression. Révèle leur "super-pouvoir" et leur défi majeur.
3. **Le Cycle Actuel (1m30-3m)** : Analyse leur Année Personnelle et les cycles en cours. Explique ce qu'ils traversent actuellement (les défis, les opportunités).
4. **La Révélation (3m-4m)** : Utilise les éléments biographiques (souvenirs, lieux, passions) pour montrer que tu les "connais". Fais le lien entre leur vécu et leurs nombres.
5. **La Conclusion (4m-5m)** : Ouvre sur l'avenir. Donne un conseil clé. Invite-les à découvrir leur livre complet pour aller plus loin.

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
