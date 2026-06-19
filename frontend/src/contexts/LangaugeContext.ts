import { type Locale } from "@/i18n";
import { createContext } from "react";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  istRTL: boolean;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);
