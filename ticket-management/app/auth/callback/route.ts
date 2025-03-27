import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Auth callback route handler for OAuth authentication.
 *
 * Note: This route currently shows development warnings about synchronous cookie access.
 * These warnings are coming from @supabase/auth-helpers-nextjs and are expected with Next.js 13+.
 * The authentication still works correctly despite these warnings.
 *
 * To resolve these warnings, we need to wait for an update to @supabase/auth-helpers-nextjs
 * that properly handles async cookie operations in Next.js 13+.
 *
 * See: https://github.com/supabase/auth-helpers/issues/xxx
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (!code) {
    console.error("No code provided in callback");
    return NextResponse.redirect(new URL("/login", requestUrl.origin));
  }

  try {
    // Create a Supabase client configured to use cookies
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
    });

    // Exchange the code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code
    );

    if (exchangeError) {
      console.error("Error exchanging code for session:", exchangeError);
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    // After exchanging the code, get the session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError || !session) {
      console.error("Error getting session:", sessionError);
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    // Successful login - redirect to kitchen page
    return NextResponse.redirect(new URL("/kitchen", requestUrl.origin));
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.redirect(new URL("/login", requestUrl.origin));
  }
}
