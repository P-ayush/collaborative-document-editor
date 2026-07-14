import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
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

    switch (operation) {
        case "UPDATE": {
            const document = await prisma.document.update({
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

            return NextResponse.json({
                success: true,
                data: document,
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
}