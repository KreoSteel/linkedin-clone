import { Result } from "@/app/types";
import { prisma } from "@/app/shared/api/prisma";
import { TCreatePost, TPostWithAuthor, TUpdatePost } from "../model/post-schema";
import { postSelect } from "./GET-post-dal";

export const createPost = async (userId: string, post: TCreatePost): Promise<Result<TPostWithAuthor>> => {
    try {
        const newPost = await prisma.post.create({
            data: {
                ...post,
                authorId: userId,
            },
            select: postSelect,
        })

        return {
            success: true,
            data: newPost
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Failed to create post",
        };
    }
}


export const updatePost = async (postId: string, userId: string, post: TUpdatePost): Promise<Result<TPostWithAuthor>> => {
    try {
        const existingPost = await prisma.post.findFirst({
            where: {
                id: postId,
                authorId: userId,
            },
        });

        if (!existingPost) {
            return {
                success: false,
                error: "Post not found",
            };
        }

        const updatedPost = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                ...(post.content && { content: post.content }),
                ...(post.mediaType && { mediaType: post.mediaType }),
                ...(post.mediaUrl && { mediaUrl: post.mediaUrl }),
                ...(post.visibility && { visibility: post.visibility }),
            },
            select: postSelect,
        })

        return {
            success: true,
            data: updatedPost,
        }
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
}
