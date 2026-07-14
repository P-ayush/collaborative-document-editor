import Link from "next/link";

import type { Document } from "@/types/document";

interface Props {
    document: Document;
}

export default function DocumentCard({
    document,
}: Props) {
    return (
        <Link
            href={`/document/${document.id}`}
            className="block rounded-lg border p-5 hover:bg-muted transition"
        >
            <h2 className="text-lg font-semibold">
                {document.title}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
                Version {document.currentVersion}
            </p>
        </Link>
    );
}