"use server";

import { redirect } from "next/navigation";
import { auth } from "@/app/shared/api/auth";
import { headers } from "next/headers";

export async function signOutAction() {
   await auth.api.signOut({
      headers: await headers(),
   });

   redirect("/login");
}