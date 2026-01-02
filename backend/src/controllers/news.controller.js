const { fetchAndSummarize, listLatest } = require("../services/news.service");
const News = require("../models/news.model");
const User = require("../models/user.model");

exports.getNews = async (req, res) => {
  const {
    category,
    location,
    language,
    limit = 20
  } = req.query;

  try {
    let news = await listLatest({ category, location, language, limit });

    // If DB is empty (first run), fetch from API and retry
    if (!news || news.length === 0) {
      console.log(`📡 Fetching fresh news for ${category}...`);
      await fetchAndSummarize(category, location, language);
      news = await listLatest({ category, location, language, limit });
    }

    // If still empty, fetch multiple fallback categories
    if (!news || news.length === 0) {
      console.log("🔄 Database still empty, trying other categories...");
      const categories = ["business", "sports", "entertainment", "health"];
      
      for (const cat of categories) {
        await fetchAndSummarize(cat, location, language);
        const fallbackNews = await listLatest({ category: cat, location, language, limit: 5 });
        if (fallbackNews && fallbackNews.length > 0) {
          news = [...(news || []), ...fallbackNews];
          if (news.length >= limit) break;
        }
      }
    }

    // Final safety: if nothing returned due to strict filters, return any recent news
    if (!news || news.length === 0) {
      console.log("🪄 Returning latest available news without filters (safety fallback)");
      news = await listLatest({ limit });
    }

    res.json({ success: true, data: news || [] });
  } catch (err) {
    console.error("getNews failed", err.message || err);
    res.status(500).json({ success: false, message: "Failed to load news", error: err.message });
  }
};

// Create local news (user-generated)
exports.createLocalNews = async (req, res) => {
  try {
    const { title, description, category, location, imageUrl } = req.body;
    const userId = req.userId; // from auth middleware

    if (!title || !description) {
      return res.status(400).json({ message: "Title and description are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const news = new News({
      title,
      description,
      summary: description.substring(0, 200),
      category: category || 'local',
      location: location || user.location || 'Unknown',
      language: user.preferences?.language || 'en',
      imageUrl,
      isUserGenerated: true,
      author: userId,
      authorName: user.fullName || user.username,
      isLocal: true,
      isApproved: false, // Needs admin approval
      publishedAt: new Date(),
      source: 'Local User',
      views: 0,
      likes: [],
      comments: []
    });

    await news.save();
    res.status(201).json({ success: true, data: news, message: "News submitted for approval" });
  } catch (err) {
    console.error("createLocalNews failed", err);
    res.status(500).json({ success: false, message: "Failed to create news" });
  }
};

// Get user's local news
exports.getMyLocalNews = async (req, res) => {
  try {
    const userId = req.userId;
    const news = await News.find({ author: userId, isUserGenerated: true })
      .sort({ createdAt: -1 });
    res.json({ success: true, data: news });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch news" });
  }
};

// Like/Unlike news
exports.toggleLike = async (req, res) => {
  try {
    const { newsId } = req.params;
    const userId = req.userId;

    const news = await News.findById(newsId);
    if (!news) return res.status(404).json({ message: "News not found" });

    const likeIndex = news.likes.indexOf(userId);
    if (likeIndex > -1) {
      news.likes.splice(likeIndex, 1);
    } else {
      news.likes.push(userId);
    }

    await news.save();
    res.json({ success: true, data: { likes: news.likes.length, isLiked: likeIndex === -1 } });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to toggle like" });
  }
};

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { newsId } = req.params;
    const { text } = req.body;
    const userId = req.userId;

    const user = await User.findById(userId);
    const news = await News.findById(newsId);
    if (!news) return res.status(404).json({ message: "News not found" });

    news.comments.push({
      user: userId,
      userName: user.username,
      text,
      createdAt: new Date()
    });

    await news.save();
    res.json({ success: true, data: news.comments });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add comment" });
  }
};

// Get personalized news feed based on user preferences
exports.getPersonalizedFeed = async (req, res) => {
  try {
    const userId = req.userId;
    const limit = parseInt(req.query.limit) || 20;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const preferredCategories = user.preferences?.categories || ["technology", "sports", "business"];
    const preferredLocation = user.preferences?.location || user.location || "";
    const preferredLanguage = user.preferences?.language || "en";

    // Fetch news matching user preferences
    const query = {
      $or: [
        { category: { $in: preferredCategories } },
        { isLocal: true, location: new RegExp(preferredLocation, 'i') }
      ]
    };

    const news = await News.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .populate('author', 'username fullName profileImage');

    res.json({ success: true, data: news });
  } catch (err) {
    console.error("getPersonalizedFeed failed", err);
    res.status(500).json({ success: false, message: "Failed to load personalized feed" });
  }
};

// Search news
exports.searchNews = async (req, res) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q || q.trim() === "") {
      return res.json({ success: true, data: [] });
    }

    const searchRegex = new RegExp(q.trim(), 'i');
    
    const news = await News.find({
      $or: [
        { title: searchRegex },
        { description: searchRegex },
        { summary: searchRegex },
        { category: searchRegex },
        { source: searchRegex }
      ]
    })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(parseInt(limit))
      .populate('author', 'username fullName profileImage');

    res.json({ success: true, data: news });
  } catch (err) {
    console.error("searchNews failed", err);
    res.status(500).json({ success: false, message: "Failed to search news" });
  }
};
