import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="page-container animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-block mb-4">
            {/* <div className="h-20 w-20 mx-auto flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-glow">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div> */}
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
            <span className="gradient-text">CMC Nouacour</span>
            <br />
            <span className="text-slate-800">Library</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
            Discover, learn, and collaborate in our modern digital library and
            meeting platform
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <>
                <Link to="/library" className="btn-primary min-w-[200px]">
                  📚 Browse Library
                </Link>
                <Link to="/meetings" className="btn-secondary min-w-[200px]">
                  📅 Join Meetings
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary min-w-[200px]">
                  🚀 Get Started
                </Link>
                <Link to="/signup" className="btn-secondary min-w-[200px]">
                  ✨ Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-slate-800 mb-12">
            Everything you need to learn and grow
          </h2>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="card p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white mb-6 shadow-lg">
                {/* <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg> */}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Digital Library
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Access thousands of PDF books, research papers, and educational
                materials in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card p-8 hover:scale-105 transition-transform duration-300">
              {/* <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-6 shadow-lg">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div> */}
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Virtual Meetings
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Schedule and join virtual meetings with integrated chat and
                collaboration tools.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card p-8 hover:scale-105 transition-transform duration-300">
              {/* <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white mb-6 shadow-lg">
                <svg
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div> */}
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                Real-time Chat
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Communicate with other users through real-time chat during
                meetings and discussions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
