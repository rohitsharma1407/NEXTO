"use client";
import React, { useState, useEffect } from "react";
import ProfileStats from "./ProfileStats";

export default function ProfileHeader({ user, posts = 0, onEditProfile, onShareProfile, onCopyProfile, onLogout }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [avatarSize, setAvatarSize] = useState(112);

  useEffect(() => {
    function updateSize() {
      setAvatarSize(window.innerWidth >= 768 ? 128 : 112);
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="w-full bg-gray-900 dark:bg-gray-900 text-white rounded-2xl p-4 sm:p-6 shadow-sm">
      

      {/* Profile Content */}
      <div className="mt-2 sm:mt-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Left: Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="p-[3px] rounded-full bg-gradient-to-tr from-pink-500 via-orange-400 to-yellow-300">
                <div className="p-1 rounded-full bg-slate-950">
                  {/* Enforce responsive avatar size via inline style to avoid external overrides */}
                  <div
                    className="profile-picture rounded-full overflow-hidden bg-gray-100 dark:bg-slate-800 flex items-center justify-center border border-gray-200 dark:border-white/10 shadow-sm"
                    style={{ width: avatarSize + "px", height: avatarSize + "px" }}
                  >
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt={user.username || "profile"}
                        className="w-full h-full object-cover"
                        width={avatarSize}
                        height={avatarSize}
                      />
                    ) : (
                      <i className="fa-solid fa-user text-4xl text-gray-400" aria-hidden="true"></i>
                    )}
                  </div>
                </div>
              </div>
              {user?.isVerified && (
                <div className="absolute -bottom-2 right-2 h-7 w-7 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg border border-white/30">
                  <i className="fas fa-check text-white text-xs"></i>
                </div>
              )}
            </div>
          </div>

          {/* Center: Stats */}
          <div className="flex-1 flex flex-col items-center md:items-center">
            <div className="hidden md:block">
              <ProfileStats posts={posts} followers={user?.followers || 0} following={user?.following || 0} onFollowersClick={() => {}} />
            </div>
            {/* Username + handle on its own row */}
            <div className="mt-3 md:mt-4 text-center md:text-left">
              <h2 className="text-xl font-semibold text-white">{user?.fullName || user?.username || "User Name"}</h2>
              <div className="flex items-center justify-center md:justify-center gap-3 text-sm text-gray-300 mt-1">
                <span className="opacity-90">@{user?.username}</span>
                {user?.isVerified && <span className="bg-blue-600 text-white rounded-full px-2 py-0.5 text-xs">verified</span>}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex-shrink-0 flex flex-col items-end gap-3 w-full md:w-auto">
            <div className="w-full md:w-auto md:block">
              <div className="hidden md:flex items-center gap-3">
                <button
                  onClick={() => setIsFollowing((p) => !p)}
                  aria-label="Follow"
                  className={
                    isFollowing
                      ? "px-5 py-2 rounded-md bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white font-semibold shadow-sm hover:bg-gray-300 transition"
                      : "px-5 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:brightness-105 transition"
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>

                <button
                  aria-label="Message"
                  className="px-4 py-2 rounded-md bg-gray-800 text-white font-semibold shadow-sm hover:bg-gray-700 transition"
                >
                  Message
                </button>

                <button
                  onClick={() => setShowMenu((p) => !p)}
                  className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-white hover:opacity-90 transition"
                  aria-label="More options small"
                >
                  <i className="fa-solid fa-ellipsis"></i>
                </button>
              </div>

              {/* Mobile actions: full width buttons stacked */}
              <div className="md:hidden flex gap-2">
                <button
                  onClick={() => setIsFollowing((p) => !p)}
                  aria-label="Follow"
                  className={
                    isFollowing
                      ? "flex-1 px-4 py-2 rounded-md bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-white font-semibold shadow-sm"
                      : "flex-1 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md"
                  }
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>

                <button
                  aria-label="Message"
                  className="px-3 py-2 rounded-md bg-gray-800 text-white font-semibold shadow-sm"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Inline stats for small screens */}
      <div className="mt-3 md:hidden px-1">
        <ProfileStats posts={posts} followers={user?.followers || 0} following={user?.following || 0} onFollowersClick={() => {}} />
      </div>
    </div>
  );
}
