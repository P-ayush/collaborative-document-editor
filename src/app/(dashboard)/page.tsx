import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        Welcome, {session?.user?.name}
      </h1>

      <p className="mt-2 text-muted-foreground">
        Local-first collaborative document editor
      </p>
    </div>
  );
}