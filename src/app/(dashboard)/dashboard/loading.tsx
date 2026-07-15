export default function DashboardLoading() {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="h-10 w-64 rounded bg-muted" />

            <div className="flex justify-between">
                <div className="h-8 w-40 rounded bg-muted" />
                <div className="h-10 w-36 rounded bg-muted" />
            </div>

            <div className="h-10 w-full rounded bg-muted" />

            <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                    <div
                        key={item}
                        className="rounded-lg border p-5"
                    >
                        <div className="mb-3 h-6 w-48 rounded bg-muted" />
                        <div className="h-4 w-32 rounded bg-muted" />
                    </div>
                ))}
            </div>
        </div>
    );
}