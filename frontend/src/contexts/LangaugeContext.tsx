import { defaultLocale, type Locale } from "@/i18n";
import { createContext, useContext, useState } from "react";

interface LanguageContextType {
    locale: Locale
    setLocale: (locale: Locale) => void
    istRTL: boolean
    toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

type LanguageProviderProps = {
    children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {

    const [locale, setLocale] = useState<Locale>(defaultLocale)
    const istRTL = locale === 'ar'

    const toggleLanguage = () => {
        setLocale(locale === 'en' ? 'ar' : 'en')
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, istRTL, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}