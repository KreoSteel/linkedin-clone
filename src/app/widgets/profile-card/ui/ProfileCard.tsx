"use client";

import ProfileBanner from "./ProfileBanner";
import ProfileInfo from "./ProfileInfo";
import ProfileAvatarUpload from "./ProfileAvatar";
import { useProfileContext } from "../model/profile-context";

export default function ProfileCard() {
   const { profile } = useProfileContext();
   return (
      <div className="relative bg-white rounded-lg overflow-hidden border border-neutral-200">
         <ProfileBanner />
         <div className="absolute left-6 top-[100px]">
            <ProfileAvatarUpload />
         </div>
         <ProfileInfo profile={profile} />
      </div>
   );
}
