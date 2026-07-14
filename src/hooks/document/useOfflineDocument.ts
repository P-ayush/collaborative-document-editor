"use client";

import { useEffect, useState } from "react";

import { db } from "@/lib/dexie";
import { api } from "@/lib/api";

interface DocumentResponse {
    success: boolean;
    data: {
        id: string;
        title: string;
        content: any;
        currentVersion: number;
        updatedAt: string;
    };
}

export function useOfflineDocument(id: string) {
    const [document, setDocument] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        loadDocument();
    }, [id]);

    async function loadDocument() {
        setLoading(true);

        const localDocument = await db.documents.get(id);

        if (localDocument) {
            setDocument(localDocument);

            refreshFromServer();

            setLoading(false);
            return;
        }

        const response = await api<DocumentResponse>(
            `/api/documents/${id}`
        );

        await db.documents.put({
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            version: response.data.currentVersion,
            updatedAt: new Date(response.data.updatedAt),
            synced: true,
            deleted: false,
        });

        setDocument({
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            version: response.data.currentVersion,
            updatedAt: new Date(response.data.updatedAt),
            synced: true,
            deleted: false,
        });

        setLoading(false);
    }

    async function refreshFromServer() {
        try {
            const response = await api<DocumentResponse>(
                `/api/documents/${id}`
            );

            await db.documents.put({
                id: response.data.id,
                title: response.data.title,
                content: response.data.content,
                version: response.data.currentVersion,
                updatedAt: new Date(response.data.updatedAt),
                synced: true,
                deleted: false,
            });

            setDocument({
                id: response.data.id,
                title: response.data.title,
                content: response.data.content,
                version: response.data.currentVersion,
                updatedAt: new Date(response.data.updatedAt),
                synced: true,
                deleted: false,
            });
        } catch (error) {
            console.error("Background refresh failed", error);
        }
    }

    return {
        document,
        loading,
    };
}