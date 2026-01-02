"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [hasSeenAuthModal, setHasSeenAuthModal] = useState(false);

  // Load from localStorage on mount only (client-side)
  useEffect(() => {
    try {
      const t = localStorage.getItem("nexto_token");
      const u = localStorage.getItem("nexto_user");
      const guestMode = localStorage.getItem("nexto_guest_mode");
      const seenModal = localStorage.getItem("nexto_seen_auth_modal");
      
      if (t) setToken(t);
      if (u) {
        try {
          setUser(JSON.parse(u));
        } catch (e) {
          console.error("Failed to parse user:", e);
          localStorage.removeItem("nexto_user");
        }
      }
      if (guestMode === "true") setIsGuest(true);
      if (seenModal === "true") setHasSeenAuthModal(true);
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    } finally {
      setReady(true);
    }
  }, []);

  function saveSession(tok, usr) {
    try {
      if (tok) {
        localStorage.setItem("nexto_token", tok);
        setToken(tok);
      }
      if (usr) {
        localStorage.setItem("nexto_user", JSON.stringify(usr));
        setUser(usr);
        // Clear guest mode when user logs in
        setIsGuest(false);
        localStorage.removeItem("nexto_guest_mode");
      }
    } catch (error) {
      console.error("Error saving session:", error);
    }
  }

  function logout() {
    console.log("LOGOUT called - clearing all state");
    // Clear state IMMEDIATELY - synchronously
    setToken(null);
    setUser(null);
    setIsGuest(false);
    setHasSeenAuthModal(false);

    // Then clear storage
    try {
      localStorage.removeItem("nexto_token");
      localStorage.removeItem("nexto_user");
      localStorage.removeItem("nexto_guest_mode");
      localStorage.removeItem("nexto_seen_auth_modal");
      console.log("Logout complete - localStorage cleared");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  function continueAsGuest() {
    try {
      localStorage.setItem("nexto_guest_mode", "true");
      localStorage.setItem("nexto_seen_auth_modal", "true");
      setIsGuest(true);
      setHasSeenAuthModal(true);
      console.log("Continuing as guest");
    } catch (error) {
      console.error("Error setting guest mode:", error);
    }
  }

  const value = {
    token,
    user,
    ready,
    isGuest,
    hasSeenAuthModal,
    setToken: (t) => saveSession(t, user),
    setUser: (u) => saveSession(token, u),
    logout,
    saveSession,
    continueAsGuest,
    setHasSeenAuthModal: (seen) => {
      setHasSeenAuthModal(seen);
      if (seen) localStorage.setItem("nexto_seen_auth_modal", "true");
    },
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
}
