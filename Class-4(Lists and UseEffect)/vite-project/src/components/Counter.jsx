import React, { useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const [text ,setText] = useState('')

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    setCount(count - 1);
  }

//   useEffect(() => {
//     console.log("useEffect Executed")
//     document.title = `Button clicked for ${count} times`;
//   });

//   useEffect(() => {
//     console.log("useEffect Executed")
//     document.title = `Button clicked for ${count} times`;
//   }, [text]);

  useEffect(() => {
    console.log("useEffect Executed")
    document.title = `Button clicked for ${count} times`;
  }, []);

  return (
    <div>
      <button onClick={increment}>Increment</button>
      <h4>{count}</h4>
      <button onClick={decrement}>Decrement</button>

      <input type="text" onChange={(e)=>setText(e.target.value)}/>
      <h4>{text}</h4>
    </div>
  );
}

export default Counter;
