import { defaultLocale, supportedLocales, type Locale } from "@/i18n";
import { useState, useEffect } from "react";
import { LanguageContext } from "@/contexts/LangaugeContext"

type LanguageProviderProps = {
    children: React.ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {

    const [locale, setLocale] = useState<Locale>(() => {
        const savedLocale = localStorage.getItem("locale");
        return supportedLocales.includes(savedLocale as Locale)
            ? (savedLocale as Locale)
            : defaultLocale;
    })
    const isRTL = locale === 'ar'

    const toggleLanguage = () => {
        setLocale(locale === 'en' ? 'ar' : 'en')
    }   

    useEffect(() => {
        document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.lang = locale
        localStorage.setItem("locale", locale)
    }, [locale, isRTL])

    return (
        <LanguageContext.Provider value={{ locale, setLocale, isRTL, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    )
}