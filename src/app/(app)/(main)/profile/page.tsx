import { getProfile } from "@/app/entities/profile/api/dal";
import ProfilePageClient from "@/app/pages/ProfilePageClient";
import { getUserId } from "@/app/shared/api/auth";
import { ProfileType } from "@/app/entities/profile/model/schema";

export default async function ProfilePage() {

  const userId = await getUserId();
  const user = await getProfile(userId) as ProfileType;

  return <ProfilePageClient user={user} />;
}