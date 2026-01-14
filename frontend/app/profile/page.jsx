"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileHighlights from "../../components/profile/ProfileHighlights";
import ProfileTabs from "../../components/profile/ProfileTabs";
import ProfileGrid from "../../components/profile/ProfileGrid";
import MyNewsTab from "../../components/profile/MyNewsTab";
import CreatePostButton from "../../components/profile/CreatePostButton";
import EditProfileModal from "../../components/profile/EditProfileModal";
import FollowersModal from "../../components/profile/FollowersModal";
import useUser from "../../hooks/useUser";
import { getProfile, updateProfile, getUserPosts } from "../../services/profile.service";

function ProfilePage() {
  const { user: loggedInUser, ready, setUser, logout } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    // Wait until user state is hydrated
    if (!ready) return;
    if (!loggedInUser) {
      router.replace("/auth/login");
      return;
    }
    loadProfileData();
  }, [ready, loggedInUser]);

  // Add a body class while on profile to adjust global layout spacing
  useEffect(() => {
    document.body.classList.add("profile-active");
    return () => document.body.classList.remove("profile-active");
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      // Always fetch the latest profile from backend using the logged in id
      const latest = await getProfile(loggedInUser?._id);
      const profileData = latest || loggedInUser;
      setProfile(profileData);

      // Fetch user posts or use mock data
      const userPosts = profileData?._id ? await getUserPosts(profileData._id) : [];
      setPosts(
        userPosts && userPosts.length > 0
          ? userPosts
          : [
              // Empty posts to start if none available
              
            ]
      );
      // Keep local session in sync with any fresh profile fields
      if (profileData) {
        setUser(profileData);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleSaveProfile = async (formData) => {
    try {
      const updated = await updateProfile(profile._id, formData);
      if (updated) {
        setProfile(updated);
        setUser(updated);
      }
      setShowEditModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: profile?.username,
        text: `Check out ${profile?.fullName}'s profile`,
        url: window.location.href,
      });
    }
  };

  const handleCreatePost = (type) => {
    console.log("Creating post type:", type);
    // Implement create post modal here
  };

  if (!profile) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">👤</div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Profile Header */}
        <ProfileHeader
          user={profile}
          posts={posts.length}
          isOwner={loggedInUser?._id === profile?._id}
          onEditProfile={handleEditProfile}
          onShareProfile={handleShareProfile}
          onCopyProfile={() => {
            const url = typeof window !== "undefined" ? window.location.href : "";
            if (url && navigator.clipboard) {
              navigator.clipboard.writeText(url);
            }
          }}
          onLogout={async () => { 
            console.log("ProfileHeader logout clicked");
            setIsLoggingOut(true);
            logout(); 
            setTimeout(() => {
              console.log("Redirecting to home after logout");
              router.push("/");
            }, 100);
          }}
        />
        {/* Profile Stats are now embedded inside ProfileHeader for Instagram-like layout */}

        {/* Bio Section */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 p-4 sm:p-6 shadow-sm profile-bio">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{profile.fullName || profile.username}</h2>
            </div>
            {profile.bio && <p className="text-sm text-gray-700 dark:text-gray-300">{profile.bio}</p>}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              {profile.location && <span className="flex items-center gap-2"><i className="fa-solid fa-location-dot" /> {profile.location}</span>}
              {profile.website && <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-400">{profile.website}</a>}
            </div>
          </div>
        </div>

        {/* Profile Highlights - Instagram Style */}
        <ProfileHighlights highlights={profile?.highlights || []} />

        {/* Profile Tabs */}
        <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-950/90 backdrop-blur pb-1">
          <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/80 dark:border-gray-800/80 shadow-sm">
            <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>

        {/* Profile Grid / News */}
        <div>
          {activeTab === "news" ? (
            <MyNewsTab userId={profile._id} />
          ) : (
            <ProfileGrid posts={posts} activeTab={activeTab} loading={loading} />
          )}
        </div>
      </div>

      {/* Create Post Button */}
      <CreatePostButton onCreatePost={handleCreatePost} />

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          user={profile}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveProfile}
          onAutoSaveProfileImage={async (url) => {
            try {
              const updated = await updateProfile(profile._id, { profileImage: url });
              if (updated) {
                setProfile(updated);
                setUser(updated);
              }
            } catch (err) {
              console.error("Auto-save profile image failed", err);
            }
          }}
        />
      )}

      {/* Followers Modal */}
      {showFollowers && (
        <FollowersModal
          isOpen={showFollowers}
          onClose={() => setShowFollowers(false)}
          followers={profile.followersList || []}
        />
      )}

      {/* Space for bottom navigation */}
      <div className="h-20"></div>
    </div>
  );
}

// Export with auth protection
import withAuth from "../../components/withAuth";
export default withAuth(ProfilePage);
