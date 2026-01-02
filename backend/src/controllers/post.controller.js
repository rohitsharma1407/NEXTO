const Post = require("../models/post.model");
const User = require("../models/user.model");
const Follow = require("../models/follow.model");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const { content, images } = req.body;
    const userId = req.user.id;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    const post = await Post.create({
      user: userId,
      content,
      images: images || [],
    });

    // Increment user's posts count
    await User.findByIdAndUpdate(userId, { $inc: { postsCount: 1 } });

    const populatedPost = await Post.findById(post._id).populate(
      "user",
      "username fullName profileImage isVerified"
    );

    res.status(201).json({
      success: true,
      post: populatedPost,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({ message: "Failed to create post" });
  }
};

// Get user's posts
exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ user: userId, isPublic: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username fullName profileImage isVerified");

    const total = await Post.countDocuments({ user: userId, isPublic: true });

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get user posts error:", error);
    res.status(500).json({ message: "Failed to fetch posts" });
  }
};

// Get feed (posts from followed users)
exports.getFeed = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get users that current user follows
    const following = await Follow.find({ follower: userId }).select("following");
    const followingIds = following.map((f) => f.following);

    // Get posts from followed users
    const posts = await Post.find({ user: { $in: followingIds }, isPublic: true })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username fullName profileImage isVerified");

    const total = await Post.countDocuments({ user: { $in: followingIds }, isPublic: true });

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get feed error:", error);
    res.status(500).json({ message: "Failed to fetch feed" });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // Unlike
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      await User.findByIdAndUpdate(post.user, { $inc: { totalLikes: -1 } });
    } else {
      // Like
      post.likes.push(userId);
      await User.findByIdAndUpdate(post.user, { $inc: { totalLikes: 1 } });
    }

    await post.save();

    res.json({
      success: true,
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });
  } catch (error) {
    console.error("Like post error:", error);
    res.status(500).json({ message: "Failed to like post" });
  }
};

// Bookmark a post
exports.bookmarkPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyBookmarked = post.bookmarkedBy.includes(userId);

    if (alreadyBookmarked) {
      post.bookmarkedBy = post.bookmarkedBy.filter((id) => id.toString() !== userId);
    } else {
      post.bookmarkedBy.push(userId);
    }

    await post.save();

    res.json({
      success: true,
      bookmarked: !alreadyBookmarked,
    });
  } catch (error) {
    console.error("Bookmark post error:", error);
    res.status(500).json({ message: "Failed to bookmark post" });
  }
};

// Get bookmarked posts
exports.getBookmarkedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const posts = await Post.find({ bookmarkedBy: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username fullName profileImage isVerified");

    const total = await Post.countDocuments({ bookmarkedBy: userId });

    res.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Get bookmarked posts error:", error);
    res.status(500).json({ message: "Failed to fetch bookmarked posts" });
  }
};

// Add comment to post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    const userId = req.user.id;

    if (!text || text.trim() === "") {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: userId,
      text,
      createdAt: new Date(),
    });

    await post.save();

    const populatedPost = await Post.findById(postId)
      .populate("comments.user", "username fullName profileImage");

    res.json({
      success: true,
      comments: populatedPost.comments,
    });
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if user owns the post
    if (post.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(postId);
    await User.findByIdAndUpdate(userId, { $inc: { postsCount: -1 } });

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
};

// Increment post views
exports.incrementViews = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByIdAndUpdate(
      postId,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      success: true,
      views: post.views,
    });
  } catch (error) {
    console.error("Increment views error:", error);
    res.status(500).json({ message: "Failed to increment views" });
  }
};
