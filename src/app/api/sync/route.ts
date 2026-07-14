import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Prisma } from "@prisma/client";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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

        const {
            documentId,
            operation,
            payload,
        } = body;

        if (!documentId || !operation) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid request",
                },
                {
                    status: 400,
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

                const updatedDocument = await prisma.$transaction(async (tx) => {
                    const existingDocument = await tx.document.findFirst({
                        where: {
                            id: documentId,
                            members: {
                                some: {
                                    userId: session.user.id,
                                },
                            },
                        },
                    });

                    if (!existingDocument) {
                        throw new Error("Document not found");
                    }

                    const document = await tx.document.update({
                        where: {
                            id: documentId,
                        },
                        data: {
                            content: payload.content,
                            currentVersion: {
                                increment: 1,
                            },
                        },
                    });

                    await tx.documentVersion.create({
                        data: {
                            documentId: document.id,
                            version: document.currentVersion,
                            content: payload.content as Prisma.InputJsonValue,
                            createdBy: session.user.id,
                        },
                    });

                    return document;
                });

                return NextResponse.json({
                    success: true,
                    data: updatedDocument,
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