import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Skip middleware for auth callback route
  if (req.nextUrl.pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Add the current pathname to the response headers
  res.headers.set("x-pathname", req.nextUrl.pathname);

  // If the user is not signed in and the current path is not /login,
  // redirect the user to /login
  if (!session && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // If the user is signed in and the current path is /login,
  // redirect the user to /tickets
  if (session && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/tickets", req.url));
  }

  return res;
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
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
