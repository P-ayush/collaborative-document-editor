import { api } from "@/lib/api";
import { db } from "@/lib/dexie";

import {
    clearQueueItem,
    getPendingQueue,
} from "./queue.service";

export async function syncPendingChanges() {
    const queue = await getPendingQueue();

    for (const item of queue) {
        try {
            await api("/api/sync", {
                method: "POST",

                body: JSON.stringify({
                    documentId: item.documentId,
                    operation: item.operation,
                    payload: item.payload,
                }),
            });

            await db.documents.update(item.documentId, {
                synced: true,
            });

            if (item.id) {
                await clearQueueItem(item.id);
            }
        } catch (error) {
            console.error("Sync failed", error);

            break;
        }
    }
}