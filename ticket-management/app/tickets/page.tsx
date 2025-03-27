"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";
import TicketScreen from "@/components/ticket-screen";

export default function TicketsPage() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [activeView, setActiveView] = useState("tickets");

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
        <TicketScreen />
      </main>
    </div>
  );
}
