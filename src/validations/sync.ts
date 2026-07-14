import { z } from "zod";

export const syncSchema = z.object({
    documentId: z.string().cuid(),

    operation: z.enum([
        "CREATE",
        "UPDATE",
        "DELETE",
    ]),

    payload: z.object({
        content: z.unknown().optional(),
    }),
});

export type SyncInput = z.infer<typeof syncSchema>;