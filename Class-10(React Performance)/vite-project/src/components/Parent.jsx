import React, { useState , useCallback } from "react";
import Child from "./Child";

function Parent() {
  const [count, setCount] = useState(0);
  const name = "Adam";

//   function handleClick(){
//     console.log('Clicked in Child')
//   }

  const handleClick = useCallback(()=>{
    console.log('Clicked')
  } , [])



  console.log("Parent Rerendered")
  return (
    <div>
      <h1>Parent</h1>

      <button onClick={() => setCount(count + 1)}>increment</button>

      <h4>{count}</h4>

      <Child name={name} clickFn={handleClick} />
    </div>
  );
}

export default Parent;
