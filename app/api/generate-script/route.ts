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
    // We store it in user_data to avoid schema migration issues
    const updatedUserData = {
      ...requestData.userData,
      generated_script: script
    };

    const { error } = await supabase
      .from('book_requests')
      .update({ 
        user_data: updatedUserData
        // We don't change the main status yet
      })
      .eq('id', id);

    if (error) {
      console.error('Supabase Error:', error);
      throw new Error(`Erreur Base de Données: ${error.message}`);
    }

    return NextResponse.json({ success: true, script });

  } catch (error: any) {
    console.error('Generate Script Error (Detailed):', error);
    
    // Check for OpenAI specific errors
    if (error?.response?.data?.error?.message) {
        return NextResponse.json({ 
            error: `OpenAI Error: ${error.response.data.error.message}` 
        }, { status: 500 });
    }

    return NextResponse.json({ 
      error: error.message || 'Unknown Error',
      details: error
    }, { status: 500 });
  }
}
