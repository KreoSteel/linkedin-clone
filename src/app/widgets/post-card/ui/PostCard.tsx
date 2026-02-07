"use client";

import { PostAuthorRow } from "./PostAuthorRow";
import { PostContent } from "./PostContent";
import { PostFooterSkeleton } from "./PostFooterSkeleton";
import { PostCardProps } from "../model/types";

export default function PostCard({ post }: PostCardProps) {

  return (
    <article className="w-full rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3">
        <PostAuthorRow
          name={post.author.name ?? "Unknown"}
          title={undefined}
          avatarUrl={post.author.avatar}
          createdAt={post.createdAt}
          visibility={post.visibility}
          post={post}
        />
        <PostContent content={post.content} mediaType={post.mediaType} mediaUrl={post.mediaUrl} />
        <PostFooterSkeleton likes={post._count.likes} comments={post._count.comments} />
      </div>
    </article>
  );
}

