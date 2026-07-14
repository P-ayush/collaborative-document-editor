"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { useCreateDocument } from "@/hooks/document/useCreateDocument";

export default function CreateDocumentButton() {
    const router = useRouter();

    const { mutate, isPending } = useCreateDocument();

    function handleCreate() {
        mutate("Untitled Document", {
            onSuccess: (response) => {
                router.push(`/document/${response.data.id}`);
            },
        });
    }

    return (
        <Button
            onClick={handleCreate}
            disabled={isPending}
        >
            {isPending ? "Creating..." : "New Document"}
        </Button>
    );
}