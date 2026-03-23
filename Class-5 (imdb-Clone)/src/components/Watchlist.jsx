import React, { useContext, useMemo, useState } from "react";
import { genreids } from "../genres";
import { MovieContext } from "./MovieContext";

function Watchlist({ watchlist }) {
  const [currentGenre, setCurrentGenre] = useState("All Genres");
  const [search, setSearch] = useState("");

  const { removeFromWatchList } = useContext(MovieContext);

  const genreList = useMemo(() => {
    const genreArr = watchlist
      .map((movieObj) => genreids[movieObj?.genre_ids?.[0]])
      .filter(Boolean);
    const uniqueGenres = Array.from(new Set(genreArr));
    return ["All Genres", ...uniqueGenres];
  }, [watchlist]);

  const searchLower = search.trim().toLowerCase();

  function changeGenre(genre) {
    setCurrentGenre(genre);
  }

  function handleDelete(movieId) {
    removeFromWatchList(movieId);
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
      {/* Centered Genre List */}
      <div className="flex flex-wrap justify-center gap-4 py-5 bg-gray-50 border-b">
        {genreList.map((genre) => (
          <div
            onClick={() => changeGenre(genre)}
            className="px-6 py-2 border rounded-xl bg-blue-500 text-white font-bold text-sm cursor-pointer hover:bg-blue-600 transition-colors"
          >
            {genre}
          </div>
        ))}
      </div>

      {/* Search Bar */}

      <div className="flex justify-center my-6 px-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search Movies"
            className="w-full h-12 px-5 pl-12 rounded-xl bg-gray-100 border-none outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white transition-all text-gray-700 shadow-sm"
            onChange={(e)=>setSearch(e.target.value)}
            value={search}
          />
          {/* Optional Search Icon */}
          <div className="absolute left-4 top-3.5 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <table className="w-full text-left text-sm text-gray-500">
        <thead className="bg-gray-50 text-gray-700 uppercase font-semibold">
          <tr>
            <th className="px-6 py-4">Poster</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Ratings</th>
            <th className="px-6 py-4">Popularity</th>
            <th className="px-6 py-4">Genre</th>
            <th className="px-6 py-4 text-red-600">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {watchlist
            .filter(
              (movieObj) =>
                currentGenre === "All Genres" ||
                genreids[movieObj?.genre_ids?.[0]] === currentGenre
            )
            .filter((movieObj) =>
              (movieObj?.title ?? "").toLowerCase().includes(searchLower)
            )
            .map((movieObj) => (
              <tr
                key={movieObj.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div
                    className="h-20 w-14 bg-cover bg-center rounded-md shadow-sm"
                    style={{
                      backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movieObj.poster_path}')`,
                    }}
                  ></div>
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 text-lg">
                  {movieObj.title}
                </td>
                <td className="px-6 py-4">
                  <span className="flex items-center">
                    ⭐ {movieObj.vote_average}
                  </span>
                </td>
                <td className="px-6 py-4">{movieObj.popularity}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                    {genreids[movieObj.genre_ids[0]]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(movieObj.id)}
                    className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Watchlist;
