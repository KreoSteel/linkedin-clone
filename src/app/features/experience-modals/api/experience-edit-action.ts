 "use server";
import { getExperienceById, updateExperience, updateExperienceSchema } from "@/app/entities/experience";
import { getUserId } from "@/app/shared/api/auth";
import { revalidatePath } from "next/cache";
import { Result } from "@/app/types";


export const experienceEditAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
    const userId = await getUserId();
    if (!userId.success) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    const experienceId = formData.get("id") as string;
    const existingExperience = await getExperienceById(userId.data, experienceId);
    if (!existingExperience.success) {
        return {
            success: false,
            error: existingExperience.error,
        }
    }

    const endDateValue = formData.get("endDate");
    const validatedData = updateExperienceSchema.safeParse({
        id: experienceId,
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
        }
    }

    try {
        const updatedExperience = await updateExperience(userId.data, experienceId, validatedData.data)
        if (!updatedExperience.success) {
            return {
                success: false,
                error: updatedExperience.error,
            }
        }

        revalidatePath("/profile");

        return {
            success: true,
            data: "Experience updated successfully",
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            }
        }
        return {
            success: false,
            error: "Failed to update experience",
        }
    }
}