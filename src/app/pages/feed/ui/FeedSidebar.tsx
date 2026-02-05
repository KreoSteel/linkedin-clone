"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileOptions } from "@/app/entities/profile/api/profile-query-options";
import ProfileCard from "@/app/widgets/profile-card/ui/ProfileCard";
import ConnectionsCard from "@/app/features/connections-card/ui/ConnectionsCard";
import type { ProfileType } from "@/app/entities/profile/model/profile-schema";

interface FeedSidebarProps {
  userId: string;
  initialProfile: ProfileType;
}

export default function FeedSidebar({ userId, initialProfile }: FeedSidebarProps) {
  const { data: profile } = useQuery({
    ...getProfileOptions(userId),
    initialData: initialProfile,
  });

  return (
    <aside className="flex w-56 shrink-0 flex-col gap-4">
      <ProfileCard profile={profile} isForFeed={true} />
      <ConnectionsCard />
    </aside>
  );
}
