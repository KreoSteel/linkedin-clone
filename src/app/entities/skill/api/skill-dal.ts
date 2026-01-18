"use server";
import { prisma } from "@/app/shared/api/prisma";
import type {
   AddSkillToUserType,
   SkillType,
   UserSkillType,
} from "../model/skill-schema";
import { Result } from "@/app/types";

export const getSkills = async (
   query: string
): Promise<Result<SkillType[]>> => {
   try {
      const skills = await prisma.skill.findMany({
         where: {
            ...(query && query.length > 0
               ? {
                  name: {
                     contains: query,
                     mode: "insensitive",
                  },
               }
               : undefined),
         },
         orderBy: {
            name: "asc",
         },
      });

      return {
         success: true,
         data: skills,
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
         error: "Failed to get skills",
      };
   }
};

export const getSkillsByUserId = async (
   userId: string
): Promise<Result<UserSkillType[]>> => {
   const existingSkills = await prisma.userSkill.findMany({
      where: {
         userId,
      },
   });
   if (!existingSkills) {
      return {
         success: false,
         error: "No skills found",
      };
   }

   try {
      const skills = await prisma.userSkill.findMany({
         where: {
            userId,
         },
         include: {
            skill: true,
         },
      });

      return {
         success: true,
         data: skills.map((skill) => ({
            id: skill.id,
            name: skill.skill.name,
            skillId: skill.skillId,
            userId: skill.userId,
            endorsementCount: skill.endorsementCount,
            createdAt: skill.createdAt,
         })),
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
      error: "Failed to get user skills",
   };
};

export const addSkillToUser = async (
   userId: string,
   skillId: string
): Promise<Result<AddSkillToUserType>> => {
   const existingSkill = await prisma.userSkill.findUnique({
      where: {
         userId_skillId: {
            userId,
            skillId,
         },
      },
   });
   if (existingSkill) {
      return {
         success: false,
         error: "Skill already exists",
      };
   }

   try {
      const userSkill = await prisma.userSkill.upsert({
         where: {
            userId_skillId: {
               userId,
               skillId,
            },
         },
         create: {
            userId,
            skillId,
         },
         update: {},
      });
      return {
         success: true,
         data: userSkill,
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
      error: "Failed to update skill to user",
   };
};

export const removeSkillFromUser = async (
   userId: string,
   skillId: string
): Promise<Result<void>> => {
   const existingSkill = await prisma.userSkill.findUnique({
      where: {
         userId_skillId: {
            userId,
            skillId,
         },
      },
   });
   if (!existingSkill) {
      return {
         success: false,
         error: "Skill not found",
      };
   }

   try {
      await prisma.userSkill.delete({
         where: {
            userId_skillId: {
               userId,
               skillId,
            },
         },
      });
      return {
         success: true,
         data: undefined,
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
      error: "Failed to remove skill from user",
   };
};