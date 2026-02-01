import { TPostWithAuthor } from "@/app/entities/post/model/post-schema";

export type PostCardPost = TPostWithAuthor;

export interface PostCardProps {
  post: PostCardPost;
}

