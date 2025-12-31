"use client";
import React, { useState } from "react";
import Link from "next/link";
import AuthModal from "../modals/AuthModal";
import { useRouter } from "next/navigation";
import useUser from "../../hooks/useUser";

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
  const { user } = useUser();
  const router = useRouter();

  const handleProfileClick = () => {
    console.log("Profile clicked, user state:", user);
    console.log("User exists:", !!user);
    if (user) {
      console.log("User exists, navigating to profile");
      router.push("/profile");
    } else {
      console.log("No user, showing auth modal");
      setShowAuthModal(true);
    }
  };

  const navItems = [
    { id: "home", label: "Home", icon: ICONS.home, href: "/" },
    { id: "explore", label: "Explore", icon: ICONS.explore, href: "/explore" },
    { id: "add", label: "Add", icon: ICONS.add, href: "#", action: true },
    { id: "messages", label: "Messages", icon: ICONS.messages, href: "/alerts" },
    { id: "profile", label: "Profile", icon: ICONS.profile, href: "#", action: true },
  ];

  const handleNavClick = (item) => {
    setActive(item.id);
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <>
      <div className="optionsbar">
        {navItems.map((item) => {
          if (item.id === "profile") {
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActive(item.id);
                  handleProfileClick();
                }}
                className={`flex flex-col items-center gap-1 transition-all ${
                  active === item.id ? "text-primary scale-110" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                style={{ background: 'none', border: 'none' }}
              >
                <span className="text-xl"><i className={item.icon}></i></span>
                <span className="text-xs font-semibold hidden xs:block">{item.label}</span>
              </button>
            );
          }
          
          if (item.action) {
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex flex-col items-center gap-1 transition-all ${
                  active === item.id ? "text-primary scale-110" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                }`}
                style={{ background: 'none', border: 'none' }}
              >
                <span className="text-xl"><i className={item.icon}></i></span>
                <span className="text-xs font-semibold hidden xs:block">{item.label}</span>
              </button>
            );
          }
          
          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActive(item.id)}
              className={`flex flex-col items-center gap-1 transition-all ${
                active === item.id ? "text-primary scale-110" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              }`}
            >
              <span className="text-xl"><i className={item.icon}></i></span>
              <span className="text-xs font-semibold hidden xs:block">{item.label}</span>
            </Link>
          );
        })}
      </div>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
}
