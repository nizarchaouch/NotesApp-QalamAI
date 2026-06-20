import { ClerkProvider } from "@clerk/react"
import type { ReactNode } from "react"

import { useLanguage } from "@/hooks/useLanguage"
import { clerkLocalizations } from "@/i18n/clerk"

type LocalizedClerkProviderProps = {
  children: ReactNode
  publishableKey: string
}

export function LocalizedClerkProvider({
  children,
  publishableKey,
}: LocalizedClerkProviderProps) {
  const { locale } = useLanguage()

  return (
    <ClerkProvider
      key={locale}
      localization={clerkLocalizations[locale]}
      publishableKey={publishableKey}
    >
      {children}
    </ClerkProvider>
  )
}
