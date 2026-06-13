import type { AutoSaveStatus } from "@/types";

type props = {
    autoSaveStatus: AutoSaveStatus;
}

export default function AutoSaveIndicator({ autoSaveStatus }: props) {
    switch (autoSaveStatus) {
        case "saving":
            return <span className="text-sm text-zinc-500">Saving...</span>;
        case "saved":
            return <span className="text-sm text-zinc-500">Saved</span>;
        case "unsaved":
            return <span className="text-sm text-zinc-500">Unsaved changes</span>;
        case "initial":
        default:
            return null;
    }
}