const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // Profile fields
    fullName: { type: String, default: "" },
    username: { type: String, unique: true, sparse: true },
    bio: { type: String, default: "" },
    website: { type: String, default: "" },
    location: { type: String, default: "" },
    phone: { type: String, default: "" },
    pronouns: { type: String, default: "" },
    profileImage: { type: String, default: "" }, // URL to avatar

    // Social links
    socialLinks: {
      instagram: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
      github: { type: String, default: "" },
    },

    // Social stats
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    postsCount: { type: Number, default: 0 },
    
    // Analytics
    profileViews: { type: Number, default: 0 },
    totalLikes: { type: Number, default: 0 },

    preferences: {
      categories: { 
        type: [String], 
        default: ["technology", "sports", "business"] 
      },
      location: { type: String, default: "india" },
      language: { type: String, default: "en" },
    },
    
    // Account settings
    isPrivate: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
