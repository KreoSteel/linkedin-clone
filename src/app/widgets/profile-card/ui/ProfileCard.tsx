"use client";

import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";
import ProfileAvatarUpload from "../../../features/profile-avatar-upload/ui/ProfileAvatar";
import { ProfileCardProps } from "../model/types";

export default function ProfileCard({ profile, isForFeed = false, isCurrentUser = false }: ProfileCardProps) {
   const avatarSize = isForFeed ? 88 : 150;
   const bannerHeight = isForFeed ? 64 : 160;
   const avatarTop = bannerHeight - (avatarSize * 0.5);
   const leftPosition = isForFeed ? "left-4" : "left-6";

   return (
      <div className="relative w-full bg-white shadow-sm rounded-lg overflow-hidden border border-neutral-200">
         <ProfileBanner isForFeed={isForFeed} />
         <div
            className={`absolute ${leftPosition}`}
            style={{ top: `${avatarTop}px` }}
         >
            <ProfileAvatarUpload imageUrl={profile.avatar} isForFeed={isForFeed} />
         </div>
         <ProfileInfo profile={profile} isForFeed={isForFeed} avatarSize={avatarSize} isCurrentUser={isCurrentUser} />
      </div>
   );
}
