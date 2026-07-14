import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import {
    deleteDocument,
    getDocumentById,
    updateDocument,
} from "@/services/document/document.service";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: NextRequest,
    { params }: Props
) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const { id } = await params;

    const document = await getDocumentById(
        id,
        session.user.id
    );

    return NextResponse.json({
        success: true,
        data: document,
    });
}

export async function PATCH(
    request: NextRequest,
    { params }: Props
) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const body = await request.json();

    const { id } = await params;

    const document = await updateDocument(
        id,
        session.user.id,
        body.title
    );

    return NextResponse.json({
        success: true,
        data: document,
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: Props
) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        return NextResponse.json(
            {
                message: "Unauthorized",
            },
            {
                status: 401,
            }
        );
    }

    const { id } = await params;

    await deleteDocument(
        id,
        session.user.id
    );

    return NextResponse.json({
        success: true,
        message: "Document deleted successfully",
    });
}