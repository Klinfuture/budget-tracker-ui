"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import Feature from "@/components/feature";

const resetSchema = z.object({
    email: z.string().email("Please enter a valid email"),
});

type ResetForm = z.infer<typeof resetSchema>;

export default function ResetPassword() {
    const [status, setStatus] = React.useState<null | "idle" | "sent" | "error">(null);
    const [serverError, setServerError] = React.useState<string | null>(null);

    const form = useForm<ResetForm>({
        resolver: zodResolver(resetSchema),
        defaultValues: { email: "" },
    });

    const isLoading = form.formState.isSubmitting;

    async function onSubmit(data: ResetForm) {
        setServerError(null);
        setStatus("idle");
        try {
            await sendPasswordResetEmail(auth, data.email);
            setStatus("sent");
        } catch (err: any) {
            setServerError(err?.message || "Failed to send reset email");
            setStatus("error");
        }
    }

    return (
        <Feature>
            <div className="max-w-md mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-card p-6 rounded-lg shadow-sm">
                        <h2 className="text-lg font-semibold">Reset your password</h2>

                        {status === "sent" ? (
                            <div className="text-sm text-foreground bg-accent/5 p-3 rounded-md">
                                If an account with that email exists, you should receive a password reset email shortly.
                            </div>
                        ) : null}

                        {serverError && (
                            <div className="text-destructive text-sm bg-destructive/10 p-3 rounded-md">{serverError}</div>
                        )}

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-2">
                            <Button type="submit" disabled={isLoading} className="flex-1">
                                {isLoading ? "Sending..." : "Send reset email"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Feature>
    );
}
