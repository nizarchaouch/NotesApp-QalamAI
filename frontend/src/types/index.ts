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

export type CreateTranslateDTO = {
  noteId?: string;
  text?: string;
};

export type CreateTranslateOutputDTO = {
  result: string;
};

export type CreateSummarizeDTO = {
  noteId?: string;
  text?: string;
};

export type CreateSummarizeOutputDTO = {
  result: string;
};

export type CreateRewriteDTO = {
  noteId?: string;
  text?: string;
  mode: RewriteMode;
};

export type CreateRewriteOutputDTO = {
  result: string;
};

export type AutoSaveStatus = "initial" | "saving" | "saved" | "unsaved";

export type RewriteMode = "comedy" | "formal" | "casual";