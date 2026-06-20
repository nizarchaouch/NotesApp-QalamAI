import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/useLanguage"
import { Languages } from "lucide-react"
import { FormattedMessage } from "react-intl"
import { UserButton } from "@clerk/react"

export function Header() {
  const { isRTL, toggleLanguage } = useLanguage()

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="glass-card flex items-center justify-between gap-4 rounded-2xl px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-semibold tracking-wide"
            >
              <FormattedMessage id="app.title" />
            </Link>
            <span className="hidden text-xs text-muted-foreground sm:inline">
              <FormattedMessage id="app.tagline" />
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={toggleLanguage}>
              <Languages />
              <FormattedMessage id={isRTL ? "header.switchToEnglish" : "header.switchToArabic"} />
            </Button>
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  )
}
