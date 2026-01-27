
/**
 * Goracash API Service
 * Handles OAuth2 authentication and fetching data from Goracash/Wengo API
 */

const GORACASH_AUTH_URL = "https://api.goracash.com/auth/token";
const GORACASH_API_BASE = "https://api.goracash.com/v1";
const DEFAULT_WENGO_URL = "https://www.wengo.fr/voyance-astrologie-1270/thema/specialite-numerologie";
const FALLBACK_AFFILIATE_URL = "https://www.news-voyance.com/fr_FR/experts/numerologie";

// Votre ID Tracker Goracash
const TRACKER_ID = "6289"; 

interface GoracashToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface GoracashExpert {
  id: string;
  name: string;
  photo_url: string;
  rating: number;
  review_count: number;
  specialties: string[];
  price_per_min: number;
  is_online: boolean;
  call_url: string;
}

/**
 * Construit l'URL d'affiliation avec le tracker ID.
 * Gère les URLs absolues, relatives et les fallbacks.
 */
function buildAffiliateUrl(originalUrl?: string): string {
  let baseUrl = originalUrl;
  
  if (!baseUrl || baseUrl === "" || baseUrl === "#") {
    baseUrl = FALLBACK_AFFILIATE_URL;
  }

  // Si l'URL est relative (commence par /), on la préfixe par le domaine du white-label
  // pour rester dans l'écosystème du tracker de l'utilisateur
  if (baseUrl.startsWith('/')) {
    baseUrl = `https://www.news-voyance.com${baseUrl}`;
  }

  if (!TRACKER_ID) return baseUrl;
  
  const paramName = 'idw';
  
  try {
    const url = new URL(baseUrl);
    url.searchParams.set(paramName, TRACKER_ID);
    
    // Si on est sur la racine, on s'assure d'avoir la thématique numérologie (1270 ou 338 selon le site)
    if (url.pathname === '/' || url.pathname === '/fr_FR/') {
      // Sur news-voyance, le lien fourni par l'utilisateur utilisait 338
      // On va essayer d'utiliser 1270 qui est le standard Wengo pour la numérologie
      url.searchParams.set('thematic', '1270');
    }
    
    return url.toString();
  } catch (e) {
    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${paramName}=${TRACKER_ID}`;
  }
}

let cachedToken: { token: string; expiry: number } | null = null;

async function getAccessToken(): Promise<string> {
  const clientId = process.env.GORACASH_CLIENT_ID;
  const clientSecret = process.env.GORACASH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Goracash credentials not found in environment variables.");
  }

  // Check cache
  if (cachedToken && cachedToken.expiry > Date.now()) {
    return cachedToken.token;
  }

  try {
    const response = await fetch(GORACASH_AUTH_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Goracash Auth Error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data: GoracashToken = await response.json();
    
    // Cache token (subtract 60s for safety)
    cachedToken = {
      token: data.access_token,
      expiry: Date.now() + (data.expires_in - 60) * 1000,
    };

    return data.access_token;
  } catch (error) {
    console.error("Failed to get Goracash access token:", error);
    throw error;
  }
}

export async function getExperts(limit: number = 6): Promise<GoracashExpert[]> {
  try {
    const token = await getAccessToken();
    
    // Note: Use thematic 1270 or 'NUMERO' for Numerology
    const response = await fetch(`${GORACASH_API_BASE}/experts?limit=${limit}&thematic=1270`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Goracash API Error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the API response to our internal GoracashExpert interface
    return (data.experts || []).map((expert: any) => ({
      id: expert.id,
      name: expert.display_name || expert.name,
      photo_url: expert.photo || expert.image_url,
      rating: expert.rating || 5,
      review_count: expert.reviews_count || 0,
      specialties: expert.specialties || ["Astrologie", "Numérologie"],
      price_per_min: expert.price || 0,
      is_online: expert.status === "online" || expert.is_available,
      call_url: buildAffiliateUrl(expert.url || expert.booking_url),
    }));
  } catch (error) {
    console.error("Error fetching experts from Goracash:", error);
    // Return empty array if API fails
    return [];
  }
}
