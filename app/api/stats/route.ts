import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_stats')
      .select('*');

    if (error) {
        console.error("Supabase site_stats GET Error:", error);
        // On renvoie l'erreur pour qu'elle soit visible dans la console Network
        return NextResponse.json({ error: error.message, details: error }, { status: 500 });
    }

    const stats = data ? data.reduce((acc: any, curr: any) => {
      acc[curr.event_name] = curr.count;
      return acc;
    }, {}) : {};

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error('Critical error in stats GET:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { event } = await request.json();
    console.log("Analytics POST received for event:", event);

    if (!event) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    // 1. Try RPC (Best Practice)
    const { error: rpcError } = await supabase.rpc('increment_stat', { event_name_input: event });

    if (rpcError) {
      console.error(`RPC 'increment_stat' failed for ${event}:`, rpcError);
      
      // Fallback: If RPC doesn't exist, try simple Upsert
      console.log(`Attempting manual upsert fallback for ${event}...`);
      
      const { data: current, error: fetchError } = await supabase
        .from('site_stats')
        .select('count')
        .eq('event_name', event)
        .maybeSingle();
      
      if (fetchError) {
        console.error(`Fallback Fetch Error for ${event}:`, fetchError);
      }

      const newCount = (current?.count || 0) + 1;
      
      const { error: upsertError } = await supabase
        .from('site_stats')
        .upsert({ event_name: event, count: newCount }, { onConflict: 'event_name' });

      if (upsertError) {
        console.error(`Fallback Upsert Error for ${event}:`, upsertError);
        return NextResponse.json({ error: 'Upsert failed', details: upsertError }, { status: 500 });
      }
      console.log(`Manual upsert success for ${event}. New count: ${newCount}`);
    } else {
      console.log(`RPC success for ${event}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Critical error in stats POST:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get('password');

    if (password !== process.env.ADMIN_PASSWORD && password !== 'oracle2024') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Reset all counts to 0
    const { error } = await supabase
      .from('site_stats')
      .update({ count: 0 })
      .neq('count', -1); // Dummy condition to update all rows

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error resetting stats:', error);
    return NextResponse.json({ error: 'Failed to reset stats' }, { status: 500 });
  }
}
