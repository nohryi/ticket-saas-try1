import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Maximum number of redirects allowed
const MAX_REDIRECTS = 5;

// Timeout for redirects (in milliseconds)
const REDIRECT_TIMEOUT = 5000;

export async function middleware(req: NextRequest) {
  // Skip middleware for auth callback route and static files
  if (
    req.nextUrl.pathname.startsWith("/auth/callback") ||
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.startsWith("/static") ||
    req.nextUrl.pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Get the current redirect count from headers
  const redirectCount = parseInt(req.headers.get("x-redirect-count") || "0");

  // Check if we've exceeded the maximum redirects
  if (redirectCount >= MAX_REDIRECTS) {
    console.error("Maximum redirect count exceeded");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Add the current pathname to the response headers
  res.headers.set("x-pathname", req.nextUrl.pathname);
  res.headers.set("x-redirect-count", (redirectCount + 1).toString());

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Handle root path
    if (req.nextUrl.pathname === "/") {
      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url));
      } else {
        return NextResponse.redirect(new URL("/kitchen", req.url));
      }
    }

    // If there's no session and the user is trying to access a protected route
    if (!session && !req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // If there's a session and the user is on login page, redirect to kitchen
    if (session && req.nextUrl.pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/kitchen", req.url));
    }

    return res;
  } catch (error) {
    console.error("Error in middleware:", error);
    // On error, redirect to login page
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
