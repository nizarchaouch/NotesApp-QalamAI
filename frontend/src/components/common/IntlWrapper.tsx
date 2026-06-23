import { useLanguage } from "@/hooks/useLanguage";
import { IntlProvider } from "react-intl";
import { messages } from "@/i18n";

type IntlWrapperProps = {
    children: React.ReactNode
}

export function IntlWrapper({ children }: IntlWrapperProps) {
    const { locale } = useLanguage();

    return (
        <IntlProvider defaultLocale="en" locale={locale} messages={messages[locale]}>
            {children}
        </IntlProvider>
    )
}