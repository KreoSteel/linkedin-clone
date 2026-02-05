import { prisma } from "@/app/shared/api/prisma";
import type { EditProfileType, ProfileType } from "../model/profile-schema";
import { Result } from "@/app/types";

export const getProfile = async (userId: string): Promise<Result<ProfileType>> => {
   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
      select: {
         id: true,
         firstName: true,
         lastName: true,
         headline: true,
         location: true,
         biography: true,
         avatar: true,
         backgroundPhoto: true,
         email: true,
      },
   });

   if (!user) {
      return {
         success: false,
         error: "User not found",
      };
   }

   return {
      success: true,
      data: user,
   };
};

export const editProfile = async (userId: string, data: EditProfileType): Promise<Result<ProfileType>> => {
   const existingUser = await prisma.user.findUnique({
      where: {
         id: userId,
      },
   });

   if (!existingUser) {
      return {
         success: false,
         error: "User not found",
      };
   }

   try {
      const user = await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            ...data,
         },
      });

      return {
         success: true,
         data: user,
      } as Result<ProfileType>;
   } catch (error) {
      if (error instanceof Error) {
         return {
            success: false,
            error: error.message,
         };
      }
      return {
         success: false,
         error: "Failed to edit user",
      };
   }
};
