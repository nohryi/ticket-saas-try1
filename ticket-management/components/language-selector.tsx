"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const languages = [
  { code: "en", flag: "gb", name: "English" },
  { code: "fr", flag: "fr", name: "Français" },
  { code: "de", flag: "de", name: "Deutsch" },
  { code: "zh", flag: "cn", name: "中文" },
  { code: "ja", flag: "jp", name: "日本語" },
  { code: "tr", flag: "tr", name: "Türkçe" },
  { code: "es", flag: "es", name: "Español" },
  { code: "yue", flag: "hk", name: "粵語" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage, translations } = useLanguage();

  const currentLanguage = languages.find((l) => l.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-accent">
        <Image
          src={`/flags/${currentLanguage?.flag}.svg`}
          alt={currentLanguage?.name || ""}
          width={24}
          height={16}
          className="rounded-sm"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={`/flags/${lang.flag}.svg`}
              alt={lang.name}
              width={24}
              height={16}
              className="rounded-sm"
            />
            <span>{translations.languages[lang.code]}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
