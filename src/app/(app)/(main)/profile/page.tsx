
import ProfilePageClient from "@/app/pages/profile/ProfilePageClient";
import { getUserId } from "@/app/shared/api/auth";
import { redirect } from "next/navigation";
import { getProfileData } from "@/app/shared/utils/get-profile-data";

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
         user={profileData.data.userProfile}
         userSkills={profileData.data.userSkills}
         allSkills={profileData.data.allSkills}
         experiences={profileData.data.experiences}
         educations={profileData.data.educations}
         isCurrentUser={true}
      />
   );
}
