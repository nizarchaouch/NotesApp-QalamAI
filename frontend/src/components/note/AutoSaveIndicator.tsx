import type { AutoSaveStatus } from "@/types";
import { CircleAlertIcon, CircleCheckIcon, Loader2Icon } from "lucide-react";

type props = {
    autoSaveStatus: AutoSaveStatus;
}

export default function AutoSaveIndicator({ autoSaveStatus }: props) {
    switch (autoSaveStatus) {
        case "saving":
            return (
                <div className="flex items-center gap-1 text-zinc-500">
                    <Loader2Icon className="size-4 animate-spin" />
                    <span className="text-sm"> Saving... </span>
                </div>
            );
        case "saved":
            return (
                <div className="flex items-center gap-1 text-green-500">
                    <CircleCheckIcon className="size-4" />
                    <span className="text-sm"> Saved </span>
                </div>
            );
        case "unsaved":
            return (
                <div className="flex items-center gap-1 text-orange-500">
                    <CircleAlertIcon className="size-4" />
                    <span className="text-sm"> Unsaved changes </span>
                </div>
            );
        case "initial":
        default:
            return null;
    }
}