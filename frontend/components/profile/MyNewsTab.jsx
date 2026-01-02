"use client";
import React, { useState, useEffect } from "react";
import NewsCard from "../news/NewsCard";

export default function MyNewsTab({ userId }) {
  const [myNews, setMyNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    loadMyNews();
  }, [userId]);

  const loadMyNews = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("nexto_token");
      const response = await fetch("http://localhost:5000/api/news/my-news", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setMyNews(data.data || []);
      }
    } catch (error) {
      console.error("Error loading my news:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = myNews.filter(news => {
    if (filter === "approved") return news.isApproved;
    if (filter === "pending") return !news.isApproved;
    return true;
  });

  const stats = {
    total: myNews.length,
    approved: myNews.filter(n => n.isApproved).length,
    pending: myNews.filter(n => !n.isApproved).length,
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-center">
          <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{stats.total}</p>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Total</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-center">
          <p className="text-2xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{stats.approved}</p>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Approved</p>
        </div>
        <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-center">
          <p className="text-2xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">{stats.pending}</p>
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">Pending</p>
        </div>
      </div>

      <div className="flex gap-2">
        {["all", "approved", "pending"].map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${filter === f ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-lg" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
            {f === "all" && "All News"}
            {f === "approved" && "✅ Approved"}
            {f === "pending" && "⏳ Pending"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <i className="fa-solid fa-spinner fa-spin text-3xl text-purple-600 mb-2"></i>
            <p className="text-gray-500 dark:text-gray-400 font-semibold">Loading...</p>
          </div>
        </div>
      ) : filteredNews.length > 0 ? (
        <div className="space-y-4">
          {filteredNews.map((news) => (
            <div key={news._id} className="relative group">
              <NewsCard article={news} />
              <div className="absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {news.isApproved ? (
                  <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center gap-1">
                    <i className="fa-solid fa-check"></i> Approved
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white flex items-center gap-1">
                    <i className="fa-solid fa-hourglass-half"></i> Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <i className="fa-solid fa-newspaper text-4xl text-gray-300 dark:text-gray-600 mb-3"></i>
          <p className="text-gray-500 dark:text-gray-400 font-semibold">No news yet</p>
        </div>
      )}
    </div>
  );
}
