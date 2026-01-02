"use client";
import React, { useState } from "react";

export default function CategoryPreferences({ userPreferences, onSave }) {
  const [selectedCategories, setSelectedCategories] = useState(
    userPreferences?.categories || ["technology", "sports", "business"]
  );
  const [saving, setSaving] = useState(false);

  const categories = [
    { id: "technology", label: "Technology", icon: "🤖", color: "from-purple-500 to-pink-500" },
    { id: "sports", label: "Sports", icon: "⚽", color: "from-orange-500 to-red-500" },
    { id: "business", label: "Business", icon: "💼", color: "from-blue-500 to-cyan-500" },
    { id: "entertainment", label: "Entertainment", icon: "🎬", color: "from-pink-500 to-rose-500" },
    { id: "health", label: "Health", icon: "🏥", color: "from-teal-500 to-green-500" },
    { id: "local", label: "Local News", icon: "📍", color: "from-green-500 to-emerald-500" },
  ];

  const toggleCategory = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        // Keep at least one category selected
        if (prev.length === 1) return prev;
        return prev.filter(id => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave({ categories: selectedCategories });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          📚 Your Interests
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select categories you're interested in for a personalized feed
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category.id);
          return (
            <button
              key={category.id}
              onClick={() => toggleCategory(category.id)}
              className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                isSelected
                  ? `bg-gradient-to-r ${category.color} text-white border-transparent shadow-xl scale-105`
                  : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-500 hover:scale-105"
              }`}
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="text-sm font-bold">{category.label}</div>
              {isSelected && (
                <div className="mt-2">
                  <i className="fa-solid fa-circle-check text-white"></i>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
        <i className="fa-solid fa-info-circle text-blue-600 text-xl"></i>
        <p className="text-xs text-blue-700 dark:text-blue-400">
          Selected: <strong>{selectedCategories.length}</strong> {selectedCategories.length === 1 ? 'category' : 'categories'}
        </p>
      </div>

      <button
        onClick={handleSave}
        disabled={saving || selectedCategories.length === 0}
        className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <i className="fa-solid fa-spinner fa-spin mr-2"></i>
            Saving...
          </>
        ) : (
          <>
            <i className="fa-solid fa-save mr-2"></i>
            Save Preferences
          </>
        )}
      </button>
    </div>
  );
}
