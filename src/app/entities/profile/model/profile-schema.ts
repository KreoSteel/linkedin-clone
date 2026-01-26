import { z } from "zod";
import { UserSkillType } from "@/app/entities/skill/model/skill-schema";
import { SkillType } from "@/app/entities/skill/model/skill-schema";
import { TExperience } from "@/app/entities/experience";
import { TEducation } from "@/app/entities/education/model/education-schema";

export const profileSchema = z.object({
    id: z.string(),
    firstName: z.string().min(1, { message: "First name is required" }).max(30, { message: "First name must be less than 30 characters" }),
    lastName: z.string().min(1, { message: "Last name is required" }).max(30, { message: "Last name must be less than 30 characters" }),
    headline: z.string().max(500, { message: "Headline must be less than 500 characters" }).nullable(),
    location: z.string().max(100, { message: "Location must be less than 100 characters" }).nullable(),
    biography: z.string().max(2600, { message: "Biography must be less than 2600 characters" }).nullable(),
    avatar: z.url().nullable(),
    backgroundPhoto: z.url().nullable(),
    email: z.email({ message: "Invalid email address" }).min(1, { message: "Email is required" }),
})

export const editProfileSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }).max(30, { message: "First name must be less than 30 characters" }),
    lastName: z.string().min(1, { message: "Last name is required" }).max(30, { message: "Last name must be less than 30 characters" }),
    headline: z.string().max(500, { message: "Headline must be less than 500 characters" }).nullable(),
    location: z.string().max(100, { message: "Location must be less than 100 characters" }).nullable(),
    biography: z.string().max(2600, { message: "Biography must be less than 2600 characters" }).nullable(),
    avatar: z.url().nullable(),
    backgroundPhoto: z.url().nullable(),
}).partial();

export type ProfileType = z.infer<typeof profileSchema>;
export type EditProfileType = z.infer<typeof editProfileSchema>;

export type ProfileData = {
    userProfile: ProfileType;
    userSkills: UserSkillType[];
    allSkills: SkillType[];
    experiences: TExperience[];
    educations: TEducation[];
};