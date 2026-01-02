"use client";
import React, { useState } from "react";
import Link from "next/link";
import AuthModal from "../modals/AuthModal";
import { useRouter } from "next/navigation";
import useUser from "../../hooks/useUser";
import styles from "./OptionsBar.module.css";

const ICONS = {
  home: "fa-solid fa-house",
  explore: "fa-solid fa-magnifying-glass",
  add: "fa-solid fa-plus",
  messages: "fa-regular fa-message",
  profile: "fa-regular fa-user",
};

export default function OptionsBar() {
  const [active, setActive] = useState("home");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const { user, isGuest } = useUser();
  const router = useRouter();

  const handleProfileClick = () => {
    console.log("Profile clicked, user state:", user, "isGuest:", isGuest);
    
    // If user is logged in, go to profile
    if (user && !isGuest) {
      console.log("User logged in, navigating to profile");
      router.push("/profile");
    } else {
      // If guest or not logged in, show auth modal
      console.log("Guest or not logged in, showing auth modal");
      setShowAuthModal(true);
    }
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
  };

  const uploadOptions = [
    { id: "local-news", label: "Local News", icon: "fa-solid fa-newspaper", gradient: "linear-gradient(135deg,#22c55e,#10b981)", action: () => router.push("/explore?upload=true") },
    { id: "post", label: "Create Post", icon: "fa-solid fa-image", gradient: "linear-gradient(135deg,#a855f7,#ec4899)", action: () => router.push("/profile") },
  ];

  const navItems = [
    { id: "home", label: "Home", icon: ICONS.home, href: "/" },
    { id: "explore", label: "Explore", icon: ICONS.explore, href: "/explore" },
    { id: "add", label: "Add", icon: ICONS.add, href: "#", action: true },
    { id: "messages", label: "Alerts", icon: ICONS.messages, href: "/alerts" },
    { id: "profile", label: "Profile", icon: ICONS.profile, href: "#", action: true },
  ];

  return (
    <>
      <div className={styles.bar}>
        {navItems.map((item) => {
          if (item.id === "add") {
            return (
              <div key={item.id} className={styles.addWrapper}>
                <button
                  onClick={() => setShowUploadMenu(!showUploadMenu)}
                  className={`${styles.item} ${styles.addButton} ${showUploadMenu ? styles.addActive : ""}`}
                >
                  <span className={styles.icon}>
                    <i className={`${item.icon} ${styles.iconInner} ${showUploadMenu ? styles.rotated : ""}`}></i>
                  </span>
                  <span className={styles.label}>{item.label}</span>
                </button>
                
                {/* Upload Menu */}
                {showUploadMenu && (
                  <>
                    <div className={styles.backdrop} onClick={() => setShowUploadMenu(false)}></div>
                    <div className={styles.uploadMenu}>
                      {uploadOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            option.action();
                            setShowUploadMenu(false);
                          }}
                          className={styles.uploadOption}
                        >
                          <div className={styles.uploadIcon} style={{ backgroundImage: option.gradient }}>
                            <i className={option.icon}></i>
                          </div>
                          <span>{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          }
          
          if (item.id === "profile") {
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  handleProfileClick();
                }}
                className={`${styles.item} ${active === item.id ? styles.active : ""}`}
              >
                <span className={styles.icon}><i className={item.icon}></i></span>
                <span className={styles.label}>{item.label}</span>
                {user && !isGuest && (
                  <span className={styles.onlineDot}></span>
                )}
              </button>
            );
          }
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActive(item.id)}
              className={`${styles.item} ${active === item.id ? styles.active : ""}`}
            >
              <span className={styles.icon}><i className={item.icon}></i></span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      {/* Auth Modal for Guest Users */}
      <AuthModal isOpen={showAuthModal} onClose={handleAuthModalClose} />
    </>
  );
}
