"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "./translations/en";

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

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: typeof en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [translations, setTranslations] = useState(en);

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // Save language preference
    localStorage.setItem("language", language);

    // Dynamically load translations
    if (language !== "en") {
      import(`./translations/${language}.ts`)
        .then((module) => {
          setTranslations(module[language]);
        })
        .catch((error) => {
          console.error(`Failed to load ${language} translations:`, error);
          setTranslations(en); // Fallback to English
        });
    } else {
      setTranslations(en);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
