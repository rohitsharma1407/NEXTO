const cron = require("node-cron");
const {
  fetchFromGNews,
  fetchFromNewsAPI,
  fetchFromMediastack,
  fetchFromGuardian,
  fetchFromCurrents,
  fetchFromNewsData,
  fetchFromRapidApi,
  saveArticles,
} = require("./news.service");

const defaultCategories = ["technology", "business", "sports", "entertainment", "health", "science", "world"];
const location = "india";
const language = "en";

// NewsAPI: every 30 seconds
cron.schedule("*/30 * * * * *", async () => {
  console.log("⏰ NewsAPI fetch (30s)");
  for (const category of ["technology", "business", "sports"]) {
    try {
      const articles = await fetchFromNewsAPI(category, language);
      if (articles.length) await saveArticles(articles, category, location, language);
    } catch (err) {
      console.error(`❌ NewsAPI ${category}:`, err.message);
    }
  }
});

// Guardian: every 1 minute
cron.schedule("0 * * * * *", async () => {
  console.log("⏰ Guardian fetch (1m)");
  for (const category of ["politics", "world", "technology"]) {
    try {
      const articles = await fetchFromGuardian(category, language);
      if (articles.length) await saveArticles(articles, category, location, language);
    } catch (err) {
      console.error(`❌ Guardian ${category}:`, err.message);
    }
  }
});

// RapidAPI: every 1 minute
cron.schedule("0 * * * * *", async () => {
  console.log("⏰ RapidAPI fetch (1m)");
  for (const category of ["technology", "finance"]) {
    try {
      const articles = await fetchFromRapidApi(category, language);
      if (articles.length) await saveArticles(articles, category, location, language);
    } catch (err) {
      console.error(`❌ RapidAPI ${category}:`, err.message);
    }
  }
});

// GNews: every 30 minutes
cron.schedule("0 */30 * * * *", async () => {
  console.log("⏰ GNews fetch (30m)");
  for (const category of defaultCategories) {
    try {
      const articles = await fetchFromGNews(category, language);
      if (articles.length) await saveArticles(articles, category, location, language);
    } catch (err) {
      console.error(`❌ GNews ${category}:`, err.message);
    }
  }
});

// NewsData.io: every 10 minutes
cron.schedule("0 */10 * * * *", async () => {
  console.log("⏰ NewsData fetch (10m)");
  for (const category of ["technology", "business", "health"]) {
    try {
      const articles = await fetchFromNewsData(category, language);
      if (articles.length) await saveArticles(articles, category, location, language);
    } catch (err) {
      console.error(`❌ NewsData ${category}:`, err.message);
    }
  }
});

// Currents API: every 40 minutes (runs at minute 0 and 40)
cron.schedule("0 */40 * * * *", async () => {
  console.log("⏰ Currents fetch (40m)");
  for (const category of ["technology", "science", "general"]) {
    try {
      const articles = await fetchFromCurrents(category, language);
      if (articles.length) await saveArticles(articles, category, location, language);
    } catch (err) {
      console.error(`❌ Currents ${category}:`, err.message);
    }
  }
});

// Mediastack: every 4 hours
cron.schedule("0 0 */4 * * *", async () => {
  console.log("⏰ Mediastack fetch (4h)");
  for (const category of ["technology", "business", "sports"]) {
    try {
      const articles = await fetchFromMediastack(category, language);
      if (articles.length) await saveArticles(articles, category, location, language);
    } catch (err) {
      console.error(`❌ Mediastack ${category}:`, err.message);
    }
  }
});

console.log("🔄 Scheduler started:");
console.log("   📰 NewsAPI: every 30s");
console.log("   📰 Guardian: every 1m");
console.log("   📰 RapidAPI: every 1m");
console.log("   📰 GNews: every 30m");
console.log("   📰 NewsData: every 10m");
console.log("   📰 Currents: every 40m");
console.log("   📰 Mediastack: every 4h");
