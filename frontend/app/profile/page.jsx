"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import headerStyles from "../../styles/profile.module.css";
import pageStyles from "../../styles/profilePage.module.css";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileTabs from "../../components/profile/ProfileTabs";
import ProfileGrid from "../../components/profile/ProfileGrid";
import CreatePostButton from "../../components/profile/CreatePostButton";
import EditProfileModal from "../../components/profile/EditProfileModal";
import FollowersModal from "../../components/profile/FollowersModal";
import useUser from "../../hooks/useUser";
import { getProfile, updateProfile, getUserPosts } from "../../services/profile.service";

export default function ProfilePage() {
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
      <div className="w-full h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">👤</div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${pageStyles.profilePageRoot} w-full min-h-screen bg-white dark:bg-gray-900`}>
      {/* Profile Header */}
      <ProfileHeader
        user={profile}
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
          // Give React time to update context in all subscribers
          setTimeout(() => {
            console.log("Redirecting to home after logout");
            router.push("/");
          }, 100);
        }}
      />

      {/* Profile Stats */}
      <div className={`${pageStyles.sectionPad} ${pageStyles.fadeIn}`}>
        <div className={`${pageStyles.maxWidth} ${pageStyles.statsCard} border dark:border-gray-800 bg-white dark:bg-gray-900`}>
          <ProfileStats
            posts={posts.length}
            followers={profile.followers || 0}
            following={profile.following || 0}
            onFollowersClick={() => setShowFollowers(true)}
          />
        </div>
      </div>

      {/* Profile Tabs */}
      <div className={`${pageStyles.sectionPad} ${pageStyles.stickyTabsWrap}`}>
        <div className={pageStyles.maxWidth}>
          <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>

      {/* Profile Grid */}
      <div className={`${pageStyles.sectionPad} ${pageStyles.gridWrap}`}>
        <div className={pageStyles.maxWidth}>
          <ProfileGrid posts={posts} activeTab={activeTab} loading={loading} />
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
