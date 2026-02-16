import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  console.log("Re-Rendered");

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <>
      <button onClick={increment}>Increment</button>
      <h2>{count}</h2>
      <button onClick={decrement}>Decrement</button>
    </>
  );
}

export default Counter;
