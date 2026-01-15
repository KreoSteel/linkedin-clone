import { z } from "zod";

export const skillSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Skill name is required" }).max(50, { message: "Skill name must be less than 50 characters" }),
    createdAt: z.date(),
})

export const saveSkillsSchema = z.object({
    id: z.string(),
    skillId: z.array(z.string()).max(5, { message: "Choose only up to 5 skills."})
})

export const userSkillSchema = z.object({
    id: z.string(),
    skillId: z.string().min(1, { message: "Skill ID is required" }),
    userId: z.string().min(1, { message: "User ID is required" }),
    endorsementCount: z.number(),
    createdAt: z.date(),
})

export const addSkillToUserSchema = z.object({
    skillId: z.string().min(1, { message: "Skill ID is required" }),
});


export type SkillType = z.infer<typeof skillSchema>;
export type AddSkillToUserType = z.infer<typeof addSkillToUserSchema>;
export type UserSkillType = z.infer<typeof userSkillSchema>;