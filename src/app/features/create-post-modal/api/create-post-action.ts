"use server";
import { createPost } from "@/app/entities/post/api/WRITE-post-dal";
import { createPostSchema } from "@/app/entities/post/model/post-schema";
import { getUserId } from "@/app/shared/api/auth";
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

    const mediaTypeValue = formData.get("mediaType");
    const validatedData = createPostSchema.safeParse({
        authorId: userId.data,
        content: formData.get("content"),
        mediaType: mediaTypeValue ? (mediaTypeValue as PostMediaType) : null,
        mediaUrl: formData.get("mediaUrl") || null,
        visibility: formData.get("visibility") as PostVisibility,
    })

    if (!validatedData.success) {
        return {
            success: false,
            error: "Invalid data: " + validatedData.error.issues.map((issue) => issue.message).join(", "),
        }
    }

    try {
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