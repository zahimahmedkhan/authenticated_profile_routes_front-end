import { NextResponse } from 'next/server'


export function middleware(request) {
  const token = request.cookies.get('token')?.value

  const isProtectedRoute = request.nextUrl.pathname.startsWith('/user')

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user'],
}
