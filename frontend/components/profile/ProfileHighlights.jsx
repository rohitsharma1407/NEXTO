"use client";
import React from "react";

export default function ProfileHighlights({ highlights = [] }) {
  const styles = {
    container: "w-full mt-4",
    innerContainer: "w-full rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 p-3 shadow-sm",
    highlightsRow: "flex items-start gap-4 overflow-x-auto pb-2 snap-x snap-mandatory",
    highlightItem: "flex flex-col items-center gap-1 snap-start",
    highlightRelative: "relative",
    highlightBorder: "p-[2px] rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-500",
    highlightInner: "p-[2px] rounded-full bg-white dark:bg-gray-900",
    highlightImageBg: "h-16 w-16 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center border border-gray-200/70 dark:border-gray-700",
    highlightImage: "h-full w-full object-cover",
    highlightPlus: "h-full w-full flex items-center justify-center rounded-full text-gray-500",
    highlightLabel: "text-xs font-semibold text-gray-700 dark:text-gray-200 truncate max-w-[72px] text-center",
    newHighlightBorder: "p-[2px] rounded-full border border-dashed border-gray-300 dark:border-gray-700",
    newHighlightInner: "h-16 w-16 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-300",
    newHighlightPlus: "text-xl",
    newHighlightLabel: "text-xs text-gray-500 dark:text-gray-400",
  };

  const defaultHighlights = [
    { id: 1, name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150", count: 12 },
    { id: 2, name: "Food", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150", count: 8 },
    { id: 3, name: "Fitness", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=150", count: 15 },
    { id: 4, name: "Work", image: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=150", count: 20 },
    { id: 5, name: "Friends", image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=150", count: 25 },
  ];

  const displayHighlights = highlights.length > 0 ? highlights : defaultHighlights;

  if (!displayHighlights || displayHighlights.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.highlightsRow}>
          {displayHighlights.map((highlight, idx) => {
            return (
              <div
                key={highlight.id}
                className={styles.highlightItem}
              >
                <div className={styles.highlightRelative}>
                  <div className={styles.highlightBorder}>
                    <div className={styles.highlightInner}>
                      <div className={styles.highlightImageBg} aria-hidden>
                        {highlight.image ? (
                          <img
                            src={highlight.image}
                            alt={highlight.name}
                            className={styles.highlightImage}
                          />
                        ) : (
                          <div className={styles.highlightPlus}>
                            <i className="fa-solid fa-image text-xl"></i>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Highlight Name */}
                <span className={styles.highlightLabel} title={highlight.name}>{highlight.name}</span>
              </div>
            );
          })}
          
          {/* Add New Highlight */}
          <div className={styles.highlightItem}>
            <div className={styles.highlightRelative}>
              <div className={styles.newHighlightBorder}>
                <div className={styles.newHighlightInner}>
                  <i className={`fa-solid fa-plus ${styles.newHighlightPlus}`}></i>
                </div>
              </div>
            </div>
            <span className={styles.newHighlightLabel}>
              New
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
