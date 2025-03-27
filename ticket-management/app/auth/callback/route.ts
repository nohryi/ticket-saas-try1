import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  try {
    const code = requestUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    // Exchange the code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
      code
    );
    if (exchangeError) {
      console.error("Session exchange error:", exchangeError);
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    // Verify the session was created
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error("Session verification error:", sessionError);
      return NextResponse.redirect(new URL("/login", requestUrl.origin));
    }

    // If we have a valid session, redirect to tickets
    return NextResponse.redirect(new URL("/tickets", requestUrl.origin));
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(new URL("/login", requestUrl.origin));
  }
}
