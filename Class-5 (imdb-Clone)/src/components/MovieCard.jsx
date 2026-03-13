import React from 'react'

function MovieCard({ title, posterUrl , movieObj , addWatchList}) {
  return (
    <div 
      className='h-90 w-60 bg-cover bg-center rounded-xl flex flex-col justify-between items-end p-4 hover:scale-105 duration-300 cursor-pointer' 
      style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${posterUrl})` }}
    >
      {/* Add to Watchlist Button */}
      <div onClick={()=>addWatchList(movieObj)} className='flex justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60 hover:bg-gray-900 text-white'>
        <i className="fa-solid fa-plus"></i> 
        {/* Note: If you aren't using FontAwesome, you can just use + */}
      </div>

      {/* Title with Gradient Background for Readability */}
      <div className='text-white text-center w-full bg-gray-900/70 p-2 rounded-b-xl'>
        {title}
      </div>
    </div>
  )
}

export default MovieCard