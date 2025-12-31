const axios = require("axios");
const News = require("../models/news.model");
// const { summarize } = require("./gpt.service"); // temporarily disabled

let summarizeCooldownUntil = 0; // in ms epoch; back off when rate-limited

// Helper to normalize and safely coerce strings
const safeString = (val, fallback = "") => {
  if (!val) return fallback;
  if (typeof val === "string") return val;
  if (typeof val === "object") return val.name || fallback;
  return String(val);
};

// ========== GNEWS API (token based) ==========
const fetchFromGNews = async (category, language) => {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ GNEWS_API_KEY not set.");
    return [];
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
    category || "general"
  )}&max=10&sortby=publishedAt&lang=${encodeURIComponent(
    language || "en"
  )}&token=${encodeURIComponent(apiKey)}`;

  try {
    const response = await axios.get(url);
    return response?.data?.articles || [];
  } catch (err) {
    console.error("🔴 GNews API failed:", err?.response?.status || err.message);
    return [];
  }
};

// ========== NEWSAPI.ORG ==========
const fetchFromNewsAPI = async (category, language) => {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ NEWS_API_KEY not set.");
    return [];
  }

  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
    category || "general"
  )}&pageSize=10&sortBy=publishedAt&language=${encodeURIComponent(
    language || "en"
  )}&apiKey=${encodeURIComponent(apiKey)}`;

  try {
    const response = await axios.get(url);
    return (response?.data?.articles || []).map((article) => ({
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      image: article.urlToImage,
      source: article.source?.name || "NewsAPI",
      publishedAt: article.publishedAt,
    }));
  } catch (err) {
    console.error("🔴 NewsAPI failed:", err?.response?.status || err.message);
    return [];
  }
};

// ========== MEDIASTACK ==========
const fetchFromMediastack = async (category, language) => {
  const apiKey = process.env.MEDIASTACK_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ MEDIASTACK_API_KEY not set.");
    return [];
  }

  const url = `http://api.mediastack.com/v1/news?access_key=${encodeURIComponent(
    apiKey
  )}&languages=${encodeURIComponent(language || "en")}&keywords=${encodeURIComponent(
    category || "general"
  )}&limit=10&sort=published_desc`;

  try {
    const response = await axios.get(url);
    return (response?.data?.data || []).map((article) => ({
      title: article.title,
      description: article.description,
      content: article.description,
      url: article.url,
      image: article.image,
      source: article.source || "mediastack",
      publishedAt: article.published_at,
    }));
  } catch (err) {
    console.error("🔴 Mediastack failed:", err?.response?.status || err.message);
    return [];
  }
};

// ========== THE GUARDIAN ==========
const fetchFromGuardian = async (category, language) => {
  const apiKey = process.env.GUARDIAN_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ GUARDIAN_API_KEY not set.");
    return [];
  }

  const url = `https://content.guardianapis.com/search?q=${encodeURIComponent(
    category || "news"
  )}&order-by=newest&show-fields=thumbnail,trailText&api-key=${encodeURIComponent(
    apiKey
  )}`;

  try {
    const response = await axios.get(url);
    return (response?.data?.response?.results || []).map((article) => ({
      title: article.webTitle,
      description: article.fields?.trailText,
      content: article.fields?.trailText,
      url: article.webUrl,
      image: article.fields?.thumbnail,
      source: "The Guardian",
      publishedAt: article.webPublicationDate,
    }));
  } catch (err) {
    console.error("🔴 Guardian API failed:", err?.response?.status || err.message);
    return [];
  }
};

// ========== CURRENTS API ==========
const fetchFromCurrents = async (category, language) => {
  const apiKey = process.env.CURRENTS_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ CURRENTS_API_KEY not set.");
    return [];
  }

  const url = `https://api.currentsapi.services/v1/latest-news?language=${encodeURIComponent(
    language || "en"
  )}&category=${encodeURIComponent(category || "general")}&apiKey=${encodeURIComponent(
    apiKey
  )}`;

  try {
    const response = await axios.get(url);
    return (response?.data?.news || []).map((article) => ({
      title: article.title,
      description: article.description,
      content: article.description,
      url: article.url,
      image: article.image,
      source: article.author || "Currents",
      publishedAt: article.published,
    }));
  } catch (err) {
    console.error("🔴 Currents API failed:", err?.response?.status || err.message);
    return [];
  }
};

// ========== NEWSDATA.IO ==========
const fetchFromNewsData = async (category, language) => {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) {
    console.warn("⚠️ NEWSDATA_API_KEY not set.");
    return [];
  }

  const url = `https://newsdata.io/api/1/news?apikey=${encodeURIComponent(
    apiKey
  )}&language=${encodeURIComponent(language || "en")}&q=${encodeURIComponent(
    category || "general"
  )}&pageSize=10`;

  try {
    const response = await axios.get(url);
    return (response?.data?.results || []).map((article) => ({
      title: article.title,
      description: article.description,
      content: article.description,
      url: article.link,
      image: article.image_url,
      source: article.source_id || "NewsData",
      publishedAt: article.pubDate,
    }));
  } catch (err) {
    console.error("🔴 NewsData API failed:", err?.response?.status || err.message);
    return [];
  }
};

// ========== RAPIDAPI (placeholder) ==========
// You can swap to any RapidAPI provider by adjusting URL/headers
const fetchFromRapidApi = async (category, language) => {
  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    console.warn("⚠️ RAPIDAPI_KEY not set.");
    return [];
  }

  const url = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI`; // example provider
  const params = {
    q: category || "general",
    pageNumber: 1,
    pageSize: 10,
    autoCorrect: true,
    safeSearch: true,
    withThumbnails: true,
    fromPublishedDate: null,
    toPublishedDate: null,
  };

  try {
    const response = await axios.get(url, {
      params,
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    });

    return (response?.data?.value || []).map((article) => ({
      title: article.title,
      description: article.description,
      content: article.body,
      url: article.url,
      image: article.image?.url,
      source: article.provider?.name || "RapidAPI",
      publishedAt: article.datePublished,
    }));
  } catch (err) {
    console.error("🔴 RapidAPI source failed:", err?.response?.status || err.message);
    return [];
  }
};

// ========== SAVE ARTICLES TO DB ==========
const saveArticles = async (allArticles, category, location, language) => {
  if (!allArticles || allArticles.length === 0) return [];

  const savedArticles = [];

  for (const article of allArticles) {
    try {
      const baseText = article?.description || article?.content || article?.title || "";

      let summaryText = baseText;
      // Summarization currently disabled; plug summarize() here if re-enabled

      const sourceName = safeString(article.source, "News");

      const filter = article.url
        ? { url: article.url }
        : { title: article.title, source: sourceName };

      const saved = await News.findOneAndUpdate(
        filter,
        {
          title: article.title || `Top ${category} news`,
          description: article.description,
          url: article.url,
          imageUrl: article.image,
          source: sourceName,
          category,
          location,
          language,
          publishedAt: article.publishedAt || new Date(),
          summary: summaryText,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      savedArticles.push(saved);
    } catch (err) {
      console.error("Error saving article:", err.message);
    }
  }

  return savedArticles;
};

// ========== EXPORTED FUNCTIONS ==========
exports.fetchFromGNews = fetchFromGNews;
exports.fetchFromNewsAPI = fetchFromNewsAPI;
exports.fetchFromMediastack = fetchFromMediastack;
exports.fetchFromGuardian = fetchFromGuardian;
exports.fetchFromCurrents = fetchFromCurrents;
exports.fetchFromNewsData = fetchFromNewsData;
exports.fetchFromRapidApi = fetchFromRapidApi;
exports.saveArticles = saveArticles;

// ========== MAIN FETCH (combined) ==========
// If category is omitted, we fetch a default set of categories from all sources in one go.
const DEFAULT_CATEGORIES = [
  "technology",
  "business",
  "sports",
  "entertainment",
  "health",
  "science",
  "world",
  "politics",
  "general",
  "finance",
  "education",
  "travel",
  "food",
  "automotive",
  "gaming",
  "international",
  "breaking",
  "top",
  "usa",
  "europe",
  "asia",
  "africa",
  "middle-east",
  "australia",
  "latin-america",
  "uk",
  "canada",
  "india",
];

exports.fetchAndSummarize = async (category, location, language) => {
  // If no category (or "all"), fetch all default categories in one call
  const categoriesToFetch = !category || category === "all" ? DEFAULT_CATEGORIES : [category];
  let saved = [];

  for (const cat of categoriesToFetch) {
    const results = await Promise.all([
      fetchFromNewsAPI(cat, language),
      fetchFromGNews(cat, language),
      fetchFromGuardian(cat, language),
      fetchFromMediastack(cat, language),
      fetchFromCurrents(cat, language),
      fetchFromNewsData(cat, language),
      fetchFromRapidApi(cat, language),
    ]);

    const allArticles = results.flat().filter(Boolean);

    if (allArticles.length === 0) {
      console.warn("⚠️ No articles fetched from any source for category:", cat);
      continue;
    }

    console.log(`📰 Fetched ${allArticles.length} articles for ${cat}`);
    const savedBatch = await saveArticles(allArticles, cat, location, language);
    saved = saved.concat(savedBatch);
  }

  return saved;
};

// Return latest news from DB for the UI
exports.listLatest = async ({ category, location, language, limit = 20 } = {}) => {
  const query = {};
  if (category) query.category = category;
  if (location) query.location = location;
  if (language) query.language = language;

  return News.find(query)
    .sort({ publishedAt: -1, createdAt: -1 })
    .limit(limit)
    .lean();
};
