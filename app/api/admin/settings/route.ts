import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory storage for demo purposes
// In production, use a database or environment variables
let settingsStore = {
  pagespeedApiKey: '',
  bingSearchApiKey: '',
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: settingsStore,
    });
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pagespeedApiKey, bingSearchApiKey } = body;

    // Validate inputs
    if (pagespeedApiKey !== undefined) {
      settingsStore.pagespeedApiKey = pagespeedApiKey;
    }
    if (bingSearchApiKey !== undefined) {
      settingsStore.bingSearchApiKey = bingSearchApiKey;
    }

    return NextResponse.json({
      success: true,
      data: settingsStore,
    });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}