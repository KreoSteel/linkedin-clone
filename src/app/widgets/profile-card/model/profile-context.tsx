"use client";
import { ProfileType } from "@/app/entities/profile/model/schema";
import { createContext, useContext } from "react";

interface ProfileContextValue {
   profile: ProfileType;
}


export const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export function useProfileContext() {
   const context = useContext(ProfileContext);
   if (!context) {
      throw new Error(
         "useProfileContext must be used within a ProfileProvider"
      );
   }
   return context;
}

