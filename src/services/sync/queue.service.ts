import { db } from "@/lib/dexie";

export async function getPendingQueue() {
  return db.queue.orderBy("createdAt").toArray();
}

export async function removeQueueItem(id: number) {
  return db.queue.delete(id);
}

export async function clearQueue() {
  return db.queue.clear();
}