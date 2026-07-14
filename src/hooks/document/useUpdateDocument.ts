import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateDocumentTitle } from "@/services/document/document-api.service";

export function useUpdateDocument() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            title,
        }: {
            id: string;
            title: string;
        }) =>
            updateDocumentTitle(id, title),

        onSuccess(_, variables) {
            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "document",
                    variables.id,
                ],
            });
        },
    });
}