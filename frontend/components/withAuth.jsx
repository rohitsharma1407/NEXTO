"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "../hooks/useUser";

export default function withAuth(Component) {
  return function ProtectedRoute(props) {
    const { user, ready } = useUser();
    const router = useRouter();

    useEffect(() => {
      // Wait for user state to be ready
      if (!ready) return;
      
      // If no user is logged in, redirect to home
      if (!user) {
        console.log("No user found, redirecting to home");
        router.replace("/");
      }
    }, [user, ready, router]);

    // Show loading while checking auth
    if (!ready) {
      return (
        <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin text-4xl mb-4">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">Loading...</p>
          </div>
        </div>
      );
    }

    // If not logged in, show nothing (will redirect)
    if (!user) {
      return null;
    }

    // User is logged in, render the component
    return <Component {...props} />;
  };
}
