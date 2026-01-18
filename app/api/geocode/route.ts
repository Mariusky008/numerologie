import { NextResponse } from 'next/server';

const OPENCAGE_API_KEY = "5233436f7a4e4e5a85168b3b569db2e4";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: "City is required" }, { status: 400 });
  }

  try {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(city)}&key=${OPENCAGE_API_KEY}&language=fr&limit=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const result = data.results[0];
      return NextResponse.json({
        lat: result.geometry.lat,
        lng: result.geometry.lng,
        formatted: result.formatted
      });
    } else {
      return NextResponse.json({ error: "City not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
