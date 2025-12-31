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
    <div className="w-full bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-3xl grid grid-cols-3 gap-1 p-1">
        {displayPosts.map((post, index) => (
          <div
            key={post.id || index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer relative group"
          >
            {/* Post Image */}
            {post.image ? (
              <img
                src={post.image}
                alt="post"
                loading="lazy"
                className="w-full h-full object-cover group-hover:opacity-75 transition"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800">
                <i className="fa-solid fa-image text-2xl text-gray-500"></i>
              </div>
            )}

            {/* Hover Overlay */}
            {hoveredIndex === index && (
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-6">
                <div className="flex items-center gap-2 text-white">
                  <i className="fa-solid fa-heart text-lg"></i>
                  <span className="text-sm font-semibold">{post.likes || 0}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <i className="fa-solid fa-comment text-lg"></i>
                  <span className="text-sm font-semibold">{post.comments || 0}</span>
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
