import { SkillType, UserSkillType } from "@/app/entities/skill/model/skill-schema";
import { TExperience } from "@/app/entities/experience";
import { TEducation } from "@/app/entities/education/model/education-schema";
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
