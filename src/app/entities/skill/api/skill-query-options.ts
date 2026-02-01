import { queryOptions } from "@tanstack/react-query";
import { getSkillsAction, getSkillsByUserIdAction } from "@/app/features/profile/api/get-skills-action";

export const getSkillsOptions = (query: string) => {
    return queryOptions({
        queryKey: ["skills", query],
        queryFn: async () => {
            const result = await getSkillsAction(query);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
};

export const getSkillsByUserIdOptions = (userId: string) => {
    return queryOptions({
        queryKey: ["skills", "user", userId],
        queryFn: async () => {
            const result = await getSkillsByUserIdAction(userId);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
};
