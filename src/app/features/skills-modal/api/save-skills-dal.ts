"use server";
import { prisma } from "@/app/shared/api/prisma";
import { Result } from "@/app/types";
import { type UserSkillType } from "@/app/entities/skill";
import { getSkillsByUserId } from "@/app/entities/skill/api/skill-dal";
import { revalidatePath } from "next/cache";

export const saveSkills = async (userId: string, skillIds: string[]): Promise<Result<UserSkillType[]>> => {
    try {
        if (skillIds.length > 5) {
            return {
                success: false,
                error: "Choose only up to 5 skills.",
            };
        }

        const validSkills = await prisma.skill.findMany({
            where: {
                id: {
                    in: skillIds,
                }
            },
            select: {
                id: true,
            }
        })

        if (validSkills.length !== skillIds.length) {
            return {
                success: false,
                error: "Invalid skill IDs",
            };
        }

        await prisma.$transaction(async (tx) => {
            await tx.userSkill.deleteMany({
                where: {
                    userId
                }
            })

            if (skillIds.length > 0) {
                await tx.userSkill.createMany({
                    data: skillIds.map((skillId) => ({
                        userId,
                        skillId
                    }))
                })
            }
        })

        revalidatePath("/profile");

        const updatedSkills = await getSkillsByUserId(userId);
        if (!updatedSkills.success) {
            return {
                success: false,
                error: updatedSkills.error,
            };
        }

        return {
            success: true,
            data: updatedSkills.data,
        };
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
    return {
        success: false,
        error: "Failed to save skills",
    };
}