"use client";

import { useState } from "react";

import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useSummarize } from "@/hooks/ai/useSummarize";

import AISummaryDialog from "./AISummaryDialog";

interface Props {
    content: string;
}

export default function AISummaryButton({
    content,
}: Props) {
    const [open, setOpen] =
        useState(false);

    const summarize =
        useSummarize();

    async function handleClick() {
        setOpen(true);

        summarize.mutate(content);
    }

    return (
        <>
            <Button
                variant="outline"
                onClick={handleClick}
            >
                <Sparkles className="mr-2 h-4 w-4" />
                Summarize
            </Button>

            <AISummaryDialog
                open={open}
                onOpenChange={setOpen}
                summary={
                    summarize.data?.data ?? ""
                }
                isLoading={
                    summarize.isPending
                }
            />
        </>
    );
}