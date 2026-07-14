"use client";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function SyncStatus() {
    const isOnline = useOnlineStatus();

    return (
        <div className="text-sm text-muted-foreground">
            {isOnline ? "🟢 Online" : "🔴 Offline"}
        </div>
    );
}