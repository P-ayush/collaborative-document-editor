import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { syncSchema } from "@/validations/sync";
import { canEditDocument } from "@/services/auth/permission.service";

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized",
                },
                {
                    status: 401,
                }
            );
        }

        const body = await request.json();

        const result = syncSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid payload",
                    errors: result.error.flatten(),
                },
                {
                    status: 400,
                }
            );
        }

        const {
            documentId,
            operation,
            payload,
        } = result.data;

        const payloadSize = JSON.stringify(payload).length;

        if (payloadSize > 500000) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Payload too large",
                },
                {
                    status: 413,
                }
            );
        }

        switch (operation) {
            case "UPDATE": {
                if (!payload?.content) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: "Content is required",
                        },
                        {
                            status: 400,
                        }
                    );
                }

                const allowed = await canEditDocument(
                    documentId,
                    session.user.id
                );

                if (!allowed) {
                    return NextResponse.json(
                        {
                            success: false,
                            message:
                                "You don't have permission to edit this document.",
                        },
                        {
                            status: 403,
                        }
                    );
                }

                const updatedDocument = await prisma.$transaction(
                    async (tx) => {
                        const document =
                            await tx.document.update({
                                where: {
                                    id: documentId,
                                },
                                data: {
                                    content:
                                        payload.content as Prisma.InputJsonValue,
                                    currentVersion: {
                                        increment: 1,
                                    },
                                },
                            });

                        await tx.documentVersion.create({
                            data: {
                                documentId: document.id,
                                version:
                                    document.currentVersion,
                                content:
                                    payload.content as Prisma.InputJsonValue,
                                createdBy: session.user.id,
                            },
                        });

                        return document;
                    }
                );

                return NextResponse.json({
                    success: true,
                    data: {
                        id: updatedDocument.id,
                        title: updatedDocument.title,
                        content: updatedDocument.content,
                        currentVersion:
                            updatedDocument.currentVersion,
                        updatedAt:
                            updatedDocument.updatedAt,
                    },
                });
            }

            default:
                return NextResponse.json(
                    {
                        success: false,
                        message: "Unsupported operation",
                    },
                    {
                        status: 400,
                    }
                );
        }
    } catch (error) {
        console.error("Sync Error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to sync document",
            },
            {
                status: 500,
            }
        );
    }
}