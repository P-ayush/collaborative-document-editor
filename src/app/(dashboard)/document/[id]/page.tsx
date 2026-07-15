"use client";

import { useParams } from "next/navigation";

import { useOfflineDocument } from "@/hooks/document/useOfflineDocument";

import EditorHeader from "@/components/editor/EditorHeader";
import DocumentEditor from "@/components/editor/DocumentEditor";

export default function DocumentPage() {
    const params = useParams();

    const id = params.id as string;

    const { document, loading } = useOfflineDocument(id);

    if (loading) {
        return (
            <main className="mx-auto max-w-6xl p-8">
                <div className="animate-pulse space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-3">
                            <div className="h-8 w-72 rounded-md bg-muted" />
                            <div className="h-4 w-24 rounded-md bg-muted" />
                        </div>

                        <div className="flex gap-3">
                            <div className="h-10 w-32 rounded-md bg-muted" />
                            <div className="h-10 w-40 rounded-md bg-muted" />
                            <div className="h-10 w-24 rounded-md bg-muted" />
                        </div>
                    </div>

                    <div className="h-[650px] rounded-xl border bg-muted" />
                </div>
            </main>
        );
    }

    if (!document) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">
                        Document not found
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        The document may have been deleted or you don't have access.
                    </p>
                </div>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <EditorHeader
                document={{
                    id: document.id,
                    title: document.title,
                    content: document.content,
                    currentVersion: document.version,
                }}
            />

            <DocumentEditor
                documentId={document.id}
                content={document.content}
            />
        </main>
    );
}