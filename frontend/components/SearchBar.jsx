"use client";
import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="flex items-center">
        <div className={`relative transition-all duration-300 ${isExpanded ? 'w-full' : 'w-full'} group`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            onBlur={() => !query && setIsExpanded(false)}
            placeholder="Search for news, topics, or keywords..."
            className={`w-full h-14 rounded-full bg-white dark:bg-gray-800 border-2 border-white dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 dark:focus:ring-purple-500/30 transition-all duration-300 px-14 font-medium shadow-lg group-hover:shadow-xl ${
              isExpanded ? 'ring-4 ring-purple-500/20' : ''
            }`}
          />
          <button
            type="submit"
            className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-purple-600 dark:text-purple-400 hover:scale-120 transition-transform duration-300"
          >
            <i className="fa-solid fa-magnifying-glass text-lg"></i>
          </button>
          
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                onSearch("");
              }}
              className="absolute right-5 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:scale-120 transition-all duration-300"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
