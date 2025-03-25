"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FlagIcon } from "@/components/ui/flag-icon";

type Language =
  | "en"
  | "fr"
  | "de"
  | "zh"
  | "ja"
  | "tr"
  | "es"
  | "yue"
  | "ar"
  | "pt";

const languages = [
  { code: "en", flag: "gb", name: "English" },
  { code: "es", flag: "es", name: "Español" },
  { code: "fr", flag: "fr", name: "Français" },
  { code: "de", flag: "de", name: "Deutsch" },
  { code: "pt", flag: "pt", name: "Português" },
  { code: "zh", flag: "cn", name: "中文" },
  { code: "ja", flag: "jp", name: "日本語" },
  { code: "tr", flag: "tr", name: "Türkçe" },
  { code: "ar", flag: "sa", name: "العربية" },
  { code: "yue", flag: "hk", name: "粵語" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage, translations } = useLanguage();

  const currentLanguage = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-accent">
        <FlagIcon country={currentLanguage?.flag || "gb"} className="w-6 h-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center gap-3 cursor-pointer py-2"
          >
            <div className="w-8 h-5 flex items-center justify-center">
              <FlagIcon country={lang.flag} className="w-full h-full" />
            </div>
            <span className="text-sm">{lang.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
