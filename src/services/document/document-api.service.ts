import { api } from "@/lib/api";

export function updateDocumentTitle(
    documentId: string,
    title: string
) {
    return api<{
        success: boolean;
        data: {
            id: string;
            title: string;
        };
    }>(`/api/documents/${documentId}`, {
        method: "PATCH",
        body: JSON.stringify({
            title,
        }),
    });
}