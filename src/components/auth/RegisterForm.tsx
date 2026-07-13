"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterInput } from "@/validations/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(data: RegisterInput) {
        try {
            setLoading(true);
            setMessage("");

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message);
            }

            setMessage("Registration successful!");
            reset();
        } catch (error) {
            if (error instanceof Error) {
                setMessage(error.message);
            } else {
                setMessage("Something went wrong.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <Label>Name</Label>

                        <Input
                            placeholder="John Doe"
                            {...register("name")}
                        />

                        <p className="text-sm text-red-500 mt-1">
                            {errors.name?.message}
                        </p>
                    </div>

                    <div>
                        <Label>Email</Label>

                        <Input
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                        />

                        <p className="text-sm text-red-500 mt-1">
                            {errors.email?.message}
                        </p>
                    </div>

                    <div>
                        <Label>Password</Label>

                        <Input
                            type="password"
                            placeholder="********"
                            {...register("password")}
                        />

                        <p className="text-sm text-red-500 mt-1">
                            {errors.password?.message}
                        </p>
                    </div>

                    {message && (
                        <p className="text-sm text-center">{message}</p>
                    )}

                    <Button
                        className="w-full"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? "Creating..." : "Create Account"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}