import { useQuery } from "@tanstack/react-query";

import { getCollaborators } from "@/services/collaborator/collaborator-api.service";

export function useCollaborators(
    documentId: string
) {
    return useQuery({
        queryKey: [
            "collaborators",
            documentId,
        ],

        queryFn: () =>
            getCollaborators(documentId),

        enabled: !!documentId,
    });
}