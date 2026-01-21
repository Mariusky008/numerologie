import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { generateScriptFromReport } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, requestData } = body; // requestData contains the full BookRequest object

    if (!id || !requestData) {
      return NextResponse.json({ error: 'Missing ID or Data' }, { status: 400 });
    }

    // 1. Generate Script via OpenAI
    const script = await generateScriptFromReport(requestData);

    // 2. Save script to Supabase
    // Note: We assume the 'book_requests' table has a 'generated_script' column or we store it in metadata
    // Since we can't easily alter table schema from here, we'll try to update a specific column 
    // or use the 'user_data' jsonb column to store it temporarily if the column doesn't exist.
    // Ideally, you should run a SQL migration: ALTER TABLE book_requests ADD COLUMN generated_script TEXT;
    
    // For now, let's try to update a hypothetical 'generated_script' column. 
    // If it fails, we might need to store it in 'numerology_result' or 'user_data'.
    
    const { error } = await supabase
      .from('book_requests')
      .update({ 
        generated_script: script,
        status: 'script_generated' // Optional: update status
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase Error:', error);
      // Fallback: Try storing in user_data if column missing
      const { error: fallbackError } = await supabase
        .from('book_requests')
        .update({ 
          user_data: { ...requestData.userData, generated_script: script }
        })
        .eq('id', id);
        
      if (fallbackError) throw fallbackError;
    }

    return NextResponse.json({ success: true, script });

  } catch (error) {
    console.error('Generate Script Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
