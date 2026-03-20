import { useEffect, useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext } from "./components/MovieContext";

function App() {
  const [watchlist, setWatchList] = useState([]);

  function addToWatchList(movieObj) {
    // task - only allow unique movies in the watchlist
    watchlist.push(movieObj);
    console.log(watchlist);
    setWatchList(watchlist);

    localStorage.setItem("moviesFromLS", JSON.stringify(watchlist));
  }

  //
  useEffect(() => {
    let moviesFromLS = localStorage.getItem("moviesFromLS");
    if (!moviesFromLS) {
      return;
    }
    let movies = JSON.parse(moviesFromLS);
    setWatchList(movies);
  }, []);

  return (
    <>
    <MovieContext.Provider value={{addToWatchList}}>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={<Movies  />}
          />
          <Route
            path="/watchlist"
            element={<Watchlist watchlist={watchlist} />}
          />
          <Route path="/mood" element={<MoodSelector />} />
        </Routes>
      </BrowserRouter>
      </MovieContext.Provider>
    </>
  );
}

export default App;
