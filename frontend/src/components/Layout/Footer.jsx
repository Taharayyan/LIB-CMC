import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 text-white py-12 shadow-glow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3 gradient-text bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
            📚 CMC Nouacour Library
          </h3>
          <p className="text-gray-300 mb-6 text-lg">
            A comprehensive digital library and meeting platform
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">
              © 2024 CMC Nouacour Library. All rights reserved. ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
