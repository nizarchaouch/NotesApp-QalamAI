import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useEffect, useState } from "react"
import type { Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"

export function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const { getAllNotes } = useNotesAPI();


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getAllNotes();
        setNotes(notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };
    fetchNotes();
  }, [getAllNotes]);

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
        <div className="flex flex-col gap-4">
          {notes.map((note) => (
            <GlassCard key={note.id} className="p-4">
              <h2 className="text-lg font-semibold">{note.title}</h2>
              <p className="text-sm text-muted-foreground">{note.content}</p>
            </GlassCard>
          ))}
        </div>
        {/* No notes yet */}
        {/* <div>
          <GlassCard className="flex flex-col items-center justify-center gap-2 p-8">
            <h2 className="text-lg font-semibold">No notes yet</h2>
            <p className="text-sm text-muted-foreground">Start by creating your first note.</p>
          </GlassCard>
        </div> */}
      </GlassCard>

    </div>
  )
}
