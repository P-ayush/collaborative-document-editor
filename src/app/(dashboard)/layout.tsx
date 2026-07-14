import SyncManager from "@/components/sync/SyncManager";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <SyncManager />

            {children}
        </>
    );
}