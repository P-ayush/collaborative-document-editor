"use client";

import Link from "next/link";
import {
    ArrowRight,
    Clock,
    FileText,
} from "lucide-react";

import type { Document } from "@/types/document";

interface Props {
    document: Document;
}

export default function DocumentCard({
    document,
}: Props) {
    const updatedAt = new Date(
        document.updatedAt
    );

    return (
        <Link
            href={`/document/${document.id}`}
            className="
                group
                flex
                items-center
                justify-between
                rounded-xl
                border
                bg-white
                p-5
                transition-all
                duration-200
                hover:border-blue-500
                hover:bg-blue-50/40
                hover:shadow-md
            "
        >
            <div className="flex items-center gap-4">
                <div
                    className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-xl
                        bg-blue-100
                        transition-colors
                        group-hover:bg-blue-600
                    "
                >
                    <FileText
                        className="
                            h-6
                            w-6
                            text-blue-600
                            group-hover:text-white
                        "
                    />
                </div>

                <div>
                    <h2
                        className="
                            text-lg
                            font-semibold
                            transition-colors
                            group-hover:text-blue-600
                        "
                    >
                        {document.title}
                    </h2>

                    <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />

                        <span>
                            {updatedAt.toLocaleDateString()}
                        </span>

                        <span>•</span>

                        <span>
                            {updatedAt.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </span>

                        <span>•</span>

                        <span>
                            Version {document.currentVersion}
                        </span>
                    </div>
                </div>
            </div>

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-muted-foreground
                    transition-all
                    group-hover:text-blue-600
                "
            >
                Open

                <ArrowRight
                    className="
                        h-4
                        w-4
                        transition-transform
                        group-hover:translate-x-1
                    "
                />
            </div>
        </Link>
    );
}