import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard";
import axios from "axios";

//  https://api.themoviedb.org/3/movie/popular?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=3

function Movies() {
  // get the data from the url
  // in the app and show the data on the console

const [movies , setMovies] =   useState([])

  useEffect(() => {
    async function getMovies() {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=3`
      );
      setMovies(response.data.results)
    }

    getMovies()
  }, []);

  return (
    <div>
      <Banner />

      <div className="mt-10 flex gap-6 flex-wrap justify-evenly">
       {movies.map((movieObj)=>{
        return <MovieCard title={movieObj.title} posterUrl={movieObj.poster_path}/>
       })}
      </div>
    </div>
  );
}

export default Movies;
