import { Link } from "react-router-dom"

import { GlassCard } from "@/components/common/GlassCard"

export function NotFoundPage() {
  return (
    <GlassCard className="px-6 py-12 text-center sm:px-10">
      <h1 className="text-2xl font-bold text-zinc-900">
        404 - Not Found
      </h1>
      <p className="mt-3 text-md text-zinc-600">
       This page does not exist. Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:text-zinc-700"
      >
        Back to home
      </Link>
    </GlassCard>
  )
}
