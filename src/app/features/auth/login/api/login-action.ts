"use server";
import { auth } from "@/app/shared/api/auth";
import { loginSchema } from "../model/login-schema";
import { redirect } from "next/navigation";

export async function loginAction(prevState: unknown, formData: FormData) {
   const validatedData = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!validatedData.success) {
      return {
         error: validatedData.error,
      };
   }

   try {
      await auth.api.signInEmail({
         body: {
            email: validatedData.data.email,
            password: validatedData.data.password,
         },
      });
   } catch (error) {
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Failed to login",
      };
   }
   
   redirect("/");
}
