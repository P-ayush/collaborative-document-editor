import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

interface CreateDocumentResponse {
    success: boolean;
    data: {
        id: string;
        title: string;
    };
}

export function useCreateDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (title: string) => {
            return api<CreateDocumentResponse>("/api/documents", {
                method: "POST",
                body: JSON.stringify({
                    title,
                }),
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        },
    });
}