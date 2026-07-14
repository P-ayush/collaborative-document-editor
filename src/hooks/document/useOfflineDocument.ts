"use client";

import { useCallback, useEffect, useState } from "react";

import { db } from "@/lib/dexie";
import { api } from "@/lib/api";

import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import type { LocalDocument } from "@/types/document";

interface DocumentResponse {
    success: boolean;
    data: {
        id: string;
        title: string;
        content: Record<string, unknown>;
        currentVersion: number;
        updatedAt: string;
    };
}

export function useOfflineDocument(id: string) {
    const isOnline = useOnlineStatus();

    const [document, setDocument] = useState<LocalDocument | null>(null);;
    const [loading, setLoading] = useState(true);

    function mapServerDocument(document: DocumentResponse["data"]) {
        return {
            id: document.id,
            title: document.title,
            content: document.content,
            version: document.currentVersion,
            updatedAt: new Date(document.updatedAt),
            synced: true,
            deleted: false,
        };
    }

    const fetchDocument = useCallback(async () => {
        const response = await api<DocumentResponse>(
            `/api/documents/${id}`
        );

        return mapServerDocument(response.data);
    }, [id]);

    const refreshFromServer = useCallback(async () => {
        if (!isOnline) return;

        try {
            const serverDocument = await fetchDocument();

            await db.documents.put(serverDocument);

            setDocument(serverDocument);
        } catch (error) {
            console.error("Background refresh failed", error);
        }
    }, [fetchDocument, isOnline]);

    const loadDocument = useCallback(async () => {
        setLoading(true);

        try {
            const localDocument = await db.documents.get(id);

            if (localDocument) {
                setDocument(localDocument);
                setLoading(false);
                return;
            }

            if (!isOnline) {
                setLoading(false);
                return;
            }

            const serverDocument = await fetchDocument();

            await db.documents.put(serverDocument);

            setDocument(serverDocument);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [fetchDocument, id, isOnline]);

    useEffect(() => {
        if (!id) return;

        loadDocument();
    }, [id, loadDocument]);

    useEffect(() => {
        if (!id) return;

        if (!isOnline) return;

        refreshFromServer();
    }, [id, isOnline, refreshFromServer]);

    return {
        document,
        loading,
        refreshFromServer,
    };
}