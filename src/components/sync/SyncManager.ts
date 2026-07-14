"use client";

import { useEffect } from "react";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { syncPendingChanges } from "@/services/sync/sync.service";

export default function SyncManager() {
    const isOnline = useOnlineStatus();

    useEffect(() => {
        if (!isOnline) return;

        syncPendingChanges();
    }, [isOnline]);

    return null;
}