import React from 'react'
import { MovieContext } from './MovieContext'
import { useContext } from 'react'


function MovieCard({ title, posterUrl , movieObj}) {

  const {addToWatchList} = useContext(MovieContext)

  const posterSrc = posterUrl
    ? `https://image.tmdb.org/t/p/w500/${posterUrl}`
    : null;

  return (
    <div 
      className='h-90 w-60 bg-cover bg-center rounded-xl flex flex-col justify-between items-end p-4 hover:scale-105 duration-300 cursor-pointer' 
      style={{ backgroundImage: posterSrc ? `url(${posterSrc})` : undefined }}
    >
      {/* Add to Watchlist Button */}
      <div onClick={()=>addToWatchList(movieObj)} className='flex justify-center items-center h-8 w-8 rounded-lg bg-gray-900/60 hover:bg-gray-900 text-white'>
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