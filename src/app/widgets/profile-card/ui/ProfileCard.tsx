"use client";

import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";
import ProfileAvatarUpload from "../../../features/profile-avatar-upload/ui/ProfileAvatar";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";
interface ProfileCardProps {
   profile: ProfileType;
   isForFeed?: boolean;
}

export default function ProfileCard({ profile, isForFeed = false }: ProfileCardProps) {
   return (
      <div className="relative bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200">
         <ProfileBanner isForFeed={isForFeed} />
         <div className={`absolute ${isForFeed ? "left-4 top-[24px]" : "left-6 top-[100px]"}`}>
            <ProfileAvatarUpload imageUrl={profile.avatar} isForFeed={isForFeed} />
         </div>
         <ProfileInfo profile={profile} isForFeed={isForFeed} />  
      </div>
   );
}
