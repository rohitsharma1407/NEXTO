"use client";
import React, { useState } from "react";

export default function FollowersModal({ isOpen, onClose, followers = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("followers"); // followers or following

  // Mock data if empty
  const mockFollowers = [
    { id: 1, username: "john_doe", fullName: "John Doe", profileImage: "", isFollowing: true },
    { id: 2, username: "jane_smith", fullName: "Jane Smith", profileImage: "", isFollowing: true },
    { id: 3, username: "alex_wilson", fullName: "Alex Wilson", profileImage: "", isFollowing: false },
    { id: 4, username: "sarah_jones", fullName: "Sarah Jones", profileImage: "", isFollowing: true },
  ];

  const displayFollowers = followers.length > 0 ? followers : mockFollowers;

  const filteredFollowers = displayFollowers.filter((f) =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl w-full max-w-md max-h-[85vh] overflow-hidden shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-slideUp">
        {/* Header with Tabs */}
        <div className="sticky top-0 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 z-10">
          <div className="px-6 py-4 flex items-center justify-between">
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{activeTab === 'followers' ? 'Followers' : 'Following'}</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          
          {/* Tabs */}
          <div className="flex border-t border-gray-200/50 dark:border-gray-800/50">
            <button
              onClick={() => setActiveTab('followers')}
              className={`flex-1 py-4 text-sm font-bold transition-all duration-300 relative ${
                activeTab === 'followers'
                  ? 'text-gray-900 dark:text-white scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Followers
              {activeTab === 'followers' && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full animate-slideInTop" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('following')}
              className={`flex-1 py-4 text-sm font-bold transition-all duration-300 relative ${
                activeTab === 'following'
                  ? 'text-gray-900 dark:text-white scale-105'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Following
              {activeTab === 'following' && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-slideInTop" />
              )}
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-4 bg-gradient-to-b from-gray-50/50 to-transparent dark:from-gray-900/50 dark:to-transparent">
          <div className="relative group">
            <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors text-sm"></i>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 text-sm transition-all duration-300"
            />
          </div>
        </div>

        {/* List */}
        <div className="overflow-y-auto" style={{ maxHeight: "calc(85vh - 180px)" }}>
          {filteredFollowers.length > 0 ? (
            filteredFollowers.map((follower) => (
              <div
                key={follower.id}
                className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {/* Profile Image */}
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                      {follower.profileImage ? (
                        <img src={follower.profileImage} alt={follower.username} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <i className="fa-solid fa-user text-lg"></i>
                        </div>
                      )}
                    </div>
                    {follower.isVerified && (
                      <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-0.5">
                        <i className="fas fa-check text-white text-[8px]"></i>
                      </div>
                    )}
                  </div>
                  
                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {follower.fullName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      @{follower.username}
                    </p>
                  </div>
                </div>
                
                {/* Follow Button */}
                <button 
                  className={`px-5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 active:scale-95 ${
                    follower.isFollowing
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm'
                  }`}
                >
                  {follower.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            ))
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                <i className="fa-solid fa-users text-3xl text-gray-400"></i>
              </div>
              <p className="text-gray-900 dark:text-white font-semibold mb-1">No users found</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Try searching for someone else</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
