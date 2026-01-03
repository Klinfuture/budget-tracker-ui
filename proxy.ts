import { isAuthRoute, isProtectedRoute, RETURN_URL_DATA_KEY, ROUTES } from '@/utils/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request:NextRequest) {
  const { pathname } = request.nextUrl;
    const isApiRequest = pathname.startsWith("/api/v1")
  
  // Get the session token from cookies
  const session = request.cookies.get('session')?.value;
  
  // Check route types using centralized config
  const isProtected = isProtectedRoute(pathname);
  const isAuth = isAuthRoute(pathname);

  console.log({pathname,isProtected,isAuth,isApiRequest})

  // Redirect to login if accessing protected route without session
  if (isProtected && !session) {
    const url = new URL(ROUTES.LOGIN, request.url);
    url.searchParams.set(RETURN_URL_DATA_KEY, pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if accessing auth pages while logged in
  if (isAuth && session) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url));
  }

  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes (handled separately)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.well-known|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};