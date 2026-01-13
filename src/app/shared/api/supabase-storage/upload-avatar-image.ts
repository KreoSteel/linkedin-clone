import { createAdminClient } from "@/app/shared/api/supabase/admin";
import { Result } from "@/app/types";

export const uploadAvatarImage = async (
   userId: string,
   file: File
): Promise<Result<{ url: string }, string>> => {
   const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
   const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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

   const fileName = `${userId}-${Date.now()}-${file.name}`;

   const supabase = createAdminClient();

   const { error } = await supabase.storage
      .from("profile_avatars")
      .upload(fileName, file);
   if (error) {
      return {
         success: false,
         error: error.message,
      };
   }

   const { data: url } = supabase.storage
      .from("profile_avatars")
      .getPublicUrl(fileName);

   return {
      success: true,
      data: { url: url.publicUrl },
   };
};
