"use server";
import { auth } from "@/app/shared/api/auth";
import { loginSchema } from "../model/login-schema";
import { redirect } from "next/navigation";
import { Result } from "@/app/types";
export async function loginAction(prevState: unknown, formData: FormData): Promise<Result<string>> {
   const validatedData = loginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!validatedData.success) {
      return {
         success: false,
         error: "Invalid data: " + validatedData.error.issues.map((issue) => issue.message).join(", "),
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
            success: false,
            error: error.message,
         };
      }
      return {
         success: false,
         error: "Failed to login",
      };
   }
   
   redirect("/");
   
}
