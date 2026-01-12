import UploadPhoto from "@/app/features/create-post-button-actions/upload-photo/ui/UploadPhoto";
import UploadVideo from "@/app/features/create-post-button-actions/upload-video/ui/UploadVideo";
import CreatePostModal from "@/app/features/create-post-modal/ui/CreatePostModal";
import ProfileAvatarUpload from "@/app/features/profile-avatar-upload/ui/ProfileAvatar";
import { ProfileType } from "@/app/entities/profile/model/profile-schema";

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