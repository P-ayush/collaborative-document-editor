"use client";

import { History } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import VersionHistory from "./VersionHistory";

interface Props {
    documentId: string;
}

export default function VersionHistoryDialog({
    documentId,
}: Props) {
    return (
        <Sheet>
            <SheetTrigger
                render={
                    <Button variant="outline">
                        <History className="mr-2 h-4 w-4" />
                        Version History
                    </Button>
                }
            />

            <SheetContent
                side="right"
                className="w-[550px] sm:w-[650px]"
            >
                <SheetHeader>
                    <SheetTitle>
                        Version History
                    </SheetTitle>
                </SheetHeader>

                <div className="mt-6">
                    <VersionHistory
                        documentId={documentId}
                    />
                </div>
            </SheetContent>
        </Sheet>
    );
}