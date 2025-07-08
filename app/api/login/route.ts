import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Proxying login request:', body);
    const response = await fetch('https://jyhcs69hk7.execute-api.us-east-1.amazonaws.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log('Login API response:', result);
    if (!response.ok) {
      return NextResponse.json(
        { error: result.message || 'Login failed' },
        { status: response.status }
      );
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error('Login proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 