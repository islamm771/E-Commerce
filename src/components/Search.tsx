"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      toast.error("Please enter a search query");
      return;
    }

    router.push(`/products/search?q=${searchQuery}`);
  };
  return (
    <form onSubmit={handleSearch} className="w-full lg:w-64">
      <div className="relative">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="What are you looking for?"
          className="w-full bg-gray-100 rounded-md p-2 pl-4 pr-9 text-sm focus:outline-none"
        />
        <button type="submit" className="absolute right-3 top-2.5 text-gray-600 cursor-pointer">
          <FaSearch size={14} />
        </button>
      </div>
    </form>
  )
}

export default Search