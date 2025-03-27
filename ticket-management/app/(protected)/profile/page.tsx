"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/SupabaseAuthProvider";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  updated_at: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  async function getProfile() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
      setMessage({ type: "error", text: "Error loading profile" });
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setUpdating(true);
      const formData = new FormData(e.currentTarget);
      const updates = {
        full_name: formData.get("full_name") as string,
      };

      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user?.id);

      if (error) throw error;

      setMessage({ type: "success", text: "Profile updated successfully!" });
      getProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Error updating profile" });
    } finally {
      setUpdating(false);
    }
  }

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      setMessage({ type: "error", text: "Error signing out" });
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>

        {message && (
          <div
            className={`mb-4 p-4 rounded ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={updateProfile} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={profile?.email || ""}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F61] focus:ring-[#FF6F61] sm:text-sm bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="full_name"
              defaultValue={profile?.full_name || ""}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F61] focus:ring-[#FF6F61] sm:text-sm"
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              disabled={updating}
              className="inline-flex justify-center rounded-md border border-transparent bg-[#FF6F61] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#FF6F61]/90 focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-offset-2 disabled:opacity-50"
            >
              {updating ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#FF6F61] focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
