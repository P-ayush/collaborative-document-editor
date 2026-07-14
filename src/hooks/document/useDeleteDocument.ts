import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useDeleteDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            return api(`/api/documents/${id}`, {
                method: "DELETE",
            });
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        },
    });
}