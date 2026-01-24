import { z } from "zod";
import { dateValidations } from "@/app/shared/utils/date-validations-schema";

const MESSAGE = "working here"

export const baseExperienceSchema = z.object({
    id: z.string(),
    company: z.string().min(1, { message: "Company is required" }).max(100, { message: "Company must be less than 100 characters" }),
    position: z.string().min(1, { message: "Position is required" }).max(100, { message: "Position must be less than 100 characters" }),
    location: z.string().max(100, { message: "Location must be less than 100 characters" }).nullable(),
    description: z.string().max(2600, { message: "Description must be less than 2600 characters" }).nullable(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    current: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
})

export const baseCreateExperienceSchema = baseExperienceSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
})

export const experienceSchema = dateValidations(baseExperienceSchema, MESSAGE)
export const createExperienceSchema = dateValidations(baseCreateExperienceSchema, MESSAGE)
export const updateExperienceSchema = dateValidations(baseCreateExperienceSchema.partial(), MESSAGE)


export type TExperience = z.infer<typeof experienceSchema>;
export type TCreateExperience = z.infer<typeof createExperienceSchema>;
export type TUpdateExperience = z.infer<typeof updateExperienceSchema>;