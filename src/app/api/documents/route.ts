import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import {
    createDocument,
    getDocuments,
} from "@/services/document/document.service";

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") ?? 1);

    const limit = Number(searchParams.get("limit") ?? 10);

    const result = await getDocuments(
        session.user.id,
        page,
        limit
    );

    return NextResponse.json({
        success: true,
        ...result,
    });
}

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

    const document = await createDocument(
        session.user.id,
        body.title ?? "Untitled Document"
    );

    return NextResponse.json(
        {
            success: true,
            data: document,
        },
        {
            status: 201,
        }
    );
}