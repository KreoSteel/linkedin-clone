"use server";
import { deleteEducation, getEducationById } from "@/app/entities/education";
import { getUserId } from "@/app/shared/api/auth";
import { Result } from "@/app/types";
import { revalidatePath } from "next/cache";


export const deleteEducationAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
    const userId = await getUserId();
    if (!userId.success) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    const educationId = formData.get("id") as string;
    const existingEducation = await getEducationById(userId.data, educationId);
    if (!existingEducation.success) {
        return {
            success: false,
            error: existingEducation.error,
        }
    }

    try {
        const deletedEducation = await deleteEducation(userId.data, educationId);
        if (!deletedEducation.success) {
            return {
                success: false,
                error: deletedEducation.error,
            }
        }

        revalidatePath("/profile");

        return {
            success: true,
            data: "Education deleted successfully",
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
            error: "Failed to delete education",
        }
    }
}
