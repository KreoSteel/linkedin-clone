"use server";
import { createPostSchema } from "@/app/entities/post";
import { createPost } from "@/app/entities/post/api/WRITE-post-dal";
import { getUserId } from "@/app/shared/api/auth";
import { uploadMediaFeed } from "@/app/shared/api/supabase-storage/upload-media-feed";
import { Result } from "@/app/types";
import { PostMediaType, PostVisibility } from "@/generated/prisma/enums";
import { revalidatePath } from "next/cache";

export const createPostAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
    const userId = await getUserId();
    if (!userId.success) {
        return {
            success: false,
            error: "Unauthorized"
        }
    }

    const content = formData.get("content") as string;
    const visibility = formData.get("visibility") as PostVisibility;
    const file = formData.get("file") as File | null;

    if (!content || content.trim().length === 0) {
        return {
            success: false,
            error: "Post content is required"
        }
    }

    try {
        let mediaUrl: string | null = null;
        let mediaType: PostMediaType | null = null;

        if (file && file.size > 0) {
            const uploadResult = await uploadMediaFeed(userId.data, file);
            
            if (!uploadResult.success) {
                return {
                    success: false,
                    error: uploadResult.error
                }
            }

            mediaUrl = uploadResult.data.url;
            mediaType = file.type.startsWith("image/") 
                ? PostMediaType.IMAGE 
                : PostMediaType.VIDEO;
        }

        const validatedData = createPostSchema.safeParse({
            authorId: userId.data,
            content,
            mediaType,
            mediaUrl,
            visibility,
        })

        if (!validatedData.success) {
            return {
                success: false,
                error: "Invalid data: " + validatedData.error.issues.map((issue) => issue.message).join(", "),
            }
        }

        const createdPost = await createPost(userId.data, validatedData.data);
        if (!createdPost.success) {
            return {
                success: false,
                error: createdPost.error,
            }
        }

        revalidatePath("/");

        return {
            success: true,
            data: "Post created successfully",
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            }
        }
        return {
            success: false,
            error: "Failed to create post",
        }
    }
}