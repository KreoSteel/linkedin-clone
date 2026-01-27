import { PostMediaType, PostVisibility } from "@/generated/prisma/enums";
import { z } from "zod";


export const postSchema = z.object({
    id: z.string(),
    authorId: z.string(),
    content: z.string().min(1, { message: "Content is required" }).max(2600, { message: "Content must be less than 2600 characters" }),
    mediaType: z.enum([PostMediaType.IMAGE, PostMediaType.VIDEO]).nullable(),
    mediaUrl: z.url().nullable(),
    visibility: z.enum([PostVisibility.PUBLIC, PostVisibility.CONNECTIONS, PostVisibility.PRIVATE]).default(PostVisibility.PUBLIC),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const createPostSchema = postSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

export const updatePostSchema = createPostSchema.partial().omit({ authorId: true });



export const postAuthorSchema = z.object({
    id: z.string(),
    name: z.string().max(100, { message: "Author name must be less than 100 characters" }).nullable(),
    avatar: z.url().nullable(),
    email: z.email({ message: "Invalid email address" }),
});

export const postCountsSchema = z.object({
    likes: z.number(),
    comments: z.number(),
});

export const postWithAuthorSchema = postSchema.extend({
    author: postAuthorSchema,
    _count: postCountsSchema,
})

export type TPost = z.infer<typeof postSchema>;
export type TCreatePost = z.infer<typeof createPostSchema>;
export type TUpdatePost = z.infer<typeof updatePostSchema>;
export type TPostAuthor = z.infer<typeof postAuthorSchema>;
export type TPostCounts = z.infer<typeof postCountsSchema>;
export type TPostWithAuthor = z.infer<typeof postWithAuthorSchema>;