"use client";

import { useState } from "react";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CreateDocumentButton from "@/components/dashboard/CreateDocumentButton";
import SearchBar from "@/components/dashboard/SearchBar";
import DocumentList from "@/components/dashboard/DocumentList";

export default function DashboardPage() {
    const [search, setSearch] = useState("");

    return (
        <>
            <DashboardHeader />

            <div className="mt-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    My Documents
                </h2>

                <CreateDocumentButton />
            </div>

            <div className="mt-6">
                <SearchBar
                    value={search}
                    onChange={setSearch}
                />
            </div>

            <div className="mt-8">
                <DocumentList
                    search={search}
                />
            </div>
        </>
    );
}