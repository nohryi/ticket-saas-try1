"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import TicketScreen from "@/components/ticket-screen";

export default function Home() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeView, setActiveView] = useState("");

  const handleNavigation = (view: string) => {
    setActiveView(view);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />
      <Sidebar
        isExpanded={isSidebarExpanded}
        activeView={activeView}
        onNavigate={handleNavigation}
      />
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarExpanded ? "ml-52" : "ml-12"
        } pt-16`}
      >
        {activeView === "tickets" ? (
          <TicketScreen />
        ) : (
          <div className="flex items-center justify-center h-[calc(100vh-4rem)] text-gray-500">
            <div className="text-center">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              <p className="text-xl font-medium">
                Select "Tickets" from the sidebar to get started
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
