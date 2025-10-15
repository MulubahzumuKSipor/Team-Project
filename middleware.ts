// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get current session from cookie
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = '/login';

  const homeUrl = req.nextUrl.clone();
  homeUrl.pathname = '/';

  // Define public routes
  const publicRoutes = ['/login', '/register', '/check-email', '/forgot-password'];
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname);

  // 1️⃣ Logged-in user accessing public route -> redirect to home
  if (session && isPublicRoute) {
    return NextResponse.redirect(homeUrl);
  }

  // 2️⃣ Guest accessing protected route -> redirect to login
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(loginUrl);
  }

  // 3️⃣ Allowed to proceed
  return res;
}

// Middleware matcher & runtime
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|manifest.json|assets).*)'],
  runtime: 'nodejs',
};
