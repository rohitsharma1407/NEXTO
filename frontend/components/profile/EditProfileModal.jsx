"use client";
import React, { useRef, useState } from "react";
import { uploadProfilePicture } from "../../services/profile.service";
import CategoryPreferences from "./CategoryPreferences";

export default function EditProfileModal({ user, onClose, onSave, onAutoSaveProfileImage }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    username: user?.username || "",
    bio: user?.bio || "",
    website: user?.website || "",
    location: user?.location || "",
    email: user?.email || "",
    phone: user?.phone || "",
    pronouns: user?.pronouns || "",
    profileImage: user?.profileImage || "",
    socialLinks: {
      instagram: user?.socialLinks?.instagram || "",
      twitter: user?.socialLinks?.twitter || "",
      linkedin: user?.socialLinks?.linkedin || "",
      youtube: user?.socialLinks?.youtube || "",
      github: user?.socialLinks?.github || "",
    },
  });
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Handle nested socialLinks
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleSavePreferences = async (preferences) => {
    try {
      const token = localStorage.getItem("nexto_token");
      const response = await fetch("http://localhost:5000/api/users/preferences", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ preferences }),
      });
      const data = await response.json();
      if (data.success) {
        alert("✅ Preferences saved successfully!");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      alert("❌ Failed to save preferences");
    }
  };

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      const url = await uploadProfilePicture(file);
      if (url) {
        setFormData((prev) => ({ ...prev, profileImage: url }));
        // Optional immediate persist so header updates instantly
        if (onAutoSaveProfileImage) {
          try {
            await onAutoSaveProfileImage(url);
          } catch {}
        }
      }
    } finally {
      setUploading(false);
      // reset input so same file can be selected again
      e.target.value = "";
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "fa-user" },
    { id: "preferences", label: "Interests", icon: "fa-heart" },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200/50 dark:border-gray-700/50 animate-scaleIn">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-b from-white/95 to-white/90 dark:from-gray-900/95 dark:to-gray-900/90 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 px-6 py-5 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Edit Profile</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center text-xl text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 text-sm font-bold transition-all duration-300 relative ${
                activeTab === tab.id
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <i className={`fa-solid ${tab.icon} mr-2`}></i>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" ? (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Profile Picture
            </label>
            <div
              onClick={handlePickImage}
              className="mx-auto rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer hover:opacity-90 transition relative w-[35px] h-[35px]"
            >
              {formData.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={formData.profileImage} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <i className="fa-solid fa-camera text-2xl text-gray-600 dark:text-gray-400"></i>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm">Uploading…</div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="username"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself..."
              maxLength={150}
              rows={3}
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/150</p>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="City, Country"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Pronouns */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Pronouns
            </label>
            <input
              type="text"
              name="pronouns"
              value={formData.pronouns}
              onChange={handleChange}
              placeholder="she/her"
              className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Social Links Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Social Links
            </h3>
            
            {/* Instagram */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <i className="fab fa-instagram text-pink-600 mr-2"></i>
                Instagram
              </label>
              <input
                type="text"
                name="social_instagram"
                value={formData.socialLinks.instagram}
                onChange={handleChange}
                placeholder="username"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Twitter */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <i className="fab fa-twitter text-blue-400 mr-2"></i>
                Twitter
              </label>
              <input
                type="text"
                name="social_twitter"
                value={formData.socialLinks.twitter}
                onChange={handleChange}
                placeholder="username"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* LinkedIn */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <i className="fab fa-linkedin text-blue-600 mr-2"></i>
                LinkedIn
              </label>
              <input
                type="text"
                name="social_linkedin"
                value={formData.socialLinks.linkedin}
                onChange={handleChange}
                placeholder="username"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* YouTube */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <i className="fab fa-youtube text-red-600 mr-2"></i>
                YouTube
              </label>
              <input
                type="text"
                name="social_youtube"
                value={formData.socialLinks.youtube}
                onChange={handleChange}
                placeholder="@channel"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* GitHub */}
            <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <i className="fab fa-github text-gray-800 dark:text-gray-200 mr-2"></i>
                GitHub
              </label>
              <input
                type="text"
                name="social_github"
                value={formData.socialLinks.github}
                onChange={handleChange}
                placeholder="username"
                className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            >
              Save Changes
            </button>
          </div>
        </form>
        ) : (
          <CategoryPreferences 
            userPreferences={user?.preferences || {}}
            onSave={handleSavePreferences}
          />
        )}
      </div>
    </div>
  );
}
