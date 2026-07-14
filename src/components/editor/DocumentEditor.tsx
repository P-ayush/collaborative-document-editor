"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import { useDebounce } from "@/hooks/useDebounce";
import { updateLocalDocument } from "@/services/document/local-document.service";

interface Props {
    documentId: string;
    content: Record<string, unknown>;
}

const EMPTY_DOCUMENT = {
    type: "doc",
    content: [
        {
            type: "paragraph",
        },
    ],
};

export default function DocumentEditor({
    documentId,
    content,
}: Props) {
    const saveDocument = useDebounce(
        async (json: Record<string, unknown>) => {
            await updateLocalDocument(documentId, {
                content: json,
            });
        },
        500
    );

    const initialContent =
        content && Object.keys(content).length > 0
            ? content
            : EMPTY_DOCUMENT;

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start writing...",
            }),
        ],

        content: initialContent,

        immediatelyRender: false,

        onUpdate({ editor }) {
            saveDocument(editor.getJSON());
        },
    });

    useEffect(() => {
        if (!editor) return;

        const current = editor.getJSON();

        if (JSON.stringify(current) !== JSON.stringify(initialContent)) {
            editor.commands.setContent(initialContent, {
                emitUpdate: false,
            });
        }
    }, [editor, initialContent]);

    if (!editor) {
        return null;
    }

    return (
        <div className="min-h-[600px] rounded-lg border bg-white p-6">
            <EditorContent
                editor={editor}
                className="min-h-[500px] text-black"
            />
        </div>
    );
}