"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

type ProfileAvatarUploadProps = {
   imageUrl?: string | null;
   onUploadClick?: () => void;
   isJustAvatar?: boolean;
   isForFeed?: boolean;
};

export default function ProfileAvatarUpload({
   imageUrl,
   onUploadClick,
   isJustAvatar = false,
   isForFeed = false,
}: ProfileAvatarUploadProps) {
   const hasImage = !!imageUrl;
   const avatarSize = isForFeed ? "h-[72px] w-[72px]" : "h-[150px] w-[150px]";
   const iconSize = isForFeed ? "h-8 w-8" : "h-11 w-11";
   const iconTextSize = isForFeed ? "text-lg" : "text-xl";

   if (isJustAvatar) {
      return (
         <>
         {imageUrl && (
            <div className="relative inline-block rounded-full object-cover">
               <Image
                  src={imageUrl}
                  alt="Profile Avatar"
                  fill
                  className="rounded-full object-cover"
               />
            </div>
         )} 
         {!imageUrl && (
            <div className="inline-block rounded-full object-cover h-[52px] w-[52px]">
               <Link href="/profile">
                  <Image
                     src="/default-avatar.svg"
                     alt="Profile Avatar"
                     width={52}
                     height={52}
                     className="rounded-full object-cover"
                  />
               </Link>
            </div>
         )}
         </>
      );
   }

   return (
      <div className="relative inline-block">
         <button
            onClick={onUploadClick}
            className={`relative ${avatarSize} ${
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
               className={`absolute -bottom-1 -right-1 flex ${iconSize} rounded-full text-primary-500 border-2 border-primary-500 bg-white items-center justify-center`}>
               <FaPlus className={`${iconTextSize} leading-none`} />
            </div>
         </button>
      </div>
   );
}
