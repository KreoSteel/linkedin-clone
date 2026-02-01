"use server";

import { getAllPosts } from "@/app/entities/post/api/GET-post-dal";
import { TPostWithAuthor } from "@/app/entities/post/model/post-schema";
import { Result } from "@/app/types";

// TODO: Add pagination
export const getAllPostsAction = async (): Promise<Result<TPostWithAuthor[]>> => {
    try {
        const posts = await getAllPosts();

        return {
            success: true,
            data: posts.success ? posts.data : [],
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
            error: "Failed to get all posts",
        };
    }
};
