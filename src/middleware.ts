// src/middleware.ts
export const runtime = 'nodejs'; // Use Node.js runtime for middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';
import { initDatabase, testConnection } from './lib/db';


// Initialize the database when the server starts
// This is executed only once when the server initializes
try {
  console.log('Starting database initialization from middleware...');
  Promise.all([
    initDatabase(),
    testConnection()
  ]).catch(err => {
    console.error('Database initialization error:', err);
  });
} catch (error) {
  console.error('Error during database initialization in middleware:', error);
}

// Add routes that should be protected here
const PROTECTED_ROUTES = [
  '/dashboard',
  '/chat',
  '/profile',
  '/api/chat'
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  );
  
  if (isProtectedRoute) {
    // Get the token from cookies or authorization header
    const token = request.cookies.get('auth_token')?.value || 
                 request.headers.get('Authorization')?.substring(7); // Remove 'Bearer ' prefix
    
    // If no token or invalid token, redirect to sign-in page
    if (!token || !verifyToken(token)) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('redirectTo', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all request paths except those starting with:
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder
    // - auth routes (allow unauthenticated access)
    '/((?!_next/static|_next/image|favicon.ico|public|auth).*)',
    '/api/chat/:path*',
  ],
};