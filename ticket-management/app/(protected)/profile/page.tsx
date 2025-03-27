"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth/SupabaseAuthProvider";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProfile } from "@/lib/hooks/useProfile";

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();
  const { profile, loading, error, updateProfile } = useProfile();
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function uploadAvatar(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user?.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      await updateProfile({ avatar_url: publicUrl });
      setMessage({ type: "success", text: "Avatar updated successfully!" });
    } catch (error) {
      console.error("Error uploading avatar:", error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error uploading avatar",
      });
    } finally {
      setUploading(false);
    }
  }

  async function handleProfileUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setUpdating(true);
      const formData = new FormData(e.currentTarget);
      await updateProfile({
        full_name: formData.get("full_name") as string,
      });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Error updating profile",
      });
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
    }
  }

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            Profile Settings
          </h1>

          {message && (
            <div
              className={`mb-4 p-4 rounded-md ${
                message.type === "success"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Picture
              </label>
              <div className="flex items-center space-x-6">
                {profile?.avatar_url ? (
                  <div className="relative w-20 h-20">
                    <Image
                      src={profile.avatar_url}
                      alt="Profile"
                      className="rounded-full object-cover"
                      fill
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-[#FF6F61] flex items-center justify-center text-white text-2xl">
                    {user?.email?.[0].toUpperCase() || "U"}
                  </div>
                )}
                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F61]">
                  {uploading ? "Uploading..." : "Change"}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  defaultValue={profile?.full_name || ""}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#FF6F61] focus:ring-[#FF6F61] sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={profile?.email || ""}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm sm:text-sm"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  disabled={updating}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#FF6F61] hover:bg-[#ff5c4d] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F61]"
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6F61]"
                >
                  Sign Out
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
