"use client";

import { Button } from "@/components/ui/button";

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    page,
    totalPages,
    onPageChange,
}: PaginationProps) {
    return (
        <div className="mt-8 flex items-center justify-between">
            <Button
                variant="outline"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
            >
                Previous
            </Button>

            <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, index) => {
                    const pageNumber = index + 1;

                    return (
                        <Button
                            key={pageNumber}
                            variant={pageNumber === page ? "default" : "outline"}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </Button>
                    );
                })}
            </div>

            <Button
                variant="outline"
                disabled={page === totalPages}
                onClick={() => onPageChange(page + 1)}
            >
                Next
            </Button>
        </div>
    );
}