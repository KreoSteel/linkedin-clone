"use client";

import { PostComposer } from "@/app/widgets/post-composer";
import { PostCard, type PostCardPost } from "@/app/widgets/post-card";
import { type ProfileType } from "@/app/entities/profile";
import { getAllPostsOptions } from "@/app/features/profile";
import { useQuery } from "@tanstack/react-query";

interface FeedPageClientProps {
  profile: ProfileType;
  initialPosts: PostCardPost[];
}

export default function FeedPageClient({ profile, initialPosts }: FeedPageClientProps) {
  const { data: postsData } = useQuery({
    ...getAllPostsOptions(),
    initialData: initialPosts,
  });

  return (
    <div className="flex flex-col gap-4">
      <PostComposer profile={profile} />
      <div className="flex flex-col gap-4">
        {postsData.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

