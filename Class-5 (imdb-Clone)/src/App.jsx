import { useState } from "react";
import MoodSelector from "./components/MoodSelector";
import Movies from "./components/Movies";
import Navbar from "./components/Navbar";
import Watchlist from "./components/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [watchlist, setWatchList] = useState([]);

  function addToWatchList(movieObj) {
    // task - only allow unique movies in the watchlist
    watchlist.push(movieObj);
    console.log(watchlist)
    setWatchList(watchlist);
  }

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Movies addToWatchList={addToWatchList}/>} />
          <Route path="/watchlist" element={<Watchlist watchlist={watchlist} />} />
          <Route path="/mood" element={<MoodSelector />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
