
/**
 * Goracash API Service
 * Handles OAuth2 authentication and fetching data from Goracash/Wengo API
 */

const GORACASH_AUTH_URL = "https://api.goracash.com/auth/token";
const GORACASH_API_BASE = "https://api.goracash.com/v1";

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
    
    // Note: The exact endpoint and parameters may vary based on Goracash API version
    // This is a standard implementation for Wengo/Goracash Experts API
    const response = await fetch(`${GORACASH_API_BASE}/experts?limit=${limit}&thematic=ASTRO`, {
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
    // Note: Adjust the mapping based on the actual API response structure
    return (data.experts || []).map((expert: any) => ({
      id: expert.id,
      name: expert.display_name || expert.name,
      photo_url: expert.photo || expert.image_url,
      rating: expert.rating || 5,
      review_count: expert.reviews_count || 0,
      specialties: expert.specialties || ["Astrologie", "Numérologie"],
      price_per_min: expert.price || 0,
      is_online: expert.status === "online" || expert.is_available,
      call_url: expert.url || expert.booking_url,
    }));
  } catch (error) {
    console.error("Error fetching experts from Goracash:", error);
    // Return mock data for development if API fails, or empty array
    return [];
  }
}
