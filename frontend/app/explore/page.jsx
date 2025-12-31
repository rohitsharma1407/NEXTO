"use client";
import { useState, useEffect } from "react";
import useNews from "../../hooks/useNews";
import NewsCard from "../../components/news/NewsCard";

const CATEGORIES = [
  { id: "all", label: "All", icon: "📰" },
  { id: "technology", label: "Tech", icon: "🤖" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "business", label: "Business", icon: "💼" },
  { id: "entertainment", label: "Entertainment", icon: "🎬" },
  { id: "health", label: "Health", icon: "🏥" },
];

export default function ExplorePage() {
  const { news, loading, fetchNews } = useNews();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const category = selectedCategory === "all" ? "" : selectedCategory;
    fetchNews({ category });
  }, [selectedCategory]);

  const filteredNews = selectedCategory === "all" ? news : news.filter(n => n.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Category Filter */}
      <div className="sticky top-0 z-40 bg-white border-b border-border-gray">
        <div className="flex gap-2 overflow-x-auto px-3 py-3 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">{cat.icon}</span>
              <span className="text-sm font-semibold">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* News Grid */}
      <div className="px-3 py-2">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin text-4xl mb-4">🔄</div>
              <p className="text-gray-500 font-semibold">Loading {selectedCategory}...</p>
            </div>
          </div>
        ) : filteredNews && filteredNews.length > 0 ? (
          filteredNews.map((item, idx) => (
            <NewsCard
              key={idx}
              title={item.title || "Breaking News"}
              summary={item.summary || item.description || ""}
              author={item.source || "NEXTO News"}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No news found</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Try selecting a different category or check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
