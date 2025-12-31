"use client";
import React, { useState, useRef } from "react";

export default function PostDetailModal({ isOpen, onClose, post }) {
  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments_list || []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          author: "You",
          text: comment,
          timestamp: "now",
        },
      ]);
      setComment("");
    }
  };

  if (!isOpen || !post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Post</h2>
          <button
            onClick={onClose}
            className="text-2xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto flex flex-col sm:flex-row gap-6 p-6">
          {/* Image */}
          <div className="sm:w-1/2 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
            {post.image ? (
              <img src={post.image} alt="post" className="w-full h-full object-cover" />
            ) : (
              <div className="text-4xl">📸</div>
            )}
          </div>

          {/* Info & Comments */}
          <div className="sm:w-1/2 flex flex-col">
            {/* Author Info */}
            <div className="pb-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                👤
              </div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Username
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
              </div>
            </div>

            {/* Caption */}
            <div className="py-4 border-b border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-900 dark:text-white">
                {post.caption || "Beautiful moment captured 📸✨"}
              </p>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center text-xs">
                      👤
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {c.author}
                        </span>{" "}
                        <span className="text-gray-600 dark:text-gray-400">{c.text}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{c.timestamp}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 text-sm py-4">No comments yet</p>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-4">
              {/* Likes & Actions */}
              <div className="flex gap-4">
                <button
                  onClick={handleLike}
                  className={`text-2xl transition ${isLiked ? "scale-110" : ""}`}
                >
                  {isLiked ? "❤️" : "🤍"}
                </button>
                <button className="text-2xl hover:opacity-70 transition">💬</button>
                <button className="text-2xl hover:opacity-70 transition">✈️</button>
              </div>

              {/* Likes Count */}
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {likes.toLocaleString()} likes
              </p>

              {/* Comment Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <button
                  onClick={handleAddComment}
                  className="text-blue-500 hover:text-blue-600 font-semibold text-sm"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
