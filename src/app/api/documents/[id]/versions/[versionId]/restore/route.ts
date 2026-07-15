import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { restoreDocumentVersion } from "@/services/document/version.service";

interface Props {
    params: Promise<{
        id: string;
        versionId: string;
    }>;
}

export async function POST(
    request: NextRequest,
    { params }: Props
) {
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

        const { id, versionId } = await params;

        const document =
            await restoreDocumentVersion(
                id,
                versionId,
                session.user.id
            );

        return NextResponse.json({
            success: true,
            data: document,
        });
    } catch (error) {
        console.error(error);

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