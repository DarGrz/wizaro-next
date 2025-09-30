import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Sprawdź ciasteczka uwierzytelniania admin dashboard
  const adminAuth = req.cookies.get('admin-auth')?.value === 'true';
  const userRole = req.cookies.get('user-role')?.value;

  // Trasy chronione dashboard
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard');
  const isLoginRoute = req.nextUrl.pathname === '/login';

  // Jeśli próba dostępu do dashboard bez logowania
  if (isDashboardRoute && !adminAuth) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Jeśli zalogowany użytkownik próbuje dostać się do logowania
  if (isLoginRoute && adminAuth) {
    // Przekieruj zgodnie z rolą
    if (userRole === 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else if (userRole === 'sub_admin') {
      return NextResponse.redirect(new URL('/dashboard/orders', req.url));
    } else if (userRole === 'viewer') {
      return NextResponse.redirect(new URL('/dashboard/reviews-only', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Sprawdź dostęp dla różnych ról
  if (isDashboardRoute && adminAuth) {
    // Sub-admin: tylko dostęp do zamówień
    if (userRole === 'sub_admin') {
      const subAdminAllowedRoutes = [
        '/dashboard/orders' // sub_admin ma pełny dostęp do zamówień
      ];
      
      const isSubAdminAllowed = subAdminAllowedRoutes.some(route => 
        req.nextUrl.pathname.startsWith(route)
      );

      if (!isSubAdminAllowed) {
        return NextResponse.redirect(new URL('/dashboard/orders', req.url));
      }
    }
    
    // Viewer: ograniczony dostęp
    if (userRole === 'viewer') {
      const viewerAllowedRoutes = [
        '/dashboard/reviews-only',
        '/dashboard/orders' // viewer może oglądać zamówienia, ale nie może ich edytować
      ];
      
      const isViewerAllowed = viewerAllowedRoutes.some(route => 
        req.nextUrl.pathname.startsWith(route)
      ) || req.nextUrl.pathname.startsWith('/dashboard/orders/') && req.nextUrl.pathname.includes('/'); // pojedyncze zamówienia

      if (!isViewerAllowed) {
        return NextResponse.redirect(new URL('/dashboard/reviews-only', req.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
