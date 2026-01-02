const Follow = require("../models/follow.model");
const User = require("../models/user.model");

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    if (userId === followerId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if already following
    const existingFollow = await Follow.findOne({
      follower: followerId,
      following: userId,
    });

    if (existingFollow) {
      return res.status(400).json({ message: "Already following this user" });
    }

    // Create follow relationship
    await Follow.create({
      follower: followerId,
      following: userId,
    });

    // Update counts
    await User.findByIdAndUpdate(followerId, { $inc: { following: 1 } });
    await User.findByIdAndUpdate(userId, { $inc: { followers: 1 } });

    res.json({
      success: true,
      message: "Successfully followed user",
    });
  } catch (error) {
    console.error("Follow user error:", error);
    res.status(500).json({ message: "Failed to follow user" });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    const followRelation = await Follow.findOneAndDelete({
      follower: followerId,
      following: userId,
    });

    if (!followRelation) {
      return res.status(400).json({ message: "You are not following this user" });
    }

    // Update counts
    await User.findByIdAndUpdate(followerId, { $inc: { following: -1 } });
    await User.findByIdAndUpdate(userId, { $inc: { followers: -1 } });

    res.json({
      success: true,
      message: "Successfully unfollowed user",
    });
  } catch (error) {
    console.error("Unfollow user error:", error);
    res.status(500).json({ message: "Failed to unfollow user" });
  }
};

// Get followers list
exports.getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const followers = await Follow.find({ following: userId })
      .skip(skip)
      .limit(limit)
      .populate("follower", "username fullName profileImage isVerified bio followers")
      .sort({ createdAt: -1 });

    const total = await Follow.countDocuments({ following: userId });

    res.json({
      success: true,
      followers: followers.map((f) => f.follower),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get followers error:", error);
    res.status(500).json({ message: "Failed to fetch followers" });
  }
};

// Get following list
exports.getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const following = await Follow.find({ follower: userId })
      .skip(skip)
      .limit(limit)
      .populate("following", "username fullName profileImage isVerified bio followers")
      .sort({ createdAt: -1 });

    const total = await Follow.countDocuments({ follower: userId });

    res.json({
      success: true,
      following: following.map((f) => f.following),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get following error:", error);
    res.status(500).json({ message: "Failed to fetch following" });
  }
};

// Check if following
exports.checkFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    const isFollowing = await Follow.exists({
      follower: followerId,
      following: userId,
    });

    res.json({
      success: true,
      isFollowing: !!isFollowing,
    });
  } catch (error) {
    console.error("Check following error:", error);
    res.status(500).json({ message: "Failed to check following status" });
  }
};

// Get suggested users (users not followed by current user)
exports.getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user.id;
    const limit = parseInt(req.query.limit) || 10;

    // Get users that current user follows
    const following = await Follow.find({ follower: userId }).select("following");
    const followingIds = following.map((f) => f.following.toString());

    // Find users not in following list and not the current user
    const suggestedUsers = await User.find({
      _id: { $nin: [...followingIds, userId] },
    })
      .select("username fullName profileImage isVerified bio followers")
      .sort({ followers: -1 })
      .limit(limit);

    res.json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.error("Get suggested users error:", error);
    res.status(500).json({ message: "Failed to fetch suggested users" });
  }
};
