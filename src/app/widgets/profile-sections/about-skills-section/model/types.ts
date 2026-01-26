import { SkillType, UserSkillType } from "@/app/entities/skill/model/skill-schema";

export interface AboutSkillsSectionProps {
   biography: string;
   userSkills: UserSkillType[];
   allSkills: SkillType[];
   isCurrentUser: boolean;
}
