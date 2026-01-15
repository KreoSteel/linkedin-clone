"use client";
import { Input } from "@/app/shared/ui/input";
import { useDebounce } from "use-debounce";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function SearchBar(props: any) {
   const router = useRouter();

   const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const query = formData.get("query") as string;
      const params = new URLSearchParams();
      const [debouncedQuery] = useDebounce(query, 500);
      if (debouncedQuery) {
         params.set("query", debouncedQuery);
      } else {
         params.delete("query");
      }
      router.push(`/search?${params.toString()}`);
   };

   return (
      <form
         onSubmit={handleSearch}
         className="flex items-center justify-center relative w-96">
         <Input
            type="text"
            name="query"
            placeholder="Search"
            className="w-full pl-8 border-neutral-400 rounded-full"
            
         />
         <FaSearch size={20} className="absolute left-2 text-neutral-600" />
      </form>
   );
}
