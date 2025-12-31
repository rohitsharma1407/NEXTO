"use client";
import React from "react";
import NewsCard from "./news/NewsCard";

export default function Feed({ news, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">📡</div>
          <p className="text-gray-500 font-semibold">Loading your feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-4">
      {/* Divider */}
      <div className="h-2 bg-gray-100 my-2"></div>

      {/* News Feed */}
      <div className="px-3 py-2">
        {Array.isArray(news) && news.length > 0 ? (
          news.map((item, idx) => (
            <NewsCard
              key={idx}
              title={item.title || "Breaking News"}
              summary={item.summary || item.description || ""}
              author={item.source || "NEXTO News"}
              imageUrl={item.imageUrl}
              fallbackEmoji={
                item.category === "technology"
                  ? "🤖"
                  : item.category === "sports"
                  ? "⚽"
                  : item.category === "business"
                  ? "💼"
                  : "📰"
              }
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No news yet</h3>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              Pull down to refresh and load the latest news from your sources
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
