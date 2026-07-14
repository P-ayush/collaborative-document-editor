import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { updateCollaborator } from "@/services/collaborator/collaborator-api.service";

interface Payload {
    collaboratorId: string;
    role: "EDITOR" | "VIEWER";
    documentId: string;
}

export function useUpdateCollaborator() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collaboratorId,
            role,
        }: Payload) =>
            updateCollaborator(
                collaboratorId,
                { role }
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