import { betterAuth } from "better-auth";
import { prisma } from "@/app/shared/api/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { nextCookies } from "better-auth/next-js";
import { Result } from "@/app/types";

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: "postgresql",
   }),
   emailAndPassword: {
      enabled: true,
   },
   plugins: [nextCookies()],
});

export const getUserId = async (): Promise<Result<string>> => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });

   if (!session?.user?.id) {
      redirect("/login");
   }

   return {
      success: true,
      data: session.user.id,
   };
};
