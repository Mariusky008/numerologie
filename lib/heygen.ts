const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

if (!HEYGEN_API_KEY) {
  console.warn("HEYGEN_API_KEY is missing from environment variables.");
}

// Configuration par défaut (Avatar et Voix)
// Ces IDs doivent être récupérés depuis votre compte HeyGen ou via l'API List Avatars
// ID Avatar par défaut (Femme élégante, ex: "Angela_in_Black_Skirt_Standing_20220926")
const DEFAULT_AVATAR_ID = "Angela_in_Black_Skirt_Standing_20220926"; 
// ID Voix par défaut (Femme, ex: "fr-FR-DeniseNeural")
const DEFAULT_VOICE_ID = "13500366a7074360aa62939d3752670a"; 

export async function generateHeyGenVideo(script: string, request_id: string) {
  try {
    const response = await fetch('https://api.heygen.com/v2/video/generate', {
      method: 'POST',
      headers: {
        'X-Api-Key': HEYGEN_API_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        video_inputs: [
          {
            character: {
              type: 'avatar',
              avatar_id: DEFAULT_AVATAR_ID,
              avatar_style: 'normal',
            },
            voice: {
              type: 'audio',
              voice_id: DEFAULT_VOICE_ID,
            },
            input_text: script,
          },
        ],
        dimension: {
          width: 1080,
          height: 1920, // Format Vertical (9:16) pour mobile
        },
        test: false, // Mettre à true pour tester sans consommer de crédits (vidéo filigranée)
        callback_id: request_id, // On passe l'ID de notre commande pour le webhook
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'HeyGen API Error');
    }

    return data.data.video_id; // Retourne l'ID de la vidéo en cours de génération

  } catch (error) {
    console.error('HeyGen Generation Error:', error);
    throw error;
  }
}

export async function checkVideoStatus(video_id: string) {
  try {
    const response = await fetch(`https://api.heygen.com/v1/video_status.get?video_id=${video_id}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': HEYGEN_API_KEY!,
      },
    });

    const data = await response.json();
    return data.data; // { status: 'completed', video_url: '...', ... }
  } catch (error) {
    console.error('HeyGen Status Error:', error);
    throw error;
  }
}
