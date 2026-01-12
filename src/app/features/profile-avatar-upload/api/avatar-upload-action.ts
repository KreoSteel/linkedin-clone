"use server";
import { editProfile, editProfileSchema } from "@/app/entities/profile";
import { getUserId } from "@/app/shared/api/auth";
import { uploadAvatarImage } from "@/app/shared/api/supabase-storage/upload-avatar-image";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const avatarUploadAction = async (
   prevState: unknown,
   formData: FormData
) => {
   const currentUser = await getUserId();
   if (!currentUser) {
      throw new Error("Unauthorized");
   }

   const file = formData.get("file") as File;

   if (file.size === 0) {
      throw new Error("File not found");
   }

   if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds the maximum allowed size of 5MB");
   }

   if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(
         "Invalid file type. Allowed types are: " +
            ALLOWED_FILE_TYPES.join(", ")
      );
   }

   try {
      const uploadedFile = await uploadAvatarImage(currentUser, file);
      if (!uploadedFile.success) {
         throw new Error(uploadedFile.message);
      }

      const validatedUrl = editProfileSchema.safeParse({
         avatar: uploadedFile.url,
      });

      if (!validatedUrl.success) {
         throw new Error("Invalid URL");
      }

      const updatedUser = await editProfile(currentUser, validatedUrl.data);
      if (!updatedUser) {
         throw new Error("Failed to update user avatar");
      }

      revalidatePath("/");

      return {
         success: true,
         message: "Avatar uploaded successfully",
      };
   } catch (error) {
      if (error instanceof Error) {
         return {
            error: error.message,
         };
      }
      return {
         error: "Failed to upload avatar",
      };
   }
};
