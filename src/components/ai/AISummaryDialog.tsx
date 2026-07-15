"use client";

import { useState } from "react";

import {
    Sparkles,
    Copy,
    Check,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    summary: string;
    isLoading: boolean;
}

export default function AISummaryDialog({
    open,
    onOpenChange,
    summary,
    isLoading,
}: Props) {
    const [copied, setCopied] =
        useState(false);

    async function copySummary() {
        await navigator.clipboard.writeText(
            summary
        );

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        AI Summary
                    </DialogTitle>
                </DialogHeader>

                {isLoading ? (
                    <div className="space-y-3 py-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="h-4 animate-pulse rounded bg-muted"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="max-h-[60vh] overflow-y-auto whitespace-pre-wrap rounded-lg border bg-muted/30 p-4">
                        {summary}
                    </div>
                )}

                {!isLoading && summary && (
                    <div className="flex justify-end">
                        <Button
                            variant="outline"
                            onClick={copySummary}
                        >
                            {copied ? (
                                <>
                                    <Check className="mr-2 h-4 w-4 text-green-600" />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy className="mr-2 h-4 w-4" />
                                    Copy
                                </>
                            )}
                        </Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}