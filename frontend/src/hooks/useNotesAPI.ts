import type { CreateNoteDTO, Note } from "@/types";
import { useAuth } from "@clerk/react";
import { useCallback } from "react";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export default function useNotesAPI() {
  const { getToken } = useAuth();

  const getAllNotes = useCallback(async () => {
    const token = await getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await fetch(`${API_BASE_URL}/api/notes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data: { notes: Note[] } = await response.json();
    return data.notes;
  }, [getToken]);

  const createNote = useCallback(
    async (note: CreateNoteDTO) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
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

  const getNoteById = useCallback(
    async (id: string) => {
      const token = await getToken();
      if (!token) {
        throw new Error("No token found");
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

  return { getAllNotes, createNote, getNoteById };
}
