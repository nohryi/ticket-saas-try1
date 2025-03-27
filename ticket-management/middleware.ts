import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Maximum number of redirects allowed
const MAX_REDIRECTS = 5;

// Timeout for redirects (in milliseconds)
const REDIRECT_TIMEOUT_MS = 5000;

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Skip middleware for certain routes
  const pathname = req.nextUrl.pathname;
  const publicRoutes = ["/auth/callback", "/auth/login", "/login"];
  const skipMiddleware = [
    "/_next",
    "/api",
    "/static",
    "/favicon.ico",
    ".json",
    ".map",
  ];

  if (skipMiddleware.some((path) => pathname.startsWith(path))) {
    return res;
  }

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Check if user is authenticated
    const isAuthenticated = !!session;

    // Redirect unauthenticated users to login
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Redirect authenticated users away from login
    if (
      isAuthenticated &&
      (pathname === "/login" || pathname === "/auth/login")
    ) {
      return NextResponse.redirect(new URL("/kitchen", req.url));
    }

    // Redirect authenticated users from root to dashboard
    if (isAuthenticated && pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Allow access to all other routes
    return res;
  } catch (error) {
    console.error("Middleware error:", error);
    // On error, allow the request to continue
    return res;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
