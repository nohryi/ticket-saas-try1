"use client";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useAuth } from "@/lib/auth/SupabaseAuthProvider";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Image from "next/image";
import { useProfile } from "@/lib/hooks/useProfile";

export default function ProfileMenu() {
  const { user } = useAuth();
  const { profile, loading } = useProfile();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:ring-2 hover:ring-[#FF6F61] hover:ring-offset-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6F61] focus-visible:ring-offset-2">
        {loading ? (
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
        ) : profile?.avatar_url ? (
          <div className="relative w-10 h-10">
            <Image
              src={profile.avatar_url}
              alt="Profile"
              className="rounded-full object-cover"
              fill
              sizes="40px"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#FF6F61] flex items-center justify-center text-white text-lg">
            {user?.email?.[0].toUpperCase() || "U"}
          </div>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-sm text-gray-500 truncate">{user?.email}</p>
            {profile?.full_name && (
              <p className="text-sm font-medium text-gray-900">
                {profile.full_name}
              </p>
            )}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={() => router.push("/profile")}
                  className={`${
                    active ? "bg-[#FF6F61] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Profile Settings
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <button
                  onClick={handleSignOut}
                  className={`${
                    active ? "bg-[#FF6F61] text-white" : "text-gray-900"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
