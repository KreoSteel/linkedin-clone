import { queryOptions } from "@tanstack/react-query";
import { getProfileAction } from "@/app/features/profile/api/get-profile-action";

export const getProfileOptions = (userId: string) => {
    return queryOptions({
        queryKey: ["profile", userId],
        queryFn: async () => {
            const result = await getProfileAction(userId);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
};
