"use client";

import { useState } from "react";

import { useDocuments } from "@/hooks/document/useDocuments";

import DocumentCard from "./DocumentCard";
import Pagination from "@/components/common/Pagination";

export default function DocumentList() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useDocuments(page, 10);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!data?.data.length) {
        return <p>No documents found.</p>;
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
                totalPages={data.pagination.totalPages}
                onPageChange={setPage}
            />
        </>
    );
}  