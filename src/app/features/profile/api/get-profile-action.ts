"use server";

import { getProfile } from "@/app/entities/profile/api/profile-dal";
import { Result } from "@/app/types";
import { User } from "@/generated/prisma/client";

export const getProfileAction = async (userId: string): Promise<Result<User>> => {
    return getProfile(userId);
};
