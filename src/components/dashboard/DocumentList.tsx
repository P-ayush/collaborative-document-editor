"use client";

import { useState } from "react";

import { useDocuments } from "@/hooks/document/useDocuments";

import DocumentCard from "./DocumentCard";
import Pagination from "@/components/common/Pagination";

interface Props {
    search: string;
}

export default function DocumentList({
    search,
}: Props) {
    const [page, setPage] = useState(1);

    const { data, isLoading } =
        useDocuments(page, 10, search);

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="rounded-xl border p-5"
                    >
                        <div className="mb-3 h-6 w-52 rounded-md bg-muted" />
                        <div className="mb-2 h-4 w-36 rounded-md bg-muted" />
                        <div className="h-4 w-24 rounded-md bg-muted" />
                    </div>
                ))}
            </div>
        );
    }

    if (!data?.data.length) {
        return <div className="rounded-xl border border-dashed py-16 text-center">
            <h3 className="text-lg font-semibold">
                No documents found
            </h3>

            <p className="mt-2 text-muted-foreground">
                Create your first document to get started.
            </p>
        </div>;
    }

    return (
        <>
            <div className="space-y-4">
                {data.data.map((document) => (
                    <DocumentCard
                        key={document.id}
                        document={document}
                    />
                ))}
            </div>

            <Pagination
                page={data.pagination.page}
                totalPages={
                    data.pagination.totalPages
                }
                onPageChange={setPage}
            />
        </>
    );
}