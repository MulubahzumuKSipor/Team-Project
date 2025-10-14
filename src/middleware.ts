import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh the session to get the current state
  const { data: { session } } = await supabase.auth.getSession();
  
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/login';
  
  const homeUrl = req.nextUrl.clone();
  homeUrl.pathname = '/';

  // --- Define Public Routes ---
  const publicPaths = ['/login', '/register', '/check-email', '/forgot-password'];
  const isPublicRoute = publicPaths.includes(req.nextUrl.pathname);

  // 1. Logged In User Accessing Public Routes
  if (session && isPublicRoute) {
    // If the user is logged in and tries to go to /login or /register,
    // redirect them to the home page (e.g., /).
    return NextResponse.redirect(homeUrl);
  }

  // 2. Logged Out User Accessing Protected Routes (EVERYTHING ELSE)
  if (!session && !isPublicRoute) {
    // If the user is NOT logged in and tries to access any non-public route,
    // redirect them to the login page.
    return NextResponse.redirect(loginUrl);
  }

  // 3. User is allowed to proceed (either logged in to a protected page, 
  // or logged out to a public page).
  return res;
}

// 6. Define which paths the middleware should run on
export const config = {
  // Run on ALL paths except static files, _next, and API routes
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|manifest.json|assets).*)',
  ], 
};