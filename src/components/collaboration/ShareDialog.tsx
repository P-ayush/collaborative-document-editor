"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import AddCollaboratorForm from "./AddCollaboratorForm";
import CollaboratorList from "./CollaboratorList";

interface Props {
    documentId: string;
}

export default function ShareDialog({
    documentId,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger
                render={
                    <Button variant="outline">
                        Share
                    </Button>
                }
            />

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Share Document
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    <AddCollaboratorForm
                        documentId={documentId}
                    />

                    <CollaboratorList
                        documentId={documentId}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}