"use client";
import { useDocumentVersions } from "@/hooks/document/useDocumentVersions";
interface Props {
    documentId: string;
}

export default function VersionHistory({
    documentId,
}: Props) {
    const { data, isLoading } =
        useDocumentVersions(documentId);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data?.data?.length) {
        return (
            <p className="text-sm text-muted-foreground">
                No versions found.
            </p>
        );
    }

    return (
        <div className="space-y-3 rounded-lg border p-4">
            <h3 className="font-semibold">
                Version History
            </h3>

            {data.data.map((version: any) => (
                <div
                    key={version.id}
                    className="rounded border p-3"
                >
                    <p>Version {version.version}</p>

                    <p className="text-sm text-muted-foreground">
                        {new Date(
                            version.createdAt
                        ).toLocaleString()}
                    </p>
                </div>
            ))}
        </div>
    );
}