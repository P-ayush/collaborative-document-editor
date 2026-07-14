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
        return <p>Loading...</p>;
    }

    if (!document) {
        return <p>Document not found.</p>;
    }

    return (
        <main className="mx-auto max-w-6xl p-8">
            <EditorHeader
                document={{
                    title: document.title,
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