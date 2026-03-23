import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import MovieCard from "./MovieCard";
import axios from "axios";
import Pagination from "./Pagination";

const TMDB_API_KEY =
  import.meta.env.VITE_TMDB_API_KEY || "3aec63790d50f3b9fc2efb4c15a8cf99";

//  https://api.themoviedb.org/3/movie/popular?api_key=3aec63790d50f3b9fc2efb4c15a8cf99&language=en-US&page=3

function Movies() {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function incrementPage() {
    setPageNo((prev) => prev + 1);
  }

  function decrementPage() {
    setPageNo((prev) => (prev >= 2 ? prev - 1 : prev));
  }

  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${pageNo}`
        );
        setMovies(response.data?.results ?? []);
      } catch {
        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    getMovies();
  }, [pageNo]);

  return (
    <div>
      <Banner />

      {loading ? (
        <div className="text-center mt-10 text-gray-700">Loading...</div>
      ) : error ? (
        <div className="text-center mt-10 text-red-600">{error}</div>
      ) : (
        <div className="m-10 flex gap-6 flex-wrap justify-evenly">
          {movies.map((movieObj) => (
            <MovieCard
              key={movieObj.id}
              movieObj={movieObj}
              title={movieObj.title}
              posterUrl={movieObj.poster_path}
            />
          ))}
        </div>
      )}

      <Pagination decrementPage={decrementPage} incrementPage={incrementPage} pageNo={pageNo}/>
    </div>
  );
}

export default Movies;
