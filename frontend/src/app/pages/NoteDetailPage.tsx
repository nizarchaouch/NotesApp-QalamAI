import type { Note, RewriteMode } from "@/types"
import { GlassCard } from "@/components/common/GlassCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, Book, Languages, Pencil } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useIntl } from "react-intl"
import useNotesAPI from "@/hooks/useNotesAPI"
import { toast } from "sonner"
import { DeleteDialog } from "@/components/common/DeleteDialog"
import AutoSaveIndicator from "@/components/note/AutoSaveIndicator"
import useAutoSave from "@/hooks/useAutoSave"
import useAIFeaturesAPID from "@/hooks/useAIFeaturesAPID"
import { detectTextDirection } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function NoteDetailPage() {
  const [note, setNote] = useState<Note | null>(null)
  const { getNoteById, updateNote, deleteNote } = useNotesAPI()
  const { translate, summarize, rewrite } = useAIFeaturesAPID()
  const navigate = useNavigate()
  const { id } = useParams()
  const intl = useIntl()
  const [loading, setLoading] = useState(true)
  const [loadingRewrite, setLoadingRewrite] = useState(false)
  const [loadingSummarize, setLoadingSummarize] = useState(false)
  const [loadingTranslate, setLoadingTranslate] = useState(false)
  const [saving, setSaving] = useState(false)
  const [userEdited, setUserEdited] = useState(false)

  const titleDirection = useMemo(() => detectTextDirection(note?.title || ""), [note?.title])
  const contentDirection = useMemo(() => detectTextDirection(note?.content || ""), [note?.content])
  const loadingLabel = intl.formatMessage({ id: "noteDetail.loading" })

  const handleSave = useCallback(async () => {
    if (!note || saving || !userEdited) return

    try {
      setSaving(true)
      await updateNote(note.id, { title: note.title, content: note.content })
      setUserEdited(false)
    } catch (error) {
      console.error("Error updating note:", error)
      toast.error(intl.formatMessage({ id: "noteDetail.toast.saveError" }))
    } finally {
      setSaving(false)
    }
  }, [intl, note, saving, updateNote, userEdited])

  const { autoSaveStatus, setAutoSaveStatus } = useAutoSave({ note, userEdited, handleSave })

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNote((prev) => prev ? { ...prev, title: event.target.value } : null)
    setUserEdited(true)
    setAutoSaveStatus("unsaved")
  }

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote((prev) => prev ? { ...prev, content: event.target.value } : null)
    setUserEdited(true)
    setAutoSaveStatus("unsaved")
  }

  const handleTranslate = async () => {
    if (!note) return
    setLoadingTranslate(true)

    try {
      const result = await translate({ noteId: note.id })
      if (result) {
        setNote((prev) => prev ? { ...prev, content: result } : null)
        setUserEdited(true)
        setAutoSaveStatus("unsaved")
        toast.success(intl.formatMessage({ id: "noteDetail.toast.translateSuccess" }))
      }
    } catch (error) {
      console.error("Error translating note:", error)
      toast.error(intl.formatMessage({ id: "noteDetail.toast.translateError" }))
    } finally {
      setLoadingTranslate(false)
    }
  }

  const handleSummarize = async () => {
    if (!note) return
    setLoadingSummarize(true)

    try {
      const result = await summarize({ noteId: note.id })
      if (result) {
        setNote((prev) => prev ? { ...prev, content: result } : null)
        setUserEdited(true)
        setAutoSaveStatus("unsaved")
        toast.success(intl.formatMessage({ id: "noteDetail.toast.summarizeSuccess" }))
      }
    } catch (error) {
      console.error("Error summarizing note:", error)
      toast.error(intl.formatMessage({ id: "noteDetail.toast.summarizeError" }))
    } finally {
      setLoadingSummarize(false)
    }
  }

  const handleRewrite = async (mode: RewriteMode) => {
    if (!note) return
    setLoadingRewrite(true)

    try {
      const result = await rewrite({ noteId: note.id, mode })
      if (result) {
        setNote((prev) => prev ? { ...prev, content: result } : null)
        setUserEdited(true)
        setAutoSaveStatus("unsaved")
        toast.success(intl.formatMessage({ id: "noteDetail.toast.rewriteSuccess" }))
      }
    } catch (error) {
      console.error("Error rewriting note:", error)
      toast.error(intl.formatMessage({ id: "noteDetail.toast.rewriteError" }))
    } finally {
      setLoadingRewrite(false)
    }
  }

  const deleteNotes = async () => {
    if (!note) return

    try {
      const success = await deleteNote(note.id)
      if (success) {
        navigate("/")
        toast.success(intl.formatMessage({ id: "noteDetail.toast.deleteSuccess" }))
      }
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error(intl.formatMessage({ id: "noteDetail.toast.deleteError" }))
    }
  }

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!id) return
        const note = await getNoteById(id)

        if (!note) {
          toast.error(intl.formatMessage({ id: "noteDetail.toast.notFound" }))
          navigate("/")
          return
        }

        setNote(note)
      } catch (error) {
        console.error("Error fetching note:", error)
        toast.error(intl.formatMessage({ id: "noteDetail.toast.notFound" }))
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [getNoteById, id, intl, navigate])

  if (loading) {
    return <div className="flex justify-center"><Spinner className="size-8" /></div>
  }

  return (
    <GlassCard className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="cursor-pointer" onClick={handleBackClick}>
            <ArrowLeft className="rtl:rotate-180" />
            {intl.formatMessage({ id: "noteDetail.back" })}
          </Button>
          <AutoSaveIndicator autoSaveStatus={autoSaveStatus} />
        </div>

        <DeleteDialog
          handleDelete={deleteNotes}
          buttonText={intl.formatMessage({ id: "noteDetail.delete" })}
          title={intl.formatMessage({ id: "noteDetail.deleteTitle" })}
          description={intl.formatMessage({ id: "noteDetail.deleteDescription" })}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          disabled={loadingTranslate}
          className="flex cursor-pointer items-center gap-2"
          onClick={handleTranslate}
        >
          {!loadingTranslate ? (
            <>
              <Languages />
              {intl.formatMessage({ id: "noteDetail.translate" })}
            </>
          ) : (
            <>
              <Spinner />
              {loadingLabel}
            </>
          )}
        </Button>
        <Button
          disabled={loadingSummarize}
          className="flex cursor-pointer items-center gap-2"
          onClick={handleSummarize}
        >
          {!loadingSummarize ? (
            <>
              <Book />
              {intl.formatMessage({ id: "noteDetail.summarize" })}
            </>
          ) : (
            <>
              <Spinner />
              {loadingLabel}
            </>
          )}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button disabled={loadingRewrite}>
              {!loadingRewrite ? (
                <>
                  <Pencil />
                  {intl.formatMessage({ id: "noteDetail.changeTone" })}
                </>
              ) : (
                <>
                  <Spinner />
                  {loadingLabel}
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleRewrite("comedy")}>
                {intl.formatMessage({ id: "noteDetail.toneComedy" })}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRewrite("formal")}>
                {intl.formatMessage({ id: "noteDetail.toneFormal" })}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleRewrite("casual")}>
                {intl.formatMessage({ id: "noteDetail.toneCasual" })}
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col">
        <Input
          dir={titleDirection}
          value={note?.title}
          onChange={handleTitleChange}
          className="text-xl font-bold dark:border-none dark:bg-transparent focus-visible:ring-0"
        />
        <Textarea
          dir={contentDirection}
          value={note?.content}
          onChange={handleContentChange}
          rows={20}
          className="min-h-[400px] resize-none dark:border-none dark:bg-transparent focus-visible:ring-0"
        />
      </div>
    </GlassCard>
  )
}
