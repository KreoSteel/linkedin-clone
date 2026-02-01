"use server";

import { getSkills, getSkillsByUserId } from "@/app/entities/skill/api/skill-dal";
import { SkillType, UserSkillType } from "@/app/entities/skill/model/skill-schema";
import { Result } from "@/app/types";

export const getSkillsAction = async (query: string): Promise<Result<SkillType[]>> => {
    return getSkills(query);
};

export const getSkillsByUserIdAction = async (userId: string): Promise<Result<UserSkillType[]>> => {
    return getSkillsByUserId(userId);
};
