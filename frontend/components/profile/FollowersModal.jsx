"use client";
import React, { useState } from "react";

export default function FollowersModal({ isOpen, onClose, followers = [] }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFollowers = followers.filter((f) =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-sm max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Followers</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-800">
          <input
            type="text"
            placeholder="Search followers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        {/* Followers List */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(80vh - 120px)" }}>
          {filteredFollowers.length > 0 ? (
            filteredFollowers.map((follower) => (
              <div
                key={follower.id}
                className="px-6 py-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    {follower.profileImage ? (
                      <img src={follower.profileImage} alt={follower.username} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">👤</div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {follower.fullName}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      @{follower.username}
                    </p>
                  </div>
                </div>
                <button className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition">
                  Following
                </button>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No followers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
