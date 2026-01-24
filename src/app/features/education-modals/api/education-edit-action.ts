"use server";
import { getEducationById, updateEducation, updateEducationSchema } from "@/app/entities/education";
import { getUserId } from "@/app/shared/api/auth";
import { revalidatePath } from "next/cache";
import { Result } from "@/app/types";


export const educationEditAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
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

    const startDateValue = formData.get("startDate");
    const endDateValue = formData.get("endDate");
    const validatedData = updateEducationSchema.safeParse({
        school: formData.get("school"),
        degree: formData.get("degree"),
        field: formData.get("field"),
        description: formData.get("description"),
        startDate: startDateValue && startDateValue !== "" ? new Date(startDateValue as string) : undefined,
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
        const updatedEducation = await updateEducation(userId.data, educationId, validatedData.data)
        if (!updatedEducation.success) {
            return {
                success: false,
                error: updatedEducation.error,
            }
        }

        revalidatePath("/profile");

        return {
            success: true,
            data: "Education updated successfully",
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
            error: "Failed to update education",
        }
    }
}
