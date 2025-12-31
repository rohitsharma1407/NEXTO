"use client";
import React, { useState, useEffect } from "react";

export default function LiveBar() {
  const [liveCount, setLiveCount] = useState(1234);

  useEffect(() => {
    // Simulate live updates
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 50));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="livebar bg-gray-900">
      <div className="flex items-center gap-2 w-full">
        <span className="flex items-center gap-1">
          <span className="text-red-500 text-lg animate-pulse">●</span>
          <span className="font-bold text-white text-sm">LIVE</span>
        </span>
        <span className="text-gray-300 text-xs">🔥</span>
        <span className="text-gray-300 text-xs font-semibold truncate">
          {liveCount.toLocaleString()} reading now • Trending: Technology
        </span>
      </div>
    </div>
  );
}
