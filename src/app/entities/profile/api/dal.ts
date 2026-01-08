import { prisma } from "@/app/shared/api/prisma";
import type { EditProfileType } from "../model/schema";

export const getProfile = async (userId: string) => {
   const user = await prisma.user.findUnique({
      where: {
         id: userId,
      },
   });

   if (!user) {
      throw new Error("User not found");
   }

   return user;
};

export const editProfile = async (userId: string, data: EditProfileType) => {
   const existingUser = await prisma.user.findUnique({
      where: {
         id: userId,
      },
   });

   if (!existingUser) {
      throw new Error("User not found");
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

      return user;
   } catch (error) {
      if (error instanceof Error) {
         throw new Error(error.message);
      }
      throw new Error("Failed to edit user");
   }
};
