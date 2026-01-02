"use client";
import React, { useState } from "react";

export default function CreatePostButton({ onCreatePost }) {
  const [showMenu, setShowMenu] = useState(false);

  const styles = {
    container: "relative",
    fabButton: "fixed bottom-24 right-6 md:right-10 h-14 w-14 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-2xl hover:scale-105 transition transform flex items-center justify-center z-50",
    active: "scale-110 rotate-45",
    backdrop: "fixed inset-0 bg-black/40 backdrop-blur-sm z-40",
    menuItems: "fixed bottom-44 right-6 md:right-10 flex flex-col gap-3 z-50",
    menuItem: "flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/90 border border-white/10 shadow-lg text-white transition hover:-translate-y-[1px]",
    iconBg: "h-9 w-9 rounded-xl flex items-center justify-center text-white shadow-md",
    menuLabel: "text-sm font-semibold",
  };

  const options = [
    { id: "photo", label: "Upload Photo", icon: "fa-solid fa-image", color: "from-blue-500 to-blue-600" },
    { id: "video", label: "Upload Video", icon: "fa-solid fa-video", color: "from-purple-500 to-purple-600" },
    { id: "reel", label: "Create Reel", icon: "fa-solid fa-play", color: "from-pink-500 to-red-600" },
    { id: "story", label: "Create Story", icon: "fa-solid fa-bolt", color: "from-yellow-400 to-orange-500" },
  ];

  return (
    <div className={styles.container}>
      {/* Floating Action Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className={`${styles.fabButton} ${showMenu ? styles.active : ''}`}
        title="Create post"
      >
        <i className="fa-solid fa-plus text-2xl"></i>
      </button>

      {/* Animated Options Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div 
            className={styles.backdrop}
            onClick={() => setShowMenu(false)}
          />
          
          {/* Menu Items */}
          <div className={styles.menuItems}>
            {options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => {
                  onCreatePost(option.id);
                  setShowMenu(false);
                }}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                }}
                className={styles.menuItem}
              >
                <div className={`${styles.iconBg} bg-gradient-to-br ${option.color}`}>
                  <i className={`${option.icon} text-sm`}></i>
                </div>
                <span className={styles.menuLabel}>
                  {option.label}
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
