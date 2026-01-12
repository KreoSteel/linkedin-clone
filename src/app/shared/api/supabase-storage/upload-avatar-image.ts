import { createAdminClient } from "@/app/shared/api/supabase/admin";

export const uploadAvatarImage = async (userId: string, file: File) => {
   const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
   const ALLOWED_FILE_TYPES = [
      "image/jpeg",
      "image/png",
      "image/webp",
   ];

   if (file.size > MAX_FILE_SIZE) {
      throw new Error("File size exceeds the maximum allowed size of 5MB");
   }

   if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      throw new Error(
         "Invalid file type. Allowed types are: " +
            ALLOWED_FILE_TYPES.join(", ")
      );
   }

   const fileName = `${userId}-${Date.now()}-${file.name}`;

   const supabase = createAdminClient();
   
   const { error } = await supabase.storage
      .from("profile_avatars")
      .upload(fileName, file);
   if (error) {
      throw new Error(error.message);
   }

   const { data: url } = supabase.storage
      .from("profile_avatars")
      .getPublicUrl(fileName);

   return {
      success: true,
      url: url.publicUrl,
      message: "Avatar image uploaded successfully",
   };
};
