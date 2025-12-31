const { fetchAndSummarize, listLatest } = require("../services/news.service");

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

