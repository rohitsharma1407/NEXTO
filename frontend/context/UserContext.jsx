"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  // Load from localStorage on mount only (client-side)
  useEffect(() => {
    try {
      const t = localStorage.getItem("nexto_token");
      const u = localStorage.getItem("nexto_user");
      
      if (t) setToken(t);
      if (u) {
        try {
          setUser(JSON.parse(u));
        } catch (e) {
          console.error("Failed to parse user:", e);
          localStorage.removeItem("nexto_user");
        }
      }
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

    // Then clear storage
    try {
      localStorage.removeItem("nexto_token");
      localStorage.removeItem("nexto_user");
      console.log("Logout complete - localStorage cleared");
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  }

  const value = {
    token,
    user,
    ready,
    setToken: (t) => saveSession(t, user),
    setUser: (u) => saveSession(token, u),
    logout,
    saveSession,
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
