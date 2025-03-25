"use client";

import { useState } from "react";

interface SidebarProps {
  isExpanded: boolean;
  activeView: string;
  onNavigate: (view: string) => void;
}

export default function Sidebar({
  isExpanded,
  activeView,
  onNavigate,
}: SidebarProps) {
  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-md transition-all duration-300 ease-in-out ${
        isExpanded ? "w-52" : "w-12"
      }`}
    >
      {/* Sidebar content */}
      <div className="pt-20">
        <div
          onClick={() => onNavigate("tickets")}
          className="relative h-10 cursor-pointer"
        >
          {/* Hover/Active background - full width when expanded */}
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isExpanded ? "mx-3" : "mx-1.5"
            } rounded-lg ${
              isExpanded && activeView === "tickets" ? "bg-gray-100" : ""
            } ${isExpanded ? "hover:bg-gray-100" : "hover:bg-transparent"}`}
          />

          {/* Content container */}
          <div className="absolute inset-0">
            {/* Icon container - fixed position */}
            <div className="absolute left-0 w-12 h-full flex items-center justify-center">
              <svg
                className={`w-[22px] h-[22px] transition-colors ${
                  activeView === "tickets" ? "text-[#2D3748]" : "text-[#4A5568]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>

            {/* Text container */}
            <div
              className={`absolute left-12 h-full flex items-center transition-all duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span
                className={`font-medium whitespace-nowrap ${
                  activeView === "tickets" ? "text-[#2D3748]" : "text-[#4A5568]"
                }`}
              >
                Tickets
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
