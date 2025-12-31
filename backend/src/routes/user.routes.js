const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const User = require("../models/user.model");
const auth = require("../utils/auth.middleware");

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage for avatar uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9-_]/g, "");
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${base || "avatar"}-${unique}${ext || ".png"}`);
  },
});
const upload = multer({ storage });

// Get profile by ID
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch profile" });
  }
});

// Update profile (self only)
router.put("/profile/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    if (req.userId !== id) return res.status(403).json({ message: "Forbidden" });

    const allowed = [
      "fullName",
      "username",
      "bio",
      "website",
      "location",
      "phone",
      "pronouns",
      "profileImage",
    ];
    const update = {};
    for (const key of allowed) {
      if (key in req.body) update[key] = req.body[key];
    }

    const user = await User.findByIdAndUpdate(id, update, { new: true }).select("-password");
    res.json({ success: true, data: user });
  } catch (err) {
    if (err && err.code === 11000 && err.keyPattern && err.keyPattern.username) {
      return res.status(400).json({ message: "Username already taken" });
    }
    res.status(500).json({ message: "Failed to update profile" });
  }
});

// Upload avatar, returns URL
router.post("/upload-avatar", auth, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const publicUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ success: true, data: { url: publicUrl } });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

// Preferences (legacy)
router.post("/preferences", async (req, res) => {
  const { userId, preferences } = req.body;
  const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true }).select("-password");
  res.json({ success: true, user });
});

module.exports = router;
