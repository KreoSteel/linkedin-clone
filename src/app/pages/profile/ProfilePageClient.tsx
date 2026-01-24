"use client";
import ProfileCard from "@/app/widgets/profile-card/ui/ProfileCard";
import { ProfileProviders } from "@/app/(app)/providers/profile-providers";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import AboutSkillsSection from "@/app/widgets/profile-sections/about-skills-section/AboutSkillsSection";
import { SkillType, UserSkillType } from "@/app/entities/skill/model/skill-schema";
import ExperienceSection from "@/app/widgets/profile-sections/experience-section/ExperienceSection";
import { TExperience } from "@/app/entities/experience";
import EducationSection from "@/app/widgets/profile-sections/education-section/EducationSection";
import { TEducation } from "@/app/entities/education/model/education-schema";

interface ProfilePageClientProps {
   user: ProfileType;
   userSkills: UserSkillType[];
   allSkills: SkillType[];
   experiences: TExperience[];
   educations: TEducation[];
}

export default function ProfilePageClient({ user, userSkills, allSkills, experiences, educations }: ProfilePageClientProps) {
   return (
      <div className="py-6 flex flex-col items-center justify-center w-full">
         <ProfileProviders profile={user}>
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
               <ProfileCard profile={user} isForFeed={false} />
               <AboutSkillsSection biography={user.biography || ""} userSkills={userSkills} allSkills={allSkills} />
               <ExperienceSection experiences={experiences} />
               <EducationSection educations={educations} />
            </div>
         </ProfileProviders>
      </div>
   );
}