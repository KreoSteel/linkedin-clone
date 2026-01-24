import { z } from "zod";
import { dateValidations } from "@/app/shared/utils/date-validations-schema";

const MESSAGE = "studying here"

export const baseEducationSchema = z.object({
    id: z.string(),
    school: z.string().min(1, { message: "School name is required" }).max(100, { message: "School name must be less than 100 characters" }),
    degree: z.string().min(1, { message: "Degree is required" }).max(100, { message: "Degree must be less than 100 characters" }),
    field: z.string().min(1, { message: "Field of study is required" }).max(100, { message: "Field of study must be less than 100 characters" }),
    description: z.string().max(2600, { message: "Description must be less than 2600 characters" }).nullable(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    current: z.boolean().optional(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const baseCreateEducationSchema = baseEducationSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const educationSchema = dateValidations(baseEducationSchema, MESSAGE)
export const createEducationSchema = dateValidations(baseCreateEducationSchema, MESSAGE)
export const updateEducationSchema = dateValidations(baseCreateEducationSchema.partial(), MESSAGE)

export type TEducation = z.infer<typeof educationSchema>;
export type TCreateEducation = z.infer<typeof createEducationSchema>;
export type TUpdateEducation = z.infer<typeof updateEducationSchema>;