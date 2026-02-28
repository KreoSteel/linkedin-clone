"use server"
import { deletePost } from "@/app/entities/post/api/GET-post-dal";
import { getUserId } from "@/app/shared/api/auth";
import { Result } from "@/app/types";
import { revalidatePath } from "next/cache";


export async function deletePostAction(prevState: unknown, formData: FormData): Promise<Result<string>> {
    const userId = await getUserId();
    if (!userId.success) {
        return { success: false, error: "Unauthorized" }
    }

    const postId = formData.get("id") as string

    try {
        const result = await deletePost(userId.data, postId);

        if (!result.success) {
            return { success: false, error: result.error }
        }

        revalidatePath("/post")

        return { success: true, data: "Post deleted successfully" }
    } catch (error) {
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }

        return { success: false, error: "Failed to delete post" }
    }

}