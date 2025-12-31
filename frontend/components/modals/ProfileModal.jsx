"use client";
import React from "react";
import { useRouter } from "next/navigation";
import useUser from "../../hooks/useUser";

export default function ProfileModal({ isOpen, onClose }) {
  const { user, logout } = useUser();
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
    router.push("/");
  };

  const handleViewFullProfile = () => {
    onClose();
    router.push("/profile");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-[480px] mx-auto bg-white dark:bg-gray-800 rounded-t-2xl p-4 animate-slideUp">
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold dark:text-white">Profile</h2>
          <button onClick={onClose} className="text-xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">✕</button>
        </div>

        {/* Profile Info */}
        <div className="space-y-4">
          {/* User Info */}
          <div className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg dark:text-white">{user?.name || "User"}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email || ""}</p>
            </div>
          </div>

          {/* Menu Options */}
          <div className="space-y-2">
            <button
              onClick={handleViewFullProfile}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <i className="fa-solid fa-user text-purple-600 dark:text-purple-400 w-5"></i>
              <span className="text-gray-800 dark:text-gray-200">View Full Profile</span>
              <i className="fa-solid fa-chevron-right ml-auto text-gray-400"></i>
            </button>

            <button
              onClick={handleViewFullProfile}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <i className="fa-solid fa-gear text-blue-600 dark:text-blue-400 w-5"></i>
              <span className="text-gray-800 dark:text-gray-200">Settings & Preferences</span>
              <i className="fa-solid fa-chevron-right ml-auto text-gray-400"></i>
            </button>

            <button
              onClick={() => {
                onClose();
                router.push("/alerts");
              }}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-left"
            >
              <i className="fa-solid fa-bell text-yellow-600 dark:text-yellow-400 w-5"></i>
              <span className="text-gray-800 dark:text-gray-200">Notifications</span>
              <i className="fa-solid fa-chevron-right ml-auto text-gray-400"></i>
            </button>

            <div className="border-t border-gray-200 dark:border-gray-600 my-2"></div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
            >
              <i className="fa-solid fa-right-from-bracket text-red-600 dark:text-red-400 w-5"></i>
              <span className="text-red-600 dark:text-red-400 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
