export interface Document {
    id: string;
    title: string;
    currentVersion: number;
    updatedAt: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export interface DocumentsResponse {
    success: boolean;
    data: Document[];
    pagination: Pagination;
}

export interface OfflineDocument {
    id: string;
    title: string;
    content: Record<string, unknown>;
    version: number;
    updatedAt: Date;
    synced: boolean;
    deleted: boolean;
}

export interface LocalDocument {
    id: string;
    title: string;
    content: Record<string, unknown>;
    version: number;
    updatedAt: Date;
    synced: boolean;
    deleted: boolean;
}

export interface DocumentVersion {
    id: string;
    version: number;
    createdAt: string;
    createdBy: string;
}

export interface DocumentVersionsResponse {
    success: boolean;
    data: DocumentVersion[];
}