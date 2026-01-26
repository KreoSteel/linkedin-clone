import { Result } from "@/app/types";
import { ProfileData, ProfileType } from "@/app/entities/profile/model/profile-schema";
import { getProfile } from "@/app/entities/profile/api/profile-dal";
import { getSkills, getSkillsByUserId } from "@/app/entities/skill/api/skill-dal";
import { getUserExperiences } from "@/app/entities/experience/api/experience-dal";
import { getUserEducations } from "@/app/entities/education/api/education-dal";


export async function getProfileData(userId: string): Promise<Result<ProfileData>> {
    const userProfile = await getProfile(userId);
    if (!userProfile.success) {
        return {
            success: false,
            error: userProfile.error,
        };
    }
    const userSkills = await getSkillsByUserId(userId);
    const allSkills = await getSkills("");
    const experiences = await getUserExperiences(userId);
    const educations = await getUserEducations(userId);

    if (!userSkills.success) {
        return {
            success: false,
            error: userSkills.error,
        };
    }
    if (!allSkills.success) {
        return {
            success: false,
            error: allSkills.error,
        };
    }
    if (!experiences.success) {
        return {
            success: false,
            error: experiences.error,
        };
    }
    if (!educations.success) {
        return {
            success: false,
            error: educations.error,
        };
    }
    return {
        success: true,
        data: {
            userProfile: userProfile.data as ProfileType,
            userSkills: userSkills.data,
            allSkills: allSkills.data,
            experiences: experiences.data,
            educations: educations.data,
        },
    };
}