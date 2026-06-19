import type { Note, RewriteMode } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Languages, Pencil, Book } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotesAPI from "@/hooks/useNotesAPI";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import AutoSaveIndicator from "@/components/note/AutoSaveIndicator";
import useAutoSave from "@/hooks/useAutoSave";
import useAIFeaturesAPID from "@/hooks/useAIFeaturesAPID";
import { detectTextDirection } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function NoteDetailPage() {

  const [note, setNote] = useState<Note | null>(null);
  const { getNoteById, updateNote, deleteNote } = useNotesAPI();
  const { translate, summarize, rewrite } = useAIFeaturesAPID();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingRewite, setLoadingRewite] = useState(false);
  const [loadingSummarize, setLoadingSummarize] = useState(false);
  const [loadingTranslate, setLoadingTranslate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userEdited, setUserEdited] = useState(false);

  /* Direction Text */
  const titleDirection = useMemo(() => detectTextDirection(note?.title || ""), [note?.title]);
  const contentDirection = useMemo(() => detectTextDirection(note?.content || ""), [note?.content]);

  const handleSave = useCallback(async () => {
    if (!note || saving || !userEdited) return;
    try {
      setSaving(true);
      await updateNote(note.id, { title: note.title, content: note.content });
      // toast.success("Note saved successfully!");
      setUserEdited(false);
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to save the note. Please try again.");
    } finally {
      setSaving(false);
    }
  }, [note, updateNote])

  const { autoSaveStatus, setAutoSaveStatus } = useAutoSave({ note, userEdited, handleSave });

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNote(prev => prev ? { ...prev, title: e.target.value } : null);
    setUserEdited(true);
    setAutoSaveStatus("unsaved");
  }

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(prev => prev ? { ...prev, content: e.target.value } : null);
    setUserEdited(true);
    setAutoSaveStatus("unsaved");
  }

  const handleTranslate = async () => {
    if (!note) return;
    setLoadingTranslate(true);

    try {
      const result = await translate({ noteId: note.id })
      if (result) {
        setNote(prev => prev ? { ...prev, content: result } : null);
        setUserEdited(true);
        setAutoSaveStatus("unsaved");
        toast.success("Note translated successfully!");
        return
      }
    } catch (error) {
      console.error("Error translating note:", error);
      toast.error("Failed to translate the note. Please try again.");
    } finally {
      setLoadingTranslate(false);
    }
  }

  const handleSummarize = async () => {
    if (!note) return;
    setLoadingSummarize(true);

    try {
      const result = await summarize({ noteId: note.id });
      if (result) {
        setNote(prev => prev ? { ...prev, content: result } : null);
        setUserEdited(true);
        setAutoSaveStatus("unsaved");
        toast.success("Note summarized successfully!");
        return
      }
    } catch (error) {
      console.error("Error summarizing note:", error);
      toast.error("Failed to summarize the note. Please try again.");
    } finally {
      setLoadingSummarize(false);
    }
  };

  const handlerewite = async (mode: RewriteMode) => {
    if (!note) return;
    setLoadingRewite(true);

    try {
      const result = await rewrite({ noteId: note.id, mode });
      if (result) {
        setNote(prev => prev ? { ...prev, content: result } : null);
        setUserEdited(true);
        setAutoSaveStatus("unsaved");
        toast.success("Note rewritten successfully");
        return
      }
    } catch (error) {
      console.error("Error Rewriting note:", error);
      toast.error("Failed to rewrite the note. Please try again.");
    } finally {
      setLoadingRewite(false);
    }
  };

  const deleteNotes = async () => {
    if (!note) return;
    try {
      const success = await deleteNote(note.id);
      if (success) {
        navigate("/"); // Redirect to the home page after deletion 
        toast.success("Note deleted successfully!");
        return
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete the note. Please try again.");
    }
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        if (!id) return;
        const note = await getNoteById(id);
        if (!note) {
          toast.error("Note not found");
          navigate("/");
          return;
        };
        setNote(note);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Note not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [getNoteById, id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <GlassCard className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <Button variant="outline" className="cursor-pointer" onClick={handleBackClick}> <ArrowLeft /> Back</Button>
          <AutoSaveIndicator autoSaveStatus={autoSaveStatus} />
        </div>

        <DeleteDialog handleDelete={deleteNotes} buttonText="Delete"
          title="Delete Note"
          description="This will permanently delete the note and cannot be undone. Are you sure you want to proceed?" />
      </div>
      <div className="flex gap-2">
        <Button className="flex items-center gap-2 cursor-pointer" onClick={handleTranslate}>
          <Languages />  {!loadingTranslate ? "Translate" : "Loading..."}
        </Button>
        <Button className="flex items-center gap-2 cursor-pointer" onClick={handleSummarize}>
          <Book /> {!loadingSummarize ? "Summarize" : "Loading..."}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button ><Pencil />{!loadingRewite ? "Change Tone" : "Loading..."} </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handlerewite('comedy')}>Comedy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlerewite('formal')}>Formal</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handlerewite('casual')}>Casual</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col">
        <Input dir={titleDirection} value={note?.title} onChange={handleTitleChange} className="text-xl font-bold dark:bg-transparent dark:border-none focus-visible:ring-0" />
        <Textarea dir={contentDirection} value={note?.content} onChange={handleContentChange} rows={20} className="min-h-[400px] resize-none dark:bg-transparent dark:border-none focus-visible:ring-0" />
      </div>
      {/* Save Button */}
      {/* <div>
        <span className={`float-right ${saving || !userEdited ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <Button onClick={handleSave} disabled={saving || !userEdited} variant="outline" className="text-green-500">
            {saving ? "Saving..." : "Save"}
          </Button>
        </span>
      </div> */}
    </GlassCard>
  );
}
