"use client";
import { Input } from "@/app/shared/ui/input";
import { useDebounce } from "use-debounce";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function SearchBar() {
   const router = useRouter();
   const [searchQuery, setSearchQuery] = useState("");
   const [debouncedQuery] = useDebounce(searchQuery, 500);

   const handleSearch = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const params = new URLSearchParams();
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
         <FaSearch size={20} className="absolute left-2 text-neutral-600" />
      </form>
   );
}
