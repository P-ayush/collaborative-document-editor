"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { FileText, LayoutDashboard, Sparkles, LogOut } from "lucide-react";

import ConnectionStatus from "@/components/common/ConnectionStatus";
import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Link
                    href="/"
                    className="flex items-center gap-2"
                >
                    <FileText className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-bold">
                        SyncDocs
                    </span>
                </Link>

                <nav className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>

                    <Link
                        href="/ai"
                        className="flex items-center gap-2 text-sm hover:text-primary"
                    >
                        <Sparkles className="h-4 w-4" />
                        AI
                    </Link>
                </nav>

                <div className="flex items-center gap-4">
                    <ConnectionStatus />

                    <span className="text-sm font-medium">
                        {session?.user?.name}
                    </span>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => signOut()}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}