import { Link } from "react-router-dom"
import { useIntl } from "react-intl"

import { GlassCard } from "@/components/common/GlassCard"

export function NotFoundPage() {
  const intl = useIntl()

  return (
    <GlassCard className="px-6 py-12 text-center sm:px-10">
      <h1 className="text-2xl font-bold text-zinc-900">
        {intl.formatMessage({ id: "notFound.title" })}
      </h1>
      <p className="mt-3 text-md text-zinc-600">
        {intl.formatMessage({ id: "notFound.description" })}
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:text-zinc-700"
      >
        {intl.formatMessage({ id: "notFound.backHome" })}
      </Link>
    </GlassCard>
  )
}
