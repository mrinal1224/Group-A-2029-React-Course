import React, { useEffect, useState } from "react";

function MouseTracker() {
  const [track, setTrack] = useState("x");

  useEffect(() => {
    function handleMouseMove(e) {
      if (track === "x") {
        console.log("Mouse at X "  , e.clientX);
      } else {
        console.log("Mouse at Y " , e.clientY);
      }
    }

    window.addEventListener("mousemove", handleMouseMove);
    console.log(`Started tracking for ${track}`) // Y

   /// clean up function
    return ()=>{
       window.removeEventListener("mousemove", handleMouseMove)
       console.log(`STopped tracking ${track}`) // X
    }
  }, [track]);

  return (
    <>
      <button onClick={() => setTrack("x")}>Track X</button>
      <button onClick={() => setTrack("y")}>Track Y</button>
    </>
  );
}

export default MouseTracker;
