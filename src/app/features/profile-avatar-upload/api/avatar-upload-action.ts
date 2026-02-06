"use server";
import { editProfileSchema } from "@/app/entities/profile";
import { editProfile } from "@/app/entities/profile/api/profile-dal";
import { getUserId } from "@/app/shared/api/auth";
import { uploadAvatarImage } from "@/app/shared/api/supabase-storage/upload-avatar-image";
import { revalidatePath } from "next/cache";
import { Result } from "@/app/types";

export const avatarUploadAction = async (
   prevState: unknown,
   formData: FormData
): Promise<Result<string>> => {
   const currentUser = await getUserId();
   if (!currentUser.success) {
      return {
         success: false,
         error: "Unauthorized",
      };
   }

   const file = formData.get("file") as File;

   if (!file || file.size === 0) {
      return {
         success: false,
         error: "File not found",
      };
   }

   try {
      const uploadedFile = await uploadAvatarImage(currentUser.data, file);
      if (!uploadedFile.success) {
         return {
            success: false,
            error: uploadedFile.error,
         };
      }

      const validatedUrl = editProfileSchema.safeParse({
         avatar: uploadedFile.data.url,
      });

      if (!validatedUrl.success) {
         return {
            success: false,
            error: "Invalid URL",
         };
      }

      const updatedUser = await editProfile(currentUser.data, validatedUrl.data);
      if (!updatedUser.success) {
         return {
            success: false,
            error: "Failed to update user avatar",
         };
      }

      revalidatePath("/");

      return {
         success: true,
         data: "Avatar uploaded successfully",
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
         error: "Failed to upload avatar",
      };
   }
};
