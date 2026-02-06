"use server";

import { getProfile } from "@/app/entities/profile/api/profile-dal";
import { type ProfileType } from "@/app/entities/profile";
import { Result } from "@/app/types";


export const getProfileAction = async (userId: string): Promise<Result<ProfileType>> => {
    return getProfile(userId);
};
