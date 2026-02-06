import { type SkillType, type UserSkillType } from "@/app/entities/skill";
import { type TExperience } from "@/app/entities/experience";
import { type TEducation } from "@/app/entities/education";
import { User } from "@/generated/prisma/client";

export interface ProfilePageClientProps {
   user: User;
   userSkills: UserSkillType[];
   allSkills: SkillType[];
   experiences: TExperience[];
   educations: TEducation[];
   isCurrentUser: boolean;
}

export interface ProfilePageProps {
   params: Promise<{ id: string }>;
}
