// middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {
  // Check for the token in cookies
  const token = req.cookies.get('token');

  // If no token is found, redirect to the /auth page
  if (!token) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // If token exists, allow access to the route
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ['/'],  // Run middleware on the root route
};
