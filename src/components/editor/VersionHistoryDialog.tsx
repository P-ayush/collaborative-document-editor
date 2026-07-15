"use client";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import VersionHistory from "./VersionHistory";

interface Props {
    documentId: string;
}

export default function VersionHistoryDialog({
    documentId,
}: Props) {
    return (
        <Dialog>
            <DialogTrigger
                render={<Button variant="outline" />}
            >
                Version History
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        Version History
                    </DialogTitle>
                </DialogHeader>

                <VersionHistory
                    documentId={documentId}
                />
            </DialogContent>
        </Dialog>
    );
}