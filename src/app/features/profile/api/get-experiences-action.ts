"use server";

import { getUserExperiences } from "@/app/entities/experience/api/experience-dal";
import { TExperience } from "@/app/entities/experience/model/experience-schema";
import { Result } from "@/app/types";

export const getUserExperiencesAction = async (userId: string): Promise<Result<TExperience[]>> => {
    return getUserExperiences(userId);
};
