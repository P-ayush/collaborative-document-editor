"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useAddCollaborator } from "@/hooks/collaborator/useAddCollaborator";

interface Props {
    documentId: string;
}

export default function AddCollaboratorForm({
    documentId,
}: Props) {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"EDITOR" | "VIEWER">("EDITOR");

    const { mutate, isPending } = useAddCollaborator();

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        mutate(
            {
                documentId,
                email,
                role,
            },
            {
                onSuccess() {
                    setEmail("");
                    setRole("EDITOR");
                },
            }
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <Input
                placeholder="Email address"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <Select
                value={role}
                onValueChange={(value) =>
                    setRole(
                        value as
                        | "EDITOR"
                        | "VIEWER"
                    )
                }
            >
                <SelectTrigger>
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
                type="submit"
                className="w-full"
                disabled={isPending}
            >
                Invite
            </Button>
        </form>
    );
}