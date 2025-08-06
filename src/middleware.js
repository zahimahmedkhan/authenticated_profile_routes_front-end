import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname.startsWith('/auth');
  const isProtectedRoute = pathname.startsWith('/profile');

  // If user is already logged in and tries to access login/signup, redirect to /profile
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  // If user is not logged in and tries to access protected route, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// Match all auth and profile routes (including nested)
export const config = {
  matcher: ['/auth/:path*', '/profile/:path*'],
};
