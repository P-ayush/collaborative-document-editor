"use client";

import {
    Clock3,
    RotateCcw,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useDocumentVersions } from "@/hooks/document/useDocumentVersions";
import { useRestoreVersion } from "@/hooks/document/useRestoreVersion";

interface Props {
    documentId: string;
}

export default function VersionHistory({
    documentId,
}: Props) {
    const { data, isLoading } =
        useDocumentVersions(documentId);

    const restore =
        useRestoreVersion();

    if (isLoading) {
        return (
            <div className="space-y-4">
                {[1, 2, 3, 4, 5].map(
                    (item) => (
                        <div
                            key={item}
                            className="h-20 animate-pulse rounded-xl bg-muted"
                        />
                    )
                )}
            </div>
        );
    }

    if (!data?.data.length) {
        return (
            <div className="rounded-xl border border-dashed py-12 text-center">
                No versions found.
            </div>
        );
    }

    return (
        <div className="max-h-[75vh] space-y-3 overflow-y-auto pr-2">
            {data.data.map(
                (version, index) => (
                    <div
                        key={version.id}
                        className={`rounded-xl border p-4 transition ${index === 0
                                ? "border-primary bg-primary/5"
                                : ""
                            }`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="rounded-full bg-muted p-2">
                                    <Clock3 className="h-4 w-4" />
                                </div>

                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-semibold">
                                            Version{" "}
                                            {
                                                version.version
                                            }
                                        </h4>

                                        {index ===
                                            0 && (
                                                <Badge>
                                                    Current
                                                </Badge>
                                            )}
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        {new Date(
                                            version.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {index !== 0 && (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    disabled={
                                        restore.isPending
                                    }
                                    onClick={() =>
                                        restore.mutate(
                                            {
                                                documentId,
                                                versionId:
                                                    version.id,
                                            }
                                        )
                                    }
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />

                                    {restore.isPending
                                        ? "Restoring..."
                                        : "Restore"}
                                </Button>
                            )}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}