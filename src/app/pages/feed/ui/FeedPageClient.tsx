"use client";

import PostComposer from "@/app/widgets/post-composer/ui/PostComposer";
import PostCard from "@/app/widgets/post-card/ui/PostCard";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { PostCardPost } from "@/app/widgets/post-card/model/types";
import { getAllPostsOptions } from "@/app/entities/post/api/post-query-options";
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

