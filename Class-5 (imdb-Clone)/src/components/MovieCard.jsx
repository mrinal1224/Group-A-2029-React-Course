import React from 'react'

function MovieCard({title , posterUrl}) {
  return (
    <div className='h-90 w-60 bg-cover ' style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500/${posterUrl})`}}>
      <p className=''>{title}</p>
    </div>
  )
}

export default MovieCard