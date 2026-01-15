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
   // Proportional calculations:
   // Feed: banner=64px, avatar=72px, overlap=50%, gap=16px
   // Profile: banner=160px, avatar=150px, overlap=50%, gap=24px
   const avatarTop = isForFeed ? "top-10" : "top-26"; // 32px : 80px
   const leftPosition = isForFeed ? "left-4" : "left-6";
   
   return (
      <div className="relative w-full bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200">
         <ProfileBanner isForFeed={isForFeed} />
         <div className={`absolute ${leftPosition} ${avatarTop}`}>
            <ProfileAvatarUpload imageUrl={profile.avatar} isForFeed={isForFeed} />
         </div>
         <ProfileInfo profile={profile} isForFeed={isForFeed} />  
      </div>
   );
}
