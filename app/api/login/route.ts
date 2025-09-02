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
    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      // If response is not JSON, get it as text
      const textResult = await response.text();
      console.log('Login API response (text):', textResult);
      if (!response.ok) {
        return NextResponse.json(
          { error: textResult || 'Login failed' },
          { status: response.status }
        );
      }
      return NextResponse.json({ message: textResult });
    }
    
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