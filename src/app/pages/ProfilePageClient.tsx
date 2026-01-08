"use client";
import ProfileCard from "../widgets/profile-card/ui/ProfileCard";
import type { ProfileType } from "../entities/profile/model/schema";
import { ProfileProviders } from "../(app)/providers/profile-providers";
type User = {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
   image: string | null;
   createdAt: Date;
   updatedAt: Date;
   name: string | null;
   emailVerified: boolean;
};

export default function ProfilePageClient({ user }: { user: User }) {
   return (
      <div className="py-6">
         <ProfileProviders profile={user}>
            <ProfileCard />
         </ProfileProviders>
      </div>
   );
}