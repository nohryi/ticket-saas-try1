"use client";

import { useState } from "react";
import { currentUser } from "../lib/mock-users";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
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
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
      >
        {currentUser.avatarUrl ? (
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
            {currentUser.name.charAt(0)}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b">
            <div className="font-medium text-sm text-gray-900">
              {currentUser.name}
            </div>
            <div className="text-xs text-gray-500">{currentUser.email}</div>
          </div>
          <a
            href="#settings"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </a>
          <button
            onClick={handleSignOut}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
