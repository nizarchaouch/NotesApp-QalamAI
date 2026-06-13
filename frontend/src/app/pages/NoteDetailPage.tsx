import type { AutoSaveStatus, Note } from "@/types";
import { GlassCard } from "@/components/common/GlassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotesAPI from "@/hooks/useNotesAPI";
import { toast } from "sonner";
import { DeleteDialog } from "@/components/common/DeleteDialog";
import AutoSaveIndicator from "@/components/note/AutoSaveIndicator";



export default function NoteDetailPage() {

  const [note, setNote] = useState<Note | null>(null);
  const { getNoteById, updateNote, deleteNote } = useNotesAPI();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userEdited, setUserEdited] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("initial");

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

  const handleSave = async () => {
    if (!note || saving || !userEdited) return;
    try {
      setSaving(true);
      setAutoSaveStatus("saving");
      await updateNote(note.id, { title: note.title, content: note.content });
      // toast.success("Note saved successfully!");
      setUserEdited(false);
      setAutoSaveStatus("saved");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.error("Failed to save the note. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const deleteNotes = async () => {
    if (!note) return;
    try {
      const success = await deleteNote(note.id);
      if (success) {
        navigate("/"); // Redirect to the home page after deletion 
        toast.success("Note deleted successfully!");
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
      <div className="flex flex-col">
        <Input value={note?.title} onChange={handleTitleChange} className="text-xl font-bold dark:bg-transparent dark:border-none focus-visible:ring-0" />
        <Textarea value={note?.content} onChange={handleContentChange} rows={20} className="min-h-[400px] resize-none dark:bg-transparent dark:border-none focus-visible:ring-0" />
      </div>
      <div>
        <span className={`float-right ${saving || !userEdited ? "cursor-not-allowed" : "cursor-pointer"}`}>
          <Button onClick={handleSave} disabled={saving || !userEdited} variant="outline" className="text-green-500">
            {saving ? "Saving..." : "Save"}
          </Button>
        </span>
      </div>
    </GlassCard>
  );
}
