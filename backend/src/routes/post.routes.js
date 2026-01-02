const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const authMiddleware = require("../utils/auth.middleware");

// Create post
router.post("/", authMiddleware, postController.createPost);

// Get user posts
router.get("/user/:userId", postController.getUserPosts);

// Get feed (following)
router.get("/feed", authMiddleware, postController.getFeed);

// Like/Unlike post
router.post("/:postId/like", authMiddleware, postController.likePost);

// Bookmark/Unbookmark post
router.post("/:postId/bookmark", authMiddleware, postController.bookmarkPost);

// Get bookmarked posts
router.get("/bookmarks", authMiddleware, postController.getBookmarkedPosts);

// Add comment
router.post("/:postId/comment", authMiddleware, postController.addComment);

// Delete post
router.delete("/:postId", authMiddleware, postController.deletePost);

// Increment views
router.post("/:postId/view", postController.incrementViews);

module.exports = router;
