"use server";
import { prisma } from "@/app/shared/api/prisma";
import { TCreateExperience, TExperience } from "../model/experience-schema";
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