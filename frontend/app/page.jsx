"use client";
import { useEffect, useState } from "react";
import useNews from "../hooks/useNews";
import useUser from "../hooks/useUser";
import AuthModal from "../components/modals/AuthModal";
import Feed from "../components/Feed";
import Footer from "../components/layout/Footer";

const ITEMS_PER_PAGE = 20;

export default function HomePage() {
  const { news, loading, fetchNews } = useNews();
  const { user, isGuest, hasSeenAuthModal, ready, continueAsGuest } = useUser();
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [feedType, setFeedType] = useState("all"); // "all" or "personalized"
  const [personalizedNews, setPersonalizedNews] = useState([]);

  // Initial load + auto refresh
  useEffect(() => {
    if (feedType === "all") {
      fetchNews({});
      const interval = setInterval(() => {
        fetchNews({});
      }, 30_000);
      return () => clearInterval(interval);
    } else if (feedType === "personalized" && user) {
      loadPersonalizedFeed();
    }
  }, [feedType, user]);

  const loadPersonalizedFeed = async () => {
    try {
      const token = localStorage.getItem("nexto_token");
      const response = await fetch("http://localhost:5000/api/news/personalized", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setPersonalizedNews(data.data);
      }
    } catch (error) {
      console.error("Error loading personalized feed:", error);
    }
  };

  // Show auth modal only if user hasn't seen it, is not logged in, and not a guest
  useEffect(() => {
    // Wait for user state to be ready
    if (!ready) return;
    
    // Don't show modal if user is logged in
    if (user) return;
    
    // Don't show modal if user is guest or has already seen it
    if (isGuest || hasSeenAuthModal) return;
    
    // Show modal for new visitors
    setIsAuthModalOpen(true);
  }, [user, isGuest, hasSeenAuthModal, ready]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleAuthModalClose = () => {
    // When closing modal, consider it as continuing as guest
    continueAsGuest();
    setIsAuthModalOpen(false);
  };

  const currentNews = feedType === "personalized" ? personalizedNews : news;
  const visibleNews = currentNews.slice(0, visibleCount);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-purple-50 to-blue-50 dark:from-slate-950 dark:via-purple-950 dark:to-blue-950">
      {/* Auth Modal - Opens automatically for first time users only */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleAuthModalClose} 
      />

      {/* Feed Type Selector removed */}

      {/* Feed */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {feedType === "personalized" && user && (
          <div className="mb-6 p-5 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-2xl border-2 border-blue-300 dark:border-blue-700 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl">
                <i className="fa-solid fa-wand-magic-sparkles"></i>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-blue-900 dark:text-blue-300">Personalized Feed</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">News curated based on your interests</p>
              </div>
            </div>
          </div>
        )}

        <Feed news={visibleNews} loading={loading} />

        {!loading && visibleNews.length < currentNews.length && (
          <div className="flex justify-center py-8">
            <button
              onClick={handleLoadMore}
              className="px-10 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white font-bold text-base hover:shadow-2xl transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2 group"
            >
              <i className="fa-solid fa-arrow-down group-hover:translate-y-1 transition-transform"></i>
              Load More Stories
            </button>
          </div>
        )}

        {!loading && visibleNews.length === 0 && (
          <div className="text-center py-20">
            <div className="text-7xl mb-6 animate-bounce">📰</div>
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
              No news available
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base">
              Check back later for updates or try adjusting your search
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
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
