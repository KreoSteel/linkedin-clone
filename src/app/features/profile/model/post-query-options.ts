import { queryOptions } from "@tanstack/react-query";
import { getAllPostsAction } from "@/app/entities/post";

export const getAllPostsOptions = () => 
    queryOptions({
        queryKey: ["posts"],
        queryFn: async () => {
            const result = await getAllPostsAction();
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
        
        staleTime: 1000 * 60 * 5,
    })