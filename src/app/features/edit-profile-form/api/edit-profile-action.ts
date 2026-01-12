"use server";

import { editProfile, editProfileSchema } from "@/app/entities/profile";
import { getUserId } from "@/app/shared/api/auth";
import { revalidatePath } from "next/cache";

export const editProfileAction = async (
   prevState: unknown,
   formData: FormData
) => {
   const userId = await getUserId();

   if (!userId) {
      throw new Error("User not found");
   }

   const validatedData = editProfileSchema.safeParse({
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      headline: formData.get("headline"),
      location: formData.get("location"),
      email: formData.get("email"),
   });

   if (!validatedData.success) {
      return {
         error: { issues: validatedData.error.issues },
      };
   }

   try {
      await editProfile(userId, validatedData.data);
      revalidatePath("/profile");

      return {
         success: true,
         message: "Profile updated successfully",
      };
   } catch (error) {
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Failed to edit profile",
      };
   }
};
