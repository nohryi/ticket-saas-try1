"use client";

import Clock from "@/components/clock";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import UserMenu from "./user-menu";
import { Logo } from "./logo";

interface HeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export function Header({ isExpanded, onToggle }: HeaderProps) {
  const { translations } = useLanguage();

  return (
    <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-background px-6 dark:bg-background fixed top-0 right-0 left-0 z-50">
      <button
        onClick={onToggle}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isExpanded ? "M4 6h16M4 12h16M4 18h16" : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      <div className="flex-1 flex justify-center items-center">
        <Logo width={117} height={35} />
      </div>

      <div className="flex items-center gap-4">
        <Clock />
        <LanguageSelector />
        <UserMenu />
      </div>
    </header>
  );
}
