"use client";
import React, { useState } from "react";

export default function ProfileTabs({ activeTab, setActiveTab }) {
  const styles = {
    container: "w-full mt-4",
    innerContainer: "w-full",
    tabsWrapper: "grid grid-cols-4 text-xs font-semibold tracking-wide text-gray-400 dark:text-gray-500 border-t border-gray-200 dark:border-gray-800",
    tabButton: "relative flex items-center justify-center py-3 transition text-gray-400 dark:text-gray-500",
    active: "text-white",
    icon: "text-lg",
    activeIndicator: "absolute -bottom-px left-6 right-6 h-0.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500",
  };

  const tabs = [
    { key: "posts", label: "Posts", icon: "fa-solid fa-border-all" },
    { key: "reels", label: "Reels", icon: "fa-solid fa-video" },
    { key: "news", label: "My News", icon: "fa-solid fa-newspaper" },
    { key: "tagged", label: "Tagged", icon: "fa-solid fa-user-tag" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.tabsWrapper}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              aria-label={t.label}
              title={t.label}
              className={`${styles.tabButton} ${activeTab === t.key ? "text-gray-900 dark:text-white" : "hover:text-gray-700 dark:hover:text-gray-300"}`}
            >
              <i className={`${t.icon} ${styles.icon} ${activeTab === t.key ? "text-gray-900 dark:text-white" : ""}`}></i>
              {/* show label on small screens for clarity */}
              <span className="sr-only sm:not-sr-only ml-2 text-xs">{t.label}</span>
              {activeTab === t.key && (
                <span className={styles.activeIndicator} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
