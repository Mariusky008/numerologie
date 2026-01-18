import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_stats')
      .select('*');

    if (error) throw error;

    // Convert array to object for easier consumption
    // [{event_name: 'home_view', count: 10}, ...] -> {home_view: 10, ...}
    const stats = data.reduce((acc: any, curr: any) => {
      acc[curr.event_name] = curr.count;
      return acc;
    }, {});

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { event } = await request.json();

    if (!event) {
      return NextResponse.json({ error: 'Event name is required' }, { status: 400 });
    }

    // Call RPC function to increment atomically if possible, or simple update
    // For simplicity, we'll try to use a stored procedure 'increment_stat' if it exists,
    // otherwise we do a read-write cycle (less safe for high concurrency but okay for MVP)
    
    // Better: upsert with increment logic if Supabase supports it easily via client.
    // Since simple increment isn't native in one JS call without RPC:
    
    // 1. Try RPC (Best Practice)
    const { error: rpcError } = await supabase.rpc('increment_stat', { event_name_input: event });

    if (rpcError) {
      // Fallback: If RPC doesn't exist, try simple Upsert (might have race conditions)
      // First get current
      const { data: current } = await supabase
        .from('site_stats')
        .select('count')
        .eq('event_name', event)
        .single();
      
      const newCount = (current?.count || 0) + 1;
      
      const { error: upsertError } = await supabase
        .from('site_stats')
        .upsert({ event_name: event, count: newCount });

      if (upsertError) throw upsertError;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating stat:', error);
    return NextResponse.json({ error: 'Failed to update stat' }, { status: 500 });
  }
}
