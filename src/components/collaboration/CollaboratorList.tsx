"use client";

import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useCollaborators } from "@/hooks/collaborator/useCollaborators";
import { useUpdateCollaborator } from "@/hooks/collaborator/useUpdateCollaborator";
import { useRemoveCollaborator } from "@/hooks/collaborator/useRemoveCollaborator";

interface Collaborator {
    id: string;
    role: "OWNER" | "EDITOR" | "VIEWER";
    user: {
        id: string;
        name: string;
        email: string;
    };
}

interface Props {
    documentId: string;
}

export default function CollaboratorList({
    documentId,
}: Props) {
    const { data, isLoading } =
        useCollaborators(documentId);

    const updateRole =
        useUpdateCollaborator();

    const remove =
        useRemoveCollaborator();

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="flex items-center justify-between rounded-lg border p-4"
                    >
                        <div>
                            <div className="mb-2 h-5 w-36 rounded-md bg-muted" />
                            <div className="h-4 w-48 rounded-md bg-muted" />
                        </div>

                        <div className="h-9 w-28 rounded-md bg-muted" />
                    </div>
                ))}
            </div>
        );
    }

    if (!data?.data.length) {
        return (
            <p className="text-sm text-muted-foreground">
                No collaborators found.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {data.data.map(
                (member: Collaborator) => (
                    <div
                        key={member.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                    >
                        <div>
                            <p className="font-medium">
                                {member.user.name}
                            </p>

                            <p className="text-sm text-muted-foreground">
                                {member.user.email}
                            </p>
                        </div>

                        {member.role === "OWNER" ? (
                            <div className="rounded-md border bg-muted px-4 py-2 text-sm font-medium">
                                👑 Owner
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Select
                                    value={member.role}
                                    onValueChange={(
                                        value
                                    ) =>
                                        updateRole.mutate(
                                            {
                                                collaboratorId:
                                                    member.id,
                                                documentId,
                                                role:
                                                    value as
                                                    | "EDITOR"
                                                    | "VIEWER",
                                            }
                                        )
                                    }
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>

                                    <SelectContent>
                                        <SelectItem value="EDITOR">
                                            Editor
                                        </SelectItem>

                                        <SelectItem value="VIEWER">
                                            Viewer
                                        </SelectItem>
                                    </SelectContent>
                                </Select>

                                <Button
                                    variant="destructive"
                                    onClick={() =>
                                        remove.mutate(
                                            {
                                                collaboratorId:
                                                    member.id,
                                                documentId,
                                            }
                                        )
                                    }
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                    </div>
                )
            )}
        </div>
    );
}