"use server";

import { getProfile } from "@/app/entities/profile/api/profile-dal";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { Result } from "@/app/types";


export const getProfileAction = async (userId: string): Promise<Result<ProfileType>> => {
    return getProfile(userId);
};
