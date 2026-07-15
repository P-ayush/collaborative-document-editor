import {
  FileText,
  ShieldCheck,
  Users,
  Wifi,
} from "lucide-react";

import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden flex-col justify-center px-16 lg:flex">
          <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 shadow-lg">
            <FileText className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-5xl font-bold leading-tight text-slate-900">
            SyncDocs
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            A local-first collaborative document editor with
            offline support, real-time collaboration, version
            history, AI-powered summaries, and seamless syncing.
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-blue-100 p-3">
                <Wifi className="h-6 w-6 text-blue-600" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Offline First
                </h3>

                <p className="text-sm text-slate-500">
                  Continue editing even without internet.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-100 p-3">
                <Users className="h-6 w-6 text-green-600" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Collaboration
                </h3>

                <p className="text-sm text-slate-500">
                  Invite teammates with role-based access.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-purple-100 p-3">
                <ShieldCheck className="h-6 w-6 text-purple-600" />
              </div>

              <div>
                <h3 className="font-semibold">
                  Secure & Reliable
                </h3>

                <p className="text-sm text-slate-500">
                  Version history, authentication, and automatic syncing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center p-6 lg:p-12">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}