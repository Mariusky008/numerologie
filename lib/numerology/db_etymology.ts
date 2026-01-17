import { supabase } from '../supabase';

export interface NameData {
  origin: string;
  meaning: string;
  spiritual: string;
}

export async function fetchNameAnalysis(name: string): Promise<NameData | null> {
  try {
    // 1. Try exact match first
    let { data, error } = await supabase
      .from('prenoms')
      .select('origin, meaning, spiritual')
      .ilike('name', name)
      .limit(1)
      .single();

    if (data) return data;

    // 2. Try text search if exact match fails
    if (!data) {
      const { data: searchData } = await supabase
        .from('prenoms')
        .select('origin, meaning, spiritual')
        .textSearch('search_vector', name)
        .limit(1);
      
      if (searchData && searchData.length > 0) {
        return searchData[0];
      }
    }

    return null;
  } catch (err) {
    console.error("Error fetching name:", err);
    return null;
  }
}