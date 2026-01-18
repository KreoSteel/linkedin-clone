"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveSkills } from "../api/save-skills-dal";
import { toast } from "sonner";


export function useSaveSkillsMutation(userId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (skillIds: string[]) => saveSkills(userId, skillIds),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", userId] });
            queryClient.invalidateQueries({ queryKey: ["user-skills", userId] });
            toast.success("Skills saved successfully");
        },
        onError: (error) => {
            toast.error(error.message || "Failed to save skills");
        },
    });
}