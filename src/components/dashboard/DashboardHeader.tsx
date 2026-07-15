
export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between border-b pb-6">
      <div>
        <h1 className="text-3xl font-bold">
          SyncDocs
        </h1>

        <p className="text-muted-foreground">
          Local First Collaborative Editor
        </p>
      </div>
    </header>
  );
}