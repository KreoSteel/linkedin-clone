import { z } from "zod";

export const profileSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1, { message: "First name is required" }).max(30, { message: "First name must be less than 30 characters" }),
    lastName: z.string().min(1, { message: "Last name is required" }).max(30, { message: "Last name must be less than 30 characters" }),
    headline: z.string().max(500, { message: "Headline must be less than 500 characters" }).optional(),
    location: z.string().max(100, { message: "Location must be less than 100 characters" }).optional(),
    biography: z.string().min(1, { message: "Biography is required" }).max(1000, { message: "Biography must be less than 1000 characters" }).optional(),
    avatar: z.url().optional(),
    backgroundPhoto: z.url().optional(),
    email: z.email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
})

export const editProfileSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).max(30, { message: "First name must be less than 30 characters" }),
    lastName: z.string().min(1, { message: "Last name is required" }).max(30, { message: "Last name must be less than 30 characters" }),
    headline: z.string().max(500, { message: "Headline must be less than 500 characters" }).optional(),
    location: z.string().max(100, { message: "Location must be less than 100 characters" }).optional(),
    biography: z.string().min(1, { message: "Biography is required" }).max(1000, { message: "Biography must be less than 1000 characters" }).optional(),
    avatar: z.url().optional(),
    backgroundPhoto: z.url().optional(),
}).partial();

export type ProfileType = z.infer<typeof profileSchema>;
export type EditProfileType = z.infer<typeof editProfileSchema>;