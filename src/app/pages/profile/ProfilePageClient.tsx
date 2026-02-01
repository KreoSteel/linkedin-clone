"use client";

import { useQuery } from "@tanstack/react-query";
import ProfileCard from "@/app/widgets/profile-card/ui/ProfileCard";
import { ProfileProviders } from "@/app/(app)/providers/profile-providers";
import AboutSkillsSection from "@/app/widgets/profile-sections/about-skills-section/AboutSkillsSection";
import ExperienceSection from "@/app/widgets/profile-sections/experience-section/ExperienceSection";
import EducationSection from "@/app/widgets/profile-sections/education-section/EducationSection";
import { ProfilePageClientProps } from "./model/types";
import { getProfileOptions } from "@/app/entities/profile/api/profile-query-options";
import { getUserEducationsOptions } from "@/app/entities/education/api/education-query-options";
import { getUserExperiencesOptions } from "@/app/entities/experience/api/experience-query-options";
import { getSkillsByUserIdOptions, getSkillsOptions } from "@/app/entities/skill/api/skill-query-options";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { User } from "@/generated/prisma/client";

export default function ProfilePageClient({ user, userSkills, allSkills, experiences, educations, isCurrentUser }: ProfilePageClientProps) {
   const { data: profile } = useQuery({
      ...getProfileOptions(user.id),
      initialData: user as unknown as User,
   });
   const { data: educationsData } = useQuery({
      ...getUserEducationsOptions(user.id),
      initialData: educations,
   });
   const { data: experiencesData } = useQuery({
      ...getUserExperiencesOptions(user.id),
      initialData: experiences,
   });
   const { data: userSkillsData } = useQuery({
      ...getSkillsByUserIdOptions(user.id),
      initialData: userSkills,
   });
   const { data: allSkillsData } = useQuery({
      ...getSkillsOptions(""),
      initialData: allSkills,
   });

   const profileData = (profile ?? user) as ProfileType;

   return (
      <div className="py-6 flex flex-col items-center justify-center w-full">
         <ProfileProviders profile={profileData}>
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
               <ProfileCard profile={profileData} isForFeed={false} isCurrentUser={isCurrentUser} />
               <AboutSkillsSection biography={profileData.biography || ""} userSkills={userSkillsData ?? userSkills} allSkills={allSkillsData ?? allSkills} isCurrentUser={isCurrentUser} />
               <ExperienceSection experiences={experiencesData ?? experiences} isCurrentUser={isCurrentUser} />
               <EducationSection educations={educationsData ?? educations} isCurrentUser={isCurrentUser} />
            </div>
         </ProfileProviders>
      </div>
   );
}