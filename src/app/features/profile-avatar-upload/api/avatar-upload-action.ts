"use server";
import { editProfile, editProfileSchema } from "@/app/entities/profile";
import { getUserId } from "@/app/shared/api/auth";
import { uploadAvatarImage } from "@/app/shared/api/supabase-storage/upload-avatar-image";
import { revalidatePath } from "next/cache";
import { Result } from "@/app/types";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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

   if (file.size === 0) {
      return {
         success: false,
         error: "File not found",
      };
   }

   if (file.size > MAX_FILE_SIZE) {
      return {
         success: false,
         error: "File size exceeds the maximum allowed size of 5MB",
      };
   }

   if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return {
         success: false,
         error:
            "Invalid file type. Allowed types are: " +
            ALLOWED_FILE_TYPES.join(", "),
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
