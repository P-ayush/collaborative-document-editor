"use client";

import {
    Wifi,
    WifiOff,
    Loader2,
} from "lucide-react";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function ConnectionStatus() {
    const isOnline = useOnlineStatus();

    if (!isOnline) {
        return (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                <WifiOff className="h-4 w-4" />
                Offline
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-600">
            <Wifi className="h-4 w-4" />
            Online
        </div>
    );
}