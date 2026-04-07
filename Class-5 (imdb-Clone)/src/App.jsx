import { useCallback, useEffect, useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext } from "./components/MovieContext";

function App() {
  const [watchlist, setWatchList] = useState(() => {
    const moviesFromLS = localStorage.getItem("moviesFromLS");
    if (!moviesFromLS) return [];

    try {
      const movies = JSON.parse(moviesFromLS);
      if (!Array.isArray(movies)) return [];

      // Deduplicate by TMDB/movie id (guards against older localStorage data).
      const seenIds = new Set();
      return movies.filter((m) => {
        if (!m || m.id === undefined || m.id === null) return false;
        if (seenIds.has(m.id)) return false;
        seenIds.add(m.id);
        return true;
      });
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("moviesFromLS", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchList = useCallback((movieObj) => {
    if (!movieObj || typeof movieObj !== "object") return;
    if (movieObj.id === undefined || movieObj.id === null) return;

    setWatchList((prev) => {
      const exists = prev.some((m) => m.id === movieObj.id);
      if (exists) return prev;

      return [...prev, movieObj];
    });
  }, []);

  const removeFromWatchList = useCallback((movieId) => {
    if (movieId === undefined || movieId === null) return;

    setWatchList((prev) => prev.filter((m) => m.id !== movieId));
  }, []);

  return (
    <>
      <MovieContext.Provider value={{ addToWatchList, removeFromWatchList }}>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Movies />} />
            <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
            <Route path="/mood" element={<MoodSelector />} />
          </Routes>
        </BrowserRouter>
      </MovieContext.Provider>
    </>
  );
}

export default App;
