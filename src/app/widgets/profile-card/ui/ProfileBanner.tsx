"use client";
import Image from "next/image";

export default function ProfileBanner() {
   return (
      <div className="relative h-40 w-full">
         <Image
            src="/default-banner.svg"
            alt="Profile Banner"
            width={700}
            height={200}
            className="object-cover"
         />
      </div>
   );
}
