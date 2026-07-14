"use client";

import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

import ShareDialog from "@/components/collaboration/ShareDialog";

import { useUpdateDocument } from "@/hooks/document/useUpdateDocument";

interface Props {
    document: {
        id: string;
        title: string;
        currentVersion: number;
    };
}

export default function EditorHeader({
    document,
}: Props) {
    const [title, setTitle] = useState(
        document.title
    );

    const updateDocument =
        useUpdateDocument();

    useEffect(() => {
        setTitle(document.title);
    }, [document.title]);

    function saveTitle() {
        if (
            title.trim() === "" ||
            title === document.title
        ) {
            return;
        }

        updateDocument.mutate({
            id: document.id,
            title,
        });
    }

    return (
        <div className="mb-6 flex items-center justify-between">
            <div>
                <Input
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                    onBlur={saveTitle}
                    onKeyDown={(e) => {
                        if (
                            e.key === "Enter"
                        ) {
                            saveTitle();
                        }
                    }}
                    className="border-none p-0 text-3xl font-bold shadow-none focus-visible:ring-0"
                />

                <p className="text-muted-foreground">
                    Version{" "}
                    {document.currentVersion}
                </p>
            </div>

            <ShareDialog
                documentId={document.id}
            />
        </div>
    );
}