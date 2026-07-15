import { api } from "@/lib/api";
import type {
  DocumentsResponse,
  DocumentVersionsResponse,
} from "@/types/document";

export function getVersions(documentId: string) {
  return api<DocumentVersionsResponse>(
    `/api/documents/${documentId}/versions`
  );
}

export function restoreVersion(
  documentId: string,
  versionId: string
) {
  return api<DocumentsResponse>(
    `/api/documents/${documentId}/versions/${versionId}/restore`,
    {
      method: "POST",
    }
  );
}