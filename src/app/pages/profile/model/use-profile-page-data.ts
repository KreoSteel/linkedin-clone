import { useQuery } from "@tanstack/react-query";
import { 
  getProfileOptions,
  getUserEducationsOptions,
  getUserExperiencesOptions,
  getSkillsByUserIdOptions,
  getSkillsOptions
} from "@/app/features/profile";
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