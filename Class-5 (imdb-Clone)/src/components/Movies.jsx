import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

//  https://api.themoviedb.org/3/movie/popular?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=3

function Movies() {
  // get the data from the url
  // in the app and show the data on the console

const [movies , setMovies] =   useState([])
const [pageNo, setPageNo] = useState(1);

function incrementPage() {
  setPageNo(pageNo + 1);
}

function decrementPage() {
  if (pageNo >= 2) {
    setPageNo(pageNo - 1);
  }
}

  useEffect(() => {
    async function getMovies() {
      let response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=${pageNo}`
      );
      setMovies(response.data.results)
      console.log(response.data.results)
    }

    getMovies()
  }, [pageNo]);

  return (
    <div>
      <Banner />

      <div className="m-10  flex gap-6 flex-wrap justify-evenly">
       {movies.map((movieObj)=>{
        return <MovieCard  movieObj={movieObj} title={movieObj.title} posterUrl={movieObj.poster_path}/>
       })}
      </div>

      <Pagination decrementPage={decrementPage} incrementPage={incrementPage} pageNo={pageNo}/>
    </div>
  );
}

export default Movies;
