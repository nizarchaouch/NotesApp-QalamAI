import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero card */}
      <GlassCard className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">My Notes</h1>
          <Button><Plus /> Create Note</Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search notes..." className="pl-8" />
        </div>
        <div>
          <GlassCard className="flex flex-col items-center justify-center gap-2 p-8">
            <h2 className="text-lg font-semibold">No notes yet</h2>
            <p className="text-sm text-muted-foreground">Start by creating your first note.</p>
          </GlassCard>
        </div>
      </GlassCard>

    </div>
  )
}
