import { auth } from "@/app/shared/api/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
   const { pathname } = req.nextUrl;

   const protectedRoutes = ["/messages", "/network", "/jobs"];

   if (protectedRoutes.includes(pathname)) {
      const session = await auth.api.getSession({ headers: req.headers });
      if (!session?.user) {
         const loginUrl = new URL(`/login`, req.url);
         return NextResponse.redirect(loginUrl);
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|trpc|_next|_vercel|auth|.*\\..*).*)"],
};