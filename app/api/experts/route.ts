
import { NextResponse } from 'next/server';
import { getExperts } from '@/lib/goracash';

export async function GET() {
  try {
    const experts = await getExperts(6);
    return NextResponse.json(experts);
  } catch (error) {
    console.error("API Route Error (Experts):", error);
    return NextResponse.json({ error: "Failed to fetch experts" }, { status: 500 });
  }
}
