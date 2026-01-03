import { FaBell, FaLinkedin, FaUser } from "react-icons/fa";
import { FaHouse, FaUsers, FaBriefcase, FaMessage } from "react-icons/fa6";
import Link from "next/link";
import SearchBarComponent from "@/app/features/search-bar/ui/search-bar-component";

export default function HeaderComponent() {
   return (
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200 bg-bg">
         <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-6">
            <Link href="/" className="shrink-0">
               <FaLinkedin size={54} className="text-primary-500" />
            </Link>

            <div className="shrink-0">
               <SearchBarComponent />
            </div>

            <nav className="flex flex-1 items-center justify-end gap-1">
               <Link
                  href="/"
                  className="flex flex-col items-center gap-0.5 px-3 py-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900">
                  <FaHouse size={24} />
                  <span className="font-medium">Home</span>
               </Link>

               <Link
                  href="/network"
                  className="flex flex-col items-center gap-0.5 px-3 py-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900">
                  <FaUsers size={24} />
                  <span className="font-medium">My Network</span>
               </Link>

               <Link
                  href="/jobs"
                  className="flex flex-col items-center gap-0.5 px-3 py-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900">
                  <FaBriefcase size={24} />
                  <span className="font-medium">Jobs</span>
               </Link>

               <Link
                  href="/messaging"
                  className="flex flex-col items-center gap-0.5 px-3 py-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900">
                  <FaMessage size={24} />
                  <span className="font-medium">Messaging</span>
               </Link>

               <Link
                  href="/notifications"
                  className="flex flex-col items-center gap-0.5 px-3 py-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900">
                  <FaBell size={24} />
                  <span className="font-medium">Notifications</span>
               </Link>

               <Link
                  href="/me"
                  className="flex flex-col items-center gap-0.5 border-l border-neutral-200 px-3 py-2 text-xs text-neutral-500 transition-colors hover:text-neutral-900">
                  <FaUser size={24} />
                  <span className="font-medium">Me</span>
               </Link>
            </nav>
         </div>
      </header>
   );
}
