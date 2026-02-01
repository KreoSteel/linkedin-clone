import { Result } from "@/app/types";
import { prisma } from "@/app/shared/api/prisma";
import { PostVisibility, Prisma } from "@/generated/prisma/client";
import { TPost, TPostWithAuthor } from "../model/post-schema";

export const postSelect = {
    id: true,
    authorId: true,
    content: true,
    mediaType: true,
    mediaUrl: true,
    visibility: true,
    createdAt: true,
    updatedAt: true,
    author: {
        select: {
            id: true,
            name: true,
            avatar: true,
            email: true,
        },
    },
    _count: {
        select: {
            likes: true,
            comments: true,
        },
    }
} satisfies Prisma.PostSelect;


export const getAllPosts = async (): Promise<Result<TPostWithAuthor[]>> => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                visibility: PostVisibility.PUBLIC,
            },
            select: postSelect,
            orderBy: {
                createdAt: "desc",
            },
        });

        return {
            success: true,
            data: posts,
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
}

export const getUserPosts = async (userId: string): Promise<Result<TPost[]>> => {
    try {
        if (!userId) {
            return {
                success: false,
                error: "User ID is required",
            };
        }

        const posts = await prisma.post.findMany({
            where: {
                authorId: userId,
            },
            select: postSelect,
            orderBy: {
                createdAt: "desc",
            },
        });

        return {
            success: true,
            data: posts,
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
            error: "Failed to get user posts",
        };
    }
}

export const getPostById = async (postId: string): Promise<Result<TPost>> => {
    try {
        if (!postId) {
            return {
                success: false,
                error: "Post ID is required",
            };
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId,
            },
            select: postSelect,
        });

        if (!post) {
            return {
                success: false,
                error: "Post not found",
            };
        }

        return {
            success: true,
            data: post,
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
            error: "Failed to get post by id",
        };
    }
}
