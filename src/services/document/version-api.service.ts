import { api } from "@/lib/api";
import type { DocumentVersionsResponse } from "@/types/document";

export function getVersions(documentId: string) {
  return api<DocumentVersionsResponse>(
    `/api/documents/${documentId}/versions`
  );
}