"use client";
import React, { useState } from "react";

export default function ProfileGrid({ posts = [], activeTab = "posts", loading = false }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Filter posts based on active tab
  let displayPosts = posts;
  if (activeTab === "reels") {
    displayPosts = posts.filter((p) => p.type === "reel");
  } else if (activeTab === "saved") {
    displayPosts = posts.filter((p) => p.saved);
  } else if (activeTab === "tagged") {
    displayPosts = posts.filter((p) => p.tagged);
  }

  if (loading) {
    // Avoid reserving large space while loading
    return null;
  }

  if (displayPosts.length === 0) {
    // No items; keep layout calm without an intrusive empty state
    return null;
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-1 sm:gap-2">
        {displayPosts.map((post, index) => (
          <div
            key={post.id || index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="aspect-square bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer relative group rounded-md shadow-sm hover:shadow-md transition-all duration-300"
          >
            {/* Post Image */}
            {post.image ? (
              <img
                src={post.image}
                alt="post"
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                <i className="fa-solid fa-image text-3xl text-gray-400"></i>
              </div>
            )}

            {/* Hover Overlay with colorful gradient */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center gap-8 animate-fadeIn text-white">
                <div className="flex items-center gap-2 text-white drop-shadow">
                  <i className="fa-solid fa-heart text-lg"></i>
                  <span className="text-sm font-semibold">{(post.likes || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 text-white drop-shadow">
                  <i className="fa-solid fa-comment text-lg"></i>
                  <span className="text-sm font-semibold">{(post.comments || 0).toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Badge for Reels */}
            {post.type === "reel" && (
              <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold text-gray-900">
                <i className="fa-solid fa-play mr-1"></i>Reel
              </div>
            )}

            {/* Badge for Multiple Images */}
            {post.multipleImages && (
              <div className="absolute top-2 right-2 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-semibold text-gray-900">
                <i className="fa-solid fa-images"></i>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
