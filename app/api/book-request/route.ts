import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'book-requests.json');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userData, reportResults, lifeDetails } = body;

    const newRequest = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending', // pending, generating, completed
      userData,
      reportResults,
      lifeDetails
    };

    // Ensure data directory exists
    const dataDir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Read existing data
    let requests = [];
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      try {
        requests = JSON.parse(fileContent);
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    }

    // Add new request
    requests.push(newRequest);

    // Write back to file
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(requests, null, 2));

    return NextResponse.json({ success: true, id: newRequest.id });
  } catch (error) {
    console.error('Error processing book request:', error);
    // Return detailed error in development
    return NextResponse.json(
      { error: 'Internal Server Error', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(DATA_FILE_PATH)) {
      return NextResponse.json([]);
    }
    const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    const requests = JSON.parse(fileContent);
    return NextResponse.json(requests);
  } catch (error) {
     return NextResponse.json([]);
  }
}
