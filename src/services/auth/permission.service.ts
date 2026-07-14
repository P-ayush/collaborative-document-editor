import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

async function getMembership(
    documentId: string,
    userId: string
) {
    return prisma.documentMember.findUnique({
        where: {
            documentId_userId: {
                documentId,
                userId,
            },
        },
        select: {
            role: true,
        },
    });
}

export async function canViewDocument(
    documentId: string,
    userId: string
) {
    const member = await getMembership(
        documentId,
        userId
    );

    return !!member;
}

export async function canEditDocument(
    documentId: string,
    userId: string
) {
    const member = await getMembership(
        documentId,
        userId
    );

    return (
        member?.role === Role.OWNER ||
        member?.role === Role.EDITOR
    );
}

export async function isOwner(
    documentId: string,
    userId: string
) {
    const member = await getMembership(
        documentId,
        userId
    );

    return member?.role === Role.OWNER;
}

export async function getUserRole(
    documentId: string,
    userId: string
) {
    const member = await getMembership(
        documentId,
        userId
    );

    return member?.role ?? null;
}