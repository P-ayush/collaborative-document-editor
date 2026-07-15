import { useMutation } from "@tanstack/react-query";

import { summarizeDocument } from "@/services/ai/ai-api.service";

export function useSummarize() {
    return useMutation({
        mutationFn: summarizeDocument,
    });
}