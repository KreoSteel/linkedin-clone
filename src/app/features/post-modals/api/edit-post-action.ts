"use server";
import { Result } from "@/app/types";
import { getUserId } from "@/app/shared/api/auth";
import { getPostById } from "@/app/entities/post/api/GET-post-dal";
import { PostMediaType, PostVisibility } from "@/generated/prisma/enums";
import { uploadMediaFeed } from "@/app/shared/api/supabase-storage/upload-media-feed";
import { updatePostSchema } from "@/app/entities/post";
import { updatePost } from "@/app/entities/post/api/WRITE-post-dal";
import { revalidatePath } from "next/cache";

export const editPostAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
    const userId = await getUserId();
    if (!userId.success) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    const postId = formData.get("id") as string;
    const existingPost = await getPostById(postId);
    if (!existingPost.success) {
        return {
            success: false,
            error: existingPost.error,
        };
    }

    const content = formData.get("content") as string;
    const visibility = formData.get("visibility") as PostVisibility;
    const file = formData.get("file") as File | null;
    const removeMedia = formData.get("removeMedia") === "true";

    if (!content || content.trim().length === 0) {
        return {
            success: false,
            error: "Post content is required",
        };
    }

    try {
        let mediaUrl: string | null = existingPost.data.mediaUrl;
        let mediaType: PostMediaType | null = existingPost.data.mediaType;

        if (removeMedia) {
            mediaUrl = null;
            mediaType = null;
        }
        if (file && file.size > 0) {
            const uploadResult = await uploadMediaFeed(userId.data, file);
            if (!uploadResult.success) {
                return {
                    success: false,
                    error: uploadResult.error,
                };
            }

            mediaUrl = uploadResult.data.url;
            mediaType = file.type.startsWith("image/") ? PostMediaType.IMAGE : PostMediaType.VIDEO;
        }

        const validatedData = updatePostSchema.safeParse({
            content,
            visibility,
            mediaType,
            mediaUrl,
        });

        if (!validatedData.success) {
            return {
                success: false,
                error: "Invalid data: " + validatedData.error.issues.map((issue) => issue.message).join(", "),
            };
        }

        const updatedPost = await updatePost(postId, userId.data, validatedData.data);
        if (!updatedPost.success) {
            return {
                success: false,
                error: updatedPost.error,
            };
        }

        revalidatePath("/");

        return {
            success: true,
            data: "Post updated successfully",
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
            error: "Failed to update post",
        };
    }
};
