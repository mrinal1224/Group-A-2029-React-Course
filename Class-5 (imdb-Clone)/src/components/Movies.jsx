import React from 'react'
import Banner from './Banner'
import MovieCard from './MovieCard'

function Movies() {
  return (
    <div>
        <Banner/>

        <div className='mt-10 flex gap-6 flex-wrap justify-evenly'>

        <MovieCard/>
        <MovieCard/>  
        <MovieCard/>   
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        <MovieCard/>
        </div>
    </div>
  )
}

export default Movies