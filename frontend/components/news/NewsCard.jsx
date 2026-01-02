"use client";
import React, { useMemo, useState } from "react";
import NewsDetailModal from "./NewsDetailModal";
import styles from "./NewsCard.module.css";

export default function NewsCard({
  article,
  title,
  summary,
  author = "NEXTO News",
  time,
  imageUrl,
  fallbackEmoji = "📰"
}) {
  // Support both article object and individual props
  const newsTitle = article?.title || title;
  const newsSummary = article?.summary || article?.description || summary;
  const newsAuthor = article?.source || article?.authorName || author;
  const newsImage = article?.imageUrl || imageUrl;
  const newsCategory = article?.category || "general";
  const isLocal = article?.isLocal;
  const likes = article?.likes?.length || 0;
  const comments = article?.comments?.length || 0;
  const views = article?.views || 0;
  const publishedAt = article?.publishedAt;
  const articleUrl = article?.url;

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [copyLabel, setCopyLabel] = useState("Copy link");

  const categoryGradients = {
    technology: "linear-gradient(120deg,#a855f7,#ec4899)",
    sports: "linear-gradient(120deg,#f97316,#ef4444)",
    business: "linear-gradient(120deg,#2563eb,#06b6d4)",
    entertainment: "linear-gradient(120deg,#ec4899,#f43f5e)",
    health: "linear-gradient(120deg,#0ea5e9,#22c55e)",
    local: "linear-gradient(120deg,#10b981,#059669)",
    science: "linear-gradient(120deg,#4338ca,#06b6d4)",
    politics: "linear-gradient(120deg,#fb7185,#f59e0b)",
    general: "linear-gradient(120deg,#475569,#1f2937)"
  };

  const categoryIcons = {
    local: "📍",
    technology: "🤖",
    sports: "⚽",
    business: "💼",
    entertainment: "🎬",
    health: "🏥",
    science: "🔬",
    politics: "🏛️",
    general: "📰"
  };

  const authorInitial = useMemo(() => {
    if (!newsAuthor) return fallbackEmoji;
    const letter = newsAuthor.trim()[0];
    return letter ? letter.toUpperCase() : fallbackEmoji;
  }, [newsAuthor, fallbackEmoji]);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return null;
    const diffMs = Date.now() - date.getTime();
    const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const estimateReadMins = useMemo(() => {
    const text = newsSummary || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  }, [newsSummary]);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleCopy = async (e) => {
    handleButtonClick(e);
    if (!articleUrl) return;
    try {
      await navigator?.clipboard?.writeText(articleUrl);
      setCopyLabel("Copied!");
      setTimeout(() => setCopyLabel("Copy link"), 1200);
    } catch (err) {
      setCopyLabel("Link ready");
      setTimeout(() => setCopyLabel("Copy link"), 1200);
    }
  };

  const handleShare = (e) => {
    handleButtonClick(e, () => {
      if (articleUrl) window?.open(articleUrl, "_blank", "noreferrer");
    });
  };

  const handleButtonClick = (e, action) => {
    e.stopPropagation();
    if (action) action();
  };

  return (
    <>
      <div
        onClick={() => setShowDetailModal(true)}
        className={styles.card}
      >
        <div className={styles.topStripe} style={{ backgroundImage: categoryGradients[newsCategory] || categoryGradients.general }} aria-hidden="true"></div>
        <div className={styles.glowOne}></div>
        <div className={styles.glowTwo}></div>
        <div className={styles.glowLine}></div>

        <div className={styles.main}>
          <div className={styles.imageWrap}>
            {newsImage ? (
              <>
                <img
                  src={newsImage}
                  alt={newsTitle || "news"}
                  className={styles.image}
                />
                <div className={styles.imageOverlay}></div>
              </>
            ) : (
              <div
                className={styles.placeholder}
                style={{ backgroundImage: categoryGradients[newsCategory] || categoryGradients.general }}
              >
                <span className={styles.placeholderEmoji}>{fallbackEmoji}</span>
              </div>
            )}
            {views > 0 && (
              <div className={styles.viewsBadge}>
                <i className="fa-solid fa-eye"></i>
                <span>{views}</span>
              </div>
            )}
          </div>

          <div className={styles.content}>
            <div className={styles.metaRow}>
              {formatTimeAgo(publishedAt) && (
                <span className={`${styles.chip} ${styles.timeChip}`}>
                  <i className="fa-solid fa-clock"></i>
                  {formatTimeAgo(publishedAt)}
                </span>
              )}
              {views > 0 && (
                <span className={`${styles.chip} ${styles.hotChip}`}>
                  <i className="fa-solid fa-fire"></i>
                  {views}
                </span>
              )}
            </div>

            <div className={styles.authorRow}>
              <div className={styles.avatar}>{authorInitial}</div>
              <div className={styles.authorText}>
                <span className={styles.authorName}>{newsAuthor || "Unknown source"}</span>
                <span className={styles.authorRole}>{isLocal ? "Local spotlight" : "Contributor"}</span>
              </div>
            </div>

            <div className={styles.textBlock}>
              <h3 className={styles.title}>{newsTitle}</h3>
              <p className={styles.summary}>{newsSummary}</p>
            </div>

            <div className={styles.actions}>
              <div className={styles.leftActions}>
                <button
                  onClick={(e) => handleButtonClick(e, handleLike)}
                  className={`${styles.btn} ${styles.likeBtn} ${liked ? styles.likeActive : styles.likeIdle}`}
                  title="Like"
                >
                  <i className="fa-solid fa-heart"></i>
                  {likeCount > 0 && <span>{likeCount}</span>}
                </button>
                <button
                  onClick={(e) => handleButtonClick(e)}
                  className={`${styles.btn} ${styles.commentBtn}`}
                  title="Comment"
                >
                  <i className="fa-solid fa-comment"></i>
                  {comments > 0 && <span>{comments}</span>}
                </button>
                <button
                  onClick={handleShare}
                  className={`${styles.btn} ${styles.shareBtn}`}
                  title="Share"
                >
                  <i className="fa-solid fa-share"></i>
                </button>
              </div>
              <div className={styles.rightActions}>
                <button
                  onClick={handleCopy}
                  className={`${styles.btn} ${styles.copyBtn}`}
                  title="Copy link"
                >
                  <i className="fa-solid fa-link"></i>
                  <span>{copyLabel}</span>
                </button>
                <button
                  onClick={(e) => handleButtonClick(e, () => setSaved(!saved))}
                  className={`${styles.btn} ${styles.saveBtn} ${saved ? styles.saveActive : styles.saveIdle}`}
                  title="Save"
                >
                  <i className="fa-solid fa-bookmark"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsDetailModal 
        news={article}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
      />
    </>
  );
}
