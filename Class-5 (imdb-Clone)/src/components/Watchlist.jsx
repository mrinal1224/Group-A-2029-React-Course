import React from "react";

function Watchlist({ watchlist }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
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
          {watchlist.map((movieObj) => (
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4">
                <div
                  className="h-20 w-14 bg-cover bg-center rounded-md"
                  style={{
                    backgroundImage: `url('https://image.tmdb.org/t/p/w500/${movieObj.poster_path}')`,
                  }}
                ></div>
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 text-lg">
                {movieObj.title}
              </td>
              <td className="px-6 py-4">
                <span className="flex items-center">{movieObj.vote_average}</span>
              </td>
              <td className="px-6 py-4">{movieObj.popularity}</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                  Action
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-red-500 hover:text-red-700 font-semibold cursor-pointer">
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
