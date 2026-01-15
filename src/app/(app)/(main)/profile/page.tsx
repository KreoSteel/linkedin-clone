import { getProfile } from "@/app/entities/profile/api/profile-dal";
import ProfilePageClient from "@/app/pages/ProfilePageClient";
import { getUserId } from "@/app/shared/api/auth";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { redirect } from "next/navigation";
import {
   getSkills,
   getSkillsByUserId,
} from "@/app/entities/skill/api/skill-dal";

export default async function ProfilePage() {
   const userId = await getUserId();
   if (!userId.success) {
      redirect("/login");
   }

   const user = await getProfile(userId.data);
   if (!user.success) {
      redirect("/login");
   }

   const userSkillsResult = await getSkillsByUserId(userId.data);
   const userSkills = userSkillsResult.success ? userSkillsResult.data : [];

   const skillsResult = await getSkills("");
   const allSkills = skillsResult.success ? skillsResult.data : [];

   return (
      <ProfilePageClient
         user={user.data as ProfileType}
         userSkills={userSkills}
         allSkills={allSkills}
      />
   );
}
