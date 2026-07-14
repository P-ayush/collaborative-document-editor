import { useQuery } from "@tanstack/react-query";
import type { DocumentVersionsResponse } from "@/types/document";

import { getVersions } from "@/services/document/version-api.service";

export function useDocumentVersions(documentId: string) {
    return useQuery<DocumentVersionsResponse>({
        queryKey: ["document-versions", documentId],

        queryFn: () => getVersions(documentId),

        enabled: !!documentId,
    });
}