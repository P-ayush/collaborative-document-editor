import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export async function addCollaborator(
    documentId: string,
    email: string,
    role: Role,
    ownerId: string
) {
    const document = await prisma.document.findFirst({
        where: {
            id: documentId,
            ownerId,
        },
    });

    if (!document) {
        throw new Error("Only the owner can share this document.");
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("User not found.");
    }

    const existing = await prisma.documentMember.findUnique({
        where: {
            documentId_userId: {
                documentId,
                userId: user.id,
            },
        },
    });

    if (existing) {
        throw new Error(
            "User is already a collaborator."
        );
    }

    return prisma.documentMember.create({
        data: {
            documentId,
            userId: user.id,
            role,
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
}

export async function listCollaborators(
    documentId: string,
    userId: string
) {
    const member = await prisma.documentMember.findUnique({
        where: {
            documentId_userId: {
                documentId,
                userId,
            },
        },
    });

    if (!member) {
        throw new Error("Forbidden");
    }

    return prisma.documentMember.findMany({
        where: {
            documentId,
        },

        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },

        orderBy: {
            createdAt: "asc",
        },
    });
}

export async function updateCollaborator(
    id: string,
    role: Role,
    ownerId: string
) {
    const collaborator =
        await prisma.documentMember.findUnique({
            where: {
                id,
            },

            include: {
                document: true,
            },
        });

    if (!collaborator) {
        throw new Error("Collaborator not found.");
    }

    if (collaborator.document.ownerId !== ownerId) {
        throw new Error(
            "Only owner can change roles."
        );
    }

    return prisma.documentMember.update({
        where: {
            id,
        },

        data: {
            role,
        },
    });
}

export async function removeCollaborator(
    id: string,
    ownerId: string
) {
    const collaborator =
        await prisma.documentMember.findUnique({
            where: {
                id,
            },

            include: {
                document: true,
            },
        });

    if (!collaborator) {
        throw new Error("Collaborator not found.");
    }

    if (collaborator.document.ownerId !== ownerId) {
        throw new Error(
            "Only owner can remove collaborators."
        );
    }

    return prisma.documentMember.delete({
        where: {
            id,
        },
    });
}