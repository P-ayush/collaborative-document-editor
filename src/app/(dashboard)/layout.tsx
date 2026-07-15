import SyncManager from "@/components/sync/SyncManager";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/common/Footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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