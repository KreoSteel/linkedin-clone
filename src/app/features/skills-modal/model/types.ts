import { SkillType, UserSkillType } from "@/app/entities/skill/model/skill-schema";

export interface SkillsModalProps {
   userSkills: UserSkillType[];
   allSkills: SkillType[];
}
