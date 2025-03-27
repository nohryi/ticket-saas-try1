"use client";

import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const handleNavigation = (view: string) => {
    // First update the active view
    onNavigate(view);

    // Then navigate
    if (view === "dashboard") {
      router.push("/");
    } else {
      router.push(`/${view}`);
    }
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white shadow-md transition-all duration-300 ease-in-out ${
        isExpanded ? "w-52" : "w-12"
      }`}
    >
      <div className="pt-20">
        {/* Dashboard Link */}
        <div
          onClick={() => handleNavigation("dashboard")}
          className="relative h-10 cursor-pointer"
        >
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isExpanded ? "mx-3" : "mx-1.5"
            } rounded-lg ${
              isExpanded && activeView === "dashboard" ? "bg-gray-100" : ""
            } ${isExpanded ? "hover:bg-gray-100" : "hover:bg-transparent"}`}
          />
          <div className="absolute inset-0">
            <div className="absolute left-0 w-12 h-full flex items-center justify-center">
              <svg
                className={`w-[22px] h-[22px] transition-colors ${
                  activeView === "dashboard"
                    ? "text-[#2D3748]"
                    : "text-[#4A5568]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div
              className={`absolute left-12 h-full flex items-center transition-all duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span
                className={`font-medium whitespace-nowrap ${
                  activeView === "dashboard"
                    ? "text-[#2D3748]"
                    : "text-[#4A5568]"
                }`}
              >
                Dashboard
              </span>
            </div>
          </div>
        </div>

        {/* Kitchen Link */}
        <div
          onClick={() => handleNavigation("kitchen")}
          className="relative h-10 cursor-pointer"
        >
          <div
            className={`absolute inset-0 transition-all duration-300 ${
              isExpanded ? "mx-3" : "mx-1.5"
            } rounded-lg ${
              isExpanded && activeView === "kitchen" ? "bg-gray-100" : ""
            } ${isExpanded ? "hover:bg-gray-100" : "hover:bg-transparent"}`}
          />
          <div className="absolute inset-0">
            <div className="absolute left-0 w-12 h-full flex items-center justify-center">
              <svg
                className={`w-[22px] h-[22px] transition-colors ${
                  activeView === "kitchen" ? "text-[#2D3748]" : "text-[#4A5568]"
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            <div
              className={`absolute left-12 h-full flex items-center transition-all duration-300 ${
                isExpanded ? "opacity-100" : "opacity-0"
              }`}
            >
              <span
                className={`font-medium whitespace-nowrap ${
                  activeView === "kitchen" ? "text-[#2D3748]" : "text-[#4A5568]"
                }`}
              >
                Kitchen
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
