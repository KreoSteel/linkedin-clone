
import ProfileCard from "@/app/widgets/profile-card/ui/ProfileCard";
import { getUserId } from "@/app/shared/api/auth";
import { getProfile } from "@/app/entities/profile/api/profile-dal";
import { redirect } from "next/navigation";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import ConnectionsCard from "@/app/features/connections-card/ui/ConnectionsCard";
import PostComposer from "@/app/widgets/post-composer/ui/PostComposer";

export default async function Home() {
  const userId = await getUserId();
  if (!userId.success) {
    redirect("/login");
  }
  
  const user = await getProfile(userId.data);
  if (!user.success) {
    redirect("/login");
  }

  return (
    <div className="flex gap-6 px-6 py-6 max-w-7xl mx-auto h-full">
      <aside className="w-56 shrink-0 flex flex-col gap-4">
        <ProfileCard profile={user.data as ProfileType} isForFeed={true} />
        <ConnectionsCard />
      </aside>
      
      <main className="flex-1 max-w-2xl flex flex-col gap-4">
        <PostComposer profile={user.data as ProfileType} />
      </main>
    </div>
  );
}
