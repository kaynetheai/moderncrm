import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const session = request.cookies.get('crm_session')
  const { pathname } = request.nextUrl

  const isAuthPage =
    pathname.startsWith('/login') || pathname.startsWith('/forgot-password')
  const isDashboardPage = pathname.startsWith('/dashboard')

  if (isDashboardPage && !session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (isAuthPage && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/forgot-password'],
}
