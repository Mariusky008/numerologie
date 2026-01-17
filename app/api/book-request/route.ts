import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userData, reportResults, lifeDetails } = body;

    const { data, error } = await supabase
      .from('book_requests')
      .insert([
        {
          user_data: userData,
          numerology_result: { reportResults, lifeDetails },
          status: 'pending'
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ success: true, id: data[0].id });
  } catch (error) {
    console.error('Error processing book request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('book_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
     console.error('Error fetching requests:', error);
     return NextResponse.json([]);
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const { data, error } = await supabase
      .from('book_requests')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error updating request:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
