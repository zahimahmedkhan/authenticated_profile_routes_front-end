import { NextResponse } from 'next/server';

export async function GET(request) {
  const cookies = request.cookies;
  
  return NextResponse.json({
    message: 'Cookie test',
    cookies: Object.fromEntries(cookies.entries()),
    hasToken: !!cookies.get('token'),
  });
}

export async function POST(request) {
  const body = await request.json();
  
  // Set a test cookie
  const response = NextResponse.json({ 
    message: 'Test cookie set',
    data: body 
  });
  
  response.cookies.set('test-cookie', 'test-value', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  
  return response;
} 