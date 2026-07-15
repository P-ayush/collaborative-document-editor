"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
    FileText,
} from "lucide-react";

import {
    loginSchema,
    LoginInput,
} from "@/validations/auth";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState("");

    const [showPassword, setShowPassword] =
        useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
    });

    async function onSubmit(
        data: LoginInput
    ) {
        setLoading(true);
        setError("");

        const result = await signIn(
            "credentials",
            {
                email: data.email,
                password: data.password,
                redirect: false,
            }
        );

        setLoading(false);

        if (result?.error) {
            setError(
                "Invalid email or password."
            );
            return;
        }

        router.push("/dashboard");
        router.refresh();
    }

    return (
        <Card className="w-full max-w-md rounded-2xl border shadow-2xl">
            <CardHeader className="space-y-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
                    <FileText className="h-8 w-8 text-white" />
                </div>

                <div>
                    <CardTitle className="text-3xl font-bold">
                        Welcome Back
                    </CardTitle>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Sign in to continue using
                        SyncDocs.
                    </p>
                </div>
            </CardHeader>

            <CardContent>
                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-5"
                >
                    <div className="space-y-2">
                        <Label>Email</Label>

                        <div className="relative">
                            <Mail className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                            <Input
                                type="email"
                                placeholder="you@example.com"
                                className="pl-10"
                                {...register(
                                    "email"
                                )}
                            />
                        </div>

                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {
                                    errors.email
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Password</Label>

                        <div className="relative">
                            <Lock className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                            <Input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="••••••••"
                                className="pl-10 pr-10"
                                {...register(
                                    "password"
                                )}
                            />

                            <button
                                type="button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                className="absolute right-3 top-3 text-muted-foreground hover:text-black"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {
                                    errors
                                        .password
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="h-11 w-full"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing In...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}