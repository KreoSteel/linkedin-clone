"use server";
import { prisma } from "@/app/shared/api/prisma";
import { TCreateExperience, TExperience, TUpdateExperience } from "../model/experience-schema";
import { Result } from "@/app/types";

export const getUserExperiences = async (userId: string): Promise<Result<TExperience[]>> => {
    try {
        const experiences = await prisma.experience.findMany({
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
            data: experiences,
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
            error: "Failed to get user experiences",
        }
    }
}

export const getExperienceById = async (userId: string, experienceId: string): Promise<Result<TExperience>> => {
    try {
        const experience = await prisma.experience.findUnique({
            where: {
                userId,
                id: experienceId,
            }
        })

        if (!experience) {
            return {
                success: false,
                error: "Experience not found",
            };
        }

        return {
            success: true,
            data: experience,
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
            error: "Failed to get experience by id",
        }
    }
}

export const createExperience = async (userId: string, experience: TCreateExperience): Promise<Result<TExperience>> => {
    try {
        const newExperience = await prisma.experience.create({
            data: {
                userId,
                ...experience
            }
        })

        return {
            success: true,
            data: newExperience,
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

export const updateExperience = async (userId: string, experienceId: string, experience: TUpdateExperience): Promise<Result<TExperience>> => {
    const existingExperience = await prisma.experience.findUnique({
        where: {
            userId,
            id: experienceId,
        }
    })

    if (!existingExperience) {
        return {
            success: false,
            error: "Experience not found",
        };
    }

    try {
        const updatedExperience = await prisma.experience.update({
            where: {
                userId,
                id: experienceId,
            },
            data: {
                ...experience,
            }
        })

        return {
            success: true,
            data: updatedExperience,
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
            error: "Failed to update experience",
        }
    }
}

export const deleteExperience = async (userId: string, experienceId: string): Promise<Result<void>> => {
    const existingExperience = await prisma.experience.findUnique({
        where: {
            userId,
            id: experienceId,
        }
    })

    if (!existingExperience) {
        return {
            success: false,
            error: "Experience not found",
        };
    }

    try {
        await prisma.experience.delete({
            where: {
                userId,
                id: experienceId,
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
            error: "Failed to delete experience",
        }
    }
}