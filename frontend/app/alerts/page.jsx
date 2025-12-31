"use client";
import { useState, useEffect } from "react";
import NewsCard from "../../components/news/NewsCard";

const SAMPLE_SAVED = [
  {
    id: 1,
    title: "AI Breakthrough: New Language Model Shows Promising Results",
    summary: "Researchers announce a new AI model that outperforms previous benchmarks",
    source: "TechCrunch",
    category: "technology",
    savedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "World Champions Announced in International Tournament",
    summary: "Exciting finals conclude with unexpected champions emerging",
    source: "ESPN",
    category: "sports",
    savedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "Market Recovery Signs Emerge After Volatility",
    summary: "Stock indices show signs of stabilization after recent fluctuations",
    source: "Reuters",
    category: "business",
    savedAt: "1 day ago",
  },
];

export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("saved");
  const [saved, setSaved] = useState(SAMPLE_SAVED);

  const handleRemove = (id) => {
    setSaved(saved.filter((item) => item.id !== id));
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="sticky top-0 z-40 bg-white border-b border-border-gray flex">
        <button
          onClick={() => setActiveTab("saved")}
          className={`flex-1 py-4 font-semibold text-sm border-b-2 transition ${
            activeTab === "saved"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500"
          }`}
        >
          🔖 Saved
        </button>
        <button
          onClick={() => setActiveTab("liked")}
          className={`flex-1 py-4 font-semibold text-sm border-b-2 transition ${
            activeTab === "liked"
              ? "border-primary text-primary"
              : "border-transparent text-gray-500"
          }`}
        >
          ❤️ Liked
        </button>
      </div>

      {/* Content */}
      <div className="px-3 py-2">
        {activeTab === "saved" ? (
          <>
            {saved.length > 0 ? (
              <div>
                {saved.map((item) => (
                  <div
                    key={item.id}
                    className="relative"
                  >
                    <NewsCard
                      title={item.title}
                      summary={item.summary}
                      author={item.source}
                      time={item.savedAt}
                    />
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition text-xl"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">🔖</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved articles</h3>
                <p className="text-sm text-gray-500 max-w-xs">
                  Save articles from the feed to read them later
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-6xl mb-4">❤️</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No liked articles yet</h3>
            <p className="text-sm text-gray-500 max-w-xs">
              Like articles to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
