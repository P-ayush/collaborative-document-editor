import { db, LocalDocument, SyncQueue } from "@/lib/dexie";

export async function saveLocalDocument(document: LocalDocument) {

    await db.documents.put({
        ...document,
        synced: false,
        deleted: false,
        updatedAt: new Date(),
    });

    await enqueueSync({
        documentId: document.id,
        operation: "CREATE",
        payload: document,
        createdAt: new Date(),
    });
}

export async function getLocalDocument(id: string) {
    return db.documents.get(id);
}

export async function updateLocalDocument(
    id: string,
    updates: Partial<LocalDocument>
) {
    console.log("Saving locally...", id, updates);

    await db.documents.update(id, {
        ...updates,
        synced: false,
        updatedAt: new Date(),
    });

    await enqueueSync({
        documentId: id,
        operation: "UPDATE",
        payload: updates,
        createdAt: new Date(),
    });
}

export async function deleteLocalDocument(id: string) {
    await db.documents.update(id, {
        deleted: true,
        synced: false,
        updatedAt: new Date(),
    });

    await enqueueSync({
        documentId: id,
        operation: "DELETE",
        payload: {},
        createdAt: new Date(),
    });
}

export async function enqueueSync(
    item: Omit<SyncQueue, "id">
) {
    return db.queue.add(item);
}

export async function getPendingQueue() {
    return db.queue.toArray();
}

export async function clearQueueItem(id: number) {
    return db.queue.delete(id);
}