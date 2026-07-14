import { z } from "zod";

export const addCollaboratorSchema = z.object({
    documentId: z.string().cuid(),

    email: z.email("Invalid email address")
        .transform((email) => email.toLowerCase()),

    role: z.enum([
        "EDITOR",
        "VIEWER",
    ]),
});

export const updateCollaboratorSchema = z.object({
    role: z.enum([
        "EDITOR",
        "VIEWER",
    ]),
});

export type AddCollaboratorInput = z.infer<
    typeof addCollaboratorSchema
>;

export type UpdateCollaboratorInput = z.infer<
    typeof updateCollaboratorSchema
>;