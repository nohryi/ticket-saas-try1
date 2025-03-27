import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/SupabaseAuthProvider";
import { supabase } from "@/lib/supabase/client";

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export function useProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function getProfile() {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError) {
        // If profile doesn't exist, create it
        if (fetchError.code === "PGRST116") {
          const { error: insertError } = await supabase
            .from("profiles")
            .insert([
              {
                id: user.id,
                email: user.email,
                avatar_url: user.user_metadata?.avatar_url,
                updated_at: new Date().toISOString(),
              },
            ])
            .single();

          if (insertError) throw insertError;

          // Fetch the newly created profile
          const { data: newProfile, error: newFetchError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

          if (newFetchError) throw newFetchError;
          setProfile(newProfile);
        } else {
          throw fetchError;
        }
      } else {
        setProfile(data);
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      setError(err instanceof Error ? err.message : "Error loading profile");
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(updates: Partial<Profile>) {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from("profiles")
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq("id", user.id);

      if (error) throw error;

      // If updating avatar_url, also update user metadata
      if (updates.avatar_url) {
        const { error: metadataError } = await supabase.auth.updateUser({
          data: { avatar_url: updates.avatar_url },
        });

        if (metadataError) throw metadataError;
      }

      await getProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err instanceof Error ? err.message : "Error updating profile");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [user]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    refreshProfile: getProfile,
  };
}
