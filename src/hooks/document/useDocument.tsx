import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export interface DocumentResponse {
    success: boolean;
    data: {
        id: string;
        title: string;
        content: unknown;
        currentVersion: number;
        updatedAt: string;
    };
}

export function useDocument(id: string) {
    return useQuery({
        queryKey: ["document", id],

        queryFn: () =>
            api<DocumentResponse>(`/api/documents/${id}`),

        enabled: !!id,
    });
}