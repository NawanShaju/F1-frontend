// src/components/Header.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gray-950 shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="text-4xl">🏎️</div>
            <div>
              <h1 className="text-2xl font-bold text-white group-hover:text-red-500 transition-colors">
                F1 Learning
              </h1>
              <p className="text-xs text-gray-400">Explore Formula 1</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex gap-2">
            <Link
              to="/"
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isActive('/')
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              Races
            </Link>
            <Link
              to="/drivers"
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                isActive('/drivers')
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              Drivers
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}