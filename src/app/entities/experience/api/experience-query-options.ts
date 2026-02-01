import { queryOptions } from "@tanstack/react-query";
import { getUserExperiencesAction } from "@/app/features/profile/api/get-experiences-action";

export const getUserExperiencesOptions = (userId: string) => {
    return queryOptions({
        queryKey: ["experience", userId],
        queryFn: async () => {
            const result = await getUserExperiencesAction(userId);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
};
