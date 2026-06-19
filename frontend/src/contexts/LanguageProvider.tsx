import { defaultLocale, type Locale } from "@/i18n";
import { useState } from "react";
import { LanguageContext } from "@/contexts/LangaugeContext"

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