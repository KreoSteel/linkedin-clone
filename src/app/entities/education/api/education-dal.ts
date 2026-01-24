import { prisma } from "@/app/shared/api/prisma";
import { Result } from "@/app/types";
import { TCreateEducation, TEducation, TUpdateEducation } from "../model/education-schema";

export const getUserEducations = async (userId: string): Promise<Result<TEducation[]>> => {
    try {
        const educations = await prisma.education.findMany({
            where: {
                userId,
            },
            orderBy: [
                { current: "desc" },
                { startDate: "desc" }
            ]
        })

        return {
            success: true,
            data: educations,
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
            error: "Failed to get user educations",
        }
    }
}


export const getEducationById = async (userId: string, educationId: string): Promise<Result<TEducation>> => {
    try {
        const education = await prisma.education.findUnique({
            where: {
                userId,
                id: educationId,
            }
        })

        if (!education) {
            return {
                success: false,
                error: "Education not found",
            };
        }

        return {
            success: true,
            data: education,
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
            error: "Failed to get education by id",
        }
    }
}


export const createEducation = async (userId: string, education: TCreateEducation): Promise<Result<string>> => {
    try {
        const newEducation = await prisma.education.create({
            data: {
                userId,
                ...education,
            }
        })


        return {
            success: true,
            data: newEducation.id,
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
            error: "Failed to create education",
        }
    }
}

export const updateEducation = async (userId: string, educationId: string, education: TUpdateEducation): Promise<Result<TEducation>> => {
    const existingEducation = await prisma.education.findUnique({
        where: {
            userId,
            id: educationId,
        }
    })

    if (!existingEducation) {
        return {
            success: false,
            error: "Education not found",
        };
    }

    try {
        const updatedEducation = await prisma.education.update({
            where: {
                userId,
                id: educationId,
            },
            data: {
                ...education,
            }
        })

        return {
            success: true,
            data: updatedEducation,
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
            error: "Failed to update education",
        }
    }
}

export const deleteEducation = async (userId: string, educationId: string): Promise<Result<void>> => {
    const existingEducation = await prisma.education.findUnique({
        where: {
            userId,
            id: educationId,
        }
    })

    if (!existingEducation) {
        return {
            success: false,
            error: "Education not found",
        };
    }

    try {
        await prisma.education.delete({
            where: {
                userId,
                id: educationId,
            }
        })
        
        return {
            success: true,
            data: undefined,
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
            error: "Failed to delete education",
        }
    }
}