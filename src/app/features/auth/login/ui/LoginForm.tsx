"use client";

import { useActionState } from "react";
import { loginAction } from "../api/login-action";
import { Button, Label } from "@/app/shared/ui";
import { Input } from "@/app/shared/ui";
import { useStateToast } from "@/app/shared/utils/use-state-toast";

export default function LoginForm() {
    const [state, formAction, isPending] = useActionState(loginAction, undefined);

    useStateToast(state, "/");

    return (
        <form action={formAction} className="flex flex-col gap-2 w-72">
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