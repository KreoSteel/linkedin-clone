"use server";

import ProfilePageClient from "@/app/pages/profile/ProfilePageClient";
import { notFound } from "next/navigation";
import { getProfileData } from "@/app/shared/utils/get-profile-data";
import { getUserId } from "@/app/shared/api/auth";
import { ProfilePageProps } from "@/app/pages/profile/model/types";

export default async function ProfilePageByUserId({ params }: ProfilePageProps) {
    const { id } = await params;
    const profileData = await getProfileData(id);
    if (!profileData.success) {
        return notFound();
    }
    
    const currentUserId = await getUserId();
    if (!currentUserId.success) {
        return notFound();
    }

    const isCurrentUser = currentUserId.data === id;


    return (
        <ProfilePageClient
            user={profileData.data.userProfile}
            userSkills={profileData.data.userSkills}
            allSkills={profileData.data.allSkills}
            experiences={profileData.data.experiences}
            educations={profileData.data.educations}
            isCurrentUser={isCurrentUser}
        />
    )
}