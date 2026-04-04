import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Timer Started");

    const interval = setInterval(() => {
      console.log("Timer Running");
      setCount((prev) => prev + 1);
    }, 1000);

    console.log(interval);

    // cleaning up useEffect
    return () => {
      clearInterval(interval);
      console.log("Timer Stopped");
    };
  }, []);

  return (
    <>
      <h1>This is the Count Value {count}</h1>
      <Link to="/about">About Page</Link>
    </>
  );
}

export default Timer;
