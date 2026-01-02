"use client";
import { useState, useEffect } from "react";
import useNews from "../../hooks/useNews";
import NewsCard from "../../components/news/NewsCard";
import UploadNewsModal from "../../components/news/UploadNewsModal";
import { useUser } from "../../context/UserContext";
import styles from "./Explore.module.css";

const CATEGORIES = [
  { id: "all", label: "All", iconClass: "fa-newspaper", gradient: "linear-gradient(135deg,#4b5563,#111827)" },
  { id: "local", label: "Local", iconClass: "fa-location-dot", gradient: "linear-gradient(135deg,#10b981,#059669)" },
  { id: "technology", label: "Tech", iconClass: "fa-robot", gradient: "linear-gradient(135deg,#a855f7,#ec4899)" },
  { id: "sports", label: "Sports", iconClass: "fa-football", gradient: "linear-gradient(135deg,#f97316,#ef4444)" },
  { id: "business", label: "Business", iconClass: "fa-briefcase", gradient: "linear-gradient(135deg,#2563eb,#06b6d4)" },
  { id: "entertainment", label: "Entertainment", iconClass: "fa-clapperboard", gradient: "linear-gradient(135deg,#ec4899,#f43f5e)" },
  { id: "health", label: "Health", iconClass: "fa-heart-pulse", gradient: "linear-gradient(135deg,#0ea5e9,#22c55e)" },
];

export default function ExplorePage() {
  const { news, loading, fetchNews } = useNews();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const category = selectedCategory === "all" ? "" : selectedCategory;
    fetchNews({ category });
  }, [selectedCategory, fetchNews]);

  const filteredNews = selectedCategory === "all" ? news : news.filter(n => n.category === selectedCategory);

  return (
    <div className={styles.page}>
      <div className={styles.filterBar}>
        <div className={`${styles.filterRail} ${styles.scrollbarHide}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`${styles.categoryButton} ${selectedCategory === cat.id ? styles.active : styles.inactive}`}
              style={{ "--category-gradient": cat.gradient }}
            >
              <span className={styles.categoryIcon}>
                <i className={`fa-solid ${cat.iconClass}`}></i>
              </span>
              <span className={styles.categoryLabel}>{cat.label}</span>
              {selectedCategory === cat.id && (
                <span className={styles.countChip}>{filteredNews.length}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.newsSection}>
        {loading ? (
          <div className={styles.loaderWrap}>
            <div className={styles.spinner} aria-hidden="true"></div>
            <p className={styles.loadingText}>Loading {selectedCategory} news...</p>
          </div>
        ) : filteredNews && filteredNews.length > 0 ? (
          <div className={styles.newsList}>
            {filteredNews.map((item, idx) => (
              <NewsCard
                key={idx}
                title={item.title || "Breaking News"}
                summary={item.summary || item.description || ""}
                author={item.source || "NEXTO News"}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyEmoji}>🔍</div>
            <h3 className={styles.emptyTitle}>No news found</h3>
            <p className={styles.emptySubtitle}>
              Try a different category or check back later.
            </p>
          </div>
        )}
      </div>

      <UploadNewsModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onSuccess={() => {
          setShowUploadModal(false);
          fetchNews({ category: selectedCategory === "all" ? "" : selectedCategory });
        }}
      />
    </div>
  );
}
