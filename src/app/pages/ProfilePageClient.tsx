"use client";
import ProfileCard from "../widgets/profile-card/ui/ProfileCard";
import { ProfileProviders } from "../(app)/providers/profile-providers";
import { ProfileType } from "../entities/profile/model/schema";

export default function ProfilePageClient({ user }: { user: ProfileType }) {
   return (
      <div className="py-6 flex flex-col items-center justify-center w-full">
         <ProfileProviders profile={user}>
            <ProfileCard profile={user} isForFeed={false} />
         </ProfileProviders>
      </div>
   );
}