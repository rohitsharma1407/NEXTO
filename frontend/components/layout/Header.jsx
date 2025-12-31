"use client";
import React, { useEffect, useState } from "react";
import "./header.css";

const LANGUAGES = ["English", "Hindi", "Spanish"];

export default function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [dark, setDark] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [lang, setLang] = useState("English");

  // Dark mode toggle
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch && onSearch(val);
  };

  return (
    <header className="nexto-header">
      <div className="nexto-header-inner">

        {/* Logo */}
        <div className="nexto-logo">NEXTO</div>

        {/* Search */}
        <div className="nexto-search">
          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder={`Search news (${lang})`}
            className="nexto-search-input"
          />
          <span className="nexto-search-icon">
            <i className="fa-solid fa-magnifying-glass"></i>
          </span>
        </div>

        {/* Language */}
        <div style={{ position: "relative" }}>
          <button
            className="nexto-action"
            title="Language"
            onClick={() => setShowLang(!showLang)}
          >
            <i className="fa-solid fa-globe"></i>
          </button>

          {showLang && (
            <div className="lang-dropdown">
              {LANGUAGES.map((l) => (
                <div
                  key={l}
                  className="lang-option"
                  onClick={() => {
                    setLang(l);
                    setShowLang(false);
                  }}
                >
                  {l}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dark mode */}
        <button
          className="nexto-action"
          title="Dark mode"
          onClick={() => setDark((p) => !p)}
        >
          {dark ? (
            <i className="fa-solid fa-sun"></i>
          ) : (
            <i className="fa-solid fa-moon"></i>
          )}
        </button>

        {/* Notification */}
        <button className="nexto-action" title="Notifications">
          <i className="fa-solid fa-bell"></i>
        </button>
      </div>
    </header>
  );
}
