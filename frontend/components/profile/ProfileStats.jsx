"use client";
import React from "react";

function abbrev(num) {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(num);
}

export default function ProfileStats({ posts = 0, followers = 0, following = 0, onFollowersClick }) {
  return (
    <div className="flex items-center gap-6">
      <div className="text-center">
        <p className="text-xl font-bold text-gray-900 dark:text-white">{abbrev(posts)}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">posts</p>
      </div>

      <button type="button" aria-label="Followers" onClick={onFollowersClick} className="text-center">
        <p className="text-xl font-bold text-gray-900 dark:text-white">{abbrev(followers)}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">followers</p>
      </button>

      <div className="text-center">
        <p className="text-xl font-bold text-gray-900 dark:text-white">{abbrev(following)}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500">following</p>
      </div>
    </div>
  );
}
