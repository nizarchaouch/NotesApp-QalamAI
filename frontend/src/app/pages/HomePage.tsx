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
          <Button><Plus/> Create Note</Button>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search notes..." className="pl-8" />
        </div>
      </GlassCard>

    </div>
  )
}
