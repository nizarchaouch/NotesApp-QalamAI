import type { AutoSaveStatus } from "@/types";

type props = {
    autoSaveStatus: AutoSaveStatus;
}

export default function AutoSaveIndicator({ autoSaveStatus }: props) {
    switch (autoSaveStatus) {
        case "saving":
            return <span className="text-sm text-gray-500">Saving...</span>;
        case "saved":
            return <span className="text-sm text-green-500">Saved</span>;
        case "pending":
            return <span className="text-sm text-yellow-500">Pending changes...</span>;
        case "initial":
        default:
            return null;
    }
}