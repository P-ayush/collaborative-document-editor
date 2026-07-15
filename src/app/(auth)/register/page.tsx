import {
    FileText,
    ShieldCheck,
    Users,
    Wifi,
} from "lucide-react";

import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="hidden flex-col justify-center px-16 lg:flex">
                    <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
                        <FileText className="h-8 w-8 text-white" />
                    </div>

                    <h1 className="text-5xl font-bold">
                        SyncDocs
                    </h1>

                    <p className="mt-6 text-lg text-slate-600">
                        Create your account and start writing,
                        collaborating, syncing offline, and using
                        AI-powered document features.
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
                                    Work even without internet.
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
                                    Invite teammates securely.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="rounded-xl bg-purple-100 p-3">
                                <ShieldCheck className="h-6 w-6 text-purple-600" />
                            </div>

                            <div>
                                <h3 className="font-semibold">
                                    Secure
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Authentication, version history,
                                    and protected documents.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center p-6 lg:p-12">
                    <RegisterForm />
                </div>
            </div>
        </main>
    );
}