"use server";
import { createEducationSchema } from "@/app/entities/education";
import { createEducation } from "@/app/entities/education/api/education-dal";
import { getUserId } from "@/app/shared/api/auth";
import { Result } from "@/app/types";
import { revalidatePath } from "next/cache";

export const educationCreateAction = async (prevState: unknown, formData: FormData): Promise<Result<string>> => {
    const userId = await getUserId();
    if (!userId.success) {
        return {
            success: false,
            error: "Unauthorized",
        };
    }

    const endDateValue = formData.get("endDate");
    const validatedData = createEducationSchema.safeParse({
        school: formData.get("school"),
        degree: formData.get("degree"),
        field: formData.get("field"),
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
        const createdEducation = await createEducation(userId.data, validatedData.data);
        if (!createdEducation.success) {
            return {
                success: false,
                error: createdEducation.error,
            };
        }

        revalidatePath("/profile");

        return {
            success: true,
            data: "Education created successfully",
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
        return {
            success: false,
            error: "Failed to create education",
        };
    }
}