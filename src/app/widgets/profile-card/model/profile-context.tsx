"use client";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
import { createContext, useContext } from "react";

interface CurrentUserProfileContextValue {
   profile: ProfileType;
}

export const CurrentUserProfileContext = createContext<CurrentUserProfileContextValue | undefined>(undefined);

export function useCurrentUserProfile() {
   const context = useContext(CurrentUserProfileContext);
   if (!context) {
      throw new Error(
         "useCurrentUserProfile must be used within a CurrentUserProfileProvider"
      );
   }
   return context;
}

export function useCurrentUserId() {
   const { profile } = useCurrentUserProfile();
   return profile.id;
}

