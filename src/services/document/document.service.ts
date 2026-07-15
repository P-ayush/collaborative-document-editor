import { prisma } from "@/lib/prisma";

export async function createDocument(
    userId: string,
    title: string
) {
    return prisma.document.create({
        data: {
            title,

            content: {
                type: "doc",
                content: [
                    {
                        type: "paragraph",
                    },
                ],
            },

            ownerId: userId,

            currentVersion: 1,

            members: {
                create: {
                    userId,
                    role: "OWNER",
                },
            },
        },

        include: {
            members: true,
        },
    });
}

export async function getDocuments(
    userId: string,
    page: number,
    limit: number,
    search?: string
) {
    const skip = (page - 1) * limit;

    const where = {
        members: {
            some: {
                userId,
            },
        },

        ...(search
            ? {
                title: {
                    contains: search,
                    mode: "insensitive" as const,
                },
            }
            : {}),
    };

    const [documents, total] =
        await Promise.all([
            prisma.document.findMany({
                where,
                skip,
                take: limit,

                orderBy: {
                    updatedAt: "desc",
                },

                select: {
                    id: true,
                    title: true,
                    currentVersion: true,
                    updatedAt: true,
                },
            }),

            prisma.document.count({
                where,
            }),
        ]);

    return {
        data: documents,

        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(
                total / limit
            ),
        },
    };
}

export async function getDocumentById(
    id: string,
    userId: string
) {
    return prisma.document.findFirst({
        where: {
            id,

            members: {
                some: {
                    userId,
                },
            },
        },
    });
}

export async function updateDocument(
    id: string,
    userId: string,
    title: string
) {
    return prisma.document.update({
        where: {
            id,
            ownerId: userId,
        },

        data: {
            title,
        },
    });
}

export async function deleteDocument(
    id: string,
    userId: string
) {
    return prisma.document.delete({
        where: {
            id,
            ownerId: userId,
        },
    });
}