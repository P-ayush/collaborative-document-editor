"use client";

import { Wifi, WifiOff } from "lucide-react";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function ConnectionStatus() {
    const isOnline = useOnlineStatus();

    if (isOnline === null) {
        return (
            <div className="rounded-md border px-3 py-2 text-sm">
                Checking...
            </div>
        );
    }

    if (!isOnline) {
        return (
            <div className="flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                <WifiOff className="h-4 w-4" />
                Offline
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            <Wifi className="h-4 w-4" />
            Online
        </div>
    );
}