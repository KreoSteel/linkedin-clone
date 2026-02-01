import { getUserId } from "@/app/shared/api/auth";
import { getProfile } from "@/app/entities/profile/api/profile-dal";
import { redirect } from "next/navigation";
import FeedSidebar from "@/app/pages/feed/ui/FeedSidebar";
import FeedPageClient from "@/app/pages/feed/ui/FeedPageClient";
import { getAllPostsAction } from "@/app/entities/post/api/GET-posts-action";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";

export default async function Home() {
  const userId = await getUserId();
  if (!userId.success) {
    redirect("/login");
  }

  const user = await getProfile(userId.data);
  if (!user.success) {
    redirect("/login");
  }

  const postsResult = await getAllPostsAction();
  const initialPosts = postsResult.success ? postsResult.data : [];

  return (
    <div className="flex h-full max-w-7xl gap-6 px-6 py-6 mx-auto">
      <FeedSidebar userId={userId.data} initialProfile={user.data} />
      <main className="flex flex-1 max-w-2xl flex-col gap-4">
        <FeedPageClient profile={user.data as ProfileType} initialPosts={initialPosts} />
      </main>
    </div>
  );
}
