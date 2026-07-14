import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getDocumentVersions } from "@/services/document/version.service";

interface Props {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(
    request: Request,
    { params }: Props
) {
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

    const { id } = await params;

    const versions = await getDocumentVersions(
        id,
        session.user.id
    );

    return NextResponse.json({
        success: true,
        data: versions,
    });
}