import { supabase } from '../supabase';

export interface NameData {
  origin: string;
  meaning: string;
  spiritual: string;
}

export async function fetchNameAnalysis(name: string): Promise<NameData | null> {
  try {
    // Call our internal API route instead of Supabase directly
    const res = await fetch(`/api/prenoms?name=${encodeURIComponent(name)}`);
    
    if (!res.ok) {
      // If 404 or other error, return null gracefully
      return null;
    }

    const data = await res.json();
    return data; // Returns NameData or null
  } catch (err) {
    console.error("Error fetching name:", err);
    return null;
  }
}