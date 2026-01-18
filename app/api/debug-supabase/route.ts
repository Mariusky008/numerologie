import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  const diagnostics: any = {
    env_check: {
      url_start: url.substring(0, 15) + '...',
      key_start: key.substring(0, 10) + '...',
      key_end: '...' + key.substring(key.length - 10),
      key_length: key.length
    },
    tests: []
  };

  // Test 1: Simple Select
  try {
    const { data, error } = await supabase.from('site_stats').select('count').limit(1);
    diagnostics.tests.push({
      name: 'Select Table',
      success: !error,
      error: error,
      data_sample: data
    });
  } catch (e) {
    diagnostics.tests.push({ name: 'Select Table', success: false, error: e });
  }

  // Test 2: RPC Call
  try {
    const { error } = await supabase.rpc('increment_stat', { event_name_input: 'debug_test' });
    diagnostics.tests.push({
      name: 'RPC Execution',
      success: !error,
      error: error
    });
  } catch (e) {
    diagnostics.tests.push({ name: 'RPC Execution', success: false, error: e });
  }

  // Test 3: Manual Upsert
  try {
    const { error } = await supabase.from('site_stats').upsert({ event_name: 'debug_manual', count: 1 });
    diagnostics.tests.push({
      name: 'Manual Upsert',
      success: !error,
      error: error
    });
  } catch (e) {
    diagnostics.tests.push({ name: 'Manual Upsert', success: false, error: e });
  }

  return NextResponse.json(diagnostics, { status: 200 });
}