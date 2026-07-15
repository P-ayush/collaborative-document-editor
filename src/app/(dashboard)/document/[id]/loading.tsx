export default function Loading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-8 w-72 rounded-md bg-muted" />
          <div className="h-4 w-24 rounded-md bg-muted" />
        </div>

        <div className="flex gap-3">
          <div className="h-10 w-24 rounded-md bg-muted" />
          <div className="h-10 w-24 rounded-md bg-muted" />
        </div>
      </div>

      <div className="h-[650px] rounded-xl border bg-muted" />
    </div>
  );
}