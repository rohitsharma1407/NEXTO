"use client";
import React from "react";

export default function ProfileStats({ posts = 0, followers = 0, following = 0, onFollowersClick }) {
  return (
    <div className="w-full">
      <div className="flex justify-around py-4 px-4">
        {/* Posts */}
        <button
          type="button"
          aria-label="Posts"
          className="group text-center cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition rounded-lg px-3 py-2"
        >
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {posts.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            posts
            <span className="block mx-auto mt-1 h-[2px] w-6 origin-center scale-x-0 bg-gray-900 dark:bg-white transition-transform duration-200 ease-out group-hover:scale-x-100"></span>
          </p>
        </button>

        {/* Followers */}
        <button
          type="button"
          aria-label="Followers"
          onClick={onFollowersClick}
          className="group text-center cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition rounded-lg px-3 py-2"
        >
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {followers.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            followers
            <span className="block mx-auto mt-1 h-[2px] w-6 origin-center scale-x-0 bg-gray-900 dark:bg-white transition-transform duration-200 ease-out group-hover:scale-x-100"></span>
          </p>
        </button>

        {/* Following */}
        <button
          type="button"
          aria-label="Following"
          className="group text-center cursor-pointer hover:text-gray-600 dark:hover:text-gray-400 transition rounded-lg px-3 py-2"
        >
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {following.toLocaleString()}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            following
            <span className="block mx-auto mt-1 h-[2px] w-6 origin-center scale-x-0 bg-gray-900 dark:bg-white transition-transform duration-200 ease-out group-hover:scale-x-100"></span>
          </p>
        </button>
      </div>
    </div>
  );
}
