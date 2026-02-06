"use server";

import { getUserExperiences } from "@/app/entities/experience/api/experience-dal";
import { type TExperience } from "@/app/entities/experience";
import { Result } from "@/app/types";

export const getUserExperiencesAction = async (userId: string): Promise<Result<TExperience[]>> => {
    return getUserExperiences(userId);
};
