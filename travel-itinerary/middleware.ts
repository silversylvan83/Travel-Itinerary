import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const COOKIE_NAME = 'access_token';
const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

// Protect these paths (adjust as you like)
const PROTECTED = [
  '/planner',
  '/pricing',           // remove if pricing is public
  '/destinations',      // example: if you want to restrict
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const needsAuth = PROTECTED.some((p) => pathname.startsWith(`/src/app${p}`)) // not correct
    ? false
    : PROTECTED.some((p) => pathname.startsWith(p));

  if (!needsAuth) return NextResponse.next();

  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }

  try {
    await jwtVerify(token, secret, { issuer: 'travel-itinerary', audience: 'web' });
    return NextResponse.next();
  } catch {
    const url = new URL('/login', req.url);
    url.searchParams.set('next', pathname);
    return NextResponse.redirect(url);
  }
}

// Match everything under these (App Router lives under /)
export const config = {
  matcher: [
    '/planner/:path*',
    '/pricing/:path*',
    '/destinations/:path*',
  ],
};
