"use client";
import React, { useState } from "react";

export default function NewsCard({
  title,
  summary,
  author = "NEXTO News",
  time = "2 hours ago",
  imageUrl,
  fallbackEmoji = "📰"
}) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <div className="mb-3 rounded-lg overflow-hidden bg-white flex flex-col shadow-md">
      {/* Top row: Image and Content */}
      <div className="flex">
      {/* Left: Image - 30% width with author overlay */}
      <div className="w-[30%] h-40 flex-shrink-0 relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || "news"}
            className="w-full h-full object-cover bg-gray-200"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl">
            {fallbackEmoji}
          </div>
        )}
      </div>

      {/* Right: Content - 60% width */}
      <div className="flex-1 flex flex-col">
        {/* Title */}
        <div className="px-3 pt-2 pb-1 flex-1">
          <p className="text-xs font-semibold text-gray-900 line-clamp-2">{title}</p>
          <p className="text-[10px] text-gray-600 line-clamp-4 mt-0.5">{summary}</p>
        </div>

        {/* Actions - Fixed at bottom */}
        <div className="flex justify-between items-center px-3 py-2 bg-red-50 mt-auto">
          <div className="flex gap-1">
            <button
              onClick={() => setLiked(!liked)}
              className={`p-2 transition-all duration-200 border-0 bg-transparent ${
                liked ? "text-red-500 scale-110" : "text-gray-600 hover:text-gray-900"
              }`}
              title="Like"
            >
              {liked ? "❤️" : "🤍"}
            </button>
            <button className="p-2 border-0 bg-transparent text-gray-600 hover:text-blue-600 transition cursor-pointer" title="Comment">
              💬
            </button>
            <button className="p-2 border-0 bg-transparent text-gray-600 hover:text-green-600 transition cursor-pointer" title="Share">
              ✈️
            </button>
          </div>
          <button
            onClick={() => setSaved(!saved)}
            className={`p-2 transition-all border-0 bg-transparent ${
              saved ? "text-blue-500" : "text-gray-600 hover:text-yellow-600"
            }`}
            title="Save"
          >
            {saved ? "🔖" : "🔗"}
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}
