import { getUserId } from "@/app/shared/api/auth";
import { getProfile } from "@/app/entities/profile/api/profile-dal";
import { redirect } from "next/navigation";
import FeedSidebar from "@/app/pages/feed/ui/FeedSidebar";
import FeedPageClient from "@/app/pages/feed/ui/FeedPageClient";
import { getAllPostsAction } from "@/app/entities/post/api/GET-posts-action";
import type { ProfileType } from "@/app/entities/profile/model/profile-schema";

export default async function Home() {
  const userId = await getUserId();
  if (!userId.success) {
    redirect("/login");
  }

  const profile = await getProfile(userId.data);
  if (!profile.success) {
    redirect("/login");
  }

  const postsResult = await getAllPostsAction();
  const initialPosts = postsResult.success ? postsResult.data : [];

  return (
    <div className="flex h-full max-w-7xl gap-6 px-6 py-6 mx-auto">
      <FeedSidebar userId={userId.data} initialProfile={profile.data as ProfileType} />
      <main className="flex flex-1 max-w-2xl flex-col gap-4">
        <FeedPageClient profile={profile.data} initialPosts={initialPosts} />
      </main>
    </div>
  );
}
