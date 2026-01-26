"use client";
import ProfileCard from "@/app/widgets/profile-card/ui/ProfileCard";
import { ProfileProviders } from "@/app/(app)/providers/profile-providers";
import AboutSkillsSection from "@/app/widgets/profile-sections/about-skills-section/AboutSkillsSection";
import ExperienceSection from "@/app/widgets/profile-sections/experience-section/ExperienceSection";
import EducationSection from "@/app/widgets/profile-sections/education-section/EducationSection";
import { ProfilePageClientProps } from "./model/types";

export default function ProfilePageClient({ user, userSkills, allSkills, experiences, educations, isCurrentUser }: ProfilePageClientProps) {
   return (
      <div className="py-6 flex flex-col items-center justify-center w-full">
         <ProfileProviders profile={user}>
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
               <ProfileCard profile={user} isForFeed={false} isCurrentUser={isCurrentUser} />
               <AboutSkillsSection biography={user.biography || ""} userSkills={userSkills} allSkills={allSkills} isCurrentUser={isCurrentUser} />
               <ExperienceSection experiences={experiences} isCurrentUser={isCurrentUser} />
               <EducationSection educations={educations} isCurrentUser={isCurrentUser} />
            </div>
         </ProfileProviders>
      </div>
   );
}