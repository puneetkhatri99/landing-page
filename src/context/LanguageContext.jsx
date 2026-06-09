import React, { createContext, useContext, useEffect, useState } from "react";

export const LANGUAGE_STORAGE_KEY = "sun_charged_language_v1";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const stored = typeof window !== "undefined" ? window.localStorage.getItem(LANGUAGE_STORAGE_KEY) : null;
      return stored === "hi" ? "hi" : "en";
    } catch {
      return "en";
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage failures and keep rendering.
    }

    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value = {
    language,
    setLanguage
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }

  return value;
}
