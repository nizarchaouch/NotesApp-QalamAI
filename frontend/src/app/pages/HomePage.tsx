import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import type { Note } from "@/types"
import useNotesAPI from "@/hooks/useNotesAPI"
import { useNavigate } from "react-router-dom"
import { useIntl } from "react-intl"
import { toast } from "sonner"
import { useLanguage } from "@/hooks/useLanguage"

export function HomePage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [search, setSearch] = useState("")
  const { getAllNotes, createNote } = useNotesAPI()
  const navigate = useNavigate()
  const intl = useIntl()
  const { isRTL } = useLanguage()

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return notes

    return notes.filter((note) =>
      `${note.title} ${note.content}`.toLowerCase().includes(query),
    )
  }, [notes, search])

  const handleCreateNote = async () => {
    try {
      const note = await createNote({
        title: intl.formatMessage({ id: "home.newNoteTitle" }),
        content: intl.formatMessage({ id: "home.newNoteContent" }),
      })

      if (note) {
        navigate(`/notes/${note.id}`)
      }
    } catch (error) {
      console.error("Error creating note:", error)
      toast.error(intl.formatMessage({ id: "home.toast.createError" }))
    }
  }

  const handleNoteClick = (noteId: string) => {
    navigate(`/notes/${noteId}`)
  }

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await getAllNotes()
        setNotes(notes ?? [])
      } catch (error) {
        console.error("Error fetching notes:", error)
        toast.error(intl.formatMessage({ id: "home.toast.fetchError" }))
      }
    }

    fetchNotes()
  }, [getAllNotes, intl])

  return (
    <div className="space-y-12">
      <GlassCard className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-bold">
            {intl.formatMessage({ id: "home.title" })}
          </h1>
          <Button onClick={handleCreateNote}>
            <Plus />
            {intl.formatMessage({ id: "home.createNote" })}
          </Button>
        </div>

        <div className="relative">
          <Search className={`absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground ${isRTL ? "right-2.5" : "left-2.5"}`} />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={intl.formatMessage({ id: "home.searchPlaceholder" })}
            className={isRTL ? "pr-8" : "pl-8"}
          />
        </div>

        {filteredNotes.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredNotes.map((note) => (
              <GlassCard
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                className="cursor-pointer p-4"
              >
                <h2 className="text-lg font-semibold">{note.title}</h2>
                <p className="text-sm text-muted-foreground">{note.content}</p>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="flex flex-col items-center justify-center gap-2 p-8 text-center">
            <h2 className="text-lg font-semibold">
              {intl.formatMessage({ id: "home.noNotesTitle" })}
            </h2>
            <p className="text-sm text-muted-foreground">
              {intl.formatMessage({ id: "home.noNotesDescription" })}
            </p>
          </GlassCard>
        )}
      </GlassCard>
    </div>
  )
}
