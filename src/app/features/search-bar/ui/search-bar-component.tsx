import { Input } from "@/app/shared/ui/input";
import { FaSearch } from "react-icons/fa";

export default function SearchBarComponent() {
    return (
        <div className="flex items-center justify-center relative w-96">
            <Input type="text" placeholder="Search" className="w-full pl-8 border-neutral-400 rounded-full" />
            <FaSearch size={20} className="absolute left-2 text-neutral-600" />
        </div>
    )
}