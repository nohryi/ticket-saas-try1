import { supabase } from "../supabase/client";
import { useRouter } from "next/navigation";

export const signOut = async () => {
  try {
    // Clear Supabase session
    await supabase.auth.signOut();

    // Clear any localStorage data
    if (typeof window !== "undefined") {
      localStorage.clear();
    }

    // Clear any sessionStorage data
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }

    // Force a hard reload to clear all client state
    window.location.href = "/login";
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
