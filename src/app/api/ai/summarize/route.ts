import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { summarizeDocument } from "@/services/ai/ai.service";

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

        const { content } = await request.json();

        if (!content || content.trim() === "") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Document content is required.",
                },
                {
                    status: 400,
                }
            );
        }

        const summary = await summarizeDocument(content);

        return NextResponse.json({
            success: true,
            data: summary,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to generate summary.",
            },
            {
                status: 500,
            }
        );
    }
}