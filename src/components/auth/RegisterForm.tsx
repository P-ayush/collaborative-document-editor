"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
    User,
    FileText,
} from "lucide-react";

import {
    registerSchema,
    RegisterInput,
} from "@/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [isError, setIsError] =
        useState(false);

    const [showPassword, setShowPassword] =
        useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterInput>({
        resolver: zodResolver(
            registerSchema
        ),
    });

    async function onSubmit(
        data: RegisterInput
    ) {
        try {
            setLoading(true);
            setMessage("");
            setIsError(false);

            const response = await fetch(
                "/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify(data),
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message
                );
            }

            setIsError(false);

            setMessage(
                "Account created successfully! Redirecting to login..."
            );

            reset();

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            setIsError(true);

            if (
                error instanceof Error
            ) {
                setMessage(
                    error.message
                );
            } else {
                setMessage(
                    "Something went wrong."
                );
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md rounded-2xl border shadow-2xl">
            <CardHeader className="space-y-5 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600">
                    <FileText className="h-8 w-8 text-white" />
                </div>

                <div>
                    <CardTitle className="text-3xl font-bold">
                        Create Account
                    </CardTitle>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Join SyncDocs and
                        start collaborating.
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
                        <Label>Name</Label>

                        <div className="relative">
                            <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

                            <Input
                                placeholder="John Doe"
                                className="pl-10"
                                {...register(
                                    "name"
                                )}
                            />
                        </div>

                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {
                                    errors.name
                                        .message
                                }
                            </p>
                        )}
                    </div>

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
                        <Label>
                            Password
                        </Label>

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

                    {message && (
                        <div
                            className={`rounded-lg border p-3 text-sm ${isError
                                ? "border-red-300 bg-red-50 text-red-700"
                                : "border-green-300 bg-green-50 text-green-700"
                                }`}
                        >
                            {message}
                        </div>
                    )}

                    <Button
                        className="h-11 w-full"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                        Already have an
                        account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}