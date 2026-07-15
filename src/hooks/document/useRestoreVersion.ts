import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { restoreVersion } from "@/services/document/version-api.service";

export function useRestoreVersion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            documentId,
            versionId,
        }: {
            documentId: string;
            versionId: string;
        }) =>
            restoreVersion(
                documentId,
                versionId
            ),

        onSuccess(_, variables) {
            queryClient.invalidateQueries({
                queryKey: [
                    "document",
                    variables.documentId,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: [
                    "document-versions",
                    variables.documentId,
                ],
            });

            queryClient.invalidateQueries({
                queryKey: ["documents"],
            });
        },
    });
}