"use client";
import { Button, Input, Label } from "@/app/shared/ui";
import Link from "next/link";
import { useActionState } from "react";
import { registerAction } from "../api/register-action";
import { useStateToast } from "@/app/shared/utils/use-state-toast";

export default function RegisterForm() {
   const [state, formAction, isPending] = useActionState(registerAction, undefined);

   useStateToast(state, "/");

   return (
      <form action={formAction} className="flex flex-col gap-2 w-72">
         <div>
            <Label>First Name</Label>
            <Input
               type="text"
               name="firstName"
               variant="bottomBorder"
               required
            />
         </div>
         <div>
            <Label className="text-sm font-medium">Last Name</Label>
            <Input
               type="text"
               name="lastName"
               variant="bottomBorder"
               required
            />
         </div>
         <div>
            <Label className="text-sm font-medium">Email</Label>
            <Input type="email" name="email" variant="bottomBorder" required />
         </div>
         <div>
            <Label className="text-sm font-medium">Password</Label>
            <Input
               type="password"
               name="password"
               variant="bottomBorder"
               required
            />
         </div>
         <Button
            className="w-full mt-4 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isPending}>
            {isPending ? "Creating account..." : "Create Account"}
         </Button>
         <div className="flex items-center gap-2">
            <div className="h-px w-full bg-neutral-300" />
            <span className="text-neutral-500">or</span>
            <div className="h-px w-full bg-neutral-300" />
         </div>
         <Button className="w-full" variant="outline" disabled={isPending}>
            Continue with Google
         </Button>
         <Button className="w-full" variant="outline" disabled={isPending}>
            Continue with Facebook
         </Button>
         <div className="flex items-center gap-2 mt-4 justify-center">
            <span className="text-sm text-neutral-500">
               Already on LinkedIn?
            </span>
            <Link
               href="/login"
               className="text-sm text-primary-500 hover:underline">
               Sign in
            </Link>
         </div>
      </form>
   );
}
