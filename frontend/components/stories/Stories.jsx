"use client";
import { useState } from "react";
import StoryViewer from "./StoryViewer";

const STORY_CATEGORIES = [
  { 
    id: 0, 
    title: "Your Story", 
    icon: "👤", 
    gradient: "linear-gradient(to top right, #667eea, #764ba2, #f093fb)", 
    image: "https://ui-avatars.com/api/?name=User&background=667eea&color=fff&size=100",
    stories: [
      { title: "Your Story 1", icon: "👤", gradient: "linear-gradient(to top right, #667eea, #764ba2, #f093fb)", image: "https://ui-avatars.com/api/?name=User&background=667eea&color=fff&size=100" },
    ]
  },
  { 
    id: 1, 
    title: "Technology", 
    icon: "🤖", 
    gradient: "linear-gradient(to top right, #8b5cf6, #ec4899, #ef4444)", 
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop",
    stories: [
      { title: "Technology - AI Breakthroughs", icon: "🤖", gradient: "linear-gradient(to top right, #8b5cf6, #ec4899, #ef4444)", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop" },
      { title: "Technology - Cloud Computing", icon: "☁️", gradient: "linear-gradient(to top right, #8b5cf6, #ec4899, #ef4444)", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop" },
      { title: "Technology - Web3", icon: "🌐", gradient: "linear-gradient(to top right, #8b5cf6, #ec4899, #ef4444)", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&h=100&fit=crop" },
    ]
  },
  { 
    id: 2, 
    title: "Breaking", 
    icon: "🔥", 
    gradient: "linear-gradient(to top right, #ef4444, #f97316, #eab308)", 
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&h=100&fit=crop",
    stories: [
      { title: "Breaking - Major Event", icon: "🔥", gradient: "linear-gradient(to top right, #ef4444, #f97316, #eab308)", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&h=100&fit=crop" },
      { title: "Breaking - Update", icon: "📢", gradient: "linear-gradient(to top right, #ef4444, #f97316, #eab308)", image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=100&h=100&fit=crop" },
    ]
  },
  { 
    id: 3, 
    title: "Sports", 
    icon: "⚽", 
    gradient: "linear-gradient(to top right, #22c55e, #14b8a6, #3b82f6)", 
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop",
    stories: [
      { title: "Sports - Football News", icon: "⚽", gradient: "linear-gradient(to top right, #22c55e, #14b8a6, #3b82f6)", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop" },
      { title: "Sports - Cricket Updates", icon: "🏏", gradient: "linear-gradient(to top right, #22c55e, #14b8a6, #3b82f6)", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop" },
      { title: "Sports - Basketball", icon: "🏀", gradient: "linear-gradient(to top right, #22c55e, #14b8a6, #3b82f6)", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=100&h=100&fit=crop" },
    ]
  },
  { 
    id: 4, 
    title: "World", 
    icon: "🌍", 
    gradient: "linear-gradient(to top right, #3b82f6, #6366f1, #8b5cf6)", 
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=100&h=100&fit=crop",
    stories: [
      { title: "World News - Global Events", icon: "🌍", gradient: "linear-gradient(to top right, #3b82f6, #6366f1, #8b5cf6)", image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=100&h=100&fit=crop" },
    ]
  },
];

export default function Stories() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <>
      {/* Stories Row - Fixed below Live Bar - same width */}
      <div className="stories-sticky bg-white dark:bg-gray-900 px-2 flex items-center shadow-md border-b border-gray-200 dark:border-gray-800">
        <div className="flex overflow-x-auto scrollbar-hide h-full w-full items-center">
          {STORY_CATEGORIES.map((category, index) => (
            <div
              key={category.id}
              onClick={() => setActiveCategory(index)}
              className="cursor-pointer flex-shrink-0"
              style={{ marginRight: '8px' }}
            >
              {/* Colorful Gradient Ring */}
              <div 
                className="p-[2.5px] rounded-full w-[56px] h-[56px] sm:w-[64px] sm:h-[64px]"
                style={{ background: category.gradient }}
              >
                <div 
                  className="w-full h-full rounded-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeCategory !== null && (
        <StoryViewer
          stories={STORY_CATEGORIES[activeCategory].stories}
          initialIndex={0}
          onClose={() => setActiveCategory(null)}
        />
      )}
    </>
  );
}
