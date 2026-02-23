import React from 'react'

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-[#121212] border-b border-gray-800">
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center font-bold text-white">
          C
        </div>
        <span className="text-xl font-bold text-gray-100 tracking-tight">
          CinePulse
        </span>
      </div>

      {/* Navigation Options */}
      <div className="flex items-center space-x-8 text-sm font-medium text-gray-400">
        <a href="/" className="hover:text-white text-gray-100 transition-colors duration-200">
          Movies
        </a>
        <a href="/watchlist" className="hover:text-white text-gray-100 transition-colors duration-200">
          Watchlist
        </a>
        <a href='/mood' className="px-4 py-2 bg-gray-800 text-gray-100 rounded-full border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-200">
          Mood Selector
        </a>
      </div>
    </nav>
  )
}

export default Navbar