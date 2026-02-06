import { queryOptions } from "@tanstack/react-query";
import { getUserEducationsAction } from "@/app/features/profile/api/get-educations-action";

export const getUserEducationsOptions = (userId: string) => {
    return queryOptions({
        queryKey: ["education", userId],
        queryFn: async () => {
            const result = await getUserEducationsAction(userId);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
};
