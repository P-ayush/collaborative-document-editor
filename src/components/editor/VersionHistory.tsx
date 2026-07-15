"use client";

import { History } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useDocumentVersions } from "@/hooks/document/useDocumentVersions";
import { useRestoreVersion } from "@/hooks/document/useRestoreVersion";

interface Props {
    documentId: string;
}

export default function VersionHistory({
    documentId,
}: Props) {
    const router = useRouter();

    const { data, isLoading } =
        useDocumentVersions(documentId);

    const restore =
        useRestoreVersion();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-10">
                <p className="text-sm text-muted-foreground">
                    Loading versions...
                </p>
            </div>
        );
    }

    if (!data?.data.length) {
        return (
            <div className="flex items-center justify-center py-10">
                <p className="text-sm text-muted-foreground">
                    No versions found.
                </p>
            </div>
        );
    }

    const currentVersion = Math.max(
        ...data.data.map((v) => v.version)
    );

    return (
        <div className="space-y-4">
            {data.data.map((version) => {
                const isCurrent =
                    version.version === currentVersion;

                return (
                    <div
                        key={version.id}
                        className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/40"
                    >
                        <div className="flex items-center gap-3">
                            <History className="h-5 w-5 text-muted-foreground" />

                            <div>
                                <p className="font-medium">
                                    Version {version.version}
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    {new Date(
                                        version.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <Button
                            size="sm"
                            variant="outline"
                            disabled={restore.isPending || isCurrent}
                            onClick={() =>
                                restore.mutate(
                                    {
                                        documentId,
                                        versionId: version.id,
                                    },
                                    {
                                        onSuccess() {
                                            router.refresh();

                                            setTimeout(() => {
                                                window.location.reload();
                                            }, 300);
                                        },
                                    }
                                )
                            }
                        >
                            {isCurrent
                                ? "Current"
                                : restore.isPending
                                    ? "Restoring..."
                                    : "Restore"}
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}