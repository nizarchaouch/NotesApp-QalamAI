import type { Note, CreateNoteDTO, UpdateNoteDTO } from "@/types";
import { useAuth } from "@clerk/react";
import { useCallback } from "react";
import { API_BASE_URL } from "@/lib/utils";



export default function useNotesAPI() {
  const { getToken } = useAuth();
/* get all notes */
  const getAllNotes = useCallback(async () => {
    const token = await getToken();
   if (!token){
      console.log("No token found");
      return;
    }
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: { notes: Note[] } = await response.json();
    return data.notes;
  }, [getToken]);
/* create a new note */
  const createNote = useCallback(
    async (note: CreateNoteDTO) => {
      const token = await getToken();
      if (!token){
      console.log("No token found");
      return;
    }
      const response = await fetch(`${API_BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(note),
      });
      const data: { note: Note } = await response.json();
      return data.note;
    },
    [getToken],
  );
/* get a note by its ID */
  const getNoteById = useCallback(
    async (id: string) => {
      const token = await getToken();
     if (!token){
      console.log("No token found");
      return;
    }
      const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: { note: Note } = await response.json();
      return data.note;
    },
    [getToken],
  );

  /* update an existing note */
  const updateNote = async (id: string, note: UpdateNoteDTO) => {
    const token = await getToken();
    if (!token){
      console.log("No token found");
      return;
    }
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PATCH",
      body: JSON.stringify(note),
    });
    const data: { note: Note } = await response.json();
    return data.note;
  };

  /* delete a note */
  const deleteNote = async (id: string) => {
    const token = await getToken();
    if (!token){
      console.log("No token found");
      return;
    }
    const response = await fetch(`${API_BASE_URL}/api/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    });
    return response.ok;
  };

  return { getAllNotes, createNote, getNoteById, updateNote, deleteNote };
}
