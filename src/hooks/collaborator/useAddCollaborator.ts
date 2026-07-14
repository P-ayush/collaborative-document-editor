import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { addCollaborator } from "@/services/collaborator/collaborator-api.service";

export function useAddCollaborator() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addCollaborator,

        onSuccess(_, variables) {
            queryClient.invalidateQueries({
                queryKey: [
                    "collaborators",
                    variables.documentId,
                ],
            });
        },
    });
}