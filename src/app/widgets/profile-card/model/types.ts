import { ProfileType } from "@/app/entities/profile/model/profile-schema";

export interface ProfileCardProps {
   profile: ProfileType;
   isForFeed?: boolean;
   isCurrentUser?: boolean;
}

export interface ProfileInfoProps {
   profile: ProfileType;
   isForFeed?: boolean;
   avatarSize: number;
   isCurrentUser?: boolean;
}

export interface CurrentUserProfileContextValue {
   profile: ProfileType;
}
