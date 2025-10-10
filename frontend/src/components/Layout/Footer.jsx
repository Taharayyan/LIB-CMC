import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">CMC Nouacour Library</h3>
          <p className="text-gray-400 mb-4">
            A comprehensive digital library and meeting platform
          </p>
          <div className="border-t border-gray-700 pt-4">
            <p className="text-sm text-gray-500">
              © 2024 CMC Nouacour Library. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
