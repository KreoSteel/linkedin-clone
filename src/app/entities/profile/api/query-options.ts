import { queryOptions } from "@tanstack/react-query";
import { getProfile } from "./profile-dal";

export const getProfileOptions = (userId: string) => {
    return queryOptions({
        queryKey: ["profile", userId],
        queryFn: () => getProfile(userId),
    })
}