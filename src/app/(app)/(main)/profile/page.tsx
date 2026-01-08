import { getProfile } from "@/app/entities/profile/api/dal";
import ProfilePageClient from "@/app/pages/ProfilePageClient";
import { getUserId } from "@/app/shared/api/auth";

export default async function ProfilePage() {

  const userId = await getUserId();
  const user = await getProfile(userId);

  return <ProfilePageClient user={user} />;
}