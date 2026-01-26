import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { SkillType, UserSkillType } from "@/app/entities/skill/model/skill-schema";
import { TExperience } from "@/app/entities/experience";
import { TEducation } from "@/app/entities/education/model/education-schema";

export interface ProfilePageClientProps {
   user: ProfileType;
   userSkills: UserSkillType[];
   allSkills: SkillType[];
   experiences: TExperience[];
   educations: TEducation[];
   isCurrentUser: boolean;
}

export interface ProfilePageProps {
   params: Promise<{ id: string }>;
}
