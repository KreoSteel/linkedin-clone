"use server";
import { auth } from "@/app/shared/api/auth";
import { registerSchema } from "../model/register-schema";

export const registerAction = async (prevState: unknown, formData: FormData) => {
   const validatedData = registerSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
   });

   if (!validatedData.success) {
      return {
         error: validatedData.error,
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
      return {
         success: true,
         message: "User registered successfully",
      };
   } catch (error) {
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Failed to register user",
      };
   }
};
