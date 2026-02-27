import React , {useState} from 'react'
import {Link} from 'react-router-dom'

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
        <Link to="/" className="hover:text-white text-gray-100 transition-colors duration-200">
          Movies
        </Link>
        <Link to="/watchlist" className="hover:text-white text-gray-100 transition-colors duration-200">
          Watchlist
        </Link>
        <Link to='/mood' className="px-4 py-2 bg-gray-800 text-gray-100 rounded-full border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-200">
          Mood Selector
        </Link>
      </div>

    
    </nav>
  )
}

export default Navbar