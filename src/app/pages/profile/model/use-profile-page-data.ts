import { useQuery } from "@tanstack/react-query";
import { getProfileOptions } from "@/app/entities/profile/api/profile-query-options";
import { getUserEducationsOptions } from "@/app/entities/education/api/education-query-options";
import { getUserExperiencesOptions } from "@/app/entities/experience/api/experience-query-options";
import { getSkillsByUserIdOptions } from "@/app/entities/skill/api/skill-query-options";
import { getSkillsOptions } from "@/app/entities/skill/api/skill-query-options";
import { ProfilePageClientProps } from "./types";


export function useProfilePageData({ userId, user, educations, experiences, userSkills, allSkills }: Pick<ProfilePageClientProps, "user" | "educations" | "experiences" | "userSkills" | "allSkills"> & { userId: string }) {
    const { data: profile } = useQuery({
        ...getProfileOptions(userId),
        initialData: user,
    });
    const { data: educationsData } = useQuery({
        ...getUserEducationsOptions(userId),
        initialData: educations,
    });
    const { data: experiencesData } = useQuery({
        ...getUserExperiencesOptions(userId),
        initialData: experiences,
    });
    const { data: userSkillsData } = useQuery({
        ...getSkillsByUserIdOptions(userId),
        initialData: userSkills,
    });
    const { data: allSkillsData } = useQuery({
        ...getSkillsOptions(""),
        initialData: allSkills,
    });

    return {
        profile: profile,
        educations: educationsData,
        experiences: experiencesData,
        userSkills: userSkillsData,
        allSkills: allSkillsData,
    };
}