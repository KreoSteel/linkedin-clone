import { Result } from "@/app/types";
import { createAdminClient } from "../supabase/admin";
import { randomUUID } from "crypto";

export const uploadMediaFeed = async (
    userId: string,
    file: File
): Promise<Result<{ url: string }, string>> => {
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
    const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    const ALLOWED_VIDEO_TYPES = ["video/mp4", "video/webm"];

    const isImageType = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideoType = ALLOWED_VIDEO_TYPES.includes(file.type);


    if (!isImageType && !isVideoType) {
        return {
            success: false,
            error: "Invalid file type. Allowed types are: " + ALLOWED_IMAGE_TYPES.join(", ") + " and " + ALLOWED_VIDEO_TYPES.join(", "),
        };
    }

    if (isImageType && file.size > MAX_IMAGE_SIZE) {
        return {
            success: false,
            error: "Image size exceeds the maximum allowed size of 10MB",
        };
    }

    if (isVideoType && file.size > MAX_VIDEO_SIZE) {
        return {
            success: false,
            error: "Video size exceeds the maximum allowed size of 100MB",
        };
    }

    const fileExtension = file.name.split('.').pop();
    const uniqueId = randomUUID();
    const fileName = `${userId}/${uniqueId}-${Date.now()}.${fileExtension}`;

    const supabase = createAdminClient();

    const { error: uploadError } = await supabase.storage
        .from("post-media")
        .upload(fileName, file, {
            cacheControl: "3600",
            upsert: false,
        });

    if (uploadError) {
        return {
            success: false,
            error: uploadError.message,
        };
    }

    const { data: urlData } = supabase.storage
        .from("post-media")
        .getPublicUrl(fileName);

    return {
        success: true,
        data: { url: urlData.publicUrl },
    };
}