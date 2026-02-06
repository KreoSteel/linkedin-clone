"use server";

import { getSkills, getSkillsByUserId } from "@/app/entities/skill/api/skill-dal";
import { type SkillType, type UserSkillType } from "@/app/entities/skill";
import { Result } from "@/app/types";

export const getSkillsAction = async (query: string): Promise<Result<SkillType[]>> => {
    return getSkills(query);
};

export const getSkillsByUserIdAction = async (userId: string): Promise<Result<UserSkillType[]>> => {
    return getSkillsByUserId(userId);
};
