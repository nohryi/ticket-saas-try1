"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Determine active view based on pathname
  const getActiveView = (path: string) => {
    if (path === "/dashboard") return "dashboard";
    if (path === "/kitchen") return "kitchen";
    return "";
  };

  const [activeView, setActiveView] = useState(getActiveView(pathname));

  // Update active view when pathname changes
  useEffect(() => {
    setActiveView(getActiveView(pathname));
  }, [pathname]);

  const handleNavigation = (view: string) => {
    setActiveView(view);
    if (view === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/${view}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header
        isExpanded={isSidebarExpanded}
        onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
      />
      <div className="flex flex-1">
        <Sidebar
          isExpanded={isSidebarExpanded}
          activeView={activeView}
          onNavigate={handleNavigation}
        />
        <main
          className={`flex-1 transition-all duration-300 ease-in-out ${
            isSidebarExpanded ? "ml-52" : "ml-12"
          } pt-16`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
