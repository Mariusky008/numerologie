import { NextResponse } from 'next/server';

export async function POST() {
  const HEYGEN_API_KEY = process.env.HEYGEN_API_KEY;

  if (!HEYGEN_API_KEY) {
    return NextResponse.json({ error: 'API Key missing' }, { status: 500 });
  }

  try {
    const response = await fetch('https://api.heygen.com/v1/streaming.create_token', {
      method: 'POST',
      headers: {
        'x-api-key': HEYGEN_API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create token');
    }

    return NextResponse.json(data.data); // Returns { token: "..." }
  } catch (error) {
    console.error('Error creating HeyGen token:', error);
    return NextResponse.json({ error: 'Failed to create token' }, { status: 500 });
  }
}
