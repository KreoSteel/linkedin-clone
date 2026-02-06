"use server";

import { getUserEducations } from "@/app/entities/education/api/education-dal";
import { type TEducation } from "@/app/entities/education";
import { Result } from "@/app/types";

export const getUserEducationsAction = async (userId: string): Promise<Result<TEducation[]>> => {
    return getUserEducations(userId);
};
