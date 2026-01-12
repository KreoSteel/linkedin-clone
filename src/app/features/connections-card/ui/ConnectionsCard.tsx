import { UserPlus } from "lucide-react";
import Link from "next/link";

export default function ConnectionsCard() {
   return (
      <Link href="/connections">
         <div className="bg-white shadow-sm flex group transition-all duration-300 justify-between items-center rounded-lg p-4 border border-neutral-200">
             <div className="text-left">
                <h3 className="group-hover:underline">Connections</h3>
                <p className="group-hover:underline text-sm text-neutral-500">Grow your network</p>
             </div>
             <div>
                <UserPlus className="fill-current" />
             </div>
         </div>
      </Link>
   );
}
