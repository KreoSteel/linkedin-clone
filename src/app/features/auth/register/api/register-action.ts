"use server";
import { auth } from "@/app/shared/api/auth";
import { registerSchema } from "../model/register-schema";
import { redirect } from "next/navigation";
import { Result } from "@/app/types";

export const registerAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
   const validatedData = registerSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!validatedData.success) {
      return {
         success: false,
         error: "Invalid data:" + validatedData.error.issues.map((issue) => issue.message).join(", "),
      };
   }

   
   try {
      const name = `${validatedData.data.firstName} ${validatedData.data.lastName}`.trim();
      await auth.api.signUpEmail({
         body: {
            name,
            email: validatedData.data.email,
            password: validatedData.data.password,
            firstName: validatedData.data.firstName,
            lastName: validatedData.data.lastName,
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
         error: "Failed to register user",
      };
   }
   
   redirect("/");
};
