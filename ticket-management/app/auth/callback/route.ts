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
  try {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (!code) {
      console.error("No code provided in callback");
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

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

    // Get the session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Error getting session:", sessionError);
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    if (!session) {
      console.error("No session found after code exchange");
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    // Create profile if it doesn't exist
    const { data: existingProfile, error: profileError } = await supabase
      .from("profiles")
      .select()
      .eq("id", session.user.id)
      .single();

    if (profileError && profileError.code === "PGRST116") {
      // Profile doesn't exist, create it
      const { error: insertError } = await supabase
        .from("profiles")
        .insert([
          {
            id: session.user.id,
            email: session.user.email,
            avatar_url: session.user.user_metadata?.avatar_url,
            updated_at: new Date().toISOString(),
          },
        ])
        .single();

      if (insertError) {
        console.error("Error creating profile:", insertError);
      }
    } else if (profileError) {
      console.error("Error checking profile:", profileError);
    }

    // Successful login - redirect to kitchen page
    const response = NextResponse.redirect(
      new URL("/kitchen", requestUrl.origin)
    );

    // Set cookie expiration to match session
    if (session.expires_at) {
      const expiresIn = new Date(session.expires_at * 1000);
      response.cookies.set("session", "active", {
        expires: expiresIn,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return response;
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.redirect(
      new URL("/login", new URL(request.url).origin)
    );
  }
}
