import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize Supabase lazily to avoid build-time errors if env vars are missing
export async function GET(request: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase configuration');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
  
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Name required' }, { status: 400 });
  }

  try {
    // 1. Exact match
    let { data, error } = await supabaseAdmin
      .from('prenoms')
      .select('origin, meaning, spiritual')
      .ilike('name', name)
      .limit(1)
      .single();

    if (data) {
      return NextResponse.json(data);
    }

    // 2. Text Search Fallback
    const { data: searchData } = await supabaseAdmin
      .from('prenoms')
      .select('origin, meaning, spiritual')
      .textSearch('search_vector', name)
      .limit(1);
      
    if (searchData && searchData.length > 0) {
      return NextResponse.json(searchData[0]);
    }

    return NextResponse.json(null);
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
