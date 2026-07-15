import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

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
export async function restoreDocumentVersion(
    documentId: string,
    versionId: string,
    userId: string
) {
    return prisma.$transaction(async (tx) => {
        const member = await tx.documentMember.findFirst({
            where: {
                documentId,
                userId,
                role: {
                    in: ["OWNER", "EDITOR"],
                },
            },
        });

        if (!member) {
            throw new Error(
                "You don't have permission to restore this document."
            );
        }

        const version =
            await tx.documentVersion.findFirst({
                where: {
                    id: versionId,
                    documentId,
                },
            });

        if (!version) {
            throw new Error("Version not found.");
        }

        const document = await tx.document.update({
            where: {
                id: documentId,
            },
            data: {
                content:
                    version.content as Prisma.InputJsonValue,

                currentVersion: {
                    increment: 1,
                },
            },
        });

        await tx.documentVersion.create({
            data: {
                documentId: document.id,
                version: document.currentVersion,
                content:
                    version.content as Prisma.InputJsonValue,
                createdBy: userId,
            },
        });

        return document;
    });
}