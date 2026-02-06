
import ProfilePageClient from "@/app/pages/profile/ProfilePageClient";
import { getUserId } from "@/app/shared/api/auth";
import { redirect } from "next/navigation";
import { getProfileData } from "@/app/features/profile/api/get-profile-data";
import { User } from "@/generated/prisma/client";

export default async function ProfilePage() {
   const userId = await getUserId();
   if (!userId.success) {
      redirect("/login");
   }
   const profileData = await getProfileData(userId.data);
   if (!profileData.success) {
      redirect("/login");
   }
   return (
      <ProfilePageClient
         user={profileData.data.userProfile as User}
         userSkills={profileData.data.userSkills}
         allSkills={profileData.data.allSkills}
         experiences={profileData.data.experiences}
         educations={profileData.data.educations}
         isCurrentUser={true}
      />
   );
}
