"use server";

import { editProfile, editProfileSchema } from "@/app/entities/profile";
import { getUserId } from "@/app/shared/api/auth";
import { revalidatePath } from "next/cache";
import { Result } from "@/app/types";

export const editProfileAction = async (
   prevState: unknown,
   formData: FormData
): Promise<Result<string>> => {
   const userId = await getUserId();

   if (!userId.success) {
      return {
         success: false,
         error: "User not found",
      };
   }

   const validatedData = editProfileSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      headline: formData.get("headline"),
      location: formData.get("location"),
      biography: formData.get("biography"),
      email: formData.get("email"),
   });

   if (!validatedData.success) {
      return {
         success: false,
         error:
            "Invalid data: " +
            validatedData.error.issues.map((issue) => issue.message).join(", "),
      };
   }

   try {
      await editProfile(userId.data, validatedData.data);
      revalidatePath("/profile");

      return {
         success: true,
         data: "Profile updated successfully",
      };
   } catch (error) {
      if (error instanceof Error) {
         return {
            success: false,
            error: error.message,
         };
      }
      return {
         success: false,
         error: "Failed to edit profile",
      };
   }
};
