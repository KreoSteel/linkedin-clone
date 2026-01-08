import { betterAuth } from "better-auth";
import { prisma } from "@/app/shared/api/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
   database: prismaAdapter(prisma, {
      provider: "postgresql",
   }),
   emailAndPassword: {
      enabled: true,
   },
   plugins: [nextCookies()],
});

export const getUserId = async () => {
   const session = await auth.api.getSession({
      headers: await headers(),
   });
   
   if (!session?.user?.id) {
      redirect("/login");
   }

   return session.user.id;
};
