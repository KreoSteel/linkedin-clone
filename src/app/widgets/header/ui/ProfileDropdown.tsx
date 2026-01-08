"use client";
import { Button } from "@/app/shared/ui/button";
import { FaUser } from "react-icons/fa";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/app/shared/ui/dropdown-menu";
import Link from "next/link";
import { signOutAction } from "../api/sign-out-action";
import { authClient } from "@/app/shared/api/auth-client";

export default function ProfileDropdown() {
   const session = authClient.useSession();

   const user = session.data?.user;
   if (!user) {
      return null;
   }
   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="flex flex-col items-center gap-0.5 px-3 py-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900 cursor-pointer">
            <FaUser size={24} />
            <span className="font-medium">Me</span>
         </DropdownMenuTrigger>
         <DropdownMenuContent>
            <DropdownMenuLabel className="flex items-center gap-3">
               <div className="flex items-center gap-2">
                  <FaUser size={24} />
               </div>
               <div className="flex flex-col">
                  <span className="font-medium">{user.name || "Unknown User"}</span>
                  <span className="text-sm text-neutral-500">{user.email || "No email set"}</span>
               </div>
            </DropdownMenuLabel>

            <DropdownMenuItem>
               <Link href="/profile">
                  <Button
                     variant="default"
                     className="bg-primary-500 h-8 text-white hover:bg-primary-600 rounded-full">
                     <span className="font-medium">View Profile</span>
                  </Button>
               </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
               <DropdownMenuLabel className="flex items-center py-0">
                  <span className="font-medium text-base">Manage</span>
               </DropdownMenuLabel>
               <DropdownMenuItem>
                  <Link href="/recent-activity">
                     <span className="font-medium text-neutral-500">
                        Posts & Activity
                     </span>
                  </Link>
               </DropdownMenuItem>

               <DropdownMenuSeparator />

               <DropdownMenuItem>
                  <Button
                     variant="ghost"
                     onClick={signOutAction}
                     className="w-full justify-start h-4 cursor-pointer px-0 text-neutral-500 hover:text-neutral-900">
                     <span>Sign Out</span>
                  </Button>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
