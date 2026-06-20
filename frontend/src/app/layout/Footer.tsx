import { FormattedMessage } from "react-intl"

export function Footer() {
  return (
    <footer className="mt-8 border-t border-black/5">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 text-xs text-zinc-500 sm:px-6 lg:px-8">
        <span>
          <FormattedMessage id="footer.copyright" values={{ year: new Date().getFullYear() }} />
        </span>
        <span className="hidden sm:inline">
          <FormattedMessage id="footer.rights" />
        </span>
      </div>
    </footer>
  )
}
