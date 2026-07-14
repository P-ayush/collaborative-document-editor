import { prisma } from "@/lib/prisma";

export async function getDocumentVersions(
    documentId: string,
    userId: string
) {
    return prisma.documentVersion.findMany({
        where: {
            documentId,
            document: {
                members: {
                    some: {
                        userId,
                    },
                },
            },
        },

        orderBy: {
            version: "desc",
        },

        select: {
            id: true,
            version: true,
            createdAt: true,
            createdBy: true,
        },
    });
}