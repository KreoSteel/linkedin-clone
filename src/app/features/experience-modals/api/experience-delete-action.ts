 "use server";
import { deleteExperience, getExperienceById } from "@/app/entities/experience/api/experience-dal";
import { getUserId } from "@/app/shared/api/auth";
import { Result } from "@/app/types";
import { revalidatePath } from "next/cache";


export const deleteExperienceAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
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

    try {
        const deletedExperience = await deleteExperience(userId.data, experienceId);
        if (!deletedExperience.success) {
            return {
                success: false,
                error: deletedExperience.error,
            }
        }

        revalidatePath("/profile");

        return {
            success: true,
            data: "Experience deleted successfully",
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
            error: "Failed to delete experience",
        }
    }
}