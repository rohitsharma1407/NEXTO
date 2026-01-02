"use client";
import React, { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function UploadNewsModal({ isOpen, onClose, onSuccess }) {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "local",
    location: user?.location || "",
    imageUrl: ""
  });
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const categories = [
    { id: "local", label: "Local News", icon: "📍", color: "from-green-500 to-emerald-500" },
    { id: "business", label: "Business", icon: "💼", color: "from-blue-500 to-cyan-500" },
    { id: "technology", label: "Technology", icon: "🤖", color: "from-purple-500 to-pink-500" },
    { id: "sports", label: "Sports", icon: "⚽", color: "from-orange-500 to-red-500" },
    { id: "entertainment", label: "Entertainment", icon: "🎬", color: "from-pink-500 to-rose-500" },
    { id: "health", label: "Health", icon: "🏥", color: "from-teal-500 to-green-500" },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let uploadedImageUrl = formData.imageUrl;

      // Upload image if selected
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append("file", imageFile);

        const token = localStorage.getItem("nexto_token");
        const uploadRes = await fetch("http://localhost:5000/api/user/upload-avatar", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: imageFormData,
        });
        const uploadData = await uploadRes.json();
        if (uploadData.success) {
          uploadedImageUrl = uploadData.data.url;
        }
      }

      // Create news
      const token = localStorage.getItem("nexto_token");
      const response = await fetch("http://localhost:5000/api/news/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          imageUrl: uploadedImageUrl,
        }),
      });

      const data = await response.json();
      if (data.success) {
        onSuccess && onSuccess(data.data);
        onClose();
        // Reset form
        setFormData({
          title: "",
          description: "",
          category: "local",
          location: user?.location || "",
          imageUrl: ""
        });
        setImageFile(null);
        setImagePreview("");
      } else {
        alert(data.message || "Failed to upload news");
      }
    } catch (error) {
      console.error("Error uploading news:", error);
      alert("Failed to upload news");
    } finally {
      setUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-transparent" style={{borderImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%) 1'}}>
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white px-6 py-5 flex items-center justify-between z-10 rounded-t-3xl">
          <div>
            <h2 className="text-2xl font-black">📰 Upload Local News</h2>
            <p className="text-sm text-white/80 mt-1">Share news from your community</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              📝 News Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter a catchy news headline..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              📄 News Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Write the full news story here..."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all resize-none"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">
              🏷️ Category
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.id })}
                  className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                    formData.category === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white border-transparent shadow-lg scale-105`
                      : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-500"
                  }`}
                >
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <div className="text-xs font-bold">{cat.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              📍 Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, State, Country"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
              🖼️ News Image
            </label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview("");
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              ) : (
                <label className="block w-full p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-center cursor-pointer hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-900/10 transition-all">
                  <i className="fa-solid fa-cloud-arrow-up text-4xl text-gray-400 mb-2"></i>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Click to upload image
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white font-black text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                Uploading...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane mr-2"></i>
                Submit News for Approval
              </>
            )}
          </button>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            ℹ️ Your news will be reviewed by admin before publishing
          </p>
        </form>
      </div>
    </div>
  );
}
