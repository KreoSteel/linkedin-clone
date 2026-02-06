"use client";

import { useQuery } from "@tanstack/react-query";
import { getProfileOptions } from "@/app/features/profile";
import { ProfileCard } from "@/app/widgets/profile-card";
import { ConnectionsCard } from "@/app/features/connections-card";
import type { ProfileType } from "@/app/entities/profile";

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
