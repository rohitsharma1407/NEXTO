"use client";
import { useEffect, useState } from "react";
import useNews from "../hooks/useNews";

// Content
import Feed from "../components/Feed";
import Footer from "../components/layout/Footer";

const ITEMS_PER_PAGE = 20;

export default function HomePage() {
  const { news, loading, fetchNews } = useNews();

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  // Initial load + auto refresh
  useEffect(() => {
    fetchNews({});
    const interval = setInterval(() => {
      fetchNews({});
    }, 30_000);

    return () => clearInterval(interval);
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const visibleNews = news.slice(0, visibleCount);

  return (
    <div className="w-full bg-white dark:bg-black">
      {/* Feed */}
      <main className="px-4 pb-4">
        <Feed news={visibleNews} loading={loading} />

        {!loading && visibleNews.length < news.length && (
          <div className="flex justify-center py-6">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 rounded-full border text-sm font-medium hover:bg-gray-100 transition"
            >
              Load more
            </button>
          </div>
        )}
      </main>

      {/* Footer - attached after content */}
      <Footer />
    </div>
  );
}





// "use client";
// import { useEffect, useState } from "react";
// import useNews from "../hooks/useNews";

// // Layout
// import Header from "../components/layout/Header";
// import LiveBar from "../components/layout/LiveBar";
// import OptionsBar from "../components/layout/OptionsBar";

// // Stories + Feed
// import Stories from "../components/stories/Stories";
// import Feed from "../components/Feed";

// export default function HomePage() {
//   const { news, loading, fetchNews } = useNews();
//   const [displayedNews, setDisplayedNews] = useState([]);
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 20;
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   useEffect(() => {
//     // Initial fetch + auto refresh every 30s
//     const load = () => fetchNews({});
//     load();
//     const intervalId = setInterval(load, 30_000);
//     return () => clearInterval(intervalId);
//   }, []);

//   // Update displayed news whenever the feed changes
//   useEffect(() => {
//     if (news && news.length > 0) {
//       const startIdx = 0;
//       const endIdx = itemsPerPage;
//       setDisplayedNews(news.slice(startIdx, endIdx));
//       setPage(1);
//     } else {
//       setDisplayedNews([]);
//       setPage(1);
//     }
//   }, [news]);

//   const handleLoadMore = () => {
//     setIsLoadingMore(true);
//     setTimeout(() => {
//       const startIdx = page * itemsPerPage;
//       const endIdx = (page + 1) * itemsPerPage;
//       const newItems = news.slice(startIdx, endIdx);
      
//       if (newItems.length > 0) {
//         setDisplayedNews((prev) => [...prev, ...newItems]);
//         setPage((prev) => prev + 1);
//       } else {
//         // Reset to beginning
//         setDisplayedNews(news.slice(0, itemsPerPage));
//         setPage(1);
//       }
//       setIsLoadingMore(false);
//     }, 500);
//   };

//   return (
//     <div className="w-full bg-white">
//       {/* Fixed top */}
//       <Header />
//       <LiveBar />

//       {/* 🔥 Instagram-style Stories */}
//       <Stories />

//       {/* Main Feed */}
//       <main className="px-4 pt-2 pb-16">
//         <Feed news={displayedNews} loading={loading} />
        
//         {/* Load More Button */}
//         {!loading && displayedNews.length > 0 && displayedNews.length >= itemsPerPage && (
//           <div className="flex justify-center py-6">
//             <button
//               onClick={handleLoadMore}
//               disabled={isLoadingMore}
//               className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoadingMore ? "Loading..." : "Load More"}
//             </button>
//           </div>
//         )}
//       </main>

//       {/* Bottom options bar */}
//       <OptionsBar />
//     </div>
//   );
// }
