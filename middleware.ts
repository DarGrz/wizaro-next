import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Sprawdź sesję użytkownika
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Trasy chronione dla użytkowników
  const protectedRoutes = ['/monitor'];
  const authRoutes = ['/auth/login', '/auth/register'];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    req.nextUrl.pathname.startsWith(route)
  );
  
  const isAuthRoute = authRoutes.some(route => 
    req.nextUrl.pathname === route
  );

  // Jeśli użytkownik próbuje dostać się do chronionej trasy bez sesji
  if (isProtectedRoute && !session) {
    const redirectUrl = new URL('/auth/login', req.url);
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Jeśli zalogowany użytkownik próbuje dostać się do stron auth
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/monitor', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/monitor/:path*', '/auth/login', '/auth/register'],
};
