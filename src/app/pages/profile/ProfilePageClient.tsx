"use client";

import ProfileCard from "@/app/widgets/profile-card/ui/ProfileCard";
import { ProfileProviders } from "@/app/(app)/providers/profile-providers";
import AboutSkillsSection from "@/app/widgets/profile-sections/about-skills-section/AboutSkillsSection";
import ExperienceSection from "@/app/widgets/profile-sections/experience-section/ExperienceSection";
import EducationSection from "@/app/widgets/profile-sections/education-section/EducationSection";
import { ProfilePageClientProps } from "./model/types";
import { useProfilePageData } from "./model/use-profile-page-data";

export default function ProfilePageClient({ user, isCurrentUser, educations, experiences, userSkills, allSkills }: ProfilePageClientProps) {
   const { profile } = useProfilePageData({
      userId: user.id,
      user,
      educations,
      experiences,
      userSkills,
      allSkills,
   });

   return (
      <div className="py-6 flex flex-col items-center justify-center w-full">
         <ProfileProviders profile={profile}>
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
               <ProfileCard profile={profile} isForFeed={false} isCurrentUser={isCurrentUser} />
               <AboutSkillsSection biography={profile.biography || ""} userSkills={userSkills} allSkills={allSkills} isCurrentUser={isCurrentUser} />
               <ExperienceSection experiences={experiences} isCurrentUser={isCurrentUser} />
               <EducationSection educations={educations} isCurrentUser={isCurrentUser} />
            </div>
         </ProfileProviders>
      </div>
   );
}