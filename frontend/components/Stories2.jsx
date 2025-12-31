"use client";
import React, { useState } from "react";

const STORIES = [
  { id: 1, name: "Your Story", avatar: "📷", isOwn: true },
  { id: 2, name: "Technology", avatar: "🤖" },
  { id: 3, name: "Breaking", avatar: "🔥" },
  { id: 4, name: "Sports", avatar: "⚽" },
  { id: 5, name: "World", avatar: "🌍" },
  { id: 6, name: "Business", avatar: "💼" },
  { id: 7, name: "Entertainment", avatar: "🎬" },
  { id: 8, name: "Health", avatar: "🏥" },
  { id: 9, name: "Science", avatar: "🔬" },
  { id: 10, name: "Politics", avatar: "🏛️" },
  { id: 11, name: "Weather", avatar: "🌤️" },
  { id: 12, name: "Gaming", avatar: "🎮" },
  { id: 13, name: "Travel", avatar: "✈️" },
  { id: 14, name: "Food", avatar: "🍕" },
  { id: 15, name: "Fashion", avatar: "👗" },
  { id: 16, name: "Music", avatar: "🎵" },
];

export default function Stories() {
  const [activeStory, setActiveStory] = useState(null);

  return (
    <div className="stories-sticky border-b border-border-gray py-0 px-2 bg-white">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide justify-start">
        {STORIES.map((story) => (
          <div
            key={story.id}
            onClick={() => setActiveStory(story.id)}
            className="relative w-20 h-20 flex-shrink-0 cursor-pointer"
          >
            <div
              className={`rounded-full p-[3px] transition-transform ${
                story.isOwn
                  ? "bg-gray-300"
                  : "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600"
              } ${activeStory === story.id ? "scale-105" : "scale-100"}`}
              style={{ width: "80px", height: "80px" }}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-4xl">
                {story.avatar}
              </div>
            </div>

            {story.isOwn && (
              <span className="absolute bottom-0 right-0 translate-x-1 translate-y-1 w-6 h-6 rounded-full bg-primary text-white text-sm flex items-center justify-center border-2 border-white">+
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
