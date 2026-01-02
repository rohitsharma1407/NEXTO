"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";

export default function NewsDetailModal({ news, isOpen, onClose }) {
  const { user } = useUser();
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(news?.likes?.length || 0);
  const [comments, setComments] = useState(news?.comments || []);
  const [commentText, setCommentText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (news && user) {
      setLiked(news.likes?.includes(user._id) || false);
    }
  }, [news, user]);

  if (!isOpen || !news) return null;

  const categoryColors = {
    technology: "from-purple-500 to-pink-500",
    sports: "from-orange-500 to-red-500",
    business: "from-blue-500 to-cyan-500",
    entertainment: "from-pink-500 to-rose-500",
    health: "from-teal-500 to-green-500",
    local: "from-green-500 to-emerald-500",
    general: "from-gray-500 to-gray-700"
  };

  const handleLike = async () => {
    if (!user) return;
    
    try {
      const token = localStorage.getItem("nexto_token");
      const response = await fetch(`http://localhost:5000/api/news/${news._id}/like`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setLiked(data.data.isLiked);
        setLikeCount(data.data.likes);
      }
    } catch (error) {
      console.error("Error liking news:", error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem("nexto_token");
      const response = await fetch(`http://localhost:5000/api/news/${news._id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: commentText }),
      });
      const data = await response.json();
      if (data.success) {
        setComments(data.data);
        setCommentText("");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn overflow-y-auto">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-transparent animate-scaleIn" style={{borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1'}}>
        {/* Header */}
        <div className={`sticky top-0 bg-gradient-to-r ${categoryColors[news.category] || categoryColors.general} text-white px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">
              {news.category === "local" && "📍"}
              {news.category === "technology" && "🤖"}
              {news.category === "sports" && "⚽"}
              {news.category === "business" && "💼"}
              {news.category === "entertainment" && "🎬"}
              {news.category === "health" && "🏥"}
              {!news.category && "📰"}
            </span>
            <div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase">
                {news.category || "News"}
              </span>
              {news.isLocal && <span className="ml-2 px-3 py-1 bg-white/20 rounded-full text-xs font-bold">Local</span>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Image */}
        {news.imageUrl && (
          <div className="relative h-80 overflow-hidden">
            <img
              src={news.imageUrl}
              alt={news.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="flex items-center gap-2 text-white text-sm">
                <i className="fa-solid fa-eye"></i>
                <span>{news.views || 0} views</span>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
            {news.title}
          </h1>

          {/* Author & Source */}
          <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {news.authorName?.[0] || news.source?.[0] || "N"}
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-white">
                {news.authorName || news.source || "Unknown"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {news.publishedAt ? new Date(news.publishedAt).toLocaleDateString() : "Recently"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {news.description || news.summary}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between py-4 border-y border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <button
                onClick={handleLike}
                disabled={!user}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all duration-300 ${
                  liked
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white scale-110 shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 hover:scale-105"
                }`}
              >
                <i className={`fa-solid fa-heart ${liked ? 'animate-pulse' : ''}`}></i>
                {likeCount}
              </button>
              <button className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-sm flex items-center gap-2 hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 transition-all duration-300 hover:scale-105">
                <i className="fa-solid fa-comment"></i>
                {comments.length}
              </button>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                saved
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white scale-110 shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 hover:scale-105"
              }`}
            >
              <i className={`fa-solid fa-bookmark ${saved ? 'animate-pulse' : ''}`}></i>
            </button>
          </div>

          {/* Comments Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              💬 Comments ({comments.length})
            </h3>

            {/* Add Comment */}
            {user && (
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all resize-none"
                ></textarea>
                <button
                  type="submit"
                  disabled={submitting || !commentText.trim()}
                  className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Posting..." : "Post Comment"}
                </button>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((comment, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {comment.userName?.[0]?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-900 dark:text-white">
                          {comment.userName}
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                          {comment.text}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
