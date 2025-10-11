import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    avatar_url: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setProfile({
        username: user.username || "",
        email: user.email || "",
        avatar_url: user.avatar_url || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement profile update API call
      console.log("Updating profile:", profile);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center">
        <div className="card max-w-md text-center">
          <div className="text-6xl mb-4">🔒</div>
          <p className="text-gray-700 text-lg">
            Please log in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-bold gradient-text">👤 Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={isEditing ? "btn-secondary" : "btn-primary"}
            >
              {isEditing ? "❌ Cancel" : "✏️ Edit Profile"}
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            <div className="animate-slide-up">
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={profile.username}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            <div
              className="animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <label
                htmlFor="avatar_url"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Avatar URL
              </label>
              <input
                type="url"
                name="avatar_url"
                value={profile.avatar_url}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="input-field disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-3 pt-4 animate-fade-in">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "💾 Saving..." : "✅ Save Changes"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
