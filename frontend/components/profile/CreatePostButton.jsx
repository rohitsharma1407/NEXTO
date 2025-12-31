"use client";
import React, { useState } from "react";

export default function CreatePostButton({ onCreatePost }) {
  const [showMenu, setShowMenu] = useState(false);

  const options = [
    { id: "photo", label: "Upload Photo", icon: "fa-solid fa-image" },
    { id: "video", label: "Upload Video", icon: "fa-solid fa-video" },
    { id: "reel", label: "Create Reel", icon: "fa-solid fa-play" },
    { id: "story", label: "Create Story", icon: "fa-solid fa-bolt" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition fixed bottom-24 right-6 z-40"
        title="Create post"
      >
        <i className="fa-solid fa-plus text-xl"></i>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden w-48 z-50">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onCreatePost(option.id);
                setShowMenu(false);
              }}
              className="w-full px-4 py-3 flex items-center gap-3 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
            >
              <i className={`${option.icon} w-5`}></i>
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
