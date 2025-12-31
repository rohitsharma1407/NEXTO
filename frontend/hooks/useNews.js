import { useState } from "react";

export default function useNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchNews({ category="", location="", language="" } = {}) {
    setLoading(true);
    try {
      const apiRoot = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const url = `${apiRoot}/api/news?category=${encodeURIComponent(category)}&location=${encodeURIComponent(location)}&language=${encodeURIComponent(language)}`;
      const res = await fetch(url);
      const data = await res.json();
      // data.data may be a news doc or list depending on backend; handle both
      if (Array.isArray(data.data)) setNews(data.data);
      else if (data.data && data.data.summary) setNews([data.data]);
      else setNews([]);
    } catch (err) {
      console.error("fetchNews error", err);
      setNews([]);
    } finally {
      setLoading(false);
    }
  }

  return { news, loading, fetchNews, setNews };
}
