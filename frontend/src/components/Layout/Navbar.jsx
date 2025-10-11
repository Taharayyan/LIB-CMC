import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center hover:scale-105 transition-transform"
            >
              <span className="text-2xl font-bold">
                📚 CMC Nouacour Library
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <Link
              to="/library"
              className="hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-soft"
            >
              📖 Library
            </Link>
            <Link
              to="/meetings"
              className="hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-soft"
            >
              🗓️ Meetings
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  className="hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-soft"
                >
                  👤 Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-soft"
                >
                  🚪 Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:shadow-soft"
                >
                  🔑 Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white/10 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-soft hover:shadow-glow"
                >
                  ✨ Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
