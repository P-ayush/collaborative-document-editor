import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { removeCollaborator } from "@/services/collaborator/collaborator-api.service";

interface Payload {
    collaboratorId: string;
    documentId: string;
}

export function useRemoveCollaborator() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collaboratorId,
        }: Payload) =>
            removeCollaborator(
                collaboratorId
            ),

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