import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";

import { authOptions } from "@/lib/auth";

import {
    addCollaborator,
    listCollaborators,
} from "@/services/collaborator/collaborator.service";

import {
    addCollaboratorSchema,
} from "@/validations/collaborator";

export async function GET(request: NextRequest) {
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

        const documentId =
            request.nextUrl.searchParams.get("documentId");

        if (!documentId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document id is required",
                },
                {
                    status: 400,
                }
            );
        }

        const collaborators =
            await listCollaborators(
                documentId,
                session.user.id
            );

        return NextResponse.json({
            success: true,
            data: collaborators,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}

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

        const result =
            addCollaboratorSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                {
                    success: false,
                    errors: result.error.flatten(),
                },
                {
                    status: 400,
                }
            );
        }

        const collaborator =
            await addCollaborator(
                result.data.documentId,
                result.data.email,
                result.data.role as Role,
                session.user.id
            );

        return NextResponse.json({
            success: true,
            data: collaborator,
        });
    } catch (error) {
        console.error("Collaborator API Error:", error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            },
            {
                status: 500,
            }
        );
    }
}