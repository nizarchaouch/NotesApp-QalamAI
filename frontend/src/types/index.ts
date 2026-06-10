export type Note = {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNoteDTO = {
  title: string;
  content: string;
};

export type UpdateNoteDTO = {
  title?: string;
  content?: string;
};
