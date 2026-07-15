import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

import SyncManager from "@/components/sync/SyncManager";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col">
            <SyncManager />

            <Navbar />

            <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}