"use client";
import React, { useState } from "react";

export default function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "posts", label: "Posts", icon: "fa-solid fa-border-all" },
    { key: "reels", label: "Reels", icon: "fa-solid fa-video" },
    { key: "tagged", label: "Tagged", icon: "fa-solid fa-user-tag" },
  ];

  return (
    <div className="w-full border-t border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-center gap-6 sm:gap-10 py-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              aria-label={t.label}
              className={`group relative flex items-center gap-2 px-2 py-2 text-sm font-medium transition ${
                activeTab === t.key
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <span
                className={`inline-flex items-center justify-center w-6 h-6 rounded ${
                  activeTab === t.key
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500"
                }`}
              >
                <i className={t.icon}></i>
              </span>
              <span className="hidden sm:inline">{t.label}</span>
              {/* underline animation */}
              <span
                className={`absolute mt-7 h-[2px] w-10 sm:w-16 origin-center scale-x-0 bg-gray-900 dark:bg-white transition-transform duration-200 ease-out group-hover:scale-x-100 ${
                  activeTab === t.key ? "scale-x-100" : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
