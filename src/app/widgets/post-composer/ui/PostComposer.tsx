import { UploadPhoto } from "@/app/features/create-post-button-actions/upload-photo";
import { UploadVideo } from "@/app/features/create-post-button-actions/upload-video";
import { CreatePostModal } from "@/app/features/post-modals";
import { ProfileAvatarUpload } from "@/app/features/profile-avatar-upload";
import { type ProfileType } from "@/app/entities/profile";

export default function PostComposer({ profile }: { profile: ProfileType }) {
   return (
      <div className="flex flex-col gap-4 bg-white shadow-sm rounded-lg p-4 border border-neutral-200">
         <div className="flex items-center gap-4">
            <ProfileAvatarUpload isJustAvatar={true} imageUrl={profile.avatar} />
            <CreatePostModal />
         </div>
         <div className="flex items-center justify-center gap-2">
            <UploadPhoto />
            <UploadVideo />
         </div>
      </div>
   );
}