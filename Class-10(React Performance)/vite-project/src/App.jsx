import "./App.css";
import About from "./components/About";
import MouseTracker from "./components/MouseTracker";
import Parent from "./components/Parent";
import Timer from "./components/Timer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter> */}

      <Parent/>
    </>
  );
}

export default App;
