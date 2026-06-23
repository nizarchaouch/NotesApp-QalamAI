import { useEffect, useState } from "react";
import type { AutoSaveStatus, Note } from "@/types";

type Props = {
  note: Note | null;
  userEdited: boolean;
  handleSave: () => Promise<void>;
};

export default function useAutoSave({ note, userEdited, handleSave }: Props) {
  const [autoSaveStatus, setAutoSaveStatus] =
    useState<AutoSaveStatus>("initial");

  //trigger auto save after 2 seconds of inactivity
  useEffect(() => {
    if (!note || !userEdited) return;
    const timeouId = setTimeout(() => {
      setAutoSaveStatus("saving");
      void handleSave().finally(() => setAutoSaveStatus("saved"));
    }, 2000);

    return () => clearTimeout(timeouId);
  }, [note, note?.title, note?.content, handleSave, userEdited]);

  return {
    autoSaveStatus,
    setAutoSaveStatus,
  };
}
