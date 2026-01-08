"use client";

import { useState } from "react";
import { Button, Label } from "@/app/shared/ui";
import { Input } from "@/app/shared/ui";
import { authClient } from "@/app/shared/api/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
    const [isPending, setIsPending] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await authClient.signIn.email({
                email,
                password,
            });

            toast.success("Login successful");
            router.push("/");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Failed to login");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-72">
            <div>
                <Label>Email</Label>
                <Input type="email" name="email" variant="bottomBorder" required />
            </div>
            <div>
                <Label>Password</Label>
                <Input type="password" name="password" variant="bottomBorder" required />
            </div>
            <Button className="w-full mt-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isPending}>
                {isPending ? "Logging in..." : "Login"}
            </Button>
        </form>
    )
}