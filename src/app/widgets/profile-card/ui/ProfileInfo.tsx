"use client";
import Link from "next/link";
import { EditProfileForm } from "@/app/features/edit-profile-form";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ProfileInfoProps } from "../model/types";

export default function ProfileInfo({
   profile,
   isForFeed = false,
   avatarSize,
   isCurrentUser = false,
}: ProfileInfoProps) {
   const gap = isForFeed ? 16 : 24;
   const paddingTop = (avatarSize * 0.5) + gap;

   if (isForFeed) {
      return (
         <div className="px-4 pb-3" style={{ paddingTop: `${paddingTop}px` }}>
            <h2 className="text-sm font-semibold text-neutral-900 leading-tight mb-1">
               {profile.firstName && profile.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : "Unknown User"}
            </h2>
            <p className="text-xs text-neutral-800 leading-snug">
               {profile.headline || "No headline set"}
            </p>
            <Separator className="my-2" />
            <p className="text-xs text-neutral-500 leading-snug">
               {profile.location || "No location set"}
            </p>
         </div>
      );
   }

   if (!profile.firstName && !profile.lastName) {
      return (
         <div className="px-4 pb-3" style={{ paddingTop: `${paddingTop}px` }}>
            <span className="text-2xl font-semibold text-neutral-900">
               Unknown User
            </span>
         </div>
      );
   }

   return (
      <div className="px-6 pb-6 flex justify-between items-center" style={{ paddingTop: `${paddingTop}px` }}>
         <div className="flex flex-col gap-1">
            <span className="text-2xl font-semibold text-neutral-900">
               {profile.firstName} {profile.lastName}
            </span>

            {profile.headline && (
               <p className="text-base text-neutral-900 leading-snug mb-1 max-w-md">
                  {profile.headline}
               </p>
            ) || <p className="text-base text-neutral-900">No headline set</p>}

            <div className="flex items-center gap-2 text-sm text-neutral-500">
               <span>{profile.location || "No location set"}</span>
               {profile.email && (
                  <>
                     <span>•</span>
                     <Link
                        href={`mailto:${profile.email}`}
                        className="font-semibold text-primary-500 hover:underline">
                        {profile.email}
                     </Link>
                  </>
               )}
            </div>
         </div>
         {isCurrentUser && (
            <EditProfileForm profile={profile} />
         ) || null}
      </div>
   );
}
