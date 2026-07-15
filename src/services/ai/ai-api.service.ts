import { api } from "@/lib/api";

export function summarizeDocument(content: string) {
    return api<{
        success: boolean;
        data: string;
    }>("/api/ai/summarize", {
        method: "POST",
        body: JSON.stringify({
            content,
        }),
    });
}