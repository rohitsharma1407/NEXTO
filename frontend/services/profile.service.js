// Profile service for API calls
const API_ROOT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getProfile(userId) {
  try {
    const token = localStorage.getItem("nexto_token");
    const response = await fetch(`${API_ROOT}/api/user/profile/${userId}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export async function updateProfile(userId, profileData) {
  try {
    const token = localStorage.getItem("nexto_token");
    const response = await fetch(`${API_ROOT}/api/user/profile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(profileData),
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    return null;
  }
}

export async function getUserPosts(userId) {
  try {
    const response = await fetch(`${API_ROOT}/api/user/${userId}/posts`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export async function followUser(userId) {
  try {
    const token = localStorage.getItem("nexto_token");
    const response = await fetch(`${API_ROOT}/api/user/${userId}/follow`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error following user:", error);
    return false;
  }
}

export async function unfollowUser(userId) {
  try {
    const token = localStorage.getItem("nexto_token");
    const response = await fetch(`${API_ROOT}/api/user/${userId}/unfollow`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    return false;
  }
}

export async function uploadProfilePicture(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const token = localStorage.getItem("nexto_token");
    const response = await fetch(`${API_ROOT}/api/user/upload-avatar`, {
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: formData,
    });
    const data = await response.json();
    return data.data?.url;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    return null;
  }
}
