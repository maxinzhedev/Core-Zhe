"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type Locale = "zh" | "en";

interface LanguageContextValue {
  locale: Locale;
  toggleLocale: () => void;
  t: (zh: string, en: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "zh",
  toggleLocale: () => {},
  t: (zh) => zh,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("lang") as Locale | null;
    if (saved === "en" || saved === "zh") setLocale(saved);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === "zh" ? "en" : "zh";
      localStorage.setItem("lang", next);
      document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
      return next;
    });
  }, []);

  const t = useCallback(
    (zh: string, en: string) => (locale === "zh" ? zh : en),
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
