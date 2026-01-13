import { getProfile } from "@/app/entities/profile/api/profile-dal";
import ProfilePageClient from "@/app/pages/ProfilePageClient";
import { getUserId } from "@/app/shared/api/auth";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

  const userId = await getUserId();
  if (!userId.success) {
    redirect("/login");
  }

  const user = await getProfile(userId.data);
  if (!user.success) {
    redirect("/login");
  }

  return <ProfilePageClient user={user.data as ProfileType} />;
}