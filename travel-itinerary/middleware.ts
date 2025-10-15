// middleware.ts (project root)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = [/^\/planner(?:\/|$)/]; // add /^\/profile/ too if you want

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = PROTECTED.some((re) => re.test(pathname));
  if (!needsAuth) return;

  const hasToken = req.cookies.get("accessToken")?.value;
  if (!hasToken) {
    const url = new URL("/login", req.url);
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
}
