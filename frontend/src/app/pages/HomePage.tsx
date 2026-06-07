import { GlassCard } from "@/components/common/GlassCard" 
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero card */}
      <GlassCard className="px-4 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">My Notes</h1>
          <Button><Plus/> Create Note</Button>
        </div>
      </GlassCard>

    </div>
  )
}
