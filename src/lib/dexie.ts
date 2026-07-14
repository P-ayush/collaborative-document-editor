import Dexie, { Table } from "dexie";
import type { LocalDocument } from "@/types/document";

export interface SyncQueue {
    id?: number;
    documentId: string;
    operation: "CREATE" | "UPDATE" | "DELETE";
    payload: any;
    createdAt: Date;
}

class SyncDocsDatabase extends Dexie {
    documents!: Table<LocalDocument>;

    queue!: Table<SyncQueue>;

    constructor() {
        super("SyncDocs");

        this.version(2).stores({
            documents: "id,updatedAt,synced",
            queue: "++id,documentId,operation,createdAt",
        });
    }
}

export const db = new SyncDocsDatabase();