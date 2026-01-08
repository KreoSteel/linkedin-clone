"use client";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

type ProfileAvatarUploadProps = {
   imageUrl?: string | null;
   onUploadClick?: () => void;
}

export default function ProfileAvatarUpload({
   imageUrl,
   onUploadClick,
}: ProfileAvatarUploadProps) {
   const hasImage = !!imageUrl;

   return (
      <div className="relative inline-block">
         <button
            onClick={onUploadClick}
            className={`relative h-[150px] w-[150px] ${
               !hasImage
                  ? "cursor-pointer transition-opacity hover:opacity-80"
                  : "cursor-default"
            }`}
            aria-label={hasImage ? "Profile photo" : "Upload profile photo"}>
            <Image
               src={imageUrl || "/default-avatar.svg"}
               alt="Profile Avatar"
               fill
               className="rounded-full object-cover"
            />
            {!hasImage && (
               <div className="pointer-events-none absolute bottom-1 left-1 right-1 top-1 rounded-full border-2 border-dashed border-gray-400/70" />
            )}
            <div
               className="absolute -bottom-1 -right-1 flex h-11 w-11 rounded-full text-primary-500 border-2 border-primary-500 bg-white items-center justify-center"
            >
               <FaPlus className="text-xl leading-none" />
            </div>
         </button>
      </div>
   );
}
