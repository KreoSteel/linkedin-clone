"use client";
import Link from "next/link";
import { Button } from "@/app/shared/ui";
import { FaEdit } from "react-icons/fa";
import type { ProfileType } from "@/app/entities/profile/model/schema";

interface ProfileInfoProps {
   profile: ProfileType;
   // isOwnProfile: boolean;
}
export default function ProfileInfo({ profile }: ProfileInfoProps) {
   return (
      <div className="px-6 pb-6 pt-16 flex justify-between items-center">
         <div className="">
            <span className="text-2xl font-semibold text-neutral-900">
               {profile.firstName} {profile.lastName}
            </span>
            {!profile.firstName && !profile.lastName && (
               <span className="text-2xl font-semibold text-neutral-900">
                  Unknown User
               </span>
            )}
            <p className="text-base text-neutral-700">{profile.headline}</p>
            {!profile.headline && (
               <p className="text-base text-neutral-700">No headline set</p>
            )}
            <div className="flex items-center gap-2 text-sm text-neutral-500">
               {!profile.location && <span>No location set</span>}
               <span>{profile.location}</span>
               {!profile.email && <span>No email set</span>}
               {profile.email && <span>•</span>}
               <Link
                  href={`mailto:${profile.email}`}
                  className="font-semibold text-primary-500 hover:underline">
                  {profile.email}
               </Link>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <Button
               variant="outline"
               className="bg-primary-500 text-white hover:bg-primary-600 hover:text-white rounded-full">
               <FaEdit size={16} />
               Edit Profile
            </Button>
         </div>
      </div>
   );
}
