import React from "react";
import { useMemo } from "react";
import { useState } from "react";

function Memo() {
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);

  function doubleNumber(num) {
    for(let i=0 ; i<1000000000 ; i++){
       /// simulating a heavy task
    }
    return num * 2;
  }

  const doubledValue = useMemo(()=>doubleNumber(number) , [number])


  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <h4>{count}</h4>
      <input value={number} onChange={(e) => setNumber(e.target.value)} />
      <h4>Doubled Number : {doubledValue}</h4>
    </div>
  );
}

export default Memo;
