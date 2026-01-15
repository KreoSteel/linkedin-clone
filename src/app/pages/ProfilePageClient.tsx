"use client";
import ProfileCard from "../widgets/profile-card/ui/ProfileCard";
import { ProfileProviders } from "../(app)/providers/profile-providers";
import { ProfileType } from "../entities/profile/model/profile-schema";
import AboutSkillsSection from "../features/about-skills-section/ui/AboutSkillsSection";
import { SkillType, UserSkillType } from "../entities/skill/model/skill-schema";

interface ProfilePageClientProps {
   user: ProfileType;
   userSkills: UserSkillType[];
   allSkills: SkillType[];
}

export default function ProfilePageClient({ user, userSkills, allSkills }: ProfilePageClientProps) {
   return (
      <div className="py-6 flex flex-col items-center justify-center w-full">
         <ProfileProviders profile={user}>
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
               <ProfileCard profile={user} isForFeed={false} />
               <AboutSkillsSection biography={user.biography || ""} userSkills={userSkills} allSkills={allSkills} />
            </div>
         </ProfileProviders>
      </div>
   );
}