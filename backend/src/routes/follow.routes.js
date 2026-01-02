const express = require("express");
const router = express.Router();
const followController = require("../controllers/follow.controller");
const authMiddleware = require("../utils/auth.middleware");

// Follow user
router.post("/:userId/follow", authMiddleware, followController.followUser);

// Unfollow user
router.delete("/:userId/unfollow", authMiddleware, followController.unfollowUser);

// Get followers
router.get("/:userId/followers", followController.getFollowers);

// Get following
router.get("/:userId/following", followController.getFollowing);

// Check if following
router.get("/:userId/check", authMiddleware, followController.checkFollowing);

// Get suggested users
router.get("/suggestions", authMiddleware, followController.getSuggestedUsers);

module.exports = router;
