import { db, SyncQueue } from "@/lib/dexie";

export async function enqueueSync(
  item: Omit<SyncQueue, "id">
) {
  const existing = await db.queue
    .where("documentId")
    .equals(item.documentId)
    .first();

  if (existing) {
    await db.queue.update(existing.id!, {
      operation: item.operation,
      payload: item.payload,
      createdAt: new Date(),
    });

    return;
  }

  await db.queue.add(item);
}

export async function getPendingQueue() {
  return db.queue.orderBy("createdAt").toArray();
}

export async function clearQueueItem(id: number) {
  return db.queue.delete(id);
}

export async function clearQueue() {
  return db.queue.clear();
}