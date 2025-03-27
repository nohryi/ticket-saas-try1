"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";
import type { User } from "@supabase/supabase-js";

const AuthContext = createContext<{
  user: User | null;
  loading: boolean;
}>({
  user: null,
  loading: true,
});

const MIN_LOADING_TIME = 1000; // 1 second minimum loading time

export function SupabaseAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    const startTime = Date.now();

    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted) {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

        // Ensure minimum loading time
        setTimeout(() => {
          if (mounted) {
            setUser(session?.user ?? null);
            setLoading(false);
          }
        }, remainingTime);
      }
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (mounted) {
        setLoading(true); // Start loading on auth state change
        const startTime = Date.now();

        setUser(session?.user ?? null);

        if (event === "SIGNED_IN") {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

          // Ensure minimum loading time before redirect
          setTimeout(() => {
            if (mounted) {
              router.refresh();
              router.push("/kitchen");
              setLoading(false);
            }
          }, remainingTime);
        }

        if (event === "SIGNED_OUT") {
          const elapsedTime = Date.now() - startTime;
          const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

          // Ensure minimum loading time before redirect
          setTimeout(() => {
            if (mounted) {
              router.refresh();
              router.push("/login");
              setLoading(false);
            }
          }, remainingTime);
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {loading ? (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900"></div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a SupabaseAuthProvider");
  }
  return context;
};
