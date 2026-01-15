"use client";
import Image from "next/image";

export default function ProfileBanner({ isForFeed = false }: { isForFeed?: boolean }) {
   return (
      <div className={`relative w-full ${isForFeed ? "h-16" : "h-40"}`}>
         <Image
            src="/default-banner.svg"
            alt="Profile Banner"
            width={700}
            height={isForFeed ? 64 : 200}
            className={`object-cover w-full ${isForFeed ? "h-16" : "h-40"}`}
         />
      </div>
   );
}
