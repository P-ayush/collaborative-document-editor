import { api } from "@/lib/api";
import { db } from "@/lib/dexie";

import {
    clearQueueItem,
    getPendingQueue,
} from "./queue.service";

interface SyncResponse {
    success: boolean;
    data: {
        id: string;
        title: string;
        content: Record<string, unknown>;
        currentVersion: number;
        updatedAt: string;
    };
}

export async function syncPendingChanges() {
    const queue = await getPendingQueue();

    if (queue.length === 0) {
        return;
    }

    for (const item of queue) {
        try {
            const response = await api<SyncResponse>(
                "/api/sync",
                {
                    method: "POST",
                    body: JSON.stringify({
                        documentId: item.documentId,
                        operation: item.operation,
                        payload: item.payload,
                    }),
                }
            );

            await db.documents.update(item.documentId, {
                title: response.data.title,
                content: response.data.content,
                version: response.data.currentVersion,
                synced: true,
                deleted: false,
                updatedAt: new Date(response.data.updatedAt),
            });

            if (item.id) {
                await clearQueueItem(item.id);
            }
        } catch (error) {
            console.error("Sync failed:", error);
            break;
        }
    }
}