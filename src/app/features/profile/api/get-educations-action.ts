"use server";

import { getUserEducations } from "@/app/entities/education/api/education-dal";
import { TEducation } from "@/app/entities/education/model/education-schema";
import { Result } from "@/app/types";

export const getUserEducationsAction = async (userId: string): Promise<Result<TEducation[]>> => {
    return getUserEducations(userId);
};
