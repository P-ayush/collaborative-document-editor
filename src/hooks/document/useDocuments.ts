import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

import type { DocumentsResponse } from "@/types/document";

export function useDocuments(
  page: number,
  limit: number
) {
  return useQuery({
    queryKey: ["documents", page, limit],

    queryFn: () =>
      api<DocumentsResponse>(
        `/api/documents?page=${page}&limit=${limit}`
      ),
  });
}