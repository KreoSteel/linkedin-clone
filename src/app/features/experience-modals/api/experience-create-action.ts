"use server";
import { createExperience, createExperienceSchema } from "@/app/entities/experience";
import { getUserId } from "@/app/shared/api/auth";
import { Result } from "@/app/types";

export const createExperienceAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
    const userId = await getUserId();
    if (!userId.success) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    const endDateValue = formData.get("endDate");
    const validatedData = createExperienceSchema.safeParse({
        position: formData.get("position"),
        company: formData.get("company"),
        location: formData.get("location"),
        description: formData.get("description"),
        startDate: new Date(formData.get("startDate") as string),
        endDate: endDateValue && endDateValue !== "" ? new Date(endDateValue as string) : null,
        current: formData.get("current") === "on" ? true : false,
    })

    if (!validatedData.success) {
        return {
            success: false,
            error: "Invalid data: " + validatedData.error.issues.map((issue) => issue.message).join(", "),
        };
    }

    try {
        const createdExperience = await createExperience(userId.data, validatedData.data);
        if (!createdExperience.success) {
            return {
                success: false,
                error: createdExperience.error,
            }
        }

        return {
            success: true,
            data: "Experience created successfully",
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Failed to create experience",
        }
    }
}