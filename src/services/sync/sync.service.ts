import { api } from "@/lib/api";
import { db } from "@/lib/dexie";

export async function syncPendingChanges() {
    const queue = await db.queue.orderBy("createdAt").toArray();

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
                await db.queue.delete(item.id);
            }
        } catch (error) {
            console.error("Sync failed", error);
            break;
        }
    }
}