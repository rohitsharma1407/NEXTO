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

    // Social stats
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },

    preferences: {
      category: { type: String, default: "technology" },
      location: { type: String, default: "india" },
      language: { type: String, default: "en" },
    },
    role: { type: String, default: "user" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
