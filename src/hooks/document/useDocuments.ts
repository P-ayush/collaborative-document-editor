import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

import type { DocumentsResponse } from "@/types/document";

export function useDocuments(
  page: number,
  limit: number,
  search: string
) {
  return useQuery({
    queryKey: [
      "documents",
      page,
      limit,
      search,
    ],

    queryFn: () =>
      api<DocumentsResponse>(
        `/api/documents?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
      ),
  });
}