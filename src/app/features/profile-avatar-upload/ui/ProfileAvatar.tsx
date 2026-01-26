"use client";
import Image from "next/image";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { useActionState, useRef } from "react";
import { avatarUploadAction } from "../api/avatar-upload-action";
import { ProfileAvatarUploadProps } from "../model/types";
import { useStateToast } from "@/app/shared/utils/use-state-toast";

export default function ProfileAvatarUpload({
   imageUrl,
   isJustAvatar = false,
   isForFeed = false,
   isCurrentUser = false,
}: ProfileAvatarUploadProps) {
   const [state, formAction] = useActionState(
      avatarUploadAction,
      undefined
   );
   useStateToast(state);

   const hasImage = !!imageUrl;
   const avatarSize = isForFeed ? "h-[88px] w-[88px]" : "h-[150px] w-[150px]";
   const iconSize = isForFeed ? "h-8 w-8" : "h-11 w-11";
   const iconTextSize = isForFeed ? "text-lg" : "text-xl";

   const inputRef = useRef<HTMLInputElement>(null);

   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.form) {
         e.target.form.requestSubmit();
      }
   };

   const handleClick = () => {
      inputRef.current?.click();
   };

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

   if (!isCurrentUser) {
      return (
         <div className={`relative inline-block rounded-full object-cover ${avatarSize}`}>
            <Image
               src={imageUrl || "/default-avatar.svg"}
               alt="Profile Avatar"
               fill
               className="rounded-full object-cover"
            />
         </div>
      );
   }

   return (
      <form action={formAction} className="relative inline-block">
         <input
            type="file"
            name="file"
            className="hidden"
            accept="image/jpeg, image/png, image/webp"
            ref={inputRef}
            onChange={handleFileChange}
         />
         <button
            type="button"
            onClick={handleClick}
            className={`relative ${avatarSize} cursor-pointer transition-opacity hover:opacity-80 ${!hasImage
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
            {!hasImage && (
               <div
                  className={`absolute -bottom-1 -right-1 flex ${iconSize} rounded-full text-primary-500 border-2 border-primary-500 bg-white items-center justify-center`}>
                  <FaPlus className={`${iconTextSize} leading-none`} />
               </div>
            )}
         </button>
      </form>
   );
}
