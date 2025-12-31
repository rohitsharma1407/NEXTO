"use client";
import React, { useState } from "react";
import styles from "../../styles/profile.module.css";

export default function ProfileHeader({ user, onEditProfile, onShareProfile, onCopyProfile, onLogout }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      {/* Topbar with username and menu */}
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-lock text-xs text-gray-600 dark:text-gray-400" aria-hidden="true"></i>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white" aria-label="Username">
            {user?.username || "username"}
          </h1>
          <button onClick={onCopyProfile} className="ml-2 px-2 py-1 rounded-md text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700" aria-label="Copy profile link">
            <i className="fa-solid fa-link"></i>
          </button>
        </div>
        <div className="relative">
          <button onClick={() => setShowMenu((p) => !p)} className="text-2xl text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400" aria-label="More options">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg z-10">
              <button
                onClick={() => { setShowMenu(false); onLogout && onLogout(); }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-t-lg"
              >
                Logout
              </button>
              <button
                onClick={() => { setShowMenu(false); onShareProfile && onShareProfile(); }}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-b-lg"
              >
                Share Profile
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Profile Content */}
      <div className="mx-auto max-w-3xl px-4 pb-6">
        <div className="flex gap-6 items-start">
          {/* Profile Picture with gradient ring */}
          <div className="flex-shrink-0">
            <div className="p-[3px] rounded-full bg-gradient-to-br from-pink-500 via-yellow-400 to-purple-600">
              <div className={`${styles.profilePicture} w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.username || "profile"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <i className="fa-solid fa-user text-3xl text-gray-400" aria-hidden="true"></i>
                )}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1">
            {/* Actions row */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={onEditProfile}
                aria-label="Edit profile"
                className="px-4 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Edit profile
              </button>
              <button
                onClick={onShareProfile}
                aria-label="Share profile"
                className="px-4 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Share profile
              </button>
              <button
                aria-label="Follow"
                onClick={() => setIsFollowing((p) => !p)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                  isFollowing
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>

            {/* Bio */}
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                {user?.fullName || "User Name"}
              </h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {user?.bio || "Tell people a little about yourself"}
              </p>
              {user?.location && (
                <p className="text-xs text-gray-500">📍 {user.location}</p>
              )}
              {user?.website && (
                <a
                  href={user.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  🔗 {user.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
